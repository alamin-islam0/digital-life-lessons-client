import Lottie from "lottie-react";
import { useTheme } from "../../context/ThemeContext";
import loadingAnimation from "../../assets/loading-animation.json";

const Loading = ({ fullScreen = true, message = "Loading..." }) => {
  const { isDark } = useTheme();

  // Customize animation colors based on theme
  const animationStyle = {
    filter: isDark 
      ? "hue-rotate(180deg) saturate(1.2) brightness(1.1)" // Teal-ish for dark mode
      : "hue-rotate(220deg) saturate(1.1)", // Navy-ish for light mode
  };

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4" style={animationStyle}>
            <Lottie
              animationData={loadingAnimation}
              loop={true}
              autoplay={true}
            />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
            {message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-2" style={animationStyle}>
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            autoplay={true}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
