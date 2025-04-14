import React from 'react';
import { useApp } from '@/utils/AppContext';

interface ForgotPasswordProps {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ email, onEmailChange, onSubmit, isLoading }) => {
  const { isDarkMode } = useApp();

  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="email"
          className={`block text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={`mt-1 w-full px-4 py-3 rounded-md border ${
            isDarkMode
              ? 'bg-[#232425] border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600'
          } focus:outline-none focus:ring-2 
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          placeholder="you@gmail.com"
          value={email}
          onChange={onEmailChange}
        />
      </div>

      <div>
        <button
          type="submit"
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-600'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
          >
          {isLoading ? 'Đang gửi mã xác thực...' : 'Gửi mã xác thực'}
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
