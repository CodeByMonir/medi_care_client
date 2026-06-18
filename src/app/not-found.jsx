// app/not-found.js
"use client";

import Link from "next/link";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
    return (
        <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-slate-50 px-4 text-center dark:bg-slate-950 transition-colors duration-200">
            <div className="max-w-md">
                {/* Animated Icon */}
                <div className="mb-6 inline-flex p-4 bg-blue-50 text-blue-600 rounded-full dark:bg-blue-950/50 dark:text-blue-400 animate-bounce">
                    <FaExclamationTriangle className="text-5xl" />
                </div>

                {/* Main 404 Heading */}
                <h1 className="text-8xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-9xl">
                    404
                </h1>

                {/* Sub-messages */}
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200 sm:text-3xl">
                    Page Not Found
                </h2>

                <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
                    Sorry, we couldn't find the page you're looking for. The link might be broken or the URL was mistyped.
                </p>

                {/* Action Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                    >
                        <FaHome />
                        Go Back Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                    >
                        <FaArrowLeft />
                        Go Back
                    </button>
                </div>
            </div>
        </main>
    );
}