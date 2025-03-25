
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Share, Facebook, Twitter, Linkedin, Copy } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blog-data";
import BlogPost from "@/components/blog/BlogPost";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(blogPosts.find((post) => post.slug === id));
  const [relatedPosts, setRelatedPosts] = useState<typeof blogPosts>([]);
  
  // If post not found, navigate to blog page
  useEffect(() => {
    if (!id) {
      navigate("/blog");
      return;
    }
    
    // Simulate data loading
    const timer = setTimeout(() => {
      const foundPost = blogPosts.find((post) => post.slug === id);
      
      if (!foundPost) {
        navigate("/blog");
        return;
      }
      
      setPost(foundPost);
      
      // Get related posts with the same category, excluding the current post
      const related = blogPosts
        .filter(
          (p) => p.category === foundPost.category && p.id !== foundPost.id
        )
        .slice(0, 3);
      
      setRelatedPosts(related);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id, navigate]);
  
  // Handle social sharing
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title;
    
    let shareUrl = "";
    
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title || "")}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "The article link has been copied to your clipboard.",
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // Function to render content with basic Markdown
  const renderContent = (content: string) => {
    // Replace headers
    let html = content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold my-4">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold my-3">$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-medium my-3">$1</h4>');
    
    // Replace paragraphs
    html = html.replace(/^(?!<h[1-6]|<ul|<ol|<li|<blockquote)(.+$)/gim, '<p class="my-3">$1</p>');
    
    // Replace lists
    html = html.replace(/^\* (.*)$/gim, '<li class="ml-6 list-disc">$1</li>');
    html = html.replace(/^\d\. (.*)$/gim, '<li class="ml-6 list-decimal">$1</li>');
    
    // Replace bold/italic
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
    
    // Handle line breaks
    html = html.replace(/\n\n/gim, '<br>');
    
    return html;
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24">
          <Container>
            <div className="max-w-3xl mx-auto">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <div className="flex gap-3 mb-8">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="w-full aspect-[16/9] rounded-lg mb-8" />
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-4 w-full mb-3" />
              ))}
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!post) {
    return null; // This should not happen due to the navigate in useEffect
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <article>
          <Container>
            <div className="max-w-3xl mx-auto">
              {/* Back to Blog */}
              <Link
                to="/blog"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Articles
              </Link>
              
              {/* Article Header */}
              <h1 className="text-3xl md:text-4xl font-medium mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground mb-8">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  {post.readTime}
                </div>
              </div>
              
              {/* Featured Image */}
              <div className="w-full aspect-video overflow-hidden rounded-lg mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none mb-10"
                dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
              />
              
              {/* Share Buttons */}
              <div className="border-t border-b py-6 my-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <span className="font-medium">Share this article</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-10 h-10 p-0 rounded-full"
                      onClick={() => handleShare("facebook")}
                    >
                      <Facebook size={18} />
                      <span className="sr-only">Share on Facebook</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-10 h-10 p-0 rounded-full"
                      onClick={() => handleShare("twitter")}
                    >
                      <Twitter size={18} />
                      <span className="sr-only">Share on Twitter</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-10 h-10 p-0 rounded-full"
                      onClick={() => handleShare("linkedin")}
                    >
                      <Linkedin size={18} />
                      <span className="sr-only">Share on LinkedIn</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-10 h-10 p-0 rounded-full"
                      onClick={() => handleShare("copy")}
                    >
                      <Copy size={18} />
                      <span className="sr-only">Copy Link</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </article>
        
        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <Container className="py-16">
            <h2 className="text-2xl font-medium mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogPost
                  key={relatedPost.id}
                  id={relatedPost.id}
                  title={relatedPost.title}
                  slug={relatedPost.slug}
                  excerpt={relatedPost.excerpt}
                  image={relatedPost.image}
                  date={relatedPost.date}
                  author={relatedPost.author}
                  readTime={relatedPost.readTime}
                  category={relatedPost.category}
                />
              ))}
            </div>
          </Container>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
