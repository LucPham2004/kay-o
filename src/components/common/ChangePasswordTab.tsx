import React, { useState } from 'react';
import { useApp } from '@/utils/AppContext';
import { callChangePassword } from '@/services/AuthService';
import { toast, ToastContainer } from 'react-toastify';

const ChangePasswordTab: React.FC = () => {
  const { isDarkMode } = useApp();
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState<{
    current_password?: string;
    new_password?: string;
    confirm_password?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await callChangePassword(formData);

      if (response.is_valid) {
        toast.success('Đổi mật khẩu thành công!');
        setFormData({
          current_password: '',
          new_password: '',
          confirm_password: '',
        });
      } else {
        toast.error(response.message || 'Đổi mật khẩu thất bại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  return (<>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={`block text-sm font-medium mb-1
          ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Mật khẩu hiện tại
        </label>
        <input
          type="password"
          name="current_password"
          value={formData.current_password}
          onChange={handleChange}
          className={`w-full p-2 rounded-md border
            ${isDarkMode
              ? 'bg-[#232425] border-gray-600 text-white'
              : 'bg-white border-gray-300 text-black'}
            ${errors.current_password ? 'border-red-500' : ''}`}
          placeholder="Nhập mật khẩu hiện tại"
        />
        {errors.current_password && (
          <p className="mt-1 text-sm text-red-500">{errors.current_password}</p>
        )}
      </div>

      <div>
        <label className={`block text-sm font-medium mb-1
          ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Mật khẩu mới
        </label>
        <input
          type="password"
          name="new_password"
          value={formData.new_password}
          onChange={handleChange}
          className={`w-full p-2 rounded-md border
            ${isDarkMode
              ? 'bg-[#232425] border-gray-600 text-white'
              : 'bg-white border-gray-300 text-black'}
            ${errors.new_password ? 'border-red-500' : ''}`}
          placeholder="Nhập mật khẩu mới"
        />
        {errors.new_password && (
          <p className="mt-1 text-sm text-red-500">{errors.new_password}</p>
        )}
      </div>

      <div>
        <label className={`block text-sm font-medium mb-1
          ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Xác nhận mật khẩu mới
        </label>
        <input
          type="password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          className={`w-full p-2 rounded-md border
            ${isDarkMode
              ? 'bg-[#232425] border-gray-600 text-white'
              : 'bg-white border-gray-300 text-black'}
            ${errors.confirm_password ? 'border-red-500' : ''}`}
          placeholder="Nhập lại mật khẩu mới"
        />
        {errors.confirm_password && (
          <p className="mt-1 text-sm text-red-500">{errors.confirm_password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!formData.current_password || !formData.new_password || !formData.confirm_password}
        className={`w-full py-2 px-4 rounded-md font-medium
          ${isDarkMode
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
      >
        Đổi mật khẩu
      </button>
    </form>
  </>
  );
};

export default ChangePasswordTab; 