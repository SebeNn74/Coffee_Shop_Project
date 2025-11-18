import axios from "axios";
import { SaleRepository } from "@/repositories/sale.sequelize.repo";
import { SaleItemRepository } from "@/repositories/sale_item.sequelize.repo";
import { Sale } from "@/models/sale.model";
import { CreateSaleDTO } from "@/models/dtos/sale.dto";
import { NotFoundError } from "@/exceptions/domain.error";
import { InvalidValueError } from "@/exceptions/validation.error";
import { SERVICES } from "@/config/services.config";

export class SaleService {
  private saleRepo: SaleRepository;
  private saleItemRepo: SaleItemRepository;

  constructor() {
    this.saleRepo = new SaleRepository();
    this.saleItemRepo = new SaleItemRepository();
  }

  // ========================================
  // MÉTODOS PÚBLICOS
  // ========================================

  async getAll(): Promise<Sale[]> {
    return await this.saleRepo.getAll();
  }

  async getById(id: number): Promise<Sale> {
    const sale = await this.saleRepo.getById(id);
    if (!sale) throw new NotFoundError(`Venta con id ${id} no encontrada`);
    return sale;
  }

  async create(saleDTO: CreateSaleDTO): Promise<Sale> {
    this.validateSaleData(saleDTO);

    try {
      await this.verifyCustomerExists(saleDTO.customer_id);
      const totalAmount = await this.verifyAndCalculateTotal(saleDTO.items);
      await this.decreaseProductsStock(saleDTO.items);
      
      const createdSale = await this.createSaleRecord(saleDTO, totalAmount);
      await this.createSaleItems(createdSale.id, saleDTO.items);
      await this.addLoyaltyPoints(saleDTO.customer_id, totalAmount);

      console.log("✅ Venta completada exitosamente");
      return createdSale;
    } catch (error: any) {
      console.error("❌ Error al crear venta:", error.message);
      throw this.handleServiceError(error);
    }
  }

  async update(id: number, saleDTO: CreateSaleDTO): Promise<Sale | null> {
    this.validateUpdateData(id, saleDTO);
    return await this.saleRepo.update(id, saleDTO);
  }

  async delete(id: number): Promise<void> {
    if (this.validateId(id))
      throw new InvalidValueError("id", "INVALID_SALE_ID");
    this.saleRepo.delete(id);
  }

  // ========================================
  // VALIDACIONES
  // ========================================

  private validateSaleData(saleDTO: CreateSaleDTO): void {
    if (this.validateId(saleDTO.user_id))
      throw new InvalidValueError("userId", "INVALID_USER_ID");
    if (this.validateId(saleDTO.customer_id))
      throw new InvalidValueError("customerId", "INVALID_CUSTOMER_ID");
    if (!saleDTO.items || saleDTO.items.length === 0)
      throw new InvalidValueError("items", "ITEMS_REQUIRED");
  }

  private validateUpdateData(id: number, saleDTO: CreateSaleDTO): void {
    if (this.validateId(id))
      throw new InvalidValueError("id", "INVALID_SALE_ID");
    if (saleDTO.user_id && this.validateId(saleDTO.user_id))
      throw new InvalidValueError("userId", "INVALID_USER_ID");
    if (saleDTO.customer_id && this.validateId(saleDTO.customer_id))
      throw new InvalidValueError("customerId", "INVALID_CUSTOMER_ID");
    if (saleDTO.totalAmount && this.validateTotalAmount(saleDTO.totalAmount))
      throw new InvalidValueError("totalAmount", "INVALID_TOTAL_AMOUNT");
    if (saleDTO.status && this.validateStatus(saleDTO.status))
      throw new InvalidValueError("status", "INVALID_STATUS");
  }

  private validateId(id: number): boolean {
    return id != undefined && id <= 0;
  }

  private validateTotalAmount(totalAmount: number): boolean {
    return totalAmount != undefined && totalAmount <= 0;
  }

