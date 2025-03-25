
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Menu, X, Search } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3 shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-medium tracking-tight transition-all duration-300 hover:opacity-80"
        >
          LUXE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {mainLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`magic-link text-sm ${
                location.pathname === link.path
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center space-x-5">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <Link 
            to="/account" 
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Account"
          >
            <User size={20} />
          </Link>
          <Link 
            to="/cart" 
            className="text-foreground hover:text-primary transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center">
              0
            </span>
          </Link>
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search Panel */}
      <div 
        className={`absolute top-full left-0 w-full glass transition-all duration-300 overflow-hidden ${
          isSearchOpen ? "h-16 opacity-100" : "h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-white/60 border border-border rounded-md h-10 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background/90 backdrop-blur-md z-40 transition-transform duration-300 transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="container mx-auto px-4 py-20">
          <nav className="flex flex-col items-center space-y-8 text-lg">
            {mainLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xl ${
                  location.pathname === link.path
                    ? "text-primary font-medium"
                    : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-border w-24 mx-auto" />
            <Link to="/account" className="flex items-center space-x-2">
              <User size={18} />
              <span>Account</span>
            </Link>
            <Link to="/cart" className="flex items-center space-x-2">
              <ShoppingBag size={18} />
              <span>Cart (0)</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
