import { useTheme } from "@/utils/ThemeContext";
import { IoIosList } from "react-icons/io";



const Header = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();


    return (
        <div className={`max-h-[10vh] min-h-[10vh] min-w-full flex items-center justify-between px-4 border-b border-[#3c3d41]
            ${isDarkMode ? 'bg-[#232425] text-white' : 'bg-white text-black'}`}>
            <p></p>
            <button className={` rounded-lg text-xl p-2
                ${isDarkMode ? 'text-yellow-400 hover:bg-[#5A5A5A]'
                    : 'text-yellow-400 hover:bg-gray-200'}`}
                onClick={toggleDarkMode}>
                {isDarkMode ? <IoIosList /> : <IoIosList />}
            </button>
        </div>
    );
};

export default Header;