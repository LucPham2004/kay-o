import { UserResponseSchema, UpdateUserSchema } from "@/types/User";
import instance from "./Axios-customize";

// Lấy thông tin người dùng theo ID
export const callGetUserById = async (userId: string) => {
    return (await instance.get<UserResponseSchema>(`/api/users/${userId}`)).data;
};

// Lấy tất cả người dùng
export const callGetAllUsers = async () => {
    return (await instance.get<UserResponseSchema[]>(`/api/users/all`)).data;
};

// Tìm kiếm người dùng
export const callSearchUsers = async (keyword: string) => {
    return (await instance.get<UserResponseSchema[]>(`/api/users/search?keyword=${keyword}`)).data;
};

// Cập nhật người dùng
export const callUpdateUser = async (userId: string, data: UpdateUserSchema) => {
    return (await instance.put<UserResponseSchema>(`/api/users/${userId}`, data)).data;
};

// Xoá người dùng
export const callDeleteUser = async (userId: string) => {
    return (await instance.delete<any>(`/api/users/${userId}`)).data;
};
