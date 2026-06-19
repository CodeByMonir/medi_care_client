"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FaCalendarCheck,
    FaHistory,
    FaCreditCard,
    FaHeart,
    FaClock,
    FaCheckCircle,
    FaStar,
    FaArrowRight,
    FaUserMd
} from "react-icons/fa";
import { authClient } from "@/src/lib/auth-client";

export default function PatientDashboardOverview() {
    const { data: session } = authClient.useSession();

    // Mock states for your required features
    const [appointments] = useState([
        { id: 1, doctor: "Dr. Sarah Jenkins", specialty: "Cardiologist", date: "June 25, 2026", time: "10:00 AM", status: "Upcoming", price: 120 },
        { id: 2, doctor: "Dr. Michael Chang", specialty: "Dermatologist", date: "May 14, 2026", time: "02:30 PM", status: "Completed", price: 90 },
        { id: 3, doctor: "Dr. Amanda Ross", specialty: "Pediatrician", date: "April 02, 2026", time: "11:15 AM", status: "Completed", price: 110 },
    ]);

    const [favoriteDoctors] = useState([
        { id: 1, name: "Dr. Sarah Jenkins", specialty: "Cardiologist", rating: 4.9, image: "" },
        { id: 2, name: "Dr. Michael Chang", specialty: "Dermatologist", rating: 4.8, image: "" },
        { id: 3, name: "Dr. Amanda Ross", specialty: "Pediatrician", rating: 5.0, image: "" },
    ]);

    // Data filtering & calculations
    const upcomingAppointments = appointments.filter(app => app.status === "Upcoming");
    const appointmentHistory = appointments.filter(app => app.status === "Completed");
    const totalPayments = appointments.reduce((sum, app) => sum + app.price, 0);

    return (
        <div className="flex justify-center">
            <div className="space-y-8 animate-fade-in py-10">
                {/* Top Welcome Panel */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Welcome Back, {session?.user?.name || "Patient"}
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Here's a quick update on your medical dashboard metrics today.
                    </p>
                </div>

                {/* METRICS DISPLAYS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Upcoming Card */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Upcoming Sessions</p>
                            <p className="text-3xl font-bold mt-2 text-blue-600 dark:text-blue-400">{upcomingAppointments.length}</p>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
                            <FaCalendarCheck className="text-xl" />
                        </div>
                    </div>

                    {/* History Card */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Visits</p>
                            <p className="text-3xl font-bold mt-2 text-slate-800 dark:text-slate-100">{appointmentHistory.length}</p>
                        </div>
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl">
                            <FaHistory className="text-xl" />
                        </div>
                    </div>

                    {/* Total Payments Card */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Payments</p>
                            <p className="text-3xl font-bold mt-2 text-emerald-600 dark:text-emerald-400">${totalPayments}</p>
                        </div>
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
                            <FaCreditCard className="text-xl" />
                        </div>
                    </div>

                    {/* Favorites Card */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Favorite Doctors</p>
                            <p className="text-3xl font-bold mt-2 text-rose-600 dark:text-rose-400">{favoriteDoctors.length}</p>
                        </div>
                        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-xl">
                            <FaHeart className="text-xl" />
                        </div>
                    </div>
                </div>

                {/* SPLIT VIEW LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* APPOINTMENTS TIMELINE COLUMN (UPCOMING & HISTORY) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Section: Next Action Appointment */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Upcoming Schedule</h2>
                                <Link href="/dashboard/appointments" className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
                                    View all <FaArrowRight />
                                </Link>
                            </div>

                            {upcomingAppointments.length > 0 ? (
                                <div className="space-y-3">
                                    {upcomingAppointments.map((app) => (
                                        <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/50 rounded-xl gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                                    <FaUserMd className="text-lg" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-slate-100">{app.doctor}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{app.specialty}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between sm:justify-end gap-6">
                                                <div className="text-left sm:text-right">
                                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{app.date}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{app.time}</p>
                                                </div>
                                                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-100 dark:border-amber-900/20">
                                                    <FaClock className="text-[10px]" /> {app.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 dark:text-slate-400 py-2">No dynamic appointments scheduled.</p>
                            )}
                        </div>

                        {/* Section: Appointment History */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-4">Past Visits History</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-medium">
                                            <th className="pb-3 font-semibold">Doctor / Specialty</th>
                                            <th className="pb-3 font-semibold">Date Done</th>
                                            <th className="pb-3 font-semibold">Cost</th>
                                            <th className="pb-3 font-semibold text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {appointmentHistory.map((history) => (
                                            <tr key={history.id} className="text-slate-700 dark:text-slate-300">
                                                <td className="py-3">
                                                    <p className="font-medium text-slate-900 dark:text-slate-100">{history.doctor}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{history.specialty}</p>
                                                </td>
                                                <td className="py-3 text-slate-600 dark:text-slate-300">{history.date}</td>
                                                <td className="py-3 font-medium text-slate-900 dark:text-slate-100">${history.price}</td>
                                                <td className="py-3 text-right">
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                                                        <FaCheckCircle className="text-[10px]" /> Done
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* FAVORITE PHYSICIANS PANEL COLUMN */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-full">
                            <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-4">Favorite Doctors</h2>
                            <div className="space-y-4">
                                {favoriteDoctors.map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-150">
                                        <div className="flex items-center gap-3">
                                            <div className="h-11 w-11 rounded-full bg-slate-100 dark:bg-slate-800 border dark:border-slate-700 flex items-center justify-center text-slate-400">
                                                <FaUserMd className="text-xl" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{doc.name}</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{doc.specialty}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-lg text-xs font-bold">
                                            <FaStar className="text-[11px]" />
                                            <span>{doc.rating.toFixed(1)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}