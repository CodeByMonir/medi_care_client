"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaStethoscope, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { signIn } from "@/src/lib/auth-client";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            // Replace this block with your actual Better Auth client call:

            const { data, error } = await signIn.email({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                setError(error.message || "Invalid email or password.");
                return;
            }

            // Simulation for visual testing:
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setSuccess("Signed in successfully! Redirecting...");

            setTimeout(() => {
                router.push("/"); // Redirect to homepage or dashboard
                router.refresh();
            }, 1500);

        } catch (err) {
            setError("Failed to connect to the authentication server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950 transition-colors duration-200">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 transition-colors duration-200">

                {/* Branding & Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        <FaStethoscope className="text-blue-600 dark:text-blue-400" />
                        <span>MediCare<span className="text-blue-600 dark:text-blue-400">Connect</span></span>
                    </Link>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Welcome back</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sign in to your account</p>
                </div>

                {/* Status Messages */}
                {error && (
                    <div className="mb-4 rounded-lg bg-rose-50 p-4 text-sm font-medium text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 rounded-lg bg-emerald-50 p-4 text-sm font-medium text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                        {success}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                                <FaEnvelope className="text-sm" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                disabled={loading}
                                className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400 dark:disabled:bg-slate-900"
                            />
                        </div>
                    </div>

                    {/* Password Input with Toggle */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                            <Link href="/forgot-password" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                                <FaLock className="text-sm" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                disabled={loading}
                                className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400 dark:disabled:bg-slate-900"
                            />
                            {/* Toggle Button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={loading}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition focus:outline-none disabled:opacity-50"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin text-base" />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                {/* Footer Redirection Link */}
                <div className="mt-6 border-t border-slate-100 pt-4 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
                    Don't have an account yet?{" "}
                    <Link href="/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        Sign Up
                    </Link>
                </div>

            </div>
        </main>
    );
}