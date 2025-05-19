import React, { ReactNode } from 'react';
import Navbar from './navbar';
import TopNavigation from './topNavigation';
import Footer from './footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar></Navbar>

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavigation></TopNavigation>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </main>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default Layout
