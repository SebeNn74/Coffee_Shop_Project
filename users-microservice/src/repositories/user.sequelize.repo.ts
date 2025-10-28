import { User } from "@/models/user.model";
import { UserEntity } from "@/repositories/entities/user.entity";

export class UserRepository {

  async create(user: Omit<User, "id">): Promise<User> {
    const created = await UserEntity.create(user);
    return created.toJSON() as User;
  }

  async getAll(): Promise<User[]> {
    const users = await UserEntity.findAll();
    return users.map(u => u.toJSON() as User);
  }

  async getById(id: number): Promise<User | null> {
    const user = await UserEntity.findByPk(id);
    return user ? (user.toJSON() as User) : null;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await UserEntity.destroy({ where: { id } });
    return deleted > 0;
  }

  async validate(name: string, password: string): Promise<boolean> {
    const user = await UserEntity.findOne({ where: { name, password } });
    return !!user;
  }

  async login(email: string, password: string): Promise<string | undefined> {
    const user = await UserEntity.findOne({ where: { email, password } });
    return user ? user.email : undefined;
  }

};