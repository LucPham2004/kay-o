import { useApp } from '@/utils/AppContext';
import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { VscLayoutSidebarLeft, VscLayoutSidebarLeftOff } from 'react-icons/vsc';
import AccountModal from '../common/AccountModal';
import { useNavigate } from 'react-router-dom';
import { TbLayoutDashboard } from 'react-icons/tb';
import { routes } from '@/utils/constant';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { doLogout } from '@/redux/slices/authSlice';

interface HeaderProps {
    isSidebarOn: boolean;
    toggleSidebar: () => void;
}

const Header:React.FC<HeaderProps> = ({ isSidebarOn, toggleSidebar }) => {
    const { isDarkMode, toggleDarkMode, selectedModel, setSelectedModel, availableModels } = useApp();
    const [showModelDropdown, setShowModelDropdown] = useState(false);
    const [showMenuDropdown, setShowMenuDropdown] = useState(false);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const navigate = useNavigate();

    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    
    const toggleMenuDropdown = () => {
        setShowMenuDropdown((prev) => !prev);
        setShowModelDropdown(false);
    }

    const toggleModelDropdown = () => {
        setShowModelDropdown((prev) => !prev);
        setShowMenuDropdown(false);
    }

    const handleAccountClick = () => {
        setShowAccountModal(true);
        setShowMenuDropdown(false);
    }

    const handleLogout = () => {
        dispatch(doLogout());
        window.location.reload();
    }

    return (
        <div className={`relative h-16 min-w-full flex items-center justify-between px-4 border-b
            ${isDarkMode ? 'bg-[#232425] text-white border-[#3c3d41]' : 'bg-white text-black border-gray-300'}`}>
            
            <div className="relative flex items-center justify-center gap-4">
                {!isSidebarOn && (
                <button className={`rounded-lg text-xl p-2.5
                    ${isDarkMode ? 'text-gray-200 hover:bg-[#5A5A5A]'
                        : 'text-gray-800 hover:bg-gray-200'}`}
                        onClick={toggleSidebar}>
                    {isSidebarOn ? <VscLayoutSidebarLeft /> : <VscLayoutSidebarLeftOff />}
                </button>
                )}

                <button
                    onClick={toggleModelDropdown}
                    className={`rounded-lg p-2.5
                    ${isDarkMode ? 'text-gray-200 hover:bg-[#5A5A5A]' : 'text-gray-600 hover:bg-gray-200'}`}>
                    <div className="flex items-center justify-center gap-2">
                        <p className='font-semibold'>{selectedModel}</p>
                        <IoIosArrowDown />
                    </div>
                </button>

                {showModelDropdown && (
                    <div className={`absolute top-12 mt-2 p-2 w-max rounded-2xl shadow-lg z-50 overflow-hidden
                        ${isDarkMode ? 'bg-[#2f2f2f] text-white' : 'bg-white text-black'}
                        ${!isSidebarOn ? 'left-12' : 'left-0'}
                    `}>
                        {availableModels.map((model) => (
                            <div
                                key={model}
                                onClick={() => {
                                    setSelectedModel(model);
                                    setShowModelDropdown(false);
                                }}
                                className={`px-4 py-3 cursor-pointer rounded-md 
                                    ${selectedModel === model ? `font-bold ${isDarkMode ? 'bg-[#454647]': ''}` : ''}
                                    ${isDarkMode ? 'text-white hover:bg-[#545454]' 
                                        : 'text-black hover:bg-gray-200'}
                                `}>
                                {model}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="relative flex items-center gap-2">
                <button
                    onClick={toggleDarkMode}
                    className={`p-2.5 rounded-lg
                    ${isDarkMode ? 'text-yellow-400 hover:bg-[#454647]' : 'text-yellow-400 hover:bg-gray-200'}`}>
                    <div className={`w-14 h-6 flex items-center bg-gray-400 rounded-full px-0.5 
                        transition-all duration-300
                        ${isDarkMode ? 'bg-yellow-500' : 'bg-gray-300'}`}>
                        <div
                            className={`w-5 h-5 rounded-full shadow-md transform 
                                bg-white
                                transition-transform duration-300 flex items-center justify-center
                                ${isDarkMode ? 'translate-x-8' : 'translate-x-0'}`}>
                            {isDarkMode ? <FaMoon className="text-sm" /> : <FaSun className="text-sm" />}
                        </div>
                    </div>
                </button>

                {auth.isAuthenticated ? (
                    <>
                        <button
                            className={`rounded-full text-xl p-2.5
                            ${isDarkMode ? 'text-yellow-400 hover:bg-[#454647]' : 'text-yellow-400 hover:bg-gray-200'}`}
                            onClick={toggleMenuDropdown}>
                            <div className='p-1'>
                                <img src='/kayo.webp' alt='avatar' className='w-7 h-7 rounded-full '/>
                            </div>
                        </button>

                        {showMenuDropdown && (
                            <div className={`absolute top-12 right-0 mt-2 p-2 w-max min-w-60 rounded-2xl shadow-lg z-50 
                                overflow-hidden text-sm font-semibold
                                ${isDarkMode ? 'bg-[#2f2f2f] text-white' : 'bg-white text-black'}`}>
                                    
                                <button 
                                    onClick={handleAccountClick}
                                    className={`px-4 py-3 cursor-pointer w-full flex items-center gap-2 rounded-md
                                        ${isDarkMode ? 'text-white hover:bg-[#545454]' 
                                            : 'text-black hover:bg-gray-200'}`}>
                                    <img src='/kayo.webp' alt='avatar' className='w-6 h-6 rounded-full '/>
                                    <p>Tài khoản</p>
                                </button>
                            {auth.user?.role === "ADMIN" && 
                                <button 
                                    onClick={() => navigate(routes.ADMIN)}
                                    className={`px-4 py-3 cursor-pointer w-full flex items-center gap-2 rounded-md
                                        ${isDarkMode ? 'text-white hover:bg-[#545454]' 
                                            : 'text-black hover:bg-gray-200'}`}>
                                    <TbLayoutDashboard className='text-xl'/>
                                    <p>Dashboard</p>
                                </button>
                            }
                                
                                <hr className={`border my-2 ${isDarkMode ? 'border-[#545454]' : 'border-gray-100'}`}></hr>

                                <button onClick={handleLogout} className={`px-4 py-3 cursor-pointer w-full flex items-center gap-2 rounded-md
                                    ${isDarkMode ? 'text-white hover:bg-[#545454]' 
                                        : 'text-black hover:bg-gray-200'}`}>
                                    <FiLogOut className='text-xl'/>
                                    <p>Đăng xuất</p>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(routes.LOGIN)}
                            className={`px-4 py-2 rounded-lg font-medium
                                ${isDarkMode 
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
                            Đăng nhập
                        </button>
                        <button
                            onClick={() => navigate(routes.REGISTER)}
                            className={`px-4 py-2 rounded-lg font-medium
                                ${isDarkMode 
                                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                    : 'bg-gray-200 hover:bg-gray-300 text-black'}`}>
                            Đăng ký
                        </button>
                    </div>
                )}

                <AccountModal 
                    isOpen={showAccountModal}
                    onClose={() => setShowAccountModal(false)}
                />
            </div>
        </div>
    );
};

export default Header;
