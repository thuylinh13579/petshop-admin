import { faBoxOpen, faShoppingCart, faUsers, faWallet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";

const OverView = () => {
    const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
        const response = await fetch('http://localhost:5000/api/products');
        setProducts(await response.json());
    })()
  }, []);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Tổng sản phẩm</p>
                        <p className="text-2xl font-bold">{products?.length}</p>
                    </div>
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                        <FontAwesomeIcon icon={faBoxOpen} className="fas fa-box-open" />
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Đơn hàng hôm nay</p>
                        <p className="text-2xl font-bold">24</p>
                    </div>
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Khách hàng mới</p>
                        <p className="text-2xl font-bold">8</p>
                    </div>
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                        <FontAwesomeIcon icon={faUsers} className="fas fa-users" />
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Doanh thu tháng</p>
                        <p className="text-2xl font-bold">42.5M VNĐ</p>
                    </div>
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                        <FontAwesomeIcon icon={faWallet} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OverView