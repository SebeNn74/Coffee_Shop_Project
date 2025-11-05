export interface CreateProductStockDTO {
  product_id: number;
  quantity: number;
  reserved?: number;
}