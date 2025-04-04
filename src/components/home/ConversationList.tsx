import { useTheme } from "@/utils/ThemeContext";
import '../../styles/scrollbar.css';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Conversation } from "./Sidebar";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);


// Hàm nhóm các cuộc trò chuyện theo thời gian
const groupConversations = (conversations: Conversation[]) => {
    return {
        today: conversations.filter((c) => dayjs(c.timestamp).isToday()),
        yesterday: conversations.filter((c) => dayjs(c.timestamp).isYesterday()),
        previous7Days: conversations.filter((c) => dayjs(c.timestamp).isAfter(dayjs().subtract(7, "days")) && !dayjs(c.timestamp).isToday() && !dayjs(c.timestamp).isYesterday()),
        previous30Days: conversations.filter((c) => dayjs(c.timestamp).isAfter(dayjs().subtract(30, "days")) && dayjs(c.timestamp).isBefore(dayjs().subtract(7, "days"))),
        longTimeAgo: conversations.filter((c) => dayjs(c.timestamp).isBefore(dayjs().subtract(30, "days"))),
    };
};

interface Props {
    conversations: Conversation[];
    openMenuId: string | null;
    onMenuToggle: (id: string) => void;
    onRename: (id: string) => void;
    onDelete: (id: string) => void;
}

const ConversationList: React.FC<Props> = ({ 
    conversations, 
    openMenuId, 
    onMenuToggle, 
    onRename, 
    onDelete 
}) => {
    const { isDarkMode } = useTheme();
    const grouped = groupConversations(conversations);



    return (
        <div className={`w-full max-w-md rounded-lg p-2 pt-1 overflow-y-auto mb-4
            ${conversations.length > 10 ? 'pe-2' : 'pe-4'}`}>

            {Object.entries(grouped).map(([group, items]) => (
                items.length > 0 && (
            <div key={group} className={`${group != 'today' ? 'mt-4' : ''}`}>
                <h3 className={`text-[13px] font-semibold ms-2 mb-2
                    ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                    {group === "today"
                        ? "Hôm nay"
                        : group === "yesterday"
                        ? "Hôm qua"
                        : group === "previous7Days"
                        ? "Trong vòng 7 ngày"
                        : group === "previous30Days"
                        ? "Trong 30 ngày"
                        : "Trên 30 ngày"}
                </h3>
                <ul>
                    {items.map((conversation) => (
                        <Link to={`/c/${conversation.id}`} key={conversation.id}>
                        <li
                            className={`relative flex justify-between items-center p-2 rounded-lg cursor-pointer transition group
                            ${isDarkMode ? 'hover:bg-[#3F3F3F]' : 'hover:bg-gray-200'}`}
                        >
                            <span className="text-[15px] font-sans max-w-[90%] overflow-hidden text-ellipsis whitespace-nowrap">
                                {conversation.title}
                            </span>
                            <button className={`hidden group-hover:block
                                ${isDarkMode ? 'hover:text-gray-100' : 'hover:text-gray-600'}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onMenuToggle(conversation.id);
                                  }}>
                                <HiOutlineDotsHorizontal size={20} />
                            </button>


                            {/* Menu hiển thị khi click */}
                            {openMenuId === conversation.id && (
                                <div
                                    className={`absolute right-0 top-10 shadow-md rounded-lg p-2 w-36 z-10
                                        ${isDarkMode ? 'bg-[#323232]' : 'bg-white'}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        className={`w-full text-left px-4 py-2 rounded
                                            ${isDarkMode ? 'hover:bg-[#474747]' : 'hover:bg-gray-100'}`}
                                        onClick={() => {
                                            onRename(conversation.id);
                                        }}
                                    >
                                        ✏️ Đổi tên
                                    </button>
                                    <button
                                        className={`w-full text-left px-4 py-2 rounded text-red-600
                                            ${isDarkMode ? 'hover:bg-[#474747]' : 'hover:bg-gray-100'}`}
                                        onClick={() => {
                                            onDelete(conversation.id);
                                        }}
                                    >
                                        🗑 Xóa
                                    </button>
                                </div>
                            )}
                        </li>
                        </Link>
                    ))}
                </ul>
            </div>
            )
            ))}
        </div>
    );
};

export default ConversationList;
