import { BookOpen } from "lucide-react";
import LessonCard from "../../../components/lessons/LessonCard";
import Loading from "../../../components/ui/Loading";

const FeaturedLessons = ({ lessons, isLoading, isPremium }) => {
  return (
    <section className="py-24 relative bg-base-200/50">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Editor's Choice
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-base-content">
            Featured Lessons
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"></div>
          <p className="max-w-2xl mx-auto mt-4 text-base-content/70 text-lg">
            Hand-picked stories that inspire, teach, and move us forward.
          </p>
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
          <div className="text-center py-12 bg-base-100 rounded-3xl shadow-sm border border-base-200">
            <BookOpen className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
            <p className="text-base-content/60 text-lg">
              No featured lessons available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedLessons;
