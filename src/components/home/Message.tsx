import { useTheme } from "@/utils/ThemeContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Highlight } from "prism-react-renderer";
import { themes } from 'prism-react-renderer';
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { MessageResponseSchema } from "@/types/Message";
import '../../styles/scrollbar.css'

interface MessageProps {
    message: MessageResponseSchema;
}

const ChatMessage: React.FC<MessageProps> = ({
    message
}) => {

    const { isDarkMode } = useTheme();
    const oneDark = themes.oneDark;
    const oneLight = themes.oneLight;

    

    return (
        <div className="flex flex-col gap-4 ">
            <div className={`p-2 rounded-[20px] font-sans text-sm ml-auto w-fit max-w-xl
                    ${isDarkMode ? `text-gray-200 bg-[#303030]` : `text-black bg-[#ececec]`}
            `}>
                <div className={`whitespace-pre-wrap px-2 pb-1`}>
                    {message?.question}
                </div>
            </div>

            <div className={`p-2 my-2 rounded-[20px] font-sans text-sm max-w-full
                    ${isDarkMode ? `text-gray-200 ` : `text-black `}`}
            >
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        a: ({ node, ...props }) => (
                            <a {...props} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer" />
                        ),
                        code: ({ node, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || "");
                        const language = match?.[1] || "code";
                        const codeString = String(children).trim();
                        const [copied, setCopied] = useState(false);

                        const handleCopy = async () => {
                            try {
                                await navigator.clipboard.writeText(codeString);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 1500);
                            } catch (err) {
                                console.error("Failed to copy:", err);
                            }
                        };

                        return match ? (
                            <div className="my-6 rounded-xl overflow-hidden">
                                {/* Header */}
                                <div className={`flex items-center justify-between px-4 py-2 text-sm font-semibold
                                        ${isDarkMode ? 'bg-[#333537] text-gray-400' : 'bg-gray-200 text-gray-700'}`}>
                                    <span className="">{language}</span>
                                    <button
                                    onClick={handleCopy}
                                    className={`text-xs px-2 py-1 rounded transition flex gap-1 items-center`}
                                    >
                                        <IoCopyOutline />
                                        <span>{copied ? "Copied!" : "Copy"}</span>
                                    </button>
                                </div>

                                {/* Code block */}
                                <Highlight code={codeString} language={language} theme={isDarkMode ? oneDark : oneLight}>
                                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                    <pre className={`${className} p-4 text-sm overflow-x-auto custom-scrollbar`} style={style}>
                                        {tokens.map((line, i) => (
                                        <div key={i} {...getLineProps({ line })}>
                                            {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({ token })} />
                                            ))}
                                        </div>
                                        ))}
                                    </pre>
                                    )}
                                </Highlight>
                            </div>
                            ) : (
                                <code className={`inline-block px-[6px] py-[2px] rounded-lg max-w-full overflow-x-auto align-middle 
                                    leading-normal custom-scrollbar
                                    ${isDarkMode ? 'bg-[#333537] text-gray-300' : 'bg-gray-100 text-gray-900'}`} 
                                    {...props}>
                                {children}
                                </code>
                            );
                        },
                        h1: ({ node, ...props }) => (
                            <h1 className="text-2xl font-bold text-red-500" {...props} />
                        ),
                        p: ({ node, ...props }) => (
                            <p className="my-6 text-base" {...props} />
                        ),
                        blockquote: ({ node, ...props }) => (
                            <blockquote className="border-l-4 border-gray-500 pl-4 italic" {...props} />
                        ),
                        strong: ({ node, ...props }) => (
                            <strong className="font-bold my-6" {...props} />
                        ),
                        em: ({ node, ...props }) => (
                            <em className="italic" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                            <ul className="list-disc list-outside pl-6 mb-4 space-y-2" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                            <ol className="list-decimal list-outside pl-6 mb-4 space-y-2" {...props} />
                        ),
                        li: ({ node, children, ...props }) => (
                            <li className="pl-1 leading-relaxed" {...props}>
                                {children}
                            </li>
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
                            <th className={`border border-gray-500 ${isDarkMode ? 'bg-[#333537] text-gray-300' : 'bg-gray-200 text-gray-700'}`} {...props} />
                        ),
                        td: ({ node, ...props }) => (
                            <td className="border border-gray-500" {...props} />
                        ),
                        tr: ({ node, ...props }) => (
                            <tr className="border border-gray-500" {...props} />
                        ),
                    }}
                >
                    {message.answer}
                </ReactMarkdown>
            </div>
        </div>
    );

}

export default ChatMessage


