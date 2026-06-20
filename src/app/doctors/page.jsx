import { getDoctorsData } from '@/src/lib/api/doctors';
import React from 'react';
import {
    FaUserMd,
    FaEnvelope,
    FaPhone,
    FaHospital,
    FaGraduationCap,
    FaStethoscope,
    FaDollarSign,
    FaCalendarAlt,
    FaClock,
    FaCheckCircle,
    FaRegCalendarCheck,
    FaExclamationTriangle
} from 'react-icons/fa';

// Next.js Server Components receive searchParams directly as a prop
export default async function DoctorsPage() {
    // Read parameters dynamically from the incoming URL request query
    const resolvedParams = 'DOC-9851';
    const doctorId = resolvedParams;

    // Handle missing ID parameter gracefully
    if (!doctorId) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <div className="max-w-md text-center space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-500 flex items-center justify-center mx-auto text-lg">
                        <FaExclamationTriangle />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Missing Doctor Identifier</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Please provide a valid doctor reference parameter token string inside your navigation request matrix.
                    </p>
                </div>
            </div>
        );
    }

    // Fetch live document parameters dynamically from your MongoDB database layout via API route helper
    const doctors = await getDoctorsData(doctorId);
    console.log("data of doctor", doctors);

    // Fallback block if no database model record matches the runtime identifier
    if (!doctors) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <div className="max-w-md text-center space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-500 flex items-center justify-center mx-auto text-lg">
                        <FaUserMd />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Practitioner Not Found</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        No active clinical verification file could be retrieved for registration ID <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{doctorId}</span>.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {
                doctors.map((doctor) => (
                    <div key={doctor.doctorId} className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-slate-700 dark:text-slate-300 transition-colors duration-200">
                        <div className="max-w-5xl mx-auto space-y-8">

                            {/* Hero Header Presentation Profile Panel */}
                            <div className="bg-white border border-slate-200 rounded-3xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                                <div className="relative shrink-0 w-32 h-32 md:w-40 md:h-40">
                                    {doctor.profileImage ? (
                                        <img
                                            src={doctor.profileImage}
                                            alt={doctor.name || "Doctor Portrait"}
                                            className="w-full h-full rounded-2xl object-cover ring-4 ring-slate-100 dark:ring-slate-800 shadow-md"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-5xl">
                                            <FaUserMd />
                                        </div>
                                    )}
                                    {doctor.verificationStatus === "verified" && (
                                        <span className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-xl shadow-md border-2 border-white dark:border-slate-900">
                                            <FaCheckCircle className="text-sm" />
                                        </span>
                                    )}
                                </div>

                                <div className="flex-1 space-y-4 text-center md:text-left w-full">
                                    <div className="space-y-1.5">
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                                                {doctor.name || "Anonymous Practitioner"}
                                            </h1>
                                            <span className="text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                                                {doctor.doctorId}
                                            </span>
                                        </div>
                                        {doctor.specialization && (
                                            <p className="text-sm text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
                                                <FaStethoscope /> {doctor.specialization}
                                            </p>
                                        )}
                                    </div>

                                    {doctor.biography && (
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-900">
                                            {doctor.biography}
                                        </p>
                                    )}

                                    {/* Fast Contact Chips Row */}
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                                        {doctor.email && <span className="flex items-center gap-1.5"><FaEnvelope className="text-slate-400" /> {doctor.email}</span>}
                                        {doctor.phone && <span className="flex items-center gap-1.5"><FaPhone className="text-slate-400" /> {doctor.phone}</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Sub-Grid Block Layout Framework details */}
                            <div className="grid md:grid-cols-3 gap-8 items-start">

                                {/* LEFT STACK: Clinical Credentials Summary */}
                                <div className="md:col-span-2 space-y-6">
                                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 space-y-6">
                                        <h2 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                                            <FaGraduationCap className="text-blue-500" /> Professional Credentials
                                        </h2>

                                        <div className="space-y-4">
                                            {doctor.hospitalName && (
                                                <div className="flex items-start gap-3 text-sm">
                                                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0 mt-0.5"><FaHospital /></div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider">Primary Affiliation</h4>
                                                        <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{doctor.hospitalName}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {doctor.qualifications && (
                                                <div className="flex items-start gap-3 text-sm">
                                                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0 mt-0.5"><FaGraduationCap /></div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider">Qualifications & Certifications</h4>
                                                        <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 leading-relaxed">{doctor.qualifications}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {doctor.experience !== undefined && (
                                                <div className="flex items-start gap-3 text-sm">
                                                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0 mt-0.5"><FaUserMd /></div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider">Clinical Experience</h4>
                                                        <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{doctor.experience} Years Active Practice</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT STACK: Timing Slots & Scheduling Execution Matrices */}
                                <div className="md:col-span-1 space-y-6">
                                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 space-y-5">
                                        <h2 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                                            <FaClock className="text-blue-500" /> Availability & Fees
                                        </h2>

                                        {/* Session Consulting Fee Meta */}
                                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Consult Fee</span>
                                            <span className="text-xl font-black text-slate-900 dark:text-white flex items-center">
                                                <FaDollarSign className="text-sm text-emerald-500" /> {doctor.consultationFee ?? "N/A"}
                                            </span>
                                        </div>

                                        {/* Weekly Shift Hours Blocks */}
                                        <div className="space-y-2.5">
                                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><FaCalendarAlt /> Operational Slots</span>
                                            <div className="space-y-2">
                                                {doctor.availableSlots && doctor.availableSlots.length > 0 ? (
                                                    doctor.availableSlots.map((slot, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center justify-between text-xs p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900/40"
                                                        >
                                                            <span className="font-bold text-slate-700 dark:text-slate-300">{slot.day}</span>
                                                            <span className="font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-900">{slot.hours}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-xs text-slate-400 italic text-center py-2">No shift timings loaded.</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Schedule Booking Action CTA */}
                                        <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md transition pt-2.5">
                                            <FaRegCalendarCheck /> Book Private Session
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                ))
            }
        </div>
    );
}