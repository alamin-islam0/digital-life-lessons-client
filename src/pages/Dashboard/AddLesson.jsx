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
                title: 'Success!',
                text: 'Lesson created successfully',
                confirmButtonText: 'Thank you',
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
                title: 'Error!',
                text: error.message || 'Failed to create lesson',
                confirmButtonText: 'Okay',
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
        'Personal Development',
        'Career',
        'Relationships',
        'Mindset',
        'Learning from Mistakes',
    ];

    const emotionalTones = [
        'Motivational',
        'Sadness',
        'Realization',
        'Gratitude',
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
                        <h1 className="text-3xl font-bold text-gray-900">Create New Lesson</h1>
                        <p className="text-gray-600">Share your life experience</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register('title', {
                                required: 'Title is required',
                                minLength: {
                                    value: 5,
                                    message: 'Title must be at least 5 characters',
                                },
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Enter your lesson title"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Detailed Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            {...register('description', {
                                required: 'Description is required',
                                minLength: {
                                    value: 20,
                                    message: 'Description must be at least 20 characters',
                                },
                            })}
                            rows="8"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            placeholder="Write your life lesson details..."
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Category & Emotional Tone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register('category', { required: 'Select Category' })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="">Select</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Emotional Tone <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register('emotionalTone', { required: 'Select Tone' })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="">Select</option>
                                {emotionalTones.map((tone) => (
                                    <option key={tone} value={tone}>
                                        {tone}
                                    </option>
                                ))}
                            </select>
                            {errors.emotionalTone && (
                                <p className="mt-1 text-sm text-red-600">{errors.emotionalTone.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Image Link (Optional)
                        </label>
                        <input
                            type="url"
                            {...register('image', {
                                pattern: {
                                    value: /^https?:\/\/.+/,
                                    message: 'Enter valid URL',
                                },
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                        )}
                    </div>

                    {/* Visibility & Access Level */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Privacy
                            </label>
                            <select
                                {...register('visibility')}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 bangla-text mb-2">
                                Access Level
                            </label>
                            <select
                                {...register('accessLevel')}
                                disabled={!isPremium}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bangla-text disabled:bg-gray-100 disabled:cursor-not-allowed"
                                title={!isPremium ? 'Upgrade to create premium lessons' : ''}
                            >
                                <option value="free">Free</option>
                                <option value="premium" disabled={!isPremium}>
                                    Premium {!isPremium && '(Upgrade Required)'}
                                </option>
                            </select>
                            {!isPremium && (
                                <p className="mt-1 text-sm text-yellow-600 bangla-text">
                                    💎 Upgrade to create premium lessons
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
                            {createLessonMutation.isPending ? 'Creating...' : 'Create Lesson'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard/my-lessons')}
                            className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all bangla-text"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLesson;
