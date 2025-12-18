import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  BookOpen,
  Heart,
  Users,
  TrendingUp,
  Lightbulb,
  Brain,
  Target,
  Sparkles,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useUserPlan from "../../hooks/useUserPlan";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonCard from "../../components/lessons/LessonCard";
import SectionHeader from "../../components/ui/SectionHeader";
import Loading from "../../components/ui/Loading";
import UserAvatar from "../../components/ui/UserAvatar";

const Home = () => {
  const { user } = useAuth();
  const { isPremium } = useUserPlan();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Fetch featured lessons
  const { data: featuredLessons = [], isLoading: featuredLoading } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/featured");
      return res.data;
    },
  });

  // Fetch most saved lessons
  const { data: mostSavedData, isLoading: savedLoading } = useQuery({
    queryKey: ["most-saved-lessons"],
    queryFn: async () => {
      // using public endpoint with sort
      const res = await axiosSecure.get(
        "/lessons/public?sort=mostSaved&limit=6"
      );
      return res.data;
    },
  });
  const mostSavedLessons = mostSavedData?.lessons || [];

  // Fetch Top Contributors (Dynamic Calculation)
  const { data: topContributors = [], isLoading: contributorsLoading } =
    useQuery({
      queryKey: ["top-contributors"],
      queryFn: async () => {
        // Fetch 100 recent lessons to calculate "Top Contributors"
        const res = await axiosSecure.get("/lessons/public?limit=100");
        const lessons = res.data.lessons || [];

        // Helper to get author email efficiently
        const getAuthorEmail = (lesson) => {
          if (lesson.creator?.email) return lesson.creator.email;
          if (lesson.createdBy?.email) return lesson.createdBy.email;
          return lesson.creatorEmail || lesson.authorEmail;
        };

        // Helper to get author ID efficiently
        const getAuthorId = (lesson) => {
          if (
            lesson.creator &&
            typeof lesson.creator === "object" &&
            lesson.creator._id
          )
            return lesson.creator._id;
          if (
            lesson.creator &&
            typeof lesson.creator === "string" &&
            !lesson.creator.includes("@")
          )
            return lesson.creator;
          if (
            lesson.createdBy &&
            typeof lesson.createdBy === "object" &&
            lesson.createdBy._id
          )
            return lesson.createdBy._id;
          if (
            lesson.createdBy &&
            typeof lesson.createdBy === "string" &&
            !lesson.createdBy.includes("@")
          )
            return lesson.createdBy;
          return null;
        };

        const authorStats = {};

        lessons.forEach((lesson) => {
          const email = getAuthorEmail(lesson);
          if (!email) return;

          if (!authorStats[email]) {
            authorStats[email] = {
              name: lesson.creatorName || lesson.authorName || "Unknown",
              email: email,
              photoURL:
                lesson.creatorPhoto ||
                lesson.authorPhotoURL ||
                lesson.authorImage,
              count: 0,
              id: getAuthorId(lesson),
            };
          }
          authorStats[email].count++;
        });

        // Return top 4 contributors
        return Object.values(authorStats)
          .sort((a, b) => b.count - a.count)
          .slice(0, 4);
      },
    });
  const heroSlides = [
    {
      title: "Write down life lessons",
      subtitle: "Learn from every experience and share with others",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2573&auto=format&fit=crop",
    },
    {
      title: "Learn from past mistakes",
      subtitle: "Your experience can be a guide for others",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: "Get inspiration from everyone's lessons",
      subtitle: "Thousands of life experiences in one place",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
    },
  ];

  const benefits = [
    {
      icon: Brain,
      title: "Helps to understand yourself",
      description:
        "Writing down your thoughts and feelings helps you understand yourself better",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Lightbulb,
      title: "Learning from past mistakes",
      description: "Write down life mistakes so you don't repeat them",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Target,
      title: "Increase mental clarity",
      description: "Regular writing reduces stress and increases clarity",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Users,
      title: "Guideline from others' experience",
      description: "Find your path from experiences shared by others",
      color: "from-purple-500 to-purple-600",
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
              <div
                className="h-full relative flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                <div
                  className="max-w-4xl mx-auto text-center text-white relative z-10"
                  data-aos="zoom-in"
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p
                    className="text-xl md:text-2xl mb-8 opacity-90 drop-shadow-md"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    {slide.subtitle}
                  </p>
                  <div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <Link
                      to={user ? "/dashboard/add-lesson" : "/register"}
                      className="px-8 py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl border border-transparent hover:scale-105"
                    >
                      Start writing lessons
                    </Link>
                    <Link
                      to="/public-lessons"
                      className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-xl font-bold hover:bg-white/30 transition-all border-2 border-white/50 hover:border-white hover:scale-105"
                    >
                      View all lessons
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
          <div data-aos="fade-down">
            <SectionHeader
              title="Featured Life Lessons"
              subtitle="Check out our best and popular lessons"
            />
          </div>

          {featuredLoading ? (
            <Loading fullScreen={false} />
          ) : featuredLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredLessons.slice(0, 6).map((lesson, index) => (
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
            <div className="text-center py-12" data-aos="fade-up">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No featured lessons yet</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-down">
            <SectionHeader
              title="Why is learning from life important?"
              subtitle="Benefits of writing down your experience"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                data-aos="flip-left"
                data-aos-delay={index * 150}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 group"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
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
          <div data-aos="fade-down">
            <SectionHeader
              title="Most Saved Lessons"
              subtitle="Lessons that most people have saved"
            />
          </div>

          {savedLoading ? (
            <Loading fullScreen={false} />
          ) : mostSavedLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mostSavedLessons.slice(0, 6).map((lesson, index) => (
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
            <div className="text-center py-12" data-aos="fade-up">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No saved lessons yet</p>
            </div>
          )}

          <div
            className="text-center mt-10"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <Link
              to="/public-lessons"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-5 h-5" />
              View More Lessons
            </Link>
          </div>
        </div>
      </section>

      {/* Top Contributors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-down">
            <SectionHeader
              title="Top Contributors of the Week"
              subtitle="Recognizing our most active community members"
            />
          </div>

          {contributorsLoading ? (
            <Loading fullScreen={false} />
          ) : topContributors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topContributors.map((w, index) => (
                <div
                  key={w.email || index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all"
                >
                  <div className="mb-4 transform hover:scale-110 transition-transform duration-300">
                    <UserAvatar user={w} size="lg" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {w.name}
                  </h3>
                  <p className="text-primary-600 font-medium text-sm mb-3">
                    {w.count} Lessons
                  </p>

                  {w.id && !w.id.includes("@") ? (
                    <Link
                      to={`/author/${w.id}`}
                      className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
                    >
                      View Profile
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400">
                      Community Member
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12" data-aos="fade-up">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No active contributors this week</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
