import { useMutation } from "@tanstack/react-query";
import { Check, Star, Zap } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserPlan from "../../hooks/useUserPlan";
import SectionHeader from "../../components/ui/SectionHeader";

const Pricing = () => {
  const { isPremium } = useUserPlan();
  const axiosSecure = useAxiosSecure();

  const createCheckoutSession = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post("/payment/create-checkout-session");
      return res.data;
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
  });

  const handleUpgrade = () => {
    createCheckoutSession.mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4">
      <SectionHeader
        title="Our Plans"
        subtitle="Choose the best plan according to your needs"
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Free Plan */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Free</h3>
            <p className="text-gray-500 mt-2">Best to start with</p>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">Tk 0</span>
              <span className="text-gray-500 ml-2">/ Lifetime</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">
                {" "}
                Watch unlimited free lessons
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">
                {" "}
                Create your own lessons (limited)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700"> Comment and Like</span>
            </li>
          </ul>

          <button className="w-full py-3 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition-colors cursor-default">
            Your Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="relative bg-white rounded-2xl p-8 shadow-xl border-2 border-primary-500 transform md:scale-105 z-10">
          <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg premium-glow">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Premium
              <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-bold uppercase tracking-wider">
                Popular
              </span>
            </h3>
            <p className="text-gray-500 mt-2">Unlock all features</p>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">Tk 500</span>
              <span className="text-gray-500 ml-2">/ One-time</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">
                Access all premium lessons
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">
                Create premium lessons
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">
                Ad-free experience
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">
                Lifetime membership
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">
                Priority support
              </span>
            </li>
          </ul>

          {isPremium ? (
            <button
              disabled
              className="w-full py-3 bg-green-100 text-green-700 rounded-xl font-bold flex items-center justify-center gap-2 cursor-default"
            >
              <Check className="w-5 h-5" />
              You are already premium
            </button>
          ) : (
            <button
              onClick={handleUpgrade}
              disabled={createCheckoutSession.isPending}
              className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {createCheckoutSession.isPending
                ? "Processing..."
                : "Upgrade Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
