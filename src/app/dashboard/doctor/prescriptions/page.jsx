"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
    FaFileMedical,
    FaPlus,
    FaPills,
    FaUser,
    FaEdit,
    FaSave,
    FaTimes,
    FaClipboardList,
    FaCheckCircle
} from "react-icons/fa";

// Next.js App Router requires useSearchParams to be wrapped in a Suspense boundary
function PrescriptionFormContent() {
    const searchParams = useSearchParams();

    // Core records state managing existing issued prescriptions
    const [prescriptions, setPrescriptions] = useState([
        { id: "RX-4401", patientName: "Clara Oswald", date: "2026-06-19", diagnosis: "Post-viral bronchial inflammation", medications: "Amoxicillin 500mg (3x daily), Fluticasone inhaler", instructions: "Complete full antibiotic course. Use inhaler every 12 hours as needed." },
        { id: "RX-1192", patientName: "Sarah Jenkins", date: "2026-06-15", diagnosis: "Chronic Vestibular Migraine", medications: "Propranolol 40mg (1x daily)", instructions: "Take each morning. Track blood pressure metrics weekly." }
    ]);

    // UI Panel controllers
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    // Controlled Form Elements
    const [patientName, setPatientName] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [medications, setMedications] = useState("");
    const [instructions, setInstructions] = useState("");

    // Automatically check for incoming routed patient context from Request Page completions
    useEffect(() => {
        const routedName = searchParams.get("name");
        if (routedName) {
            handleOpenCreate(routedName);
        }
    }, [searchParams]);

    // --- CRUD OPERATIONS ---

    // 1. Initialize CREATE workflow
    const handleOpenCreate = (prefilledName = "") => {
        setIsEditing(false);
        setCurrentId(null);
        setPatientName(prefilledName);
        setDiagnosis("");
        setMedications("");
        setInstructions("");
        setIsFormOpen(true);
    };

    // 2. Initialize UPDATE workflow
    const handleOpenUpdate = (rx) => {
        setIsEditing(true);
        setCurrentId(rx.id);
        setPatientName(rx.patientName);
        setDiagnosis(rx.diagnosis);
        setMedications(rx.medications);
        setInstructions(rx.instructions);
        setIsFormOpen(true);
    };

    // 3. SUBMIT Form Handler (Handles Create & Update state alterations)
    const handleSavePrescription = (e) => {
        e.preventDefault();

        const today = new Date().toISOString().split('T')[0];

        if (isEditing) {
            // UPDATE logic execution
            setPrescriptions(prev => prev.map(rx =>
                rx.id === currentId
                    ? { ...rx, patientName, diagnosis, medications, instructions, date: today }
                    : rx
            ));
        } else {
            // CREATE logic execution
            const newRx = {
                id: `RX-${Math.floor(1000 + Math.random() * 9000)}`,
                patientName,
                date: today,
                diagnosis,
                medications,
                instructions
            };
            setPrescriptions(prev => [newRx, ...prev]);
        }

        setIsFormOpen(false);
    };

    const inputClasses = "w-full rounded-xl border border-slate-300 !bg-white px-4 py-2.5 text-sm !text-slate-900 !placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:!bg-slate-950 dark:!text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400 disabled:opacity-60";

    return (
        <div className="space-y-8 p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-700 dark:text-slate-300 transition-colors duration-200">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        Prescription Management
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Issue new clinical prescription sheets or edit treatment details for active patients.
                    </p>
                </div>

                {!isFormOpen && (
                    <button
                        onClick={() => handleOpenCreate()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md transition shrink-0"
                    >
                        <FaPlus className="text-xs" /> Write New Prescription
                    </button>
                )}
            </div>

            {/* Dynamic Sliding Content Layout Toggle */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">

                {/* LEFT/MAIN PANELS: Interactive Form Drawer for Create/Update operations */}
                {isFormOpen && (
                    <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-md p-6 sticky top-6 space-y-5">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                                <FaFileMedical className={isEditing ? "text-amber-500" : "text-blue-600"} />
                                {isEditing ? "Modify Rx Script" : "New Rx Script"}
                            </h2>
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                            >
                                <FaTimes className="text-xs" />
                            </button>
                        </div>

                        <form onSubmit={handleSavePrescription} className="space-y-4">
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
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Usage Instructions</label>
                                <textarea
                                    rows={3}
                                    value={instructions}
                                    onChange={(e) => setInstructions(e.target.value)}
                                    placeholder="e.g. Take 1 tablet thrice daily after meals for 5 days straight."
                                    className={`${inputClasses} !py-3 resize-none`}
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-4 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-sm transition"
                                >
                                    <FaSave className="text-[10px]" /> {isEditing ? "Save Changes" : "Emit Script"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* RIGHT PANELS: Active Rx Logs Dashboard Display (READ index) */}
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
                                    key={rx.id}
                                    className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 p-5 md:p-6 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6 hover:border-slate-300 dark:hover:border-slate-700 transition"
                                >
                                    <div className="space-y-3.5 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                                {rx.id}
                                            </span>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 flex items-center gap-1">
                                                <FaCheckCircle className="text-[9px]" /> Authenticated Live Script
                                            </span>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4 text-xs">
                                            <div className="space-y-0.5">
                                                <p className="text-slate-400 font-medium">Target Patient</p>
                                                <p className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                                                    <FaUser className="text-[10px] text-slate-400" /> {rx.patientName}
                                                </p>
                                            </div>
                                            <div className="space-y-0.5 sm:text-right">
                                                <p className="text-slate-400 font-medium">Date Signed</p>
                                                <p className="font-bold text-slate-700 dark:text-slate-300">{rx.date}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                                <span className="text-slate-400 font-normal">Diagnosis:</span> {rx.diagnosis}
                                            </p>
                                            <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl space-y-2 text-xs">
                                                <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                                                    <FaPills /> {rx.medications}
                                                </p>
                                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed italic">
                                                    “ {rx.instructions} ”
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action operational block (UPDATE pipeline trigger) */}
                                    <div className="shrink-0 flex md:flex-col items-end justify-end border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-3 md:pt-0">
                                        <button
                                            onClick={() => handleOpenUpdate(rx)}
                                            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 dark:hover:bg-blue-950/40 rounded-xl transition"
                                            title="Edit Prescription parameters"
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

// Wrapper to safely encapsulate Suspense requirement context rules
export default function DoctorPrescriptionsPage() {
    return (
        <Suspense fallback={
            <div className="p-8 text-center text-sm font-medium text-slate-400">
                Loading database configuration parameters...
            </div>
        }>
            <PrescriptionFormContent />
        </Suspense>
    );
}