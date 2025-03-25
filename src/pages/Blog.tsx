
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/Container";
import { Search, Calendar, User, Clock } from "lucide-react";

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Skincare Layering",
    excerpt: "Learn the correct order to apply your skincare products for maximum effectiveness.",
    image: "https://placehold.co/800x500/f8f9fa/495057?text=Skincare+Layering",
    date: "2023-06-15",
    author: "Sarah Johnson",
    category: "Skincare",
    readTime: "8 min read",
    tags: ["skincare", "beauty tips", "routine"],
  },
  {
    id: 2,
    title: "Summer Makeup Trends You Need to Try",
    excerpt: "Discover the hottest makeup looks for the summer season and how to achieve them.",
    image: "https://placehold.co/800x500/f8f9fa/495057?text=Summer+Makeup",
    date: "2023-06-10",
    author: "Emily Williams",
    category: "Makeup",
    readTime: "6 min read",
    tags: ["makeup", "trends", "summer"],
  },
  {
    id: 3,
    title: "How to Choose the Right Foundation for Your Skin Type",
    excerpt: "Find your perfect foundation match with our comprehensive guide.",
    image: "https://placehold.co/800x500/f8f9fa/495057?text=Foundation+Guide",
    date: "2023-06-05",
    author: "Alex Lee",
    category: "Makeup",
    readTime: "10 min read",
    tags: ["foundation", "makeup", "skin type"],
  },
  {
    id: 4,
    title: "Natural Ingredients That Work Wonders for Acne-Prone Skin",
    excerpt: "Discover natural remedies to combat acne and achieve clear skin.",
    image: "https://placehold.co/800x500/f8f9fa/495057?text=Natural+Ingredients",
    date: "2023-05-28",
    author: "Jessica Brown",
    category: "Skincare",
    readTime: "7 min read",
    tags: ["acne", "natural", "skincare"],
  },
  {
    id: 5,
    title: "The Art of Fragrance Layering",
    excerpt: "Create your signature scent by mastering the technique of fragrance layering.",
    image: "https://placehold.co/800x500/f8f9fa/495057?text=Fragrance+Layering",
    date: "2023-05-20",
    author: "Michael Stevens",
    category: "Fragrance",
    readTime: "5 min read",
    tags: ["fragrance", "perfume", "scent"],
  },
  {
    id: 6,
    title: "Haircare Mistakes You Might Be Making",
    excerpt: "Avoid these common haircare mistakes for healthier, more beautiful hair.",
    image: "https://placehold.co/800x500/f8f9fa/495057?text=Haircare+Mistakes",
    date: "2023-05-15",
    author: "Olivia Davis",
    category: "Haircare",
    readTime: "9 min read",
    tags: ["haircare", "hair health", "tips"],
  },
];

const categories = ["All", "Skincare", "Makeup", "Haircare", "Fragrance"];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Container>
      <div className="py-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Beauty Tips & Trends</h1>
          <p className="text-gray-600">
            Read expert skincare guides, cosmetic how-tos, and more from our beauty experts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search blog..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs 
            value={activeCategory} 
            onValueChange={setActiveCategory}
            className="w-full sm:w-auto"
          >
            <TabsList className="w-full grid grid-cols-3 sm:grid-cols-5">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">No posts found</p>
            <Button onClick={() => {
              setSearchTerm("");
              setActiveCategory("All");
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div 
                key={post.id} 
                className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3">
                    {post.category}
                  </Badge>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs px-2 py-1 bg-secondary/20 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    className="px-0 text-primary hover:text-primary/70 hover:bg-transparent"
                  >
                    Read More →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Blog;
