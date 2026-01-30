import React, { useState, useMemo } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/product';
import ProductList from '@/components/products/ProductList';
import ProductFilter from '@/components/products/ProductFilter';
import CartButton from '@/components/cart/CartButton';
import { Search } from 'lucide-react';

const Home: React.FC = () => {
  const { products, isLoading } = useProducts();
  const { addItem, itemCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [products, selectedCategory, searchTerm]);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Cardápio</h1>
          <p className="text-gray-600">
            Escolha seus produtos favoritos e adicione ao carrinho
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-8">
          <ProductFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando produtos...</p>
          </div>
        ) : (
          <ProductList
            products={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        )}

        <CartButton itemCount={itemCount} />

        {showSuccess && (
          <div className="fixed bottom-24 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-40 animate-fade-in">
            Produto adicionado ao carrinho!
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
