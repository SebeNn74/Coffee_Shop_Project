import { Sale } from "@/models/sale.model"
import { SaleEntity } from "./entities/sale.entity"
import { SaleItemEntity } from "./entities/sale_item.entity";

export class SaleRepository {
    
    async getAll(): Promise<Sale[]> {
        const sales = await SaleEntity.findAll({
            include: [{
                model: SaleItemEntity,
                as: 'sale_items',
                attributes: ['id', 'saleId', 'productId', 'quantity', 'unitPrice', 'discount']
            }]
        });
        return sales.map(s => s.toJSON() as Sale)
    }

    async getById(id: number): Promise<Sale | null> {
        const user = await SaleEntity.findByPk(id);
        return user ? (user.toJSON() as Sale) : null;
    }

    async create(user: Omit<Sale, "id" | "createdAt">): Promise<Sale> {
        const created = await SaleEntity.create(user);
        return created.toJSON() as Sale;
    }

    async update(id: number, data: Partial<Omit<Sale, "id" | "createdAt">>): Promise<Sale|null> {
        await SaleEntity.update(data, { where: { id } });
        const updated = await SaleEntity.findByPk(id);
        return updated ? (updated.toJSON() as Sale) : null;
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await SaleEntity.destroy({ where: { id } });
        return deleted > 0;
    }
}