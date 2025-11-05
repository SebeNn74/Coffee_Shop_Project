// ============================================
// DTOs para Repository (capa de datos)
// ============================================

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
}

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