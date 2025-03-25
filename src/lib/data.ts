
// Sample product data

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice?: number;
  image: string;
  gallery?: string[];
  category: string;
  description: string;
  variants?: {
    name: string;
    options: string[];
  }[];
  isNew?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Radiance Serum",
    slug: "radiance-serum",
    price: 68,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1854&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1854&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=1850&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1780&auto=format&fit=crop"
    ],
    category: "Skincare",
    description: "This lightweight serum penetrates deeply to deliver potent antioxidants and hydration. Formulated with Vitamin C and Hyaluronic Acid to brighten skin and reduce fine lines.",
    variants: [
      {
        name: "Size",
        options: ["30ml", "50ml"]
      }
    ],
    isNew: true,
    isFeatured: true,
    inStock: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: "2",
    name: "Hydrating Moisturizer",
    slug: "hydrating-moisturizer",
    price: 54,
    image: "https://images.unsplash.com/photo-1591375275624-c7c446fd178f?q=80&w=1927&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1591375275624-c7c446fd178f?q=80&w=1927&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546552256-3ad30686347f?q=80&w=1925&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606830733744-0ad778449672?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Skincare",
    description: "An ultra-hydrating moisturizer that provides 24-hour moisture retention. Enriched with ceramides and natural oils to strengthen the skin barrier and prevent moisture loss.",
    variants: [
      {
        name: "Size",
        options: ["50ml", "100ml"]
      },
      {
        name: "Type",
        options: ["Normal", "Sensitive"]
      }
    ],
    isFeatured: true,
    inStock: true,
    rating: 4.7,
    reviews: 98
  },
  {
    id: "3",
    name: "Gentle Cleanser",
    slug: "gentle-cleanser",
    price: 42,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1887&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1887&auto=format&fit=crop"
    ],
    category: "Skincare",
    description: "A gentle yet effective cleanser that removes impurities without stripping the skin's natural oils. Suitable for all skin types, including sensitive skin.",
    variants: [
      {
        name: "Size",
        options: ["200ml", "400ml"]
      }
    ],
    inStock: true,
    rating: 4.6,
    reviews: 75
  },
  {
    id: "4",
    name: "Matte Lipstick",
    slug: "matte-lipstick",
    price: 28,
    discountPrice: 24,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1915&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1915&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2135&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599733594230-6b823276abcc?q=80&w=1798&auto=format&fit=crop"
    ],
    category: "Makeup",
    description: "A long-lasting matte lipstick that delivers intense color in a single swipe. The creamy formula glides on smoothly and stays comfortable all day.",
    variants: [
      {
        name: "Color",
        options: ["Rose Petal", "Ruby Red", "Mauve", "Nude Beige", "Coral Sunset"]
      }
    ],
    isNew: true,
    isFeatured: true,
    inStock: true,
    rating: 4.9,
    reviews: 142
  },
  {
    id: "5",
    name: "Silk Foundation",
    slug: "silk-foundation",
    price: 46,
    image: "https://images.unsplash.com/photo-1614859529896-9ca0b5179e5f?q=80&w=1930&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1614859529896-9ca0b5179e5f?q=80&w=1930&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631214524020-3c2d9a27fe86?q=80&w=1932&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620804587331-effc68d47d7e?q=80&w=1935&auto=format&fit=crop"
    ],
    category: "Makeup",
    description: "A lightweight foundation that provides buildable coverage with a natural, skin-like finish. Formulated with skin-loving ingredients for a flawless base that lasts all day.",
    variants: [
      {
        name: "Shade",
        options: ["Fair", "Light", "Medium", "Tan", "Deep", "Rich"]
      },
      {
        name: "Finish",
        options: ["Matte", "Dewy"]
      }
    ],
    isFeatured: true,
    inStock: true,
    rating: 4.5,
    reviews: 87
  },
  {
    id: "6",
    name: "Signature Fragrance",
    slug: "signature-fragrance",
    price: 95,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1780&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1780&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035929356-c03eb51ce574?q=80&w=1780&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582616698198-f978da534162?q=80&w=1780&auto=format&fit=crop"
    ],
    category: "Fragrance",
    description: "A luxurious fragrance that opens with fresh citrus notes, evolves into a heart of delicate florals, and settles into a warm base of amber and sandalwood.",
    variants: [
      {
        name: "Size",
        options: ["30ml", "50ml", "100ml"]
      }
    ],
    isNew: true,
    inStock: true,
    rating: 4.9,
    reviews: 56
  },
  {
    id: "7",
    name: "Professional Brush Set",
    slug: "professional-brush-set",
    price: 75,
    discountPrice: 65,
    image: "https://images.unsplash.com/photo-1631903608153-af6b7652e061?q=80&w=1780&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1631903608153-af6b7652e061?q=80&w=1780&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599733319988-5c3dae9599f0?q=80&w=1798&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627554295477-d1c7432a0757?q=80&w=1887&auto=format&fit=crop"
    ],
    category: "Tools",
    description: "A comprehensive set of professional-grade makeup brushes made with premium synthetic bristles. Includes everything you need for a flawless application.",
    inStock: true,
    rating: 4.8,
    reviews: 34
  },
  {
    id: "8",
    name: "Overnight Repair Mask",
    slug: "overnight-repair-mask",
    price: 58,
    image: "https://images.unsplash.com/photo-1562887245-9d941e87344e?q=80&w=1780&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1562887245-9d941e87344e?q=80&w=1780&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615862403133-cdb40be17165?q=80&w=1895&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=2035&auto=format&fit=crop"
    ],
    category: "Skincare",
    description: "A deeply nourishing overnight mask that works while you sleep to repair and rejuvenate tired skin. Wake up to plump, hydrated, and radiant skin.",
    variants: [
      {
        name: "Type",
        options: ["Hydrating", "Brightening", "Anti-aging"]
      }
    ],
    isFeatured: true,
    inStock: true,
    rating: 4.7,
    reviews: 68
  }
];
