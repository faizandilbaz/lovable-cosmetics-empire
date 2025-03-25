
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
  MoreHorizontal, 
  Search, 
  MessageSquare, 
  Trash,
  Eye,
  Star,
  CheckCircle,
  XCircle,
  Flag
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample review data
const initialReviews = [
  {
    id: 1,
    product: "Luxury Face Cream",
    customer: "Emma Wilson",
    email: "emma@example.com",
    rating: 5,
    comment: "I've been using this for a month now and my skin has never looked better! Totally worth the price.",
    date: "2023-06-18",
    status: "Approved",
    hasResponse: false,
    response: "",
    reported: false
  },
  {
    id: 2,
    product: "Hydrating Serum",
    customer: "Michael Lee",
    email: "michael@example.com",
    rating: 4,
    comment: "Great product overall. I noticed a difference in my skin's hydration after just a week. Taking off one star because the dispenser is a bit difficult to use.",
    date: "2023-06-17",
    status: "Approved",
    hasResponse: true,
    response: "Thank you for your feedback, Michael! We're working on improving the dispenser in our next version.",
    reported: false
  },
  {
    id: 3,
    product: "Matte Lipstick",
    customer: "Sophia Davis",
    email: "sophia@example.com",
    rating: 5,
    comment: "The color is gorgeous and it lasts all day without drying out my lips. Will definitely purchase more colors!",
    date: "2023-06-16",
    status: "Approved",
    hasResponse: false,
    response: "",
    reported: false
  },
  {
    id: 4,
    product: "Revitalizing Shampoo",
    customer: "Jacob Miller",
    email: "jacob@example.com",
    rating: 2,
    comment: "This made my hair feel dry and brittle. Not at all what I expected from the description.",
    date: "2023-06-15",
    status: "Pending",
    hasResponse: false,
    response: "",
    reported: false
  },
  {
    id: 5,
    product: "Signature Perfume",
    customer: "Olivia Brown",
    email: "olivia@example.com",
    rating: 1,
    comment: "This perfume smells nothing like the description. It gave me a headache and the scent doesn't last at all. Complete waste of money!",
    date: "2023-06-14",
    status: "Pending",
    hasResponse: false,
    response: "",
    reported: true
  }
];

const AdminReviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentReview, setCurrentReview] = useState<any>(null);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [responseText, setResponseText] = useState("");
  const { toast } = useToast();

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = (
      filter === "all" || 
      (filter === "approved" && review.status === "Approved") ||
      (filter === "pending" && review.status === "Pending") ||
      (filter === "reported" && review.reported) ||
      (filter === "high-rating" && review.rating >= 4) ||
      (filter === "low-rating" && review.rating <= 2)
    );
    
    return matchesSearch && matchesFilter;
  });

  const handleViewReview = (review: any) => {
    setCurrentReview(review);
    setIsViewDialogOpen(true);
  };

  const handleReplyClick = (review: any) => {
    setCurrentReview(review);
    setResponseText(review.response || "");
    setIsReplyDialogOpen(true);
  };

  const handleDeleteClick = (review: any) => {
    setCurrentReview(review);
    setIsDeleteDialogOpen(true);
  };

  const handleApproveReview = (review: any) => {
    const updatedReviews = reviews.map(r => 
      r.id === review.id ? { ...r, status: "Approved" } : r
    );
    
    setReviews(updatedReviews);
    
    toast({
      title: "Review approved",
      description: `The review for ${review.product} has been approved.`,
    });
  };

  const handleRejectReview = (review: any) => {
    const updatedReviews = reviews.map(r => 
      r.id === review.id ? { ...r, status: "Rejected" } : r
    );
    
    setReviews(updatedReviews);
    
    toast({
      title: "Review rejected",
      description: `The review for ${review.product} has been rejected.`,
    });
  };

  const handleToggleReported = (review: any) => {
    const updatedReviews = reviews.map(r => 
      r.id === review.id ? { ...r, reported: !r.reported } : r
    );
    
    setReviews(updatedReviews);
    
    toast({
      title: review.reported ? "Report resolved" : "Review flagged",
      description: review.reported 
        ? `The report for this review has been resolved.` 
        : `The review has been flagged for further review.`,
    });
  };

  const handleSaveResponse = () => {
    const updatedReviews = reviews.map(r => 
      r.id === currentReview.id 
        ? { 
            ...r, 
            response: responseText, 
            hasResponse: responseText.trim() !== "" 
          } 
        : r
    );
    
    setReviews(updatedReviews);
    setIsReplyDialogOpen(false);
    
    toast({
      title: "Response saved",
      description: responseText.trim() !== "" 
        ? `Your response to ${currentReview.customer}'s review has been saved.`
        : `Response removed.`,
    });
  };

  const handleDeleteReview = () => {
    setReviews(reviews.filter(r => r.id !== currentReview.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Review deleted",
      description: `The review for ${currentReview.product} has been deleted.`,
      variant: "destructive",
    });
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
      />
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reviews Management</h1>
        <Button
          variant="outline"
          onClick={() => {
            // Toggle global review settings would go here
            toast({
              title: "Reviews settings updated",
              description: "Global review settings have been updated.",
            });
          }}
        >
          Global Review Settings
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter reviews" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reviews</SelectItem>
            <SelectItem value="approved">Approved Only</SelectItem>
            <SelectItem value="pending">Pending Approval</SelectItem>
            <SelectItem value="reported">Reported</SelectItem>
            <SelectItem value="high-rating">High Rating (4-5)</SelectItem>
            <SelectItem value="low-rating">Low Rating (1-2)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No reviews found.
                </TableCell>
              </TableRow>
            ) : (
              filteredReviews.map((review) => (
                <TableRow key={review.id} className={review.reported ? "bg-red-50 dark:bg-red-950/10" : ""}>
                  <TableCell className="font-medium">{review.product}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{review.customer.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{review.customer}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </TableCell>
                  <TableCell>
                    <p className="truncate max-w-xs">{review.comment}</p>
                    {review.hasResponse && (
                      <p className="text-xs text-muted-foreground italic mt-1">
                        Has response
                      </p>
                    )}
                  </TableCell>
                  <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      review.status === "Approved" ? "default" : 
                      review.status === "Rejected" ? "destructive" : 
                      "secondary"
                    }>
                      {review.status}
                    </Badge>
                    {review.reported && (
                      <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 border-red-200">
                        Reported
                      </Badge>
                    )}
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
                        <DropdownMenuItem onClick={() => handleViewReview(review)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleReplyClick(review)}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          {review.hasResponse ? "Edit Response" : "Respond"}
                        </DropdownMenuItem>
                        {review.status === "Pending" && (
                          <>
                            <DropdownMenuItem onClick={() => handleApproveReview(review)}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRejectReview(review)}>
                              <XCircle className="mr-2 h-4 w-4 text-red-500" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem onClick={() => handleToggleReported(review)}>
                          <Flag className="mr-2 h-4 w-4" />
                          {review.reported ? "Resolve Report" : "Flag Review"}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteClick(review)}
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

      {/* View Review Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>
          {currentReview && (
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Product:</h3>
                    <p>{currentReview.product}</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-medium">Rating:</h3>
                    <div className="flex justify-end">{renderStars(currentReview.rating)}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Avatar>
                    <AvatarFallback>{currentReview.customer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{currentReview.customer}</p>
                    <p className="text-sm text-muted-foreground">{currentReview.email}</p>
                  </div>
                </div>
                <div className="border rounded-md p-3 bg-muted/30">
                  <p>{currentReview.comment}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Posted on {new Date(currentReview.date).toLocaleDateString()}
                </p>
              </div>
              
              {currentReview.hasResponse && (
                <div>
                  <h3 className="font-medium">Our Response:</h3>
                  <div className="border rounded-md p-3 bg-primary/5 mt-1">
                    <p>{currentReview.response}</p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">Status: </h3>
                  <Badge variant={
                    currentReview.status === "Approved" ? "default" : 
                    currentReview.status === "Rejected" ? "destructive" : 
                    "secondary"
                  }>
                    {currentReview.status}
                  </Badge>
                </div>
                {currentReview.reported && (
                  <div className="text-right">
                    <h3 className="font-medium">Reported: </h3>
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                      Yes
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setIsViewDialogOpen(false);
              handleReplyClick(currentReview);
            }}>
              <MessageSquare className="mr-2 h-4 w-4" />
              {currentReview?.hasResponse ? "Edit Response" : "Respond"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentReview?.hasResponse ? "Edit Response" : "Respond to Review"}
            </DialogTitle>
            <DialogDescription>
              {currentReview?.hasResponse 
                ? "Update your response to this customer review." 
                : "Write a response to address this customer's feedback."}
            </DialogDescription>
          </DialogHeader>
          {currentReview && (
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-md p-3">
                <div className="flex gap-2 mb-2">
                  <div className="flex">{renderStars(currentReview.rating)}</div>
                  <p className="font-medium">{currentReview.product}</p>
                </div>
                <p className="text-sm">{currentReview.comment}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  - {currentReview.customer}, {new Date(currentReview.date).toLocaleDateString()}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="response">Your Response</Label>
                <Textarea
                  id="response"
                  placeholder="Write your response here..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={6}
                />
                <p className="text-sm text-muted-foreground">
                  Be professional and courteous. Thank the customer for their feedback.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveResponse}>
              Save Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteReview}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReviews;
