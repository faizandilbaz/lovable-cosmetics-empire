
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";

const Hero = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              Premium Cosmetics for Every Look
            </h1>
            <p className="text-gray-600 md:text-lg lg:text-xl max-w-lg">
              Discover premium, minimalist cosmetics crafted for every skin type. Free shipping & easy returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
            <Link to="/admin" className="text-sm text-muted-foreground hover:underline">
              Access Admin Panel
            </Link>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://placehold.co/800x600/f1f5f9/4b5563?text=Premium+Cosmetics" 
              alt="Premium cosmetics collection" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
