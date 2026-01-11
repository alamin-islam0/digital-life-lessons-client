import { useState } from "react";

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

  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-base-content mb-4">Frequently Asked Questions</h2>
        </div>
        
        {faqs.map((faq, idx) => (
          <div key={idx} className="mb-1.5">
            {/* Header / Label */}
            <button
              onClick={() => setOpenIndex(idx)}
              className="w-full flex justify-between items-center p-4 bg-base-200 cursor-pointer font-bold text-left hover:bg-base-300 transition-colors"
            >
              <span className="text-sm md:text-base text-base-content">{faq.q}</span>
              <div className={`flex items-center transition-transform duration-500 ease-in-out ${openIndex === idx ? "rotate-180" : ""}`}>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  className={openIndex === idx ? "text-primary" : "text-base-content"}
                >
                  <path
                    d="M4.293 5.293a1 1 0 0 1 1.414 0L8 7.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>

            {/* Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out bg-base-100 border-x border-b border-base-200 ${
                openIndex === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4 bg-base-100 text-xs md:text-sm text-base-content/70 border-t border-base-200">
                <p>{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
