import React from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  showActions?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  onEdit,
  showActions = true,
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onEdit={onEdit}
          showActions={showActions}
        />
      ))}
    </div>
  );
};

export default ProductList;
