"use client";

import { deleteUserData, updateUserData } from '@/src/lib/api/admin';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function UserTable({ initialUsers }) {
    const [users, setUsers] = useState(initialUsers);
    const [userToDelete, setUserToDelete] = useState(null);

    // Feature: Open Confirmation Modal
    const openDeleteModal = (id, name) => {
        setUserToDelete({ id, name });
    };

    // Feature: Close Confirmation Modal
    const closeDeleteModal = () => {
        setUserToDelete(null);
    };

    // Feature: Actual Delete Execution
    const handleDelete = async () => {
        if (!userToDelete) return;
        const targetId = userToDelete.id;

        try {
            setUsers(users.filter(user => user._id !== targetId));
            closeDeleteModal();

            await deleteUserData(targetId);
            toast.success("User deleted successfully!");
        } catch (error) {
            console.error("Failed to delete user:", error);
            setUsers(initialUsers);
            toast.error("Failed to delete user.");
        }
    };

    // Feature: Suspend User
    const handleSuspend = async (userId, currentRole) => {
        if (currentRole === 'suspended') {
            toast.error("User is already suspended!");
            return;
        }

        try {
            await updateUserData(userId, { role: "suspended" });
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user._id === userId ? { ...user, role: 'suspended' } : user
                )
            );
            toast.success("User suspended!");
        } catch (error) {
            console.error("Failed to update user role:", error);
            toast.error("Failed to suspend user.");
        }
    };

    // Feature: Activate User
    const handleActive = async (userId, currentRole) => {
        if (currentRole === 'patient' || currentRole === 'active') {
            toast.error("User is already activated!");
            return;
        }

        try {
            await updateUserData(userId, { role: "patient" });
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user._id === userId ? { ...user, role: 'patient' } : user
                )
            );
            toast.success("User activated!");
        } catch (error) {
            console.error("Failed to update user role:", error);
            toast.error("Failed to activate user.");
        }
    };

    return (
        <div className="bg-[var(--bg-card)] rounded-lg shadow-sm overflow-hidden border border-[var(--border-color)] transition-all duration-200 relative">
            {users.length === 0 ? (
                <p className="text-[var(--text-muted)] p-5 text-center">No records found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-[var(--text-main)] text-sm">
                        <thead>
                            <tr className="border-b border-[var(--border-color)] bg-black/10 dark:bg-white/5">
                                <th className="px-6 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">Doctor</th>
                                <th className="px-6 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">License</th>
                                <th className="px-6 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-color)]">
                            {users.map((user) => {
                                const isSuspended = user.role === 'suspended';

                                return (
                                    <tr key={user._id} className="transition-colors duration-150 hover:bg-black/5 dark:hover:bg-white/5">
                                        {/* Doctor Profile Column */}
                                        <td className="px-6 py-4 align-middle">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={user.image || 'https://via.placeholder.com/40'}
                                                    alt={user.name || 'User avatar'}
                                                    className="w-10 h-10 rounded-full object-cover bg-gray-700 border border-gray-600"
                                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                                                />
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-base">{user.name || 'N/A'}</span>
                                                    <span className="text-xs text-[var(--text-muted)]">{user.email || 'no-email@domain.com'}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* License / ID Column */}
                                        <td className="px-6 py-4 align-middle text-xs font-mono text-[var(--text-muted)]">
                                            {user.patientId || user.licenseId || 'DOC-0000'}
                                        </td>

                                        {/* Status Badge Column */}
                                        <td className="px-6 py-4 align-middle">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isSuspended
                                                ? 'bg-red-500/15 text-red-500 border border-red-500/30'
                                                : 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                                                }`}>
                                                {isSuspended ? 'Suspended' : 'Verified'}
                                            </span>
                                        </td>

                                        {/* Action Buttons Column */}
                                        <td className="px-6 py-4 align-middle text-right">
                                            <div className="flex gap-2 justify-end items-center">
                                                <button
                                                    onClick={() => console.log("Viewing details for:", user._id)}
                                                    className="px-4 py-1.5 rounded-md text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                                                >
                                                    View Details
                                                </button>

                                                {isSuspended ? (
                                                    <button
                                                        onClick={() => handleActive(user._id, user.role)}
                                                        className="px-4 py-1.5 rounded-md text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                                                    >
                                                        Activate
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleSuspend(user._id, user.role)}
                                                        className="px-4 py-1.5 rounded-md text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white transition-colors"
                                                    >
                                                        Suspend
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => openDeleteModal(user._id, user.name)}
                                                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-all"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Confirmation Modal */}
            {userToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[var(--bg-card)] max-w-sm w-full rounded-lg p-6 shadow-xl border border-[var(--border-color)]">
                        <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">Confirm Deletion</h3>
                        <p className="text-sm text-[var(--text-muted)] mb-6">
                            Are you sure you want to delete <span className="font-semibold text-red-500">{userToDelete.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button onClick={closeDeleteModal} className="px-4 py-2 rounded-md text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleDelete} className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors">
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}