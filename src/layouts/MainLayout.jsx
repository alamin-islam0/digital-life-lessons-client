import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import NavBar from '../components/shared/NavBar';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <NavBar/>
            <main className='flex-glow'>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default MainLayout;