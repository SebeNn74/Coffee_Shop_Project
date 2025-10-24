export interface CreateSaleDTO {
    userId: number;
    customerId: number;
    totalAmount: number;
    status: 'pending' | 'completed' | 'canceled';
}