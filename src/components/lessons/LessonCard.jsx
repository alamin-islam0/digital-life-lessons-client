import { Heart, Bookmark, Eye, Lock, Calendar, User, ArrowRight, Star } from "lucide-react";
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
  const categoryColors = {
    "Personal Development": "bg-primary/10 text-primary border-primary/20",
    Career: "bg-secondary/10 text-secondary border-secondary/20",
    Relationships: "bg-accent/10 text-accent border-accent/20",
    Mindset: "bg-info/10 text-info border-info/20",
    "Learning from Mistakes": "bg-warning/10 text-warning-content border-warning/20",
  };

  // Emotional tone colors
  const toneColors = {
    Motivational: "bg-success/10 text-success border-success/20",
    Sadness: "bg-neutral/10 text-neutral-content border-neutral/20",
    Realization: "bg-primary/5 text-primary border-primary/20",
    Gratitude: "bg-secondary/5 text-secondary border-secondary/20",
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 overflow-hidden group h-[520px] flex flex-col border border-gray-100 dark:border-gray-700 dark:border-gray-700 hover:border-primary/20 dark:hover:border-primary/40 ${
        showBlur ? "relative" : ""
      }`}
    >
      {/* Premium Lock Overlay */}
      {showBlur && isPremium && (
        <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-20 flex items-center justify-center">
          <div className="text-center p-8 max-w-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white mb-2">
              Premium Content
            </h3>
            <p className="text-gray-600 dark:text-gray-300 dark:text-gray-300 mb-6">
              Unlock this lesson and thousands more with Premium
            </p>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              <Star className="w-5 h-5" />
              Upgrade Now
            </Link>
          </div>
        </div>
      )}

      <div
        className={`flex flex-col h-full ${
          showBlur && isPremium ? "blur-sm" : ""
        }`}
      >
        {/* Image Section with Overlay */}
        <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {image ? (
            <>
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              {/* Premium Badge on Image */}
              {isPremium && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-xs font-bold shadow-lg premium-glow">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Premium
                  </div>
                </div>
              )}

              {/* Category Badge on Image */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md bg-white/90 border ${
                    categoryColors[category] || "bg-white/90 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {category}
                </span>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <Eye className="w-12 h-12 text-gray-300" />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Emotional Tone Badge */}
          <div className="mb-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                toneColors[emotionalTone] || "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
              }`}
            >
              {emotionalTone}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
            {description}
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700 dark:border-gray-700">
            <UserAvatar user={displayAuthor} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white dark:text-white truncate">
                {displayAuthor.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(createdAt)}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-error transition-colors">
                <Heart className="w-4 h-4" />
                <span className="font-medium">{displayLikesCount}</span>
              </span>
              <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                <Bookmark className="w-4 h-4" />
                <span className="font-medium">{displayFavoritesCount}</span>
              </span>
              <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                <Eye className="w-4 h-4" />
                <span className="font-medium">{views.toLocaleString()}</span>
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to={`/lesson/${_id}`}
            className="group/btn relative overflow-hidden flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="relative z-10">View Details</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
