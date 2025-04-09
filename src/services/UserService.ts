import { UserResponseSchema, UpdateUserSchema } from "@/types/User";
import instance from "./Axios-customize";

// Lấy thông tin người dùng theo ID
export const callGetUserById = (userId: string) => {
    return instance.get<UserResponseSchema>(`/api/users/${userId}`);
};

// Lấy tất cả người dùng
export const callGetAllUsers = () => {
    return instance.get<UserResponseSchema[]>(`/api/users/all`);
};

// Cập nhật người dùng
export const callUpdateUser = (userId: string, data: UpdateUserSchema) => {
    return instance.put<UserResponseSchema>(`/api/users/${userId}`, data);
};

// Xoá người dùng
export const callDeleteUser = (userId: string) => {
    return instance.delete<any>(`/api/users/${userId}`);
};
