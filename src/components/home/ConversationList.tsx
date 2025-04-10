import { useTheme } from "@/utils/ThemeContext";
import '../../styles/scrollbar.css';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { ConversationResponseSchema } from "@/types/Conversation";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);


// Hàm nhóm các cuộc trò chuyện theo thời gian
const groupConversations = (conversations: ConversationResponseSchema[]) => {
    return {
        today: conversations.filter((c) => dayjs(c.update_at).isToday()),
        yesterday: conversations.filter((c) => dayjs(c.update_at).isYesterday()),
        previous7Days: conversations.filter((c) => dayjs(c.update_at).isAfter(dayjs().subtract(7, "days")) && !dayjs(c.update_at).isToday() && !dayjs(c.update_at).isYesterday()),
        previous30Days: conversations.filter((c) => dayjs(c.update_at).isAfter(dayjs().subtract(30, "days")) && dayjs(c.update_at).isBefore(dayjs().subtract(7, "days"))),
        longTimeAgo: conversations.filter((c) => dayjs(c.update_at).isBefore(dayjs().subtract(30, "days"))),
    };
};

interface Props {
    conversations: ConversationResponseSchema[];
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
    const { conv_id } = useParams();
    const { isDarkMode } = useTheme();
    const grouped = groupConversations(conversations);



    return (
        <div className={`w-full max-w-md rounded-lg p-2 pt-1 overflow-y-auto mb-4 pb-24
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
                    <li
                        key={conversation._id}
                        className={`relative flex justify-between items-center p-2 rounded-lg cursor-pointer transition group
                            ${conv_id == conversation._id 
                                ? `${isDarkMode ? 'bg-[#333333]' : 'bg-gray-300'}` 
                                : ``}
                            ${isDarkMode ? 'hover:bg-[#3F3F3F]' : 'hover:bg-gray-200'}`}
                    >
                        <Link to={`/c/${conversation._id}`} className="w-full flex justify-between items-center">
                            <span className="text-[15px] font-sans max-w-[90%] overflow-hidden text-ellipsis whitespace-nowrap">
                                {conversation.name}
                            </span>
                            <button className={`hidden group-hover:block
                                ${isDarkMode ? 'hover:text-gray-100' : 'hover:text-gray-600'}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onMenuToggle(conversation._id);
                                }}>
                                <HiOutlineDotsHorizontal size={20} />
                            </button>
                        </Link>

                            {/* Menu hiển thị khi click */}
                            {openMenuId === conversation._id && (
                                <div
                                    className={`absolute right-0 top-10 shadow-md rounded-lg p-2 w-36 z-10 text-sm
                                        ${isDarkMode ? 'bg-[#323232]' : 'bg-white'}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        className={`w-full text-left px-4 py-2 rounded
                                            ${isDarkMode ? 'hover:bg-[#474747]' : 'hover:bg-gray-100'}`}
                                        onClick={() => {
                                            onRename(conversation._id);
                                        }}
                                    >
                                        ✏️ Đổi tên
                                    </button>
                                    <button
                                        className={`w-full text-left px-4 py-2 rounded text-red-600
                                            ${isDarkMode ? 'hover:bg-[#474747]' : 'hover:bg-gray-100'}`}
                                        onClick={() => {
                                            onDelete(conversation._id);
                                        }}
                                    >
                                        🗑 Xóa
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            )
            ))}
        </div>
    );
};

export default ConversationList;
