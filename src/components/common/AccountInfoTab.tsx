import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useApp } from '@/utils/AppContext';
import { callUpdateUser } from '@/services/UserService';
import { doGetAccount } from '@/redux/slices/authSlice';

const AccountInfoTab: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { isDarkMode } = useApp();
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    avatar: user?.avatar || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!user)
        return;
    try {
      const response = await callUpdateUser(user?._id, formData);
      if (response._id) {
        console.log('Cập nhật thông tin thành công!');
        setIsEditing(false);
        // Cập nhật lại thông tin user trong store
        dispatch(doGetAccount(response));
      } else {
        console.log('Cập nhật thất bại');
      }
    } catch (error) {
        console.log('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center mb-4">
        <img
          src={formData.avatar || '/kayo.webp'}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-1
            ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Tên người dùng
          </label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full p-2 rounded-md border
                ${isDarkMode 
                  ? 'bg-[#232425] border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-black'}`}
              placeholder="Nhập tên người dùng"
            />
          ) : (
            <div className={`p-2 rounded-md
              ${isDarkMode ? 'bg-[#232425] text-white' : 'bg-gray-100 text-black'}`}>
              {formData.username}
            </div>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1
            ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Email
          </label>
          <div className={`p-2 rounded-md
            ${isDarkMode ? 'bg-[#232425] text-white' : 'bg-gray-100 text-black'}`}>
            {user?.email}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    username: user?.username || '',
                    avatar: user?.avatar || '',
                  });
                }}
                className={`px-4 py-2 rounded-md font-medium
                  ${isDarkMode 
                    ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                Hủy
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded-md font-medium
                  ${isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
              >
                Lưu
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className={`px-4 py-2 rounded-md font-medium
                ${isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              Cập nhật
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountInfoTab; 