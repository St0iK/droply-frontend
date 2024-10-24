import React, { useState } from 'react';
import { X } from 'lucide-react';
import DeliveryForm from './DeliveryForm';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';
import CheckoutProgress from './CheckoutProgress';
import { useCart } from '../../context/CartContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type CheckoutStep = 'delivery' | 'payment' | 'summary';

export default function CheckoutModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState<CheckoutStep>('delivery');
  const { state, clearCart } = useCart();
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    instructions: '',
    time: 'asap',
  });

  if (!isOpen) return null;

  const handleDeliverySubmit = (details: typeof deliveryDetails) => {
    setDeliveryDetails(details);
    setStep('payment');
  };

  const handlePaymentSubmit = () => {
    setStep('summary');
  };

  const handlePlaceOrder = () => {
    // Here you would typically make an API call to process the order
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-md text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-8">
            <CheckoutProgress currentStep={step} />
          </div>

          {step === 'delivery' && (
            <DeliveryForm
              initialValues={deliveryDetails}
              onSubmit={handleDeliverySubmit}
            />
          )}

          {step === 'payment' && (
            <PaymentForm
              onBack={() => setStep('delivery')}
              onSubmit={handlePaymentSubmit}
            />
          )}

          {step === 'summary' && (
            <OrderSummary
              items={state.items}
              total={state.total}
              deliveryDetails={deliveryDetails}
              onBack={() => setStep('payment')}
              onConfirm={handlePlaceOrder}
            />
          )}
        </div>
      </div>
    </div>
  );
}