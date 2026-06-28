"use client";

import { updatePrescriptionData } from "@/src/lib/api/prescription";
import { useState } from "react";
import {
    FaFileMedical,
    FaPills,
    FaUser,
    FaEdit,
    FaSave,
    FaTimes,
    FaClipboardList,
    FaCheckCircle,
    FaSpinner,
    FaIdCard
} from "react-icons/fa";
import { toast } from "react-toastify";

// Note: Import your update API utility here when ready:
// import { updatePrescription } from "@/src/lib/api/prescription";

export default function DoctorPrescriptionsPage({ prescriptionData = [] }) {
    // Synchronize client local state with the server-fetched array
    const [prescriptions, setPrescriptions] = useState(prescriptionData);

    // UI Panel controllers
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentId, setCurrentId] = useState(null); // Explicitly holds prescription._id

    // Controlled Form Elements
    const [patientName, setPatientName] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [medications, setMedications] = useState("");
    const [notes, setNotes] = useState("");

    // --- CRUD UPDATE WORKFLOW ---

    // 1. Initialize UPDATE workflow and collect the document ID
    const handleOpenUpdate = (rx) => {
        const targetId = rx._id || rx.id;
        setCurrentId(targetId);
        setPatientName(rx.patientName || "");
        setDiagnosis(rx.diagnosis || "");
        setMedications(rx.medications || rx.medicines || "");
        setNotes(rx.notes || rx.instructions || "");
        setIsFormOpen(true);
    };

    // 2. SUBMIT Form Handler to push modifications to your API
    const handleSavePrescription = async (e) => {
        e.preventDefault();

        if (!diagnosis.trim() || !medications.trim()) {
            toast.warn("Diagnosis and Medication fields cannot be empty.");
            return;
        }

        setIsSubmitting(true);
        try {
            const updatedPayload = {
                patientName,
                diagnosis,
                medications, // or medicines depending on backend schema definitions
                notes,
            };

            // TODO: Wire up your actual database update handler here:
            await updatePrescriptionData(currentId, updatedPayload);

            // Simulated network latency
            await new Promise((resolve) => setTimeout(resolve, 800));

            const today = new Date().toISOString().split('T')[0];

            // Update client local UI matrix array matching target document parameters
            setPrescriptions(prev => prev.map(rx =>
                (rx._id === currentId || rx.id === currentId)
                    ? { ...rx, ...updatedPayload, date: today }
                    : rx
            ));

            toast.success("Prescription record updated successfully!");
            setIsFormOpen(false);
        } catch (error) {
            console.error("Update Record Error:", error);
            toast.error("Failed to modify script configuration parameters.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = "w-full rounded-xl border border-slate-300 !bg-white px-4 py-2.5 text-sm !text-slate-900 !placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:!bg-slate-950 dark:!text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400 disabled:opacity-60";

    return (
        <div className="space-y-8 p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-700 dark:text-slate-300 transition-colors duration-200">

            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                    Prescription Management
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Review history and modify treatment details or clinical advice parameters for active patients.
                </p>
            </div>

            {/* Dynamic Sliding Content Layout Toggle */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">

                {/* LEFT PANEL: Interactive Script Modifier Form */}
                {isFormOpen && (
                    <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-md p-6 sticky top-6 space-y-5">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                                <FaFileMedical className="text-amber-500" />
                                Modify Rx Script
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                            >
                                <FaTimes className="text-xs" />
                            </button>
                        </div>

                        <form onSubmit={handleSavePrescription} className="space-y-4">
                            {/* Visible Prescription DB Key Identification Metric */}
                            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 flex items-center gap-2">
                                <FaIdCard className="text-amber-500 text-xs shrink-0" />
                                <div className="text-xs font-mono truncate">
                                    <span className="text-slate-400 font-sans font-medium mr-1">Target ID:</span>
                                    <span className="text-slate-800 dark:text-slate-200 font-bold">{currentId}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Patient Name</label>
                                <input
                                    type="text"
                                    value={patientName}
                                    onChange={(e) => setPatientName(e.target.value)}
                                    placeholder="e.g. John Doe"
                                    className={inputClasses}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Clinical Diagnosis Summary</label>
                                <input
                                    type="text"
                                    value={diagnosis}
                                    onChange={(e) => setDiagnosis(e.target.value)}
                                    placeholder="e.g. Acute Rhinosinusitis"
                                    className={inputClasses}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Medications & Strengths</label>
                                <textarea
                                    rows={3}
                                    value={medications}
                                    onChange={(e) => setMedications(e.target.value)}
                                    placeholder="e.g. Amoxicillin 500mg, Paracetamol 650mg"
                                    className={`${inputClasses} !py-3 resize-none`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Clinical Notes / Advice</label>
                                <textarea
                                    rows={3}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="e.g. Take 1 tablet thrice daily after meals for 5 days straight."
                                    className={`${inputClasses} !py-3 resize-none`}
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-4 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl transition disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-sm transition disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="animate-spin text-[10px]" /> Updating API...
                                        </>
                                    ) : (
                                        <>
                                            <FaSave className="text-[10px]" /> Update Record
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* RIGHT PANEL: Live Database Dashboard Display Logs */}
                <div className={`${isFormOpen ? "lg:col-span-2" : "lg:col-span-3"} space-y-4`}>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 flex items-center gap-2">
                        <FaClipboardList className="text-blue-500 text-sm" />
                        <h2 className="font-bold text-slate-900 dark:text-white text-sm">Historical Issued Scripts History Log</h2>
                    </div>

                    <div className="space-y-4">
                        {prescriptions.length === 0 ? (
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-400 font-medium">
                                No records logged inside the script database matrix yet.
                            </div>
                        ) : (
                            prescriptions.map((rx) => (
                                <div
                                    key={rx._id || rx.id}
                                    className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 p-5 md:p-6 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6 hover:border-slate-300 dark:hover:border-slate-700 transition"
                                >
                                    <div className="space-y-3.5 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                                ID: {rx._id || rx.id}
                                            </span>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 flex items-center gap-1">
                                                <FaCheckCircle className="text-[9px]" /> Authenticated Live Script
                                            </span>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4 text-xs">
                                            <div className="space-y-0.5">
                                                <p className="text-slate-400 font-medium">Target Patient</p>
                                                <p className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                                                    <FaUser className="text-[10px] text-slate-400" /> {rx.patientName || "Unknown"}
                                                </p>
                                            </div>
                                            <div className="space-y-0.5 sm:text-right">
                                                <p className="text-slate-400 font-medium">Date Signed</p>
                                                <p className="font-bold text-slate-700 dark:text-slate-300">
                                                    {rx.createdAt ? new Date(rx.createdAt).toLocaleDateString() : rx.date || "Recent"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                                <span className="text-slate-400 font-normal">Diagnosis:</span> {rx.diagnosis || "No Diagnosis Specified"}
                                            </p>
                                            <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl space-y-2 text-xs">
                                                <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                                                    <FaPills /> {rx.medications || rx.medicines || "No Medications Provided"}
                                                </p>
                                                {(rx.notes || rx.instructions) && (
                                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed italic">
                                                        “ {rx.notes || rx.instructions} ”
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action operational block (Collects prescription._id & triggers update layout) */}
                                    <div className="shrink-0 flex md:flex-col items-end justify-end border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-3 md:pt-0">
                                        <button
                                            type="button"
                                            onClick={() => handleOpenUpdate(rx)}
                                            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 dark:hover:bg-blue-950/40 rounded-xl transition"
                                            title="Collect prescription identifier and edit"
                                        >
                                            <FaEdit /> Modify Script
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>

        </div>
    );
}