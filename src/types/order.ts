import { Product } from './product';

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  clientId: string;
  restaurantId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 'pending' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';

export interface CreateOrderData {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}
