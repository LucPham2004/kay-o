import { CreateMessageSchema, ChatQuestion, ChatResponse, MessageResponseSchema, UpdateMessageSchema } from "@/types/Message";
import instance from "./Axios-customize";

const baseURL = 'http://localhost:8000';

// Stream Chat with AI
export const callStreamChatWithGemini = async (
    data: ChatQuestion,
    onMessage: (chunk: string) => void
) => {
    const response = await fetch(`${baseURL}/api/ai/gemini/stream`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok || !response.body) {
        throw new Error("Failed to start stream");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");


    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        onMessage(chunk);
            
    }
};

export const callStreamChatWithDeepseek = async (
    data: ChatQuestion,
    onMessage: (chunk: string) => void
) => {
    const response = await fetch(`${baseURL}/api/ai/deepseek/stream`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok || !response.body) {
        throw new Error("Failed to start stream");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");


    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        onMessage(chunk);

    }
};


export const callStreamChatWithLlama = async (
    data: ChatQuestion,
    onMessage: (chunk: string) => void
) => {
    const response = await fetch(`${baseURL}/api/ai/llama/stream`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok || !response.body) {
        throw new Error("Failed to start stream");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");


    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        onMessage(chunk);

    }
};

// Chat with AI

export const ChatWithGemini = async (data: ChatQuestion) => {
    return (await instance.post<ChatResponse>("/api/ai/gemini/chat", data)).data;
};

// export const ChatWithLlama = async (data: ChatQuestion) => {
//     return (await instance.post<ChatResponse>("/api/ai/llama/chat", data)).data;
// };

// export const ChatWithDeepseek = async (data: ChatQuestion) => {
//     return (await instance.post<ChatResponse>("/api/ai/deepseek/chat", data)).data;
// };

// Tạo tin nhắn
export const callCreateMessage = async (data: CreateMessageSchema) => {
    return (await instance.post<MessageResponseSchema>("/api/messages/create", data)).data;
};

// Lấy tin nhắn theo ID
export const callGetMessageById = async (messageId: string) => {
    return (await instance.get<MessageResponseSchema>(`/api/messages/${messageId}`)).data;
};

// Lấy tất cả tin nhắn trong một cuộc trò chuyện
export const callGetMessages = async (convId: string) => {
    return (await instance.get<MessageResponseSchema[]>(`/api/messages/all/${convId}`)).data;
};

// Lấy lịch sử tin nhắn trong một cuộc trò chuyện
export const callGetHistory = async (convId: string) => {
    return (await instance.get<MessageResponseSchema[]>(`/api/messages/history/${convId}`)).data;
};

// Cập nhật tin nhắn
export const callUpdateMessage = async (messageId: string, data: UpdateMessageSchema) => {
    return (await instance.put<MessageResponseSchema>(`/api/messages/${messageId}`, data)).data;
};

// Xoá tin nhắn
export const callDeleteMessage = async (messageId: string) => {
    return (await instance.delete<any>(`/api/messages/${messageId}`)).data;
};
