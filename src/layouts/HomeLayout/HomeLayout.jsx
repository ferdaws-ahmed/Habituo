import React, { useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router';
import { ThemeContext } from '../../contexts/ThemeContext';

const HomeLayout = () => {
    
    const { theme } = useContext(ThemeContext);

    return (
        <div 
            data-theme={theme} 
            className="flex flex-col min-h-screen bg-base-100 text-base-content transition-colors duration-300"
        >
            <header className='w-full mx-auto sticky top-0 z-50 '>
                <Navbar />
            </header>

            <main className='flex-grow w-full  mx-auto'>
                <Outlet />
            </main>

            <footer className='w-full mx-auto py-4'>
                <Footer />
            </footer>
        </div>
    );
};

export default HomeLayout;