import { Customer } from "@/models/customer.model";
import { CustomerEntity } from "@/repositories/entities/customer.entity";
import { CreateCustomerDto, UpdateCustomerDto } from "@/models/dtos/customer.dto";

export class CustomerRepository {
  async create(customer: CreateCustomerDto): Promise<Customer> {
    const created = await CustomerEntity.create(customer);
    return created.toJSON() as Customer;
  }

  async getAll(): Promise<Customer[]> {
    const customers = await CustomerEntity.findAll();
    return customers.map(c => c.toJSON() as Customer);
  }

  async getById(id: number): Promise<Customer | null> {
    const customer = await CustomerEntity.findByPk(id);
    return customer ? (customer.toJSON() as Customer) : null;
  }

  async getByEmail(email: string): Promise<Customer | null> {
    const customer = await CustomerEntity.findOne({ where: { email } });
    return customer ? (customer.toJSON() as Customer) : null;
  }

  async update(id: number, data: UpdateCustomerDto): Promise<Customer | null> {
    const customer = await CustomerEntity.findByPk(id);
    if (!customer) return null;
    
    await customer.update(data);
    return customer.toJSON() as Customer;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await CustomerEntity.destroy({ where: { id } });
    return deleted > 0;
  }
}