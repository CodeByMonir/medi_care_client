"use client";

import { useState } from "react";
import Link from "next/link";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaSpinner, FaPaperPlane } from "react-icons/fa";

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            // Simulation for an API endpoint post request
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setSuccess("Thank you! Your inquiry has been sent successfully. We will get back to you within 24 hours.");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            setError("Something went wrong while dispatching your request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const contactDetails = [
        { icon: <FaPhoneAlt />, title: "Call Us 24/7", value: "+1 (555) 123-4567", sub: "Emergency hotlines always active" },
        { icon: <FaEnvelope />, title: "Email Support", value: "support@medicareconnect.com", sub: "General response within 2-4 hours" },
        { icon: <FaMapMarkerAlt />, title: "Main Clinic", value: "123 Healthcare Ave, NY", sub: "Centrally located corporate building" },
    ];

    // Force-lock string for input fields: White bg, black text, slate placeholder in light mode
    const inputClasses = "w-full rounded-xl border border-slate-300 !bg-white !text-slate-900 !placeholder-slate-400 px-4 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50 dark:border-slate-700 dark:!bg-slate-950 dark:!text-slate-100 dark:!placeholder-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 dark:disabled:bg-slate-900";

    return (
        <main className="min-h-screen bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 transition-colors duration-200 py-12">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header Banner */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                        Get In Touch
                    </span>
                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        We're Here to Help You
                    </h1>
                    <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
                        Have a question about scheduling, medical records, or platform pricing? Leave a message or dial our direct helpline.
                    </p>
                </div>

                {/* Grid Wrapper */}
                <div className="grid lg:grid-cols-3 gap-8 items-start">

                    {/* Left Column: Essential Contacts Info */}
                    <div className="space-y-6 lg:col-span-1">
                        {contactDetails.map((detail, idx) => (
                            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex gap-4 items-start">
                                <div className="rounded-xl bg-blue-50 p-3.5 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 shrink-0 text-lg">
                                    {detail.icon}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white text-base">{detail.title}</h3>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 break-all">{detail.value}</p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">{detail.sub}</p>
                                </div>
                            </div>
                        ))}

                        {/* Working Hours Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-md dark:from-blue-950 dark:to-indigo-950">
                            <div className="flex items-center gap-2 font-bold text-lg mb-3">
                                <FaClock />
                                <span>Operational Hours</span>
                            </div>
                            <p className="text-sm text-blue-100 leading-relaxed">
                                Our platform support infrastructure, booking services, and general video telemetry networks remain operational **24 hours a day, 7 days a week**.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Interactive Form and Map Placeholder */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Interactive Message Form Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-8 dark:bg-slate-900 dark:border-slate-800 shadow-xl">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Send Us a Direct Message</h2>

                            {/* Status Banners */}
                            {success && (
                                <div className="mb-6 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                                    {success}
                                </div>
                            )}
                            {error && (
                                <div className="mb-6 rounded-xl bg-rose-50 p-4 text-sm font-medium text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    {/* Name Input */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            disabled={loading}
                                            placeholder="John Doe"
                                            className={inputClasses}
                                        />
                                    </div>
                                    {/* Email Input */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={loading}
                                            placeholder="you@example.com"
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>

                                {/* Subject Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Subject Matter</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        disabled={loading}
                                        placeholder="How can we help you?"
                                        className={inputClasses}
                                    />
                                </div>

                                {/* Message Content Textarea */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Message / Inquiry Details</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        disabled={loading}
                                        placeholder="Type comprehensive details regarding your inquiry..."
                                        className={`${inputClasses} resize-none`}
                                    ></textarea>
                                </div>

                                {/* Form Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <FaSpinner className="animate-spin text-base" />
                                            Processing Transmission...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="text-xs" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Visual Map Aspect Container */}
                        <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative bg-slate-200 dark:bg-slate-900 shadow-sm group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                <div className="p-3 bg-white dark:bg-slate-950 rounded-full text-blue-600 shadow-md transform group-hover:scale-110 transition duration-300">
                                    <FaMapMarkerAlt className="text-xl" />
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white mt-3 text-sm">Interactive Map Engine Integration</h4>
                                <p className="text-xs text-slate-400 mt-1 max-w-xs">123 Healthcare Ave, Midtown Manhattan, New York, NY 10001</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
}