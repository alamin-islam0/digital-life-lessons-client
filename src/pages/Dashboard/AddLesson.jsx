import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Save } from 'lucide-react';
import Swal from 'sweetalert2';
import useUserPlan from '../../hooks/useUserPlan';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddLesson = () => {
    const { isPremium } = useUserPlan();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            visibility: 'public',
            accessLevel: 'free',
        },
    });

    const createLessonMutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.post('/lessons', data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['my-lessons']);
            queryClient.invalidateQueries(['user-stats']);

            Swal.fire({
                icon: 'success',
                title: 'সফল!',
                text: 'লেসন সফলভাবে তৈরি হয়েছে',
                confirmButtonText: 'ধন্যবাদ',
                customClass: {
                    title: 'bangla-text',
                    htmlContainer: 'bangla-text',
                    confirmButton: 'bangla-text',
                },
            });

            reset();
            navigate('/dashboard/my-lessons');
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'ত্রুটি!',
                text: error.message || 'লেসন তৈরি করতে সমস্যা হয়েছে',
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
        console.log('SUBMIT DATA:', data); // 👈 see if form actually submits
        createLessonMutation.mutate(data);
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

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 bangla-text">নতুন লেসন তৈরি করুন</h1>
                        <p className="text-gray-600 bangla-text">আপনার জীবনের অভিজ্ঞতা শেয়ার করুন</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                            শিরোনাম <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register('title', {
                                required: 'শিরোনাম আবশ্যক',
                                minLength: {
                                    value: 5,
                                    message: 'শিরোনাম কমপক্ষে ৫ অক্ষরের হতে হবে',
                                },
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text"
                            placeholder="আপনার লেসনের শিরোনাম লিখুন"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600 bangla-text">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                            বিস্তারিত বর্ণনা <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            {...register('description', {
                                required: 'বর্ণনা আবশ্যক',
                                minLength: {
                                    value: 20,
                                    message: 'বর্ণনা কমপক্ষে ২০ অক্ষরের হতে হবে',
                                },
                            })}
                            rows="8"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text resize-none"
                            placeholder="আপনার লাইফ লেসন বিস্তারিত লিখুন..."
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600 bangla-text">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Category & Emotional Tone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                                ক্যাটাগরি <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register('category', { required: 'ক্যাটাগরি নির্বাচন করুন' })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text"
                            >
                                <option value="">নির্বাচন করুন</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
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
                                <option value="">নির্বাচন করুন</option>
                                {emotionalTones.map((tone) => (
                                    <option key={tone} value={tone}>
                                        {tone}
                                    </option>
                                ))}
                            </select>
                            {errors.emotionalTone && (
                                <p className="mt-1 text-sm text-red-600 bangla-text">{errors.emotionalTone.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                            ছবির লিংক (ঐচ্ছিক)
                        </label>
                        <input
                            type="url"
                            {...register('image', {
                                pattern: {
                                    value: /^https?:\/\/.+/,
                                    message: 'সঠিক URL লিখুন',
                                },
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-600 bangla-text">{errors.image.message}</p>
                        )}
                    </div>

                    {/* Visibility & Access Level */}
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
                                title={!isPremium ? 'প্রিমিয়াম লেসন তৈরি করতে আপগ্রেড করুন' : ''}
                            >
                                <option value="free">ফ্রি</option>
                                <option value="premium" disabled={!isPremium}>
                                    প্রিমিয়াম {!isPremium && '(আপগ্রেড প্রয়োজন)'}
                                </option>
                            </select>
                            {!isPremium && (
                                <p className="mt-1 text-sm text-yellow-600 bangla-text">
                                    💎 প্রিমিয়াম লেসন তৈরি করতে আপগ্রেড করুন
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={createLessonMutation.isPending}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold text-lg hover:from-primary-600 hover:to-primary-700 transition-all bangla-text shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-5 h-5" />
                            {createLessonMutation.isPending ? 'তৈরি হচ্ছে...' : 'লেসন তৈরি করুন'}
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

export default AddLesson;
