import { Order, CreateOrderData, OrderStatus } from '@/types/order';
import { mockProducts } from '@/data/mockData';

const mockOrders: Order[] = [];

// Mock order service
export const orderService = {
  getAll: async (): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockOrders];
  },

  getById: async (id: string): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const order = mockOrders.find(o => o.id === id);
    if (!order) {
      throw new Error('Pedido não encontrado');
    }
    return order;
  },

  getByClient: async (clientId: string): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockOrders.filter(o => o.clientId === clientId);
  },

  getByRestaurant: async (restaurantId: string): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockOrders.filter(o => o.restaurantId === restaurantId);
  },

  create: async (data: CreateOrderData, clientId: string): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const items = data.items.map(item => {
      const product = mockProducts.find(p => p.id === item.productId);
      if (!product) {
        throw new Error(`Produto ${item.productId} não encontrado`);
      }
      return {
        productId: item.productId,
        product,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder: Order = {
      id: String(mockOrders.length + 1),
      clientId,
      restaurantId: '2',
      items,
      total,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockOrders.push(newOrder);
    return newOrder;
  },

  updateStatus: async (id: string, status: OrderStatus): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockOrders.findIndex(o => o.id === id);
    if (index === -1) {
      throw new Error('Pedido não encontrado');
    }
    mockOrders[index] = {
      ...mockOrders[index],
      status,
      updatedAt: new Date(),
    };
    return mockOrders[index];
  },
};
