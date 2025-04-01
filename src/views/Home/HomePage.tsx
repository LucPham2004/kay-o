import { IoMdSunny } from "react-icons/io";
import { useTheme } from "@/utils/ThemeContext";
import { FaMoon } from "react-icons/fa";
import Sidebar from "@/components/home/Sidebar";
import { useRef, useState } from "react";



const HomePage = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);


    const handleMenuToggle = (id: string) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    return (
        <div className={`min-h-screen flex gap-4 items-center justify-start
            ${isDarkMode ? 'bg-[#2b2c2e] text-white' : 'bg-white text-black'}`}
            onClick={() => setOpenMenuId(null)}>

            <Sidebar openMenuId={openMenuId} onMenuToggle={handleMenuToggle} />
            <h1>Hi! I'm KayO</h1>
            <div className="flex flex-col items-center gap-2">
                <button className={` rounded-lg 
                    ${isDarkMode ? 'text-yellow-400 text-xl p-3 hover:bg-[#5A5A5A]'
                        : 'text-yellow-400 text-2xl p-2.5 bg-gray-100 hover:bg-gray-200'}`}
                    onClick={toggleDarkMode}>
                    {isDarkMode ? <IoMdSunny /> : <FaMoon />}
                </button>
            </div>
            <div ref={menuRef} />
        </div>
    );
};

export default HomePage;