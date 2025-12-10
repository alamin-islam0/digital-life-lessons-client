import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Home, Loader2, CreditCard, Calendar } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();
    const [verifying, setVerifying] = useState(true);
    const [paymentData, setPaymentData] = useState(null);
    const [error, setError] = useState(null);
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                console.log('💳 Payment success page loaded');
                console.log('📝 Session ID:', sessionId);

                if (!sessionId) {
                    setError('No session ID found');
                    setVerifying(false);
                    return;
                }

                // Wait for webhook to process
                console.log('⏳ Waiting for webhook processing...');
                await new Promise(resolve => setTimeout(resolve, 3000));

                // Try to verify payment with backend
                console.log('🔍 Verifying payment session...');
                try {
                    const response = await axiosSecure.post('/payment/verify-session', {
                        sessionId
                    });

                    console.log('✅ Payment verified:', response.data);
                    setPaymentData(response.data.payment);
                } catch (verifyError) {
                    console.log('⚠️ Verify endpoint failed, relying on webhook:', verifyError.message);
                    // Don't set error - webhook might have worked
                }

                // Invalidate all user-related queries to force refresh
                console.log('🔄 Refreshing user data...');
                await queryClient.invalidateQueries(['user']);
                await queryClient.invalidateQueries(['user-profile']);
                await queryClient.invalidateQueries(['userPlan']);
                await queryClient.invalidateQueries(['payment-history']);

                // Wait a bit for queries to refetch
                await new Promise(resolve => setTimeout(resolve, 1000));

                console.log('✅ All data refreshed');
                setVerifying(false);

                // Redirect to dashboard after 6 seconds
                const timer = setTimeout(() => {
                    console.log('🚀 Redirecting to dashboard...');
                    navigate('/dashboard');
                }, 6000);

                return () => clearTimeout(timer);
            } catch (err) {
                console.error('❌ Error in payment flow:', err);
                setError(err.response?.data?.message || 'Payment verification issue');
                setVerifying(false);

                // Still try to refresh user data
                try {
                    await queryClient.invalidateQueries(['user']);
                    await queryClient.invalidateQueries(['user-profile']);
                } catch (e) {
                    console.error('Failed to refresh queries:', e);
                }
            }
        };

        verifyPayment();
    }, [navigate, queryClient, axiosSecure, sessionId]);

    if (verifying) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-lg w-full">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 bangla-text">
                        পেমেন্ট যাচাই করা হচ্ছে...
                    </h1>
                    <p className="text-gray-600 text-lg bangla-text">
                        অনুগ্রহ করে অপেক্ষা করুন, আমরা আপনার পেমেন্ট যাচাই করছি এবং প্রিমিয়াম অ্যাক্সেস সক্রিয় করছি।
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-lg w-full">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">⚠️</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 bangla-text">
                        যাচাইকরণ ব্যর্থ
                    </h1>
                    <p className="text-gray-600 text-lg mb-8 bangla-text">
                        {error}
                    </p>
                    <p className="text-sm text-gray-500 mb-6 bangla-text">
                        চিন্তা করবেন না! আপনার পেমেন্ট সফল হয়েছে। কিছুক্ষণ পর আবার চেক করুন বা সাপোর্টে যোগাযোগ করুন।
                    </p>
                    <div className="space-y-4">
                        <Link
                            to="/dashboard"
                            className="block w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg bangla-text"
                        >
                            ড্যাশবোর্ডে যান
                        </Link>
                        <Link
                            to="/"
                            className="block w-full py-3 bg-white text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors border border-gray-200 flex items-center justify-center gap-2 bangla-text"
                        >
                            <Home className="w-5 h-5" />
                            হোমে ফিরে যান
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-lg w-full">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4 bangla-text">
                    পেমেন্ট সফল হয়েছে!
                </h1>
                <p className="text-gray-600 text-lg mb-6 bangla-text">
                    অভিনন্দন! আপনি এখন একজন প্রিমিয়াম সদস্য। আপনার অ্যাকাউন্টে সমস্ত প্রিমিয়াম ফিচার সক্রিয় করা হয়েছে।
                </p>

                {/* Payment Details */}
                {paymentData && (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 bangla-text">পেমেন্ট বিবরণ</h3>
                        <div className="space-y-3 text-left">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <CreditCard className="w-4 h-4" />
                                    <span className="bangla-text">পরিমাণ</span>
                                </span>
                                <span className="font-bold text-gray-900">
                                    ৳{(paymentData.amount / 100).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span className="bangla-text">তারিখ</span>
                                </span>
                                <span className="font-semibold text-gray-900">
                                    {new Date(paymentData.paymentDate).toLocaleDateString('bn-BD')}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 bangla-text">স্ট্যাটাস</span>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold bangla-text">
                                    সম্পন্ন
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    <Link
                        to="/dashboard"
                        className="block w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg bangla-text"
                    >
                        ড্যাশবোর্ডে যান
                    </Link>
                    <Link
                        to="/"
                        className="block w-full py-3 bg-white text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors border border-gray-200 flex items-center justify-center gap-2 bangla-text"
                    >
                        <Home className="w-5 h-5" />
                        হোমে ফিরে যান
                    </Link>
                </div>

                <p className="mt-6 text-sm text-gray-500 bangla-text">
                    আপনি স্বয়ংক্রিয়ভাবে ৬ সেকেন্ডে ড্যাশবোর্ডে রিডাইরেক্ট হবেন...
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
