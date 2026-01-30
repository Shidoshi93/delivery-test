import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { formatCurrency } from '@/utils/formatters';
import Card from '../common/Card';
import Button from '../common/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  showActions?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onEdit,
  showActions = true,
}) => {
  return (
    <Card className="flex flex-col h-full">
      <div className="relative pb-2/3 mb-3 overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <span className="text-white font-semibold">Indisponível</span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <p className="text-2xl font-bold text-primary mb-4">
          {formatCurrency(product.price)}
        </p>
      </div>

      {showActions && (
        <div className="flex gap-2">
          {onEdit && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onEdit(product)}
            >
              Editar
            </Button>
          )}
          {onAddToCart && product.available && (
            <Button
              variant="primary"
              className="flex-1 flex items-center justify-center space-x-2"
              onClick={() => onAddToCart(product)}
            >
              <Plus size={18} />
              <span>Adicionar</span>
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
