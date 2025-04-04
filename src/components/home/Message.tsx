import { useTheme } from "@/utils/ThemeContext";


interface Message {
    id: number;
    text: string;
    sender: "user" | "ai";
}

interface MessageProps {
    message: Message;
}

const ChatMessage: React.FC<MessageProps> = ({
    message,
}) => {

    const { isDarkMode } = useTheme();

    return (
        <div>
            <div
                className={`p-2 my-2 rounded-lg  
                    ${message?.sender === "user" ? "ml-auto max-w-xl" : "max-w-full"}
                    ${isDarkMode 
                        ? `text-gray-200 ${message?.sender === "user" ? "bg-[#303030]" : ""}` 
                        : `text-black ${message?.sender === "user" ? "bg-[#b3b3b3]" : ""}`}`}
            >
                {message?.text}
            </div>
        </div>
    );

}

export default ChatMessage


