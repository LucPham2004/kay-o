import { useApp } from '@/utils/AppContext';
import { useState } from 'react';
import { IoIosArrowDown, IoIosList } from 'react-icons/io';

const Header = () => {
    const { isDarkMode, selectedModel, setSelectedModel, availableModels } = useApp();
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className={`relative max-h-[8vh] min-h-[8vh] min-w-full flex items-center justify-between px-4 border-b
            ${isDarkMode ? 'bg-[#232425] text-white border-[#3c3d41]' : 'bg-white text-black border-gray-300'}`}>
            
            <div className="relative">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={`rounded-lg p-2
                    ${isDarkMode ? 'text-gray-200 hover:bg-[#5A5A5A]' : 'text-gray-600 hover:bg-gray-200'}`}>
                    <div className="flex items-center justify-center gap-2">
                        <p className='font-semibold'>{selectedModel}</p>
                        <IoIosArrowDown />
                    </div>
                </button>

                {showDropdown && (
                    <div className={`absolute left-0 mt-2 w-max rounded-md shadow-lg z-50
                        ${isDarkMode ? 'bg-[#2f2f2f] text-white' : 'bg-white text-black'}`}>
                        {availableModels.map((model) => (
                            <div
                                key={model}
                                onClick={() => {
                                    setSelectedModel(model);
                                    setShowDropdown(false);
                                }}
                                className={`px-4 py-2 cursor-pointer hover:bg-[#3F3F3F] 
                                    ${selectedModel === model ? 'font-bold' : ''}`}>
                                {model}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="relative">
                <button
                    className={`rounded-lg text-xl p-2
                    ${isDarkMode ? 'text-yellow-400 hover:bg-[#5A5A5A]' : 'text-yellow-400 hover:bg-gray-200'}`}>
                    <IoIosList />
                </button>
            </div>
        </div>
    );
};

export default Header;
