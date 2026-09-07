import { Product } from "../features/products/types/product";

const Allproducts: Product[] = [
  {
    id: "1",
    Name: "Minimalist Leather Backpack",
    Category: "Accessories",
    Price: 120,
    Images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
    ],
    ImageAlt: "Premium dark brown leather backpack",
    Colors: ["#4A2E2B", "#1E1E1E", "#D2B48C"],
    Description:
      "Handcrafted from full-grain leather, designed for daily commutes and modern professionals.",
    IsFeatured: true,
  },
  {
    id: "2",
    Name: "Wireless Noise-Canceling Headphones",
    Category: "Electronics",
    Price: 249,
    Images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    ],
    ImageAlt: "Over-ear matte black wireless headphones",
    Colors: ["#1E1E1E", "#E5E5E5"],
    Description:
      "Immersive sound experience with active noise cancellation and 30-hour battery life.",
    IsFeatured: true,
  },
  {
    id: "3",
    Name: "Classic Oversized Cotton Hoodie",
    Category: "Apparel",
    Price: 65,
    Images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    ],
    ImageAlt: "Cozy minimalist beige hoodie",
    Colors: ["#F5F5DC", "#36454F", "#800020"],
    Description:
      "Made with 100% heavy organic cotton for ultimate comfort and relaxed street style.",
    IsFeatured: false,
  },
  {
    id: "4",
    Name: "Urban Knit Sneakers",
    Category: "Footwear",
    Price: 110,
    Images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    ],
    ImageAlt: "Red lightweight athletic sneakers",
    Colors: ["#E63946", "#1D3557", "#F1FAEE"],
    Description:
      "Breathable mesh upper with ultra-responsive cushioning for everyday active wear.",
    IsFeatured: true,
  },
  {
    id: "5",
    Name: "Smart Fitness Watch V2",
    Category: "Electronics",
    Price: 180,
    Images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    ],
    ImageAlt: "Minimalist white smartwatch on wrist",
    Colors: ["#FFFFFF", "#000000", "#FFB6C1"],
    Description:
      "Track your workouts, heart rate, and sleep quality with crisp OLED display.",
    IsFeatured: false,
  },
  {
    id: "6",
    Name: "Polarized Retro Sunglasses",
    Category: "Accessories",
    Price: 45,
    Images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    ],
    ImageAlt: "Stylish polarized sunglasses with gold frame",
    Colors: ["#FFD700", "#1E1E1E"],
    Description:
      "UV400 protection with classic frame aesthetics that suit all face shapes.",
    IsFeatured: false,
  },
];

export const productsMap: Record<string, Product> = Allproducts.reduce((acc, product) => {
  acc[product.id] = product;
  return acc;
}, {} as Record<string, Product>);

export default Allproducts;
