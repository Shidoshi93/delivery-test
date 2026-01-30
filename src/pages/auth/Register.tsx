import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import { validateEmail, validatePassword, validateRequired } from '@/utils/validators';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'client' as 'client' | 'restaurant',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setIsLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        type: formData.type,
      });
      navigate('/');
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : 'Erro ao fazer cadastro'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const userTypeOptions = [
    { value: 'client', label: 'Cliente' },
    { value: 'restaurant', label: 'Restaurante' },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Package className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Criar Conta
          </h1>
          <p className="text-gray-600">Cadastre-se no DeliveryApp</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {serverError}
              </div>
            )}

            <Input
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Seu nome completo"
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="seu@email.com"
            />

            <Input
              label="Senha"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••"
            />

            <Input
              label="Confirmar Senha"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="••••••"
            />

            <Select
              label="Tipo de Usuário"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={userTypeOptions}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <Link
                to="/login"
                className="text-primary hover:text-primary-dark font-medium"
              >
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
