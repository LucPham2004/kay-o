
export interface CreateUserSchema {
    username: string;
    email: string;
    avatar_url?: string;
}

export interface UserResponseSchema {
    id: string;
    username: string;
    email: string;
    avatar_url?: string;
    created_at?: string;
    update_at?: string;
}

export interface UpdateUserSchema {
    email?: string | null;
    avatar_url?: string | null;
    update_at?: string;
}
