import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/Error/NotFound';

const router = createBrowserRouter ([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <NotFound/>,
        children: [
            {path: '/', element: <Home/>}
        ]
    }
])

export default router;