import { useTheme } from "@/utils/ThemeContext";
import Sidebar from "@/components/home/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/home/Header";



const HomePage = () => {
    const { isDarkMode } = useTheme();
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const handleMenuToggle = (id: string) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    return (
        <div className={`min-h-screen w-full flex items-center justify-center
            ${isDarkMode ? 'bg-[#232425]' : 'bg-white'}`}>
            <div className={`min-h-screen w-full max-w-[2560px] flex items-center justify-start
                ${isDarkMode ? 'bg-[#232425] text-white' : 'bg-white text-black'}`}
                // close menu when click outside
                onClick={() => setOpenMenuId(null)}> 

                <Sidebar openMenuId={openMenuId} onMenuToggle={handleMenuToggle} />
                
                <div className="flex flex-col items-center justify-start h-full w-full">
                    <Header />
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;