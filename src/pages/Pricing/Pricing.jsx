import { useMutation } from '@tanstack/react-query';
import { Check, Star, Zap } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUserPlan from '../../hooks/useUserPlan';
import SectionHeader from '../../components/ui/SectionHeader';

const Pricing = () => {
    const { isPremium } = useUserPlan();
    const axiosSecure = useAxiosSecure();

    const createCheckoutSession = useMutation({
        mutationFn: async () => {
            const res = await axiosSecure.post('/payment/create-checkout-session');
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
                title="আমাদের প্ল্যানসমূহ"
                subtitle="আপনার প্রয়োজন অনুযায়ী সেরা প্ল্যানটি বেছে নিন"
            />

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Free Plan */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 bangla-text">ফ্রি</h3>
                        <p className="text-gray-500 bangla-text mt-2">শুরু করার জন্য সেরা</p>
                        <div className="mt-4 flex items-baseline">
                            <span className="text-4xl font-bold text-gray-900">৳০</span>
                            <span className="text-gray-500 ml-2 bangla-text">/ আজীবন</span>
                        </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 bangla-text"> আনলিমিটেড ফ্রি লেসন দেখুন</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 bangla-text"> নিজের লেসন তৈরি করুন (সীমিত)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 bangla-text"> কমেন্ট ও লাইক করুন</span>
                        </li>
                    </ul>

                    <button className="w-full py-3 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition-colors bangla-text cursor-default">
                        আপনার বর্তমান প্ল্যান
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
                        <h3 className="text-2xl font-bold text-gray-900 bangla-text flex items-center gap-2">
                            প্রিমিয়াম
                            <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-bold uppercase tracking-wider">
                                জনপ্রিয়
                            </span>
                        </h3>
                        <p className="text-gray-500 bangla-text mt-2">সব ফিচার আনলক করুন</p>
                        <div className="mt-4 flex items-baseline">
                            <span className="text-4xl font-bold text-gray-900">৳৫০০</span>
                            <span className="text-gray-500 ml-2 bangla-text">/ এককালীন</span>
                        </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-gray-700 bangla-text font-medium">সব প্রিমিয়াম লেসন অ্যাক্সেস</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-gray-700 bangla-text font-medium">প্রিমিয়াম লেসন তৈরি করুন</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-gray-700 bangla-text font-medium">বিজ্ঞাপন মুক্ত অভিজ্ঞতা</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-gray-700 bangla-text font-medium">আজীবন মেম্বারশিপ</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-gray-700 bangla-text font-medium">অগ্রাধিকার সাপোর্ট</span>
                        </li>
                    </ul>

                    {isPremium ? (
                        <button
                            disabled
                            className="w-full py-3 bg-green-100 text-green-700 rounded-xl font-bold flex items-center justify-center gap-2 cursor-default bangla-text"
                        >
                            <Check className="w-5 h-5" />
                            আপনি ইতিমধ্যে প্রিমিয়াম
                        </button>
                    ) : (
                        <button
                            onClick={handleUpgrade}
                            disabled={createCheckoutSession.isPending}
                            className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl bangla-text disabled:opacity-75 disabled:cursor-not-allowed"
                        >
                            {createCheckoutSession.isPending ? 'প্রসেসিং হচ্ছে...' : 'এখনই আপগ্রেড করুন'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
