import { useMutation } from "@tanstack/react-query";
import { Check, Star, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Pricing | Digital Life Lessons</title>
      </Helmet>
      <SectionHeader
        title="Our Plans"
        subtitle="Choose the best plan according to your needs"
      />

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-6 px-6 text-left text-xl font-bold text-gray-900 w-1/3">
                  Features
                </th>
                <th className="py-6 px-6 text-center w-1/3">
                  <div className="text-xl font-bold text-gray-900">Free</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Tk 0 / lifetime
                  </div>
                </th>
                <th className="py-6 px-6 text-center w-1/3 bg-primary-50">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl font-bold text-primary-700">
                      Premium
                    </span>
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  </div>
                  <div className="text-sm text-primary-600 mt-1">
                    Tk 1500 / lifetime
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-4 px-6 text-gray-700 font-medium">
                  Watch Public Lessons
                </td>
                <td className="py-4 px-6 text-center text-gray-600">
                  Free Only
                </td>
                <td className="py-4 px-6 text-center text-primary-700 font-semibold bg-primary-50/30">
                  All (Free + Premium)
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-700 font-medium">
                  Create Lessons
                </td>
                <td className="py-4 px-6 text-center text-gray-600">
                  Unlimited
                </td>
                <td className="py-4 px-6 text-center text-primary-700 font-semibold bg-primary-50/30">
                  Unlimited
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-700 font-medium">
                  Create Premium Lessons
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-400">
                    ✕
                  </span>
                </td>
                <td className="py-4 px-6 text-center bg-primary-50/30">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                    <Check className="w-4 h-4" />
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-700 font-medium">
                  Ad-free Experience
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-400">
                    ✕
                  </span>
                </td>
                <td className="py-4 px-6 text-center bg-primary-50/30">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                    <Check className="w-4 h-4" />
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-700 font-medium">
                  Profile Badge
                </td>
                <td className="py-4 px-6 text-center text-gray-600">
                  None
                </td>
                <td className="py-4 px-6 text-center text-primary-700 font-semibold bg-primary-50/30">
                  Premium Badge
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-700 font-medium">
                  Priority Listing
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-400">
                    ✕
                  </span>
                </td>
                <td className="py-4 px-6 text-center bg-primary-50/30">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                    <Check className="w-4 h-4" />
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-700 font-medium">
                  Support
                </td>
                <td className="py-4 px-6 text-center text-gray-600">
                  Standard
                </td>
                <td className="py-4 px-6 text-center text-primary-700 font-semibold bg-primary-50/30">
                  Priority
                </td>
              </tr>
              {/* Action Rows */}
              <tr className="bg-gray-50 border-t border-gray-100">
                <td className="py-6 px-6"></td>
                <td className="py-6 px-6 text-center">
                  {!isPremium && (
                    <button
                      disabled
                      className="px-6 py-2.5 bg-gray-200 text-gray-600 rounded-lg font-semibold cursor-default"
                    >
                      Current Plan
                    </button>
                  )}
                </td>
                <td className="py-6 px-6 text-center bg-primary-50/30">
                  {isPremium ? (
                    <button
                      disabled
                      className="px-6 py-2.5 bg-green-100 text-green-700 rounded-lg font-bold flex items-center justify-center gap-2 mx-auto cursor-default"
                    >
                      <Check className="w-5 h-5" />
                      Paid
                    </button>
                  ) : (
                    <button
                      onClick={handleUpgrade}
                      disabled={createCheckoutSession.isPending}
                      className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-75 disabled:cursor-not-allowed transform hover:scale-105"
                    >
                      {createCheckoutSession.isPending
                        ? "Processing..."
                        : "Upgrade Now"}
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
