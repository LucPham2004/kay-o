import { useApp } from "@/utils/AppContext";
import Sidebar from "@/components/home/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/home/Header";
import { useAppSelector } from "@/redux/hooks";



const HomePage = () => {
    const { isDarkMode } = useApp();
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [isSidebarOn, setIsSidebarOn] = useState(true);
    const auth = useAppSelector(state => state.auth);

    const toggleSidebar = () => {
        setIsSidebarOn((prev) => !prev);
    }

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

            {auth.isAuthenticated && (
                <div className={`min-h-[100vh] max-h-[100vh] transition-all duration-300
                    ${isSidebarOn ? 'w-[280px] max-w-[280px]' : 'w-0'} 
                `}>
                    <Sidebar 
                        openMenuId={openMenuId} 
                        onMenuToggle={handleMenuToggle} 
                        isSidebarOn={isSidebarOn}
                        toggleSidebar={toggleSidebar}
                    />
                </div>
            )}
                
                <div className="flex flex-col items-center justify-start h-full w-full me-[2px]
                    overflow-hidden transition-all duration-300">
                    <Header 
                        isSidebarOn={isSidebarOn}
                        toggleSidebar={toggleSidebar}
                    />
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;