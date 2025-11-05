export interface CreateCustomerDto {
    name: string;
    phone: string;
    email: string;
}

export interface UpdateCustomerDto {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
}