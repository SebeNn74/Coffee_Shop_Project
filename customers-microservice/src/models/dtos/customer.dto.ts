export interface CreateCustomerDto {
    name: string;
    phone: string;
    email: string;
    loyaltyPoints?: number;
}

export interface UpdateCustomerDto {
    name?: string;
    phone?: string;
    email?: string;
    loyaltyPoints?: number;
}