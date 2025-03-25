
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  FacebookIcon, 
  TwitterIcon, 
  LinkedinIcon, 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Heart, 
  MessageSquare,
  Share2 
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Separator } from "@/components/ui/separator";

// Mock blog post data
const blogPosts = [
  {
    id: "1",
    title: "The Ultimate Guide to Skincare Layering",
    content: `
      <p>The order in which you apply your skincare products can significantly impact their effectiveness. To help you achieve the best results from your skincare routine, we've created this comprehensive guide to skincare layering.</p>
      
      <h2>Why is the order important?</h2>
      <p>Applying your products in the correct order ensures that each one can penetrate the skin and deliver its active ingredients effectively. Some products create a barrier on the skin's surface, so anything applied afterward may not be able to penetrate as deeply.</p>
      
      <h2>Morning Skincare Routine</h2>
      <ol>
        <li><strong>Cleanser:</strong> Start with a gentle cleanser to remove any dirt, oil, or residue that accumulated overnight.</li>
        <li><strong>Toner:</strong> Apply toner to balance your skin's pH and prepare it for the next steps.</li>
        <li><strong>Serums:</strong> Apply water-based serums first, followed by oil-based serums. Antioxidant serums like Vitamin C are great for daytime protection.</li>
        <li><strong>Eye Cream:</strong> Gently pat eye cream around the orbital bone using your ring finger.</li>
        <li><strong>Moisturizer:</strong> Lock in hydration with a moisturizer appropriate for your skin type.</li>
        <li><strong>Sunscreen:</strong> Always finish with SPF 30 or higher, even on cloudy days.</li>
      </ol>
      
      <h2>Evening Skincare Routine</h2>
      <ol>
        <li><strong>Makeup Remover:</strong> If you wear makeup, use a dedicated makeup remover first.</li>
        <li><strong>Cleanser:</strong> Double cleanse if necessary to thoroughly remove sunscreen, makeup, and daily pollution.</li>
        <li><strong>Exfoliant:</strong> Use chemical exfoliants (AHAs, BHAs) 2-3 times per week after cleansing.</li>
        <li><strong>Toner:</strong> Apply toner to rebalance the skin's pH.</li>
        <li><strong>Treatments:</strong> Apply targeted treatments like acne spot treatments or prescription products.</li>
        <li><strong>Serums:</strong> Apply serums with active ingredients like retinol, peptides, or hyaluronic acid.</li>
        <li><strong>Eye Cream:</strong> Apply eye cream as in your morning routine.</li>
        <li><strong>Moisturizer:</strong> Finish with a moisturizer to seal in all the previous layers.</li>
        <li><strong>Face Oil:</strong> If your skin is particularly dry, you can add a facial oil as the final step.</li>
      </ol>
      
      <h2>Tips for Maximum Effectiveness</h2>
      <ul>
        <li>Wait 1-2 minutes between steps to allow each product to absorb properly.</li>
        <li>Apply products from thinnest to thickest consistency.</li>
        <li>Don't mix too many active ingredients at once; this can irritate the skin.</li>
        <li>Listen to your skin and adjust your routine as needed.</li>
      </ul>
      
      <p>Remember that skincare is personal, and what works for someone else might not work for you. Pay attention to how your skin responds and adjust your routine accordingly. Consistency is key to seeing results, so stick with your routine for at least 4-6 weeks before evaluating its effectiveness.</p>
    `,
    image: "https://placehold.co/1200x600/f8f9fa/495057?text=Skincare+Layering",
    date: "2023-06-15",
    author: "Sarah Johnson",
    category: "Skincare",
    readTime: "8 min read",
    tags: ["skincare", "beauty tips", "routine"],
    relatedPosts: [3, 4, 6],
    comments: 12,
    likes: 48,
  },
  {
    id: "2",
    title: "Summer Makeup Trends You Need to Try",
    content: "Full content for summer makeup trends post...",
    image: "https://placehold.co/1200x600/f8f9fa/495057?text=Summer+Makeup",
    date: "2023-06-10",
    author: "Emily Williams",
    category: "Makeup",
    readTime: "6 min read",
    tags: ["makeup", "trends", "summer"],
    relatedPosts: [1, 3, 5],
    comments: 8,
    likes: 36,
  },
  {
    id: "3",
    title: "How to Choose the Right Foundation for Your Skin Type",
    content: "Full content for foundation guide post...",
    image: "https://placehold.co/1200x600/f8f9fa/495057?text=Foundation+Guide",
    date: "2023-06-05",
    author: "Alex Lee",
    category: "Makeup",
    readTime: "10 min read",
    tags: ["foundation", "makeup", "skin type"],
    relatedPosts: [1, 2, 4],
    comments: 15,
    likes: 53,
  },
  {
    id: "4",
    title: "Natural Ingredients That Work Wonders for Acne-Prone Skin",
    content: "Full content for natural ingredients post...",
    image: "https://placehold.co/1200x600/f8f9fa/495057?text=Natural+Ingredients",
    date: "2023-05-28",
    author: "Jessica Brown",
    category: "Skincare",
    readTime: "7 min read",
    tags: ["acne", "natural", "skincare"],
    relatedPosts: [1, 3, 6],
    comments: 20,
    likes: 62,
  },
  {
    id: "5",
    title: "The Art of Fragrance Layering",
    content: "Full content for fragrance layering post...",
    image: "https://placehold.co/1200x600/f8f9fa/495057?text=Fragrance+Layering",
    date: "2023-05-20",
    author: "Michael Stevens",
    category: "Fragrance",
    readTime: "5 min read",
    tags: ["fragrance", "perfume", "scent"],
    relatedPosts: [2, 6],
    comments: 6,
    likes: 28,
  },
  {
    id: "6",
    title: "Haircare Mistakes You Might Be Making",
    content: "Full content for haircare mistakes post...",
    image: "https://placehold.co/1200x600/f8f9fa/495057?text=Haircare+Mistakes",
    date: "2023-05-15",
    author: "Olivia Davis",
    category: "Haircare",
    readTime: "9 min read",
    tags: ["haircare", "hair health", "tips"],
    relatedPosts: [1, 4, 5],
    comments: 18,
    likes: 45,
  },
];

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const post = blogPosts.find((post) => post.id === id);
  
  if (!post) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
        </div>
      </Container>
    );
  }
  
  const relatedPosts = post.relatedPosts.map(
    (relatedId) => blogPosts.find((p) => p.id === String(relatedId))
  ).filter((p): p is (typeof blogPosts)[0] => p !== undefined);

  return (
    <Container>
      <div className="py-10 max-w-4xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 pl-0 hover:bg-transparent" 
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
        
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap mb-6">
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs px-2 py-1 bg-secondary/20 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-auto aspect-[2/1] object-cover rounded-lg"
          />
        </div>
        
        {/* Article Content */}
        <article 
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Social Actions */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{post.likes}</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{post.comments}</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-1">Share:</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <FacebookIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <TwitterIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <LinkedinIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Separator className="my-10" />
        
        {/* Related Posts */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <div 
                key={related.id} 
                className="group cursor-pointer"
                onClick={() => {
                  navigate(`/blog/${related.id}`);
                  window.scrollTo(0, 0);
                }}
              >
                <div className="h-36 rounded-lg overflow-hidden mb-3">
                  <img 
                    src={related.image} 
                    alt={related.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {related.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(related.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Comments Section - Simplified for now */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Comments ({post.comments})</h2>
          <div className="bg-secondary/10 rounded-lg p-6 text-center">
            <p className="text-muted-foreground mb-4">Sign in to leave a comment</p>
            <Button onClick={() => navigate('/account')}>Sign In</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BlogPost;
