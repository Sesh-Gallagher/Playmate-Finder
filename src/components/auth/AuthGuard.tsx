import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuthToken } from '../../services/auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = getAuthToken();
    
    if (!token && location.pathname !== '/login') {
      localStorage.setItem('redirectUrl', location.pathname);
      navigate('/login');
    }
  }, [navigate, location]);

  return <>{children}</>;
}