import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import {
    BookOpen,
    Heart,
    Users,
    TrendingUp,
    Lightbulb,
    Brain,
    Target,
    Sparkles
} from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LessonCard from '../../components/lessons/LessonCard';
import SectionHeader from '../../components/ui/SectionHeader';
import Loading from '../../components/ui/Loading';
import UserAvatar from '../../components/ui/UserAvatar';

const Home = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch featured lessons
    const { data: featuredLessons = [], isLoading: featuredLoading } = useQuery({
        queryKey: ['featured-lessons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/lessons/featured');
            return res.data;
        },
    });

    // Fetch most saved lessons
    const { data: mostSavedData, isLoading: savedLoading } = useQuery({
        queryKey: ['most-saved-lessons'],
        queryFn: async () => {
            // using public endpoint with sort
            const res = await axiosSecure.get('/lessons/public?sort=mostSaved&limit=6');
            return res.data;
        },
    });
    const mostSavedLessons = mostSavedData?.lessons || [];

    const heroSlides = [
        {
            title: 'জীবনের শেখাগুলো লিখে রাখুন',
            subtitle: 'প্রতিটি অভিজ্ঞতা থেকে শিখুন এবং অন্যদের সাথে শেয়ার করুন',
            gradient: 'from-blue-600 to-purple-600',
        },
        {
            title: 'অতীত ভুল থেকে শিক্ষা নিন',
            subtitle: 'আপনার অভিজ্ঞতা অন্যদের জন্য পথপ্রদর্শক হতে পারে',
            gradient: 'from-purple-600 to-pink-600',
        },
        {
            title: 'সবার লেসন থেকে অনুপ্রেরণা পান',
            subtitle: 'হাজারো মানুষের জীবন অভিজ্ঞতা এক জায়গায়',
            gradient: 'from-pink-600 to-orange-600',
        },
    ];

    const benefits = [
        {
            icon: Brain,
            title: 'নিজেকে বুঝতে সাহায্য করে',
            description: 'আপনার চিন্তাভাবনা এবং অনুভূতি লিখে রাখলে নিজেকে আরও ভালোভাবে বুঝতে পারবেন',
            color: 'from-blue-500 to-blue-600',
        },
        {
            icon: Lightbulb,
            title: 'অতীত ভুল থেকে শেখা',
            description: 'জীবনের ভুলগুলো লিখে রাখুন যাতে একই ভুল আর না হয়',
            color: 'from-yellow-500 to-yellow-600',
        },
        {
            icon: Target,
            title: 'মানসিক স্বচ্ছতা বৃদ্ধি',
            description: 'নিয়মিত লেখার মাধ্যমে মানসিক চাপ কমে এবং স্বচ্ছতা বাড়ে',
            color: 'from-green-500 to-green-600',
        },
        {
            icon: Users,
            title: 'অন্যের অভিজ্ঞতা থেকে গাইডলাইন',
            description: 'অন্যদের শেয়ার করা অভিজ্ঞতা থেকে জীবনের পথ খুঁজে পান',
            color: 'from-purple-500 to-purple-600',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Slider */}
            <section className="relative">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation
                    loop
                    className="h-[500px] md:h-[600px]"
                >
                    {heroSlides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className={`h-full bg-gradient-to-r ${slide.gradient} flex items-center justify-center px-4`}>
                                <div className="max-w-4xl mx-auto text-center text-white">
                                    <h1 className="text-4xl md:text-6xl font-bold bangla-text mb-6 animate-fade-in">
                                        {slide.title}
                                    </h1>
                                    <p className="text-xl md:text-2xl bangla-text mb-8 opacity-90">
                                        {slide.subtitle}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link
                                            to={user ? '/dashboard/add-lesson' : '/register'}
                                            className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all bangla-text shadow-lg hover:shadow-xl"
                                        >
                                            লেসন লিখতে শুরু করুন
                                        </Link>
                                        <Link
                                            to="/public-lessons"
                                            className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-all bangla-text border-2 border-white"
                                        >
                                            সবার লেসন দেখুন
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Featured Lessons */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        title="ফিচার্ড লাইফ লেসন"
                        subtitle="আমাদের সেরা এবং জনপ্রিয় লেসনগুলো দেখুন"
                    />

                    {featuredLoading ? (
                        <Loading fullScreen={false} />
                    ) : featuredLessons.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredLessons.slice(0, 6).map((lesson) => (
                                <LessonCard key={lesson._id} lesson={lesson} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 bangla-text">এখনো কোনো ফিচার্ড লেসন নেই</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        title="কেন জীবন থেকে শেখা গুরুত্বপূর্ণ?"
                        subtitle="আপনার অভিজ্ঞতা লিখে রাখার সুবিধা"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 group"
                            >
                                <div className={`w-14 h-14 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <benefit.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 bangla-text mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 bangla-text text-sm leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Most Saved Lessons */}
            <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader
                        title="সবচেয়ে বেশি সেভ করা লেসন"
                        subtitle="যে লেসনগুলো সবচেয়ে বেশি মানুষ সংরক্ষণ করেছে"
                    />

                    {savedLoading ? (
                        <Loading fullScreen={false} />
                    ) : mostSavedLessons.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mostSavedLessons.slice(0, 6).map((lesson) => (
                                <LessonCard key={lesson._id} lesson={lesson} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 bangla-text">এখনো কোনো সেভ করা লেসন নেই</p>
                        </div>
                    )}

                    <div className="text-center mt-10">
                        <Link
                            to="/public-lessons"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold hover:from-primary-600 hover:to-primary-700 transition-all bangla-text shadow-lg hover:shadow-xl"
                        >
                            <Sparkles className="w-5 h-5" />
                            আরও লেসন দেখুন
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
