import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Is it completely free to write and share?",
      a: "Yes! You can write and share open lessons completely for free. We believe knowledge should be accessible to everyone. Premium features are optional for those who want to support the platform.",
    },
    {
      q: "Can I remain anonymous while posting?",
      a: "Absolutely. We respect your privacy. You can choose to publish under a pseudonym or hide your profile details from the public while still contributing your valuable life lessons.",
    },
    {
      q: "What kind of topics are allowed?",
      a: "We welcome any life lesson that provides value—whether it's about career growth, relationships, mental health, or overcoming failure. As long as it follows our community guidelines and is respectful, it's welcome here.",
    },
    {
      q: "How do I earn badges and recognition?",
      a: "Consistency is key! Write regularly, engage with other users' content, and receive 'Saves' on your lessons. Top contributors are featured on our weekly leaderboard and earn exclusive profile badges.",
    },
    {
      q: "Is my content safe and private?",
      a: "Your draft lessons are private to you. Once published, you control the visibility. We use industry-standard encryption to protect your account data and will never sell your personal information.",
    },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* Left Column: Header & Context */}
          <div className="md:w-1/3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm mb-6">
              <HelpCircle className="w-4 h-4" />
              <span>Support & Help</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Everything you need to know about the product and billing. Can’t
              find the answer you’re looking for? Please chat to our friendly team.
            </p>
            <div className="hidden md:block">
              <button className="px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10">
                Contact Support
              </button>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="md:w-2/3 space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`group rounded-2xl border transition-all duration-300 ${
                  openIndex === idx
                    ? "bg-white border-primary/20 shadow-xl shadow-primary/5"
                    : "bg-white hover:bg-gray-50 border-gray-100"
                }`}
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span
                    className={`text-lg font-semibold transition-colors ${
                      openIndex === idx ? "text-primary-600" : "text-gray-900"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`ml-4 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === idx
                        ? "bg-primary text-white rotate-180"
                        : "bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary"
                    }`}
                  >
                    {openIndex === idx ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
            
             <div className="block md:hidden mt-8 text-center">
              <button className="px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10 w-full">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
