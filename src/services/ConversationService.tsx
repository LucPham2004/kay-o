import { CreateConversationSchema, ConversationResponseSchema, UpdateConversationSchema } from "@/types/Conversation";
import instance from "./Axios-customize";


// Tạo cuộc trò chuyện
export const callCreateConversation = (data: CreateConversationSchema) => {
    return instance.post<ConversationResponseSchema>("/api/conversations/create", data);
};

// Lấy tất cả cuộc trò chuyện của một user
export const callGetConversationsByUser = (userId: string) => {
    return instance.get<ConversationResponseSchema[]>(`/api/conversations/all/${userId}`);
};

// Lấy tất cả cuộc trò chuyện
export const callGetAllConversations = () => {
    return instance.get<ConversationResponseSchema[]>("/api/conversations/all");
};

// Cập nhật cuộc trò chuyện
export const callUpdateConversation = (id: string, data: UpdateConversationSchema) => {
    return instance.put<ConversationResponseSchema>(`/api/conversations/${id}`, data);
};

// Xoá cuộc trò chuyện
export const callDeleteConversation = (id: string) => {
    return instance.delete<any>(`/api/conversations/${id}`);
};