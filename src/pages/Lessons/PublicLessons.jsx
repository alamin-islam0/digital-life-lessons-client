import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, SlidersHorizontal, X, BookOpen, Sparkles, TrendingUp, Heart } from "lucide-react";
import { Pagination } from "@mui/material";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserPlan from "../../hooks/useUserPlan";
import LessonCard from "../../components/lessons/LessonCard";
import LessonCardSkeleton from "../../components/lessons/LessonCardSkeleton";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { isPremium } = useUserPlan();
  const [searchParams, setSearchParams] = useSearchParams();
  const authorId = searchParams.get("authorId");

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [emotionalTone, setEmotionalTone] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 8;

  const categories = [
    "All",
    "Personal Development",
    "Career",
    "Relationships",
    "Mindset",
    "Learning from Mistakes",
  ];

  const emotionalTones = [
    "All",
    "Motivational",
    "Sadness",
    "Realization",
    "Gratitude",
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "most-saved", label: "Most Saved" },
    { value: "most-liked", label: "Most Liked" },
  ];

  // Fetch all lessons once
  const { data: allLessonsData, isLoading } = useQuery({
    queryKey: ["public-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/public?limit=1000`);
      return res.data;
    },
  });

  const allLessons = allLessonsData?.lessons || [];

  // Filter and Sort Logic
  const processedData = allLessons
    .filter((lesson) => {
      const matchesSearch =
        searchTerm === "" ||
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === "" || category === "All" || lesson.category === category;

      const matchesTone =
        emotionalTone === "" ||
        emotionalTone === "All" ||
        lesson.emotionalTone === emotionalTone;

      const matchesAuthor =
        !authorId ||
        (lesson.creator &&
          (lesson.creator._id === authorId || lesson.creator === authorId));

      return matchesSearch && matchesCategory && matchesTone && matchesAuthor;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "most-liked":
          return (
            (Number(b.likesCount) || b.likes?.length || 0) -
            (Number(a.likesCount) || a.likes?.length || 0)
          );
        case "most-saved":
          return (
            (Number(b.favoritesCount) || b.favorites?.length || 0) -
            (Number(a.favoritesCount) || a.favorites?.length || 0)
          );
        default:
          return 0;
      }
    });

  // Client-side Pagination
  const totalItems = processedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedLessons = processedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasActiveFilters = searchTerm || category || emotionalTone || sortBy !== "newest" || authorId;

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center" data-aos="fade-up">
            <BookOpen className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Explore Life Lessons
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Discover wisdom from real experiences shared by our community
            </p>
            <div className="mt-8 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{allLessons.length}+ Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Free Access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Real Stories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8 -mt-8 relative z-10" data-aos="fade-up">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for lessons, topics, or keywords..."
                className="w-full pl-16 pr-6 py-5 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent shadow-lg text-lg transition-all"
              />
            </div>
          </form>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8" data-aos="fade-up" data-aos-delay="100">
          {/* Filter Toggle Button (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 w-full justify-center px-4 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-xl font-semibold mb-4 hover:from-primary/20 hover:to-secondary/20 transition-all"
          >
            <SlidersHorizontal className="w-5 h-5" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Filters Grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${
              showFilters ? "block" : "hidden md:grid"
            }`}
          >
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat === "All" ? "" : cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Emotional Tone Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-secondary" />
                Emotional Tone
              </label>
              <select
                value={emotionalTone}
                onChange={(e) => {
                  setEmotionalTone(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
              >
                {emotionalTones.map((tone) => (
                  <option key={tone} value={tone === "All" ? "" : tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-semibold text-gray-700">Active Filters:</span>
                {searchTerm && (
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary/20 transition-colors">
                    Search: "{searchTerm}"
                    <X
                      className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => setSearchTerm("")}
                    />
                  </span>
                )}
                {category && (
                  <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium flex items-center gap-2 hover:bg-secondary/20 transition-colors">
                    {category}
                    <X
                      className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => setCategory("")}
                    />
                  </span>
                )}
                {emotionalTone && (
                  <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium flex items-center gap-2 hover:bg-accent/20 transition-colors">
                    {emotionalTone}
                    <X
                      className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => setEmotionalTone("")}
                    />
                  </span>
                )}
                {authorId && (
                  <span className="px-4 py-2 bg-info/10 text-info rounded-full text-sm font-medium flex items-center gap-2 hover:bg-info/20 transition-colors">
                    Filtered by Author
                    <X
                      className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => setSearchParams({})}
                    />
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCategory("");
                    setEmotionalTone("");
                    setSortBy("newest");
                    setSearchParams({});
                    setPage(1);
                  }}
                  className="ml-auto px-4 py-2 bg-error/10 text-error rounded-full text-sm font-semibold hover:bg-error hover:text-white transition-all"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6 flex items-center justify-between" data-aos="fade-up" data-aos-delay="200">
            <p className="text-gray-600">
              Showing <span className="font-bold text-gray-900">{paginatedLessons.length}</span> of{" "}
              <span className="font-bold text-gray-900">{totalItems}</span> lessons
            </p>
            {totalPages > 1 && (
              <p className="text-sm text-gray-500">
                Page {page} of {totalPages}
              </p>
            )}
          </div>
        )}

        {/* Lessons Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {[...Array(8)].map((_, index) => (
              <LessonCardSkeleton key={index} />
            ))}
          </div>
        ) : paginatedLessons.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {paginatedLessons.map((lesson, index) => (
                <div
                  key={lesson._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <LessonCard
                    lesson={lesson}
                    showBlur={lesson.accessLevel === "premium" && !isPremium}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center" data-aos="fade-up">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                  sx={{
                    "& .MuiPaginationItem-root": {
                      fontSize: "1rem",
                      fontWeight: 600,
                    },
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg" data-aos="fade-up">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              No Lessons Found
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              We couldn't find any lessons matching your criteria. Try adjusting your filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setCategory("");
                setEmotionalTone("");
                setSortBy("newest");
                setSearchParams({});
                setPage(1);
              }}
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;
