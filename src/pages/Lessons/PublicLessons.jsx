import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Pagination } from '@mui/material';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUserPlan from '../../hooks/useUserPlan';
import LessonCard from '../../components/lessons/LessonCard';
import Loading from '../../components/ui/Loading';
import SectionHeader from '../../components/ui/SectionHeader';

const PublicLessons = () => {
    const axiosSecure = useAxiosSecure();
    const { isPremium } = useUserPlan();

    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [emotionalTone, setEmotionalTone] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [page, setPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const limit = 12;

    const categories = [
        'সব',
        'ব্যক্তিগত উন্নতি',
        'ক্যারিয়ার',
        'সম্পর্ক',
        'মানসিকতা',
        'ভুল থেকে শিক্ষা',
    ];

    const emotionalTones = [
        'সব',
        'প্রেরণাদায়ক',
        'বেদনা',
        'উপলব্ধি',
        'কৃতজ্ঞতা',
    ];

    const sortOptions = [
        { value: 'newest', label: 'সর্বশেষ' },
        { value: 'oldest', label: 'পুরাতন' },
        { value: 'most-saved', label: 'সবচেয়ে বেশি সেভড' },
        { value: 'most-liked', label: 'সবচেয়ে বেশি লাইকড' },
    ];

    // Fetch lessons with filters
    const { data, isLoading } = useQuery({
        queryKey: ['public-lessons', searchTerm, category, emotionalTone, sortBy, page],
        queryFn: async () => {
            const params = new URLSearchParams({
                page,
                limit,
                sort: sortBy,
            });

            if (searchTerm) params.append('search', searchTerm);
            if (category && category !== 'সব') params.append('category', category);
            if (emotionalTone && emotionalTone !== 'সব') params.append('emotionalTone', emotionalTone);

            const res = await axiosSecure.get(`/lessons/public?${params}`);
            return res.data;
        },
    });

    const lessons = data?.lessons || [];
    const totalPages = data?.totalPages || 1;

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="পাবলিক লাইফ লেসন"
                    subtitle="সবার শেয়ার করা জীবন অভিজ্ঞতা থেকে শিখুন"
                />

                {/* Filters Bar */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 ">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="mb-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="লেসন খুঁজুন..."
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text"
                            />
                        </div>
                    </form>

                    {/* Filter Toggle Button (Mobile) */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden flex items-center gap-2 w-full justify-center px-4 py-2 bg-gray-100 rounded-lg bangla-text font-medium mb-4"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        ফিল্টার {showFilters ? 'লুকান' : 'দেখান'}
                    </button>

                    {/* Filters */}
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                                ক্যাটাগরি
                            </label>
                            <select
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat === 'সব' ? '' : cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Emotional Tone Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                                ইমোশনাল টোন
                            </label>
                            <select
                                value={emotionalTone}
                                onChange={(e) => {
                                    setEmotionalTone(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text"
                            >
                                {emotionalTones.map((tone) => (
                                    <option key={tone} value={tone === 'সব' ? '' : tone}>
                                        {tone}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                                সাজান
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => {
                                    setSortBy(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {(searchTerm || category || emotionalTone || sortBy !== 'newest') && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {searchTerm && (
                                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm bangla-text">
                                    খোঁজা: {searchTerm}
                                </span>
                            )}
                            {category && (
                                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm bangla-text">
                                    {category}
                                </span>
                            )}
                            {emotionalTone && (
                                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm bangla-text">
                                    {emotionalTone}
                                </span>
                            )}
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setCategory('');
                                    setEmotionalTone('');
                                    setSortBy('newest');
                                    setPage(1);
                                }}
                                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm bangla-text hover:bg-red-200 transition-colors"
                            >
                                সব ফিল্টার মুছুন
                            </button>
                        </div>
                    )}
                </div>

                {/* Lessons Grid */}
                {isLoading ? (
                    <Loading fullScreen={false} />
                ) : lessons.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {lessons.map((lesson) => (
                                <LessonCard
                                    key={lesson._id}
                                    lesson={lesson}
                                    showBlur={lesson.accessLevel === 'premium' && !isPremium}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center">
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="large"
                                    showFirstButton
                                    showLastButton
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            fontFamily: 'Hind Siliguri, sans-serif',
                                        },
                                    }}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16">
                        <Filter className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 bangla-text mb-2">
                            কোনো লেসন পাওয়া যায়নি
                        </h3>
                        <p className="text-gray-600 bangla-text mb-6">
                            আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setCategory('');
                                setEmotionalTone('');
                                setSortBy('newest');
                                setPage(1);
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all bangla-text"
                        >
                            সব ফিল্টার মুছুন
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicLessons;
