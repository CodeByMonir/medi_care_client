"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/src/lib/auth-client"; // Importing your Better Auth hook
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaIdCard,
    FaSave,
    FaCamera,
    FaClock,
    FaSpinner,
    FaLock
} from "react-icons/fa";

export default function DoctorProfilePage() {
    // 1. Fetch live session variables from Better Auth
    const { data: session, isPending, error: sessionError } = useSession();

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "+1 (555) 234-5678",
        specialty: "Cardiology",
        biography: "Dr. Alexander Callaway is a board-certified cardiologist with over 12 years of experience specializing in non-invasive cardiology, heart failure management, and cardiovascular imaging.",
        licenseNumber: "MD-98765432-NY",
        hospitalAffiliation: "Metro Health Medical Center",
        consultationFee: "150"
    });

    // 2. Sync profile fields when session finishes resolving
    useEffect(() => {
        if (session?.user) {
            const nameParts = session.user.name?.split(" ") || ["", ""];
            setProfile((prev) => ({
                ...prev,
                firstName: nameParts[0] || "",
                lastName: nameParts.slice(1).join(" ") || "",
                email: session.user.email || ""
            }));
        }
    }, [session]);

    const [schedule] = useState([
        { day: "Monday", hours: "09:00 AM - 05:00 PM", active: true },
        { day: "Tuesday", hours: "09:00 AM - 05:00 PM", active: true },
        { day: "Wednesday", hours: "09:00 AM - 01:00 PM", active: true },
        { day: "Thursday", hours: "09:00 AM - 05:00 PM", active: true },
        { day: "Friday", hours: "09:00 AM - 04:00 PM", active: true },
        { day: "Saturday", hours: "Unavailable", active: false },
        { day: "Sunday", hours: "Unavailable", active: false },
    ]);

    const handleInputChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");

        setTimeout(() => {
            setLoading(false);
            setSuccessMessage("Profile changes successfully updated.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1200);
    };

    const inputClasses = "w-full rounded-xl border border-slate-300 !bg-white px-4 py-2.5 text-sm !text-slate-900 !placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:!bg-slate-950 dark:!text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400 disabled:opacity-60";

    // 3. Fallback Layout: Session loading state skeleton
    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center space-y-3">
                    <FaSpinner className="animate-spin text-3xl text-blue-600 dark:text-blue-400 mx-auto" />
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Verifying session credentials...</p>
                </div>
            </div>
        );
    }

    // 4. Fallback Layout: Unauthorized state screen
    if (!session?.user) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center px-4">
                <div className="max-w-sm text-center space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-md">
                    <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-500 flex items-center justify-center mx-auto text-lg">
                        <FaLock />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Access Unauthorized</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Please establish an active session connection to alter practitioner configuration sheets.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-700 dark:text-slate-300 transition-colors duration-200">

            {/* Header Area */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                    Profile Management
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Configure your public practitioner details, contact cards, and active clinic operating hours.
                </p>
            </div>

            {successMessage && (
                <div className="rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 items-start">

                {/* Left Side Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4 group">
                            <img
                                src={session.user.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80"}
                                alt="Doctor Portrait"
                                className="w-full h-full rounded-full object-cover ring-4 ring-slate-100 dark:ring-slate-800 shadow-md"
                            />
                            <button
                                type="button"
                                className="absolute bottom-1 right-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition"
                                aria-label="Upload profile image"
                            >
                                <FaCamera className="text-xs" />
                            </button>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                            Dr. {profile.firstName} {profile.lastName}
                        </h3>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mt-0.5">
                            {profile.specialty} Specialist
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                            {profile.hospitalAffiliation}
                        </p>
                    </div>

                    {/* Schedule Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6">
                        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                            <FaClock className="text-slate-500 dark:text-slate-400 text-sm" />
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Active Availability hours</h3>
                        </div>
                        <div className="space-y-3">
                            {schedule.map((slot, index) => (
                                <div key={index} className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-slate-500 dark:text-slate-400">{slot.day}</span>
                                    <span className={`font-medium ${slot.active ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-600'}`}>
                                        {slot.hours}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 md:p-8 space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                            <h2 className="font-bold text-base text-slate-900 dark:text-white">Personal Information</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">First Name</label>
                                <input type="text" name="firstName" value={profile.firstName} onChange={handleInputChange} className={inputClasses} required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Last Name</label>
                                <input type="text" name="lastName" value={profile.lastName} onChange={handleInputChange} className={inputClasses} required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                                <input type="email" name="email" value={profile.email} onChange={handleInputChange} className={inputClasses} required disabled />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Contact Telephone</label>
                                <input type="text" name="phone" value={profile.phone} onChange={handleInputChange} className={inputClasses} required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Biography Summary</label>
                            <textarea
                                name="biography"
                                rows={4}
                                value={profile.biography}
                                onChange={handleInputChange}
                                className={`${inputClasses} !py-3 resize-none`}
                                required
                            />
                        </div>
                    </div>

                    {/* Credentials Panel */}
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 md:p-8 space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <FaIdCard className="text-emerald-600 dark:text-emerald-400 text-sm" />
                            <h2 className="font-bold text-base text-slate-900 dark:text-white">Credentials & Licenses</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Medical Specialty</label>
                                <input type="text" name="specialty" value={profile.specialty} onChange={handleInputChange} className={inputClasses} required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">License Registration ID</label>
                                <input type="text" name="licenseNumber" value={profile.licenseNumber} onChange={handleInputChange} className={inputClasses} required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Primary Hospital Affiliation</label>
                                <input type="text" name="hospitalAffiliation" value={profile.hospitalAffiliation} onChange={handleInputChange} className={inputClasses} required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Consultation Session Fee ($ USD)</label>
                                <input type="number" name="consultationFee" value={profile.consultationFee} onChange={handleInputChange} className={inputClasses} required />
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/80 rounded-xl transition"
                        >
                            Cancel Changes
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md transition disabled:opacity-70"
                        >
                            {loading ? "Saving Records..." : <><FaSave className="text-xs" /> Save Profile Details</>}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}