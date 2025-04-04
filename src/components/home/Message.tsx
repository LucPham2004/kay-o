import { useTheme } from "@/utils/ThemeContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


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
            <div className={`p-2 my-2 rounded-[20px] font-sans
                    ${message?.sender === "user" ? "ml-auto max-w-xl" : "max-w-full"}
                    ${isDarkMode 
                        ? `text-gray-200 ${message?.sender === "user" ? "bg-[#303030] my-6" : ""}` 
                        : `text-black ${message?.sender === "user" ? "bg-[#b3b3b3] my-6" : ""}`}`}
            >
                {message?.sender === "ai" && (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        a: ({ node, ...props }) => (
                            <a {...props} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer" />
                        ),
                        code: ({ node, className, children, ...props }) => {
                            const isInline = typeof children === "string" && !children.includes("\n");

                            return (
                                <code
                                    className={`rounded ${isInline ? "" : "block bg-[#171717] text-white px-4 py-4"}`}
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        },
                        h1: ({ node, ...props }) => (
                            <h1 className="text-2xl font-bold text-red-500" {...props} />
                        ),
                        li: ({ node, ...props }) => (
                            <li className="list-disc list-inside mb-2" {...props} />
                        ),
                        p: ({ node, ...props }) => (
                            <p className="mb-2" {...props} />
                        ),
                        blockquote: ({ node, ...props }) => (
                            <blockquote className="border-l-4 border-gray-500 pl-4 italic" {...props} />
                        ),
                        strong: ({ node, ...props }) => (
                            <strong className="font-bold" {...props} />
                        ),
                        em: ({ node, ...props }) => (
                            <em className="italic" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                            <ul className="list-disc list-inside ms-8 mb-2" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                            <ol className="list-decimal list-inside ms-8 mb-2" {...props} />
                        ),
                        hr: ({ node, ...props }) => (
                            <hr className="border-t-2 border-gray-500 my-4" {...props} />
                        ),
                        img: ({ node, ...props }) => (
                            <img className="max-w-full h-auto" {...props} alt={props.alt} />
                        ),
                        table: ({ node, ...props }) => (
                            <table className="border-collapse border border-gray-500 w-full" {...props} />
                        ),
                        th: ({ node, ...props }) => (
                            <th className="border border-gray-500 bg-gray-200" {...props} />
                        ),
                        td: ({ node, ...props }) => (
                            <td className="border border-gray-500" {...props} />
                        ),
                        tr: ({ node, ...props }) => (
                            <tr className="border border-gray-500" {...props} />
                        ),
                    }}
                >
                    {message?.text}
                </ReactMarkdown>
                )}
                {message?.sender === "user" && (
                <p className={`ps-2 pb-1 ${isDarkMode ? "text-gray-200" : "text-black"}`}>
                    {message?.text}
                </p>
                )}
            </div>
        </div>
    );

}

export default ChatMessage


