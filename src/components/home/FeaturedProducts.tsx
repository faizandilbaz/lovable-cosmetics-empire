
import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../ui/ProductCard";
import Button from "../ui/Button";
import Container from "../ui/Container";
import { products } from "@/lib/data";

const FeaturedProducts = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };
  
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  // Filter featured products
  const featuredProducts = products.filter(product => product.isFeatured);

  return (
    <section className="py-20">
      <Container>
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-medium mb-3">Featured Products</h2>
            <p className="text-muted-foreground max-w-md">
              Discover our handpicked selection of premium products designed to elevate your beauty routine.
            </p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={scrollRight}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        
        <div 
          ref={containerRef}
          className="flex overflow-x-scroll space-x-6 pb-8 scroll-smooth hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="min-w-[280px]">
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                isNew={product.isNew}
                isFeatured={product.isFeatured}
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Button to="/shop" variant="outline">
            View All Products
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
