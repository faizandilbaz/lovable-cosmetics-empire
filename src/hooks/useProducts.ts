
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import { Product, ProductFormData } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

export function useProducts() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get all products
  const {
    data: products = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getAll,
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

  return {
    products,
    categories,
    isLoading,
    error,
    refetch,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
