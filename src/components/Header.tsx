import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="bg-theme shadow-md theme-transition">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-12 w-12">
            <img 
              src="/logo.svg" 
              alt="Dine2Day" 
              className="h-full w-full text-theme-primary"
              style={{ filter: 'brightness(0) saturate(100%) var(--primary-color)' }}
            />
          </div>
          <span className="text-2xl font-bold text-theme-primary">Dine2Day</span>
        </Link>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Search className="text-theme hover:text-theme-primary theme-transition cursor-pointer" />
          <User className="text-theme hover:text-theme-primary theme-transition cursor-pointer" />
          <Menu className="text-theme hover:text-theme-primary theme-transition cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;