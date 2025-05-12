import React, { useState } from 'react';
import { useApp } from '@/utils/AppContext';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
    TbLayoutDashboard, 
    TbUsers, 
    TbSettings, 
    TbLogout,
    TbMenu2,
    TbChevronLeft,
    TbUser,
    TbMoon
} from 'react-icons/tb';
import { routes } from '@/utils/constant';
import AccountModal from '../common/AccountModal';
import { FaExternalLinkAlt } from 'react-icons/fa';

const AdminLayout: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useApp();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showAdminDropdown, setShowAdminDropdown] = useState(false);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        {
            path: "",
            icon: <TbLayoutDashboard className="text-xl" />,
            label: 'Dashboard',
        },
        {
            path: routes.ADMIN_USER,
            icon: <TbUsers className="text-xl" />,
            label: 'Quản lý người dùng',
        },
        {
            path: routes.ADMIN_SETTING,
            icon: <TbSettings className="text-xl" />,
            label: 'Cài đặt',
        },
        {
            path: routes.DEFAULT,
            icon: <FaExternalLinkAlt />,
            label: 'Về trang chính',
        },
    ];

    const handleLogout = () => {
        // Handle logout logic here
        navigate(routes.LOGIN);
    };

    const isActivePath = (path: string) => {
        const currentPath = location.pathname.split('/').pop() || '';
        if(currentPath === "admin" && path === "")
            return true
        return currentPath === path;
    };

    return (
        <div className={`flex h-screen ${isDarkMode ? 'bg-[#232425]' : 'bg-gray-100'}`}>
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full transition-all duration-300 z-50 overflow-hidden
                ${isSidebarOpen ? 'w-64' : 'w-0'} 
                ${isDarkMode ? 'bg-[#1F1F1F]' : 'bg-white'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className={`flex items-center justify-between p-3.5 border-b
                        ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-2">
                            <img src="/kayo.webp" alt="Logo" className="w-8 h-8 rounded-full" />
                            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                Admin Panel
                            </span>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className={`p-2 rounded-lg hover:bg-opacity-10
                                ${isDarkMode ? 'text-white hover:bg-white' : 'text-black hover:bg-black'}`}>
                            <TbChevronLeft className="text-xl" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="flex-1 p-4 space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                    ${isActivePath(item.path)
                                        ? isDarkMode
                                            ? 'bg-[#454647] text-white'
                                            : 'bg-blue-100 text-blue-600'
                                        : isDarkMode
                                            ? 'text-gray-400 hover:bg-[#454647]'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}>
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Header */}
                <header className={`h-16 flex items-center justify-between px-4 shadow-sm
                    ${isDarkMode ? 'bg-[#232425] border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center gap-4">
                        {!isSidebarOpen && (
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className={`p-2 rounded-lg hover:bg-opacity-10
                                    ${isDarkMode ? 'text-white hover:bg-white' : 'text-black hover:bg-black'}`}>
                                <TbMenu2 className="text-xl" />
                            </button>
                        )}
                        <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            {menuItems.find(item => isActivePath(item.path))?.label || 'Dashboard'}
                        </h1>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                            className={`flex items-center gap-2 p-2 rounded-lg
                                ${isDarkMode ? 'bg-[#1F1F1F] hover:bg-[#454647]' : 'bg-gray-100 hover:bg-gray-200'}`}>
                            <img src="/kayo.webp" alt="Avatar" className="w-8 h-8 rounded-full" />
                            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                Admin
                            </span>
                        </button>

                        {showAdminDropdown && (
                            <div className={`absolute top-12 right-0 mt-2 p-2 w-60 rounded-2xl shadow-lg z-50
                                ${isDarkMode ? 'bg-[#2f2f2f] text-white' : 'bg-white text-black'}`}>
                                <button
                                    onClick={() => {
                                        setShowAccountModal(true);
                                        setShowAdminDropdown(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                        ${isDarkMode ? 'hover:bg-[#454647]' : 'hover:bg-gray-100'}`}>
                                    <TbUser className="text-xl" />
                                    <span>Tài khoản</span>
                                </button>

                                <div className={`px-4 py-3 flex items-center justify-between rounded-lg
                                    ${isDarkMode ? 'hover:bg-[#454647]' : 'hover:bg-gray-100'}`}
                                    onClick={toggleDarkMode}
                                    >
                                    <div className="flex items-center gap-3">
                                        <TbMoon className="text-xl" />
                                        <span>Chế độ tối</span>
                                    </div>
                                    <div className={`w-11 h-5 flex items-center rounded-full px-0.5 
                                        transition-all duration-300
                                        ${isDarkMode ? 'bg-yellow-500' : 'bg-gray-300'}`}>
                                        <div
                                            className={`bg-white w-4 h-4 rounded-full shadow-md transform 
                                                transition-transform duration-300
                                                ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                        ${isDarkMode ? 'hover:bg-[#454647]' : 'hover:bg-gray-100'}`}>
                                    <TbLogout className="text-xl" />
                                    <span>Đăng xuất</span>
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Content */}
                <main className={`p-4 h-[calc(100vh-4rem)] overflow-y-auto
                    ${isDarkMode ? 'bg-[#232425]' : 'bg-gray-100'}`}>
                    <div className={`rounded-lg p-4
                        ${isDarkMode ? 'bg-[#1F1F1F]' : 'bg-white'}`}>
                        <Outlet />
                    </div>
                </main>
            </div>

            <AccountModal 
                isOpen={showAccountModal}
                onClose={() => setShowAccountModal(false)}
            />
        </div>
    );
};

export default AdminLayout;
