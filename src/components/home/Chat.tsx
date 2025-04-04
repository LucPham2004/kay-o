import { useEffect, useState } from "react";
import Message from "./Message";

interface Message {
    id: number;
    text: string;
    sender: "user" | "ai";
}

export default function ChatUI() {
    const [messages, setMessages] = useState<Message[]>([]);

    
	useEffect(() => {
        setMessages([
            { id: 1, text: "Hello", sender: "user" },
            { id: 2, text: "Hi there!", sender: "ai" },
            { id: 3, text: "How can I help you?", sender: "ai" },
            { id: 4, text: "What is your name?", sender: "user" },
            { id: 5, text: "I am an AI assistant.", sender: "ai" },
            { id: 6, text: "Tell me a joke.", sender: "user" },
            { id: 7, text: "Why did the chicken cross the road? To get to the other side!", sender: "ai" },
            { id: 8, text: "That's funny!", sender: "user" },
            { id: 9, text: "Hello", sender: "user" },
            { id: 10, text: "Hi there!", sender: "ai" },
            { id: 11, text: "How can I help you?", sender: "ai" },
            { id: 12, text: "What is your name?", sender: "user" },
            { id: 13, text: "I am an AI assistant.", sender: "ai" },
            { id: 14, text: "Tell me a joke.", sender: "user" },
            { id: 15, text: "Why did the chicken cross the road? To get to the other side!", sender: "ai" },
            { id: 16, text: "That's funny!", sender: "user" },
        ]);
	}, []);

    return (
        <div className="flex flex-col h-full w-[60%] max-w-[2560px] p-4">
            <div className="flex-1 overflow-auto p-4 rounded-xl">
                {messages.map((message) => (
                    <div key={message.id}>
                        <Message message={message}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
