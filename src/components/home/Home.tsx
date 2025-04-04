import { useTheme } from "@/utils/ThemeContext";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";



const Home = () => {
    const { isDarkMode } = useTheme();
    const [message, setMessage] = useState("");


    return (
        <div className={`max-h-[90vh] min-h-[90vh] w-full flex flex-col items-center justify-center gap-4
            ${isDarkMode ? 'bg-[#232425] text-white' : 'bg-white text-black'}`}>
            <p className={`text-3xl mb-2 font-medium
                ${isDarkMode ? 'text-white' : 'text-black'}`}>Tôi có thể giúp gì cho bạn?</p>
            <div className="flex flex-col justify-center items-center mb-8">
                <div className="flex gap-6">
                    {/* Card 1 */}
                    <div className={`p-6 w-64 rounded-xl shadow-md
                        ${isDarkMode ? 'bg-[#303030] text-gray-200' : 'bg-gray-200 text-black'}`}>
                        <div className="flex flex-col items-center text-center">
                            <div className="flex gap-2 mb-2">
                                <span className="bg-orange-400 text-black px-2 py-1 rounded-full text-xs">Mistral Small 3</span>
                                <span className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs">Llama 3.3</span>
                            </div>
                            <p className="text-sm">
                                Blah blah blah blah blah Blah blah blah blsdfdsah blah Blah blah blah blah blah
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className={`p-6 w-64 rounded-xl shadow-md
                        ${isDarkMode ? 'bg-[#303030] text-gray-200' : 'bg-gray-200 text-black'}`}>
                        <div className="flex flex-col items-center text-center">
                            <IoShieldCheckmarkSharp className="text-green-400 mb-2" size={32} />
                            <p className="text-sm">
                                Cuộc trò chuyện của bạn là riêng tư và sẽ không được lưu hoặc dùng để đào tạo các mô hình AI
                            </p>
                        </div>
                    </div>
                </div>
                <p className="text-center text-gray-500 mt-4 cursor-pointer text-sm">Hide Tips</p>
            </div>

            <div className="flex flex-col justify-center items-center w-full">
                {/* Buttons */}
                <div className="flex gap-4 mb-4">
                    <button className={`flex w-[328px] items-center gap-2 px-4 py-2 rounded-lg shadow
                        ${isDarkMode ? 'bg-[#303030] text-gray-200' : 'bg-gray-200 text-gray-600'}`}>
                        <span className="text-xl">➤</span> 
                        <span className="text-sm font-semibold">Lên kế hoạch cho một chuyến du lịch!</span>
                    </button>
                    <button className={`flex w-[328px] items-center gap-2 px-4 py-2 rounded-lg shadow
                        ${isDarkMode ? 'bg-[#303030] text-gray-200' : 'bg-gray-200 text-gray-600'}`}>
                        <span className="text-xl">➤</span> 
                        <span className="text-sm font-semibold">Lộ trình học tập, nghiên cứu</span>
                    </button>
                </div>

                {/* Chat Input */}
                <div className={`w-full max-w-2xl rounded-l-xl rounded-r-[20px] flex items-end justify-center gap-2
                    ${isDarkMode ? 'bg-[#303030]' : 'shadow-xl border border-gray-200'}`}>
                    <textarea
                        className={`flex-grow w-full rounded-[20px] px-4 py-2 text-[14px] resize-none 
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

            {/* Footer */}
            <p className="text-sm text-gray-400 mt-2">
                AI chats may display inaccurate or offensive information.
            </p>
        </div>
    );
};

export default Home;