import React from 'react';
import { useTheme } from '@/utils/ThemeContext';

interface ResetPasswordProps {
  newPassword: string;
  confirmPassword: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  newPassword,
  confirmPassword,
  onPasswordChange,
  onSubmit,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="newPassword"
          className={`block text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          Mật khẩu mới
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          className={`mt-1 w-full px-4 py-3 rounded-md border ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600'
          } focus:outline-none focus:ring-2`}
          placeholder="Nhập mật khẩu mới"
          value={newPassword}
          onChange={onPasswordChange}
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className={`block text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          Xác nhận mật khẩu mới
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          className={`mt-1 w-full px-4 py-3 rounded-md border ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600'
          } focus:outline-none focus:ring-2`}
          placeholder="Nhập lại mật khẩu mới"
          value={confirmPassword}
          onChange={onPasswordChange}
        />
      </div>

      <div>
        <button
          type="submit"
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-600'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150`}
        >
          Đặt lại mật khẩu
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;
