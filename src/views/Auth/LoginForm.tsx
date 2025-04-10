import React, { useState } from 'react';
import { useTheme } from '@/utils/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/utils/constant';
import { FcGoogle } from 'react-icons/fc';
import { callLogin } from '@/services/AuthService';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  }); 
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useTheme();  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email: formData.email,
      password: formData.password,
    };
    const response = await callLogin(data);
    console.log(response);  
    if(response.is_valid === true){
      window.localStorage.setItem('access_token', response.accessToken);
      navigate(routes.DEFAULT);
    } else { 
      console.log(response);
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleLogin = () => {
    console.log('Google Login');
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center
        ${isDarkMode ? 'bg-[#232425]' : 'bg-white'}`}
    >
      <div
        className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-lg border
          ${isDarkMode 
            ? 'bg-[#1F1F1F] text-gray-300 border-gray-700' 
            : 'bg-[#F9F9F9] text-black border-gray-200'}`}
      >
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3">
            <img 
              src={'/kayo.webp'} 
              alt="KayO Logo" 
              className={`w-10 h-10 rounded-full ${isDarkMode ? 'text-white' : 'text-black'}`}
            />
            <h1
              className={`text-4xl font-bold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-black'
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
            Đăng nhập để khám phá vũ trụ
          </p>
        </div>

        <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
          <div className="space-y-6">
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
                type="email"
                name="email"
                required
                className={`mt-1 w-full px-4 py-3 rounded-md border ${
                  isDarkMode
                    ? 'bg-[#232425] border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600'
                  } focus:outline-none focus:ring-2
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} 
                `}
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
                type="password"
                name="password"
                required
                className={`mt-1 w-full px-4 py-3 rounded-md border ${
                  isDarkMode
                    ? 'bg-[#232425] border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600'
                } focus:outline-none focus:ring-2
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} 
                `}
                placeholder="••••••••"
                value={formData.password}
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
              } focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} 
              `}
              disabled={isLoading} 
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'} 
            </button>
          </div>
        </form>

        <div>
          <button
            onClick={handleGoogleLogin}
            className={`w-full py-3 px-4 border rounded-md shadow-sm text-sm font-medium flex items-center justify-center space-x-2 ${
              isDarkMode
                ? 'bg-[#232425] border-gray-600 text-white hover:bg-gray-600'
                : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-100'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150`}
          >
            <FcGoogle className="w-5 h-5" />
            <span>Đăng nhập bằng Google</span>
          </button>
        </div>

        <div className="text-center text-sm space-y-2">
          <p>
            <span
              onClick={() => navigate(routes.FORGOT_PASSWORD)}
              className={`cursor-pointer ${
                isDarkMode
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              Quên mật khẩu?
            </span>
          </p>
          <p>
            Chưa có tài khoản?{' '}
            <span
              onClick={() => navigate(routes.REGISTER)}
              className={`cursor-pointer ${
                isDarkMode
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              Đăng ký
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;