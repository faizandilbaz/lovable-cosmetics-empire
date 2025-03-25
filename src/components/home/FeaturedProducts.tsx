
// Prevent the import from the renamed file
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/ui/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { products } from "@/lib/data";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  
  // Use React Query to fetch featured products
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => {
      // Simulating API call with local data
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(products.filter(product => product.featured));
        }, 500);
      });
    },
  });

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium cosmetics designed to enhance your natural beauty.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="rounded-lg bg-gray-100 h-64 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts?.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                onClick={() => navigate('/shop')} 
                variant="outline" 
                size="lg"
                className="font-medium"
              >
                View All Products
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default FeaturedProducts;
