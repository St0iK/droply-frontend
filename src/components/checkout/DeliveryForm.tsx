import React from 'react';
import { Clock } from 'lucide-react';

interface DeliveryDetails {
  address: string;
  instructions: string;
  time: string;
}

interface Props {
  initialValues: DeliveryDetails;
  onSubmit: (details: DeliveryDetails) => void;
}

export default function DeliveryForm({ initialValues, onSubmit }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    onSubmit({
      address: formData.get('address') as string,
      instructions: formData.get('instructions') as string,
      time: formData.get('time') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Delivery Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          defaultValue={initialValues.address}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          placeholder="Enter your full address"
        />
      </div>

      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
          Delivery Instructions (optional)
        </label>
        <textarea
          name="instructions"
          id="instructions"
          defaultValue={initialValues.instructions}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          placeholder="Any special instructions for delivery?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Delivery Time</label>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="time"
              value="asap"
              defaultChecked={initialValues.time === 'asap'}
              className="h-4 w-4 text-teal-500 focus:ring-teal-500"
            />
            <span className="ml-2 flex items-center text-sm">
              <Clock className="mr-1 h-4 w-4" />
              As soon as possible
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="time"
              value="scheduled"
              defaultChecked={initialValues.time === 'scheduled'}
              className="h-4 w-4 text-teal-500 focus:ring-teal-500"
            />
            <span className="ml-2 text-sm">Schedule for later</span>
          </label>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full rounded-full bg-teal-500 px-4 py-2 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
}