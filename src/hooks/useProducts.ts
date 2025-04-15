
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import { Product, ProductFormData, ProductFilters } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function useProducts(initialFilters?: ProductFilters) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [filters, setFilters] = useState<ProductFilters>(initialFilters || {});

  // Get all products with filters
  const {
    data: products = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => productService.getAll(filters),
  });

  // Get product categories
  const { data: categories = [] } = useQuery({
    queryKey: ["productCategories"],
    queryFn: productService.getCategories,
  });

  // Create product mutation
  const createProduct = useMutation({
    mutationFn: (productData: ProductFormData) => productService.create(productData),
    onSuccess: () => {
      toast({
        title: "Product created",
        description: "The product has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productCategories"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create product. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update product mutation
  const updateProduct = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProductFormData> }) => 
      productService.update(id, data),
    onSuccess: () => {
      toast({
        title: "Product updated",
        description: "The product has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productCategories"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete product mutation
  const deleteProduct = useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Duplicate product mutation
  const duplicateProduct = useMutation({
    mutationFn: (id: string) => productService.duplicate(id),
    onSuccess: () => {
      toast({
        title: "Product duplicated",
        description: "The product has been duplicated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to duplicate product. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Toggle featured status
  const toggleFeatured = useMutation({
    mutationFn: (id: string) => productService.toggleFeatured(id),
    onSuccess: (updatedProduct) => {
      const status = updatedProduct?.featured ? "featured" : "unfeatured";
      toast({
        title: `Product ${status}`,
        description: `The product has been ${status} successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update product status. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update stock level
  const updateStock = useMutation({
    mutationFn: ({ id, stock }: { id: string; stock: number }) => 
      productService.updateStock(id, stock),
    onSuccess: () => {
      toast({
        title: "Stock updated",
        description: "The product stock has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update stock. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    products,
    categories,
    isLoading,
    error,
    refetch,
    filters,
    setFilters,
    createProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    toggleFeatured,
    updateStock,
  };
}
