import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// api.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });



export default api;

export interface Product {
  image_url: string | undefined;
  created_at: number;
  id: number;
  name: string;
  description: string | null;
  price: string;
  stock: number;
  image_data?: string | null; // base64, when returned by backend
  image_mime_type?: string | null;
  category_id: number | null;
  brand: string | null;
  discountPercentage: number;
  rating: number;
  sku: string | null;
  tags: string[];
  thumbnail: string | null;
  images: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}
export interface CartItem {
  product: any;
  image_mime_type: string;
  image_data: any;
  id: number;
  product_id: number;
  name: string;
  price: string;
  image_url: string;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

// Wishlist interface
export interface WishlistItem {
  id: number;
  user_id: number;
  product_id: number;
  created_at: string;
  product?: Product;
}
