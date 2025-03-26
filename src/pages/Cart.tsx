
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import ButtonCustom from "@/components/ui/button-custom";
import { products } from "@/lib/data";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Radiance Serum",
      price: 68,
      image: products[0].image,
      quantity: 1,
      variant: "30ml",
    },
    {
      id: "4",
      name: "Matte Lipstick",
      price: 28,
      image: products[3].image,
      quantity: 2,
      variant: "Ruby Red",
    },
  ]);
  
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };
  
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "WELCOME20") {
      const discount = subtotal * 0.2;
      setPromoDiscount(discount);
      setPromoApplied(true);
    } else {
      setPromoApplied(false);
      setPromoDiscount(0);
    }
  };
  
  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal - promoDiscount + shipping;

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <Container className="py-10">
          <h1 className="text-3xl font-medium mb-6">Shopping Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="hidden md:grid grid-cols-6 gap-4 pb-4 border-b border-border text-sm text-muted-foreground">
                  <div className="col-span-3">Product</div>
                  <div className="text-center">Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Total</div>
                </div>
                
                <div className="space-y-6 pt-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border-b border-border pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                        {/* Product */}
                        <div className="md:col-span-3 flex items-center space-x-4">
                          <Link to={`/product/${item.id}`} className="shrink-0">
                            <div className="w-20 h-20 bg-secondary/30 rounded-md overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </Link>
                          <div>
                            <Link to={`/product/${item.id}`} className="font-medium hover:text-primary transition-colors">
                              {item.name}
                            </Link>
                            {item.variant && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Variant: {item.variant}
                              </p>
                            )}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mt-2 md:hidden"
                            >
                              <Trash2 size={14} className="mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="md:text-center flex justify-between md:block">
                          <span className="text-sm md:hidden">Price:</span>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                        
                        {/* Quantity */}
                        <div className="md:text-center flex justify-between md:block">
                          <span className="text-sm md:hidden">Quantity:</span>
                          <div className="flex">
                            <button
                              className="w-8 h-8 flex items-center justify-center border border-border hover:bg-secondary transition-colors rounded-l-md"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus size={14} />
                            </button>
                            <div className="w-10 h-8 flex items-center justify-center border-t border-b border-border">
                              {item.quantity}
                            </div>
                            <button
                              className="w-8 h-8 flex items-center justify-center border border-border hover:bg-secondary transition-colors rounded-r-md"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Total & Remove */}
                        <div className="md:text-right flex justify-between items-center md:block">
                          <span className="text-sm md:hidden">Total:</span>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-primary transition-colors hidden md:inline-block ml-4"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-8">
                  <Link to="/shop" className="flex items-center text-sm text-primary">
                    <ArrowRight size={16} className="mr-2 rotate-180" />
                    Continue Shopping
                  </Link>
                  
                  <button
                    onClick={() => setCartItems([])}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="glass p-6 rounded-lg">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 border-b border-border pb-4 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">Discount (20%)</span>
                        <span className="text-green-600">-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between font-medium mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  {/* Promo Code */}
                  <div className="mb-6">
                    <label htmlFor="promo" className="block text-sm font-medium mb-2">
                      Promo Code
                    </label>
                    <div className="flex">
                      <input
                        id="promo"
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 border border-border rounded-l-md focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={applyPromoCode}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-r-md hover:bg-primary/90 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="text-green-600 text-sm mt-2">
                        Promo code applied successfully!
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">
                      Try "WELCOME20" for 20% off your order.
                    </p>
                  </div>
                  
                  <ButtonCustom 
                    to="/checkout"
                    className="w-full"
                    icon={<ArrowRight size={16} />}
                  >
                    Proceed to Checkout
                  </ButtonCustom>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 max-w-lg mx-auto">
              <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={30} className="text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-medium mb-3">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any products to your cart yet.
                Browse our products and find something you'll love.
              </p>
              <ButtonCustom to="/shop">Start Shopping</ButtonCustom>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
