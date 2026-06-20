"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/src/lib/auth-client";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaIdCard,
    FaEdit,
    FaLink,
    FaClock,
    FaSpinner,
    FaLock,
    FaCheckCircle,
    FaHourglassHalf
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function DoctorProfilePage() {
    const { data: session, isPending } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    // Profile state mapped to MongoDB document schemas
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        qualifications: "",
        experience: "",
        biography: "",
        consultationFee: "",
        hospitalName: "",
        profileImage: "",
        availableDays: [],
        availableSlots: []
    });

    const verificationStatus = session?.user?.verificationStatus || "pending";

    // Simulate fetching the saved verified profile from MongoDB on mount
    useEffect(() => {
        if (session?.user) {
            setLoading(true);
            setTimeout(() => {
                setProfile({
                    name: session.user.name || "Dr. Alex Callaway",
                    email: session.user.email || "alex.callaway@hospital.com",
                    phone: "+1 (555) 234-5678",
                    specialization: "Cardiology",
                    qualifications: "MD, FACC, Board Certified in Cardiovascular Disease",
                    experience: "12",
                    biography: "Dr. Alex Callaway is a board-certified cardiologist specializing in non-invasive cardiology, heart failure management, and advanced cardiovascular imaging systems.",
                    consultationFee: "150",
                    hospitalName: "Metro Health Medical Center",
                    profileImage: session.user.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
                    availableDays: ["Monday", "Wednesday", "Friday"],
                    availableSlots: [
                        { day: "Monday", hours: "09:00 AM - 05:00 PM" },
                        { day: "Wednesday", hours: "09:00 AM - 01:00 PM" },
                        { day: "Friday", hours: "09:00 AM - 04:00 PM" }
                    ]
                });
                setLoading(false);
            }, 600);
        }
    }, [session]);

    const handleInputChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Call update handler code here (e.g., await updateDoctorProfile(profile))
            toast.success("Profile records updated successfully");
            setIsEditing(false);
        } catch (err) {
            toast.error("Failed to alter document fields");
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400 disabled:opacity-60";

    if (isPending || loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center space-y-3">
                    <FaSpinner className="animate-spin text-3xl text-blue-600 dark:text-blue-400 mx-auto" />
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading verified medical dashboard...</p>
                </div>
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center px-4">
                <div className="max-w-sm text-center space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-md">
                    <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-500 flex items-center justify-center mx-auto text-lg">
                        <FaLock />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Access Unauthorized</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Please authenticate your account session.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-700 dark:text-slate-300 transition-colors duration-200">

            {/* Upper Header Block */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        Practitioner Profile
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage your live public directory details and operational configurations.
                    </p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        type="button"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md transition"
                    >
                        <FaEdit className="text-xs" /> Edit Profile Info
                    </button>
                )}
            </div>

            <form onSubmit={handleSaveChanges} className="grid lg:grid-cols-3 gap-8 items-start">

                {/* Left Profile Summary Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            {profile.profileImage ? (
                                <img
                                    src={profile.profileImage}
                                    alt="Doctor Portrait"
                                    className="w-full h-full rounded-full object-cover ring-4 ring-slate-100 dark:ring-slate-800 shadow-md"
                                    onError={(e) => {
                                        // Fallback broken image handling link
                                        e.target.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80";
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center ring-4 ring-slate-50 dark:ring-slate-900 shadow-md">
                                    <FaUser className="text-4xl text-slate-400" />
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-center gap-1.5 flex-wrap">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                {profile.name || "Dr. Unnamed Application"}
                            </h3>

                            {verificationStatus === "verified" && (
                                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 text-[11px] font-bold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/50 shadow-sm">
                                    <FaCheckCircle className="text-xs" /> Verified
                                </span>
                            )}

                            {verificationStatus === "pending" && (
                                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/50 shadow-sm">
                                    <FaHourglassHalf className="text-xs animate-pulse" /> Review Pending
                                </span>
                            )}
                        </div>

                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mt-1.5">
                            {profile.specialization || "Specialty Not Provided"}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                            {profile.hospitalName || "Hospital Affiliation Empty"}
                        </p>
                    </div>

                    {/* Operational Availability Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6">
                        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                            <FaClock className="text-slate-500 dark:text-slate-400 text-sm" />
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Weekly Duty Shifts</h3>
                        </div>
                        <div className="space-y-3">
                            {profile.availableSlots.length > 0 ? (
                                profile.availableSlots.map((slot, index) => (
                                    <div key={index} className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-slate-500 dark:text-slate-400">{slot.day}</span>
                                        <span className="font-medium text-slate-800 dark:text-slate-200">{slot.hours}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-slate-400 italic">No scheduled operating slots assigned.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Interactive Information Pane */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Block A: General Info */}
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 md:p-8 space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                            <h2 className="font-bold text-base text-slate-900 dark:text-white">Personal Records</h2>
                        </div>

                        {/* Image URL Link field configuration */}
                        {isEditing && (
                            <div className="animation-fadeIn bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 p-4 rounded-xl space-y-2">
                                <label className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                    <FaLink /> Update Profile Avatar Link
                                </label>
                                <input
                                    type="url"
                                    name="profileImage"
                                    value={profile.profileImage}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/your-photo.jpg"
                                    className={inputClasses}
                                />
                            </div>
                        )}

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Full Display Name</label>
                                <input type="text" name="name" value={profile.name} onChange={handleInputChange} className={inputClasses} disabled={!isEditing} required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Registered Email Address</label>
                                <input type="email" name="email" value={profile.email} className={inputClasses} disabled required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Contact Telephone</label>
                                <input type="text" name="phone" value={profile.phone} onChange={handleInputChange} className={inputClasses} disabled={!isEditing} required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Total Clinical Experience (Years)</label>
                                <input type="number" name="experience" value={profile.experience} onChange={handleInputChange} className={inputClasses} disabled={!isEditing} required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Practitioner Biography</label>
                            <textarea
                                name="biography"
                                rows={4}
                                value={profile.biography}
                                onChange={handleInputChange}
                                className={`${inputClasses} py-3 resize-none`}
                                disabled={!isEditing}
                                required
                            />
                        </div>
                    </div>

                    {/* Block B: Healthcare Qualifications */}
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 md:p-8 space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <FaIdCard className="text-emerald-600 dark:text-emerald-400 text-sm" />
                            <h2 className="font-bold text-base text-slate-900 dark:text-white">Credentials & Accreditations</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Specialization Field</label>
                                <input type="text" name="specialization" value={profile.specialization} onChange={handleInputChange} className={inputClasses} disabled={!isEditing} required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Hospital Affiliation</label>
                                <input type="text" name="hospitalName" value={profile.hospitalName} onChange={handleInputChange} className={inputClasses} disabled={!isEditing} required />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Medical Degrees & Qualifications</label>
                                <input type="text" name="qualifications" value={profile.qualifications} onChange={handleInputChange} className={inputClasses} disabled={!isEditing} required />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Standard Appointment Fee ($ USD)</label>
                                <input type="number" name="consultationFee" value={profile.consultationFee} onChange={handleInputChange} className={inputClasses} disabled={!isEditing} required />
                            </div>
                        </div>
                    </div>

                    {/* Operational Action Footer */}
                    {isEditing && (
                        <div className="flex justify-end gap-4 animation-fadeIn">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/80 rounded-xl transition"
                            >
                                Cancel Updates
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}