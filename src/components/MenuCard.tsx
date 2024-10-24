import React from 'react';
import { Plus } from 'lucide-react';
import type { MenuItem } from '../types';
import { useCart } from '../context/CartContext';

interface Props {
  item: MenuItem;
}

export default function MenuCard({ item }: Props) {
  const { addItem } = useCart();

  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-medium text-gray-900">£{item.price.toFixed(2)}</p>
          <button
            onClick={() => addItem(item)}
            className="flex items-center space-x-1 rounded-full bg-teal-500 px-3 py-1 text-sm text-white hover:bg-teal-600"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
      
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}