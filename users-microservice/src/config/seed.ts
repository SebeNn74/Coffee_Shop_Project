import { UserEntity } from "@/repositories/entities/user.entity";

export async function seedUsers() {
    await UserEntity.bulkCreate(
        [
            {
                name: "Alejandro",
                lastName: "Novoa",
                email: "alejandro.novoa@gmail.com",
                password: "alenov123"
            },
            {
                name: "Samantha",
                lastName: "Perez",
                email: "samantha.perez@gmail.com",
                password: "samper123"
            }
        ],
        { ignoreDuplicates: true }
    );
}
