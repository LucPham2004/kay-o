import React, { useState } from 'react';
import { useApp } from '@/utils/AppContext';
import { FaUser, FaLock } from 'react-icons/fa';
import AccountInfoTab from './AccountInfoTab';
import ChangePasswordTab from './ChangePasswordTab';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useApp();
  const [activeTab, setActiveTab] = useState<'info' | 'password'>('info');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className={`relative w-full max-w-4xl mx-4 rounded-xl shadow-lg flex
        ${isDarkMode ? 'bg-[#2f2f2f] text-white' : 'bg-white text-black'}`}>

        {/* Left Sidebar Menu */}
        <div className={`w-64 p-4 border-r
          ${isDarkMode ? 'border-[#454647]' : 'border-gray-200'}`}>
          <h2 className="text-xl font-bold mb-6">Cài đặt tài khoản</h2>

          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('info')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${activeTab === 'info'
                  ? isDarkMode
                    ? 'bg-[#454647] text-white'
                    : 'bg-blue-100 text-blue-600'
                  : isDarkMode
                    ? 'text-gray-400 hover:bg-[#454647]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <FaUser className="text-lg" />
              <span>Thông tin tài khoản</span>
            </button>

            <button
              onClick={() => setActiveTab('password')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${activeTab === 'password'
                  ? isDarkMode
                    ? 'bg-[#454647] text-white'
                    : 'bg-blue-100 text-blue-600'
                  : isDarkMode
                    ? 'text-gray-400 hover:bg-[#454647]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <FaLock className="text-lg" />
              <span>Đổi mật khẩu</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              {activeTab === 'info' ? 'Thông tin tài khoản' : 'Đổi mật khẩu'}
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-full hover:bg-opacity-10
                ${isDarkMode ? 'hover:bg-white' : 'hover:bg-black'}`}
            >
              ✕
            </button>
          </div>

          {activeTab === 'info' ? (
            <AccountInfoTab />
          ) : (
            <ChangePasswordTab />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountModal; 