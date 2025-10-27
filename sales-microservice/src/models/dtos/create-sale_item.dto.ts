export interface CreateSaleItemsDTO {
    saleId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    discount?: number;
}
