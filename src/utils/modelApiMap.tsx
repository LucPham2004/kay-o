import { callStreamChat } from "@/services/MessageService";
import { ChatQuestion } from "@/types/Message";

const modelApiMap: Record<string, (data: ChatQuestion, onMessage: (chunk: string) => void) => Promise<void>> = {
    'Gemini 2.0 Flash': (data, cb) => callStreamChat('gemini', data, cb),
    'Deepseek R1': (data, cb) => callStreamChat('deepseek', data, cb),
    'LLaMA 4 Maverick': (data, cb) => callStreamChat('llama', data, cb),
};

export default modelApiMap;