import { useState } from "react";
import { ChevronDown, HelpCircle, CheckCircle } from "lucide-react";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Is it completely free to write and share?",
      a: "Yes! You can write and share open lessons completely for free. We believe knowledge should be accessible to everyone. Premium features are optional for those who want to support the platform.",
      icon: CheckCircle,
    },
    {
      q: "Can I remain anonymous while posting?",
      a: "Absolutely. We respect your privacy. You can choose to publish under a pseudonym or hide your profile details from the public while still contributing your valuable life lessons.",
      icon: HelpCircle,
    },
    {
      q: "What kind of topics are allowed?",
      a: "We welcome any life lesson that provides value—whether it's about career growth, relationships, mental health, or overcoming failure. As long as it follows our community guidelines and is respectful, it's welcome here.",
      icon: HelpCircle,
    },
    {
      q: "How do I earn badges and recognition?",
      a: "Consistency is key! Write regularly, engage with other users' content, and receive 'Saves' on your lessons. Top contributors are featured on our weekly leaderboard and earn exclusive profile badges.",
      icon: HelpCircle,
    },
    {
      q: "Is my content safe and private?",
      a: "Your draft lessons are private to you. Once published, you control the visibility. We use industry-standard encryption to protect your account data and will never sell your personal information.",
      icon: HelpCircle,
    },
  ];

  return (
    <section className="pt-24 pb-24 bg-gradient-to-b from-base-100 to-base-200 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-semibold text-sm mb-4 dark:bg-secondary/20 shadow-secondary/20">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about sharing your life lessons
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const Icon = faq.icon;
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 50}
                className="group"
              >
                <div
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
                    isOpen
                      ? "border-primary dark:border-secondary shadow-primary/10 dark:shadow-secondary/10"
                      : "border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                  }`}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full flex items-start gap-4 p-6 text-left transition-all"
                  >
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-gradient-to-br from-primary to-secondary text-white shadow-lg"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-primary/10 dark:group-hover:bg-secondary/10 group-hover:text-primary dark:group-hover:text-secondary"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Question Text */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-lg font-bold transition-colors ${
                          isOpen
                            ? "text-primary dark:text-secondary"
                            : "text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-secondary"
                        }`}
                      >
                        {faq.q}
                      </h3>
                    </div>

                    {/* Chevron */}
                    <div className="flex-shrink-0">
                      <ChevronDown
                        className={`w-6 h-6 transition-all duration-300 ${
                          isOpen
                            ? "rotate-180 text-primary dark:text-secondary"
                            : "text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-secondary"
                        }`}
                      />
                    </div>
                  </button>

                  {/* Answer */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pl-[88px]">
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="mt-12 text-center bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-2xl p-8 border border-primary/10 dark:border-secondary/20"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Can't find the answer you're looking for? Please reach out to our friendly team.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <HelpCircle className="w-5 h-5" />
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
