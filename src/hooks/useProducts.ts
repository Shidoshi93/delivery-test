import { useProductContext } from '@/contexts/ProductContext';

export const useProducts = () => {
  return useProductContext();
};
