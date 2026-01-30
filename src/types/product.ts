export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  restaurantId: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
}

export type ProductCategory = 'pizzas' | 'lanches' | 'bebidas' | 'sobremesas' | 'outros';
