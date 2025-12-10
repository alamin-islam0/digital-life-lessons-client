import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, LogOut, User, LayoutDashboard, Star } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useUserPlan from '../../hooks/useUserPlan';
import UserAvatar from '../ui/UserAvatar';

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
            console.error('Logout error:', error);
        }
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/public-lessons', label: 'Public Lessons' },
    ];

    // Add pricing link if user is logged in but not premium
    if (user && !isPremium) {
        navLinks.push({ path: '/pricing', label: 'Upgrade' });
    }

    const NavLinkItem = ({ to, children, mobile = false }) => (
        <NavLink
            to={to}
            onClick={() => mobile && setIsOpen(false)}
            className={({ isActive }) =>
                `font-medium transition-colors ${mobile
                    ? `block px-4 py-3 rounded-lg ${isActive ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'}`
                    : `${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`
                }`
            }
        >
            {children}
        </NavLink>
    );

    return (
        <nav className="bg-white shadow-md sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-white font-bold text-xl">DL</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 hidden sm:block">
                            Digital Life Lessons
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <NavLinkItem key={link.path} to={link.path}>
                                {link.label}
                            </NavLinkItem>
                        ))}

                        {/* Premium Badge */}
                        {user && isPremium && (
                            <span className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full text-sm font-semibold premium-glow">
                                <Star className="w-4 h-4" />
                                Premium
                            </span>
                        )}
                    </div>

                    {/* Right Side - Auth */}
                    <div className="hidden md:flex items-center gap-4">
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
                                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="font-semibold text-gray-900">
                                                    {user.displayName || 'User'}
                                                </p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                                {isPremium && (
                                                    <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                                                        <Star className="w-3 h-3" />
                                                        Premium Member
                                                    </span>
                                                )}
                                            </div>

                                            <Link
                                                to="/dashboard/profile"
                                                onClick={() => setShowDropdown(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                                            >
                                                <User className="w-4 h-4 text-gray-600" />
                                                Profile
                                            </Link>

                                            <Link
                                                to={role === 'admin' ? '/dashboard/admin' : '/dashboard'}
                                                onClick={() => setShowDropdown(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                                            >
                                                <LayoutDashboard className="w-4 h-4 text-gray-600" />
                                                Dashboard
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-red-600 w-full text-left"
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
                                    className="px-4 py-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-4 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <NavLinkItem key={link.path} to={link.path} mobile>
                                {link.label}
                            </NavLinkItem>
                        ))}

                        {user && isPremium && (
                            <div className="px-4 py-2">
                                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full text-sm font-semibold">
                                    <Star className="w-4 h-4" />
                                    Premium
                                </span>
                            </div>
                        )}

                        <div className="border-t border-gray-100 pt-4 mt-4">
                            {user ? (
                                <>
                                    <div className="px-4 py-3 bg-gray-50 rounded-lg mb-2">
                                        <div className="flex items-center gap-3 mb-2">
                                            <UserAvatar user={user} size="md" />
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm">
                                                    {user.displayName || 'User'}
                                                </p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        to="/dashboard/profile"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        <User className="w-4 h-4 text-gray-600" />
                                        Profile
                                    </Link>

                                    <Link
                                        to={role === 'admin' ? '/dashboard/admin' : '/dashboard'}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        <LayoutDashboard className="w-4 h-4 text-gray-600" />
                                        Dashboard
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg transition-colors text-red-600 w-full text-left"
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
                                        className="block px-4 py-3 text-center text-primary-600 font-semibold hover:bg-primary-50 rounded-lg transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all"
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
