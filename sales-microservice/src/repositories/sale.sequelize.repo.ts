import { Sale } from "@/models/sale.model";
import { SaleEntity } from "./entities/sale.entity";
import { SaleItemEntity } from "./entities/sale_item.entity";
import { CreateSaleDTO, UpdateSaleDTO } from "@/models/dtos/sale.dto";

export class SaleRepository {
  async getAll(): Promise<Sale[]> {
    const sales = await SaleEntity.findAll({
      include: [
        {
          model: SaleItemEntity,
          as: "sale_items",
          attributes: [
            "id",
            "sale_id",
            "product_id",
            "quantity",
            "unitPrice",
            "discount",
          ],
        },
      ],
    });
    return sales.map((s) => s.toJSON() as Sale);
  }

  async getById(id: number): Promise<Sale | null> {
    const sale = await SaleEntity.findByPk(id);
    return sale ? (sale.toJSON() as Sale) : null;
  }

  async create(sale: CreateSaleDTO): Promise<Sale> {
    const created = await SaleEntity.create(sale);
    return created.toJSON() as Sale;
  }

  async update(id: number, data: UpdateSaleDTO): Promise<Sale | null> {
    await SaleEntity.update(data, { where: { id } });
    const updated = await SaleEntity.findByPk(id);
    return updated ? (updated.toJSON() as Sale) : null;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await SaleEntity.destroy({ where: { id } });
    return deleted > 0;
  }
}
