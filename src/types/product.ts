
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: "In Stock" | "Out of Stock" | "Low Stock";
  featured: boolean;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  featured: boolean;
  imageUrl: string;
}

export type ProductStatus = "In Stock" | "Out of Stock" | "Low Stock";

export type SortOrder = "asc" | "desc";
export type SortField = "name" | "price" | "stock" | "category" | "createdAt";

export interface ProductFilters {
  search?: string;
  category?: string;
  status?: ProductStatus | "all";
  featured?: boolean | "all";
  sortField?: SortField;
  sortOrder?: SortOrder;
}
