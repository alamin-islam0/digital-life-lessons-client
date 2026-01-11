import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import LessonCard from "../../../components/lessons/LessonCard";
import Loading from "../../../components/ui/Loading";

const MostSavedLessons = ({ lessons, isLoading, isPremium }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-base-200 to-base-100 relative overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div data-aos="fade-right">
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm">
              Community Favorites
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 text-base-content">
              Most Saved Lessons
            </h2>
          </div>
          <div data-aos="fade-left">
            <Link
              to="/public-lessons"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-full font-bold hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              View All Lessons
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <Loading fullScreen={false} />
        ) : lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {lessons.slice(0, 6).map((lesson, index) => (
              <div
                key={lesson._id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <LessonCard
                  lesson={lesson}
                  showBlur={lesson.accessLevel === "premium" && !isPremium}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
            <p className="text-base-content/60">No saved lessons to show.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MostSavedLessons;
