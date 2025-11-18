import { SaleItem } from "@/models/sale_item.model";
import { SaleItemEntity } from "./entities/sale_item.entity";
import { CreateSaleItemsDTO } from "@/models/dtos/sale_item.dto";

export class SaleItemRepository {
  async create(saleItem: CreateSaleItemsDTO): Promise<SaleItem> {
    const created = await SaleItemEntity.create(saleItem);
    return created.toJSON() as SaleItem;
  }

  async createMany(saleItems: CreateSaleItemsDTO[]): Promise<SaleItem[]> {
    const created = await SaleItemEntity.bulkCreate(saleItems);
    return created.map((item) => item.toJSON() as SaleItem);
  }

  async getBySaleId(sale_id: number): Promise<SaleItem[]> {
    const items = await SaleItemEntity.findAll({ where: { sale_id } });
    return items.map((item) => item.toJSON() as SaleItem);
  }
}