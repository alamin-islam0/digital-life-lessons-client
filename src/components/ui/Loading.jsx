import Lottie from "lottie-react";
import { useTheme } from "../../context/ThemeContext";
import loadingAnimation from "../../assets/loading-animation.json";

const Loading = ({ fullScreen = true }) => {
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
        <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 drop-shadow-2xl">
          <Lottie
            animationData={getColoredAnimation()}
            loop={true}
            autoplay={true}
            rendererSettings={{
              preserveAspectRatio: 'xMidYMid slice'
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8 sm:py-12">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 drop-shadow-lg">
        <Lottie
          animationData={getColoredAnimation()}
          loop={true}
          autoplay={true}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice'
          }}
        />
      </div>
    </div>
  );
};

export default Loading;
