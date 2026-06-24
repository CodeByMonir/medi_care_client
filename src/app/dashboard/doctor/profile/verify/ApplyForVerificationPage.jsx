"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/src/lib/auth-client";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaIdCard,
    FaSave,
    FaCamera,
    FaClock,
    FaSpinner,
    FaLock,
    FaCheckCircle,
    FaHourglassHalf,
    FaFingerprint
} from "react-icons/fa";
import { createDoctor } from "@/src/lib/actions/doctors";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Ordered array for medical classifications options drop list selection panels
const SPECIALIZATIONS = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Dermatology"
];

export default function ApplyForVerificationPage({ doctor }) {
    const { data: session, isPending } = useSession();

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Added license configuration key inside state blueprint
    const [profile, setProfile] = useState({
        license: "",
        name: "",
        email: "",
        phone: "",
        specialization: "", // Saved cleanly through select options
        qualifications: "",
        experience: "",
        biography: "",
        consultationFee: "",
        hospitalName: "",
        profileImage: ""
    });

    // Interactive day selection arrays
    const [availableDays, setAvailableDays] = useState([]);
    // Slot mapping representation: [{ day: "Monday", from: "09:00", to: "17:00" }]
    const [availableSlots, setAvailableSlots] = useState([]);

    const verification = session?.user?.verification || "pending";

    useEffect(() => {
        if (session?.user) {
            // Generate a unique, deterministic random identifier token for tracking parameters
            const generatedId = `DOC-${Math.floor(1000 + Math.random() * 9000)}`;

            setProfile((prev) => ({
                ...prev,
                license: prev.license || generatedId, // Retain if already present, otherwise apply new
                name: session.user.name || "",
                email: session.user.email || "",
                profileImage: session.user.image || ""
            }));
        }
    }, [session]);

    const handleInputChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    // Toggle active weekday visibility state pipelines
    const toggleDaySelection = (day) => {
        if (availableDays.includes(day)) {
            setAvailableDays(availableDays.filter((d) => d !== day));
            setAvailableSlots(availableSlots.filter((slot) => slot.day !== day));
        } else {
            setAvailableDays([...availableDays, day]);
            setAvailableSlots([...availableSlots, { day, from: "09:00", to: "17:00" }]);
        }
    };

    // Alter continuous slot timing changes safely
    const handleSlotTimeChange = (day, field, value) => {
        setAvailableSlots(
            availableSlots.map((slot) =>
                slot.day === day ? { ...slot, [field]: value } : slot
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");

        // Format dynamic local slots list cleanly back into descriptive strings "HH:MM AM/PM - HH:MM AM/PM"
        const formattedSlots = availableSlots.map((slot) => {
            const formatTime = (timeStr) => {
                if (!timeStr) return "";
                const [hours, minutes] = timeStr.split(":");
                const h = parseInt(hours, 10);
                const ampm = h >= 12 ? "PM" : "AM";
                const formattedHours = h % 12 || 12;
                return `${String(formattedHours).padStart(2, "0")}:${minutes} ${ampm}`;
            };
            return {
                day: slot.day,
                hours: `${formatTime(slot.from)} - ${formatTime(slot.to)}`
            };
        });

        const doctorData = {
            license: profile.license, // Dispatched cleanly to database collections storage records
            doctorId: doctor?.id,
            name: session.user.name,
            email: session.user.email,
            phone: profile.phone,
            verification: "pending",
            profileImage: session.user.image,
            specialization: profile.specialization,
            qualifications: profile.qualifications,
            experience: Number(profile.experience),
            consultationFee: Number(profile.consultationFee),
            hospitalName: profile.hospitalName,
            availableDays: availableDays,
            availableSlots: formattedSlots,
            biography: profile.biography,
            createdAt: new Date(),
        };

        try {
            const res = await createDoctor(doctorData);
            if (res?.insertedId) {
                toast.success("Requested for Verification Successfully");
                setSuccessMessage(`Your application files under ID ${profile.license} have been recorded and sent for processing.`);
            } else {
                toast.error("Failed to submit request.");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred during submission.");
        } finally {
            setLoading(false);
        }

        redirect('/dashboard/doctor/profile')
    };

    const inputClasses = "w-full rounded-xl border border-slate-300 !bg-white px-4 py-2.5 text-sm !text-slate-900 !placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:!bg-slate-950 dark:!text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400 disabled:opacity-60";

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

    if (!session?.user) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center px-4">
                <div className="max-w-sm text-center space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-md">
                    <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-500 flex items-center justify-center mx-auto text-lg">
                        <FaLock />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Access Unauthorized</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Please establish an active session connection to submit your practitioner request.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-700 dark:text-slate-300 transition-colors duration-200">

            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                    Practitioner Verification Application
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Submit your clinical configurations, medical credentials, and operational schedules to verify your profile.
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
                            {profile.profileImage ? (
                                <img
                                    src={profile.profileImage}
                                    alt="Doctor Portrait"
                                    className="w-full h-full rounded-full object-cover ring-4 ring-slate-100 dark:ring-slate-800 shadow-md"
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center ring-4 ring-slate-50 dark:ring-slate-900 shadow-md">
                                    <FaUser className="text-4xl text-slate-400" />
                                </div>
                            )}
                            <button
                                type="button"
                                className="absolute bottom-1 right-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition"
                                aria-label="Upload profile image"
                            >
                                <FaCamera className="text-xs" />
                            </button>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="flex items-center gap-1.5 flex-wrap justify-center">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                    {profile.name || "Dr. Unnamed Application"}
                                </h3>

                                {verification === "verified" && (
                                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 text-[11px] font-bold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/50 shadow-sm">
                                        <FaCheckCircle className="text-xs" /> Verified
                                    </span>
                                )}

                                {verification === "pending" && (
                                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/50 shadow-sm">
                                        <FaHourglassHalf className="text-xs animate-pulse" /> Review Pending
                                    </span>
                                )}
                            </div>

                            <span className="inline-flex items-center gap-1 text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                                <FaFingerprint className="text-slate-400" /> {profile.license || "Generating..."}
                            </span>
                        </div>

                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mt-3">
                            {profile.specialization || "Specialty Not Provided"}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                            {profile.hospitalName || "Hospital Affiliation Empty"}
                        </p>
                    </div>

                    {/* Operational Availability Selection Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 space-y-4">
                        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                            <FaClock className="text-slate-500 dark:text-slate-400 text-sm" />
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Operational Schedules</h3>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Select Active Days</label>
                            <div className="flex flex-wrap gap-1.5">
                                {WEEKDAYS.map((day) => {
                                    const isSelected = availableDays.includes(day);
                                    return (
                                        <button
                                            type="button"
                                            key={day}
                                            onClick={() => toggleDaySelection(day)}
                                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${isSelected
                                                ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                                                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-700"
                                                }`}
                                        >
                                            {day.slice(0, 3)}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {availableSlots.length > 0 && (
                            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Set Shift Hours</label>
                                {availableSlots.map((slot) => (
                                    <div key={slot.day} className="flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-100 dark:border-slate-900">
                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 w-16">{slot.day.slice(0, 5)}</span>
                                        <div className="flex items-center gap-1.5 text-slate-900">
                                            <input
                                                type="time"
                                                value={slot.from}
                                                onChange={(e) => handleSlotTimeChange(slot.day, "from", e.target.value)}
                                                className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded outline-none dark:text-white"
                                            />
                                            <span className="text-xs text-slate-400">-</span>
                                            <input
                                                type="time"
                                                value={slot.to}
                                                onChange={(e) => handleSlotTimeChange(slot.day, "to", e.target.value)}
                                                className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded outline-none dark:text-white"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
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
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Assigned Doctor Reference Token ID</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-xs font-bold">
                                        <FaFingerprint />
                                    </span>
                                    <input
                                        type="text"
                                        name="license"
                                        value={profile.license}
                                        className={`${inputClasses} !pl-10 font-mono font-bold bg-slate-50 dark:bg-slate-900`}
                                        required
                                        disabled
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Doctor Full Name</label>
                                <input type="text" name="name" value={profile.name} onChange={handleInputChange} className={inputClasses} required disabled />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                                <input type="email" name="email" value={profile.email} onChange={handleInputChange} className={inputClasses} required disabled />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Contact Telephone</label>
                                <input type="text" name="phone" value={profile.phone} onChange={handleInputChange} className={inputClasses} required placeholder="+1 (555) 000-0000" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Years of Experience</label>
                                <input type="number" name="experience" value={profile.experience} onChange={handleInputChange} className={inputClasses} required placeholder="e.g. 8" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Biography Summary</label>
                            <textarea
                                name="biography"
                                rows={3}
                                value={profile.biography}
                                onChange={handleInputChange}
                                className={`${inputClasses} !py-3 resize-none`}
                                required
                                placeholder="Tell patients about your medical background..."
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
                            {/* Updated Specialization field to a drop-down menu component */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Medical Specialization</label>
                                <select
                                    name="specialization"
                                    value={profile.specialization}
                                    onChange={handleInputChange}
                                    className={`${inputClasses} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_16px_center] bg-no-repeat pr-10`}
                                    required
                                >
                                    <option value="" disabled hidden>Select Specialization</option>
                                    {SPECIALIZATIONS.map((spec) => (
                                        <option key={spec} value={spec} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                                            {spec}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Primary Hospital Affiliation</label>
                                <input type="text" name="hospitalName" value={profile.hospitalName} onChange={handleInputChange} className={inputClasses} required placeholder="e.g. City General Hospital" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Qualifications & Accreditations</label>
                                <input type="text" name="qualifications" value={profile.qualifications} onChange={handleInputChange} className={inputClasses} required placeholder="MD, Ph.D, Board Certified etc." />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Consultation Session Fee ($ USD)</label>
                                <input type="number" name="consultationFee" value={profile.consultationFee} onChange={handleInputChange} className={inputClasses} required placeholder="100" />
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/80 rounded-xl transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || availableDays.length === 0}
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Submitting Request..." : <><FaSave className="text-xs" /> Submit Verification Request</>}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}