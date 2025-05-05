import { Stats } from "@/types/Admin";
import instance from "./Axios-customize";


export const callGetDashboardStats = async () => {
    return (await instance.get<Stats>(`/api/admin/stats`)).data;
};