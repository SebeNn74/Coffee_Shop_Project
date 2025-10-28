import { UserRepository } from "@/repositories/user.sequelize.repo";
import { CreateUserDto } from "@/models/dtos/create-user.dto";
import { ValidateUserDto } from "@/models/dtos/validate-user.dto";
import { LoginUserDto } from "@/models/dtos/login-user.dto";
import { User } from "@/models/user.model";
import { IncompleteCredentialsError, IncorrectCredentialsError, ValidationError } from "@/exceptions/validation.errors";
import { NotFoundError } from "@/exceptions/domain.errors";
import { encrypt} from "../utils/cryptoUtils";

export class UserService {
  private userRepository: UserRepository;
  
  constructor() {
    this.userRepository = new UserRepository();
  }

  private validateBusinessRules(data: { name?: string; lastName?: string; password?: string }) {
    if (!data.name?.trim()) 
      throw new ValidationError("Name is required", "REQUIRED_NAME");
    if (!data.lastName?.trim()) 
      throw new ValidationError("Last name is required", "REQUIRED_LAST_NAME");
    if (!data.password?.trim()) 
      throw new ValidationError("Password is required", "REQUIRED_PASSWORD");
  }

  async create(dto: CreateUserDto): Promise<User> {
    this.validateBusinessRules(dto);
    return await this.userRepository.create(dto);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.getById(id);
    if (!user) 
      throw new NotFoundError(`Usuario con id ${id} no encontrado`, "USER_NOT_FOUND");
    return user;
  }

  async validate(dto: ValidateUserDto): Promise<boolean> {
    if (!dto.name?.trim() || !dto.password?.trim())
      throw new IncompleteCredentialsError();
    return await this.userRepository.validate(dto.name, dto.password);
  }

  async login(dto: LoginUserDto): Promise<string> {
    if (!dto.email?.trim() || !dto.password?.trim())
      throw new IncompleteCredentialsError();
    const email = await this.userRepository.login(dto.email, dto.password);
    if(!email){
      throw new IncorrectCredentialsError();
    }
    return encrypt(email);
  }

  async delete(id: number): Promise<void> {
    const ok = await this.userRepository.delete(id);
    if (!ok) 
      throw new NotFoundError(`Usuario con id ${id} no encontrado`, "USER_NOT_FOUND");
  }
  
};
