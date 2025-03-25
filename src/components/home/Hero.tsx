
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import Container from "../ui/Container";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      title: "Premium Cosmetics for Every Look",
      description: "Discover luxury beauty products crafted with precision and care",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2070&auto=format&fit=crop",
      alt: "Premium cosmetics arranged elegantly",
      cta: "Shop Now",
      path: "/shop",
    },
    {
      title: "Minimal. Effective. Ethical.",
      description: "Our products are designed with simplicity and sustainability in mind",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=2035&auto=format&fit=crop",
      alt: "Minimal cosmetics packaging",
      cta: "Learn More",
      path: "/about",
    },
    {
      title: "New Summer Collection",
      description: "Explore our latest beauty essentials for the summer season",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2135&auto=format&fit=crop",
      alt: "Summer collection of cosmetics",
      cta: "View Collection",
      path: "/shop?collection=summer",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            currentSlide === index
              ? isTransitioning
                ? "opacity-0"
                : "opacity-100"
              : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Content */}
      <Container className="relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-xl text-white">
          <div
            className={`transition-all duration-700 ${
              isTransitioning ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-md">
              {slides[currentSlide].description}
            </p>
            <Button 
              to={slides[currentSlide].path} 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              icon={<ArrowRight size={18} />}
            >
              {slides[currentSlide].cta}
            </Button>
          </div>
        </div>
      </Container>

      {/* Controls */}
      <div className="absolute bottom-10 left-0 right-0 z-20">
        <Container className="flex items-center justify-between">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-14 h-1 rounded-full transition-colors ${
                  currentSlide === index
                    ? "bg-white"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
