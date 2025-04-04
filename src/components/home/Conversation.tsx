import { useTheme } from "@/utils/ThemeContext";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import ChatUI from "./Chat";



const Conversation = () => {
    const { isDarkMode } = useTheme();
    const [message, setMessage] = useState("");


    return (
        <div className={`max-h-[90vh] min-h-[90vh] w-full flex flex-col items-center justify-between
            ${isDarkMode ? 'bg-[#232425] text-white' : 'bg-white text-black'}`}>
            
            <div className={`max-h-[80vh] min-h-[60vh] w-full flex justify-center overflow-y-auto`}>
                <ChatUI />
            </div>
            
            {/* Chat Input */}
            <div className={`w-full max-w-3xl rounded-l-xl rounded-r-[20px] flex items-end justify-center gap-2 mb-4
                    ${isDarkMode ? 'bg-[#303030]' : 'shadow-xl border border-gray-200'}`}>
                <textarea
                    className={`flex-grow w-full rounded-[20px] px-4 pt-2 pb-2.5 text-[14px] resize-none 
                        overflow-y-auto focus:outline-none bg-transparent
                        ${isDarkMode ? 'text-gray-200' : 'text-black'}`}
                    placeholder="Hỏi bất cứ thứ gì"
                    value={message}
                    rows={1}
                    style={{ lineHeight: '1.5', maxHeight: 'calc(1.5em * 6.5 + 0.5rem)', minHeight: '1.5em' }}
                    onChange={(e) => {
                        setMessage(e.target.value);

                        e.target.style.height = 'auto';
                        e.target.style.height = `${Math.min(e.target.scrollHeight, parseFloat(getComputedStyle(e.target).lineHeight) * 6.5)}px`;
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            setMessage('');
                        }
                    }}
                />
                <button className={`p-3 rounded-full ${isDarkMode ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
};

export default Conversation;