"use client";

import { deleteUserData, updateUserData } from '@/src/lib/api/admin';
import { useState } from 'react';
import { toast } from 'react-toastify';
// Import the React Icon for fallback
import { FaUser } from 'react-icons/fa';

export default function UserTable({ initialUsers = [] }) {
    const [users, setUsers] = useState(Array.isArray(initialUsers) ? initialUsers : []);
    const [userToDelete, setUserToDelete] = useState(null);
    const [brokenImages, setBrokenImages] = useState({});
    const [isMutating, setIsMutating] = useState(false);

    // Feature: Open Confirmation Modal
    const openDeleteModal = (id, name) => {
        setUserToDelete({ id, name: String(name || 'Unknown User') });
    };

    // Feature: Close Confirmation Modal
    const closeDeleteModal = () => {
        setUserToDelete(null);
    };

    // Feature: Actual Delete Execution
    const handleDelete = async () => {
        if (!userToDelete || isMutating) return;
        const targetId = userToDelete.id;
        const previousUsers = [...users];

        try {
            setIsMutating(true);
            setUsers(prev => prev.filter(user => user._id !== targetId));
            closeDeleteModal();

            await deleteUserData(targetId);
            toast.success("User deleted successfully!");
        } catch (error) {
            console.error("Failed to delete user:", error);
            setUsers(previousUsers);
            toast.error(error instanceof Error ? error.message : "Failed to delete user.");
        } finally {
            setIsMutating(false);
        }
    };

    // Feature: Suspend User
    const handleSuspend = async (userId, currentRole) => {
        if (currentRole === 'suspended') {
            toast.error("User is already suspended!");
            return;
        }
        if (isMutating) return;

        try {
            setIsMutating(true);
            await updateUserData(userId, { role: "suspended" });

            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user._id === userId ? { ...user, role: 'suspended' } : user
                )
            );
            toast.success("User suspended!");
        } catch (error) {
            console.error("Failed to update user role:", error);
            toast.error(error instanceof Error ? error.message : "Failed to suspend user.");
        } finally {
            setIsMutating(false);
        }
    };

    // Feature: Activate User
    const handleActive = async (userId, currentRole) => {
        if (currentRole === 'patient' || currentRole === 'active') {
            toast.error("User is already activated!");
            return;
        }
        if (isMutating) return;

        try {
            setIsMutating(true);
            await updateUserData(userId, { role: "patient" });

            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user._id === userId ? { ...user, role: 'patient' } : user
                )
            );
            toast.success("User activated!");
        } catch (error) {
            console.error("Failed to update user role:", error);
            toast.error(error instanceof Error ? error.message : "Failed to activate user.");
        } finally {
            setIsMutating(false);
        }
    };

    const handleImageError = (userId) => {
        setBrokenImages(prev => ({ ...prev, [userId]: true }));
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
                                <th className="px-6 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">Unique Id</th>
                                <th className="px-6 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-color)]">
                            {users.map((user) => {
                                if (!user?._id) return null;

                                const isSuspended = user.role === 'suspended';
                                const hasValidImage = user.image && !brokenImages[user._id];

                                return (
                                    <tr key={user._id} className="transition-colors duration-150 hover:bg-black/5 dark:hover:bg-white/5">
                                        {/* Doctor Profile Column */}
                                        <td className="px-6 py-4 align-middle">
                                            <div className="flex items-center gap-4">
                                                {hasValidImage ? (
                                                    <img
                                                        src={String(user.image)}
                                                        alt={user.name || 'User avatar'}
                                                        className="w-10 h-10 rounded-full object-cover bg-gray-700 border border-gray-600"
                                                        onError={() => handleImageError(user._id)}
                                                    />
                                                ) : (
                                                    /* React Icons Fallback Placeholder */
                                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 border border-gray-300 dark:border-zinc-700 select-none">
                                                        <FaUser className="w-4 h-4" />
                                                    </div>
                                                )}

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
                                                    disabled={isMutating}
                                                    onClick={() => console.log("Viewing details for:", user._id)}
                                                    className="px-4 py-1.5 rounded-md text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50"
                                                >
                                                    View Details
                                                </button>

                                                {isSuspended ? (
                                                    <button
                                                        disabled={isMutating}
                                                        onClick={() => handleActive(user._id, user.role)}
                                                        className="px-4 py-1.5 rounded-md text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-50"
                                                    >
                                                        Activate
                                                    </button>
                                                ) : (
                                                    <button
                                                        disabled={isMutating}
                                                        onClick={() => handleSuspend(user._id, user.role)}
                                                        className="px-4 py-1.5 rounded-md text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white transition-colors disabled:opacity-50"
                                                    >
                                                        Suspend
                                                    </button>
                                                )}

                                                <button
                                                    disabled={isMutating}
                                                    onClick={() => openDeleteModal(user._id, user.name)}
                                                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
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
                            <button
                                disabled={isMutating}
                                onClick={closeDeleteModal}
                                className="px-4 py-2 rounded-md text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isMutating}
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isMutating ? "Deleting..." : "Delete User"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}