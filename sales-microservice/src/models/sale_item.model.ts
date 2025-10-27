import { Sale } from "./sale.model";

export interface SaleItems {
    id: number;
    saleId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    discount?: number;
    sale?: Sale;
}
