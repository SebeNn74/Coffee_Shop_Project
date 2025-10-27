import { SaleEntity } from "@/repositories/entities/sale.entity";
import { SaleItemEntity } from "@/repositories/entities/sale_item.entity";

export async function seedSales() {
    await SaleEntity.bulkCreate(
        [
            {
                userId: 1,
                customerId: 2,
                totalAmount: 7,
                status: "pending"
            },
            {
                userId: 2,
                customerId: 1,
                totalAmount: 3,
                status: "completed"
            }
        ],
        { ignoreDuplicates: true }
    );
    await SaleItemEntity.bulkCreate(
       [
            {
                saleId: 1,
                productId: 2,
                quantity: 1,
                unitPrice: 20000,
                discount: 15
            },
            {
                saleId: 2,
                productId: 8,
                quantity: 2,
                unitPrice: 7500
            }
       ],
       { ignoreDuplicates: true }
    )
}
