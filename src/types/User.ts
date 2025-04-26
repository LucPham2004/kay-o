
export interface CreateUserSchema {
    username: string;
    email: string;
    avatar_url?: string;
}

export interface UserResponseSchema {
    _id: string;
    username: string;
    email: string;
    role: string;
    status: string;
    avatar_url?: string;
    created_at?: string;
    update_at?: string;
}

export interface UpdateUserSchema {
    username?: string
    email?: string | null;
    avatar_url?: string | null;
    update_at?: string;
}
