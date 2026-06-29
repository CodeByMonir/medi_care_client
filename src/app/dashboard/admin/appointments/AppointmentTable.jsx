"use client";

import React, { useState, useMemo } from 'react';

export default function AppointmentTable({ initialAppointments }) {
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sort appointments: Latest date and time first
    const sortedAppointments = useMemo(() => {
        if (!initialAppointments) return [];

        return [...initialAppointments].sort((a, b) => {
            try {
                // 1. Extract clean date strings (e.g., "2026-06-30")
                const dateA = a.appointmentDate;
                const dateB = b.appointmentDate;

                // 2. Extract the start time (e.g., from "Tuesday-09:00 AM - 05:00 PM" get "09:00 AM")
                const timeStrA = a.appointmentSlot?.split('-')[1]?.trim() || "00:00 AM";
                const timeStrB = b.appointmentSlot?.split('-')[1]?.trim() || "00:00 AM";

                // 3. Combine date and time into a parseable format
                const dateTimeA = new Date(`${dateA} ${timeStrA}`);
                const dateTimeB = new Date(`${dateB} ${timeStrB}`);

                // Sort descending (latest/newest timestamp first)
                return dateTimeB - dateTimeA;
            } catch (err) {
                // Fallback graceful degradation if a string is malformed
                return 0;
            }
        });
    }, [initialAppointments]);

    const openDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const closeDetails = () => {
        setSelectedAppointment(null);
        setIsModalOpen(false);
    };

    // Styling helper for appointment statuses
    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'bg-emerald-500/15 text-emerald-500';
            case 'pending': return 'bg-amber-500/15 text-amber-500';
            case 'cancelled': return 'bg-red-500/15 text-red-500';
            default: return 'bg-blue-500/15 text-blue-500';
        }
    };

    return (
        <div className="bg-[var(--bg-card)] rounded-lg shadow-sm overflow-hidden border border-[var(--border-color)] transition-all duration-200">
            {sortedAppointments.length === 0 ? (
                <p className="text-[var(--text-muted)] p-5 text-center">No appointments found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-[var(--text-main)] text-sm">
                        <thead>
                            <tr className="bg-[var(--bg-page)] border-b border-[var(--border-color)]">
                                <th className="px-5 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">Patient</th>
                                <th className="px-5 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">Doctor</th>
                                <th className="px-5 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">Date & Slot</th>
                                <th className="px-5 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">Status</th>
                                <th className="px-5 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAppointments.map((appt, idx) => (
                                <tr key={appt.sessionId || idx} className="border-b border-[var(--border-color)]/50 transition-colors duration-150 hover:bg-black/5 dark:hover:bg-white/5">

                                    {/* Patient Info */}
                                    <td className="px-5 py-4 align-middle">
                                        <div className="font-medium">{appt.patientName || 'N/A'}</div>
                                        <div className="text-xs text-[var(--text-muted)]">{appt.patientPhone || 'No Phone'}</div>
                                    </td>

                                    {/* Doctor Info */}
                                    <td className="px-5 py-4 align-middle">
                                        <div className="font-medium">{appt.doctorName}</div>
                                        <div className="text-xs text-blue-500 font-medium">{appt.specialization}</div>
                                    </td>

                                    {/* Date & Time Slot */}
                                    <td className="px-5 py-4 align-middle">
                                        <div className="font-medium">{appt.appointmentDate}</div>
                                        <div className="text-xs text-[var(--text-muted)] font-mono">{appt.appointmentSlot}</div>
                                    </td>

                                    {/* Appointment Status */}
                                    <td className="px-5 py-4 align-middle">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyles(appt.appointmentStatus)}`}>
                                            {appt.appointmentStatus || 'pending'}
                                        </span>
                                    </td>

                                    {/* Action Button */}
                                    <td className="px-5 py-4 align-middle text-right">
                                        <button
                                            onClick={() => openDetails(appt)}
                                            className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-blue-500 text-white hover:opacity-90 transition-opacity"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* --- DETAILED VIEW OVERLAY MODAL --- */}
            {isModalOpen && selectedAppointment && (
                <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">

                    <div className="bg-[var(--bg-card)] w-full max-w-xl rounded-lg p-6 shadow-xl border border-[var(--border-color)] text-[var(--text-main)] h-auto overflow-hidden">

                        <div className="flex justify-between items-start mb-4 pb-4 border-b border-[var(--border-color)]">
                            <div className="w-full pr-4 break-words">
                                <h3 className="text-xl font-bold">Appointment Details</h3>
                                <p className="text-xs text-[var(--text-muted)] mt-0.5 whitespace-pre-wrap break-all">
                                    Session ID: {selectedAppointment.sessionId || 'N/A'}
                                </p>
                            </div>
                            <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyles(selectedAppointment.appointmentStatus)}`}>
                                {selectedAppointment.appointmentStatus || 'pending'}
                            </span>
                        </div>

                        {/* Matrix Data Display Grid */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-xs mb-6">
                            <div className="break-words">
                                <span className="text-[var(--text-muted)] block mb-0.5">Patient Name</span>
                                <strong className="text-sm">{selectedAppointment.patientName || 'N/A'}</strong>
                            </div>
                            <div className="break-words">
                                <span className="text-[var(--text-muted)] block mb-0.5">Patient Contact</span>
                                <strong className="text-sm">{selectedAppointment.patientPhone || 'N/A'}</strong>
                            </div>
                            <div>
                                <span className="text-[var(--text-muted)] block mb-0.5">Gender Focus</span>
                                <strong className="capitalize">{selectedAppointment.patientGender || 'N/A'}</strong>
                            </div>
                            <div className="break-words">
                                <span className="text-[var(--text-muted)] block mb-0.5">Patient ID Reference</span>
                                <strong className="font-mono break-all">{selectedAppointment.patientId || 'N/A'}</strong>
                            </div>

                            <div className="col-span-2 border-t border-[var(--border-color)]/30 my-0.5"></div>

                            <div className="break-words">
                                <span className="text-[var(--text-muted)] block mb-0.5">Assigned Practitioner</span>
                                <strong className="text-sm">{selectedAppointment.doctorName || 'N/A'}</strong>
                            </div>
                            <div>
                                <span className="text-[var(--text-muted)] block mb-0.5">Clinical Specialization</span>
                                <strong className="text-blue-500">{selectedAppointment.specialization || 'N/A'}</strong>
                            </div>
                            <div>
                                <span className="text-[var(--text-muted)] block mb-0.5">Scheduled Date</span>
                                <strong>{selectedAppointment.appointmentDate || 'N/A'}</strong>
                            </div>
                            <div>
                                <span className="text-[var(--text-muted)] block mb-0.5">Allotted Time Slot</span>
                                <strong className="font-mono">{selectedAppointment.appointmentSlot || 'N/A'}</strong>
                            </div>
                            <div className="col-span-2 break-words">
                                <span className="text-[var(--text-muted)] block mb-0.5">Doctor ID Reference</span>
                                <strong className="font-mono break-all">{selectedAppointment.doctorId || 'N/A'}</strong>
                            </div>

                            <div className="col-span-2 border-t border-[var(--border-color)]/30 my-0.5"></div>

                            {/* Symptoms Block */}
                            <div className="col-span-2">
                                <span className="text-[var(--text-muted)] block mb-1">Stated Symptoms / Context</span>
                                <div className="p-3 bg-[var(--bg-page)] rounded border border-[var(--border-color)]/50 text-[var(--text-main)] italic break-words">
                                    {selectedAppointment.symptoms || "No listed custom symptoms provided."}
                                </div>
                            </div>
                        </div>

                        {/* Modal Actions Footer */}
                        <div className="flex justify-end pt-4 border-t border-[var(--border-color)]">
                            <button
                                onClick={closeDetails}
                                className="px-5 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                            >
                                Close View
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}