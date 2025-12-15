import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, User, Image } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { uploadImage } from '../../utils/imageUpload';
import Logo from '../../components/ui/Logo';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { registerUser, googleLogin: loginWithGoogle, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch('password');

    const validatePassword = (value) => {
        if (value.length < 6) {
            return 'Password must be at least 6 characters';
        }
        if (!/[A-Z]/.test(value)) {
            return 'Must contain at least 1 uppercase letter';
        }
        if (!/[a-z]/.test(value)) {
            return 'Must contain at least 1 lowercase letter';
        }
        return true;
    };

    const onSubmit = async (data) => {
        try {
            // Upload image to ImgBB
            const imageFile = data.image[0];
            const photoURL = await uploadImage(imageFile);

            // Register with Firebase
            await registerUser(data.email, data.password, data.name, photoURL || 'https://i.ibb.co/5GzXkwq/user.png');

            // Note: AuthProvider handles database sync and profile update automatically

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Registration Successful',
                showConfirmButton: false,
                timer: 2000,
            });

            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: error.message || 'Registration Failed',
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();

            // Note: AuthProvider handles database sync automatically

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Google Registration Successful',
                showConfirmButton: false,
                timer: 2000,
            });

            navigate('/');
        } catch (error) {
            console.error('Google registration error:', error);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Google Registration Failed',
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Illustration/Info */}
                <div className="hidden lg:block">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
                            Join Us Today!
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Share your life experiences and learn with others. Be part of a thriving community.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-2xl">📝</span>
                                </div>
                                <p className="text-gray-700">Create unlimited lessons</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-2xl">🌟</span>
                                </div>
                                <p className="text-gray-700">Learn from thousands of lessons</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-2xl">💎</span>
                                </div>
                                <p className="text-gray-700">Unlock premium features</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Register Form */}
                <div className="w-full">
                    <div className="bg-white rounded-4xl shadow-2xl p-8 sm:p-10">
                        <div className="text-center mb-8">
                            <Logo />
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Register</h2>
                            <p className="text-gray-600">Create a new account</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        {...register('name', {
                                            required: 'Name is required',
                                            minLength: {
                                                value: 2,
                                                message: 'Name must be at least 2 characters',
                                            },
                                        })}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                        placeholder="Your name"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Please enter a valid email',
                                            },
                                        })}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                        placeholder="Your email"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Photo Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Profile Picture
                                </label>
                                <div className="relative">
                                    <Image className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register('image', { required: 'Profile picture is required' })}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                    />
                                </div>
                                {errors.image && (
                                    <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password', {
                                            required: 'Password is required',
                                            validate: validatePassword,
                                        })}
                                        className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                        placeholder="Your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                )}

                                {/* Password Requirements */}
                                {password && (
                                    <div className="mt-2 space-y-1">
                                        <p className={`text-xs ${password.length >= 6 ? 'text-green-600' : 'text-gray-500'}`}>
                                            ✓ At least 6 characters
                                        </p>
                                        <p className={`text-xs ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                                            ✓ 1 uppercase letter
                                        </p>
                                        <p className={`text-xs ${/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                                            ✓ 1 lowercase letter
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl font-bold text-lg hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                Register
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Or</span>
                            </div>
                        </div>

                        {/* Google Login */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                        >
                            <FcGoogle className="w-6 h-6" />
                            Register with Google
                        </button>

                        {/* Login Link */}
                        <p className="mt-6 text-center text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
