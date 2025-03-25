
import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";

interface Category {
  name: string;
  slug: string;
  image: string;
  description: string;
}

const Categories = () => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  
  const categories: Category[] = [
    {
      name: "Skincare",
      slug: "skincare",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
      description: "Nourish your skin with our premium skincare collection"
    },
    {
      name: "Makeup",
      slug: "makeup",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop",
      description: "Express yourself with our versatile makeup range"
    },
    {
      name: "Fragrance",
      slug: "fragrance",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1780&auto=format&fit=crop",
      description: "Discover your signature scent from our collection"
    },
    {
      name: "Tools",
      slug: "tools",
      image: "https://images.unsplash.com/photo-1544717305-f9c88f2897bc?q=80&w=2070&auto=format&fit=crop",
      description: "Professional beauty tools for perfect application"
    }
  ];

  const handleImageLoad = (slug: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [slug]: true
    }));
  };

  return (
    <section className="py-20 bg-secondary/50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-medium mb-3">Shop by Category</h2>
          <p className="text-muted-foreground">
            Browse our carefully curated categories to find products that match your beauty needs and preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.slug} 
              to={`/shop?category=${category.slug}`} 
              className="group block relative overflow-hidden rounded-lg aspect-square"
            >
              <div className="absolute inset-0 bg-black/40 z-10 transition-opacity group-hover:bg-black/30" />
              <img
                src={category.image}
                alt={category.name}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  loadedImages[category.slug] ? "blur-none" : "blur-sm"
                } group-hover:scale-105`}
                onLoad={() => handleImageLoad(category.slug)}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                <div className="glass-dark px-6 py-4 rounded-lg transform transition-transform group-hover:translate-y-0 w-4/5">
                  <h3 className="text-white text-2xl font-medium mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Categories;
