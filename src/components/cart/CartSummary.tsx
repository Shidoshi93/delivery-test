import React from 'react';
import { formatCurrency } from '@/utils/formatters';
import Card from '../common/Card';
import Button from '../common/Button';

interface CartSummaryProps {
  subtotal: number;
  deliveryFee?: number;
  onCheckout: () => void;
  disabled?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  deliveryFee = 5.0,
  onCheckout,
  disabled = false,
}) => {
  const total = subtotal + deliveryFee;

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Taxa de Entrega</span>
          <span>{formatCurrency(deliveryFee)}</span>
        </div>
        <div className="border-t pt-3 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">{formatCurrency(total)}</span>
        </div>
      </div>

      <Button
        variant="primary"
        className="w-full"
        size="lg"
        onClick={onCheckout}
        disabled={disabled}
      >
        Finalizar Pedido
      </Button>
    </Card>
  );
};

export default CartSummary;
