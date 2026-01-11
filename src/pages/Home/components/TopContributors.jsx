import { Link } from "react-router-dom";
import { Trophy, BookOpen, Users } from "lucide-react";
import UserAvatar from "../../../components/ui/UserAvatar";
import Loading from "../../../components/ui/Loading";

const TopContributors = ({ contributors, isLoading }) => {
  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-semibold text-sm mb-4">
            <Trophy className="w-4 h-4" />
            <span>Weekly Leaderboard</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-base-content">
            Top Contributors
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-base-content/70 text-lg">
            Celebrating the storytellers who inspire our community the most.
          </p>
        </div>

        {isLoading ? (
          <Loading fullScreen={false} />
        ) : contributors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {contributors.map((w, index) => (
              <div
                key={w.email || index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="group relative bg-base-100 rounded-3xl p-6 border border-base-200 hover:border-primary/50 shadow-lg shadow-base-200 hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-sm z-10">
                  #{index + 1}
                </div>

                <div className="mb-6 relative mx-auto w-24 h-24">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-colors duration-300"></div>
                  <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-300">
                    <UserAvatar
                      user={w}
                      size="custom"
                      className="w-24 h-24 text-2xl"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-base-content mb-1 truncate px-2">
                  {w.name}
                </h3>

                <div className="flex items-center justify-center gap-1.5 text-primary text-sm font-medium mb-4 bg-primary/5 py-1 px-3 rounded-full mx-auto w-fit">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{w.count} Lessons</span>
                </div>

                {w.id && !w.id.includes("@") ? (
                  <Link
                    to={`/author/${w.id}`}
                    className="block w-full py-2.5 rounded-xl bg-base-200 text-base-content/70 hover:bg-primary hover:text-white transition-all font-medium text-sm"
                  >
                    View Profile
                  </Link>
                ) : (
                  <button
                    disabled
                    className="block w-full py-2.5 rounded-xl bg-base-200/50 text-base-content/40 cursor-not-allowed text-sm"
                  >
                    Profile Hidden
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
            <p className="text-base-content/60">
              No contributors found details yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopContributors;
