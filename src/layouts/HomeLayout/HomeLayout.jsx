// HomeLayout.jsx
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div className="flex flex-col min-h-screen ">
            {/* Header / Navbar */}
            <header className='w-10/12 mx-auto py-4'>
                <Navbar />
            </header>

            {/* Main content */}
            <main className='flex-grow w-10/12 mx-auto py-6'>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className='w-10/12 mx-auto py-4'>
                <Footer />
            </footer>
        </div>
    );
};

export default HomeLayout;
