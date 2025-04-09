import { useTheme } from "@/utils/ThemeContext";
import { IoIosList } from "react-icons/io";



const Header = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();


    return (
        <div className={`max-h-[8vh] min-h-[8vh] min-w-full flex items-center justify-between px-4 border-b
            ${isDarkMode ? 'bg-[#232425] text-white border-[#3c3d41]' : 'bg-white text-black border-gray-300'}`}>
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