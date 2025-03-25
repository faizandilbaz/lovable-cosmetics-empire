
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Filter, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import BlogPost from "@/components/blog/BlogPost";
import { blogPosts } from "@/lib/blog-data";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const Blog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState(blogPosts);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));

  // Extract category from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    
    if (category) {
      setCurrentCategory(category);
    } else {
      setCurrentCategory(null);
    }
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [location.search]);

  // Filter posts based on search term and category
  useEffect(() => {
    let filtered = [...blogPosts];
    
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (currentCategory) {
      filtered = filtered.filter(
        (post) => post.category.toLowerCase() === currentCategory.toLowerCase()
      );
    }
    
    setPosts(filtered);
  }, [searchTerm, currentCategory]);

  // Find featured post
  const featuredPost = blogPosts.find((post) => post.featured);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query if needed
    // Here we're just filtering in state
  };

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <Container>
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-medium mb-4">Beauty Tips & Trends</h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore expert skincare guides, makeup tutorials, and the latest beauty trends to
              enhance your routine and discover new products.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <form onSubmit={handleSearch} className="flex-grow">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                </div>
              </form>
              
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={18} className="mr-2" />
                Filter by Category
              </Button>
            </div>
            
            {/* Categories - Mobile */}
            {isFilterOpen && (
              <div className="md:hidden mb-6 p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Categories</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-muted-foreground"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-2">
                  <button
                    className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                      currentCategory === null
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                    onClick={() => {
                      setCurrentCategory(null);
                      navigate("/blog");
                      setIsFilterOpen(false);
                    }}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                        currentCategory === category.toLowerCase()
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => {
                        setCurrentCategory(category.toLowerCase());
                        navigate(`/blog?category=${category.toLowerCase()}`);
                        setIsFilterOpen(false);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Categories - Desktop */}
            <div className="hidden md:flex flex-wrap gap-2">
              <Button
                variant={currentCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCurrentCategory(null);
                  navigate("/blog");
                }}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    currentCategory === category.toLowerCase() ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    setCurrentCategory(category.toLowerCase());
                    navigate(`/blog?category=${category.toLowerCase()}`);
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid gap-10">
              {/* Featured Post Skeleton */}
              <div className="mb-10">
                <Skeleton className="w-full aspect-[21/9] rounded-lg mb-4" />
                <Skeleton className="h-8 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              
              {/* Regular Posts Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index}>
                    <Skeleton className="w-full aspect-[16/9] rounded-lg mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-10">
              {/* Featured Post */}
              {featuredPost && !currentCategory && !searchTerm && (
                <div className="mb-10">
                  <article className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-lg">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">
                        Featured
                      </span>
                    </div>
                    <div>
                      <div className="flex gap-3 text-xs text-muted-foreground mb-3">
                        <span>{featuredPost.date}</span>
                        <span>•</span>
                        <span>{featuredPost.author}</span>
                        <span>•</span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-medium mb-3">
                        <a href={`/blog/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                          {featuredPost.title}
                        </a>
                      </h2>
                      <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                      <Button variant="outline" asChild>
                        <a href={`/blog/${featuredPost.slug}`}>Read Article</a>
                      </Button>
                    </div>
                  </article>
                </div>
              )}
              
              {/* Blog Posts Grid */}
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <BlogPost
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      slug={post.slug}
                      excerpt={post.excerpt}
                      image={post.image}
                      date={post.date}
                      author={post.author}
                      readTime={post.readTime}
                      category={post.category}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border border-dashed rounded-lg">
                  <h3 className="text-xl font-medium mb-2">No articles found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setCurrentCategory(null);
                      navigate("/blog");
                    }}
                  >
                    View All Articles
                  </Button>
                </div>
              )}
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
