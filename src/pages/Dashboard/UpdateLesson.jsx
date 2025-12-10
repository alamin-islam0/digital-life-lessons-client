import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BookOpen, Save } from 'lucide-react';
import Swal from 'sweetalert2';
import useUserPlan from '../../hooks/useUserPlan';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/ui/Loading';

const UpdateLesson = () => {
    const { id } = useParams();
    const { isPremium } = useUserPlan();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: lesson, isLoading } = useQuery({
        queryKey: ['lesson', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/lessons/${id}`);
            return res.data;
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        if (lesson) {
            reset({
                title: lesson.title,
                description: lesson.description,
                category: lesson.category,
                emotionalTone: lesson.emotionalTone,
                image: lesson.image || '',
                visibility: lesson.visibility,
                accessLevel: lesson.accessLevel,
            });
        }
    }, [lesson, reset]);

    const updateLessonMutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.patch(`/lessons/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['my-lessons']);
            queryClient.invalidateQueries(['lesson', id]);

            Swal.fire({
                icon: 'success',
                title: 'সফল!',
                text: 'লেসন সফলভাবে আপডেট হয়েছে',
                confirmButtonText: 'ধন্যবাদ',
                customClass: {
                    title: 'bangla-text',
                    htmlContainer: 'bangla-text',
                    confirmButton: 'bangla-text',
                },
            });

            navigate('/dashboard/my-lessons');
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'ত্রুটি!',
                text: error.message || 'লেসন আপডেট করতে সমস্যা হয়েছে',
                confirmButtonText: 'ঠিক আছে',
                customClass: {
                    title: 'bangla-text',
                    htmlContainer: 'bangla-text',
                    confirmButton: 'bangla-text',
                },
            });
        },
    });

    const onSubmit = (data) => {
        updateLessonMutation.mutate(data);
    };

    const categories = [
        'ব্যক্তিগত উন্নতি',
        'ক্যারিয়ার',
        'সম্পর্ক',
        'মানসিকতা',
        'ভুল থেকে শিক্ষা',
    ];

    const emotionalTones = [
        'প্রেরণাদায়ক',
        'বেদনা',
        'উপলব্ধি',
        'কৃতজ্ঞতা',
    ];

    if (isLoading) return <Loading />;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 bangla-text">লেসন আপডেট করুন</h1>
                        <p className="text-gray-600 bangla-text">আপনার লেসন সম্পাদনা করুন</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                            শিরোনাম <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register('title', {
                                required: 'শিরোনাম আবশ্যক',
                                minLength: { value: 5, message: 'শিরোনাম কমপক্ষে ৫ অক্ষরের হতে হবে' },
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600 bangla-text">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                            বিস্তারিত বর্ণনা <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            {...register('description', {
                                required: 'বর্ণনা আবশ্যক',
                                minLength: { value: 20, message: 'বর্ণনা কমপক্ষে ২০ অক্ষরের হতে হবে' },
                            })}
                            rows="8"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text resize-none"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600 bangla-text">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                                ক্যাটাগরি <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register('category', { required: 'ক্যাটাগরি নির্বাচন করুন' })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-red-600 bangla-text">{errors.category.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                                ইমোশনাল টোন <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register('emotionalTone', { required: 'টোন নির্বাচন করুন' })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text"
                            >
                                {emotionalTones.map((tone) => (
                                    <option key={tone} value={tone}>{tone}</option>
                                ))}
                            </select>
                            {errors.emotionalTone && (
                                <p className="mt-1 text-sm text-red-600 bangla-text">{errors.emotionalTone.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                            ছবির লিংক (ঐচ্ছিক)
                        </label>
                        <input
                            type="url"
                            {...register('image', {
                                pattern: { value: /^https?:\/\/.+/, message: 'সঠিক URL লিখুন' },
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-600 bangla-text">{errors.image.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                                প্রাইভেসি
                            </label>
                            <select
                                {...register('visibility')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text"
                            >
                                <option value="public">পাবলিক</option>
                                <option value="private">প্রাইভেট</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                                অ্যাক্সেস লেভেল
                            </label>
                            <select
                                {...register('accessLevel')}
                                disabled={!isPremium}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="free">ফ্রি</option>
                                <option value="premium" disabled={!isPremium}>
                                    প্রিমিয়াম {!isPremium && '(আপগ্রেড প্রয়োজন)'}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={updateLessonMutation.isPending}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold text-lg hover:from-primary-600 hover:to-primary-700 transition-all bangla-text shadow-lg hover:shadow-xl disabled:opacity-50"
                        >
                            <Save className="w-5 h-5" />
                            {updateLessonMutation.isPending ? 'আপডেট হচ্ছে...' : 'আপডেট করুন'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard/my-lessons')}
                            className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all bangla-text"
                        >
                            বাতিল
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateLesson;
