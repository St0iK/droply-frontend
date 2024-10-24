import React, { useState } from 'react';
import { MapPin, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Cart from './Cart';
import AuthModal from './auth/AuthModal';

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { state } = useCart();
  const { currentUser, logout } = useAuth();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  const handleAuthClick = async () => {
    if (currentUser) {
      try {
        await logout();
      } catch (error) {
        console.error('Failed to log out');
      }
    } else {
      setIsAuthOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/deliveroo-logo.svg" alt="Deliveroo" className="h-8" />
              <div className="flex items-center space-x-2 text-gray-700 hover:text-teal-500 cursor-pointer">
                <MapPin className="h-5 w-5" />
                <span className="text-sm font-medium">London, UK</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center space-x-2 hover:text-teal-500 relative"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="text-sm font-medium">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-teal-500 text-white text-xs flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={handleAuthClick}
                className="flex items-center space-x-2 hover:text-teal-500"
              >
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {currentUser ? 'Sign out' : 'Sign in'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}