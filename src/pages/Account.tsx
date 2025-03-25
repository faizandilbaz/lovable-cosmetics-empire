
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Package, User, Heart, Star, LogOut } from "lucide-react";

// Mock user data
const userData = {
  name: "Emma Wilson",
  email: "emma@example.com",
  phone: "+1 (555) 123-4567",
  address: {
    street: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States",
  },
  orders: [
    {
      id: "#ORD-5392",
      date: "2023-06-18",
      total: 149.97,
      status: "Delivered",
      items: 3,
    },
    {
      id: "#ORD-5210",
      date: "2023-05-02",
      total: 79.99,
      status: "Delivered",
      items: 1,
    },
  ],
  wishlist: [
    {
      id: 1,
      name: "Luxury Face Cream",
      price: 49.99,
      image: "https://placehold.co/100x100",
    },
    {
      id: 3,
      name: "Matte Lipstick",
      price: 24.99,
      image: "https://placehold.co/100x100",
    },
  ],
  reviews: [
    {
      id: 1,
      productName: "Luxury Face Cream",
      rating: 5,
      date: "2023-06-20",
      comment: "Amazing product, my skin feels so much better!",
    },
    {
      id: 2,
      productName: "Hydrating Serum",
      rating: 4,
      date: "2023-05-05",
      comment: "Great hydration, but a bit pricey.",
    },
  ],
};

const Account = () => {
  const [profile, setProfile] = useState(userData);
  const { toast } = useToast();

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleAddressUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Address updated",
      description: "Your address has been updated successfully.",
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });
  };

  return (
    <div className="container max-w-6xl py-10">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="dashboard">
            <User className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Package className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Orders</span>
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
          <TabsTrigger value="wishlist">
            <Heart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Wishlist</span>
          </TabsTrigger>
          <TabsTrigger value="reviews">
            <Star className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Reviews</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Manage your personal details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription>
                Manage your shipping and billing addresses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddressUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={profile.address.street}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          address: {
                            ...profile.address,
                            street: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profile.address.city}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          address: { ...profile.address, city: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={profile.address.state}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          address: { ...profile.address, state: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                    <Input
                      id="zip"
                      value={profile.address.zip}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          address: { ...profile.address, zip: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={profile.address.country}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          address: {
                            ...profile.address,
                            country: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <Button type="submit">Save Address</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button type="submit">Update Password</Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button variant="destructive" className="space-x-2">
              <LogOut size={16} />
              <span>Sign Out</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                Track and manage your orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profile.orders.length > 0 ? (
                <div className="space-y-4">
                  {profile.orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 flex flex-wrap items-center justify-between gap-3"
                    >
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items} item{order.items !== 1 && "s"}
                        </p>
                      </div>
                      <div>
                        <p
                          className={`inline-flex px-2 py-1 rounded-full text-xs ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No orders yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">
                          Expires 12/25
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="default-card"
                      checked
                      readOnly
                      className="h-4 w-4"
                    />
                    <Label htmlFor="default-card">Default payment method</Label>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add New Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Wishlist</CardTitle>
              <CardDescription>
                Items you've saved for later
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profile.wishlist.length > 0 ? (
                <div className="space-y-4">
                  {profile.wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">Add to Cart</Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    Your wishlist is empty
                  </p>
                  <Button variant="outline" className="mt-4">
                    Browse Products
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Reviews</CardTitle>
              <CardDescription>
                Reviews you've left on products
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profile.reviews.length > 0 ? (
                <div className="space-y-6">
                  {profile.reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <p className="font-medium">{review.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm">{review.comment}</p>
                      <div className="mt-2 flex gap-2 justify-end">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    You haven't reviewed any products yet
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
