"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaStethoscope, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner, FaUserMd, FaUserInjured } from "react-icons/fa";
import { signUp } from "@/src/lib/auth-client";

export default function RegisterPage() {
    const router = useRouter();
    // Added 'role' with a sensible default value ('patient')
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "patient" });
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

        // Password Validation Rules
        const password = formData.password;
        const hasMinLength = password.length >= 6;
        const hasCapitalLetter = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (!hasMinLength || !hasCapitalLetter || !hasNumber) {
            setError("Password must be at least 6 characters long, contain at least one capital letter, and one number.");
            return;
        }

        setLoading(true);

        try {
            // Better Auth passes additional custom database properties inside the data object
            const { data, error } = await signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                role: formData.role
            });

            console.log('Success', data)

            if (error) {
                setError(error.message || "Something went wrong. Please try again.");
                return;
            }

            setSuccess("Account created successfully! Redirecting...");
            setFormData({ name: "", email: "", password: "", role: "patient" });

            setTimeout(() => {
                router.push("/login");
            }, 2000);

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
                <div className="text-center mb-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        <FaStethoscope className="text-blue-600 dark:text-blue-400" />
                        <span>MediCare<span className="text-blue-600 dark:text-blue-400">Connect</span></span>
                    </Link>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Create your account</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Get started with us today</p>
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
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Role Selection Blocks */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Register As</label>
                        <div className="grid grid-cols-2 gap-3">
                            {/* Patient Card */}
                            <label className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition text-center select-none ${formData.role === "patient"
                                ? "border-blue-600 bg-blue-50/40 text-blue-600 dark:border-blue-400 dark:bg-blue-950/20 dark:text-blue-400"
                                : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/50 text-slate-600 dark:text-slate-400"
                                }`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="patient"
                                    checked={formData.role === "patient"}
                                    onChange={handleChange}
                                    className="sr-only"
                                    disabled={loading}
                                />
                                <FaUserInjured className="text-lg mb-1" />
                                <span className="text-xs font-bold">Patient</span>
                            </label>

                            {/* Doctor Card */}
                            <label className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition text-center select-none ${formData.role === "doctor"
                                ? "border-blue-600 bg-blue-50/40 text-blue-600 dark:border-blue-400 dark:bg-blue-950/20 dark:text-blue-400"
                                : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/50 text-slate-600 dark:text-slate-400"
                                }`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="doctor"
                                    checked={formData.role === "doctor"}
                                    onChange={handleChange}
                                    className="sr-only"
                                    disabled={loading}
                                />
                                <FaUserMd className="text-lg mb-1" />
                                <span className="text-xs font-bold">Doctor</span>
                            </label>
                        </div>
                    </div>

                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                                <FaUser className="text-sm" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                disabled={loading}
                                className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400 dark:disabled:bg-slate-900"
                            />
                        </div>
                    </div>

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
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
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
                        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                            Must be 6+ characters with 1 capital letter and 1 number.
                        </p>
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
                                Creating account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                {/* Footer Redirection Link */}
                <div className="mt-6 border-t border-slate-100 pt-4 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        Sign In
                    </Link>
                </div>

            </div>
        </main>
    );
}