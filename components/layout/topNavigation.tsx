import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBell
} from '@fortawesome/free-solid-svg-icons'
const TopNavigation = () => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <button className="md:hidden text-gray-500 focus:outline-none">
          <FontAwesomeIcon icon={faBars}/>
        </button>
        <h1 className="ml-4 text-lg font-semibold text-gray-800">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 focus:outline-none">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <div className="relative">
          <button className="flex items-center space-x-2 focus:outline-none">
              <Image src={`../next.svg`} width={100} height={100} alt="vds" className="w-8 h-8 rounded-full"/>
              <span className="hidden md:inline text-gray-700">Admin</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default TopNavigation
