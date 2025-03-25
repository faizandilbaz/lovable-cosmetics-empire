
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Container from "../ui/Container";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-medium mb-3">Join Our Community</h2>
          <p className="opacity-80 mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter to receive updates on new products, 
            special offers, and beauty tips directly to your inbox.
          </p>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-3 rounded-md flex-1 text-foreground focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-white/90 transition-colors flex items-center justify-center disabled:opacity-70"
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-md p-4 max-w-md mx-auto animate-fadeIn">
              <div className="flex items-center text-white">
                <div className="bg-white/20 rounded-full p-1 mr-3">
                  <Check size={16} />
                </div>
                <p>Thank you! Your subscription has been confirmed.</p>
              </div>
            </div>
          )}
          
          <p className="text-sm opacity-70 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
