import { useApp } from "@/utils/AppContext";
import { FC } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
}

const StatCard: FC<StatCardProps> = ({ title, value, icon }) => {
    const { isDarkMode } = useApp();

    return (
        <div className={`p-4 rounded-2xl shadow-sm flex items-center justify-between
            ${isDarkMode ? 'bg-[#232425] text-white' : 'bg-white text-black'}`}>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-semibold">{value}</p>
            </div>
            <div className="text-gray-400 text-2xl">{icon}</div>
        </div>
    )
};

export default StatCard;
