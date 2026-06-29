"use client";

import { updateDoctorStatus } from '@/src/lib/api/admin';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
// Import your status update API function here if available, e.g.:
// import { updateDoctorStatus } from '@/src/lib/api/admin';

export default function DoctorTable({ initialDoctors }) {
    const [doctors, setDoctors] = useState(initialDoctors || []);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [activeModal, setActiveModal] = useState(null); // 'view' | 'verify' | 'reject' | 'suspend'

    // Open targeted modal helper
    const triggerAction = (doctor, type) => {
        setSelectedDoctor(doctor);
        setActiveModal(type);
    };

    const closeModal = () => {
        setSelectedDoctor(null);
        setActiveModal(null);
    };

    // --- Action Handlers ---
    const handleVerify = async () => {
        try {
            // Mocking API call: 
            const updatedData = { verification: 'verified' };
            const sessionId = selectedDoctor._id;
            await updateDoctorStatus(sessionId, updatedData);
            setDoctors(prev => prev.map(doc =>
                doc._id === selectedDoctor._id ? { ...doc, verification: 'verified' } : doc
            ));

            // Contextual toast message depending on old state
            if (selectedDoctor.verification === 'suspended') {
                toast.success(`Dr. ${selectedDoctor.name} has been unsuspended and verified!`);
            } else {
                toast.success(`Dr. ${selectedDoctor.name} has been verified successfully!`);
            }
            closeModal();
        } catch (error) {
            toast.error("Failed to verify doctor.");
        }
    };

    const handleReject = async () => {
        try {
            // Mocking API call:
            const updatedData = { verification: 'rejected' };
            const sessionId = selectedDoctor._id;
            await updateDoctorStatus(sessionId, updatedData);
            setDoctors(prev => prev.map(doc =>
                doc._id === selectedDoctor._id ? { ...doc, verification: 'rejected' } : doc
            ));
            toast.warn(`Application for Dr. ${selectedDoctor.name} rejected.`);
            closeModal();
        } catch (error) {
            toast.error("Failed to reject application.");
        }
    };

    const handleSuspend = async () => {
        try {
            // Mocking API call:
            const updatedData = { verification: 'suspended' };
            const sessionId = selectedDoctor._id;
            await updateDoctorStatus(sessionId, updatedData);
            setDoctors(prev => prev.map(doc =>
                doc._id === selectedDoctor._id ? { ...doc, verification: 'suspended' } : doc
            ));
            toast.error(`Dr. ${selectedDoctor.name} has been suspended.`);
            closeModal();
        } catch (error) {
            toast.error("Failed to suspend doctor.");
        }
    };

    // Style helper for dynamic status badges
    const getStatusStyles = (status) => {
        switch (status) {
            case 'verified': return 'bg-emerald-500/15 text-emerald-500';
            case 'pending': return 'bg-amber-500/15 text-amber-500';
            case 'rejected': return 'bg-red-500/15 text-red-500';
            case 'suspended': return 'bg-purple-500/15 text-purple-500';
            default: return 'bg-gray-500/15 text-gray-500';
        }
    };

    return (
        <div className="bg-[var(--bg-card)] rounded-lg shadow-sm overflow-hidden border border-[var(--border-color)] transition-all duration-200">
            {doctors.length === 0 ? (
                <p className="text-[var(--text-muted)] p-5 text-center">No doctors found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-[var(--text-main)] text-sm">
                        <thead>
                            <tr className="bg-[var(--bg-page)] border-b border-[var(--border-color)]">
                                <th className="px-5 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">Doctor</th>
                                <th className="px-5 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">License</th>
                                <th className="px-5 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">Status</th>
                                <th className="px-5 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doc) => (
                                <tr key={doc._id} className="border-b border-[var(--border-color)]/50 transition-colors duration-150 hover:bg-black/5 dark:hover:bg-white/5">

                                    {/* Image, Name & Email */}
                                    <td className="px-5 py-4 align-middle">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={doc.profileImage || 'https://via.placeholder.com/40'}
                                                alt={doc.name}
                                                className="w-9 h-9 rounded-full object-cover bg-gray-200"
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                                            />
                                            <div>
                                                <span className="font-medium block">{doc.name || 'N/A'}</span>
                                                <span className="text-xs text-[var(--text-muted)]">{doc.email}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* License string representation */}
                                    <td className="px-5 py-4 align-middle font-mono text-xs text-[var(--text-muted)]">
                                        {doc.license}
                                    </td>

                                    {/* Status Badge */}
                                    <td className="px-5 py-4 align-middle">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyles(doc.verification)}`}>
                                            {doc.verification || 'pending'}
                                        </span>
                                    </td>

                                    {/* Context Action Logic Buttons */}
                                    <td className="px-5 py-4 align-middle text-right">
                                        <div className="flex gap-2 justify-end items-center">

                                            {/* Details Button - Always On */}
                                            <button
                                                onClick={() => triggerAction(doc, 'view')}
                                                className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-blue-500 text-white hover:opacity-90 transition-opacity"
                                            >
                                                View Details
                                            </button>

                                            {/* Verify Button - active for pending, rejected, and suspended accounts */}
                                            {(doc.verification === 'pending' || doc.verification === 'rejected' || doc.verification === 'suspended') && (
                                                <button
                                                    onClick={() => triggerAction(doc, 'verify')}
                                                    className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-emerald-500 text-white hover:opacity-90 transition-opacity"
                                                >
                                                    {doc.verification === 'suspended' ? 'Unsuspend' : 'Verify'}
                                                </button>
                                            )}

                                            {/* Reject Button - active for pending incoming requests */}
                                            {doc.verification === 'pending' && (
                                                <button
                                                    onClick={() => triggerAction(doc, 'reject')}
                                                    className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-red-500 text-white hover:opacity-90 transition-opacity"
                                                >
                                                    Reject
                                                </button>
                                            )}

                                            {doc.verification === 'verified' && (
                                                <button
                                                    onClick={() => triggerAction(doc, 'suspend')}
                                                    className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-amber-500 text-white hover:opacity-90 transition-opacity"
                                                >
                                                    Suspend
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* --- SYSTEM MODALS MANAGER --- */}
            {activeModal && selectedDoctor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-all animate-fadeIn">
                    <div className="bg-[var(--bg-card)] max-w-lg w-full rounded-lg p-6 shadow-xl border border-[var(--border-color)] text-[var(--text-main)] max-h-[90vh] overflow-y-auto">

                        {/* VIEW DETAILS FRAME */}
                        {activeModal === 'view' && (
                            <div>
                                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[var(--border-color)]">
                                    <img
                                        src={selectedDoctor.profileImage || 'https://via.placeholder.com/60'}
                                        className="w-14 h-14 rounded-full object-cover bg-gray-200"
                                        alt={selectedDoctor.name}
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold">{selectedDoctor.name}</h3>
                                        <p className="text-sm text-blue-500 font-medium">{selectedDoctor.specialization}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                                    <div><span className="text-[var(--text-muted)] block">Doctor ID</span><strong>{selectedDoctor.doctorId}</strong></div>
                                    <div><span className="text-[var(--text-muted)] block">License No.</span><strong>{selectedDoctor.license}</strong></div>
                                    <div><span className="text-[var(--text-muted)] block">Email Address</span><strong>{selectedDoctor.email}</strong></div>
                                    <div><span className="text-[var(--text-muted)] block">Hospital Affiliation</span><strong>{selectedDoctor.hospitalName || 'N/A'}</strong></div>
                                    <div><span className="text-[var(--text-muted)] block">Qualifications</span><strong>{selectedDoctor.qualifications}</strong></div>
                                    <div><span className="text-[var(--text-muted)] block">Experience</span><strong>{selectedDoctor.experience} Years</strong></div>
                                    <div><span className="text-[var(--text-muted)] block">Consultation Fee</span><strong>${selectedDoctor.consultationFee}</strong></div>
                                    <div><span className="text-[var(--text-muted)] block">Registered On</span><strong>{selectedDoctor.createdAt ? new Date(selectedDoctor.createdAt).toLocaleDateString() : 'N/A'}</strong></div>
                                </div>
                            </div>
                        )}

                        {/* VERIFICATION MODAL */}
                        {activeModal === 'verify' && (
                            <div className="mb-4">
                                <h3 className="text-lg font-bold mb-2 text-emerald-500">
                                    {selectedDoctor.verification === 'suspended' ? 'Re-activate Account' : 'Approve Doctor Account'}
                                </h3>
                                <p className="text-sm text-[var(--text-muted)]">
                                    Are you sure you want to verify <strong>{selectedDoctor.name}</strong>? This authorizes their status back to active access.
                                </p>
                            </div>
                        )}

                        {/* REJECTION MODAL */}
                        {activeModal === 'reject' && (
                            <div className="mb-4">
                                <h3 className="text-lg font-bold mb-2 text-red-500">Reject Application</h3>
                                <p className="text-sm text-[var(--text-muted)]">Are you sure you want to reject the profile registration for <strong>{selectedDoctor.name}</strong>?</p>
                            </div>
                        )}

                        {/* SUSPENSION MODAL */}
                        {activeModal === 'suspend' && (
                            <div className="mb-4">
                                <h3 className="text-lg font-bold mb-2 text-amber-500">Suspend Access</h3>
                                <p className="text-sm text-[var(--text-muted)]">Are you sure you want to suspend <strong>{selectedDoctor.name}</strong>? They will temporarily lose access to practice dashboard views.</p>
                            </div>
                        )}

                        {/* INTERACTIVE MODAL ACTIONS FOOTER */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                            >
                                {activeModal === 'view' ? 'Close' : 'Cancel'}
                            </button>

                            {activeModal === 'verify' && (
                                <button onClick={handleVerify} className="px-4 py-2 rounded-md text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                                    {selectedDoctor.verification === 'suspended' ? 'Confirm Unsuspend' : 'Confirm Verify'}
                                </button>
                            )}
                            {activeModal === 'reject' && (
                                <button onClick={handleReject} className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors">Confirm Reject</button>
                            )}
                            {activeModal === 'suspend' && (
                                <button onClick={handleSuspend} className="px-4 py-2 rounded-md text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors">Confirm Suspend</button>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}