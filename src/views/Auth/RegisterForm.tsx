import React, { useState } from 'react';
import { useTheme } from '@/utils/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/utils/constant';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Register:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div
        className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3">
            <img
              src={"/kayo.webp"}
              alt="KayO Logo"
              className="h-10 w-10 object-contain"
            />
            <h1
              className={`text-4xl font-bold tracking-tight ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}
            >
              KayO
            </h1>
          </div>
          <p
            className={`mt-2 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Đăng ký để khám phá vũ trụ
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Tên người dùng
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`mt-1 w-full px-4 py-3 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600'
                } focus:outline-none focus:ring-2`}
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

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
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600'
                } focus:outline-none focus:ring-2`}
                placeholder="you@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`mt-1 w-full px-4 py-3 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600'
                } focus:outline-none focus:ring-2`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Xác nhận mật khẩu
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
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
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
              Đăng ký
            </button>
          </div>

          <div className="text-center text-sm">
            <p>
              Đã có tài khoản?{' '}
              <span
                onClick={() => navigate(routes.LOGIN)}
                className={`cursor-pointer ${
                  isDarkMode
                    ? 'text-blue-400 hover:text-blue-300'
                    : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                Đăng nhập
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;