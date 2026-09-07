import { useNavigate } from "react-router-dom";
import { 
  IoArrowBack, 
  IoHome, 
  IoMail, 
  IoChatbubbleEllipses, 
  IoWarningOutline 
} from "react-icons/io5";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 transition-colors duration-200 pb-12 pt-20 px-6 xl:px-0 flex flex-col justify-between">
      <div className="mx-auto max-w-5xl space-y-12 w-full">
        
        {/* Main Content Section */}
        <div className="text-center space-y-6 max-w-xl mx-auto pt-8">
          
          {/* Badge & Number */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-zinc-800 text-indigo-500">
              <IoWarningOutline className="text-base" />
              <span>Error 404</span>
            </div>
            
            <h1 className="text-7xl sm:text-8xl font-black tracking-tight text-indigo-500 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text dark:text-transparent">
              404
            </h1>
          </div>

          {/* Titles */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Page not found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
              Sorry, we couldn’t find the page you’re looking for. It might have been moved or doesn't exist anymore.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all cursor-pointer shadow-sm"
            >
              <IoArrowBack className="text-base rtl:rotate-180" />
              <span>Go Back</span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-indigo-500 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-95 transition-all cursor-pointer shadow-md"
            >
              <IoHome className="text-base" />
              <span>Back to Home</span>
            </button>
          </div>

        </div>

        {/* Support Footer Section */}
        <div className="border-t border-gray-200 dark:border-zinc-800 pt-10 text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              Need help finding something?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Our support team is always here to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
            <div className="p-4 border border-gray-200 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-800/50 flex items-start gap-3">
              <IoMail className="text-indigo-500 shrink-0 mt-0.5 text-lg" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Email Support</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Response within 24 hours</p>
                <a href="mailto:support@store.com" className="text-xs text-indigo-500 font-medium hover:underline mt-2 inline-block">
                  support@store.com
                </a>
              </div>
            </div>

            <div className="p-4 border border-gray-200 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-800/50 flex items-start gap-3">
              <IoChatbubbleEllipses className="text-indigo-500 shrink-0 mt-0.5 text-lg" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Live Chat</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Mon - Fri from 8am to 5pm</p>
                <a href="#contact" className="text-xs text-indigo-500 font-medium hover:underline mt-2 inline-block">
                  Start a Chat
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}