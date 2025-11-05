import { ProductStock } from "./product-stock.model";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock?: ProductStock;
}