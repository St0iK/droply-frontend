import React from 'react';
import { ChevronLeft } from 'lucide-react';
import type { CartItem } from '../../types';

interface Props {
  items: CartItem[];
  total: number;
  deliveryDetails: {
    address: string;
    instructions: string;
    time: string;
  };
  onBack: () => void;
  onConfirm: () => void;
}

export default function OrderSummary({
  items,
  total,
  deliveryDetails,
  onBack,
  onConfirm,
}: Props) {
  const deliveryFee = 2.99;
  const serviceFee = 0.99;
  const finalTotal = total + deliveryFee + serviceFee;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
        <div className="mt-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-500">
                {item.quantity}x {item.name}
              </span>
              <span className="text-gray-900">£{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-900">£{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Delivery Fee</span>
            <span className="text-gray-900">£{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Service Fee</span>
            <span className="text-gray-900">£{serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-medium">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">£{finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-900">Delivery Details</h4>
        <div className="mt-2 space-y-1 text-sm text-gray-500">
          <p>{deliveryDetails.address}</p>
          {deliveryDetails.instructions && <p>{deliveryDetails.instructions}</p>}
          <p>
            Delivery time:{' '}
            {deliveryDetails.time === 'asap' ? 'As soon as possible' : 'Scheduled'}
          </p>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 rounded-full bg-teal-500 px-4 py-2 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}