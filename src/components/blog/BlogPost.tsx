
import { Link } from "react-router-dom";
import { Calendar, User, Clock, Tag } from "lucide-react";

interface BlogPostProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  featured?: boolean;
}

const BlogPost = ({
  id,
  title,
  slug,
  excerpt,
  image,
  date,
  author,
  readTime,
  category,
  featured = false,
}: BlogPostProps) => {
  return (
    <article className={`blog-post ${featured ? 'featured' : ''}`}>
      <Link to={`/blog/${slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {featured && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">
              Featured
            </span>
          )}
        </div>
      </Link>
      
      <div className="flex gap-3 text-xs text-muted-foreground mb-3">
        <div className="flex items-center">
          <Calendar size={14} className="mr-1" />
          <span>{date}</span>
        </div>
        <div className="flex items-center">
          <User size={14} className="mr-1" />
          <span>{author}</span>
        </div>
        <div className="flex items-center">
          <Clock size={14} className="mr-1" />
          <span>{readTime}</span>
        </div>
      </div>
      
      <Link to={`/blog/${slug}`} className="block">
        <h3 className="text-xl font-medium mb-2 hover:text-primary transition-colors">
          {title}
        </h3>
      </Link>
      
      <p className="text-muted-foreground mb-3">{excerpt}</p>
      
      <div className="flex items-center">
        <Link
          to={`/blog?category=${category.toLowerCase()}`}
          className="flex items-center text-xs text-primary"
        >
          <Tag size={14} className="mr-1" />
          {category}
        </Link>
        <Link
          to={`/blog/${slug}`}
          className="ml-auto text-sm text-primary hover:underline"
        >
          Read More
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;
