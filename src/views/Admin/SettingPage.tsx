import { useApp } from "@/utils/AppContext";
import { FaMoon, FaSun } from "react-icons/fa";

const SettingPage = () => {
  const { isDarkMode, toggleDarkMode } = useApp();
  
  return (
    <div>
      <div className={`px-4 py-3 cursor-pointer w-full flex items-center gap-2 justify-between rounded-md
            ${isDarkMode ? 'text-white hover:bg-[#545454]'
          : 'text-black hover:bg-gray-200'}`}
        onClick={toggleDarkMode}>

        <button className={`flex items-center gap-2`}>
          <FaMoon />
          <p>Chế độ tối</p>
        </button>

        <div className={`w-10 h-4 flex items-center bg-gray-400 rounded-full px-[1px] 
            transition-all duration-300
            ${isDarkMode ? 'bg-yellow-500 text-yellow-400' : 'bg-gray-300 text-yellow-400'}`}>
          <div
            className={`w-4 h-4 rounded-full shadow-md transform bg-white
              transition-transform duration-300 flex items-center justify-center
              ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}>
            {isDarkMode ? <FaMoon className="text-sm" /> : <FaSun className="text-sm" />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingPage