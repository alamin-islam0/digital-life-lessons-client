import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import PrivateRoute from './PrivateRoute';
import AdminRoutes from './AdminRoutes';
import PremiumRoute from './PremiumRoute';

// Pages
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import PublicLessons from '../pages/Lessons/PublicLessons';
import LessonDetails from '../pages/Lessons/LessonDetails';
import Pricing from '../pages/Pricing/Pricing';
import PaymentSuccess from '../pages/Payment/PaymentSuccess';
import PaymentCancel from '../pages/Payment/PaymentCancel';
import NotFound from '../pages/Error/NotFound';

// Dashboard Pages
import DashboardHome from '../pages/Dashboard/DashboradHome';
import Profile from '../pages/Dashboard/Profile';
import AddLesson from '../pages/Dashboard/AddLesson';
import MyLessons from '../pages/Dashboard/MyLessons';
import UpdateLessons from '../pages/Dashboard/UpdateLessons';
import MyFavorites from '../pages/Dashboard/MyFavorites';
import ManageUsers from '../pages/Dashboard/ManageUsers';
import ManageLessons from '../pages/Dashboard/ManageLessons';
import AdminHome from '../pages/Dashboard/AdminHome';
import ReportedLessons from '../pages/Dashboard/ReportedLessons';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />, // layout for public pages
        errorElement: <NotFound />, // fallback for any unmatched route
        children: [
            { index: true, element: <Home /> }, // default home page
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'public-lessons', element: <PublicLessons /> },
            {
                path: 'lesson/:id',
                element: (
                    <PrivateRoute>
                        <LessonDetails />
                    </PrivateRoute>
                ),
            },
            { path: 'pricing', element: <Pricing /> },
            {
                path: 'payment/success',
                element: (
                    <PrivateRoute>
                        <PaymentSuccess />
                    </PrivateRoute>
                ),
            },
            {
                path: 'payment/cancel',
                element: (
                    <PrivateRoute>
                        <PaymentCancel />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            { index: true, element: <DashboardHome /> },
            { path: 'profile', element: <Profile /> },
            {
                path: 'add-lesson',
                element: (
                    <PremiumRoute>
                        <AddLesson />
                    </PremiumRoute>
                ),
            },
            { path: 'my-lessons', element: <MyLessons /> },
            { path: 'update-lesson/:id', element: <UpdateLessons /> },
            { path: 'my-favorites', element: <MyFavorites /> },
            {
                path: 'manage-users',
                element: (
                    <AdminRoutes>
                        <ManageUsers />
                    </AdminRoutes>
                ),
            },
            {
                path: 'manage-lessons',
                element: (
                    <AdminRoutes>
                        <ManageLessons />
                    </AdminRoutes>
                ),
            },
            {
                path: 'admin-home',
                element: (
                    <AdminRoutes>
                        <AdminHome />
                    </AdminRoutes>
                ),
            },
            {
                path: 'reported-lessons',
                element: (
                    <AdminRoutes>
                        <ReportedLessons />
                    </AdminRoutes>
                ),
            },
        ],
    },
    { path: '*', element: <NotFound /> },
]);

export default router;