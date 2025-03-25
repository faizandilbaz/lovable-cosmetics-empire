
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Globe, CreditCard, Palette, Lock } from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState("https://placehold.co/100x50?text=LUXE");
  const [faviconPreview, setFaviconPreview] = useState("https://placehold.co/32x32");
  
  const handleSave = (section: string) => {
    toast({
      title: "Settings saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="localization">Localization</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      {/* General Settings */}
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Manage your store's basic information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" defaultValue="LUXE Cosmetics" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeEmail">Store Email</Label>
              <Input id="storeEmail" type="email" defaultValue="contact@luxecosmetics.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storePhone">Store Phone</Label>
              <Input id="storePhone" defaultValue="+1 (800) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeAddress">Store Address</Label>
              <Textarea id="storeAddress" defaultValue="123 Beauty Lane, Suite 200, New York, NY 10001" />
            </div>
            <div className="space-y-2">
              <Label>Store Logo</Label>
              <div className="flex items-center gap-4">
                <div className="h-[50px] w-[100px] overflow-hidden rounded border bg-gray-50 flex items-center justify-center">
                  <img src={logoPreview} alt="Store logo" className="max-h-full" />
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" /> Upload Logo
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Favicon</Label>
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 overflow-hidden rounded border bg-gray-50 flex items-center justify-center">
                  <img src={faviconPreview} alt="Favicon" className="max-h-full" />
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" /> Upload Favicon
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableStore">Enable Store</Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily close your store to customers
                </p>
              </div>
              <Switch id="enableStore" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSave("General")}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Appearance Settings */}
      <TabsContent value="appearance">
        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>
              Customize your store's visual appearance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex gap-2">
                <Input id="primaryColor" defaultValue="#9b87f5" />
                <div className="h-10 w-10 rounded bg-[#9b87f5]"></div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex gap-2">
                <Input id="secondaryColor" defaultValue="#7E69AB" />
                <div className="h-10 w-10 rounded bg-[#7E69AB]"></div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fontPrimary">Primary Font</Label>
              <Select defaultValue="inter">
                <SelectTrigger>
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="lato">Lato</SelectItem>
                  <SelectItem value="opensans">Open Sans</SelectItem>
                  <SelectItem value="playfair">Playfair Display</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bannerImage">Home Banner</Label>
              <div className="h-[120px] w-full overflow-hidden rounded border bg-gray-50 flex items-center justify-center">
                <img src="https://placehold.co/800x300?text=Banner" alt="Home banner" className="max-h-full" />
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                <Upload className="mr-2 h-4 w-4" /> Change Banner
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableAnimations">Enable Animations</Label>
                <p className="text-sm text-muted-foreground">
                  Turn on/off animations throughout the store
                </p>
              </div>
              <Switch id="enableAnimations" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="darkMode">Dark Mode Option</Label>
                <p className="text-sm text-muted-foreground">
                  Allow customers to toggle dark mode
                </p>
              </div>
              <Switch id="darkMode" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSave("Appearance")}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Localization Settings */}
      <TabsContent value="localization">
        <Card>
          <CardHeader>
            <CardTitle>Localization Settings</CardTitle>
            <CardDescription>
              Configure languages and currencies for your global audience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="defaultLanguage">Default Language</Label>
              <Select defaultValue="en-US">
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="en-GB">English (UK)</SelectItem>
                  <SelectItem value="fr-FR">French</SelectItem>
                  <SelectItem value="es-ES">Spanish</SelectItem>
                  <SelectItem value="de-DE">German</SelectItem>
                  <SelectItem value="ja-JP">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="multiLanguage">Enable Multi-Language</Label>
                <p className="text-sm text-muted-foreground">
                  Allow customers to switch between languages
                </p>
              </div>
              <Switch id="multiLanguage" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Available Languages</Label>
              <div className="space-y-2">
                {["English", "French", "Spanish", "German"].map((lang) => (
                  <div key={lang} className="flex items-center gap-2">
                    <Switch defaultChecked={lang === "English"} />
                    <Label>{lang}</Label>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                <Globe className="mr-2 h-4 w-4" /> Add Language
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultCurrency">Default Currency</Label>
              <Select defaultValue="usd">
                <SelectTrigger>
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                  <SelectItem value="jpy">JPY (¥)</SelectItem>
                  <SelectItem value="cad">CAD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="multiCurrency">Enable Multi-Currency</Label>
                <p className="text-sm text-muted-foreground">
                  Allow customers to switch between currencies
                </p>
              </div>
              <Switch id="multiCurrency" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSave("Localization")}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Payment Settings */}
      <TabsContent value="payment">
        <Card>
          <CardHeader>
            <CardTitle>Payment Settings</CardTitle>
            <CardDescription>
              Configure payment methods and options.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div className="flex items-center gap-3">
                  <CreditCard />
                  <div>
                    <h3 className="font-medium">Stripe</h3>
                    <p className="text-sm text-muted-foreground">Accept credit card payments</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div className="flex items-center gap-3">
                  <img src="https://placehold.co/24x24?text=PP" alt="PayPal" className="h-6 w-6" />
                  <div>
                    <h3 className="font-medium">PayPal</h3>
                    <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div className="flex items-center gap-3">
                  <img src="https://placehold.co/24x24?text=AP" alt="Apple Pay" className="h-6 w-6" />
                  <div>
                    <h3 className="font-medium">Apple Pay</h3>
                    <p className="text-sm text-muted-foreground">Accept Apple Pay</p>
                  </div>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div className="flex items-center gap-3">
                  <img src="https://placehold.co/24x24?text=GP" alt="Google Pay" className="h-6 w-6" />
                  <div>
                    <h3 className="font-medium">Google Pay</h3>
                    <p className="text-sm text-muted-foreground">Accept Google Pay</p>
                  </div>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between border p-4 rounded-md">
                <div className="flex items-center gap-3">
                  <img src="https://placehold.co/24x24?text=COD" alt="Cash on Delivery" className="h-6 w-6" />
                  <div>
                    <h3 className="font-medium">Cash on Delivery</h3>
                    <p className="text-sm text-muted-foreground">Accept cash payments on delivery</p>
                  </div>
                </div>
                <Switch />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiKey">Stripe API Key</Label>
              <Input id="apiKey" type="password" defaultValue="sk_test_*************************" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhookSecret">Stripe Webhook Secret</Label>
              <Input id="webhookSecret" type="password" defaultValue="whsec_**********************" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="testMode">Test Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Use test credentials instead of live ones
                </p>
              </div>
              <Switch id="testMode" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSave("Payment")}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Security Settings */}
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Configure security options for your store.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Require 2FA for admin and manager accounts
                </p>
              </div>
              <Switch id="twoFactorAuth" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="passwordExpiry">Password Expiry</Label>
                <p className="text-sm text-muted-foreground">
                  Force password reset every 90 days
                </p>
              </div>
              <Switch id="passwordExpiry" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adminPassword">Change Admin Password</Label>
              <Input id="adminPassword" type="password" placeholder="Enter new password" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accessLogs">Access Logs</Label>
              <div className="max-h-40 overflow-auto rounded border p-2">
                <div className="space-y-2 text-sm">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex justify-between">
                      <span>Admin login from 192.168.1.{i}</span>
                      <span className="text-muted-foreground">
                        {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                <Lock className="mr-2 h-4 w-4" /> View Full Logs
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSave("Security")}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AdminSettings;
