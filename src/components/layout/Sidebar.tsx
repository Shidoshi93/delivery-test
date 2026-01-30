import React from 'react';
import { NavLink } from 'react-router-dom';
import { Package, ShoppingCart, LayoutDashboard } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    {
      to: '/restaurant/dashboard',
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
    },
    {
      to: '/restaurant/products',
      icon: <Package size={20} />,
      label: 'Produtos',
    },
    {
      to: '/restaurant/orders',
      icon: <ShoppingCart size={20} />,
      label: 'Pedidos',
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-md min-h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
