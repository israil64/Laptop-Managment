
export enum ProductCondition {
  LIKE_NEW = 'Like New',
  EXCELLENT = 'Excellent',
  GOOD = 'Good',
  FAIR = 'Fair'
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  twoFactorEnabled?: boolean;
  socialProvider?: 'google' | 'github' | 'email';
}

export interface Product {
  id: string;
  name: string;
  type: 'Laptop' | 'Part';
  brand: string;
  model: string;
  price: number;
  discountPrice?: number;
  stock: number;
  condition: ProductCondition;
  usedDuration: string;
  batteryHealth?: number;
  damageNotes?: string;
  warrantyType: string;
  images: string[];
  averageRating: number;
  description: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
