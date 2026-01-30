import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/cart';
import { formatCurrency } from '@/utils/formatters';
import Button from '../common/Button';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const subtotal = item.product.price * item.quantity;

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.product.name}</h3>
        <p className="text-gray-600 text-sm">{formatCurrency(item.product.price)}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
          className="p-1 hover:bg-gray-100 rounded"
          disabled={item.quantity <= 1}
        >
          <Minus size={18} />
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="text-right">
        <p className="font-bold text-lg">{formatCurrency(subtotal)}</p>
      </div>

      <Button
        variant="danger"
        size="sm"
        onClick={() => onRemove(item.product.id)}
        className="ml-4"
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
