import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, LogOut } from 'lucide-react';
import { clearAuth } from '../../services/auth';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-purple-100 font-medium' : 'text-white hover:text-purple-100';
  };

  const handleSignOut = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Users className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold text-white">PlayMate Finder</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/find-friends" className={isActive('/find-friends')}>Find Friends</Link>
            <Link to="/events" className={isActive('/events')}>Events</Link>
            <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
            <Link to="/profile" className={isActive('/profile')}>Profile</Link>
            <button
              onClick={handleSignOut}
              className="flex items-center text-white hover:text-purple-100 ml-4"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Sign Out
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}