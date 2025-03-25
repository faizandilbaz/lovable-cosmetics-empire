
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
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  MoreHorizontal, 
  UserCog, 
  Edit, 
  Trash,
  Shield,
  Package,
  ShoppingCart,
  FileText,
  Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample manager data
const initialManagers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    role: "Admin",
    lastLogin: "2 hours ago",
    permissions: {
      products: { read: true, write: true, delete: true },
      orders: { read: true, write: true, delete: true },
      blog: { read: true, write: true, delete: true },
      reviews: { read: true, write: true, delete: true },
      users: { read: true, write: true, delete: true },
      settings: { read: true, write: true, delete: true }
    },
    avatar: "https://placehold.co/40x40"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Product Manager",
    lastLogin: "1 day ago",
    permissions: {
      products: { read: true, write: true, delete: false },
      orders: { read: true, write: false, delete: false },
      blog: { read: true, write: false, delete: false },
      reviews: { read: true, write: false, delete: false },
      users: { read: false, write: false, delete: false },
      settings: { read: false, write: false, delete: false }
    },
    avatar: "https://placehold.co/40x40"
  },
  {
    id: 3,
    name: "Michael Lee",
    email: "michael@example.com",
    role: "Order Manager",
    lastLogin: "5 hours ago",
    permissions: {
      products: { read: true, write: false, delete: false },
      orders: { read: true, write: true, delete: false },
      blog: { read: false, write: false, delete: false },
      reviews: { read: false, write: false, delete: false },
      users: { read: false, write: false, delete: false },
      settings: { read: false, write: false, delete: false }
    },
    avatar: "https://placehold.co/40x40"
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily@example.com",
    role: "Content Manager",
    lastLogin: "3 days ago",
    permissions: {
      products: { read: true, write: false, delete: false },
      orders: { read: false, write: false, delete: false },
      blog: { read: true, write: true, delete: true },
      reviews: { read: true, write: true, delete: true },
      users: { read: false, write: false, delete: false },
      settings: { read: false, write: false, delete: false }
    },
    avatar: "https://placehold.co/40x40"
  }
];

