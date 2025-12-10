import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bookmark } from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/ui/Loading';
import LessonCard from '../../components/lessons/LessonCard';

const MyFavorites = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [category, setCategory] = useState('');
    const [emotionalTone, setEmotionalTone] = useState('');

    const { data: favorites = [], isLoading } = useQuery({
        queryKey: ['my-favorites', category, emotionalTone],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (category) params.append('category', category);
            if (emotionalTone) params.append('emotionalTone', emotionalTone);

            const res = await axiosSecure.get(`/lessons/favorites?${params}`);
            return res.data;
        },
    });

    const removeFavoriteMutation = useMutation({
        mutationFn: async (lessonId) => {
            await axiosSecure.delete(`/lessons/favorites/${lessonId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['my-favorites']);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'ফেভারিট থেকে সরানো হয়েছে',
                showConfirmButton: false,
                timer: 2000,
            });
        },
    });

    const categories = ['সব', 'ব্যক্তিগত উন্নতি', 'ক্যারিয়ার', 'সম্পর্ক', 'মানসিকতা', 'ভুল থেকে শিক্ষা'];
    const emotionalTones = ['সব', 'প্রেরণাদায়ক', 'বেদনা', 'উপলব্ধি', 'কৃতজ্ঞতা'];

    console.log('Favorites from API:', favorites);
    if (isLoading) return <Loading />;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 bangla-text mb-2">সেভ করা লেসন</h1>
                <p className="text-gray-600 bangla-text">মোট {favorites.length}টি লেসন সেভ করা আছে</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                            ক্যাটাগরি
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value === 'সব' ? '' : e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                            ইমোশনাল টোন
                        </label>
                        <select
                            value={emotionalTone}
                            onChange={(e) => setEmotionalTone(e.target.value === 'সব' ? '' : e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text"
                        >
                            {emotionalTones.map((tone) => (
                                <option key={tone} value={tone}>{tone}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Favorites Grid */}
            {/* Favorites Grid */}
            {favorites?.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                    <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 bangla-text mb-2">
                        কোনো সেভ করা লেসন নেই
                    </h3>
                    <p className="text-gray-600 bangla-text">
                        আপনার পছন্দের লেসনগুলো সেভ করুন এবং পরে পড়ুন
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((fav) => {
                        // Handle both structures: wrapping object with .lesson OR direct lesson object
                        const lessonData = fav.lesson || fav;

                        // Skip if no valid lesson data found
                        if (!lessonData || !lessonData._id) return null;

                        return (
                            <div key={fav._id || lessonData._id} className="relative">
                                <LessonCard lesson={lessonData} />
                                <button
                                    onClick={() => removeFavoriteMutation.mutate(lessonData._id)}
                                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-md"
                                >
                                    <Bookmark className="w-4 h-4 fill-current" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyFavorites;
