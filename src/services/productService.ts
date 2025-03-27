
import { Product, ProductFormData } from "@/types/product";

// Mock database for now, would replace with real database in production
const STORAGE_KEY = "luxe_products";

// Helper function to generate unique IDs
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Helper to get products from local storage
const getStoredProducts = (): Product[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Error parsing products from storage", e);
    return [];
  }
};

// Helper to save products to local storage
const saveProductsToStorage = (products: Product[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

// Create initial products if none exist
const initializeProducts = (): void => {
  const existingProducts = getStoredProducts();
  
  if (existingProducts.length === 0) {
    const initialProducts: Product[] = [
      {
        id: generateId(),
        name: "Luxury Face Cream",
        description: "A premium face cream that hydrates and rejuvenates your skin.",
        category: "Skincare",
        price: 49.99,
        stock: 32,
        status: "In Stock",
        featured: true,
        imageUrl: "https://placehold.co/400x400",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: generateId(),
        name: "Hydrating Serum",
        description: "Intense hydration serum for all skin types.",
        category: "Skincare",
        price: 34.99,
        stock: 18,
        status: "In Stock",
        featured: false,
        imageUrl: "https://placehold.co/400x400",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: generateId(),
        name: "Matte Lipstick",
        description: "Long-lasting matte lipstick with moisturizing formula.",
        category: "Makeup",
        price: 24.99,
        stock: 45,
        status: "In Stock",
        featured: true,
        imageUrl: "https://placehold.co/400x400",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: generateId(),
        name: "Revitalizing Shampoo",
        description: "Nourishing shampoo for damaged hair.",
        category: "Haircare",
        price: 29.99,
        stock: 0,
        status: "Out of Stock",
        featured: false,
        imageUrl: "https://placehold.co/400x400",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: generateId(),
        name: "Signature Perfume",
        description: "Elegant signature scent with notes of jasmine and vanilla.",
        category: "Fragrance",
        price: 79.99,
        stock: 12,
        status: "In Stock",
        featured: true,
        imageUrl: "https://placehold.co/400x400",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    saveProductsToStorage(initialProducts);
  }
};

// Initialize products on service load
initializeProducts();

// Main service functions
export const productService = {
  getAll: async (): Promise<Product[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return getStoredProducts();
  },
  
  getById: async (id: string): Promise<Product | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const products = getStoredProducts();
    return products.find(p => p.id === id) || null;
  },
  
  create: async (productData: ProductFormData): Promise<Product> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const timestamp = new Date().toISOString();
    const newProduct: Product = {
      id: generateId(),
      ...productData,
      status: productData.stock > 0 ? "In Stock" : "Out of Stock",
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    const products = getStoredProducts();
    const updatedProducts = [...products, newProduct];
    saveProductsToStorage(updatedProducts);
    
    return newProduct;
  },
  
  update: async (id: string, productData: Partial<ProductFormData>): Promise<Product | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const products = getStoredProducts();
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) return null;
    
    const updatedProduct: Product = {
      ...products[productIndex],
      ...productData,
      status: productData.stock !== undefined 
        ? (productData.stock > 0 ? "In Stock" : "Out of Stock")
        : products[productIndex].status,
      updatedAt: new Date().toISOString()
    };
    
    products[productIndex] = updatedProduct;
    saveProductsToStorage(products);
    
    return updatedProduct;
  },
  
  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const products = getStoredProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    
    if (filteredProducts.length === products.length) return false;
    
    saveProductsToStorage(filteredProducts);
    return true;
  },
  
  getCategories: async (): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const products = getStoredProducts();
    const categories = [...new Set(products.map(p => p.category))];
    return categories;
  }
};

export default productService;
