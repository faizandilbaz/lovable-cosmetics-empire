
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  MoreHorizontal, 
  Search, 
  Edit, 
  Trash, 
  Eye,
  Upload,
  Calendar
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample blog data
const initialBlogPosts = [
  {
    id: 1,
    title: "10 Skincare Tips for Winter",
    slug: "10-skincare-tips-for-winter",
    excerpt: "Keep your skin hydrated and glowing during the cold winter months with these essential tips.",
    category: "Skincare",
    author: "Sarah Johnson",
    date: "2023-06-18",
    status: "Published",
    image: "https://placehold.co/100x60"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Clean Beauty",
    slug: "ultimate-guide-clean-beauty",
    excerpt: "Discover what clean beauty really means and the top products to incorporate into your routine.",
    category: "Clean Beauty",
    author: "Emma Wilson",
    date: "2023-06-15",
    status: "Published",
    image: "https://placehold.co/100x60"
  },
  {
    id: 3,
    title: "Summer Makeup Trends to Try",
    slug: "summer-makeup-trends",
    excerpt: "From dewy skin to bold colors, these are the makeup trends taking over this summer.",
    category: "Makeup",
    author: "Michael Lee",
    date: "2023-06-12",
    status: "Published",
    image: "https://placehold.co/100x60"
  },
  {
    id: 4,
    title: "How to Build a Skincare Routine",
    slug: "build-skincare-routine",
    excerpt: "A step-by-step guide to creating the perfect skincare routine for your skin type.",
    category: "Skincare",
    author: "Sarah Johnson",
    date: "2023-06-10",
    status: "Draft",
    image: "https://placehold.co/100x60"
  },
  {
    id: 5,
    title: "The Benefits of Natural Ingredients",
    slug: "benefits-natural-ingredients",
    excerpt: "Why natural ingredients can make a difference in your beauty products and skin health.",
    category: "Ingredients",
    author: "Jacob Miller",
    date: "2023-06-08",
    status: "Scheduled",
    image: "https://placehold.co/100x60"
  }
];

const categories = ["Skincare", "Makeup", "Clean Beauty", "Ingredients", "Haircare", "Fragrance", "Tutorials"];

const AdminBlog = () => {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const { toast } = useToast();

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || post.status.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const handleEditClick = (post: any) => {
    setCurrentPost(post);
    setEditorContent(post.excerpt);
    setIsDialogOpen(true);
  };

  const handleAddClick = () => {
    const newPost = {
      id: blogPosts.length + 1,
      title: "",
      slug: "",
      excerpt: "",
      category: "",
      author: "Sarah Johnson", // Default author
      date: new Date().toISOString().split('T')[0],
      status: "Draft",
      image: "https://placehold.co/100x60"
    };
    setCurrentPost(newPost);
    setEditorContent("");
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (post: any) => {
    setCurrentPost(post);
    setIsDeleteDialogOpen(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setCurrentPost({
      ...currentPost,
      title,
      slug: generateSlug(title)
    });
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update excerpt from editor content
    const postToSave = {
      ...currentPost,
      excerpt: editorContent
    };
    
    if (blogPosts.some(p => p.id === currentPost.id)) {
      // Update existing post
      setBlogPosts(blogPosts.map(p => p.id === currentPost.id ? postToSave : p));
      toast({
        title: "Blog post updated",
        description: `"${currentPost.title}" has been updated successfully.`,
      });
    } else {
      // Add new post
      setBlogPosts([...blogPosts, postToSave]);
      toast({
        title: "Blog post created",
        description: `"${currentPost.title}" has been created successfully.`,
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleDeletePost = () => {
    setBlogPosts(blogPosts.filter(p => p.id !== currentPost.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Blog post deleted",
      description: `"${currentPost.title}" has been deleted.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <Button onClick={handleAddClick}>
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Posts</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="date-desc">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="date-asc">Oldest First</SelectItem>
            <SelectItem value="title-asc">Title A-Z</SelectItem>
            <SelectItem value="title-desc">Title Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No blog posts found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={post.image} alt={post.title} className="h-10 w-16 rounded object-cover" />
                      <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">{post.excerpt}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      post.status === "Published" ? "default" : 
                      post.status === "Draft" ? "secondary" : 
                      "outline"
                    }>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(post)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteClick(post)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Blog Post Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {currentPost && currentPost.title ? `Edit: ${currentPost.title}` : "Create New Blog Post"}
            </DialogTitle>
            <DialogDescription>
              {currentPost && currentPost.title 
                ? "Update your blog post content and settings." 
                : "Fill in the details to create a new blog post."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSavePost}>
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter post title"
                    value={currentPost?.title || ""}
                    onChange={handleTitleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-32 w-48 overflow-hidden rounded border bg-gray-50 flex items-center justify-center">
                      <img 
                        src={currentPost?.image || "https://placehold.co/100x60"} 
                        alt="Featured" 
                        className="max-h-full" 
                      />
                    </div>
                    <Button type="button" variant="outline">
                      <Upload className="mr-2 h-4 w-4" /> Upload Image
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <div className="border rounded-md p-2 min-h-[300px]">
                    <Textarea
                      id="content"
                      placeholder="Write your blog post content here..."
                      value={editorContent}
                      onChange={(e) => setEditorContent(e.target.value)}
                      className="min-h-[280px] border-none focus-visible:ring-0 p-0"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is a simplified editor. In a real implementation, you would integrate a rich text editor.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      placeholder="post-url-slug"
                      value={currentPost?.slug || ""}
                      onChange={(e) => setCurrentPost({...currentPost, slug: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={currentPost?.category || ""}
                      onValueChange={(value) => setCurrentPost({...currentPost, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Select
                      value={currentPost?.author || ""}
                      onValueChange={(value) => setCurrentPost({...currentPost, author: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select author" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="Emma Wilson">Emma Wilson</SelectItem>
                        <SelectItem value="Michael Lee">Michael Lee</SelectItem>
                        <SelectItem value="Jacob Miller">Jacob Miller</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Publish Date</Label>
                    <div className="flex gap-2">
                      <Input
                        id="date"
                        type="date"
                        value={currentPost?.date || ""}
                        onChange={(e) => setCurrentPost({...currentPost, date: e.target.value})}
                      />
                      <Button type="button" variant="outline" size="icon">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief summary of the post"
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={currentPost?.status || "Draft"}
                    onValueChange={(value) => setCurrentPost({...currentPost, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="seo-title">SEO Title</Label>
                  <Input
                    id="seo-title"
                    placeholder="SEO optimized title"
                    defaultValue={currentPost?.title || ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="seo-description">SEO Description</Label>
                  <Textarea
                    id="seo-description"
                    placeholder="Meta description for search engines"
                    defaultValue={currentPost?.excerpt || ""}
                    rows={2}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="mt-4 gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" variant="secondary">
                Save as Draft
              </Button>
              <Button type="submit">
                {currentPost?.status === "Published" ? "Update" : "Publish"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentPost?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePost}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;
