import { useTheme } from "@/utils/ThemeContext";
import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import ChatUI from "./ChatUI";
import { useParams } from "react-router-dom";
import { callGetMessages, callStreamChatWithGemini } from "@/services/MessageService";
import { MessageResponseSchema } from "@/types/Message";



const Conversation = () => {
    const { conv_id } = useParams();
    const { isDarkMode } = useTheme();

    const [messages, setMessages] = useState<MessageResponseSchema[]>([]);
    const [message, setMessage] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamedId, setStreamedId] = useState<string | null>(null);

    const handleSendMessage = async () => {
        if (!message.trim() || !conv_id) return;
        
        const tempId = `${Date.now()}`;
        const userMessage = {
            _id: tempId, // tạm thời
            conversation_id: conv_id,
            question: message,
            answer: "",
            created_at: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setMessage('');
        setIsStreaming(true);
        setStreamedId(userMessage._id);

        const streamedAnswerRef = { value: "" };

        try {
            await callStreamChatWithGemini({ conv_id, question: message }, async (char: string) => {
                streamedAnswerRef.value += char;
        
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg._id === tempId ? { ...msg, answer: streamedAnswerRef.value } : msg
                    )
                );
            });
        } catch (err) {
            console.error("Error during streaming:", err);
        } finally {
            setIsStreaming(false);
            setStreamedId(null);
        }
    };
    
    const sendInitialMessage = async (initialMessage: string) => {
        if (!initialMessage.trim() || !conv_id) {
            setIsStreaming(false);
            return;
        }
    
        const tempId = `${Date.now()}`;
        const userMessage = {
            _id: tempId,
            conversation_id: conv_id,
            question: initialMessage,
            answer: "",
            created_at: new Date().toISOString(),
        };
    
        setMessages((prev) => [...prev, userMessage]);
        setMessage('');
        setIsStreaming(true);
        setStreamedId(tempId);
    
        const streamedAnswerRef = { value: "" };
    
        try {
            await callStreamChatWithGemini({ conv_id, question: initialMessage }, async (char: string) => {
                streamedAnswerRef.value += char;
    
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg._id === tempId ? { ...msg, answer: streamedAnswerRef.value } : msg
                    )
                );
            });
        } catch (err) {
            console.error("Error during streaming:", err);
        } finally {
            setIsStreaming(false);
            setStreamedId(null);
        }
    };

    useEffect(() => {
        setMessages([]);
        setIsStreaming(false);
    }, [conv_id]);

    useEffect(() => {
        setTimeout(() => {
            const initialMessage = sessionStorage.getItem('initialMessage');
            if (initialMessage && conv_id) {
                sessionStorage.removeItem('initialMessage');
                sendInitialMessage(initialMessage);
            }
        }, 100);
    }, []);

    useEffect(() => {
        let isMounted = true;
        const initialMessage = sessionStorage.getItem('initialMessage');
        const fetchConversationMessages = async () => {
            try {
                if(conv_id && !initialMessage) {
                    const response = await callGetMessages(conv_id);
                    console.log(response);
                    if (!isMounted) return;
    
                    const newMessages = response.reverse();
    
                    setMessages((prev) => {
                        const uniqueMessages = [...prev, ...newMessages].filter(
                            (conv, index, self) => index === self.findIndex(c => c._id === conv._id)
                        );
                        return uniqueMessages;
                    });
                }
            } catch (err) {
                console.error("Lỗi khi lấy danh sách hội thoại:", err);
            }
        };

        fetchConversationMessages();
        return () => {
            isMounted = false;
        };
    }, [conv_id]);

    return (
        <div className={`max-h-[92vh] min-h-[92vh] w-full flex flex-col items-center justify-between
            ${isDarkMode ? 'bg-[#232425] text-white' : 'bg-white text-black'}`}>
            
            <div className={`max-h-[82vh] min-h-[60vh] w-full flex justify-center overflow-y-auto`}>
                <ChatUI messages={messages} isStreaming={isStreaming} streamedId={streamedId} />
            </div>
            
            {/* Chat Input */}
            <div className={`w-full max-w-3xl rounded-l-xl rounded-r-[20px] flex items-end justify-center gap-2 mb-4
                    ${isDarkMode ? 'bg-[#303030]' : 'shadow-xl border border-gray-200'}`}>
                <textarea
                    className={`flex-grow w-full rounded-[20px] px-4 pt-3 pb-3.5 text-[15px] resize-none 
                        overflow-y-auto focus:outline-none bg-transparent
                        ${isDarkMode ? 'text-gray-200' : 'text-black'}`}
                    placeholder="Hỏi bất cứ thứ gì"
                    value={message}
                    rows={1}
                    style={{ lineHeight: '1.5', maxHeight: 'calc(1.5em * 8.5 + 0.5rem)', minHeight: '2em' }}
                    onChange={(e) => {
                        setMessage(e.target.value);

                        e.target.style.height = 'auto';
                        e.target.style.height = `${Math.min(e.target.scrollHeight, parseFloat(getComputedStyle(e.target).lineHeight) * 8.5)}px`;
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                            e.currentTarget.style.height = 'auto';
                        }
                    }}
                />
                <button 
                    onClick={handleSendMessage}
                    disabled={isStreaming}
                    className={`p-4 rounded-full ${isDarkMode ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
};

export default Conversation;