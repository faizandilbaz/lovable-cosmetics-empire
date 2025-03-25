
import { useState } from "react";
import Container from "../ui/Container";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sophia Chen",
      role: "Verified Customer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
      content: "The products are simply amazing. I've been using the Radiance Serum for a month now, and my skin has never looked better. The packaging is elegant, and the product feels luxurious to apply. Definitely worth every penny.",
      rating: 5
    },
    {
      id: "2",
      name: "James Wilson",
      role: "Verified Customer",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop",
      content: "As someone with sensitive skin, I've always struggled to find products that don't cause irritation. The Gentle Cleanser has been a game-changer for me. It's effective yet so gentle, and I love the minimalist design.",
      rating: 5
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      role: "Beauty Blogger",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
      content: "What sets these products apart is the attention to detail. From the sleek packaging to the beautiful scents, everything feels carefully considered. My followers always ask about the Hydrating Mist whenever I use it on camera.",
      rating: 4
    }
  ];

  return (
    <section className="py-20">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-medium mb-3">What Our Customers Say</h2>
          <p className="text-muted-foreground">
            Don't just take our word for it. Here's what our community thinks about our products.
          </p>
        </div>
        
        <div className="relative">
          {/* Main testimonial */}
          <div className="glass rounded-2xl p-8 md:p-10 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`transition-opacity duration-500 ${
                  activeIndex === index ? "opacity-100" : "opacity-0 absolute inset-0"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-white">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="font-medium text-lg">{testimonial.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{testimonial.role}</p>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-muted"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-foreground leading-relaxed mb-8">
                    "{testimonial.content}"
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  activeIndex === index ? "bg-primary" : "bg-muted"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
