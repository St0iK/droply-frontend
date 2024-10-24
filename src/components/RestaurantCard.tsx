import React from 'react';
import { Star } from 'lucide-react';
import type { Restaurant } from '../types';

interface Props {
  restaurant: Restaurant;
  onClick: () => void;
}

export default function RestaurantCard({ restaurant, onClick }: Props) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative overflow-hidden rounded-xl">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="h-48 w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        {restaurant.featured && (
          <div className="absolute top-2 right-2 bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
      </div>
      
      <div className="mt-3">
        <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
        <div className="flex items-center space-x-1 mt-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600">
            {restaurant.rating} · {restaurant.deliveryTime} mins
          </span>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-sm text-gray-500">
            {restaurant.categories.join(' · ')}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Delivery fee: {restaurant.deliveryFee}
        </p>
      </div>
    </div>
  );
}