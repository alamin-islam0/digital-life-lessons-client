import { Link } from "react-router-dom";

const CategoriesSection = () => {
  const categories = [
    {
      name: "Personal Development",
      image:
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=500",
    },
    {
      name: "Career Growth",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500",
    },
    {
      name: "Relationships",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=500",
    },
    {
      name: "Mental Health",
      image:
        "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=500",
    },
    {
      name: "Financial Freedom",
      image:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=500",
    },
    {
      name: "Travel & Adventure",
      image:
        "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=500",
    },
  ];

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">Explore Topics</h2>
          <p className="text-gray-400 mt-4">
            Dive into the lessons that matter to you most.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer"
              data-aos="zoom-in"
              data-aos-delay={idx * 50}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center p-2 text-center">
                <span className="font-bold text-sm md:text-base">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/public-lessons"
            className="inline-flex items-center gap-2 text-secondary font-bold text-lg hover:text-white transition-colors group"
          >
            View All Categories
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
