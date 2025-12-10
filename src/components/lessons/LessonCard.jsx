import { Heart, Bookmark, Eye, Lock, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserAvatar from '../ui/UserAvatar';

const LessonCard = ({ lesson, showBlur = false }) => {
    const {
        _id,
        title,
        description,
        category,
        emotionalTone,
        accessLevel,
        creator,
        likesCount = 0,
        favoritesCount = 0,
        views = Math.floor(Math.random() * 10000),
        createdAt,
    } = lesson;

    const isPremium = accessLevel === 'premium';

    // Category badge colors
    const categoryColors = {
        'ব্যক্তিগত উন্নতি': 'bg-blue-100 text-blue-700',
        'ক্যারিয়ার': 'bg-green-100 text-green-700',
        'সম্পর্ক': 'bg-pink-100 text-pink-700',
        'মানসিকতা': 'bg-purple-100 text-purple-700',
        'ভুল থেকে শিক্ষা': 'bg-orange-100 text-orange-700',
    };

    // Emotional tone colors
    const toneColors = {
        'প্রেরণাদায়ক': 'bg-yellow-100 text-yellow-700',
        'বেদনা': 'bg-gray-100 text-gray-700',
        'উপলব্ধি': 'bg-indigo-100 text-indigo-700',
        'কৃতজ্ঞতা': 'bg-teal-100 text-teal-700',
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group ${showBlur ? 'relative' : ''}`}>
            {/* Premium Lock Overlay */}
            {showBlur && isPremium && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="text-center p-6">
                        <Lock className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-gray-900 bangla-text mb-2">প্রিমিয়াম লেসন</h3>
                        <p className="text-gray-600 bangla-text mb-4">এই লেসনটি দেখতে আপগ্রেড করুন</p>
                        <Link
                            to="/pricing"
                            className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all"
                        >
                            আপগ্রেড করুন
                        </Link>
                    </div>
                </div>
            )}

            <div className={`p-6 ${showBlur && isPremium ? 'blur-sm' : ''}`}>
                {/* Header with badges */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold bangla-text ${categoryColors[category] || 'bg-gray-100 text-gray-700'}`}>
                            {category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold bangla-text ${toneColors[emotionalTone] || 'bg-gray-100 text-gray-700'}`}>
                            {emotionalTone}
                        </span>
                    </div>
                    {isPremium && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-white premium-glow">
                            ⭐ প্রিমিয়াম
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 bangla-text mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 bangla-text text-sm mb-4 line-clamp-3">
                    {description}
                </p>

                {/* Creator Info */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                    <UserAvatar user={creator} size="sm" />
                    <div>
                        <p className="text-sm font-medium text-gray-900 bangla-text">{creator?.name || creator?.displayName}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(createdAt)}
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {likesCount}
                        </span>
                        <span className="flex items-center gap-1">
                            <Bookmark className="w-4 h-4" />
                            {favoritesCount}
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {views}
                        </span>
                    </div>
                </div>

                {/* CTA Button */}
                <Link
                    to={`/lesson/${_id}`}
                    className="block w-full text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2.5 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all bangla-text"
                >
                    বিস্তারিত দেখুন
                </Link>
            </div>
        </div>
    );
};

export default LessonCard;
