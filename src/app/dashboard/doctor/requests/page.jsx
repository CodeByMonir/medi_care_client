"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    FaUserCheck,
    FaClock,
    FaUser,
    FaCheck,
    FaTimes,
    FaCalendarPlus,
    FaEnvelope,
    FaNotesMedical,
    FaClipboardCheck
} from "react-icons/fa";

export default function DoctorRequestsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Incoming");

    // Unified state tracking request status flows
    const [requests, setRequests] = useState([
        { id: "REQ-9910", patientName: "Eleanor Vance", email: "eleanor.v@example.com", date: "2026-06-24", time: "09:30 AM", type: "First Consultation", status: "Pending", issue: "Chronic knee pain radiating down to the calf after running." },
        { id: "REQ-5512", patientName: "Jameson Blake", email: "j.blake@example.com", date: "2026-06-25", time: "11:15 AM", type: "Follow-up", status: "Pending", issue: "Adjusting high blood pressure medication dosage." },
        { id: "REQ-2041", patientName: "Clara Oswald", email: "clara.o@example.com", date: "2026-06-19", time: "10:00 AM", type: "Video Consultation", status: "Accepted", issue: "Follow-up diagnostic analysis evaluation on previous lab tests." }
    ]);

    // 1. OPERATION: Accept Incoming Booking Request
    const handleAccept = (id) => {
        setRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: "Accepted" } : req
        ));
        alert(`Request ${id} has been added to your confirmed appointments sequence.`);
    };

    // 2. OPERATION: Decline/Reject Request
    const handleReject = (id) => {
        if (confirm("Are you sure you want to decline this appointment request?")) {
            setRequests(prev => prev.filter(req => req.id !== id));
        }
    };

    // 3. OPERATION: Mark Session Complete & Route to Prescription Management
    const handleMarkCompleted = (patientId, patientName) => {
        // Optional: Perform api patch mutation log here
        alert(`Session marked as complete. Navigating to prescribe medications for ${patientName}...`);

        // Pass relevant search query parameters to instantly preload the prescription form matrix
        router.push(`/dashboard/doctor/prescriptions?patientId=${patientId}&name=${encodeURIComponent(patientName)}`);
    };

    const displayedRequests = requests.filter(req => {
        if (activeTab === "Incoming") return req.status === "Pending";
        if (activeTab === "Active Appointments") return req.status === "Accepted";
        return false;
    });

    return (
        <div className="space-y-8 p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-700 dark:text-slate-300 transition-colors duration-200">

            {/* Upper Context Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                    Patient Requests & Sessions
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Process initial intake booking submissions, or conclude active ongoing checkups to configure prescriptions.
                </p>
            </div>

            {/* Custom Interactive Module Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-sm font-semibold">
                {["Incoming", "Active Appointments"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 transition relative ${activeTab === tab
                                ? "text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400"
                                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            }`}
                    >
                        {tab}
                        {tab === "Incoming" && requests.filter(r => r.status === "Pending").length > 0 && (
                            <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-amber-500 text-white rounded-full">
                                {requests.filter(r => r.status === "Pending").length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Structured Ticket Row Stack */}
            <div className="space-y-4">
                {displayedRequests.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-3">
                        <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-950/40 text-slate-400 flex items-center justify-center mx-auto text-lg">
                            <FaUserCheck />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-base">Section Clear</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            No ongoing patient request tickets found matching this specific section data tier.
                        </p>
                    </div>
                ) : (
                    displayedRequests.map((req) => (
                        <div
                            key={req.id}
                            className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 p-5 md:p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-slate-300 dark:hover:border-slate-700 transition"
                        >
                            {/* Left Meta Group */}
                            <div className="space-y-3 max-w-xl">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                        {req.id}
                                    </span>
                                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400">
                                        {req.type}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <FaUser className="text-xs text-slate-400" /> {req.patientName}
                                    </h3>
                                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                                        <FaEnvelope className="text-[10px]" /> {req.email}
                                    </p>
                                </div>

                                <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl leading-relaxed">
                                    <span className="font-bold text-slate-400 block mb-0.5 uppercase text-[10px] tracking-wider">Reason for appointment:</span>
                                    {req.issue}
                                </p>
                            </div>

                            {/* Right Timelines & Dynamic Flow Controls */}
                            <div className="flex flex-row sm:items-center lg:flex-col lg:items-end justify-between lg:justify-center gap-4 shrink-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800 pt-4 lg:pt-0">
                                <div className="space-y-1">
                                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 lg:justify-end">
                                        <FaCalendarPlus className="text-blue-500 text-[11px]" /> {req.date}
                                    </div>
                                    <div className="text-xs text-slate-400 flex items-center gap-1.5 lg:justify-end">
                                        <FaClock className="text-[11px]" /> {req.time}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Flow Branch A: Actions rendered inside INCOMING Pending tab */}
                                    {req.status === "Pending" && (
                                        <>
                                            <button
                                                onClick={() => handleReject(req.id)}
                                                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 rounded-xl transition"
                                            >
                                                <FaTimes /> Decline
                                            </button>
                                            <button
                                                onClick={() => handleAccept(req.id)}
                                                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-sm transition"
                                            >
                                                <FaCheck /> Approve
                                            </button>
                                        </>
                                    )}

                                    {/* Flow Branch B: Actions rendered inside ACTIVE APPOINTMENTS session tab */}
                                    {req.status === "Accepted" && (
                                        <button
                                            onClick={() => handleMarkCompleted(req.id, req.patientName)}
                                            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-xl shadow-md transition"
                                        >
                                            <FaClipboardCheck className="text-sm" /> Mark Complete & Prescribe
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}