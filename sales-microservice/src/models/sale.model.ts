export interface Sale {
    id: number;
    userId: number;
    customerId: number;
    totalAmount: number;
    status: 'pending' | 'completed' | 'canceled';
    createdAt: Date;
}
