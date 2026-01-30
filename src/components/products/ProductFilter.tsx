import React from 'react';

interface ProductFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'pizzas', label: 'Pizzas' },
  { value: 'lanches', label: 'Lanches' },
  { value: 'bebidas', label: 'Bebidas' },
  { value: 'sobremesas', label: 'Sobremesas' },
  { value: 'outros', label: 'Outros' },
];

const ProductFilter: React.FC<ProductFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onSelectCategory(category.value)}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            selectedCategory === category.value
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default ProductFilter;
