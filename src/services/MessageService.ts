import { CreateMessageSchema, ChatQuestion, ChatResponse, MessageResponseSchema, UpdateMessageSchema } from "@/types/Message";
import instance from "./Axios-customize";

// Chat with AI
export const ChatWithAI = (data: ChatQuestion) => {
    return instance.post<ChatResponse>("/api/gemini/chat", data);
};

// Tạo tin nhắn
export const callCreateMessage = (data: CreateMessageSchema) => {
    return instance.post<MessageResponseSchema>("/api/messages/create", data);
};

// Lấy tin nhắn theo ID
export const callGetMessageById = (messageId: string) => {
    return instance.get<MessageResponseSchema>(`/api/messages/${messageId}`);
};

// Lấy tất cả tin nhắn trong một cuộc trò chuyện
export const callGetMessages = (convId: string) => {
    return instance.get<MessageResponseSchema[]>(`/api/messages/all/${convId}`);
};

// Lấy lịch sử tin nhắn trong một cuộc trò chuyện
export const callGetHistory = (convId: string) => {
    return instance.get<MessageResponseSchema[]>(`/api/messages/history/${convId}`);
};

// Cập nhật tin nhắn
export const callUpdateMessage = (messageId: string, data: UpdateMessageSchema) => {
    return instance.put<MessageResponseSchema>(`/api/messages/${messageId}`, data);
};

// Xoá tin nhắn
export const callDeleteMessage = (messageId: string) => {
    return instance.delete<any>(`/api/messages/${messageId}`);
};
