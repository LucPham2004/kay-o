import React, { useEffect, useState } from 'react';
import { useApp } from '@/utils/AppContext';
import { 
    TbEdit, 
    TbTrash, 
    TbSearch, 
    TbPlus,
    TbChevronLeft,
    TbChevronRight,
    TbChevronsLeft,
    TbChevronsRight
} from 'react-icons/tb';
import { callGetAllUsers } from '@/services/UserService';
import { UserResponseSchema } from '@/types/User';


const UserAdminPage: React.FC = () => {
    const { isDarkMode } = useApp();
    const [users, setUsers] = useState<UserResponseSchema[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [editingUser, setEditingUser] = useState<UserResponseSchema | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState<UserResponseSchema | null>(null);

    useEffect(() => {
        getAllUsers();
    }, []);

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handleEdit = (user: UserResponseSchema) => {
        setEditingUser(user);
    };

    const handleDelete = (user: any) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            setUsers(users.filter(user => user._id !== userToDelete._id));
            setShowDeleteModal(false);
            setUserToDelete(null);
        }
    };

    const handleSave = (updatedUser: UserResponseSchema) => {
        setUsers(users.map(user => 
            user._id === updatedUser._id ? updatedUser : user
        ));
        setEditingUser(null);
    };

    const getAllUsers = async () => {
        const res = await callGetAllUsers();
        if(res.length > 0) {
            setUsers(res)
        }
    }
    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Quản lý người dùng
                </h1>
                <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg
                        ${isDarkMode 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
                    <TbPlus className="text-xl" />
                    <span>Thêm người dùng</span>
                </button>
            </div>

            {/* Search */}
            <div className={`p-4 rounded-lg
                ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}>
                <div className="relative">
                    <TbSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-xl
                        ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm người dùng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border
                            ${isDarkMode 
                                ? 'bg-[#1F1F1F] border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-black'}`}
                    />
                </div>
            </div>

            {/* Table */}
            <div className={`rounded-lg overflow-hidden
                ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}>
                <table className="w-full">
                    <thead>
                        <tr className={`border-b
                            ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                            <th className={`px-6 py-3 text-left text-sm font-medium
                                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Tên người dùng
                            </th>
                            <th className={`px-6 py-3 text-left text-sm font-medium
                                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Email
                            </th>
                            <th className={`px-6 py-3 text-left text-sm font-medium
                                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Vai trò
                            </th>
                            <th className={`px-6 py-3 text-left text-sm font-medium
                                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Trạng thái
                            </th>
                            <th className={`px-6 py-3 text-left text-sm font-medium
                                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Ngày tạo
                            </th>
                            <th className={`px-6 py-3 text-left text-sm font-medium
                                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user._id} className={`border-b
                                ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                                <td className={`px-6 py-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                    {user.username}
                                </td>
                                <td className={`px-6 py-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                    {user.email}
                                </td>
                                <td className={`px-6 py-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                    {user.role}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs
                                        ${user.status === 'inactive'
                                            ? isDarkMode
                                            ? 'bg-red-900 text-red-300'
                                                : 'bg-red-100 text-red-800'
                                            : isDarkMode
                                                ? 'bg-green-900 text-green-300'
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                        {user.status === 'inactive' ? 'Không hoạt động' : 'Hoạt động'}
                                    </span>
                                </td>
                                <td className={`px-6 py-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                    {user.created_at}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className={`p-2 rounded-lg hover:bg-opacity-10
                                                ${isDarkMode 
                                                    ? 'text-blue-400 hover:bg-blue-400' 
                                                    : 'text-blue-600 hover:bg-blue-600'}`}>
                                            <TbEdit className="text-xl" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user)}
                                            className={`p-2 rounded-lg hover:bg-opacity-10
                                                ${isDarkMode 
                                                    ? 'text-red-400 hover:bg-red-400' 
                                                    : 'text-red-600 hover:bg-red-600'}`}>
                                            <TbTrash className="text-xl" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className={`flex items-center justify-between px-4 py-3 rounded-lg
                ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}>
                <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Hiển thị {indexOfFirstItem + 1} đến {Math.min(indexOfLastItem, filteredUsers.length)} của {filteredUsers.length} kết quả
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg
                            ${currentPage === 1
                                ? isDarkMode
                                    ? 'text-gray-600'
                                    : 'text-gray-400'
                                : isDarkMode
                                    ? 'text-white hover:bg-[#454647]'
                                    : 'text-black hover:bg-gray-100'
                            }`}>
                        <TbChevronsLeft className="text-xl" />
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg
                            ${currentPage === 1
                                ? isDarkMode
                                    ? 'text-gray-600'
                                    : 'text-gray-400'
                                : isDarkMode
                                    ? 'text-white hover:bg-[#454647]'
                                    : 'text-black hover:bg-gray-100'
                            }`}>
                        <TbChevronLeft className="text-xl" />
                    </button>
                    <span className={`px-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        Trang {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg
                            ${currentPage === totalPages
                                ? isDarkMode
                                    ? 'text-gray-600'
                                    : 'text-gray-400'
                                : isDarkMode
                                    ? 'text-white hover:bg-[#454647]'
                                    : 'text-black hover:bg-gray-100'
                            }`}>
                        <TbChevronRight className="text-xl" />
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg
                            ${currentPage === totalPages
                                ? isDarkMode
                                    ? 'text-gray-600'
                                    : 'text-gray-400'
                                : isDarkMode
                                    ? 'text-white hover:bg-[#454647]'
                                    : 'text-black hover:bg-gray-100'
                            }`}>
                        <TbChevronsRight className="text-xl" />
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`p-6 rounded-lg w-96
                        ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}>
                        <h3 className={`text-xl font-bold mb-4
                            ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            Xác nhận xóa
                        </h3>
                        <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Bạn có chắc chắn muốn xóa người dùng {userToDelete?.username}?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setUserToDelete(null);
                                }}
                                className={`px-4 py-2 rounded-lg
                                    ${isDarkMode
                                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300 text-black'}`}>
                                Hủy
                            </button>
                            <button
                                onClick={confirmDelete}
                                className={`px-4 py-2 rounded-lg
                                    ${isDarkMode
                                        ? 'bg-red-600 hover:bg-red-700 text-white'
                                        : 'bg-red-500 hover:bg-red-600 text-white'}`}>
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAdminPage;