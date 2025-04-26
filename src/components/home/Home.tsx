import { useAppSelector } from "@/redux/hooks";
import { callCreateConversation } from "@/services/ConversationService";
import { useApp } from "@/utils/AppContext";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const user_id = '67efef29f0c4127199dd6fb5';

const Home = () => {
    const auth = useAppSelector(state => state.auth);
    const { isDarkMode } = useApp();
    const [message, setMessage] = useState("");
    const [hideTips, setHideTips] = useState(false);
    const navigate = useNavigate();

    const handleSend = async (customMessage?: string) => {
        const finalMessage = customMessage ?? message;
    
        if (!finalMessage.trim()) return;
    
        if (!auth.isAuthenticated) {
            alert("Bạn hãy đăng nhập để trò chuyện với KayO nhé!");
            return;
        }
    
        try {
            const createRes = await callCreateConversation({
                user_id: user_id,
                name: finalMessage.slice(0, 30),
            });
            console.log("create " + JSON.stringify(createRes));
    
            const conversationId = createRes._id;
    
            sessionStorage.setItem('initialMessage', finalMessage);
            sessionStorage.setItem('newConv', JSON.stringify(createRes));
    
            navigate(`/c/${conversationId}`);
        } catch (error) {
            console.error("Lỗi khi gửi tin nhắn:", error);
        }
    };

    return (
        <div className={`relative max-h-[92vh] min-h-[92vh] w-full flex flex-col items-center justify-start gap-4
            ${isDarkMode ? 'bg-[#232425] text-white' : 'bg-white text-black'}`}>

            <div className="max-h-[40vh] min-h-[40vh] w-full flex flex-col items-center justify-end gap-4">
                <p className={`text-3xl mb-2 font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Tôi có thể giúp gì cho bạn?
                </p>
                <div className="flex flex-col justify-center items-center w-full">
                    {/* Buttons */}
                    <div className="flex gap-4 mb-4">
                        <button className={`flex w-[328px] items-center gap-2 px-4 py-2 rounded-lg shadow
                            ${isDarkMode ? 'bg-[#303030] text-gray-200' : 'bg-gray-200 text-gray-600'}`}
                            onClick={async () => {
                                await handleSend("Hãy giúp tôi lên kế hoạch cho một chuyến du lịch");
                            }}>
                            <span className="text-xl">➤</span>
                            <span className="text-sm font-semibold">Lên kế hoạch cho một chuyến du lịch!</span>
                        </button>
                        <button className={`flex w-[328px] items-center gap-2 px-4 py-2 rounded-lg shadow
                            ${isDarkMode ? 'bg-[#303030] text-gray-200' : 'bg-gray-200 text-gray-600'}`}
                            onClick={async () => {
                                await handleSend("Hãy giúp tôi lập nên lộ trình học tập, nghiên cứu");
                            }}>
                            <span className="text-xl">➤</span>
                            <span className="text-sm font-semibold">Lộ trình học tập, nghiên cứu</span>
                        </button>
                    </div>

                    {/* Chat Input */}
                    <div className={`w-full max-w-2xl rounded-[20px] flex items-end justify-center gap-2
                    ${isDarkMode ? 'bg-[#303030]' : 'shadow-xl border border-gray-200'}`}>
                        <textarea
                            className={`flex-grow w-full rounded-[20px] px-4 pt-3 pb-3.5 text-[15px] resize-none 
                                overflow-y-auto focus:outline-none bg-transparent
                                ${isDarkMode ? 'text-gray-200' : 'text-black'}`}
                            placeholder="Hỏi bất cứ thứ gì"
                            value={message}
                            rows={1}
                            style={{ lineHeight: '1.5', maxHeight: 'calc(1.5em * 6.5 + 0.5rem)', minHeight: '2em' }}
                            onChange={(e) => {
                                setMessage(e.target.value);

                                e.target.style.height = 'auto';
                                e.target.style.height = `${Math.min(e.target.scrollHeight, parseFloat(getComputedStyle(e.target).lineHeight) * 6.5)}px`;
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />
                        <button onClick={() => handleSend}
                            className={`p-4 rounded-full ${isDarkMode ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            </div>

            {!hideTips && (
            <div className="max-h-[40vh] min-h-[40vh] w-full flex flex-col items-center justify-center gap-4">
                <div className="absolute flex flex-col justify-center items-center">
                    <div className="flex gap-6">
                        {/* Card 1 */}
                        <div className={`p-6 w-80 rounded-xl shadow-md
                        ${isDarkMode ? 'bg-[#303030] text-gray-200' : 'bg-gray-200 text-black'}`}>
                            <div className="flex flex-col items-center text-center">
                                <div className="flex gap-2 mb-2">
                                    <span className="bg-orange-400 font-semibold text-black px-2 py-1 rounded-full text-xs">Gemini 2.0 Flash</span>
                                    <span className="bg-pink-500 font-semibold text-white px-2 py-1 rounded-full text-xs">Llama 4 Marverick</span>
                                    <span className="bg-blue-500 font-semibold text-black px-3 py-1 rounded-full text-xs">Deepseek R1</span>
                                </div>
                                <p className="text-sm">
                                    Thoải mái lựa chọn các phiên bản KayO để trò chuyện với Gemini 2.0 Flash, Deepseek R1 hay Llama 4 Marverick.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className={`p-6 w-80 rounded-xl shadow-md
                        ${isDarkMode ? 'bg-[#303030] text-gray-200' : 'bg-gray-200 text-black'}`}>
                            <div className="flex flex-col items-center text-center">
                                <IoShieldCheckmarkSharp className="text-green-400 mb-2" size={32} />
                                <p className="text-sm">
                                    Cuộc trò chuyện của bạn là riêng tư và sẽ không được lưu hoặc dùng để đào tạo các mô hình AI
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-gray-500 mt-4 cursor-pointer text-sm"
                        onClick={() => setHideTips(true)}>
                        Hide Tips
                    </p>
                </div>
            </div>
            )}

            {/* Footer */}
            <p className="absolute bottom-4 text-sm text-gray-400">
                AI chats may display inaccurate or offensive information.
            </p>
        </div>
    );
};

export default Home;