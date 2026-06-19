"use client";

import { useState, useEffect } from "react";
import {
    FaUser,
    FaEnvelope,
    FaIdCard,
    FaPhone,
    FaMapMarkerAlt,
    FaTint,
    FaWeight,
    FaRulerVertical,
    FaSave,
    FaSpinner,
    FaCheckCircle
} from "react-icons/fa";
import { authClient } from "@/src/lib/auth-client";

export default function PatientProfilePage() {
    const { data: session, isPending } = authClient.useSession();

    // Form and state management
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        phone: "",
        address: "",
        bloodGroup: "O+",
        weight: "",
        height: ""
    });

    // Populate profile mock data or fetched database attributes if available
    useEffect(() => {
        if (session?.user) {
            // Pre-populate with mock health records for presentation
            setFormData({
                phone: "+1 (555) 234-5678",
                address: "123 Healthwood Drive, New York, NY",
                bloodGroup: "A+",
                weight: "72",
                height: "178"
            });
        }
    }, [session]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");

        // Simulate API endpoint connection latency
        setTimeout(() => {
            setLoading(false);
            setSuccessMessage("Your profile information has been successfully saved!");

            // Auto-clear success state banner
            setTimeout(() => setSuccessMessage(""), 4000);
        }, 1200);
    };

    if (isPending) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2 text-slate-500">
                <FaSpinner className="animate-spin text-2xl text-blue-600" />
                <p className="text-sm font-medium">Loading session attributes...</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center">
            <div className="max-w-3xl space-y-6 animate-fade-in py-10">
                {/* Header Description */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Profile</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage your personal information, core contact channels, and vitals.
                    </p>
                </div>

                {/* Success Alert Banner */}
                {successMessage && (
                    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20">
                        <FaCheckCircle className="shrink-0" />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Main Form Body Container */}
                <form onSubmit={handleProfileUpdate} className="space-y-6">

                    {/* SECTION 1: AUTH INTEGRATION DATA (READ-ONLY) */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Account Identity (Verified)</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name display */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                                        <FaUser className="text-xs" />
                                    </div>
                                    <input
                                        type="text"
                                        disabled
                                        value={session?.user?.name || ""}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50 pl-9 pr-4 py-2.5 text-sm text-slate-500 dark:text-slate-400 outline-none cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Email display */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                                        <FaEnvelope className="text-xs" />
                                    </div>
                                    <input
                                        type="email"
                                        disabled
                                        value={session?.user?.email || ""}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50 pl-9 pr-4 py-2.5 text-sm text-slate-500 dark:text-slate-400 outline-none cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Meta Account Identifier */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Patient ID String Reference</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                                    <FaIdCard className="text-xs" />
                                </div>
                                <input
                                    type="text"
                                    disabled
                                    value={session?.user?.id || ""}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50 pl-9 pr-4 py-2.5 text-xs font-mono text-slate-400 outline-none select-all cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: EDITABLE CONTACT METRICS */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Contact Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Phone input */}
                            <div className="md:col-span-1">
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                                        <FaPhone className="text-xs" />
                                    </div>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950 pl-9 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                    />
                                </div>
                            </div>

                            {/* Address input */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Residential Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                                        <FaMapMarkerAlt className="text-xs" />
                                    </div>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950 pl-9 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: VITAL HEALTH SUMMARY CARDS */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Medical Metrics & Vitals</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Blood Type Selection */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Blood Type</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-rose-500 pointer-events-none">
                                        <FaTint className="text-xs" />
                                    </div>
                                    <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950 pl-9 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 appearance-none"
                                    >
                                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Weight input */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Weight (kg)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                                        <FaWeight className="text-xs" />
                                    </div>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        placeholder="e.g. 70"
                                        className="w-full rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950 pl-9 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                    />
                                </div>
                            </div>

                            {/* Height input */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Height (cm)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                                        <FaRulerVertical className="text-xs" />
                                    </div>
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        placeholder="e.g. 175"
                                        className="w-full rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950 pl-9 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FORM CONTROLS FOOTER */}
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition disabled:opacity-75"
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin text-sm" />
                                    Saving adjustments...
                                </>
                            ) : (
                                <>
                                    <FaSave className="text-sm" />
                                    Save Profile Changes
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}