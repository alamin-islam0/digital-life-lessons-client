import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { User, Mail, Save, Star } from 'lucide-react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { uploadImage } from '../../utils/imageUpload';
import UserAvatar from '../../components/ui/UserAvatar';
import LessonCard from '../../components/lessons/LessonCard';
import Loading from '../../components/ui/Loading';

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isEditing, setIsEditing] = useState(false);

    // Fetch user stats & role
    const { data: dbUser, isLoading } = useQuery({
        queryKey: ['user-profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/me');
            return res.data;
        },
    });

    // Fetch user's public lessons
    const { data: myLessons = [] } = useQuery({
        queryKey: ['my-public-lessons', dbUser?._id],
        queryFn: async () => {
            if (!dbUser?._id) return [];
            const res = await axiosSecure.get(`/lessons/author/${dbUser._id}`);
            return res.data || [];
        },
        enabled: !!dbUser?._id,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.displayName || '',
            photoURL: user?.photoURL || '',
        },
    });

    const onSubmit = async (data) => {
        try {
            let photoURL = user?.photoURL;

            // Upload new image if selected
            if (data.image && data.image[0]) {
                const uploadedUrl = await uploadImage(data.image[0]);
                if (uploadedUrl) {
                    photoURL = uploadedUrl;
                }
            }

            // Update Firebase Profile
            await updateUserProfile(data.name, photoURL);

            // Sync Database
            await axiosSecure.post('/users/sync', {
                name: data.name,
                photoURL: photoURL,
                email: user?.email
            });

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Profile updated',
                showConfirmButton: false,
                timer: 2000,
                customClass: {
                    title: 'bangla-text',
                },
            });
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Update failed',
                showConfirmButton: false,
                timer: 3000,
                customClass: {
                    title: 'bangla-text',
                },
            });
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="max-w-6xl mx-auto">
            {/* Profile Header Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-32 md:h-48"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex flex-col md:flex-row items-center md:items-end -mt-16 mb-6 gap-6">
                        <div className="ring-4 ring-white rounded-full bg-white">
                            <UserAvatar user={user} size="xl" className="w-full h-full text-4xl" />
                        </div>

                        <div className="flex-1 text-center md:text-left mb-2">
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">
                                {user?.displayName}
                            </h1>
                            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
                                <Mail className="w-4 h-4" />
                                {user?.email}
                            </p>
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-2">
                            {dbUser?.isPremium && (
                                <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full font-bold shadow-lg flex items-center gap-2 premium-glow">
                                    <Star className="w-5 h-5 fill-current" />
                                    Premium Member
                                </span>
                            )}
                            <span className="px-4 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                                {dbUser?.role === 'admin' ? 'Admin' : 'User'}
                            </span>
                        </div>
                    </div>

                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full md:w-auto px-6 py-2 bg-primary-100 text-primary-700 rounded-lg font-semibold hover:bg-primary-200 transition-colors"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4 bg-gray-50 p-6 rounded-xl">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Profile Picture
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register('image')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                            <p className="text-2xl font-bold text-blue-600">{myLessons.length}</p>
                            <p className="text-gray-600 text-sm">Public Lessons</p>
                        </div>
                        {/* Add more stats if available from backend */}
                    </div>
                </div>
            </div>

            {/* User's Public Lessons */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Public Lessons</h2>
            {myLessons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myLessons.map((lesson) => (
                        <LessonCard key={lesson._id} lesson={lesson} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                    <p className="text-gray-500">No public lessons</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
