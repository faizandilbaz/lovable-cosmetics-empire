
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Newsletter from "@/components/home/Newsletter";

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-24">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-medium mb-4">About LUXE</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We create premium beauty products that are minimal, effective, and consciously crafted.
                Our mission is to simplify beauty routines while maximizing results.
              </p>
            </div>
          </Container>
        </section>
        
        {/* Brand Story */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-medium mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Founded in 2018, LUXE began with a simple philosophy: beauty should be intuitive, effective, 
                  and accessible. Our founder, Sarah Chen, was frustrated with the overwhelming complexity of beauty routines
                  and the excessive packaging that dominated the industry.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Drawing inspiration from minimalist design principles, Sarah assembled a team of cosmetic chemists and designers
                  to create a line of products that would simplify beauty routines without compromising on quality or effectiveness.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, LUXE has grown into a global brand with a devoted following who appreciate our 
                  commitment to clean formulations, sustainable practices, and timeless aesthetics.
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=2070&auto=format&fit=crop" 
                  alt="LUXE founder in the lab" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </Container>
        </section>
        
        {/* Our Mission */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1629378899881-98931bbcfb81?q=80&w=1965&auto=format&fit=crop" 
                  alt="LUXE products arranged minimally" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-medium mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  At LUXE, we believe that beauty should be a source of confidence, not confusion. 
                  Our mission is to create products that enhance your natural beauty while respecting 
                  both your skin and the environment.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We're committed to:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="bg-primary w-2 h-2 rounded-full mt-2 mr-3"></span>
                    <span className="text-muted-foreground">Formulating with clean, effective ingredients</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary w-2 h-2 rounded-full mt-2 mr-3"></span>
                    <span className="text-muted-foreground">Designing packaging that minimizes waste</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary w-2 h-2 rounded-full mt-2 mr-3"></span>
                    <span className="text-muted-foreground">Maintaining ethical manufacturing practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary w-2 h-2 rounded-full mt-2 mr-3"></span>
                    <span className="text-muted-foreground">Creating products that work for everyone</span>
                  </li>
                </ul>
                <Button to="/shop">Explore Our Products</Button>
              </div>
            </div>
          </Container>
        </section>
        
        {/* Values */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-2xl font-medium mb-4">Our Values</h2>
              <p className="text-muted-foreground">
                These core principles guide everything we do, from product development to customer service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Simplicity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We believe in doing more with less. Our products are multi-functional and 
                  formulated with only essential ingredients.
                </p>
              </div>
              
              <div className="glass p-8 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Transparency</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We're open about what goes into our products and our processes. 
                  No hidden ingredients, no exaggerated claims.
                </p>
              </div>
              
              <div className="glass p-8 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Sustainability</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We're committed to reducing our environmental impact through 
                  responsible sourcing and eco-friendly packaging.
                </p>
              </div>
            </div>
          </Container>
        </section>
        
        {/* Team */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-2xl font-medium mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground">
                The passionate individuals behind LUXE who bring expertise, creativity, and dedication to everything we do.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[220px] mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop" 
                    alt="Sarah Chen - Founder & CEO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">Sarah Chen</h3>
                <p className="text-primary text-sm mb-2">Founder & CEO</p>
                <p className="text-muted-foreground text-sm">
                  Former dermatologist with a passion for effective skincare formulations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[220px] mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop" 
                    alt="David Torres - Creative Director" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">David Torres</h3>
                <p className="text-primary text-sm mb-2">Creative Director</p>
                <p className="text-muted-foreground text-sm">
                  Award-winning designer who brings our minimalist aesthetic to life.
                </p>
              </div>
              
              <div className="text-center">
                <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[220px] mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" 
                    alt="Maya Johnson - Head of Product" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">Maya Johnson</h3>
                <p className="text-primary text-sm mb-2">Head of Product</p>
                <p className="text-muted-foreground text-sm">
                  Cosmetic chemist with 15+ years of experience in formulation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[220px] mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop" 
                    alt="Alex Kim - Sustainability Officer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">Alex Kim</h3>
                <p className="text-primary text-sm mb-2">Sustainability Officer</p>
                <p className="text-muted-foreground text-sm">
                  Environmental scientist ensuring we meet our eco-friendly goals.
                </p>
              </div>
            </div>
          </Container>
        </section>
        
        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default About;
