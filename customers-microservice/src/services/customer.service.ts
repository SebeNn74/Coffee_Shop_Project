import { CustomerRepository } from "@/repositories/customer.sequelize.repo";
import { CreateCustomerDto, UpdateCustomerDto } from "@/models/dtos/customer.dto";
import { Customer } from "@/models/customer.model";
import { ValidationError } from "@/exceptions/validation.errors";
import { NotFoundError } from "@/exceptions/domain.errors";

export class CustomerService {
  private customerRepository: CustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  private validateBusinessRules(data: { name?: string; phone?: string; email?: string }) {
    if (!data.name?.trim())
      throw new ValidationError("Name is required", "REQUIRED_NAME");
    if (!data.phone?.trim())
      throw new ValidationError("Phone is required", "REQUIRED_PHONE");
    if (!data.email?.trim())
      throw new ValidationError("Email is required", "REQUIRED_EMAIL");
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new ValidationError("Invalid email format", "INVALID_EMAIL");
    }
  }

  async create(dto: CreateCustomerDto): Promise<Customer> {
    this.validateBusinessRules(dto);
    
    // Verificar que el email no exista
    const existing = await this.customerRepository.getByEmail(dto.email);
    if (existing) {
      throw new ValidationError("Email already exists", "EMAIL_EXISTS");
    }
    
    return await this.customerRepository.create(dto);
  }

  async getAll(): Promise<Customer[]> {
    return await this.customerRepository.getAll();
  }

  async getById(id: number): Promise<Customer> {
    const customer = await this.customerRepository.getById(id);
    if (!customer)
      throw new NotFoundError(`Customer with id ${id} not found`, "CUSTOMER_NOT_FOUND");
    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto): Promise<Customer> {
    // Verificar que el cliente exista
    const existing = await this.customerRepository.getById(id);
    if (!existing)
      throw new NotFoundError(`Customer with id ${id} not found`, "CUSTOMER_NOT_FOUND");

    // Si se actualiza el email, verificar que no exista
    if (dto.email && dto.email !== existing.email) {
      const emailExists = await this.customerRepository.getByEmail(dto.email);
      if (emailExists) {
        throw new ValidationError("Email already exists", "EMAIL_EXISTS");
      }
    }

    const updated = await this.customerRepository.update(id, dto);
    if (!updated)
      throw new NotFoundError(`Customer with id ${id} not found`, "CUSTOMER_NOT_FOUND");
    
    return updated;
  }

  async delete(id: number): Promise<void> {
    const ok = await this.customerRepository.delete(id);
    if (!ok)
      throw new NotFoundError(`Customer with id ${id} not found`, "CUSTOMER_NOT_FOUND");
  }
}