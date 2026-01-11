import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Heart, Github } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import Logo from "../ui/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", path: "/about" },
      { name: "Blog", path: "/blog" },
      { name: "Contact", path: "/contact" },
    ],
    resources: [
      { name: "Home", path: "/" },
      { name: "Public Lessons", path: "/public-lessons" },
    ],
    legal: [
      { name: "Privacy & Terms", path: "/privacy-terms" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, url: "https://www.facebook.com/Alamin.islam19.19/" },
    { name: "LinkedIn", icon: FaLinkedinIn, url: "https://www.linkedin.com/in/alaminislam2023/" },
    { name: "GitHub", icon: Github, url: "https://github.com/alamin-islam0" },
    { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/alamin._.islam/" },
  ];

  return (
    <footer className="bg-gradient-to-br from-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Empowering individuals to share their life experiences and learn from others' journeys.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/80 hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/80 hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-lg font-bold mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/80 hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Get in Touch</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:alamin648890@gmail.com" className="hover:text-white transition-colors break-all">
                  alamin648890@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+8801722930883" className="hover:text-white transition-colors">
                  01722930883
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
            <div>
              <a
                href="https://dev-alamin-islam.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-all hover:scale-105"
              >
                Visit Portfolio →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/80 text-center md:text-left">
              © {currentYear} Digital Life Lessons. All rights reserved.
            </p>
            <p className="text-sm text-white/80 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-400 fill-current" /> by{" "}
              <a
                href="https://dev-alamin-islam.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-white transition-colors"
              >
                Alamin Islam
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
