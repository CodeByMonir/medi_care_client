"use client";

import { useRouter } from "next/navigation";
import { FaLock, FaHome, FaArrowLeft } from "react-icons/fa";

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="w-full max-w-md text-center space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-10 shadow-sm">

                {/* Visual Icon Alert Block */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-500 text-2xl mx-auto ring-4 ring-rose-500/10 dark:ring-rose-500/5">
                    <FaLock />
                </div>

                {/* Main Typography Header Context */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        Access Unauthorized
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                        You do not have the required operational clearance credentials to access this system route resource.
                    </p>
                </div>

                {/* Decorative Divider Rule */}
                <hr className="border-slate-100 dark:border-slate-800/60 my-2" />

                {/* Navigation Controls Action Interface */}
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
                    <button
                        onClick={() => router.back()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800 rounded-xl shadow-sm transition-all active:scale-[0.98]"
                    >
                        <FaArrowLeft className="text-xs" /> Go Back
                    </button>

                    <button
                        onClick={() => router.push("/")}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md transition-all active:scale-[0.98]"
                    >
                        <FaHome className="text-xs" /> Return Home
                    </button>
                </div>
            </div>
        </div>
    );
}