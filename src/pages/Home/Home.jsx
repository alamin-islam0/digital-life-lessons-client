import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  BookOpen,
  Users,
  Lightbulb,
  Brain,
  Target,
  Sparkles,
  ArrowRight,
  Star,
  Trophy,
  Heart,
  Globe,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
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
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
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
      const res = await axiosSecure.get(
        "/lessons/public?sort=mostSaved&limit=6"
      );
      return res.data;
    },
  });
  const mostSavedLessons = mostSavedData?.lessons || [];

  const { data: topContributors = [], isLoading: contributorsLoading } =
    useQuery({
      queryKey: ["top-contributors"],
      queryFn: async () => {
        const res = await axiosSecure.get("/lessons/public?limit=100");
        const lessons = res.data.lessons || [];

        const getAuthorEmail = (lesson) => {
          if (lesson.creator?.email) return lesson.creator.email;
          if (lesson.createdBy?.email) return lesson.createdBy.email;
          return lesson.creatorEmail || lesson.authorEmail;
        };

        const getAuthorId = (lesson) => {
          if (lesson.creator?._id) return lesson.creator._id;
          if (typeof lesson.creator === "string" && !lesson.creator.includes("@"))
            return lesson.creator;
          if (lesson.createdBy?._id) return lesson.createdBy._id;
          if (
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

        return Object.values(authorStats)
          .sort((a, b) => b.count - a.count)
          .slice(0, 4);
      },
    });

  const heroSlides = [
    {
      title: "Share Your Wisdom",
      subtitle:
        "Every experience teaches a lesson. Share yours and inspire the world.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
      color: "from-blue-600 to-cyan-500",
    },
    {
      title: "Learn & Grow",
      subtitle:
        "Discover life lessons from people across the globe. Avoid mistakes, seek truth.",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2573&auto=format&fit=crop",
      color: "from-purple-600 to-pink-500",
    },
    {
      title: "Leave a Legacy",
      subtitle: "Your words can guide someone long after you've written them.",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop",
      color: "from-amber-500 to-orange-600",
    },
  ];

  const benefits = [
    {
      icon: Brain,
      title: "Self-Reflection",
      description:
        "Writing clarifies your thoughts and helps you understand your own journey.",
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      icon: Lightbulb,
      title: "Avoid Mistakes",
      description:
        "Learn from the experiences of others to navigate life's challenges.",
      color: "text-yellow-500",
      bg: "bg-yellow-50",
      border: "border-yellow-100",
    },
    {
      icon: Target,
      title: "Mental Clarity",
      description:
        "Regular documentation of lessons reduces stress and sharpens focus.",
      color: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-100",
    },
    {
      icon: Users,
      title: "Community Wisdom",
      description:
        "Connect with a community dedicated to growth and shared knowledge.",
      color: "text-purple-500",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
  ];

  /* Data for New Sections */
  const stats = [
    { label: "Active Writers", value: "2K+", icon: Users, color: "text-blue-400" },
    { label: "Lessons Shared", value: "15K+", icon: BookOpen, color: "text-purple-400" },
    { label: "Lives Impacted", value: "50K+", icon: Heart, color: "text-red-400" },
    { label: "Countries", value: "85+", icon: Globe, color: "text-green-400" },
  ];

  const categories = [
    { name: "Personal Development", image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=500" },
    { name: "Career Growth", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500" },
    { name: "Relationships", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=500" },
    { name: "Mental Health", image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=500" },
    { name: "Financial Freedom", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=500" },
    { name: "Travel & Adventure", image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=500" },
  ];

  const steps = [
    { number: "01", title: "Sign Up", desc: "Create your free account to join the community." },
    { number: "02", title: "Write", desc: "Share your life lesson using our simple editor." },
    { number: "03", title: "Share", desc: "Publish your story to inspire others worldwide." },
    { number: "04", title: "Earn", desc: "Gain recognition and badges for your contribution." },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Teacher",
      text: "Writing my lessons here has been therapeutic. I realized how much I've grown.",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
      name: "Michael Chen",
      role: "Entrepreneur",
      text: "I read one lesson every morning. It helps me stay grounded and focused.",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
      name: "Emma Wilson",
      role: "Student",
      text: "The community is so supportive. I feel safe sharing my failures and learnings.",
      image: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    },
  ];

  const faqs = [
    { q: "Is it free to write lessons?", a: "Yes! You can write and share open lessons completely for free." },
    { q: "Can I remain anonymous?", a: "Absolutely. You can choose to publish under a pseudonym." },
    { q: "What topics are allowed?", a: "Any life lesson that provides value is welcome, as long as it follows our community guidelines." },
    { q: "How do I become a top contributor?", a: "Write regularly and engage with the community. Quality lessons get more saves and interactions." },
  ];

  return (
    <div className="min-h-screen bg-base-100 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          speed={1000}
          slidesPerView={1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
          }}
          navigation={false} // clean look without arrows
          loop
          className="h-full w-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                {/* Background Image with Zoom Effect */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear scale-100 hover:scale-110"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    animation: "slowZoom 20s infinite alternate",
                  }}
                />
                {/* Modern Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-black/20"></div>

                {/* Content */}
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                  <div className="max-w-3xl space-y-6">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium w-fit"
                      data-aos="fade-down"
                    >
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      <span>Digital Life Lessons</span>
                    </div>

                    <h1
                      className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight drop-shadow-xl"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      {slide.title.split(" ")[0]}{" "}
                      <span
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.color}`}
                      >
                        {slide.title.split(" ").slice(1).join(" ")}
                      </span>
                    </h1>

                    <p
                      className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl leading-relaxed"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      {slide.subtitle}
                    </p>

                    <div
                      className="flex flex-col sm:flex-row gap-4 pt-4"
                      data-aos="fade-up"
                      data-aos-delay="300"
                    >
                      <Link
                        to={user ? "/dashboard/add-lesson" : "/register"}
                        className={`group px-8 py-4 bg-gradient-to-r ${slide.color} text-white rounded-full font-bold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2`}
                      >
                        Start Writing
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        to="/public-lessons"
                        className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold hover:bg-white/20 transition-all duration-300 border border-white/30 flex items-center justify-center"
                      >
                        Explore Lessons
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* NEW SECTION 1: Statistics Strip */}
      <section className="py-12 bg-neutral-900 border-b border-neutral-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-neutral-800">
            {stats.map((stat, index) => (
              <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="p-4">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <h3 className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</h3>
                <p className="text-neutral-400 text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lessons Section */}
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

          {featuredLoading ? (
            <Loading fullScreen={false} />
          ) : featuredLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="text-center py-12 bg-base-100 rounded-3xl shadow-sm border border-base-200">
              <BookOpen className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
              <p className="text-base-content/60 text-lg">
                No featured lessons available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* NEW SECTION 2: How It Works (Process) */}
      <section className="py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-down">
             <h2 className="text-4xl font-bold text-base-content">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
             <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
             {steps.map((step, idx) => (
               <div key={idx} className="relative z-10 bg-base-100 p-4 rounded-xl text-center" data-aos="fade-up" data-aos-delay={idx * 150}>
                  <div className="w-24 h-24 mx-auto mb-6 bg-primary text-white text-3xl font-bold flex items-center justify-center rounded-full border-8 border-base-100 shadow-xl">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-500">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Benefits / Why Us Section - Bento Grid Style */}
      <section className="py-24 bg-gradient-to-b from-base-100 to-amber-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-down">
            <h2 className="text-4xl md:text-5xl font-bold text-base-content">
              Why Write It Down?
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-base-content/70 text-lg">
              Transforming your experiences into words is a powerful tool for
              growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`group relative p-8 rounded-3xl ${benefit.bg} ${benefit.border} border-2 hover:shadow-xl hover:shadow-${benefit.color.split("-")[1]}-500/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-125 duration-500">
                  <benefit.icon className={`w-32 h-32 ${benefit.color}`} />
                </div>
                
                <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className={`w-7 h-7 ${benefit.color}`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 3: Popular Categories/Topics */}
      <section className="py-24 bg-black text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white">Explore Topics</h2>
              <p className="text-gray-400 mt-4">Dive into the lessons that matter to you most.</p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
             {categories.map((cat, idx) => (
               <div key={idx} className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer" data-aos="zoom-in" data-aos-delay={idx * 50}>
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center p-2 text-center">
                     <span className="font-bold text-sm md:text-base">{cat.name}</span>
                  </div>
               </div>
             ))}
           </div>
           <div className="text-center mt-12">
              <Link to="/public-lessons" className="text-primary-400 font-semibold hover:text-white transition-colors">View All Categories &rarr;</Link>
           </div>
         </div>
      </section>

      {/* Most Saved / Popular Section */}
      <section className="py-24 bg-gradient-to-b from-base-200 to-base-100 relative overflow-hidden">
         {/* Abstract shapes */}
         <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2"></div>
         <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
             <div data-aos="fade-right">
                <span className="text-secondary font-semibold tracking-wider uppercase text-sm">Community Favorites</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2 text-base-content">
                  Most Saved Lessons
                </h2>
             </div>
             <div data-aos="fade-left">
                <Link to="/public-lessons" className="btn btn-outline btn-secondary rounded-full px-8 hover:scale-105 transition-transform">
                    View All Lessons
                </Link>
             </div>
          </div>

          {savedLoading ? (
            <Loading fullScreen={false} />
          ) : mostSavedLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="text-center py-12">
               <BookOpen className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
               <p className="text-base-content/60">No saved lessons to show.</p>
            </div>
          )}
        </div>
      </section>

      {/* Top Contributors */}
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

          {contributorsLoading ? (
            <Loading fullScreen={false} />
          ) : topContributors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {topContributors.map((w, index) => (
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
                        <UserAvatar user={w} size="custom" className="w-24 h-24 text-2xl" />
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
                    <button disabled className="block w-full py-2.5 rounded-xl bg-base-200/50 text-base-content/40 cursor-not-allowed text-sm">
                      Profile Hidden
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-12">
               <Users className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
               <p className="text-base-content/60">No contributors found details yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* NEW SECTION 4: Testimonials */}
      <section className="py-24 bg-base-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-base-content">Reader Stories</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg relative" data-aos="fade-up" data-aos-delay={idx * 100}>
                  <div className="text-primary-300 absolute top-8 left-8 text-6xl opacity-30 font-serif">"</div>
                  <p className="text-gray-600 mb-6 italic relative z-10">{t.text}</p>
                  <div className="flex items-center gap-3">
                     <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full" />
                     <div>
                        <h4 className="font-bold text-gray-900">{t.name}</h4>
                        <span className="text-xs text-gray-500">{t.role}</span>
                     </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* NEW SECTION 5: FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
             {faqs.map((faq, idx) => (
                <div key={idx} className="collapse collapse-plus bg-base-100 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                  <input type="radio" name="my-accordion-3" defaultChecked={idx===0} /> 
                  <div className="collapse-title text-xl font-medium">
                    {faq.q}
                  </div>
                  <div className="collapse-content"> 
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-down">
             Ready to Share Your Story?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
             Join thousands of people who are documenting their life lessons and inspiring the next generation.
          </p>
          <div data-aos="zoom-in" data-aos-delay="200">
             <Link
                to={user ? "/dashboard/add-lesson" : "/register"}
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-gray-50 hover:shadow-xl hover:shadow-black/20 transition-all transform hover:-translate-y-1"
             >
                Get Started Now <ArrowRight className="w-5 h-5" />
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

