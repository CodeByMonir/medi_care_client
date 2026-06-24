"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/src/lib/auth-client";
import {
    FaUser,
    FaIdCard,
    FaSpinner,
    FaLock,
    FaSave,
    FaArrowLeft,
    FaPlus,
    FaTrash,
    FaCalendarAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { getDoctorData, updateDoctorData } from "@/src/lib/api/doctors";

export default function UpdateDoctorProfilePage({ doctor }) {

    const doctorId = doctor?.id;

    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Profile State Structure
    const [profile, setProfile] = useState({
        doctorId: doctorId || "",
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
        license: "",
        availableSlots: []
    });

    const loadDoctorRecord = async (targetId) => {
        if (!targetId.trim()) return;
        try {
            setLoading(true);
            const doctorData = await getDoctorData(targetId);

            if (!doctorData || (Array.isArray(doctorData) && doctorData.length === 0)) {
                toast.warning(`No database entries found matching configuration reference: ${targetId}`);
                setProfile((prev) => ({
                    ...prev,
                    doctorId: targetId,
                    name: "", phone: "", specialization: "", qualifications: "", experience: "", biography: "", consultationFee: "", hospitalName: "", profileImage: "", license: "", availableSlots: []
                }));
                return;
            }

            const parsedProfiles = (Array.isArray(doctorData) ? doctorData : [doctorData]).map((doc) => {
                const slots = (doc?.availableSlots || []).map(slot => ({
                    day: slot?.day || "Monday",
                    hours: slot?.hours || "09:00 AM - 05:00 PM"
                }));

                // FIX HERE: Extracts unique days directly from the available slots
                const extractedDays = Array.from(new Set(slots.map(s => s.day)));

                return {
                    doctorId: doc?.doctorId || targetId,
                    name: doc?.name || "",
                    email: doc?.email || session?.user?.email || "",
                    phone: doc?.phone || "",
                    specialization: doc?.specialization || "",
                    qualifications: doc?.qualifications || "",
                    experience: doc?.experience || "",
                    biography: doc?.biography || "",
                    consultationFee: doc?.consultationFee || "",
                    hospitalName: doc?.hospitalName || "",
                    profileImage: doc?.profileImage || "",
                    license: doc?.license || "",
                    availableDays: extractedDays, // Populated from available slots
                    availableSlots: slots
                };
            });

            if (parsedProfiles.length > 0) {
                setProfile(parsedProfiles[0]);
            }
        } catch (error) {
            console.error("Error looking up doctor configuration:", error);
            toast.error("Failed to fetch targeted schema records.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isPending && session?.user && doctorId) {
            loadDoctorRecord(doctorId);
        }
    }, [session, isPending, doctorId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSlotChange = (index, field, value) => {
        setProfile(prev => {
            const updatedSlots = [...prev.availableSlots];
            updatedSlots[index] = { ...updatedSlots[index], [field]: value };
            return { ...prev, availableSlots: updatedSlots };
        });
    };

    const addAvailableSlotNode = () => {
        setProfile(prev => ({
            ...prev,
            availableSlots: [...prev.availableSlots, { day: "Monday", hours: "09:00 AM - 05:00 PM" }]
        }));
    };

    const removeAvailableSlotNode = (index) => {
        setProfile(prev => ({
            ...prev,
            availableSlots: prev.availableSlots.filter((_, i) => i !== index)
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // FIX HERE: Generate unique availableDays from the slots before console/submission
        const computedDays = Array.from(new Set(profile.availableSlots.map(s => s.day)));
        const finalProfilePayload = {
            ...profile,
            availableDays: computedDays
        };

        try {
            
            updateDoctorData(doctorId, finalProfilePayload);
            toast.success("Profile records updated successfully.");
            router.push("/dashboard/doctor/profile");
        }
        catch (error) {
            console.error("Form update push failed:", error);
            toast.error("Failed to commit profile updates configuration.");
        }
        finally {
            setSubmitting(false);
        }
    };

    // Styling constants
    const inputClasses = "w-full rounded-xl border border-slate-300 !bg-white px-4 py-2.5 text-sm !text-black placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:!bg-slate-950 dark:!text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed";
    const labelClasses = "block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2";
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    if (isPending || loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center space-y-3">
                    <FaSpinner className="animate-spin text-3xl text-blue-600 dark:text-blue-400 mx-auto" />
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading profile data...</p>
                </div>
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-sm text-center space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-500 flex items-center justify-center mx-auto text-lg"><FaLock /></div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Access Unauthorized</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Please validate your session tokens to edit configurations.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-700 dark:text-slate-300 transition-colors duration-200">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Update Directory Records</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Modify your live professional criteria parameters and directory schemas.</p>
                </div>
                <button
                    onClick={() => router.push("/dashboard/doctor/profile")}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800 rounded-xl shadow-sm transition"
                >
                    <FaArrowLeft className="text-xs" /> Back to Profile
                </button>
            </div>

            <form onSubmit={handleFormSubmit} className="max-w-4xl space-y-6">

                {/* Section A: Core Metrics */}
                <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 md:p-8 space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                        <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                        <h2 className="font-bold text-base text-slate-900 dark:text-white">Identity Details</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClasses}>Profile Avatar URL Link</label>
                            <input type="url" name="profileImage" value={profile.profileImage} onChange={handleInputChange} placeholder="https://images.unsplash.com/photo..." className={inputClasses} />
                        </div>
                        <div>
                            <label className={labelClasses}>Full Display Name</label>
                            <input type="text" name="name" value={profile.name} onChange={handleInputChange} className={inputClasses} required />
                        </div>
                        <div>
                            <label className={labelClasses}>Account Email (Read Only)</label>
                            <input type="email" name="email" value={profile.email} className={inputClasses} disabled />
                        </div>
                        <div>
                            <label className={labelClasses}>Contact Telephone</label>
                            <input type="text" name="phone" value={profile.phone} onChange={handleInputChange} className={inputClasses} required />
                        </div>
                        <div>
                            <label className={labelClasses}>Clinical Experience (Years)</label>
                            <input type="number" name="experience" value={profile.experience} onChange={handleInputChange} className={inputClasses} required />
                        </div>
                    </div>

                    <div>
                        <label className={labelClasses}>Practitioner Biography Statement</label>
                        <textarea name="biography" rows={4} value={profile.biography} onChange={handleInputChange} className={`${inputClasses} py-3 resize-none`} placeholder="Tell patients about your medical background..." required />
                    </div>
                </div>

                {/* Section B: Availability Management Interface */}
                <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 md:p-8 space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                        <FaCalendarAlt className="text-indigo-600 dark:text-indigo-400 text-sm" />
                        <h2 className="font-bold text-base text-slate-900 dark:text-white">Duty Availability Settings</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className={labelClasses}>Configured Operational Shift Slots</label>
                            <button
                                type="button"
                                onClick={addAvailableSlotNode}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-900/60 rounded-lg transition"
                            >
                                <FaPlus /> Add Shift Row
                            </button>
                        </div>

                        {profile.availableSlots.length === 0 ? (
                            <p className="text-xs text-slate-400 italic bg-white dark:bg-slate-950 p-4 rounded-xl text-center border border-dashed border-slate-200 dark:border-slate-800">
                                No specific hourly operational blocks initialized. Add rows to define hours.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {profile.availableSlots.map((slot, index) => (
                                    <div key={index} className="flex items-center gap-3 !bg-white dark:!bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">

                                        {/* Day Select Dropdown */}
                                        <select
                                            value={slot.day}
                                            onChange={(e) => handleSlotChange(index, "day", e.target.value)}
                                            className="!bg-white dark:bg-slate-900 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 px-2 py-1.5 outline-none !text-black dark:text-slate-200"
                                        >
                                            {daysOfWeek.map(d => <option key={d} value={d} className="bg-white text-black">{d}</option>)}
                                        </select>

                                        {/* Hours Input Field */}
                                        <input
                                            type="text"
                                            value={slot.hours}
                                            onChange={(e) => handleSlotChange(index, "hours", e.target.value)}
                                            placeholder="e.g. 09:00 AM - 05:00 PM"
                                            className="flex-1 !bg-white dark:bg-slate-900 text-xs rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 outline-none !text-black dark:text-slate-200"
                                        />

                                        {/* Remove Action Button */}
                                        <button
                                            type="button"
                                            onClick={() => removeAvailableSlotNode(index)}
                                            className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                                        >
                                            <FaTrash className="text-xs" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Section C: Credentials, Accreditations & License */}
                <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 md:p-8 space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                        <FaIdCard className="text-emerald-600 dark:text-emerald-400 text-sm" />
                        <h2 className="font-bold text-base text-slate-900 dark:text-white">Credentials & Accreditations</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClasses}>Medical Field Specialization</label>
                            <input type="text" name="specialization" value={profile.specialization} onChange={handleInputChange} className={inputClasses} placeholder="Cardiology, Pediatrics..." required />
                        </div>
                        <div>
                            <label className={labelClasses}>Affiliated Healthcare Facility</label>
                            <input type="text" name="hospitalName" value={profile.hospitalName} onChange={handleInputChange} className={inputClasses} placeholder="City General Hospital..." required />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={labelClasses}>Medical License Number</label>
                            <input type="text" name="license" value={profile.license} onChange={handleInputChange} className={inputClasses} placeholder="e.g. MD-98765432" required />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={labelClasses}>Medical Certifications & Degrees Held</label>
                            <input type="text" name="qualifications" value={profile.qualifications} onChange={handleInputChange} className={inputClasses} placeholder="MBBS, MD, FCPS..." required />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={labelClasses}>Standard Appointment Consultation Fee ($ USD)</label>
                            <input type="number" name="consultationFee" value={profile.consultationFee} onChange={handleInputChange} className={inputClasses} placeholder="100" required />
                        </div>
                    </div>
                </div>

                {/* Submit Action Interface Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.push("/dashboard/doctor/profile")}
                        className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/80 rounded-xl transition"
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <>
                                <FaSpinner className="animate-spin text-xs" /> Saving Records...
                            </>
                        ) : (
                            <>
                                <FaSave className="text-xs" /> Commit Updates
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}