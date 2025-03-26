
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Share2, 
  ChevronRight, 
  Minus, 
  Plus, 
  CheckCircle,
  Truck
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import ButtonCustom from "@/components/ui/button-custom";
import ProductCard from "@/components/ui/ProductCard";
import { products, Product } from "@/lib/data";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Find product by ID
  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Initialize selected variants
      if (foundProduct.variants) {
        const initialVariants: Record<string, string> = {};
        foundProduct.variants.forEach(variant => {
          initialVariants[variant.name] = variant.options[0];
        });
        setSelectedVariants(initialVariants);
      }
      
      // Find related products from the same category
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
    
    // Reset scroll position
    window.scrollTo(0, 0);
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    if (value > 10) return;
    setQuantity(value);
  };

  const handleVariantChange = (variantName: string, option: string) => {
    setSelectedVariants({
      ...selectedVariants,
      [variantName]: option
    });
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  // If product not found
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24">
          <Container className="py-20 text-center">
            <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you are looking for does not exist or has been removed.
            </p>
            <Button to="/shop">Continue Shopping</Button>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <Container className="py-10">
          {/* Breadcrumbs */}
          <div className="text-sm mb-8 flex items-center text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <ChevronRight size={14} className="mx-2" />
            <Link 
              to={`/shop?category=${product.category.toLowerCase()}`} 
              className="hover:text-primary transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-foreground">{product.name}</span>
          </div>
          
          {/* Product Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {/* Product Images */}
            <div>
              <div className="relative aspect-square bg-secondary/30 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.gallery ? product.gallery[activeImageIndex] : product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isImageLoaded ? "blur-none" : "blur-sm"
                  }`}
                  onLoad={() => setIsImageLoaded(true)}
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-black text-white px-2 py-1 text-xs font-medium rounded">
                      NEW
                    </span>
                  )}
                  {product.discountPrice && (
                    <span className="bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
                      SALE
                    </span>
                  )}
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.gallery.map((image, index) => (
                    <button
                      key={index}
                      className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                        activeImageIndex === index 
                          ? "border-primary" 
                          : "border-transparent hover:border-muted"
                      }`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
              
              {/* Price */}
              <div className="flex items-center mb-4">
                {product.discountPrice ? (
                  <>
                    <span className="text-2xl font-medium text-primary mr-3">
                      ${product.discountPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-medium text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < product.rating
                          ? "text-yellow-400 fill-yellow-400" 
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm ml-2 font-medium">{product.rating}</span>
                <span className="text-sm ml-1 text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>
              
              {/* Variants */}
              {product.variants && product.variants.map((variant) => (
                <div key={variant.name} className="mb-6">
                  <h3 className="font-medium mb-3">
                    {variant.name}: <span className="text-primary">{selectedVariants[variant.name]}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => (
                      <button
                        key={option}
                        className={`px-4 py-2 border rounded-md text-sm transition-all ${
                          selectedVariants[variant.name] === option
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-muted-foreground"
                        }`}
                        onClick={() => handleVariantChange(variant.name, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Quantity */}
              <div className="mb-8">
                <h3 className="font-medium mb-3">Quantity</h3>
                <div className="flex w-full max-w-[140px]">
                  <button
                    className="w-10 h-10 flex items-center justify-center border border-border rounded-l-md hover:bg-secondary transition-colors"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  <div className="flex-1 h-10 border-t border-b border-border flex items-center justify-center font-medium">
                    {quantity}
                  </div>
                  <button
                    className="w-10 h-10 flex items-center justify-center border border-border rounded-r-md hover:bg-secondary transition-colors"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Add to Cart */}
              <div className="flex flex-wrap gap-4 mb-8">
                <ButtonCustom
                  className="flex-1"
                  icon={<ShoppingBag size={18} />}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </ButtonCustom>
                <ButtonCustom
                  variant="outline"
                  className="w-12 h-12 p-0"
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} />
                </ButtonCustom>
                <ButtonCustom
                  variant="outline"
                  className="w-12 h-12 p-0"
                  aria-label="Share"
                >
                  <Share2 size={18} />
                </ButtonCustom>
              </div>
              
              {/* Added to Cart Message */}
              {addedToCart && (
                <div className="bg-green-50 text-green-700 rounded-md p-3 flex items-center mb-8 animate-fadeIn">
                  <CheckCircle size={18} className="mr-2" />
                  <span>Product added to your cart!</span>
                </div>
              )}
              
              {/* Additional Info */}
              <div className="border border-border rounded-md overflow-hidden">
                <div className="flex items-center p-4 border-b border-border">
                  <Truck size={18} className="text-primary mr-3" />
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-sm text-muted-foreground">On orders over $50</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">SKU: {product.id}-{product.slug}</p>
                  <p className="text-sm text-muted-foreground mb-2">Categories: {product.category}</p>
                  <p className="text-sm text-muted-foreground">
                    Tags: Beauty, {product.category.toLowerCase()}, premium
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-medium mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                    isNew={product.isNew}
                    isFeatured={product.isFeatured}
                  />
                ))}
              </div>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
