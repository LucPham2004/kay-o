import { BsPencilSquare } from "react-icons/bs";
import '../../styles/scrollbar.css';
import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { useTheme } from "@/utils/ThemeContext";
import SearchBar from "../common/SearchBar";
import Modal from "../common/Modal";
import ConversationList from "./ConversationList";
import dayjs from "dayjs";
import { IoMdSunny } from "react-icons/io";
import { Link } from "react-router-dom";


export interface Conversation {
    id: string;
    title: string;
    timestamp: string;
}

// Fake data
const initialConversations: Conversation[] = [
    { id: "1", title: "Chat với AI - 1", timestamp: dayjs().toISOString() }, // Hôm nay
    { id: "2", title: "Trợ lý thông minh", timestamp: dayjs().subtract(1, "day").toISOString() }, // Hôm qua
    { id: "3", title: "Cuộc trò chuyện 5 ngày trước", timestamp: dayjs().subtract(5, "days").toISOString() },
    { id: "4", title: "Cuộc trò chuyện 20 ngày trước", timestamp: dayjs().subtract(20, "days").toISOString() },
    { id: "5", title: "Cuộc trò chuyện 40 ngày trước", timestamp: dayjs().subtract(40, "days").toISOString() },
    { id: "6", title: "Chat với AI - 1", timestamp: dayjs().toISOString() }, // Hôm nay
    { id: "7", title: "Trợ lý thông minh", timestamp: dayjs().subtract(1, "day").toISOString() }, // Hôm qua
    { id: "8", title: "Cuộc trò chuyện 5 ngày trước", timestamp: dayjs().subtract(5, "days").toISOString() },
    { id: "9", title: "Cuộc trò chuyện 20 ngày trước", timestamp: dayjs().subtract(20, "days").toISOString() },
    { id: "10", title: "Cuộc trò chuyện 40 ngày trước", timestamp: dayjs().subtract(40, "days").toISOString() },
    { id: "11", title: "Chat với AI - 1", timestamp: dayjs().toISOString() }, // Hôm nay
    { id: "12", title: "Chat với AI - 1", timestamp: dayjs().toISOString() }, // Hôm nay
    { id: "13", title: "Chat với AI - 1", timestamp: dayjs().toISOString() }, // Hôm nay
    { id: "14", title: "Chat với AI - 1", timestamp: dayjs().toISOString() }, // Hôm nay
    { id: "15", title: "Chat với AI - 1", timestamp: dayjs().toISOString() }, // Hôm nay
];

interface SidebarProps {
    openMenuId: string | null;
    onMenuToggle: (id: string) => void;
}

