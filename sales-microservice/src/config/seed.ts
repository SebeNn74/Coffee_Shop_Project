import { SaleEntity } from "@/repositories/entities/sale.entity";
import { SaleItemEntity } from "@/repositories/entities/sale_item.entity";

export async function seedSales() {
  await SaleEntity.bulkCreate(
    [
      {
        user_id: 1,
        customer_id: 2,
        totalAmount: 7,
        status: "pending",
      },
      {
        user_id: 2,
        customer_id: 1,
        totalAmount: 3,
        status: "completed",
      },
    ],
    { ignoreDuplicates: true }
  );
  await SaleItemEntity.bulkCreate(
    [
      {
        sale_id: 1,
        product_id: 2,
        quantity: 1,
        unitPrice: 20000,
        discount: 15,
      },
      {
        sale_id: 2,
        product_id: 8,
        quantity: 2,
        unitPrice: 7500,
      },
    ],
    { ignoreDuplicates: true }
  );

  console.log("[Sales] Datos iniciales insertados.");
}
