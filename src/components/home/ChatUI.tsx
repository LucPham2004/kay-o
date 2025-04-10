import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { MessageResponseSchema } from "@/types/Message";
import { useParams } from "react-router-dom";

interface ChatUIProps {
    messages: MessageResponseSchema[];
    isStreaming: boolean;
    streamedId: string | null;
}

const ChatUI: React.FC<ChatUIProps> = ({ messages, isStreaming }) => {
    const { conv_id } = useParams();
    const chatEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState(true);

    // Kiểm tra xem chat có đang ở cuối không
    const checkIsAtBottom = () => {
        if (!chatContainerRef.current) return false;
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        return scrollTop + clientHeight >= scrollHeight - 10;
    };

    useEffect(() => {
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
    }, [conv_id]);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (!chatContainer) return;

        const handleScroll = () => {
            setIsAtBottom(checkIsAtBottom());
        };

        chatContainer.addEventListener("scroll", handleScroll);
        return () => chatContainer.removeEventListener("scroll", handleScroll);
    }, [conv_id]);

    useEffect(() => {
        if (isAtBottom) {
            setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 500);
        }
    }, [messages]);

    return (
        <div ref={chatContainerRef} className="flex flex-col h-full w-[67%] max-w-[2560px] p-4">
            <div className="flex-1 overflow-auto p-4 rounded-xl">
                {messages.map((message) => (
                    <div key={message._id}>
                        <Message message={message} />
                    </div>
                ))}
                {isStreaming && (
                <div className="px-4 py-2 text-gray-500 italic animate-pulse">
                    KayO đang trả lời<span className="animate-bounce">...</span>
                </div>
                )}
                <div ref={chatEndRef}/>
            </div>
        </div>
    );
}

export default ChatUI;