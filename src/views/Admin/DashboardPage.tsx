import StatCard from "@/components/common/StatCard";
import { callGetDashboardStats } from "@/services/AdminService";
import { Stats } from "@/types/Admin";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { IoChatboxEllipsesSharp } from "react-icons/io5";



const DashboardPage = () => {

	const [stats, setStats] = useState<Stats | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const data = await callGetDashboardStats();
				setStats(data);
			} catch (err) {
				console.error("Lỗi khi tải dữ liệu thống kê:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchStats();
	}, []);

	if (loading) {
		return <div className="p-6">Đang tải dữ liệu...</div>;
	}

	if (!stats) {
		return <div className="p-6 text-red-500">Không thể tải dữ liệu thống kê.</div>;
	}

	const statList = [
		{ title: "Người dùng", value: stats.users, icon: <FaUser /> },
		{ title: "Phiên chat", value: stats.conversations, icon: <IoMdChatboxes /> },
		{ title: "Tin nhắn đã phản hồi", value: stats.messages, icon: <IoChatboxEllipsesSharp /> },
	];

	return (
		<div className="p-6 space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{statList.map((s) => (
					<StatCard key={s.title} {...s} />
				))}
			</div>
		</div>
	);
};

export default DashboardPage