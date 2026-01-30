import React from 'react';
import { OrderStatus } from '@/types/order';

interface BadgeProps {
  status: OrderStatus;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  const statusConfig = {
    pending: {
      label: 'Pendente',
      className: 'bg-yellow-100 text-yellow-800',
    },
    preparing: {
      label: 'Em Preparo',
      className: 'bg-blue-100 text-blue-800',
    },
    delivering: {
      label: 'Saiu para Entrega',
      className: 'bg-purple-100 text-purple-800',
    },
    delivered: {
      label: 'Entregue',
      className: 'bg-green-100 text-green-800',
    },
    cancelled: {
      label: 'Cancelado',
      className: 'bg-red-100 text-red-800',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default Badge;
