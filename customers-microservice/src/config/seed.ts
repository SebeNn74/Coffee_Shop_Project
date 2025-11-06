// src/config/seed.ts
import { CustomerEntity } from "@/repositories/entities/customer.entity";

export async function seedCustomers() {
  await CustomerEntity.bulkCreate(
    [
      {
        name: "Carlos Martínez",
        phone: "3001234567",
        email: "carlos.martinez@gmail.com",
        loyaltyPoints: 20,
      },
      {
        name: "Laura Gómez",
        phone: "3109876543",
        email: "laura.gomez@gmail.com",
        loyaltyPoints: 15,
      },
      {
        name: "Pedro Sánchez",
        phone: "3205551234",
        email: "pedro.sanchez@gmail.com",
        loyaltyPoints: 55,
      },
    ],
    { ignoreDuplicates: true }
  );

  console.log("[Customers] Datos iniciales insertados.");
}
