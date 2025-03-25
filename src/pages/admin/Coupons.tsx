
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
  Edit, 
  Trash,
  Copy,
  Tag,
  RefreshCw,
  Plus
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample coupon data
const initialCoupons = [
  {
    id: 1,
    code: "WELCOME20",
    discount: 20,
    type: "Percentage",
    minPurchase: 50,
    startDate: "2023-06-01",
    endDate: "2023-12-31",
    usage: 145,
    limit: 500,
    status: "Active"
  },
  {
    id: 2,
    code: "SUMMER2023",
    discount: 15,
    type: "Percentage",
    minPurchase: 75,
    startDate: "2023-06-15",
    endDate: "2023-09-01",
    usage: 87,
    limit: 300,
    status: "Active"
  },
  {
    id: 3,
    code: "FREESHIP",
    discount: 10,
    type: "Fixed",
    minPurchase: 100,
    startDate: "2023-05-01",
    endDate: "2023-07-31",
    usage: 203,
    limit: 200,
    status: "Exhausted"
  },
  {
    id: 4,
    code: "COMEBACK25",
    discount: 25,
    type: "Percentage",
    minPurchase: 60,
    startDate: "2023-07-01",
    endDate: "2023-08-31",
    usage: 0,
    limit: 250,
    status: "Scheduled"
  },
  {
    id: 5,
    code: "FLASH50",
    discount: 50,
    type: "Percentage",
    minPurchase: 150,
    startDate: "2023-06-01",
    endDate: "2023-06-15",
    usage: 189,
    limit: 200,
    status: "Expired"
  }
];

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || coupon.status.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const handleEditClick = (coupon: any) => {
    setCurrentCoupon(coupon);
    setIsDialogOpen(true);
  };

  const handleAddClick = () => {
    const newCoupon = {
      id: coupons.length + 1,
      code: "",
      discount: 10,
      type: "Percentage",
      minPurchase: 50,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      usage: 0,
      limit: 100,
      status: "Active"
    };
    setCurrentCoupon(newCoupon);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (coupon: any) => {
    setCurrentCoupon(coupon);
    setIsDeleteDialogOpen(true);
  };

  const handleToggleCouponStatus = (coupon: any) => {
    const updatedCoupons = coupons.map(c => 
      c.id === coupon.id 
        ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } 
        : c
    );
    
    setCoupons(updatedCoupons);
    
    toast({
      title: "Coupon status updated",
      description: `Coupon ${coupon.code} is now ${coupon.status === "Active" ? "inactive" : "active"}.`,
    });
  };

  const generateCouponCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    if (currentCoupon) {
      setCurrentCoupon({
        ...currentCoupon,
        code: result
      });
    }
  };

  const handleCopyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: `Coupon code ${code} copied to clipboard.`,
    });
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (coupons.some(c => c.id === currentCoupon.id)) {
      // Update existing coupon
      setCoupons(coupons.map(c => c.id === currentCoupon.id ? currentCoupon : c));
      toast({
        title: "Coupon updated",
        description: `Coupon ${currentCoupon.code} has been updated successfully.`,
      });
    } else {
      // Add new coupon
      setCoupons([...coupons, currentCoupon]);
      toast({
        title: "Coupon created",
        description: `Coupon ${currentCoupon.code} has been created successfully.`,
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleDeleteCoupon = () => {
    setCoupons(coupons.filter(c => c.id !== currentCoupon.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Coupon deleted",
      description: `Coupon ${currentCoupon.code} has been deleted.`,
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Scheduled</Badge>;
      case "exhausted":
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">Exhausted</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Coupons & Discounts</h1>
        <Button onClick={handleAddClick}>
          <Plus className="mr-2 h-4 w-4" /> Create Coupon
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search coupon codes..."
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
            <SelectItem value="all">All Coupons</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="exhausted">Exhausted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Min Purchase</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No coupons found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      {coupon.code}
                    </div>
                  </TableCell>
                  <TableCell>
                    {coupon.type === "Percentage" ? `${coupon.discount}%` : `$${coupon.discount}`}
                  </TableCell>
                  <TableCell>${coupon.minPurchase}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(coupon.startDate).toLocaleDateString()}</div>
                      <div>to {new Date(coupon.endDate).toLocaleDateString()}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{coupon.usage} / {coupon.limit}</div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-primary h-1.5 rounded-full" 
                          style={{ width: `${Math.min(100, coupon.usage / coupon.limit * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(coupon.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(coupon)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCopyCouponCode(coupon.code)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Code
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleCouponStatus(coupon)}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Toggle Status
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteClick(coupon)}
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

      {/* Coupon Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentCoupon && currentCoupon.code ? `Edit: ${currentCoupon.code}` : "Create New Coupon"}
            </DialogTitle>
            <DialogDescription>
              {currentCoupon && currentCoupon.code 
                ? "Update coupon details and settings" 
                : "Fill in the details to create a new coupon"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveCoupon}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="code">Coupon Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    placeholder="e.g. SUMMER2023"
                    value={currentCoupon?.code || ""}
                    onChange={(e) => setCurrentCoupon({...currentCoupon, code: e.target.value.toUpperCase()})}
                    className="uppercase"
                    required
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={generateCouponCode}
                  >
                    Generate
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount Value</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="10"
                    value={currentCoupon?.discount || ""}
                    onChange={(e) => setCurrentCoupon({...currentCoupon, discount: parseFloat(e.target.value)})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Discount Type</Label>
                  <Select
                    value={currentCoupon?.type || "Percentage"}
                    onValueChange={(value) => setCurrentCoupon({...currentCoupon, type: value})}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Percentage">Percentage (%)</SelectItem>
                      <SelectItem value="Fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minPurchase">Minimum Purchase Amount ($)</Label>
                <Input
                  id="minPurchase"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="50"
                  value={currentCoupon?.minPurchase || ""}
                  onChange={(e) => setCurrentCoupon({...currentCoupon, minPurchase: parseFloat(e.target.value)})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={currentCoupon?.startDate || ""}
                    onChange={(e) => setCurrentCoupon({...currentCoupon, startDate: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={currentCoupon?.endDate || ""}
                    onChange={(e) => setCurrentCoupon({...currentCoupon, endDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="limit">Usage Limit</Label>
                <Input
                  id="limit"
                  type="number"
                  min="1"
                  placeholder="100"
                  value={currentCoupon?.limit || ""}
                  onChange={(e) => setCurrentCoupon({...currentCoupon, limit: parseInt(e.target.value)})}
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="status">Active Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Coupon will be available for customers to use
                  </p>
                </div>
                <Switch
                  id="status"
                  checked={currentCoupon?.status === "Active"}
                  onCheckedChange={(checked) => 
                    setCurrentCoupon({...currentCoupon, status: checked ? "Active" : "Inactive"})
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {currentCoupon && currentCoupon.code ? "Update Coupon" : "Create Coupon"}
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
              Are you sure you want to delete coupon "{currentCoupon?.code}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCoupon}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCoupons;
