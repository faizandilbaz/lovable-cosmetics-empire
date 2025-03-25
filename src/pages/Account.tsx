
import { useState, useEffect } from "react";
import {
  User,
  Package,
  Heart,
  Star,
  LogOut,
  MapPin,
  Settings,
  CreditCard,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import { useNavigate } from "react-router-dom";

// Define the form schema with Zod
const userProfileSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
});

type UserProfileValues = z.infer<typeof userProfileSchema>;

const Account = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  
  // Simulated user data
  const [userData, setUserData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    addresses: [
      {
        id: "addr1",
        type: "Home",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
        isDefault: true,
      },
      {
        id: "addr2",
        type: "Work",
        street: "456 Office Plaza",
        city: "New York",
        state: "NY",
        zipCode: "10002",
        country: "United States",
        isDefault: false,
      },
    ],
    orders: [
      {
        id: "ORD123456",
        date: "June 15, 2023",
        status: "Delivered",
        total: 124.95,
        items: [
          {
            id: "1",
            name: "Radiance Serum",
            price: 68,
            quantity: 1,
            image: products[0].image,
          },
          {
            id: "4",
            name: "Matte Lipstick",
            price: 28,
            quantity: 2,
            image: products[3].image,
          },
        ],
      },
      {
        id: "ORD789012",
        date: "May 27, 2023",
        status: "Processing",
        total: 85.99,
        items: [
          {
            id: "2",
            name: "Hydrating Moisturizer",
            price: 54,
            quantity: 1,
            image: products[1].image,
          },
          {
            id: "3",
            name: "Gentle Cleanser",
            price: 42,
            quantity: 1,
            image: products[2].image,
          },
        ],
      },
    ],
    wishlist: [products[4], products[5], products[7]],
    paymentMethods: [
      {
        id: "cc1",
        type: "Visa",
        last4: "4242",
        expiry: "05/25",
        isDefault: true,
      },
      {
        id: "cc2",
        type: "Mastercard",
        last4: "9876",
        expiry: "11/24",
        isDefault: false,
      },
    ],
  });
  
  // Initialize the form with react-hook-form and zod resolver
  const form = useForm<UserProfileValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
    },
  });
  
  // Handle form submission
  const onSubmit = (data: UserProfileValues) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setUserData({ ...userData, ...data });
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      });
      setIsSaving(false);
    }, 1000);
  };
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  // Handle logout
  const handleLogout = () => {
    // Simulate logout
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <Container>
          <h1 className="text-2xl font-medium mb-8">My Account</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="space-y-1 lg:sticky lg:top-24">
                <button
                  onClick={() => handleTabChange("profile")}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  <User size={18} className="mr-3" />
                  <span>Profile</span>
                </button>
                
                <button
                  onClick={() => handleTabChange("orders")}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === "orders"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  <Package size={18} className="mr-3" />
                  <span>Orders</span>
                </button>
                
                <button
                  onClick={() => handleTabChange("addresses")}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === "addresses"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  <MapPin size={18} className="mr-3" />
                  <span>Addresses</span>
                </button>
                
                <button
                  onClick={() => handleTabChange("wishlist")}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === "wishlist"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  <Heart size={18} className="mr-3" />
                  <span>Wishlist</span>
                </button>
                
                <button
                  onClick={() => handleTabChange("payment")}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === "payment"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  <CreditCard size={18} className="mr-3" />
                  <span>Payment Methods</span>
                </button>
                
                <button
                  onClick={() => handleTabChange("settings")}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === "settings"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  <Settings size={18} className="mr-3" />
                  <span>Account Settings</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={18} className="mr-3" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                <>
                  {/* Profile */}
                  {activeTab === "profile" && (
                    <div>
                      <h2 className="text-xl font-medium mb-6">Personal Information</h2>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Changes"}
                          </Button>
                        </form>
                      </Form>
                    </div>
                  )}
                  
                  {/* Orders */}
                  {activeTab === "orders" && (
                    <div>
                      <h2 className="text-xl font-medium mb-6">Order History</h2>
                      {userData.orders.length > 0 ? (
                        <div className="space-y-6">
                          {userData.orders.map((order) => (
                            <div key={order.id} className="border rounded-lg overflow-hidden">
                              <div className="bg-secondary/30 p-4 flex flex-wrap justify-between items-center">
                                <div>
                                  <p className="font-medium">Order #{order.id}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Placed on {order.date}
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  <span
                                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                                      order.status === "Delivered"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-blue-100 text-blue-800"
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                  <Button variant="outline" size="sm" className="ml-4">
                                    View Details
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="p-4">
                                <div className="space-y-4">
                                  {order.items.map((item) => (
                                    <div
                                      key={item.id}
                                      className="flex items-center space-x-4"
                                    >
                                      <div className="bg-secondary/30 w-16 h-16 rounded-md overflow-hidden">
                                        <img
                                          src={item.image}
                                          alt={item.name}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className="flex-grow">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                          Qty: {item.quantity}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="font-medium">
                                          ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                
                                <div className="mt-4 pt-4 border-t flex justify-between">
                                  <span className="font-medium">Total</span>
                                  <span className="font-medium">${order.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 border border-dashed rounded-lg">
                          <Package size={48} className="mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                          <p className="text-muted-foreground mb-6">
                            When you place your first order, it will appear here.
                          </p>
                          <Button onClick={() => navigate("/shop")}>Start Shopping</Button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Addresses */}
                  {activeTab === "addresses" && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-medium">Saved Addresses</h2>
                        <Button size="sm">Add New Address</Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userData.addresses.map((address) => (
                          <div
                            key={address.id}
                            className="border rounded-lg p-4 relative"
                          >
                            {address.isDefault && (
                              <span className="absolute top-2 right-2 bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                            <p className="font-medium mb-1">{address.type}</p>
                            <p className="text-sm text-muted-foreground">
                              {address.street}
                              <br />
                              {address.city}, {address.state} {address.zipCode}
                              <br />
                              {address.country}
                            </p>
                            <div className="mt-4 pt-4 border-t flex space-x-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              {!address.isDefault && (
                                <Button variant="outline" size="sm">
                                  Set as Default
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Wishlist */}
                  {activeTab === "wishlist" && (
                    <div>
                      <h2 className="text-xl font-medium mb-6">My Wishlist</h2>
                      
                      {userData.wishlist.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {userData.wishlist.map((product) => (
                            <ProductCard
                              key={product.id}
                              id={product.id}
                              name={product.name}
                              price={product.price}
                              image={product.image}
                              category={product.category}
                              isNew={product.isNew}
                              isFeatured={product.isFeatured}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 border border-dashed rounded-lg">
                          <Heart size={48} className="mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                          <p className="text-muted-foreground mb-6">
                            Save items you love to your wishlist for easy access later.
                          </p>
                          <Button onClick={() => navigate("/shop")}>Browse Products</Button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Payment Methods */}
                  {activeTab === "payment" && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-medium">Payment Methods</h2>
                        <Button size="sm">Add Payment Method</Button>
                      </div>
                      
                      <div className="space-y-4">
                        {userData.paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className="flex items-center justify-between border rounded-lg p-4"
                          >
                            <div className="flex items-center">
                              <div className="w-12 h-8 bg-secondary/50 rounded mr-4 flex items-center justify-center">
                                {method.type === "Visa" ? (
                                  <span className="font-bold text-blue-600">VISA</span>
                                ) : (
                                  <span className="font-bold text-red-600">MC</span>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">
                                  {method.type} ending in {method.last4}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Expires {method.expiry}
                                  {method.isDefault && (
                                    <span className="ml-2 text-primary">(Default)</span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              {!method.isDefault && (
                                <Button variant="outline" size="sm">
                                  Set as Default
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Account Settings */}
                  {activeTab === "settings" && (
                    <div>
                      <h2 className="text-xl font-medium mb-6">Account Settings</h2>
                      
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Email Preferences</h3>
                          <div className="space-y-4 border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Marketing Emails</p>
                                <p className="text-sm text-muted-foreground">
                                  Receive emails about new products, sales, and events
                                </p>
                              </div>
                              <div className="flex items-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" defaultChecked />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Order Updates</p>
                                <p className="text-sm text-muted-foreground">
                                  Receive emails about your orders and deliveries
                                </p>
                              </div>
                              <div className="flex items-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" defaultChecked />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Password</h3>
                          <div className="border rounded-lg p-4">
                            <Button variant="outline">Change Password</Button>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Delete Account</h3>
                          <div className="border border-red-200 rounded-lg p-4">
                            <p className="text-sm text-muted-foreground mb-4">
                              Permanently delete your account and all your data. This action
                              cannot be undone.
                            </p>
                            <Button variant="destructive">Delete Account</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
