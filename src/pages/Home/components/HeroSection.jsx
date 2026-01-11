import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Sparkles, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import useAuth from "../../../hooks/useAuth";

const HeroSection = () => {
  const { user } = useAuth();

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

  return (
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
  );
};

export default HeroSection;
