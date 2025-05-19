
'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTachometerAlt,
  faBoxOpen,
  faShoppingCart,
  faUsers,
  faCheckCircle,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

  return (
    <div className=" md:flex md:flex-shrink-0">
    <div className="flex flex-col w-64 bg-indigo-800 text-white">
        <div className="flex items-center justify-center h-16 px-4 bg-indigo-900">
            <span className="text-xl font-bold">PetShop Admin</span>
        </div>
        <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
            <nav className="flex-1 space-y-2">
                <a href="#"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-indigo-900 text-white">
                    <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
                    Dashboard
                </a>
                <a href="#product-management"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-200 hover:bg-indigo-700 hover:text-white">
                    <FontAwesomeIcon icon={faBoxOpen} className="mr-3"/>
                    Quản lý sản phẩm
                </a>
                <a href="#order-management"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-200 hover:bg-indigo-700 hover:text-white">
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-3" />
                    Quản lý đơn hàng
                </a>
                <a href="#customer-management"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-200 hover:bg-indigo-700 hover:text-white">
                    <FontAwesomeIcon icon={faUsers} className="mr-3" />
                    Quản lý khách hàng
                </a>
                <a href="#order-confirmation"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-200 hover:bg-indigo-700 hover:text-white">
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-3" />
                    Xác nhận đơn hàng
                </a>
                <div className="pt-4 mt-4 border-t border-indigo-700">
                    <a href="#"
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-200 hover:bg-indigo-700 hover:text-white">
                        <FontAwesomeIcon icon={faCog} className="mr-3" />
                        Cài đặt
                    </a>
                    <a href="#"
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-200 hover:bg-indigo-700 hover:text-white">
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                        Đăng xuất
                    </a>
                </div>
            </nav>
        </div>
    </div>
</div>
  )
}

export default Navbar
