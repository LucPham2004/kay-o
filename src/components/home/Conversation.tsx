import { useTheme } from "@/utils/ThemeContext";



const Conversation = () => {
    const { isDarkMode } = useTheme();


    return (
        <div className={`max-h-[90vh] min-h-[90vh] w-full flex items-center justify-start
            ${isDarkMode ? 'bg-[#232425] text-white' : 'bg-white text-black'}`}> 
            conversation
        </div>
    );
};

export default Conversation;