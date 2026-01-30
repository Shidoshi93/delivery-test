import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { orderService } from '@/services/orderService';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import Button from '@/components/common/Button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      };

      await orderService.create(orderData, user.id);
      clearCart();
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Erro ao finalizar pedido. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-6">
              Adicione produtos para continuar
            </p>
            <Button onClick={() => navigate('/')}>Ver Produtos</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Continuar Comprando
          </Button>
          <h1 className="text-4xl font-bold">Carrinho</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div>
            <CartSummary
              subtotal={total}
              onCheckout={handleCheckout}
              disabled={isLoading}
            />
          </div>
        </div>

        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
              <div className="text-green-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Pedido Realizado!</h2>
              <p className="text-gray-600">
                Seu pedido foi realizado com sucesso
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
