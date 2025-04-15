
import { Product, ProductFormData, ProductFilters, SortField, SortOrder } from "@/types/product";

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

// Determine product status based on stock
const determineProductStatus = (stock: number): "In Stock" | "Out of Stock" | "Low Stock" => {
  if (stock <= 0) return "Out of Stock";
  if (stock < 10) return "Low Stock";
  return "In Stock";
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
  getAll: async (filters?: ProductFilters): Promise<Product[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let products = getStoredProducts();
    
    // Apply filters if provided
    if (filters) {
      // Filter by search term
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(searchTerm) || 
          p.description.toLowerCase().includes(searchTerm) ||
          p.category.toLowerCase().includes(searchTerm)
        );
      }
      
      // Filter by category
      if (filters.category && filters.category !== "all") {
        products = products.filter(p => p.category === filters.category);
      }
      
      // Filter by status
      if (filters.status && filters.status !== "all") {
        products = products.filter(p => p.status === filters.status);
      }
      
      // Filter by featured
      if (filters.featured !== undefined && filters.featured !== "all") {
        products = products.filter(p => p.featured === filters.featured);
      }
      
      // Sort products
      if (filters.sortField) {
        const sortField = filters.sortField;
        const sortOrder = filters.sortOrder || "asc";
        
        products.sort((a, b) => {
          let valueA = a[sortField];
          let valueB = b[sortField];
          
          // Handle string comparisons
          if (typeof valueA === "string" && typeof valueB === "string") {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
          }
          
          if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
          if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
          return 0;
        });
      }
    }
    
    return products;
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
      status: determineProductStatus(productData.stock),
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
    
    // Determine the new stock status if stock is being updated
    const newStatus = productData.stock !== undefined 
      ? determineProductStatus(productData.stock)
      : products[productIndex].status;
    
    const updatedProduct: Product = {
      ...products[productIndex],
      ...productData,
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    
    products[productIndex] = updatedProduct;
    saveProductsToStorage(products);
    
    return updatedProduct;
  },
  
  duplicate: async (id: string): Promise<Product | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const products = getStoredProducts();
    const productToDuplicate = products.find(p => p.id === id);
    
    if (!productToDuplicate) return null;
    
    const timestamp = new Date().toISOString();
    const duplicatedProduct: Product = {
      ...productToDuplicate,
      id: generateId(),
      name: `${productToDuplicate.name} (Copy)`,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    saveProductsToStorage([...products, duplicatedProduct]);
    return duplicatedProduct;
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
  },

  updateStock: async (id: string, newStock: number): Promise<Product | null> => {
    return productService.update(id, { stock: newStock });
  },
  
  toggleFeatured: async (id: string): Promise<Product | null> => {
    const product = await productService.getById(id);
    if (!product) return null;
    
    return productService.update(id, { featured: !product.featured });
  }
};

export default productService;
