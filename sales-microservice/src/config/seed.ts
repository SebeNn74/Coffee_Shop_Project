import { SaleEntity } from "@/repositories/entities/sale.entity";

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
}
