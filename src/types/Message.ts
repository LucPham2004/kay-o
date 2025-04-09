export interface ChatQuestion {
    conv_id: string;
    question: string;
}

export interface ChatResponse {
    question: ChatQuestion;
    answer: string;
}

export interface CreateMessageSchema {
    conversation_id: string;
    question: string;
    answer: string;
}

export interface UpdateMessageSchema {
    question?: string | null;
    answer?: string | null;
    update_at?: string;
}

export interface MessageResponseSchema {
    _id: string;
    conversation_id: string;
    question: string;
    answer: string;
    created_at?: string;
    update_at?: string;
}