  private validateStatus(status: string): boolean {
    const validStatuses = ["pending", "completed", "canceled"];
    return !validStatuses.includes(status);
  }

  // ========================================
  // LLAMADAS A MICROSERVICIOS
  // ========================================

  private async verifyCustomerExists(customerId: number): Promise<void> {
    console.log("1. Verificando customer...");
    const response = await axios.get(
      `${SERVICES.CUSTOMERS_URL}/customers/${customerId}`
    );

    if (!response.data) {
      throw new NotFoundError("Cliente no encontrado");
    }
  }

  private async verifyAndCalculateTotal(
    items: CreateSaleDTO["items"]
  ): Promise<number> {
    console.log("2. Verificando stock de productos...");
    let totalAmount = 0;

    for (const item of items) {
      const product = await this.getProductWithStock(item.product_id);
      this.validateProductStock(product, item);
      totalAmount += this.calculateItemTotal(item);
    }

    return totalAmount;
  }

  private async getProductWithStock(productId: number) {
    const response = await axios.get(
      `${SERVICES.INVENTORY_URL}/products/${productId}`
    );

    if (!response.data) {
      throw new NotFoundError(`Producto ${productId} no encontrado`);
    }

    return response.data;
  }

  private validateProductStock(product: any, item: CreateSaleDTO["items"][0]): void {
    if (!product.stock || product.stock.quantity < item.quantity) {
      throw new InvalidValueError(
        "stock",
        `Stock insuficiente para producto ${item.product_id}. Disponible: ${
          product.stock?.quantity || 0
        }, Solicitado: ${item.quantity}`
      );
    }
  }

  private calculateItemTotal(item: CreateSaleDTO["items"][0]): number {
    const itemTotal = item.unitPrice * item.quantity;
    const discount = item.discount || 0;
    return itemTotal - discount;
  }

  private async decreaseProductsStock(items: CreateSaleDTO["items"]): Promise<void> {
    console.log("3. Disminuyendo stock en inventory...");
    
    for (const item of items) {
      await axios.patch(
        `${SERVICES.INVENTORY_URL}/products/${item.product_id}/decrease-stock`,
        { quantity: item.quantity }
      );
    }
  }

  private async addLoyaltyPoints(customerId: number, totalAmount: number): Promise<void> {
    console.log("6. Agregando puntos al cliente...");
    const pointsToAdd = Math.floor(totalAmount / 1000);

    if (pointsToAdd > 0) {
      await axios.patch(
        `${SERVICES.CUSTOMERS_URL}/customers/${customerId}/add-points`,
        { points: pointsToAdd }
      );
    }
  }

  // ========================================
  // OPERACIONES DE BASE DE DATOS
  // ========================================

  private async createSaleRecord(
    saleDTO: CreateSaleDTO,
    totalAmount: number
  ): Promise<Sale> {
    console.log("4. Registrando venta...");
    
    const saleData = {
      user_id: saleDTO.user_id,
      customer_id: saleDTO.customer_id,
      totalAmount: saleDTO.totalAmount || totalAmount,
      status: saleDTO.status || "completed",
    };

    return await this.saleRepo.create(saleData);
  }

  private async createSaleItems(
    saleId: number,
    items: CreateSaleDTO["items"]
  ): Promise<void> {
    console.log("5. Registrando items de la venta...");
    
    const saleItems = items.map((item) => ({
      sale_id: saleId,
      product_id: item.product_id,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discount: item.discount || 0,
    }));

    await this.saleItemRepo.createMany(saleItems);
  }

  // ========================================
  // MANEJO DE ERRORES
  // ========================================

  private handleServiceError(error: any): Error {
    if (error instanceof NotFoundError || error instanceof InvalidValueError) {
      return error;
    }

    if (error.response) {
      return new Error(
        error.response.data?.error || `Error en microservicio: ${error.message}`
      );
    }

    return new Error(`Error al procesar venta: ${error.message}`);
  }
}