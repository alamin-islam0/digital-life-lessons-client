import { Target, Users, Heart, Lightbulb, Award, TrendingUp } from "lucide-react";
import { FaQuoteLeft } from "react-icons/fa";

const About = () => {
  const stats = [
    { label: "Active Users", value: "10K+", icon: Users },
    { label: "Lessons Shared", value: "50K+", icon: Lightbulb },
    { label: "Success Stories", value: "5K+", icon: Award },
    { label: "Growth Rate", value: "200%", icon: TrendingUp },
  ];

  const values = [
    {
      icon: Heart,
      title: "Empathy First",
      description: "We believe in the power of shared experiences to create meaningful connections and foster understanding.",
    },
    {
      icon: Lightbulb,
      title: "Continuous Learning",
      description: "Every experience is a lesson. We're committed to helping people learn from both successes and failures.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our platform thrives on the collective wisdom of our community members sharing their life journeys.",
    },
    {
      icon: Target,
      title: "Purpose Focused",
      description: "We're dedicated to helping individuals grow, learn, and make better decisions through shared wisdom.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://i.pravatar.cc/300?img=1",
      bio: "Passionate about creating platforms that empower people to share and learn.",
    },
    {
      name: "Michael Chen",
      role: "Head of Community",
      image: "https://i.pravatar.cc/300?img=2",
      bio: "Building bridges between people through authentic storytelling and shared experiences.",
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Developer",
      image: "https://i.pravatar.cc/300?img=3",
      bio: "Crafting seamless experiences that make knowledge sharing effortless and engaging.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Digital Life Lessons
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Empowering individuals to share their life experiences and learn from others' journeys
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/20 rounded-full blur-xl"></div>
                <FaQuoteLeft className="text-6xl text-primary mb-6 relative z-10" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                At Digital Life Lessons, we believe that every experience—whether a triumph or a setback—holds valuable insights. Our mission is to create a safe, supportive space where people can share their stories, learn from others, and grow together.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We're building more than just a platform; we're cultivating a community of lifelong learners who understand that wisdom comes from both our own experiences and the experiences of those around us.
              </p>
            </div>
            <div data-aos="fade-left">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <stat.icon className="w-8 h-8 text-secondary mb-3" />
                    <h3 className="text-3xl font-bold text-primary mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These principles guide everything we do and shape the community we're building
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative bg-gradient-to-br from-base-100 to-base-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate individuals dedicated to creating meaningful connections through shared experiences
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-secondary font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start sharing your experiences and learning from others today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-gray-100 dark:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </a>
            <a
              href="/public-lessons"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              Explore Lessons
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
