import { SaleRepository } from "@/repositories/sale.sequelize.repo";
import { Sale } from "@/models/sale.model"
import { CreateSaleDTO } from "@/models/dtos/sale.dto"
import { NotFoundError } from "@/exceptions/domain.error";
import { InvalidValueError } from "@/exceptions/validation.error";

export class SaleService {
    private saleRepo: SaleRepository;

    constructor() {
        this.saleRepo = new SaleRepository;
    }

    private validateId(id: number): boolean {
        return id != undefined && id <= 0
    }

    private validateTotalAmount(totalAmount: number) : boolean {
        return totalAmount != undefined && totalAmount <= 0
    }

    private validateStatus(status: string): boolean {
        const validStatuses = ["pending", "completed", "canceled"];
        return !validStatuses.includes(status);
    }

    private validateBusinessRules(sale: CreateSaleDTO) {
        if (this.validateId(sale.user_id))
            throw new InvalidValueError("userId", "INVALID_USER_ID")
        if (this.validateId(sale.customer_id))
            throw new InvalidValueError("customerId", "INVALID_CUSTOMER_ID")
        if (this.validateTotalAmount(sale.totalAmount))
            throw new InvalidValueError("totalAmount", "INVALID_TOTAL_AMOUNT")     
        if (this.validateStatus(sale.status))
            throw new InvalidValueError("status", "INVALID_STATUS")
    }

    async getAll(): Promise<Sale[]> {
        return await this.saleRepo.getAll();
    }

    async getById(id: number): Promise<Sale> {
        const sale = await this.saleRepo.getById(id);
        if (!sale)
            throw new NotFoundError(`Venta con id ${id} no encontrada`)
        return sale;
    }

    async create(saleDTO: CreateSaleDTO): Promise<Sale> {
        this.validateBusinessRules(saleDTO);
        return await this.saleRepo.create(saleDTO);
    }

    async update(id: number, saleDTO: CreateSaleDTO): Promise<Sale | null> {
        if (this.validateId(id))
            throw new InvalidValueError("id", "INVALID_SALE_ID")
        this.validateBusinessRules(saleDTO)
        return await this.saleRepo.update(id, saleDTO)
    }

    async delete(id: number): Promise<void> {
        if (this.validateId(id))
            throw new InvalidValueError("id", "INVALID_SALE_ID")
        this.saleRepo.delete(id);
    }

}