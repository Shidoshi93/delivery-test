import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { validateEmail, validatePassword } from '@/utils/validators';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Email inválido';
    }
    if (!validatePassword(password)) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
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
      await login({ email, password });
      navigate('/');
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : 'Erro ao fazer login'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Package className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo ao DeliveryApp
          </h1>
          <p className="text-gray-600">Faça login para continuar</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {serverError}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="seu@email.com"
            />

            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="••••••"
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <Link
                to="/register"
                className="text-primary hover:text-primary-dark font-medium"
              >
                Cadastre-se
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-500 mb-2">Credenciais de teste:</p>
            <div className="space-y-1 text-sm">
              <p className="text-gray-600">
                <strong>Cliente:</strong> cliente@teste.com
              </p>
              <p className="text-gray-600">
                <strong>Restaurante:</strong> restaurante@teste.com
              </p>
              <p className="text-gray-600">
                <strong>Senha:</strong> qualquer senha
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