const AdminManagers = () => {
  const [managers, setManagers] = useState(initialManagers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentManager, setCurrentManager] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEditClick = (manager: any) => {
    setCurrentManager(manager);
    setIsDialogOpen(true);
  };

  const handleAddClick = () => {
    setCurrentManager({
      id: managers.length + 1,
      name: "",
      email: "",
      role: "Manager",
      lastLogin: "Never",
      permissions: {
        products: { read: false, write: false, delete: false },
        orders: { read: false, write: false, delete: false },
        blog: { read: false, write: false, delete: false },
        reviews: { read: false, write: false, delete: false },
        users: { read: false, write: false, delete: false },
        settings: { read: false, write: false, delete: false }
      },
      avatar: "https://placehold.co/40x40"
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (manager: any) => {
    setCurrentManager(manager);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveManager = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (managers.some(m => m.id === currentManager.id)) {
      // Update existing manager
      setManagers(managers.map(m => m.id === currentManager.id ? currentManager : m));
      toast({
        title: "Manager updated",
        description: `${currentManager.name}'s account has been updated successfully.`,
      });
    } else {
      // Add new manager
      setManagers([...managers, currentManager]);
      toast({
        title: "Manager added",
        description: `${currentManager.name}'s account has been created successfully.`,
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleDeleteManager = () => {
    setManagers(managers.filter(m => m.id !== currentManager.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Manager deleted",
      description: `${currentManager.name}'s account has been deleted.`,
      variant: "destructive",
    });
  };

  const handlePermissionChange = (section: string, permission: string, checked: boolean) => {
    setCurrentManager({
      ...currentManager,
      permissions: {
        ...currentManager.permissions,
        [section]: {
          ...currentManager.permissions[section],
          [permission]: checked
        }
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User & Role Management</h1>
        <Button onClick={handleAddClick}>
          <Plus className="mr-2 h-4 w-4" /> Add Manager
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {managers.map((manager) => (
              <TableRow key={manager.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={manager.avatar} alt={manager.name} />
                    <AvatarFallback>{manager.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{manager.name}</TableCell>
                <TableCell>{manager.email}</TableCell>
                <TableCell>
                  <Badge variant={manager.role === "Admin" ? "default" : "secondary"}>
                    {manager.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(manager.permissions).map(([key, value]) => 
                      value.read && (
                        <Badge key={key} variant="outline" className="capitalize">
                          {key}
                        </Badge>
                      )
                    )}
                  </div>
                </TableCell>
                <TableCell>{manager.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditClick(manager)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteClick(manager)}
                        disabled={manager.role === "Admin"}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Manager Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentManager && currentManager.name ? `Edit ${currentManager.name}` : "Add New Manager"}
            </DialogTitle>
            <DialogDescription>
              Configure user information and permissions.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveManager}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter name"
                    value={currentManager?.name || ""}
                    onChange={(e) => setCurrentManager({...currentManager, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={currentManager?.email || ""}
                    onChange={(e) => setCurrentManager({...currentManager, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    placeholder="e.g. Product Manager"
                    value={currentManager?.role || ""}
                    onChange={(e) => setCurrentManager({...currentManager, role: e.target.value})}
                    required
                  />
                </div>
                {currentManager && currentManager.id !== 1 && (
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder={currentManager.name ? "Leave blank to keep current" : "Enter password"}
                      required={!currentManager.name}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-4">
                <h3 className="text-lg font-medium">Permissions</h3>
                <p className="text-sm text-muted-foreground">
                  Configure what this user can do.
                </p>
              </div>

              <div className="space-y-4">
                {/* Product Permissions */}
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="h-5 w-5" />
                    <h4 className="font-medium">Products</h4>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="products-read" 
                        checked={currentManager?.permissions?.products?.read || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange('products', 'read', checked === true)
                        }
                        disabled={currentManager?.id === 1}
                      />
                      <Label htmlFor="products-read">View</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="products-write" 
                        checked={currentManager?.permissions?.products?.write || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange('products', 'write', checked === true)
                        }
                        disabled={currentManager?.id === 1}
                      />
                      <Label htmlFor="products-write">Edit</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="products-delete" 
                        checked={currentManager?.permissions?.products?.delete || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange('products', 'delete', checked === true)
                        }
                        disabled={currentManager?.id === 1}
                      />
                      <Label htmlFor="products-delete">Delete</Label>
                    </div>
                  </div>
                </div>

                {/* Orders Permissions */}
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ShoppingCart className="h-5 w-5" />
                    <h4 className="font-medium">Orders</h4>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="orders-read" 
                        checked={currentManager?.permissions?.orders?.read || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange('orders', 'read', checked === true)
                        }
                        disabled={currentManager?.id === 1}
                      />
                      <Label htmlFor="orders-read">View</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="orders-write" 
                        checked={currentManager?.permissions?.orders?.write || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange('orders', 'write', checked === true)
                        }
                        disabled={currentManager?.id === 1}
                      />
                      <Label htmlFor="orders-write">Process</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="orders-delete" 
                        checked={currentManager?.permissions?.orders?.delete || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange('orders', 'delete', checked === true)
                        }
                        disabled={currentManager?.id === 1}
                      />
                      <Label htmlFor="orders-delete">Cancel/Delete</Label>
                    </div>
                  </div>
                </div>

                {/* Blog Permissions */}
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="h-5 w-5" />
                    <h4 className="font-medium">Blog</h4>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="blog-read" 
                        checked={currentManager?.permissions?.blog?.read || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange('blog', 'read', checked === true)
                        }
                        disabled={currentManager?.id === 1}
                      />
                      <Label htmlFor="blog-read">View</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="blog-write" 
                        checked={currentManager?.permissions?.blog?.write || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange('blog', 'write', checked === true)
                        }
                        disabled={currentManager?.id === 1}
                      />
                      <Label htmlFor="blog-write">Create/Edit</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="blog-delete" 
                        checked={currentManager?.permissions?.blog?.delete || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange('blog', 'delete', checked === true)
                        }
                        disabled={currentManager?.id === 1}
                      />
                      <Label htmlFor="blog-delete">Delete</Label>
                    </div>
                  </div>
                </div>

                {/* Reviews Permissions */}
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-5 w-5" />
                    <h4 className="font-medium">Reviews</h4>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="reviews-read" 
                        checked={currentManager?.permissions?.reviews?.read || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange('reviews', 'read', checked === true)
                        }
                        disabled={currentManager?.id === 1}
                      />
                      <Label htmlFor="reviews-read">View</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="reviews-write" 
                        checked={currentManager?.permissions?.reviews?.write || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange('reviews', 'write', checked === true)
                        }
                        disabled={currentManager?.id === 1}
                      />
                      <Label htmlFor="reviews-write">Respond</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="reviews-delete" 
                        checked={currentManager?.permissions?.reviews?.delete || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange('reviews', 'delete', checked === true)
                        }
                        disabled={currentManager?.id === 1}
                      />
                      <Label htmlFor="reviews-delete">Delete</Label>
                    </div>
                  </div>
                </div>
                
                {/* Settings Permissions */}
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5" />
                    <h4 className="font-medium">Settings & System</h4>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="settings-read" 
                        checked={currentManager?.permissions?.settings?.read || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange('settings', 'read', checked === true)
                        }
                        disabled={currentManager?.id === 1}
                      />
                      <Label htmlFor="settings-read">View</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="settings-write" 
                        checked={currentManager?.permissions?.settings?.write || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange('settings', 'write', checked === true)
                        }
                        disabled={currentManager?.id === 1}
                      />
                      <Label htmlFor="settings-write">Modify</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="settings-delete" 
                        checked={currentManager?.permissions?.settings?.delete || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange('settings', 'delete', checked === true)
                        }
                        disabled={currentManager?.id === 1}
                      />
                      <Label htmlFor="settings-delete">Reset/Delete</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
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
              Are you sure you want to delete "{currentManager?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteManager}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminManagers;
