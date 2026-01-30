import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { Product, ProductFormData } from '@/types/product';
import { formatCurrency } from '@/utils/formatters';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Card from '@/components/common/Card';
import ProductForm from '@/components/products/ProductForm';

const Dashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, isLoading } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOpenModal = (product?: Product) => {
    setSelectedProduct(product || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: ProductFormData) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, data);
      } else {
        await addProduct(data);
      }
      handleCloseModal();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Erro ao salvar produto');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      await deleteProduct(id);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Erro ao excluir produto');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando produtos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Gerenciar Produtos</h1>
            <p className="text-gray-600">
              Total de produtos: {products.length}
            </p>
          </div>
          <Button onClick={() => handleOpenModal()}>
            <Plus size={20} className="mr-2" />
            Novo Produto
          </Button>
        </div>

        {products.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                Nenhum produto cadastrado
              </p>
              <Button onClick={() => handleOpenModal()}>
                Cadastrar Primeiro Produto
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  {!product.available && (
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      Indisponível
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-2xl font-bold text-primary mb-4">
                  {formatCurrency(product.price)}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleOpenModal(product)}
                  >
                    <Edit size={18} className="mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedProduct ? 'Editar Produto' : 'Novo Produto'}
          size="lg"
        >
          <ProductForm
            product={selectedProduct}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
          />
        </Modal>

        {showSuccess && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            Operação realizada com sucesso!
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
