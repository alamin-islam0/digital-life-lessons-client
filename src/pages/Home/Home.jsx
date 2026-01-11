import { useQuery } from "@tanstack/react-query";
import useUserPlan from "../../hooks/useUserPlan";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// Import Section Components
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import FeaturedLessons from "./components/FeaturedLessons";
import HowItWorks from "./components/HowItWorks";
import BenefitsSection from "./components/BenefitsSection";
import CategoriesSection from "./components/CategoriesSection";
import MostSavedLessons from "./components/MostSavedLessons";
import TopContributors from "./components/TopContributors";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import CtaSection from "./components/CtaSection";

const Home = () => {
  const { isPremium } = useUserPlan();
  const axiosSecure = useAxiosSecure();

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

  // Fetch Top Contributors (Dynamic Calculation)
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

  return (
    <div className="min-h-screen bg-base-100 font-sans overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <FeaturedLessons 
        lessons={featuredLessons} 
        isLoading={featuredLoading} 
        isPremium={isPremium} 
      />
      <HowItWorks />
      <BenefitsSection />
      <CategoriesSection />
      <MostSavedLessons 
        lessons={mostSavedLessons} 
        isLoading={savedLoading} 
        isPremium={isPremium} 
      />
      <TopContributors 
        contributors={topContributors} 
        isLoading={contributorsLoading} 
      />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
};

export default Home;