const Sidebar:React.FC<SidebarProps> = ({ openMenuId, onMenuToggle }) => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
    const [searchedConversations, setSearchedConversations] = useState<[] | null>(null);

    const [conversations, setConversations] = useState<Conversation[]>(initialConversations);

    // Xử lý đổi tên hội thoại
    const handleRename = (id: string) => {
        const newTitle = prompt("Nhập tên mới:");
        if (newTitle) {
            setConversations((prev) =>
                prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
            );
        }
    };

    // Xử lý xóa hội thoại
    const handleDelete = (id: string) => {
        if (window.confirm("Bạn có chắc muốn xóa cuộc trò chuyện này?")) {
            setConversations((prev) => prev.filter((c) => c.id !== id));
        }
    };

    const handleConversationSearch = async () => {

    };

    const handleClearSearch = () => {
        setSearchedConversations(null);
    };

    return (
        <div className={`min-h-[100vh] max-h-[100vh] overflow-hidden min-w-[280px] flex flex-col items-center 
                p-2 pb-0 pe-1 rounded-l-xl shadow-sm
                ${isDarkMode ? 'bg-[#1F1F1F] text-gray-300'
                : 'bg-[#F9F9F9] text-black'}`}>

            <div className="flex flex-row items-center p-2 py-0 pe-4 self-start w-full mb-2">
                <div className={`flex self-start items-center gap-2 text-xl font-bold text-left w-[45%]
                        ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    <img src="/kayo.webp" className="w-6 h-6 rounded-full"></img>
                    <p>KayO</p>
                </div>
                <div className="relative flex flex-row gap-4 items-center justify-end w-[55%]">
                    {/* <button onClick={() => setIsNewChatModalOpen(true)}
                        className={`p-2 rounded-full text-xl 
                            ${isDarkMode ? 'text-white bg-[#474747] hover:bg-[#5A5A5A]'
                                : 'text-black bg-gray-100 hover:bg-gray-200'}`}>
                        <BsPencilSquare />
                    </button> */}
                    <button className={` rounded-lg text-xl p-2
                        ${isDarkMode ? 'text-yellow-400 hover:bg-[#5A5A5A]'
                            : 'text-yellow-400 hover:bg-gray-200'}`}
                        onClick={toggleDarkMode}>
                        {isDarkMode ? <IoMdSunny /> : <FaMoon />}
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center w-full h-fit p-2 pe-4">
                <SearchBar placeholder="Tìm kiếm hội thoại..." onSearch={handleConversationSearch} onClear={handleClearSearch} />
            </div>

            <div className={`flex flex-col items-center w-full h-fit p-2 pe-4`}>
                <Link to={`/`} className="w-full">
                    <button className={`flex items-center justify-center gap-2 p-2 rounded-lg w-full border 
                            ${isDarkMode ? 'text-[#7295F6] border-[#7295F6] hover:bg-[#1e2129] hover:text-[#d3defc]'
                            : 'text-[#5680f5] border-[#4170f0] hover:bg-blue-50'}`}>
                        <BsPencilSquare className="text-lg" />
                        <p className="text-sm">New Chat</p>
                    </button>
                </Link>
            </div>


            {searchedConversations && searchedConversations?.length > 0 ? (
                <></>
            ) : (
                <ConversationList conversations={conversations}
                openMenuId={openMenuId}
                onMenuToggle={onMenuToggle} 
                onRename={handleRename} 
                onDelete={handleDelete} />
            )}

            {/* Settings Modal */}
            <Modal isOpen={isSettingModalOpen} onClose={() => setIsSettingModalOpen(false)}>
                <h2 className="text-lg font-bold mb-3">Tuỳ chỉnh</h2>
                <div className="flex flex-col items-start justify-start gap-4 w-full">
                    <div className="flex items-center justify-start gap-2">
                        <div className={`rounded-full p-2 text-xl ${isDarkMode ? 'bg-[#474747]' : 'bg-gray-100'}`}>
                            <FaMoon />
                        </div>
                        <div className="flex flex-col items-start justify-start">
                            <p className="text-md font-semibold">Chế độ tối</p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                Điều chỉnh giao diện của ChitChat để giảm độ chói và cho đôi mắt được nghỉ ngơi.
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-2 w-full'>
                        <label className={`flex gap-2 w-full rounded-lg p-2 ps-10 items-center justify-between 
                                ${isDarkMode ? 'hover:bg-[#474747]' : 'hover:bg-gray-200'} cursor-pointer`}
                            onClick={() => toggleDarkMode}>
                            <p>Đang tắt</p>
                            <div className={`flex items-center rounded-full p-2 cursor-pointer
                                    ${isDarkMode ? 'text-white hover:bg-[#5A5A5A]' : 'text-black hover:bg-gray-200'}`}>
                                <input type="radio" name="darkmode" value="on" className="w-6 h-6 cursor-pointer"
                                    checked={isDarkMode === false}
                                    onChange={() => toggleDarkMode()} />
                            </div>
                        </label>
                        <label className={`flex gap-2 w-full rounded-lg p-2 ps-10 items-center justify-between 
                                ${isDarkMode ? 'hover:bg-[#474747]' : 'hover:bg-gray-200'} cursor-pointer`}
                            onClick={() => toggleDarkMode}>
                            <p>Đang bật</p>
                            <div className={`flex items-center rounded-full p-2 cursor-pointer
                                    ${isDarkMode ? 'text-white hover:bg-[#5A5A5A]' : 'text-black hover:bg-gray-200'} `}>
                                <input type="radio" name="darkmode" value="off" className="w-6 h-6 cursor-pointer"
                                    checked={isDarkMode === true}
                                    onChange={() => toggleDarkMode()} />
                            </div>
                        </label>
                    </div>
                </div>
            </Modal>

        </div>
    );
}

export default Sidebar;

