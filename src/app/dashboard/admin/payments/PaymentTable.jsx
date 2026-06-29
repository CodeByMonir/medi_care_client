"use client";

import React, { useState, useMemo } from 'react';

export default function PaymentTable({ initialPayments }) {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sort payments by newest transaction date (createdAt) first
    const sortedPayments = useMemo(() => {
        if (!initialPayments) return [];
        return [...initialPayments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [initialPayments]);

    const openDetails = (payment) => {
        setSelectedPayment(payment);
        setIsModalOpen(true);
    };

    const closeDetails = () => {
        setSelectedPayment(null);
        setIsModalOpen(false);
    };

    return (
        <div className="bg-[var(--bg-card)] rounded-lg shadow-sm overflow-hidden border border-[var(--border-color)] transition-all duration-200">
            {sortedPayments.length === 0 ? (
                <p className="text-[var(--text-muted)] p-5 text-center">No payment transactions recorded.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-[var(--text-main)] text-sm">
                        <thead>
                            <tr className="bg-[var(--bg-page)] border-b border-[var(--border-color)]">
                                <th className="px-5 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">Doctor</th>
                                <th className="px-5 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">Patient</th>
                                <th className="px-5 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">Date</th>
                                <th className="px-5 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">Fees</th>
                                <th className="px-5 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedPayments.map((pay) => (
                                <tr key={pay._id} className="border-b border-[var(--border-color)]/50 transition-colors duration-150 hover:bg-black/5 dark:hover:bg-white/5">

                                    {/* Doctor details */}
                                    <td className="px-5 py-4 align-middle">
                                        <div className="font-medium">{pay.doctorName || 'N/A'}</div>
                                        <div className="text-xs text-blue-500 font-medium">{pay.specialization}</div>
                                    </td>

                                    {/* Patient details */}
                                    <td className="px-5 py-4 align-middle">
                                        <div className="font-medium">{pay.patientName || 'N/A'}</div>
                                        <div className="text-xs text-[var(--text-muted)] font-mono max-w-[120px] truncate">ID: {pay.patientId}</div>
                                    </td>

                                    {/* Created Date */}
                                    <td className="px-5 py-4 align-middle text-[var(--text-muted)]">
                                        {pay.createdAt ? new Date(pay.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric', month: 'short', day: 'numeric'
                                        }) : 'N/A'}
                                    </td>

                                    {/* Fee */}
                                    <td className="px-5 py-4 align-middle font-semibold text-emerald-500">
                                        ${Number(pay.consultationFee).toFixed(2)}
                                    </td>

                                    {/* Action Trigger */}
                                    <td className="px-5 py-4 align-middle text-right">
                                        <button
                                            onClick={() => openDetails(pay)}
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

            {/* --- PAYMENT DETAIL VIEW MODAL --- */}
            {isModalOpen && selectedPayment && (
                <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">

                    {/* MODAL CONTAINER: Fixed layout using clean dimensions with overflow hidden */}
                    <div className="bg-[var(--bg-card)] w-full max-w-xl rounded-lg p-6 shadow-xl border border-[var(--border-color)] text-[var(--text-main)] h-auto overflow-hidden">

                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-[var(--border-color)]">
                            <div>
                                <h3 className="text-xl font-bold">Transaction Ledger</h3>
                                <p className="text-xs text-[var(--text-muted)] mt-0.5">Database Link ID: {selectedPayment._id}</p>
                            </div>
                            <span className="px-2.5 py-1 bg-emerald-500/15 text-emerald-500 rounded-full text-xs font-bold uppercase tracking-wider">
                                Paid Successfully
                            </span>
                        </div>

                        {/* Highlighted Stripe Gateway Data Block */}
                        <div className="mb-5 p-3.5 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                            <span className="text-blue-500 text-xs font-bold tracking-wider block mb-1 uppercase">
                                Stripe Gateway Transaction ID
                            </span>
                            <strong className="font-mono text-sm break-all text-blue-600 dark:text-blue-400 select-all">
                                {selectedPayment.stripeId || 'Missing Stripe Reference Token'}
                            </strong>
                        </div>

                        {/* Grid Breakdown Layout */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-xs mb-6">
                            <div className="break-words">
                                <span className="text-[var(--text-muted)] block mb-0.5">Patient Name</span>
                                <strong className="text-sm">{selectedPayment.patientName || 'N/A'}</strong>
                            </div>
                            <div className="break-words">
                                <span className="text-[var(--text-muted)] block mb-0.5">Patient ID Reference</span>
                                <strong className="font-mono break-all">{selectedPayment.patientId || 'N/A'}</strong>
                            </div>

                            <div className="col-span-2 border-t border-[var(--border-color)]/30 my-0.5"></div>

                            <div className="break-words">
                                <span className="text-[var(--text-muted)] block mb-0.5">Consultant Name</span>
                                <strong className="text-sm">{selectedPayment.doctorName || 'N/A'}</strong>
                            </div>
                            <div>
                                <span className="text-[var(--text-muted)] block mb-0.5">Clinical Field</span>
                                <strong className="text-blue-500">{selectedPayment.specialization || 'N/A'}</strong>
                            </div>
                            <div className="col-span-2 break-words">
                                <span className="text-[var(--text-muted)] block mb-0.5">Doctor ID Reference</span>
                                <strong className="font-mono break-all">{selectedPayment.doctorId || 'N/A'}</strong>
                            </div>

                            <div className="col-span-2 border-t border-[var(--border-color)]/30 my-0.5"></div>

                            <div>
                                <span className="text-[var(--text-muted)] block mb-0.5">Settlement Timestamp</span>
                                <strong>{selectedPayment.createdAt ? new Date(selectedPayment.createdAt).toLocaleString() : 'N/A'}</strong>
                            </div>
                            <div>
                                <span className="text-[var(--text-muted)] block mb-0.5">Appointment Assignment ID</span>
                                <strong className="font-mono break-all">{selectedPayment.appointmentId || 'N/A'}</strong>
                            </div>

                            <div className="col-span-2 border-t border-[var(--border-color)]/30 my-0.5"></div>

                            <div className="col-span-2 flex justify-between items-center bg-[var(--bg-page)] p-3 rounded border border-[var(--border-color)]/50">
                                <span className="text-sm font-semibold">Total Funds Captures (Gross Fee)</span>
                                <strong className="text-lg font-bold text-emerald-500">${Number(selectedPayment.consultationFee).toFixed(2)}</strong>
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="flex justify-end pt-4 border-t border-[var(--border-color)]">
                            <button
                                onClick={closeDetails}
                                className="px-5 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                            >
                                Close Ledger
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
