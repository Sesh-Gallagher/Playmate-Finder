import { User } from '../types';

export interface AuthResponse {
  user: User;
  token: string;
}

export async function signInWithEmailPassword(email: string, password: string): Promise<AuthResponse> {
  // For demo purposes, let's create an admin user with specific credentials
  if (email === 'admin@example.com' && password === 'admin123') {
    return {
      user: {
        id: '1',
        email,
        name: 'Admin User',
        role: 'admin'
      },
      token: 'mock-admin-jwt-token'
    };
  }

  // Regular user login
  return {
    user: {
      id: '2',
      email,
      name: email.split('@')[0],
      role: 'parent'
    },
    token: 'mock-jwt-token'
  };
}

export async function signUp(data: { name: string; email: string; password: string }): Promise<AuthResponse> {
  // In a real app, this would make an API call to create the user
  return {
    user: {
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      role: 'parent'
    },
    token: 'mock-jwt-token'
  };
}

export async function signInWithGoogle(): Promise<AuthResponse> {
  throw new Error('Google sign-in not implemented');
}

export async function signInWithFacebook(): Promise<AuthResponse> {
  throw new Error('Facebook sign-in not implemented');
}

export function storeAuthToken(token: string): void {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('isAuthenticated', 'true');
}

export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function clearAuth(): void {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('isAuthenticated');
}