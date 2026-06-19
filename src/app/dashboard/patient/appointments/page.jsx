"use client";

import { useState } from "react";
import {
    FaCalendarCheck,
    FaClock,
    FaUserMd,
    FaEye,
    FaExchangeAlt,
    FaTimesCircle,
    FaTimes,
    FaSpinner,
    FaCalendarAlt
} from "react-icons/fa";

export default function MyAppointmentsPage() {
    // Core state array for dynamic mock data CRUD management
    const [appointments, setAppointments] = useState([
        { id: 1, doctor: "Dr. Sarah Jenkins", specialty: "Cardiologist", date: "2026-06-25", time: "10:00 AM", status: "Upcoming", fee: 120, room: "Clinic Block A - Room 302" },
        { id: 2, doctor: "Dr. Michael Chang", specialty: "Dermatologist", date: "2026-07-14", time: "02:30 PM", status: "Upcoming", fee: 90, room: "Telehealth Digital Room 4" },
        { id: 3, doctor: "Dr. Amanda Ross", specialty: "Pediatrician", date: "2026-04-02", time: "11:15 AM", status: "Completed", fee: 110, room: "Clinic Block B - Room 105" }
    ]);

    // Modals Control UI States
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [rescheduleTarget, setRescheduleTarget] = useState(null);
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("10:00 AM");
    const [isUpdating, setIsUpdating] = useState(false);

    // CRUD: Cancel Appointment Action
    const handleCancel = (id) => {
        if (confirm("Are you sure you want to cancel this appointment slot? This action cannot be undone.")) {
            setAppointments(appointments.map(app =>
                app.id === id ? { ...app, status: "Cancelled" } : app
            ));
        }
    };

    // CRUD: Open Reschedule Dialog 
    const openRescheduleModal = (app) => {
        setRescheduleTarget(app);
        setNewDate(app.date);
        setNewTime(app.time);
    };

    // CRUD: Reschedule Save Action
    const handleRescheduleSubmit = (e) => {
        e.preventDefault();
        if (!newDate) return;

        setIsUpdating(true);
        setTimeout(() => {
            setAppointments(appointments.map(app =>
                app.id === rescheduleTarget.id
                    ? { ...app, date: newDate, time: newTime, status: "Upcoming" }
                    : app
            ));
            setIsUpdating(false);
            setRescheduleTarget(null);
        }, 800);
    };

    return (
        <div className="flex justify-center">
            <div className="space-y-6 animate-fade-in py-10">
                {/* Header Content Section */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Appointments</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Review, track, reschedule, or cancel your booked medical sessions.
                    </p>
                </div>

                {/* APPOINTMENTS DATA TABLE / LIST */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                                    <th className="p-4 font-semibold">Doctor / Specialist</th>
                                    <th className="p-4 font-semibold">Scheduled Time</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold text-right">Actions Matrix</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {appointments.map((app) => (
                                    <tr key={app.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition-colors">
                                        {/* Doctor Info column */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-xl shrink-0">
                                                    <FaUserMd className="text-base" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-slate-100">{app.doctor}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{app.specialty}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Date & Time display column */}
                                        <td className="p-4">
                                            <div className="text-slate-700 dark:text-slate-300">
                                                <p className="font-medium">{app.date}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{app.time}</p>
                                            </div>
                                        </td>

                                        {/* Status Pill dynamic element badge */}
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${app.status === "Upcoming" ? "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/30" :
                                                app.status === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30" :
                                                    "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/30"
                                                }`}>
                                                {app.status}
                                            </span>
                                        </td>

                                        {/* CTA Action operational icons */}
                                        <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                                            {/* READ action available for all entries */}
                                            <button
                                                onClick={() => setSelectedAppointment(app)}
                                                className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                                                title="View Appointment Details"
                                            >
                                                <FaEye className="text-sm" />
                                            </button>

                                            {/* Reschedule & Cancel actions are conditional on status */}
                                            {app.status === "Upcoming" && (
                                                <>
                                                    <button
                                                        onClick={() => openRescheduleModal(app)}
                                                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition"
                                                        title="Reschedule Appointment Time"
                                                    >
                                                        <FaExchangeAlt className="text-sm" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleCancel(app.id)}
                                                        className="p-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition"
                                                        title="Cancel Appointment"
                                                    >
                                                        <FaTimesCircle className="text-sm" />
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* MODAL 1: VIEW DETAILS DIALOG WINDOW */}
                {selectedAppointment && (
                    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 max-w-md w-full rounded-2xl p-6 shadow-2xl relative animate-scale-up">
                            <button
                                onClick={() => setSelectedAppointment(null)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition"
                            >
                                <FaTimes />
                            </button>
                            <h3 className="font-bold text-lg border-b dark:border-slate-800 pb-3 flex items-center gap-2">
                                <FaCalendarCheck className="text-blue-600" /> Appointment Summary
                            </h3>
                            <div className="mt-4 space-y-3 text-sm">
                                <div><label className="text-xs text-slate-400 block">Doctor Practitioner</label><p className="font-semibold text-slate-900 dark:text-slate-100">{selectedAppointment.doctor} ({selectedAppointment.specialty})</p></div>
                                <div><label className="text-xs text-slate-400 block">Allocated Time & Date Slot</label><p className="font-medium text-slate-800 dark:text-slate-200">{selectedAppointment.date} at {selectedAppointment.time}</p></div>
                                <div><label className="text-xs text-slate-400 block">Assigned Location Location</label><p className="font-medium text-slate-800 dark:text-slate-200">{selectedAppointment.room}</p></div>
                                <div className="flex justify-between border-t dark:border-slate-800 pt-3 mt-4">
                                    <div><label className="text-xs text-slate-400 block">Consultation Price</label><p className="font-bold text-emerald-600">${selectedAppointment.fee}.00</p></div>
                                    <div><label className="text-xs text-slate-400 block text-right">Current Status</label><p className="font-semibold text-right text-slate-800 dark:text-slate-200">{selectedAppointment.status}</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* MODAL 2: UPDATE (RESCHEDULE) PLANNER DIALOG */}
                {rescheduleTarget && (
                    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <form onSubmit={handleRescheduleSubmit} className="bg-white dark:bg-slate-900 border dark:border-slate-800 max-w-sm w-full rounded-2xl p-6 shadow-2xl relative animate-scale-up space-y-4">
                            <button
                                type="button"
                                onClick={() => setRescheduleTarget(null)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition"
                            >
                                <FaTimes />
                            </button>

                            <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                                <FaCalendarAlt className="text-blue-600" /> Reschedule Session
                            </h3>

                            <p className="text-xs text-slate-500">Updating schedule for <span className="font-semibold">{rescheduleTarget.doctor}</span>.</p>

                            {/* Date selection field input */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Select New Target Date</label>
                                <input
                                    type="date"
                                    required
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                    className="w-full text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl border p-2.5 border-slate-300 dark:border-slate-700 outline-none"
                                />
                            </div>

                            {/* Time pick options */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Select Available Time Window</label>
                                <select
                                    value={newTime}
                                    onChange={(e) => setNewTime(e.target.value)}
                                    className="w-full text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl border p-2.5 border-slate-300 dark:border-slate-700 outline-none"
                                >
                                    {["09:00 AM", "10:00 AM", "11:15 AM", "01:00 PM", "02:30 PM", "04:00 PM"].map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Modal Action CTA strip */}
                            <div className="flex gap-2 justify-end pt-2">
                                <button
                                    type="button"
                                    onClick={() => setRescheduleTarget(null)}
                                    className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition disabled:opacity-75 inline-flex items-center gap-1.5"
                                >
                                    {isUpdating ? <FaSpinner className="animate-spin" /> : "Apply Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}