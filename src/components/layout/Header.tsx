import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Home, Package } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Package className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-primary">DeliveryApp</span>
          </Link>

          <nav className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                {user?.type === 'client' ? (
                  <>
                    <Link
                      to="/"
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
                    >
                      <Home size={20} />
                      <span>Início</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
                    >
                      <Package size={20} />
                      <span>Pedidos</span>
                    </Link>
                    <Link
                      to="/cart"
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors relative"
                    >
                      <ShoppingCart size={20} />
                      <span>Carrinho</span>
                      {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {itemCount}
                        </span>
                      )}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/restaurant/dashboard"
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
                    >
                      <Package size={20} />
                      <span>Produtos</span>
                    </Link>
                    <Link
                      to="/restaurant/orders"
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
                    >
                      <ShoppingCart size={20} />
                      <span>Pedidos</span>
                    </Link>
                  </>
                )}
                <div className="flex items-center space-x-3 border-l pl-6 ml-6">
                  <div className="flex items-center space-x-2">
                    <User size={20} className="text-gray-700" />
                    <span className="text-gray-700">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Sair</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Entrar
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
