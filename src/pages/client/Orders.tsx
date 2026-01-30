import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { orderService } from '@/services/orderService';
import { Order } from '@/types/order';
import { formatCurrency, formatDate } from '@/utils/formatters';
import Badge from '@/components/common/Badge';
import Card from '@/components/common/Card';
import { Package } from 'lucide-react';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const data = await orderService.getByClient(user.id);
        setOrders(data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando pedidos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Meus Pedidos</h1>
          <div className="text-center py-16">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Nenhum pedido ainda</h2>
            <p className="text-gray-600">
              Seus pedidos aparecerão aqui após a compra
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Meus Pedidos</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Pedido #{order.id}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <Badge status={order.status} />
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-700">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
