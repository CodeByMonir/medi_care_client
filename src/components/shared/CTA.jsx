import Link from "next/link";
import { FaCalendarPlus, FaUserPlus, FaCheckCircle } from "react-icons/fa";

export default function CTA() {
    return (
        <section className="bg-white py-16 sm:py-24 dark:bg-slate-950 transition-colors duration-200">
            <div className="container mx-auto px-4">
                {/* Main Callout Box */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 py-12 text-center shadow-xl dark:from-blue-950 dark:via-slate-900 dark:to-indigo-950 sm:px-12 sm:py-16 md:px-16">

                    {/* Decorative Background Glows */}
                    <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"></div>

                    {/* Content Wrapper */}
                    <div className="relative mx-auto max-w-2xl">
                        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            Ready to Prioritize Your Health?
                        </h2>
                        <p className="mt-4 text-base sm:text-lg leading-relaxed text-blue-100 dark:text-slate-300">
                            Join thousands of patients who trust MediCare Connect for swift, secure, and expert healthcare. Book your virtual or in-person consultation in less than two minutes.
                        </p>

                        {/* Quick Trust Checklist */}
                        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-blue-100 dark:text-slate-400">
                            <span className="flex items-center gap-1.5">
                                <FaCheckCircle className="text-emerald-400 shrink-0" /> Free Registration
                            </span>
                            <span className="flex items-center gap-1.5">
                                <FaCheckCircle className="text-emerald-400 shrink-0" /> 24/7 Support Access
                            </span>
                            <span className="flex items-center gap-1.5">
                                <FaCheckCircle className="text-emerald-400 shrink-0" /> Verified Specialists
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/doctors"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-bold text-blue-700 shadow-md hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <FaCalendarPlus />
                                Book Appointment
                            </Link>

                            <Link
                                href="/register"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-6 py-3.5 text-base font-bold text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/60 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <FaUserPlus />
                                Create Free Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}