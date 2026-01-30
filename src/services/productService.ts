import { Product, ProductFormData } from '@/types/product';
import { mockProducts } from '@/data/mockData';

// Mock product service
export const productService = {
  getAll: async (): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockProducts];
  },

  getById: async (id: string): Promise<Product> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Produto não encontrado');
    }
    return product;
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts.filter(p => p.category === category);
  },

  create: async (data: ProductFormData): Promise<Product> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProduct: Product = {
      id: String(mockProducts.length + 1),
      ...data,
      restaurantId: '2', // Mock restaurant ID
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  update: async (id: string, data: Partial<ProductFormData>): Promise<Product> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Produto não encontrado');
    }
    mockProducts[index] = { ...mockProducts[index], ...data };
    return mockProducts[index];
  },

  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Produto não encontrado');
    }
    mockProducts.splice(index, 1);
  },
};
