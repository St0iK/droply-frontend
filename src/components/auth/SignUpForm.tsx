import React, { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Props {
  onSignIn: () => void;
  onSuccess: () => void;
}

export default function SignUpForm({ onSignIn, onSuccess }: Props) {
  const { signUp } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signUp(email, password);
      onSuccess();
    } catch (err) {
      setError('Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create an account
      </h2>

      {error && (
        <div className="mt-2 rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="relative mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500"
            />
            <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <div className="relative mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500"
            />
            <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
            Confirm Password
          </label>
          <div className="relative mt-2">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500"
            />
            <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:opacity-50"
          >
            Sign up
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={onSignIn}
          className="text-sm font-semibold text-teal-500 hover:text-teal-600"
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );
}