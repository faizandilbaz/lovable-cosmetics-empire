
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  className?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  isNew = false,
  isFeatured = false,
  className,
}: ProductCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "group product-card overflow-hidden", 
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`} className="block relative">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30 rounded-md">
          {/* Image */}
          <img
            src={image}
            alt={name}
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              isLoaded ? "blur-none" : "blur-sm",
              isHovered ? "scale-105" : "scale-100"
            )}
            onLoad={() => setIsLoaded(true)}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="bg-black text-white px-2 py-1 text-xs font-medium rounded">
                NEW
              </span>
            )}
            {isFeatured && (
              <span className="bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
                FEATURED
              </span>
            )}
          </div>
          
          {/* Quick actions */}
          <div 
            className={cn(
              "absolute bottom-0 inset-x-0 p-3 glass transition-all duration-300",
              isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            )}
          >
            <div className="flex justify-between items-center">
              <button 
                className="bg-white hover:bg-primary text-primary hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingBag size={16} />
              </button>
              <button 
                className="bg-white hover:bg-primary text-primary hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart size={16} />
              </button>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Product info */}
      <div className="pt-4 pb-2">
        <p className="text-xs text-muted-foreground mb-1">{category}</p>
        <Link to={`/product/${id}`} className="block">
          <h3 className="font-medium mb-1 truncate hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-primary font-medium">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
