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
        <div className={`min-h-screen flex items-center justify-start
            ${isDarkMode ? 'bg-[#232425] text-white' : 'bg-white text-black'}`}
            // close menu when click outside
            onClick={() => setOpenMenuId(null)}> 

            <Sidebar openMenuId={openMenuId} onMenuToggle={handleMenuToggle} />
            
            <div className="flex flex-col items-center justify-start h-full w-[1248px]">
                <Header />
                <Outlet/>
            </div>
        </div>
    );
};

export default HomePage;