export interface CreateSaleDTO {
    user_id: number;
    customer_id: number;
    totalAmount?: number; 
    status?: 'pending' | 'completed' | 'canceled'; 
    items: {
        product_id: number;
        quantity: number;
        unitPrice: number;
        discount?: number;
    }[];
}
export interface CreateSaleDataDTO {
    user_id: number;
    customer_id: number;
    totalAmount: number;
    status: 'pending' | 'completed' | 'canceled';
}

export interface UpdateSaleDTO {
    user_id?: number;
    customer_id?: number;
    totalAmount?: number;
    status?: 'pending' | 'completed' | 'canceled';
}