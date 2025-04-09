export interface ConversationResponseSchema {
    id: string;
    user_id: string;
    name?: string;
    created_at?: string;
    update_at?: string;
}

export interface CreateConversationSchema {
    user_id: string;
    name?: string;
}

export interface UpdateConversationSchema {
    name?: string;
}