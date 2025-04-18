export const routes = {
    DEFAULT: '/',
    CONVERSATIONS: '/c/:conv_id',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    ADMIN: "admin",
    ADMIN_USER: "user",
    ADMIN_SETTING: "setting"
}

export const defaultModels = [
    'KayO (Gemini 2.0 Flash)', 
    'KayO (Deepseek R1)', 
    'KayO (LLaMA 4 Maverick)'
];