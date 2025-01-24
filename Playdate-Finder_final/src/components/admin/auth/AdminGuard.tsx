/**
 * A React component that serves as a guard for admin-only routes. It checks if the
 * current user has the 'admin' role and redirects to the login page if not.
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user || user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}
