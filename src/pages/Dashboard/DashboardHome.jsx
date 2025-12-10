import { useQuery } from '@tanstack/react-query';
import { BookOpen, Bookmark, Heart, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import StatsCard from '../../components/ui/StatsCard';
import Loading from '../../components/ui/Loading';
import LessonCard from '../../components/lessons/LessonCard';
import SectionHeader from '../../components/ui/SectionHeader';

const DashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch dashboard overview (stats & recent lessons)
    const { data: dashboardData, isLoading: loading } = useQuery({
        queryKey: ['dashboard-overview'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/overview');
            return res.data;
        },
    });

    const stats = {
        totalLessons: dashboardData?.totalLessons || dashboardData?.lessonsCount || 0,
        totalFavorites: dashboardData?.totalFavorites || dashboardData?.favoritesCount || 0,
        totalLikes: dashboardData?.totalLikes || dashboardData?.likesCount || 0,
        publicLessons: dashboardData?.publicLessons || dashboardData?.publicLessonsCount || 0,
        recentLessons: dashboardData?.recentLessons || [],
    };

    const recentLessons = stats.recentLessons;
    const statsLoading = loading;
    const lessonsLoading = loading;

    if (statsLoading) return <Loading />;

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Welcome, {user?.displayName || 'User'}!
                </h1>
                <p className="text-lg opacity-90">
                    Welcome to your dashboard. Here you can see all your lessons and activities.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Lessons"
                    value={stats?.totalLessons || 0}
                    icon={BookOpen}
                    bgColor="bg-blue-50"
                    iconColor="text-blue-600"
                    trend="up"
                    trendValue="+12%"
                />
                <StatsCard
                    title="Saved Lessons"
                    value={stats?.totalFavorites || 0}
                    icon={Bookmark}
                    bgColor="bg-purple-50"
                    iconColor="text-purple-600"
                />
                <StatsCard
                    title="Total Likes"
                    value={stats?.totalLikes || 0}
                    icon={Heart}
                    bgColor="bg-pink-50"
                    iconColor="text-pink-600"
                    trend="up"
                    trendValue="+8%"
                />
                <StatsCard
                    title="Public Lessons"
                    value={stats?.publicLessons || 0}
                    icon={TrendingUp}
                    bgColor="bg-green-50"
                    iconColor="text-green-600"
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        to="/dashboard/add-lesson"
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-md hover:shadow-lg"
                    >
                        <BookOpen className="w-5 h-5" />
                        Add New Lesson
                    </Link>
                    <Link
                        to="/dashboard/my-lessons"
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                    >
                        <BookOpen className="w-5 h-5" />
                        My Lessons
                    </Link>
                    <Link
                        to="/dashboard/my-favorites"
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                    >
                        <Bookmark className="w-5 h-5" />
                        Saved Lessons
                    </Link>
                    <Link
                        to="/dashboard/profile"
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                    >
                        <TrendingUp className="w-5 h-5" />
                        Profile
                    </Link>
                </div>
            </div>

            {/* Recent Lessons */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Recent Lessons</h2>
                    <Link
                        to="/dashboard/my-lessons"
                        className="text-primary-600 hover:text-primary-700 font-semibold"
                    >
                        View All →
                    </Link>
                </div>

                {lessonsLoading ? (
                    <Loading fullScreen={false} />
                ) : recentLessons.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentLessons.map((lesson) => (
                            <LessonCard key={lesson._id} lesson={lesson} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            No lessons yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Create your first life lesson and share with others
                        </p>
                        <Link
                            to="/dashboard/add-lesson"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all"
                        >
                            <BookOpen className="w-5 h-5" />
                            Create Lesson
                        </Link>
                    </div>
                )}
            </div>

            {/* Activity Chart Placeholder */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Weekly Activity</h2>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl">
                    <p className="text-gray-600">Chart coming soon...</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
