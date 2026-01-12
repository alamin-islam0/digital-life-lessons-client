import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import useAuth from "../../../hooks/useAuth";

const CtaSection = () => {
  const { user } = useAuth();
  
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 to-transparent"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
        <h2
          className="text-4xl md:text-5xl font-bold mb-6"
          data-aos="fade-down"
        >
          Ready to Share Your Story?
        </h2>
        <p
          className="text-xl opacity-90 mb-10 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Join thousands of people who are documenting their life lessons and
          inspiring the next generation.
        </p>
        <div data-aos="zoom-in" data-aos-delay="200">
          <Link
            to={user ? "/dashboard/add-lesson" : "/register"}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-secondary/20 to-secondary text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Get Started Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
