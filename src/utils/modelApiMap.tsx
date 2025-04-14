import { callStreamChatWithGemini, callStreamChatWithDeepseek, callStreamChatWithLlama } from "@/services/MessageService";

const modelApiMap: Record<string, (params: { conv_id: string; question: string }, cb: (char: string) => void) => Promise<void>> = {
    'KayO (Gemini 2.0 Flash)': callStreamChatWithGemini,
    'KayO (Deepseek R1)': callStreamChatWithDeepseek,
    'KayO (LLaMA 4 Maverick)': callStreamChatWithLlama,
};

export default modelApiMap;