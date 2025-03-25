import { IoMdSunny } from "react-icons/io";
import { useTheme } from "../utils/ThemeContext";
import { FaMoon } from "react-icons/fa";



const HomePage = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <div className={`min-h-screen flex flex-col gap-4 items-center justify-center bg-white
            ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h1>Hi! I'm KayO</h1>
            <div className="flex flex-col items-center gap-2">
                <button className={` rounded-lg 
                    ${isDarkMode ? 'text-yellow-400 text-xl p-3 hover:bg-[#5A5A5A]' 
                        : 'text-yellow-400 text-2xl p-2.5 bg-gray-100 hover:bg-gray-200'}`}
                        onClick={toggleDarkMode}>
                    {isDarkMode ? <IoMdSunny /> : <FaMoon />}
                </button>
            </div>
        </div>
    );
};

export default HomePage;