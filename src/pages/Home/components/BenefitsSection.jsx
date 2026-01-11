import { Brain, Lightbulb, Target, Users } from "lucide-react";

const BenefitsSection = () => {
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

  return (
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

              <div
                className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
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
  );
};

export default BenefitsSection;
