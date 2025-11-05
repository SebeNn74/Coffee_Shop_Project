export interface CreateSaleItemsDTO {
    sale_id: number;
    product_id: number;
    quantity: number;
    unitPrice: number;
    discount?: number;
}
