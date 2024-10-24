import React, { useState } from 'react';
import { X } from 'lucide-react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ResetPasswordForm from './ResetPasswordForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type AuthView = 'signin' | 'signup' | 'reset';

export default function AuthModal({ isOpen, onClose }: Props) {
  const [view, setView] = useState<AuthView>('signin');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-md text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {view === 'signin' && (
            <SignInForm
              onSignUp={() => setView('signup')}
              onForgotPassword={() => setView('reset')}
              onSuccess={onClose}
            />
          )}

          {view === 'signup' && (
            <SignUpForm
              onSignIn={() => setView('signin')}
              onSuccess={onClose}
            />
          )}

          {view === 'reset' && (
            <ResetPasswordForm
              onBack={() => setView('signin')}
            />
          )}
        </div>
      </div>
    </div>
  );
}