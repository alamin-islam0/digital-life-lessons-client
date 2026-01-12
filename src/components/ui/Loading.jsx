import Lottie from "lottie-react";
import { useTheme } from "../../context/ThemeContext";
import loadingAnimation from "../../assets/loading-animation.json";

const Loading = ({ fullScreen = true, message = "Loading..." }) => {
  const { isDark } = useTheme();

  // Create a modified animation with brand colors
  const getColoredAnimation = () => {
    const animation = JSON.parse(JSON.stringify(loadingAnimation));
    
    // Define brand colors
    const primaryColor = isDark 
      ? [50/255, 178/255, 201/255, 1] // Teal for dark mode (#32B2C9)
      : [11/255, 44/255, 86/255, 1];   // Navy for light mode (#0B2C56)
    
    const secondaryColor = isDark
      ? [79/255, 195/255, 220/255, 1]  // Lighter teal (#4FC3DC)
      : [50/255, 178/255, 201/255, 1]; // Teal for light mode (#32B2C9)

    // Update colors in the animation layers
    if (animation.layers) {
      animation.layers.forEach(layer => {
        if (layer.shapes) {
          layer.shapes.forEach(shape => {
            if (shape.it) {
              shape.it.forEach(item => {
                // Update fill colors
                if (item.ty === 'fl' && item.c && item.c.k) {
                  item.c.k = primaryColor;
                }
                // Update stroke colors
                if (item.ty === 'st' && item.c && item.c.k) {
                  item.c.k = secondaryColor;
                }
              });
            }
          });
        }
      });
    }
    
    return animation;
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <div className="text-center">
          {/* Animated background circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 dark:bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 dark:bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          {/* Lottie Animation */}
          <div className="relative z-10">
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto mb-6 drop-shadow-2xl">
              <Lottie
                animationData={getColoredAnimation()}
                loop={true}
                autoplay={true}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid slice'
                }}
              />
            </div>
            
            {/* Loading text with gradient */}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary dark:from-secondary dark:to-primary bg-clip-text text-transparent">
                {message}
              </h3>
              
              {/* Animated dots */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-primary dark:bg-secondary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary dark:bg-secondary rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-primary dark:bg-secondary rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8 sm:py-12">
      <div className="text-center">
        {/* Lottie Animation */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-3 drop-shadow-lg">
          <Lottie
            animationData={getColoredAnimation()}
            loop={true}
            autoplay={true}
            rendererSettings={{
              preserveAspectRatio: 'xMidYMid slice'
            }}
          />
        </div>
        
        {/* Loading text */}
        <p className="text-sm sm:text-base font-medium bg-gradient-to-r from-primary to-secondary dark:from-secondary dark:to-primary bg-clip-text text-transparent">
          {message}
        </p>
        
        {/* Animated dots */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <div className="w-1.5 h-1.5 bg-primary dark:bg-secondary rounded-full animate-bounce"></div>
          <div className="w-1.5 h-1.5 bg-primary dark:bg-secondary rounded-full animate-bounce delay-100"></div>
          <div className="w-1.5 h-1.5 bg-primary dark:bg-secondary rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
