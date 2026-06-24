"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/src/lib/auth-client";
import {
    FaUser,
    FaIdCard,
    FaClock,
    FaSpinner,
    FaLock,
    FaCheckCircle,
    FaHourglassHalf,
    FaExclamationTriangle,
    FaUserEdit,
    FaArrowRight
} from "react-icons/fa";
import { toast } from "react-toastify";
import { getDoctorData } from "@/src/lib/api/doctors";

export default function DoctorProfilePage() {
    const { data: session, isPending } = useSession();
    const [loading, setLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(true);

    // Core profile state structure
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

    const verification = session?.user?.verification || "pending";

    useEffect(() => {
        const loadDoctorRecord = async () => {
            if (!session?.user) return;

            try {
                setLoading(true);
                const doctorId = session?.user?.id; // Replace with your dynamic context ID as needed
                const doctorData = await getDoctorData(doctorId);

                console.log("api data", doctorData)

                // Handle scenarios where doctorData is missing or empty
                if (!doctorData || (Array.isArray(doctorData) && doctorData.length === 0)) {
                    setIsRegistered(false);
                    return;
                }

                // Treat doctorData as an array and parse it using the .map() method
                const parsedProfiles = (Array.isArray(doctorData) ? doctorData : [doctorData]).map((doc) => ({
                    name: doc?.name || "",
                    email: doc?.email || "",
                    phone: doc?.phone || "",
                    verification: doc?.verification,
                    specialization: doc?.specialization || "",
                    qualifications: doc?.qualifications || "",
                    experience: doc?.experience || "",
                    biography: doc?.biography || "",
                    consultationFee: doc?.consultationFee || "",
                    hospitalName: doc?.hospitalName || "",
                    profileImage: doc?.profileImage || "",
                    availableDays: doc?.availableDays || [],
                    availableSlots: (doc?.availableSlots || []).map(slot => ({
                        day: slot?.day || "Unscheduled Day",
                        hours: slot?.hours || "Closed"
                    }))
                }));

                // Take the successfully mapped entry and update the active layout instance
                if (parsedProfiles.length > 0) {
                    setProfile(parsedProfiles[0]);
                    setIsRegistered(true);
                } else {
                    setIsRegistered(false);
                }

            } catch (error) {
                console.error("Critical stream error reading profile document maps:", error);
                toast.error("Failed to extract medical profile configurations.");
                setIsRegistered(false);
            } finally {
                setLoading(false);
            }
        };

        if (!isPending) {
            loadDoctorRecord();
        }
    }, [session, isPending]);

    const infoLabelClasses = "block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5";
    const infoValueClasses = "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium text-slate-800 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-200";

    if (isPending || loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center space-y-3">
                    <FaSpinner className="animate-spin text-3xl text-blue-600 dark:text-blue-400 mx-auto" />
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Assembling verified practitioner dashboard syncs...</p>
                </div>
            </div>
        );
    }


    // unauthorized session
    if (!session?.user) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-sm text-center space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-500 flex items-center justify-center mx-auto text-lg">
                        <FaLock />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Access Unauthorized</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Please validate your session tokens to access credentials files.</p>
                </div>
            </div>
        );
    }

    {/* Fallback View: Profile Registration / Verification Redirection Notice */ }
    if (!isRegistered) {
        return (
            <div className="flex min-h-[85vh] items-center justify-center px-4 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-500 flex items-center justify-center mx-auto text-2xl shadow-inner">
                        <FaExclamationTriangle />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">You Are Not Verified</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                            Your healthcare practitioner registry is unconfigured or pending credentials activation setup.
                        </p>
                    </div>
                    <div className="pt-2">
                        <Link
                            href="/dashboard/doctor/profile/verify"
                            className="inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md transition-all duration-150 transform active:scale-95"
                        >
                            Complete Verification Setup <FaArrowRight className="text-[10px]" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-700 dark:text-slate-300 transition-colors duration-200">

            {/* Page Action Header Component */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        Practitioner Directory File
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Review your operational medical listings and verified directory properties.
                    </p>
                </div>
                <Link
                    href="/dashboard/doctor/profile/update"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md transition-all duration-150 transform active:scale-95"
                >
                    <FaUserEdit className="text-sm" /> Update Profile
                </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">

                {/* Left Profile Status Block */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            {profile.profileImage ? (
                                <img
                                    src={profile.profileImage}
                                    alt="Doctor Avatar Master"
                                    className="w-full h-full rounded-full object-cover ring-4 ring-slate-100 dark:ring-slate-800 shadow-md"
                                    onError={(e) => {
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
                                {profile.name || "Dr. Unnamed Records"}
                            </h3>

                            {profile.verification === "verified" && (
                                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 text-[11px] font-bold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/50 shadow-sm">
                                    <FaCheckCircle className="text-xs" /> Verified Active
                                </span>
                            )}

                            {profile.verification === "pending" && (
                                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/50 shadow-sm">
                                    <FaHourglassHalf className="text-xs animate-pulse" /> Status Pending
                                </span>
                            )}
                        </div>

                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mt-1.5">
                            {profile.specialization || "No Specialty Field Provided"}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                            {profile.hospitalName || "Hospital Affiliation Empty"}
                        </p>
                    </div>

                    {/* Operational Duty Shift Listings */}
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6">
                        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                            <FaClock className="text-slate-500 dark:text-slate-400 text-sm" />
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Operational Shift Metrics</h3>
                        </div>
                        <div className="space-y-3">
                            {profile.availableSlots?.length > 0 ? (
                                profile.availableSlots.map((slot, index) => (
                                    <div key={index} className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-slate-500 dark:text-slate-400">{slot?.day}</span>
                                        <span className="font-medium text-slate-800 dark:text-slate-200">{slot?.hours}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-slate-400 italic">No duty shifts configured dynamically.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Profile Breakdown Details */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Block A: General Identity Info */}
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 md:p-8 space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                            <h2 className="font-bold text-base text-slate-900 dark:text-white">Registry Personal Information</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className={infoLabelClasses}>Full Display Name</label>
                                <div className={infoValueClasses}>{profile.name || "—"}</div>
                            </div>
                            <div>
                                <label className={infoLabelClasses}>Registered Email Channel</label>
                                <div className={infoValueClasses}>{profile.email || "—"}</div>
                            </div>
                            <div>
                                <label className={infoLabelClasses}>Contact Telephone</label>
                                <div className={infoValueClasses}>{profile.phone || "—"}</div>
                            </div>
                            <div>
                                <label className={infoLabelClasses}>Clinical Experience (Years)</label>
                                <div className={infoValueClasses}>{profile.experience ? `${profile.experience} Years` : "—"}</div>
                            </div>
                        </div>

                        <div>
                            <label className={infoLabelClasses}>Practitioner Biography Statement</label>
                            <div className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-200 min-h-[100px] whitespace-pre-wrap leading-relaxed">
                                {profile.biography || "No biography overview statement configured yet."}
                            </div>
                        </div>
                    </div>

                    {/* Block B: Credentials & Pricing Matrix */}
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 md:p-8 space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <FaIdCard className="text-emerald-600 dark:text-emerald-400 text-sm" />
                            <h2 className="font-bold text-base text-slate-900 dark:text-white">Qualifications & Node Affiliations</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className={infoLabelClasses}>Clinical Field Specialization</label>
                                <div className={infoValueClasses}>{profile.specialization || "—"}</div>
                            </div>
                            <div>
                                <label className={infoLabelClasses}>Affiliated Medical Center</label>
                                <div className={infoValueClasses}>{profile.hospitalName || "—"}</div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className={infoLabelClasses}>Degrees & Certifications Held</label>
                                <div className={infoValueClasses}>{profile.qualifications || "—"}</div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className={infoLabelClasses}>Standard Appointment Consultation Fee</label>
                                <div className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-bold text-emerald-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-emerald-400">
                                    {profile.consultationFee ? `$${profile.consultationFee} USD` : "—"}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}