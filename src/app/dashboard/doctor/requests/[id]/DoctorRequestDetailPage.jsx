"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import {
    FaUser, FaNotesMedical, FaArrowLeft, FaCheckCircle,
    FaExclamationCircle, FaPrescriptionBottleAlt, FaSpinner
} from "react-icons/fa";
import { createPrescription } from "@/src/lib/api/prescription";
import { redirect } from "next/navigation";

export default function DoctorRequestDetailPage({ appointmentData }) {
    const appointment = appointmentData || {};

    // Remapped local state for diagnosis, medications, and notes
    const [prescription, setPrescription] = useState({
        appointmentId: appointment?._id || appointment?.id || "",
        doctorId: appointment?.doctorId || "",
        patientId: appointment?.patientId || "",
        doctorName: appointment?.doctorName || "",
        patientName: appointment?.patientName || "",
        diagnosis: "",
        medications: "",
        notes: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form submission handler
    const handlePrescriptionSubmit = async (e) => {
        e.preventDefault();

        if (!prescription.diagnosis.trim()) {
            toast.warn("Please add a diagnosis before submitting.");
            return;
        }
        if (!prescription.medications.trim()) {
            toast.warn("Please add at least one medication.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Append clean current time right at submission to prevent hydration drifts
            const submissionPayload = {
                ...prescription,
                createdAt: new Date(),
            };

            await createPrescription(submissionPayload);

            toast.success("Prescription submitted successfully!");
            
            // Clean slate form reset
            setPrescription(prev => ({
                ...prev,
                diagnosis: "",
                medications: "",
                notes: "",
            }));
        } catch (error) {
            console.error("Prescription Submission Error:", error);
            toast.error("Failed to submit prescription. Try again.");
        } finally {
            setIsSubmitting(false);
        }
        redirect("/dashboard/doctor/prescriptions");
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 antialiased">
            {/* Navigation Header */}
            <div className="mb-6">
                <Link
                    href="/dashboard/doctor/appointments"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition"
                >
                    <FaArrowLeft className="text-xs" /> Back to My Appointments
                </Link>
            </div>

            {/* Main Content Layout Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-8">

                {/* Meta Header block */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/60 pb-6">
                    <div>
                        <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-md">
                            ID: {appointment.id || appointment._id || "N/A"}
                        </span>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                            Consultation Summary
                        </h1>
                    </div>

                    {/* Visual indicators matching application status */}
                    <div className="flex items-center gap-2">
                        {appointment.appointmentStatus === "completed" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50 rounded-full text-xs font-semibold uppercase tracking-wider">
                                <FaCheckCircle /> Session Completed
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50 rounded-full text-xs font-semibold uppercase tracking-wider">
                                <FaExclamationCircle /> {appointment.appointmentStatus || "Active"}
                            </span>
                        )}
                    </div>
                </div>

                {/* Patient Summary Segments */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
                                <FaNotesMedical className="text-blue-500" /> Patient Symptoms
                            </h3>
                            <div className="bg-slate-50 dark:bg-slate-950/50 rounded-xl p-4 border border-slate-100/50 dark:border-slate-800/40">
                                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                    {appointment.symptoms || "No symptoms explicitly described."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50/50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-800/40 rounded-2xl p-5 space-y-3 text-sm h-fit">
                        <div>
                            <label className="text-xs text-slate-400 block font-medium">Full Name</label>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">{appointment.patientName || "N/A"}</span>
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block font-medium">Gender</label>
                            <span className="text-slate-800 dark:text-slate-200 font-medium">{appointment.patientGender || "N/A"}</span>
                        </div>
                    </div>
                </div>

                {/* Prescription Dynamic Form Segment */}
                <div className="border-t border-slate-100 dark:border-slate-800/60 pt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FaPrescriptionBottleAlt className="text-emerald-500 text-lg" />
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Create Consultation Record</h2>
                    </div>

                    <form onSubmit={handlePrescriptionSubmit} className="space-y-4">
                        {/* Diagnosis Field */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                                Diagnosis
                            </label>
                            <textarea
                                rows={2}
                                required
                                placeholder="Example: Acute viral nasopharyngitis with secondary mild bronchospasm."
                                value={prescription.diagnosis}
                                onChange={(e) => setPrescription(prev => ({ ...prev, diagnosis: e.target.value }))}
                                className="w-full text-sm bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-blue-500 dark:focus:border-blue-500 text-slate-900 dark:text-white transition placeholder:text-slate-400"
                            />
                        </div>

                        {/* Medications Field */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                                Medications & Dosages
                            </label>
                            <textarea
                                rows={3}
                                required
                                placeholder="Example: Amoxicillin 500mg — 3 times daily for 7 days"
                                value={prescription.medications}
                                onChange={(e) => setPrescription(prev => ({ ...prev, medications: e.target.value }))}
                                className="w-full text-sm bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-blue-500 dark:focus:border-blue-500 text-slate-900 dark:text-white transition placeholder:text-slate-400"
                            />
                        </div>

                        {/* Notes Field */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                                Clinical Notes / Advice
                            </label>
                            <textarea
                                rows={2}
                                placeholder="Example: Take medications after meals. Rest well and review in 5 days if fever persists."
                                value={prescription.notes}
                                onChange={(e) => setPrescription(prev => ({ ...prev, notes: e.target.value }))}
                                className="w-full text-sm bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-blue-500 dark:focus:border-blue-500 text-slate-900 dark:text-white transition placeholder:text-slate-400"
                            />
                        </div>

                        {/* Submit Button Actions */}
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-5 py-2.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm flex items-center gap-2 transition disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className="animate-spin" /> Submitting Record...
                                    </>
                                ) : (
                                    "Submit Prescription"
                                )}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}