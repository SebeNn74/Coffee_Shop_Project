// ============================================
// DTOs para Repository (capa de datos)
// ============================================

import { ProductCreationAttributes } from "../product.model";
import { ProductStockCreationAttributes } from "../productStock.model";

export type ProductCreationAttrs = ProductCreationAttributes;

export interface ProductUpdateAttrs {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
}

export type ProductStockCreationAttrs = ProductStockCreationAttributes;

// ============================================
// DTOs para Service (lógica de negocio)
// ============================================
export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity?: number; // Para crear el stock inicial
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
}