"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
    FaUserMd, FaCalendarAlt, FaClock, FaEye,
    FaHistory, FaTrashAlt, FaTimes, FaSpinner, FaCheckCircle
} from "react-icons/fa";
import { updateAppointmentData } from "@/src/lib/api/appointments";
import { FcOk } from "react-icons/fc";

const STATUS_STYLES = {
    upcoming: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50",
    pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50",
    approved: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/50"
};

const AppointmentRequestPage = ({ initialAppointments }) => {
    const router = useRouter();
    const [appointments, setAppointments] = useState(
        Array.isArray(initialAppointments) ? initialAppointments : []
    );

    const [activeModal, setActiveModal] = useState({ type: null, data: null });
    const [rescheduleData, setRescheduleData] = useState({ date: "", slot: "" });
    const [loading, setLoading] = useState(false);

    const updateLocalState = (id, fieldsToUpdate) => {
        setAppointments(prev => prev.map(item =>
            ((item.id || item._id) === id) ? { ...item, ...fieldsToUpdate } : item
        ));
        closeModal();
    };

    const closeModal = () => {
        setActiveModal({ type: null, data: null });
        setLoading(false);
    };

    const handleCancel = async (targetId) => {
        if (!targetId) return;
        setLoading(true);

        try {
            const appointmentStatus = "cancelled";
            const res = await updateAppointmentData(targetId, { appointmentStatus });

            if (res) {
                updateLocalState(targetId, { appointmentStatus });
                toast.success("Appointment declined successfully!");
            } else {
                throw new Error("Failed to cancel on server");
            }
        } catch (error) {
            console.error("Cancellation error:", error);
            toast.error("An error occurred. Try again.");
            setLoading(false);
        }
    };

    const handleApproved = async (targetId) => {
        if (!targetId) return;
        setLoading(true);

        try {
            const appointmentStatus = "approved";
            const res = await updateAppointmentData(targetId, { appointmentStatus });

            if (res) {
                updateLocalState(targetId, { appointmentStatus });
                toast.success("Appointment approved successfully!");
            } else {
                throw new Error("Failed to approve on server");
            }
        } catch (error) {
            console.error("Approval error:", error);
            toast.error("An error occurred. Try again.");
            setLoading(false);
        }
    };

    const handleComplete = async (targetId) => {
        if (!targetId) return;
        setLoading(true);

        try {
            const appointmentStatus = "completed";
            const res = await updateAppointmentData(targetId, { appointmentStatus });

            if (res) {
                updateLocalState(targetId, { appointmentStatus });
                toast.success("Appointment marked as completed!");

                // Perform redirect to dynamic dashboard route
                router.push(`/dashboard/doctor/requests/${targetId}`);
            } else {
                throw new Error("Failed to complete on server");
            }
        } catch (error) {
            console.error("Completion error:", error);
            toast.error("Failed to update status. Please try again.");
            setLoading(false);
        }
    };

    const handleReschedule = async (e) => {
        e.preventDefault();
        const targetId = activeModal.data.id || activeModal.data._id;
        setLoading(true);
        try {
            const updatedData = {
                appointmentDate: rescheduleData.date,
                appointmentSlot: rescheduleData.slot,
            };

            const res = await updateAppointmentData(targetId, updatedData);

            if (res) {
                updateLocalState(targetId, updatedData);
                toast.info("Appointment rescheduled successfully!");
            } else {
                throw new Error("Failed to reschedule on server");
            }
        } catch (error) {
            console.error("Reschedule error:", error);
            toast.error("Failed to reschedule.");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 antialiased">
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">My Appointments</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and keep track of your active health consultations.</p>
            </div>

            {appointments.length === 0 ? (
                <div className="text-center py-12 text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed dark:border-slate-800">
                    No bookings found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {appointments.map((app) => {
                        const appId = app.id || app._id;
                        const statusKey = app.appointmentStatus?.toLowerCase() || "pending";
                        const isEditable = ["pending"].includes(statusKey);
                        const isApproved = ["approved"].includes(statusKey);

                        return (
                            <div key={appId} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                                <div>
                                    <div className="gap-2 mb-4">
                                        <div className="flex items-start justify-between gap-2 mb-4">
                                            <div className="flex gap-3">
                                                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                                    <FaUserMd className="text-lg" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">{app.doctorName || app.patientName}</h4>
                                                </div>
                                            </div>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${STATUS_STYLES[statusKey] || STATUS_STYLES.pending}`}>
                                                {app.appointmentStatus}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400">{app.symptoms}</p>
                                    </div>

                                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-50 dark:border-slate-800/60 pt-3">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-slate-400 shrink-0" />
                                            <span>{app.appointmentDate}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaClock className="text-slate-400 shrink-0" />
                                            <span className="truncate">{app.appointmentSlot}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-1.5 mt-5 pt-3 border-t dark:border-slate-800/40">
                                    <button
                                        onClick={() => setActiveModal({ type: "view", data: app })}
                                        className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                                        title="View Details"
                                    >
                                        <FaEye />
                                    </button>

                                    {isEditable && (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setActiveModal({ type: "reschedule", data: app });
                                                    setRescheduleData({ date: app.appointmentDate || "", slot: app.appointmentSlot || "" });
                                                }}
                                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition"
                                                title="Reschedule"
                                            >
                                                <FaHistory />
                                            </button>
                                            <button
                                                onClick={() => setActiveModal({ type: "approved", data: app })}
                                                className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-lg transition"
                                                title="Approve Appointment"
                                            >
                                                <FcOk />
                                            </button>
                                            <button
                                                onClick={() => setActiveModal({ type: "cancel", data: app })}
                                                className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition"
                                                title="Decline Appointment"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </>
                                    )}

                                    {isApproved && (
                                        <button
                                            onClick={() => setActiveModal({ type: "complete", data: app })}
                                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
                                            title="Mark as Complete"
                                        >
                                            <FaCheckCircle /> Complete
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {activeModal.type && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 w-full max-w-sm rounded-2xl p-6 shadow-xl relative animate-scale-up">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                            <FaTimes />
                        </button>

                        {activeModal.type === "view" && (
                            <div className="space-y-4">
                                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                                    <FaUserMd className="text-blue-500" /> Booking Overview
                                </h3>
                                <div className="text-sm space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl">
                                    <p><strong className="text-xs text-slate-400 block">Patient:</strong> {activeModal.data?.patientName}</p>
                                    <p><strong className="text-xs text-slate-400 block">Symptoms:</strong> {activeModal.data?.symptoms}</p>
                                    <p><strong className="text-xs text-slate-400 block">Date:</strong> {activeModal.data?.appointmentDate}</p>
                                    <p><strong className="text-xs text-slate-400 block">Time Window:</strong> {activeModal.data?.appointmentSlot}</p>
                                    <p><strong className="text-xs text-slate-400 block">Status:</strong> <span className="capitalize text-xs font-semibold">{activeModal.data?.appointmentStatus}</span></p>
                                </div>
                            </div>
                        )}

                        {activeModal.type === "reschedule" && (
                            <form onSubmit={handleReschedule} className="space-y-4">
                                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                                    <FaHistory className="text-blue-500" /> Reschedule Session
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs text-slate-400 font-medium mb-1">Target Date</label>
                                        <input
                                            type="date" required
                                            value={rescheduleData.date}
                                            onChange={e => setRescheduleData(prev => ({ ...prev, date: e.target.value }))}
                                            className="w-full text-sm bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 outline-none text-slate-900 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-400 font-medium mb-1">Time Window Option</label>
                                        <select
                                            value={rescheduleData.slot}
                                            onChange={e => setRescheduleData(prev => ({ ...prev, slot: e.target.value }))}
                                            className="w-full text-sm bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 outline-none text-slate-900 dark:text-white"
                                        >
                                            <option value="">Select a slot</option>
                                            <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                                            <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                                            <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                                            <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                    <button type="button" onClick={closeModal} className="px-4 py-2 text-xs text-slate-500 hover:bg-slate-100 rounded-xl transition">Cancel</button>
                                    <button type="submit" disabled={loading} className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm flex items-center gap-2 transition disabled:opacity-50">
                                        {loading && <FaSpinner className="animate-spin" />} Save Changes
                                    </button>
                                </div>
                            </form>
                        )}

                        {activeModal.type === "approved" && (
                            <div className="space-y-4 text-center">
                                <div className="w-11 h-11 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-lg">
                                    <FcOk />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Approve Appointment</h3>
                                    <p className="text-xs text-slate-400 mt-1">Approve this appointment with {activeModal.data?.patientName}?</p>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button type="button" disabled={loading} onClick={closeModal} className="w-full py-2 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium transition">Close</button>
                                    <button
                                        type="button"
                                        disabled={loading}
                                        onClick={() => handleApproved(activeModal.data?.id || activeModal.data?._id)}
                                        className="w-full py-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold flex items-center justify-center gap-1.5 shadow-sm transition disabled:opacity-50"
                                    >
                                        {loading && <FaSpinner className="animate-spin" />} Approve
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeModal.type === "complete" && (
                            <div className="space-y-4 text-center">
                                <div className="w-11 h-11 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-lg">
                                    <FaCheckCircle />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Complete Consultation</h3>
                                    <p className="text-xs text-slate-400 mt-1">Mark this session with {activeModal.data?.patientName} as finished? You will be routed to the request sheet.</p>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button type="button" disabled={loading} onClick={closeModal} className="w-full py-2 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium transition">Cancel</button>
                                    <button
                                        type="button"
                                        disabled={loading}
                                        onClick={() => handleComplete(activeModal.data?.id || activeModal.data?._id)}
                                        className="w-full py-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold flex items-center justify-center gap-1.5 shadow-sm transition disabled:opacity-50"
                                    >
                                        {loading && <FaSpinner className="animate-spin" />} Mark Done
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeModal.type === "cancel" && (
                            <div className="space-y-4 text-center">
                                <div className="w-11 h-11 bg-rose-50 dark:bg-rose-950/40 text-rose-600 rounded-full flex items-center justify-center mx-auto text-lg">
                                    <FaTrashAlt />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Decline Appointment</h3>
                                    <p className="text-xs text-slate-400 mt-1">Are you sure you want to decline this appointment with {activeModal.data?.patientName}?</p>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button type="button" disabled={loading} onClick={closeModal} className="w-full py-2 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium transition">Close</button>
                                    <button
                                        type="button"
                                        disabled={loading}
                                        onClick={() => handleCancel(activeModal.data?.id || activeModal.data?._id)}
                                        className="w-full py-2 text-xs bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold flex items-center justify-center gap-1.5 shadow-sm transition disabled:opacity-50"
                                    >
                                        {loading && <FaSpinner className="animate-spin" />} Confirm Decline
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentRequestPage;