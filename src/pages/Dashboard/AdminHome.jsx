import { useQuery } from '@tanstack/react-query';
import { Users, BookOpen, Flag, TrendingUp, UserPlus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import StatsCard from '../../components/ui/StatsCard';
import Loading from '../../components/ui/Loading';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/stats');
            return res.data;
        },
    });

    // Sample data for charts (replace with real API data if available)
    const chartData = [
        { name: 'Day 1', users: 4, lessons: 2 },
        { name: 'Day 2', users: 7, lessons: 5 },
        { name: 'Day 3', users: 5, lessons: 8 },
        { name: 'Day 4', users: 10, lessons: 12 },
        { name: 'Day 5', users: 15, lessons: 10 },
        { name: 'Day 6', users: 12, lessons: 15 },
        { name: 'Day 7', users: 18, lessons: 20 },
    ];

    if (isLoading) return <Loading />;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 bangla-text">অ্যাডমিন ড্যাশবোর্ড</h1>
                <div className="bg-primary-50 text-primary-700 px-4 py-2 rounded-lg font-semibold bangla-text">
                    আজকের সারাংশ
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="মোট ব্যবহারকারী"
                    value={stats?.totalUsers || 0}
                    icon={Users}
                    bgColor="bg-blue-50"
                    iconColor="text-blue-600"
                />
                <StatsCard
                    title="মোট লেসন"
                    value={stats?.totalLessons || 0}
                    icon={BookOpen}
                    bgColor="bg-green-50"
                    iconColor="text-green-600"
                />
                <StatsCard
                    title="রিপোর্টেড লেসন"
                    value={stats?.reportedLessons || 0}
                    icon={Flag}
                    bgColor="bg-red-50"
                    iconColor="text-red-600"
                />
                <StatsCard
                    title="নতুন লেসন (আজ)"
                    value={stats?.todayLessons || 0}
                    icon={BookOpen}
                    bgColor="bg-purple-50"
                    iconColor="text-purple-600"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* User Growth Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 bangla-text mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary-600" />
                        ব্যবহারকারী বৃদ্ধি (সাপ্তাহিক)
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="users" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorUsers)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Lesson Growth Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 bangla-text mb-6 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-secondary-600" />
                        লেসন বৃদ্ধি (সাপ্তাহিক)
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorLessons" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="lessons" stroke="#d946ef" fillOpacity={1} fill="url(#colorLessons)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
