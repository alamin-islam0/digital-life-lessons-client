const HowItWorks = () => {
    const steps = [
      {
        number: "01",
        title: "Sign Up",
        desc: "Create your free account to join the community.",
      },
      {
        number: "02",
        title: "Write",
        desc: "Share your life lesson using our simple editor.",
      },
      {
        number: "03",
        title: "Share",
        desc: "Publish your story to inspire others worldwide.",
      },
      {
        number: "04",
        title: "Earn",
        desc: "Gain recognition and badges for your contribution.",
      },
    ];
  
    return (
      <section className="py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-down">
            <h2 className="text-4xl font-bold text-base-content">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative z-10 bg-base-100 p-4 rounded-xl text-center"
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
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
    );
  };
  
  export default HowItWorks;
  
