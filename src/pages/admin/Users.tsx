
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
  Plus, 
  MoreHorizontal, 
  Search, 
  Edit, 
  Trash, 
  Eye,
  Lock,
  Mail
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample user data
const initialUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    location: "New York, USA",
    orders: 8,
    spent: 758.24,
    status: "Active",
    lastActive: "Today",
    avatar: "https://placehold.co/40x40"
  },
  {
    id: 2,
    name: "Michael Lee",
    email: "michael@example.com",
    location: "Los Angeles, USA",
    orders: 12,
    spent: 1245.67,
    status: "Active",
    lastActive: "Yesterday",
    avatar: "https://placehold.co/40x40"
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma@example.com",
    location: "London, UK",
    orders: 3,
    spent: 298.99,
    status: "Active",
    lastActive: "3 days ago",
    avatar: "https://placehold.co/40x40"
  },
  {
    id: 4,
    name: "Jacob Miller",
    email: "jacob@example.com",
    location: "Toronto, Canada",
    orders: 6,
    spent: 546.75,
    status: "Inactive",
    lastActive: "2 weeks ago",
    avatar: "https://placehold.co/40x40"
  },
  {
    id: 5,
    name: "Olivia Brown",
    email: "olivia@example.com",
    location: "Sydney, Australia",
    orders: 1,
    spent: 99.99,
    status: "Active",
    lastActive: "Today",
    avatar: "https://placehold.co/40x40"
  }
];

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (user: any) => {
    setCurrentUser(user);
    setIsDialogOpen(true);
  };

  const handleViewClick = (user: any) => {
    setCurrentUser(user);
    setIsViewDialogOpen(true);
  };

  const handleAddClick = () => {
    setCurrentUser({
      id: users.length + 1,
      name: "",
      email: "",
      location: "",
      orders: 0,
      spent: 0,
      status: "Active",
      lastActive: "Never",
      avatar: "https://placehold.co/40x40"
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (user: any) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (users.some(u => u.id === currentUser.id)) {
      // Update existing user
      setUsers(users.map(u => u.id === currentUser.id ? currentUser : u));
      toast({
        title: "User updated",
        description: `${currentUser.name}'s profile has been updated successfully.`,
      });
    } else {
      // Add new user
      setUsers([...users, currentUser]);
      toast({
        title: "User added",
        description: `${currentUser.name} has been added successfully.`,
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleDeleteUser = () => {
    setUsers(users.filter(u => u.id !== currentUser.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "User deleted",
      description: `${currentUser.name} has been removed from the system.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <Button onClick={handleAddClick}>
          <Plus className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>{user.orders}</TableCell>
                  <TableCell>${user.spent.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewClick(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          toast({
                            title: "Email sent",
                            description: `Email has been sent to ${user.email}.`,
                          });
                        }}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteClick(user)}
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

      {/* User Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentUser && currentUser.name ? `Edit ${currentUser.name}` : "Add New Customer"}
            </DialogTitle>
            <DialogDescription>
              Update customer information and settings.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveUser}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={currentUser?.name || ""}
                    onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={currentUser?.email || ""}
                    onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, Country"
                  value={currentUser?.location || ""}
                  onChange={(e) => setCurrentUser({...currentUser, location: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="active"
                        name="status"
                        checked={currentUser?.status === "Active"}
                        onChange={() => setCurrentUser({...currentUser, status: "Active"})}
                      />
                      <Label htmlFor="active">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="inactive"
                        name="status"
                        checked={currentUser?.status === "Inactive"}
                        onChange={() => setCurrentUser({...currentUser, status: "Inactive"})}
                      />
                      <Label htmlFor="inactive">Inactive</Label>
                    </div>
                  </div>
                </div>
                {!currentUser?.id && (
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Set password"
                    />
                  </div>
                )}
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

      {/* User Profile Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Profile</DialogTitle>
          </DialogHeader>
          {currentUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{currentUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                  <p className="text-sm text-muted-foreground">{currentUser.location}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-xl font-medium">{currentUser.orders}</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-xl font-medium">${currentUser.spent.toFixed(2)}</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">Last Active</p>
                  <p className="text-xl font-medium">{currentUser.lastActive}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Recent Orders</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentUser.orders > 0 ? (
                        [1, 2, 3].slice(0, Math.min(currentUser.orders, 3)).map((i) => (
                          <TableRow key={i}>
                            <TableCell>#ORD-{5390 - i}</TableCell>
                            <TableCell>{new Date(Date.now() - i * 86400000).toLocaleDateString()}</TableCell>
                            <TableCell>${(Math.random() * 100 + 50).toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge variant={i === 1 ? "default" : i === 2 ? "secondary" : "outline"}>
                                {i === 1 ? "Delivered" : i === 2 ? "Shipped" : "Processing"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">No orders yet</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button variant="outline" onClick={() => {
              setIsViewDialogOpen(false);
              handleEditClick(currentUser);
            }}>
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
            <Button onClick={() => {
              toast({
                title: "Email sent",
                description: `Email has been sent to ${currentUser?.email}.`,
              });
            }}>
              <Mail className="mr-2 h-4 w-4" /> Contact
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
              Are you sure you want to delete "{currentUser?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
