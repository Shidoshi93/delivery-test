import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ProductFormData } from '@/types/product';
import { productService } from '@/services/productService';

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (data: ProductFormData) => Promise<Product>;
  updateProduct: (id: string, data: Partial<ProductFormData>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar produtos');
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async (data: ProductFormData): Promise<Product> => {
    const newProduct = await productService.create(data);
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = async (id: string, data: Partial<ProductFormData>): Promise<Product> => {
    const updatedProduct = await productService.update(id, data);
    setProducts(prev => prev.map(p => (p.id === id ? updatedProduct : p)));
    return updatedProduct;
  };

  const deleteProduct = async (id: string): Promise<void> => {
    await productService.delete(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products,
    isLoading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
