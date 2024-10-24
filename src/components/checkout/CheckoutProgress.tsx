import React from 'react';
import { Check } from 'lucide-react';

interface Props {
  currentStep: 'delivery' | 'payment' | 'summary';
}

const steps = [
  { id: 'delivery', name: 'Delivery' },
  { id: 'payment', name: 'Payment' },
  { id: 'summary', name: 'Summary' },
];

export default function CheckoutProgress({ currentStep }: Props) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full \${
                index <= currentStepIndex
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index < currentStepIndex ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span
              className={`ml-2 text-sm font-medium \${
                index <= currentStepIndex ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              {step.name}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-16 \${
                index < currentStepIndex ? 'bg-teal-500' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
