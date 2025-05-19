import { faBoxOpen, faEdit, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import AddProduct from './AddProduct';
import axios from 'axios';
import { DELETE_PRODUCT_ENDPOINT } from '@/utils/constants/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Error from '../../ui/Error';
import UpdateProduct from './UpdateProduct';
import { setError } from '@/features/slices/errorSlices';


const categoryId = [
    { key: 'PS1', name: 'Thức ăn' },
    { key: 'PS2', name: 'Phụ kiện' },
    { key: 'PS3', name: 'Đồ chơi' },
    { key: 'PS4', name: 'Đồ dùng' },
    { key: 'PS5', name: 'Chó' },
    { key: 'PS6', name: 'Mèo' },
    { key: 'PS7', name: 'Động vật khác' },
    { key: 'PS8', name: 'Thiết bị thông minh' },
    { key: 'PS9', name: 'New' },
    { key: 'PS10', name: 'Best seller' }
]
const ProductManagement = () => {

    const [products, setProducts] = useState<FoodProduct[]>([]);
    const [searchProducts, setSearchProducts] = useState<FoodProduct[]>([]);
    const [product, setProduct] = useState<FoodProduct>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);

    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/api/products');
        const data: FoodProduct[] = await response.json();
        setProducts(data);
        setSearchProducts(data);
    }
    useEffect(() => {
        fetchData();
    }, []);
    const handleSearch = (search: string) => {
        setCurrentPage(1);

        if (!search.trim()) {
            setSearchProducts(products);
            return;
        }

        const lowerSearch = search.toLowerCase();
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(lowerSearch)
        );

        setSearchProducts(filtered);

    };

    const handleClose = (x: boolean) => {
        if (!x) {
            setIsOpen(false);
            setIsOpenEdit(false);
            fetchData();
        }
    }
    const dispatch = useDispatch();

    const handleDelete = async (id: string) => {
        const response = await axios.delete(DELETE_PRODUCT_ENDPOINT(id), {
            withCredentials: true
        });
        if (response.status == 200) {
            dispatch(setError({ status: 'success', message: 'Delete product successfully!' }));
            fetchData();
        } else {
            dispatch(setError({ status: 'danger', message: 'Delete product failed!' }));
        }
    }

    const onOpenEdit = (productSelect: FoodProduct) => {
        setProduct(productSelect);
        setIsOpenEdit(true);
        console.log("okelsaaa")
    }
    const { status, message } = useSelector((state: RootState) => state.error);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(searchProducts.length / itemsPerPage);

    const currentProducts = searchProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    return (
        <>
            {status && message && <Error state={status} message={message} />}
            <section id="product-management" className="mb-8">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">
                                <FontAwesomeIcon icon={faBoxOpen} className="mr-2 text-indigo-600" />
                                Quản lý sản phẩm
                            </h2>
                            <button
                                onClick={() => { setIsOpen(true) }}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none">
                                <FontAwesomeIcon icon={faPlus} className=" mr-2" />Thêm sản phẩm
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="mb-4 flex justify-between items-center">
                            <div className="relative w-64">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm sản phẩm..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                <div className="absolute left-3 top-2.5 text-gray-400">
                                    <FontAwesomeIcon icon={faSearch} />
                                </div>
                            </div>
                            <div>
                                <select
                                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option>Tất cả danh mục</option>
                                    <option>Thú cưng</option>
                                    <option>Thức ăn</option>
                                    <option>Phụ kiện</option>
                                </select>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Hình ảnh</th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tên sản phẩm</th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Danh mục</th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Giá gốc</th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Giá sau giảm</th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tồn kho</th>
                                        <th
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentProducts.map(product => (
                                        <tr key={product._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img
                                                    src={product.image || "images/img.jpg"}
                                                    alt={product.title}
                                                    width={50}
                                                    height={50}
                                                    className="h-10 w-10 rounded-full"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                                <div className="text-sm text-gray-500">{product.brand}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{
                                                categoryId.find(category => category.key === product.category)?.name
                                            }</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.originalPrice} VNĐ</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.discountedPrice ? product.discountedPrice + `VND` : `Không giảm`}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button onClick={(e) => { e.stopPropagation(); onOpenEdit(product) }} className="text-indigo-600 hover:text-indigo-900 mr-3">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button onClick={() => { handleDelete(product._id) }} className="text-red-600 hover:text-red-900">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Hiển thị {(currentPage - 1) * itemsPerPage + 1} đến {Math.min(currentPage * itemsPerPage, searchProducts.length)} của {searchProducts.length} sản phẩm

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
            <AddProduct
                isOpen={isOpen}
                handleClose={handleClose}
            />
            <UpdateProduct
                isOpenEdit={isOpenEdit}
                handleClose={handleClose}
                product={product}
            />
        </>
    )
}
export default ProductManagement