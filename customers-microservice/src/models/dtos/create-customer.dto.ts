export interface CreateCustomerDto {
    name: string;
    phone: string;
    email: string;
    address?: string;
    city?: string;
}