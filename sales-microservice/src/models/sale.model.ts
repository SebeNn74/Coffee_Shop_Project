export interface Sale {
    id: number;
    user_id: number;
    customer_id: number;
    totalAmount: number;
    status: 'pending' | 'completed' | 'canceled';
    createdAt: Date;
}
