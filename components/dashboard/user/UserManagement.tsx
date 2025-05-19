import {  faUsers, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const UserManagement = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [searchUsers, setSearchUsers] = useState<User[]>([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/api/users/');
        console.log(response)
        const data: User[] = await response.json();
        setUsers(data);
        setSearchUsers(data);
    }
    useEffect(() => {
        fetchData();
    }, []);
    const handleSearch = (search: string) => {
        setCurrentPage(1);

        if (!search.trim()) {
            setSearchUsers(users);
            return;
        }

        const lowerSearch = search.toLowerCase();
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(lowerSearch)
        );

        setSearchUsers(filtered);

    };


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(searchUsers.length / itemsPerPage);

    const currentUsers = searchUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    return (
        <>
            <section id="customer-management" className="mb-8">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">
                                <FontAwesomeIcon icon={faUsers} className="mr-2 text-indigo-600"/>
                                Quản lý khách hàng
                            </h2>
                            <div className="relative w-64">
                                <input type="text" placeholder="Tìm kiếm khách hàng..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                <div className="absolute left-3 top-2.5 text-gray-400">
                                <FontAwesomeIcon icon={faSearch} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Khách hàng</th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Liên hệ</th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Địa chỉ</th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tổng đơn</th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentUsers.map(user => (
                                        <tr key={user._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full"
                                                            src={user.avatar} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">ID: {user.user_code}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.email}</div>
                                                <div className="text-sm text-gray-500">{user.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.address}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5 đơn</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-3">Xem</a>
                                                <a href="#" className="text-green-600 hover:text-green-900">Lịch sử</a>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Hiển thị {(currentPage - 1) * itemsPerPage + 1} đến {Math.min(currentPage * itemsPerPage, searchUsers.length)} của {searchUsers.length} sản phẩm

                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`px-3 py-1 border rounded-md ${currentPage === index + 1 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default UserManagement