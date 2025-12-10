const UserAvatar = ({ user, size = 'md', showName = false, className = '' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return parts[0][0] + parts[1][0];
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {user?.photoURL ? (
                <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-primary-200`}
                />
            ) : (
                <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold ring-2 ring-primary-200`}>
                    {getInitials(user?.displayName || user?.name)}
                </div>
            )}
            {showName && (
                <span className="font-medium text-gray-900">
                    {user?.displayName || user?.name || 'User'}
                </span>
            )}
        </div>
    );
};

export default UserAvatar;
