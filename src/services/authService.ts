import { LoginCredentials, RegisterData, AuthResponse } from '@/types/user';
import { mockUsers } from '@/data/mockData';

// Mock authentication service
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = mockUsers.find(
      u => u.email === credentials.email
    );

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // In a real app, verify password here
    const token = `mock-token-${user.id}-${Date.now()}`;
    
    return {
      user,
      token,
    };
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const newUser = {
      id: String(mockUsers.length + 1),
      name: data.name,
      email: data.email,
      type: data.type,
      createdAt: new Date(),
    };

    mockUsers.push(newUser);

    const token = `mock-token-${newUser.id}-${Date.now()}`;

    return {
      user: newUser,
      token,
    };
  },

  logout: async (): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
