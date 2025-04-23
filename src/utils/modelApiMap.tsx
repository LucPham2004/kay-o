import { callStreamChat } from "@/services/MessageService";
import { ChatQuestion } from "@/types/Message";

const modelApiMap: Record<string, (data: ChatQuestion, onMessage: (chunk: string) => void) => Promise<void>> = {
    'KayO (Gemini 2.0 Flash)': (data, cb) => callStreamChat('gemini', data, cb),
    'KayO (Deepseek R1)': (data, cb) => callStreamChat('deepseek', data, cb),
    'KayO (LLaMA 4 Maverick)': (data, cb) => callStreamChat('llama', data, cb),
};

export default modelApiMap;