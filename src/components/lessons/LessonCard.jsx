import { Heart, Bookmark, Eye, Lock, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import UserAvatar from "../ui/UserAvatar";

const LessonCard = ({ lesson, showBlur = false }) => {
  if (!lesson) return null;

  const {
    _id,
    title,
    description,
    category,
    emotionalTone,
    accessLevel,
    creator,
    image,
    creatorName,
    creatorPhoto,
    creatorEmail,
    createdBy,

    views = Math.floor(Math.random() * 10000),
    createdAt,
  } = lesson;

  // Robust Author Extraction
  const getAuthor = () => {
    if (creator && typeof creator === "object") return creator;
    if (createdBy && typeof createdBy === "object") return createdBy;
    return {
      name: creatorName || lesson.authorName || "Unknown Author",
      photoURL: creatorPhoto || lesson.creatorImage || lesson.authorImage,
      email: creatorEmail,
    };
  };

  const displayAuthor = getAuthor();

  const displayLikesCount =
    Number(lesson.likesCount) || lesson.likes?.length || 0;
  const displayFavoritesCount =
    Number(lesson.favoritesCount) || lesson.favorites?.length || 0;

  const isPremium = accessLevel === "premium";

  // Category badge colors
  // Category badge colors
  const categoryColors = {
    "Personal Development": "bg-primary/10 text-primary",
    Career: "bg-secondary/10 text-secondary",
    Relationships: "bg-accent/10 text-accent",
    Mindset: "bg-info/10 text-info",
    "Learning from Mistakes": "bg-warning/10 text-warning-content", // using warning-content for better contrast if needed, or stick to text-warning
  };

  // Emotional tone colors
  const toneColors = {
    Motivational: "bg-success/10 text-success",
    Sadness: "bg-neutral/10 text-neutral-content",
    Realization: "bg-primary/5 text-primary",
    Gratitude: "bg-secondary/5 text-secondary",
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full ${showBlur ? "relative" : ""
        }`}
    >
      {/* Premium Lock Overlay */}
      {/* Premium Lock Overlay */}
      {showBlur && isPremium && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center p-6">
            <Lock className="w-12 h-12 text-secondary mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Premium Lesson
            </h3>
            <p className="text-gray-600 mb-4">Upgrade to view this lesson</p>
            <Link
              to="/pricing"
              className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      )}

      <div
        className={`flex flex-col h-full ${showBlur && isPremium ? "blur-sm" : ""
          }`}
      >
        {/* Lesson Cover Image */}
        {image && (
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}

        <div className="p-6 flex-1 flex flex-col">
          {/* Header with badges */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex flex-wrap gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[category] || "bg-gray-100 text-gray-700"
                  }`}
              >
                {category}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${toneColors[emotionalTone] || "bg-gray-100 text-gray-700"
                  }`}
              >
                {emotionalTone}
              </span>
            </div>
            {isPremium && (
              <span className="px-3 w-28 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary to-secondary text-white premium-glow">
                ⭐ Premium
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {description}
          </p>

          {/* Creator Info */}
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 mt-auto">
            <UserAvatar user={displayAuthor} size="sm" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {displayAuthor.name}
              </p>
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
                {displayLikesCount}
              </span>
              <span className="flex items-center gap-1">
                <Bookmark className="w-4 h-4" />
                {displayFavoritesCount}
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
            className="block w-full text-center bg-gradient-to-r from-primary to-secondary text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
