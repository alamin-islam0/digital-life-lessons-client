import { Shield, Lock, Eye, UserCheck, FileText, Globe, Mail, Calendar } from "lucide-react";

const PrivacyTerms = () => {
  const sections = {
    privacy: [
      {
        icon: Shield,
        title: "Information We Collect",
        content: [
          "Personal information you provide (name, email, profile picture)",
          "Content you create (lessons, comments, interactions)",
          "Usage data (how you interact with our platform)",
          "Device information (browser type, IP address, location data)",
        ],
      },
      {
        icon: Lock,
        title: "How We Use Your Information",
        content: [
          "To provide and improve our services",
          "To personalize your experience",
          "To communicate with you about updates and features",
          "To ensure platform security and prevent fraud",
          "To analyze usage patterns and optimize performance",
        ],
      },
      {
        icon: Eye,
        title: "Information Sharing",
        content: [
          "We never sell your personal information to third parties",
          "Public content (lessons) is visible to other users as intended",
          "We may share data with service providers who help operate our platform",
          "We comply with legal requirements when necessary",
        ],
      },
      {
        icon: UserCheck,
        title: "Your Rights",
        content: [
          "Access and download your personal data",
          "Correct or update your information",
          "Delete your account and associated data",
          "Opt-out of marketing communications",
          "Control your privacy settings",
        ],
      },
    ],
    terms: [
      {
        icon: FileText,
        title: "Acceptable Use",
        content: [
          "You must be at least 13 years old to use our platform",
          "You are responsible for maintaining account security",
          "Content must not violate laws or infringe on others' rights",
          "Harassment, hate speech, and spam are prohibited",
          "You retain ownership of content you create",
        ],
      },
      {
        icon: Globe,
        title: "Platform Rules",
        content: [
          "We reserve the right to moderate and remove inappropriate content",
          "Accounts may be suspended or terminated for violations",
          "We may update these terms with notice to users",
          "Continued use constitutes acceptance of updated terms",
        ],
      },
      {
        icon: Mail,
        title: "Intellectual Property",
        content: [
          "You grant us license to display and distribute your content",
          "Our platform design, code, and branding are protected",
          "You may not copy or reproduce our platform without permission",
          "Respect copyright and intellectual property of others",
        ],
      },
      {
        icon: Calendar,
        title: "Limitation of Liability",
        content: [
          "Platform is provided 'as is' without warranties",
          "We are not liable for user-generated content",
          "We are not responsible for third-party links or services",
          "Our liability is limited to the extent permitted by law",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center" data-aos="fade-up">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy & Terms
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Your privacy and trust are important to us. Learn how we protect your data and what you can expect from our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center" data-aos="fade-up">
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold text-gray-900 dark:text-white">Last Updated:</span> January 12, 2026
          </p>
        </div>
      </div>

      {/* Privacy Policy Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We are committed to protecting your privacy and ensuring transparency about how we handle your data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {sections.privacy.map((section, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6">
                  <section.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms of Service Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              By using Digital Life Lessons, you agree to these terms. Please read them carefully.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {sections.terms.map((section, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-gradient-to-br from-base-100 to-base-200 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center mb-6">
                  <section.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Protection Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-aos="fade-up"
            className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-2xl p-12 text-white text-center"
          >
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Data is Protected
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              We use industry-standard encryption and security measures to protect your information. Your trust is our top priority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-gray-100 dark:bg-gray-800 transition-all shadow-lg"
              >
                Contact Privacy Team
              </a>
              <a
                href="/dashboard/profile"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all"
              >
                Manage Privacy Settings
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Questions About Privacy or Terms?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            If you have any questions or concerns about our privacy policy or terms of service, please don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
            >
              Contact Us
            </a>
            <a
              href="mailto:privacy@digitallifelessons.com"
              className="px-8 py-4 bg-white border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary/5 transition-all"
            >
              Email Privacy Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyTerms;
