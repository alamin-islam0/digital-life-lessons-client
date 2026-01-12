import { Link } from "react-router-dom";
import { Home, MoveLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-9xl font-black text-base-300 dark:text-secondary/30 mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
          Page Not Found
        </h2>
        <p className="text-base-content/70 text-lg mb-8">
          The page you are looking for has been deleted or the link is
          incorrect.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold hover:shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-base-100 text-base-content border border-base-300 rounded-xl font-bold hover:bg-base-200 transition-colors flex items-center justify-center gap-2"
          >
            <MoveLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
