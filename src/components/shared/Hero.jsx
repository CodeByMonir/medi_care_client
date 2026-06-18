import Link from "next/link";
import { FaCalendarPlus, FaUserMd, FaShieldAlt, FaClock } from "react-icons/fa";

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-b from-blue-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 transition-colors duration-200">
            <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text Content */}
                    <div className="space-y-6 text-center lg:text-left">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
                            Your Health, Our Priority
                        </span>

                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl md:text-6xl lg:leading-tight">
                            Connect with Top <span className="text-blue-600 dark:text-blue-400">Doctors</span> Anytime, Anywhere
                        </h1>

                        <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-600 dark:text-slate-400">
                            Streamline your healthcare experience. Book appointments with trusted medical professionals, manage your consultations, and receive expert care tailored just for you.
                        </p>

                        {/* Call to Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                            <Link
                                href="/doctors"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 hover:-translate-y-0.5"
                            >
                                <FaCalendarPlus />
                                Book an Appointment
                            </Link>

                            <Link
                                href="/about"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-all duration-200 hover:-translate-y-0.5"
                            >
                                Learn More
                            </Link>
                        </div>

                        {/* Quick Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800 max-w-md mx-auto lg:mx-0">
                            <div className="flex flex-col items-center lg:items-start">
                                <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">500+</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Expert Doctors</span>
                            </div>
                            <div className="flex flex-col items-center lg:items-start">
                                <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">10k+</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Happy Patients</span>
                            </div>
                            <div className="flex flex-col items-center lg:items-start">
                                <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">4.9/5</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">User Rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual / Feature Highlight */}
                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                        {/* Decorative background blur */}
                        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-10 dark:opacity-5 animate-pulse"></div>
                        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-emerald-400 rounded-full filter blur-3xl opacity-10 dark:opacity-5"></div>

                        {/* Feature grid placeholder box */}
                        <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900/50">
                                <FaUserMd className="text-3xl text-blue-600 dark:text-blue-400 mb-3" />
                                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Verified Doctors</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Rigorous background checks for every professional.</p>
                            </div>

                            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900/50">
                                <FaShieldAlt className="text-3xl text-emerald-600 dark:text-emerald-400 mb-3" />
                                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Secure Records</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Your encrypted health data is fully safe with us.</p>
                            </div>

                            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900/50">
                                <FaClock className="text-3xl text-amber-600 dark:text-amber-400 mb-3" />
                                <h3 className="font-semibold text-slate-900 dark:text-slate-100">24/7 Availability</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Get immediate medical attention when you need it.</p>
                            </div>

                            <div className="p-5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 flex flex-col justify-center items-center text-center">
                                <span className="text-sm font-bold text-blue-700 dark:text-blue-400">Need Emergency Care?</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3">Talk directly to our triage team.</p>
                                <Link href="/contact" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                    Contact Support →
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}