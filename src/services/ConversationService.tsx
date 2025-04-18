import { CreateConversationSchema, ConversationResponseSchema, UpdateConversationSchema } from "@/types/Conversation";
import instance from "./Axios-customize";


// Tạo cuộc trò chuyện
export const callCreateConversation = async (data: CreateConversationSchema) => {
    return (await instance.post<ConversationResponseSchema>("/api/conversations/create", data)).data;
};

// Lấy tất cả cuộc trò chuyện của một user
export const callGetConversationsByUser = async (userId: string) => {
    return (await instance.get<ConversationResponseSchema[]>(`/api/conversations/all/${userId}`)).data;
};

// Tìm kiếm hội thoại
export const callSearchConversationsByUser = async (userId: string, keyword: string) => {
    return (await instance.get<ConversationResponseSchema[]>(`/api/conversations/search/${userId}?keyword=${encodeURIComponent(keyword)}`)).data;
};

// Lấy tất cả cuộc trò chuyện
export const callGetAllConversations = async () => {
    return (await instance.get<ConversationResponseSchema[]>("/api/conversations/all")).data;
};

// Cập nhật cuộc trò chuyện
export const callUpdateConversation = async (id: string, data: UpdateConversationSchema) => {
    return (await instance.put<ConversationResponseSchema>(`/api/conversations/${id}`, data)).data;
};

// Xoá cuộc trò chuyện
export const callDeleteConversation = async (id: string) => {
    return (await instance.delete<any>(`/api/conversations/${id}`)).data;
};