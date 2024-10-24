import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './checkout/CheckoutModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: Props) {
  const { state, removeItem, updateQuantity } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="w-screen max-w-md">
            <div className="flex h-full flex-col bg-white shadow-xl">
              <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                <button
                  onClick={onClose}
                  className="rounded-md text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {state.items.length === 0 ? (
                <div className="flex-1 px-4 py-6 sm:px-6">
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <ShoppingBag className="h-16 w-16 text-gray-400" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="space-y-4">
                      {state.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">£{item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="rounded-full p-1 text-gray-400 hover:text-gray-500"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-gray-600 w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="rounded-full p-1 text-gray-400 hover:text-gray-500"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="rounded-full p-1 text-red-400 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>£{state.total.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Delivery fee calculated at checkout</p>
                    <div className="mt-6">
                      <button
                        onClick={() => setIsCheckoutOpen(true)}
                        className="w-full rounded-full bg-teal-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-600"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
}