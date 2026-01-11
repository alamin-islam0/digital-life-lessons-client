const TestimonialsSection = () => {
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
  
    return (
      <section className="py-24 bg-base-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content">Reader Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl shadow-lg relative"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="text-primary-300 absolute top-8 left-8 text-6xl opacity-30 font-serif">
                  "
                </div>
                <p className="text-gray-600 mb-6 italic relative z-10">{t.text}</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full"
                  />
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
    );
  };
  
  export default TestimonialsSection;
  
