import React, { createContext, useState, useEffect } from 'react';
import { User } from '../types';
import { getAuthToken } from '../services/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      // For demo, create admin user if token exists
      setUser({
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      });
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}