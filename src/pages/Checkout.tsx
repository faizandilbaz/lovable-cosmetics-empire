
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Check } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import ButtonCustom from "@/components/ui/button-custom";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // Form states
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
  });
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  
  const [sameAsBilling, setSameAsBilling] = useState(true);
  
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  
  const placeOrder = () => {
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true);
    }, 1500);
  };

  // Order summary data (in a real app, this would come from cart state)
  const orderItems = [
    {
      id: "1",
      name: "Radiance Serum",
      price: 68,
      quantity: 1,
      variant: "30ml",
    },
    {
      id: "4",
      name: "Matte Lipstick",
      price: 28,
      quantity: 2,
      variant: "Ruby Red",
    },
  ];
  
  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const discountAmount = subtotal * 0.2; // 20% discount
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal - discountAmount + shipping;

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <Container className="py-10">
          {!orderComplete ? (
            <>
              {/* Checkout Steps */}
              <div className="mb-10">
                <div className="flex justify-between max-w-2xl mx-auto">
                  <div 
                    className={`flex flex-col items-center ${
                      step >= 1 ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        step >= 1 ? "bg-primary text-white" : "bg-muted"
                      }`}
                    >
                      1
                    </div>
                    <span className="text-sm">Information</span>
                  </div>
                  
                  <div className="flex items-center mt-5">
                    <div className={`h-0.5 w-24 md:w-36 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
                  </div>
                  
                  <div 
                    className={`flex flex-col items-center ${
                      step >= 2 ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        step >= 2 ? "bg-primary text-white" : "bg-muted"
                      }`}
                    >
                      2
                    </div>
                    <span className="text-sm">Shipping</span>
                  </div>
                  
                  <div className="flex items-center mt-5">
                    <div className={`h-0.5 w-24 md:w-36 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
                  </div>
                  
                  <div 
                    className={`flex flex-col items-center ${
                      step >= 3 ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        step >= 3 ? "bg-primary text-white" : "bg-muted"
                      }`}
                    >
                      3
                    </div>
                    <span className="text-sm">Payment</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Checkout Forms */}
                <div className="lg:col-span-2">
                  {step === 1 && (
                    <div className="animate-fadeIn">
                      <h2 className="text-2xl font-medium mb-6">Contact Information</h2>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            value={contactInfo.email}
                            onChange={handleContactChange}
                            required
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
                            placeholder="your@email.com"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={contactInfo.phone}
                            onChange={handleContactChange}
                            required
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
                            placeholder="(123) 456-7890"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-10">
                        <Link to="/cart" className="flex items-center text-sm text-primary">
                          <ArrowLeft size={16} className="mr-2" />
                          Return to Cart
                        </Link>
                        <ButtonCustom onClick={nextStep}>Continue to Shipping</ButtonCustom>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="animate-fadeIn">
                      <h2 className="text-2xl font-medium mb-6">Shipping Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={shippingInfo.firstName}
                            onChange={handleShippingChange}
                            required
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={shippingInfo.lastName}
                            onChange={handleShippingChange}
                            required
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium mb-2">
                            Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="address"
                            type="text"
                            name="address"
                            value={shippingInfo.address}
                            onChange={handleShippingChange}
                            required
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium mb-2">
                              City <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="city"
                              type="text"
                              name="city"
                              value={shippingInfo.city}
                              onChange={handleShippingChange}
                              required
                              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="state" className="block text-sm font-medium mb-2">
                              State/Province <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="state"
                              type="text"
                              name="state"
                              value={shippingInfo.state}
                              onChange={handleShippingChange}
                              required
                              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                              ZIP Code <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="zipCode"
                              type="text"
                              name="zipCode"
                              value={shippingInfo.zipCode}
                              onChange={handleShippingChange}
                              required
                              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium mb-2">
                            Country <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={shippingInfo.country}
                            onChange={handleShippingChange}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
                          >
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={sameAsBilling}
                            onChange={() => setSameAsBilling(!sameAsBilling)}
                            className="mr-2"
                          />
                          <span className="text-sm">Billing address same as shipping</span>
                        </label>
                      </div>
                      
                      <div className="flex justify-between mt-10">
                        <button
                          onClick={prevStep}
                          className="flex items-center text-sm text-primary"
                        >
                          <ArrowLeft size={16} className="mr-2" />
                          Back to Information
                        </button>
                        <ButtonCustom onClick={nextStep}>Continue to Payment</ButtonCustom>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="animate-fadeIn">
                      <h2 className="text-2xl font-medium mb-6">Payment Method</h2>
                      
                      <div className="glass p-6 rounded-lg mb-6">
                        <div className="flex items-center mb-4">
                          <CreditCard size={20} className="text-primary mr-2" />
                          <h3 className="font-medium">Credit Card</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                              Card Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="cardNumber"
                              type="text"
                              name="cardNumber"
                              value={paymentInfo.cardNumber}
                              onChange={handlePaymentChange}
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cardName" className="block text-sm font-medium mb-2">
                              Name on Card <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="cardName"
                              type="text"
                              name="cardName"
                              value={paymentInfo.cardName}
                              onChange={handlePaymentChange}
                              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">
                                Expiry Date <span className="text-red-500">*</span>
                              </label>
                              <input
                                id="expiryDate"
                                type="text"
                                name="expiryDate"
                                value={paymentInfo.expiryDate}
                                onChange={handlePaymentChange}
                                placeholder="MM/YY"
                                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium mb-2">
                                CVV <span className="text-red-500">*</span>
                              </label>
                              <input
                                id="cvv"
                                type="text"
                                name="cvv"
                                value={paymentInfo.cvv}
                                onChange={handlePaymentChange}
                                placeholder="123"
                                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-primary"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                          />
                          <span className="text-sm">Save my payment information for future purchases</span>
                        </label>
                      </div>
                      
                      <div className="flex justify-between mt-10">
                        <button
                          onClick={prevStep}
                          className="flex items-center text-sm text-primary"
                        >
                          <ArrowLeft size={16} className="mr-2" />
                          Back to Shipping
                        </button>
                        <ButtonCustom onClick={placeOrder} icon={<Check size={16} />}>
                          Place Order
                        </ButtonCustom>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div>
                  <div className="glass p-6 rounded-lg">
                    <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                    
                    <div className="space-y-4 mb-6">
                      {orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <div className="flex">
                            <span className="bg-secondary w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">
                              {item.quantity}
                            </span>
                            <div>
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.variant}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-border pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">Discount (20%)</span>
                        <span className="text-green-600">-${discountAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-border mt-4 pt-4 flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="max-w-2xl mx-auto text-center py-10 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Check size={36} className="text-green-600" />
              </div>
              <h1 className="text-3xl font-medium mb-4">Order Confirmed!</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
              <p className="text-muted-foreground mb-2">
                Order Number: <span className="font-medium text-foreground">LUXE-{Math.floor(Math.random() * 10000)}</span>
              </p>
              <p className="text-muted-foreground mb-8">
                We've sent a confirmation email to <span className="font-medium text-foreground">{contactInfo.email}</span>
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <ButtonCustom to="/shop">Continue Shopping</ButtonCustom>
                <ButtonCustom to="/" variant="outline">
                  Return to Home
                </ButtonCustom>
              </div>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
