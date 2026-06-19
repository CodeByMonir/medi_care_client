"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FaCalendarCheck,
    FaHistory,
    FaWallet,
    FaUserMd,
    FaClock,
    FaCheckCircle,
    FaEllipsisV,
    FaExternalLinkAlt, // Corrected import here
    FaSearch
} from "react-icons/fa";

export default function DoctorDashboardOverview() {
    const [searchTerm, setSearchTerm] = useState("");

    const metrics = [
        { title: "Upcoming Bookings", value: "8 Today", sub: "Next at 1:00 PM", icon: <FaCalendarCheck />, color: "bg-blue-500" },
        { title: "Total Consultations", value: "1,248", sub: "+32 this week", icon: <FaHistory />, color: "bg-emerald-500" },
        { title: "Total Payments", value: "$14,250.00", sub: "Payout pending: $1,120", icon: <FaWallet />, color: "bg-amber-500" },
    ];

    const upcomingAppointments = [
        { id: "1", patient: "Sarah Jenkins", time: "1:00 PM - 1:30 PM", type: "Video Consultation", status: "Confirmed", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
        { id: "2", patient: "Michael Chang", time: "2:15 PM - 2:45 PM", type: "In-Person Checkup", status: "Confirmed", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
        { id: "3", patient: "Amanda Ross", time: "4:00 PM - 4:30 PM", type: "Follow-up", status: "Pending", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" },
    ];

    const appointmentHistory = [
        { id: "101", patient: "David Miller", date: "June 18, 2026", type: "Cardio Screening", fee: "$150.00", status: "Completed" },
        { id: "102", patient: "Elena Rostova", date: "June 17, 2026", type: "General Consultation", fee: "$120.00", status: "Completed" },
        { id: "103", patient: "Robert Vance", date: "June 15, 2026", type: "Prescription Renewal", fee: "$75.00", status: "Completed" },
    ];

    const favoritePeers = [
        { name: "Dr. Aris Thorne", specialty: "Cardiologist", availability: "Available", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=100&q=80" },
        { name: "Dr. Sarah Alami", specialty: "Neurologist", availability: "In Surgery", image: "https://images.unsplash.com/photo-1594824813573-246434e3b96f?auto=format&fit=crop&w=100&q=80" },
        { name: "Dr. James Vance", specialty: "Pediatrician", availability: "Away", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=100&q=80" },
    ];

    const inputClasses = "w-full rounded-xl border border-slate-300 !bg-white pl-10 pr-4 py-2 text-sm !text-slate-900 !placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:!bg-slate-950 dark:!text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400";

    return (
        <div className="space-y-8 p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-700 dark:text-slate-300 transition-colors duration-200">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        Welcome Back, Dr. Callaway
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Here is a summary of your clinic's timeline and performance analytics today.
                    </p>
                </div>

                <div className="w-full md:w-72 relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                        <FaSearch className="text-sm" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search patients, records..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={inputClasses}
                    />
                </div>
            </div>

            {/* Metrics */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {metrics.map((item, index) => (
                    <div key={index} className="bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex items-center justify-between transition-colors duration-200">
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.title}</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{item.value}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{item.sub}</p>
                        </div>
                        <div className={`p-4 rounded-xl text-white ${item.color} shadow-sm text-xl shrink-0`}>
                            {item.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Layout Grid */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">

                <div className="lg:col-span-2 space-y-8">

                    {/* Upcoming Appointments */}
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <FaClock className="text-blue-600 dark:text-blue-400" />
                                <h2 className="font-bold text-slate-900 dark:text-white text-base">Upcoming Appointments</h2>
                            </div>
                            <Link href="/dashboard/doctor/appointments" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5">
                                View Full Calendar <FaExternalLinkAlt className="text-[10px]" />
                            </Link>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {upcomingAppointments.map((appointment) => (
                                <div key={appointment.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                                    <div className="flex items-center gap-3.5">
                                        <img src={appointment.image} alt={appointment.patient} className="w-10 h-10 rounded-full object-cover shadow-inner bg-slate-100" />
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{appointment.patient}</h4>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{appointment.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-6">
                                        <div className="sm:text-right">
                                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{appointment.time}</p>
                                            <p className="text-[10px] text-slate-400 mt-0.5">Today</p>
                                        </div>
                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${appointment.status === "Confirmed"
                                                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                                                : "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                                            }`}>
                                            {appointment.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Appointment History */}
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="text-emerald-600 dark:text-emerald-400" />
                                <h2 className="font-bold text-slate-900 dark:text-white text-base">Appointment History</h2>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                                        <th className="p-4 pl-6">Patient</th>
                                        <th className="p-4">Date Done</th>
                                        <th className="p-4">Inquiry Nature</th>
                                        <th className="p-4">Settled Fee</th>
                                        <th className="p-4 pr-6 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {appointmentHistory.map((history) => (
                                        <tr key={history.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/10 transition">
                                            <td className="p-4 pl-6 font-bold text-slate-900 dark:text-white">{history.patient}</td>
                                            <td className="p-4 text-xs text-slate-500 dark:text-slate-400">{history.date}</td>
                                            <td className="p-4 text-xs font-medium">{history.type}</td>
                                            <td className="p-4 font-semibold text-slate-800 dark:text-slate-200 text-xs">{history.fee}</td>
                                            <td className="p-4 pr-6 text-right">
                                                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                                                    <FaEllipsisV className="text-xs" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Right Sidebar Elements */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Referral Peer Network */}
                    <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6">
                        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                            <FaUserMd className="text-indigo-600 dark:text-indigo-400" />
                            <h2 className="font-bold text-slate-900 dark:text-white text-base">Favorite Peers (Referrals)</h2>
                        </div>
                        <div className="space-y-4">
                            {favoritePeers.map((peer, idx) => (
                                <div key={idx} className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                                    <div className="flex items-center gap-3">
                                        <img src={peer.image} alt={peer.name} className="w-9 h-9 rounded-full object-cover border border-slate-100 dark:border-slate-800 shadow-sm bg-slate-50" />
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{peer.name}</h4>
                                            <p className="text-[11px] text-slate-400 dark:text-slate-500">{peer.specialty}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${peer.availability === "Available"
                                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                                            : peer.availability === "In Surgery"
                                                ? "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400"
                                                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                                        }`}>
                                        {peer.availability}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Status Notification */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-md dark:from-blue-950 dark:to-indigo-950">
                        <h3 className="font-bold text-sm uppercase tracking-wider text-blue-200">System Notification</h3>
                        <p className="text-xs text-blue-50 leading-relaxed mt-2">
                            The hospital telemetry network upgrade takes place at 11:59 PM EST. Live database reads may cycle briefly.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
}