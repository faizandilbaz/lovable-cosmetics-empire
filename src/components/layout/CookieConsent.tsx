
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      // Show the consent banner after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowConsent(false);
  };

  const handleClose = () => {
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg z-50 p-4 md:p-6 animate-fade-in">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="pr-8 flex-1">
            <h3 className="text-lg font-semibold mb-2">We use cookies</h3>
            <p className="text-muted-foreground text-sm">
              We use cookies to enhance your experience. By continuing to browse, you accept our use of cookies. 
              <Link to="/privacy" className="underline ml-1">
                Learn more
              </Link>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <Button variant="outline" onClick={handleDecline}>
              Decline
            </Button>
            <Button onClick={handleAccept}>
              Accept All
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute top-2 right-2 md:relative md:top-auto md:right-auto"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
