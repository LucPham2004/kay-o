import { useApp } from '@/utils/AppContext';
import { useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { VscLayoutSidebarLeft, VscLayoutSidebarLeftOff } from 'react-icons/vsc';
import AccountModal from '../common/AccountModal';

interface HeaderProps {
    isSidebarOn: boolean;
    toggleSidebar: () => void;
}

const Header:React.FC<HeaderProps> = ({ isSidebarOn, toggleSidebar }) => {
    const { isDarkMode, toggleDarkMode, selectedModel, setSelectedModel, availableModels } = useApp();
    const [showModelDropdown, setShowModelDropdown] = useState(false);
    const [showMenuDropdown, setShowMenuDropdown] = useState(false);
    const [showAccountModal, setShowAccountModal] = useState(false);
    
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

    return (
        <div className={`relative max-h-[8vh] min-h-[8vh] min-w-full flex items-center justify-between px-4 border-b
            ${isDarkMode ? 'bg-[#232425] text-white border-[#3c3d41]' : 'bg-white text-black border-gray-300'}`}>
            
            <div className="relative flex items-center justify-center gap-4">
                {!isSidebarOn && (
                <button className={` rounded-lg text-xl p-2
                    ${isDarkMode ? 'text-gray-200 hover:bg-[#5A5A5A]'
                        : 'text-gray-800 hover:bg-gray-200'}`}
                        onClick={toggleSidebar}>
                    {isSidebarOn ? <VscLayoutSidebarLeft /> : <VscLayoutSidebarLeftOff />}
                </button>
                )}

                <button
                    onClick={toggleModelDropdown}
                    className={`rounded-lg p-2
                    ${isDarkMode ? 'text-gray-200 hover:bg-[#5A5A5A]' : 'text-gray-600 hover:bg-gray-200'}`}>
                    <div className="flex items-center justify-center gap-2">
                        <p className='font-semibold'>{selectedModel}</p>
                        <IoIosArrowDown />
                    </div>
                </button>

                {showModelDropdown && (
                    <div className={`absolute top-8 mt-2 p-2 w-max rounded-2xl shadow-lg z-50 overflow-hidden
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

            <div className="relative">
                <button
                    className={`rounded-full text-xl
                    ${isDarkMode ? 'text-yellow-400 hover:bg-[#454647]' : 'text-yellow-400 hover:bg-gray-200'}`}
                    onClick={toggleMenuDropdown}>
                    <div className='p-1'>
                        <img src='/kayo.webp' alt='avatar' className='w-6 h-6 rounded-full '/>
                    </div>
                </button>

                {showMenuDropdown && (
                    <div className={`absolute top-8 right-0 mt-2 p-2 w-max min-w-60 rounded-2xl shadow-lg z-50 
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

                        <hr className={`border my-2 ${isDarkMode ? 'border-[#545454]' : 'border-gray-100'}`}></hr>

                        <div className={`px-4 py-3 cursor-pointer w-full flex items-center gap-2 justify-between rounded-md
                            ${isDarkMode ? 'text-white hover:bg-[#545454]' 
                                : 'text-black hover:bg-gray-200'}`}
                            onClick={toggleDarkMode}>

                            <button className={`flex items-center gap-2`}>
                                <FaMoon />
                                <p>Chế độ tối</p>
                            </button>
                            
                            <div className={`w-11 h-5 flex items-center bg-gray-400 rounded-full px-0.5 
                                transition-all duration-300
                                ${isDarkMode ? 'bg-yellow-500' : 'bg-gray-300'}`}>
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform 
                                        transition-transform duration-300
                                        ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}
                                />
                            </div>
                        </div>
                        
                        <hr className={`border my-2 ${isDarkMode ? 'border-[#545454]' : 'border-gray-100'}`}></hr>

                        <button className={`px-4 py-3 cursor-pointer w-full flex items-center gap-2 rounded-md
                            ${isDarkMode ? 'text-white hover:bg-[#545454]' 
                                : 'text-black hover:bg-gray-200'}`}>
                            <FiLogOut className='text-xl'/>
                            <p>Đăng xuất</p>
                        </button>
                    </div>
                )}
            </div>

            <AccountModal 
                isOpen={showAccountModal}
                onClose={() => setShowAccountModal(false)}
            />
        </div>
    );
};

export default Header;
