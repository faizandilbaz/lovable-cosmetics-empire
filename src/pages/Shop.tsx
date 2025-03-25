
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Filter, ChevronDown, Grid3X3, Grid2X2, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";

const Shop = () => {
  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridView, setGridView] = useState<"grid" | "list">("grid");
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState("featured");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Extract category from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    
    if (category) {
      setCurrentCategory(category);
    } else {
      setCurrentCategory(null);
    }
  }, [location.search]);

  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (currentCategory) {
      result = result.filter(
        product => product.category.toLowerCase() === currentCategory.toLowerCase()
      );
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max * 2
    );
    
    // Sort products
    switch (currentSort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (a.isNew ? -1 : 1) - (b.isNew ? -1 : 1));
        break;
      case "featured":
      default:
        result.sort((a, b) => (a.isFeatured ? -1 : 1) - (b.isFeatured ? -1 : 1));
        break;
    }
    
    setFilteredProducts(result);
  }, [currentCategory, currentSort, priceRange]);

  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero Banner */}
        <div className="bg-secondary py-12">
          <Container>
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-medium mb-3">Shop All Products</h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Discover our collection of premium products designed to elevate your beauty routine.
              </p>
            </div>
          </Container>
        </div>
        
        <Container className="py-10">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-6">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              icon={<Filter size={18} />}
            >
              Filter Products
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className={`
              md:w-64 flex-shrink-0 
              ${isFilterOpen ? 
                "fixed inset-0 z-50 bg-background p-6 overflow-auto" : 
                "hidden md:block"}
            `}>
              {/* Mobile Close Button */}
              {isFilterOpen && (
                <div className="flex justify-between items-center mb-6 md:hidden">
                  <h2 className="font-medium text-lg">Filters</h2>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="p-1 rounded-full hover:bg-secondary"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
              
              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    className={`text-sm w-full text-left py-2 px-4 rounded-md transition-colors ${
                      currentCategory === null ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    }`}
                    onClick={() => setCurrentCategory(null)}
                  >
                    All Products
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`text-sm w-full text-left py-2 px-4 rounded-md transition-colors ${
                        currentCategory === category.toLowerCase() ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                      }`}
                      onClick={() => setCurrentCategory(category.toLowerCase())}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max * 2}</span>
                  </div>
                </div>
              </div>
              
              {/* Apply Filters Button - Mobile Only */}
              {isFilterOpen && (
                <div className="mt-8 md:hidden">
                  <Button 
                    className="w-full"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              )}
            </div>
            
            {/* Product Grid */}
            <div className="flex-grow">
              {/* Toolbar */}
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <p className="text-muted-foreground text-sm">
                  Showing {filteredProducts.length} products
                </p>
                
                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={currentSort}
                      onChange={(e) => setCurrentSort(e.target.value)}
                      className="appearance-none bg-secondary rounded-md py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="featured">Featured</option>
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-muted-foreground" />
                  </div>
                  
                  {/* View Toggle */}
                  <div className="hidden md:flex border border-border rounded-md overflow-hidden">
                    <button
                      className={`p-2 ${gridView === "grid" ? "bg-secondary" : "hover:bg-secondary/50"}`}
                      onClick={() => setGridView("grid")}
                      aria-label="Grid view"
                    >
                      <Grid3X3 size={18} />
                    </button>
                    <button
                      className={`p-2 ${gridView === "list" ? "bg-secondary" : "hover:bg-secondary/50"}`}
                      onClick={() => setGridView("list")}
                      aria-label="List view"
                    >
                      <Grid2X2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className={`grid gap-6 ${
                  gridView === "grid" 
                    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3" 
                    : "grid-cols-1"
                }`}>
                  {filteredProducts.map((product) => (
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
              ) : (
                <div className="text-center py-16 border border-dashed border-border rounded-lg">
                  <p className="text-lg mb-4">No products found</p>
                  <p className="text-muted-foreground mb-6">Try adjusting your filters to find what you're looking for.</p>
                  <Button onClick={() => {
                    setCurrentCategory(null);
                    setPriceRange({ min: 0, max: 100 });
                  }}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
