import { Sale } from "./sale.model";

export interface SaleItem {
    id: number;
    sale_id: number;
    product_id: number;
    quantity: number;
    unitPrice: number;
    discount: number;
    sale?: Sale;
}
