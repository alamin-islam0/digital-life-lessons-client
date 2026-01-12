import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, LogOut, User, LayoutDashboard, Star } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useUserPlan from "../../hooks/useUserPlan";
import UserAvatar from "../ui/UserAvatar";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logoutUser: logout } = useAuth();
  const { isPremium, role } = useUserPlan();

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/public-lessons", label: "Public Lessons" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  if (user) {
    navLinks.push({ path: "/dashboard/add-lesson", label: "Add Lesson" });
    navLinks.push({ path: "/dashboard/my-lessons", label: "My Lessons" });
    if (!isPremium) {
      navLinks.push({ path: "/pricing", label: "Upgrade" });
    } else {
      navLinks.push({ path: "/pricing", label: "Pricing" });
    }
  }

  const NavLinkItem = ({ to, children, mobile = false }) => (
    <NavLink
      to={to}
      onClick={() => mobile && setIsOpen(false)}
      className={({ isActive }) =>
        `font-medium transition-colors ${mobile
          ? `block px-4 py-3 rounded-lg ${isActive
            ? "bg-primary/10 text-secondary"
            : "text-gray-700 dark:text-gray-300 dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-800"
          }`
          : `${isActive
            ? "text-secondary"
            : "text-gray-700 dark:text-gray-300 dark:text-gray-300 hover:text-secondary"
          }`
        }`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <nav className="bg-white dark:bg-gray-800 dark:bg-gray-900 shadow-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLinkItem key={link.path} to={link.path}>
                {link.label}
              </NavLinkItem>
            ))}

            {/* Premium Badge */}
            {user && isPremium && (
              <span className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-semibold premium-glow">
                <Star className="w-4 h-4" />
                Premium
              </span>
            )}
          </div>

          {/* Right Side - Auth */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <UserAvatar user={user} size="md" />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 dark:border-gray-700 py-2 z-20">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 dark:border-gray-700">
                        <p className="font-semibold text-gray-900 dark:text-white dark:text-white">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">{user.email}</p>
                        {isPremium && (
                          <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold">
                            <Star className="w-3 h-3" />
                            Premium Member
                          </span>
                        )}
                      </div>

                      <Link
                        to="/dashboard/profile"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-secondary/10 dark:hover:text-secondary transition-colors text-gray-700 dark:text-gray-300 dark:text-gray-300"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>

                      <Link
                        to={
                          role === "admin" ? "/dashboard/admin" : "/dashboard"
                        }
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-secondary/10 dark:hover:text-secondary transition-colors text-gray-700 dark:text-gray-300 dark:text-gray-300"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-error/10 transition-colors text-error w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:bg-gray-800 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 dark:border-gray-700">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <NavLinkItem key={link.path} to={link.path} mobile>
                {link.label}
              </NavLinkItem>
            ))}

            {user && isPremium && (
              <div className="px-4 py-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-semibold">
                  <Star className="w-4 h-4" />
                  Premium
                </span>
              </div>
            )}

            <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
              {user ? (
                <>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <UserAvatar user={user} size="md" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/dashboard/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    Profile
                  </Link>

                  <Link
                    to={role === "admin" ? "/dashboard/admin" : "/dashboard"}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-error/10 rounded-lg transition-colors text-error w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-center text-primary font-semibold hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-center bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
