import React from 'react';
import { CreditCard, ChevronLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
  onSubmit: () => void;
}

export default function PaymentForm({ onBack, onSubmit }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <div className="relative mt-1">
            <input
              type="text"
              name="card-number"
              id="card-number"
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 pl-10 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="1234 5678 9012 3456"
              pattern="[0-9]{16}"
            />
            <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              name="expiry"
              id="expiry"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="MM/YY"
              pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <input
              type="text"
              name="cvc"
              id="cvc"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="123"
              pattern="[0-9]{3,4}"
            />
          </div>
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
          type="submit"
          className="flex-1 rounded-full bg-teal-500 px-4 py-2 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Continue to Summary
        </button>
      </div>
    </form>
  );
}