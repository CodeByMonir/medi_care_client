import React from 'react';
import { FaClock, FaUser, FaChevronRight } from 'react-icons/fa';

export default function UpcomingAppointments({ appointments = [] }) {
    // 1. Get today's system date string format (YYYY-MM-DD)
    const todayStr = new Date().toISOString().split('T')[0];

    // 2. Filter for active upcoming appointments (Today onwards)
    // Sorts them so the closest upcoming appointment appears first
    const upcomingList = appointments
        .filter(app => app?.appointmentDate >= todayStr)
        .sort((a, b) => new Date(`${a.appointmentDate} ${a.appointmentTime || '00:00'}`) - new Date(`${b.appointmentDate} ${b.appointmentTime || '00:00'}`));

    return (
        <div className="bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-full transition-colors duration-200">
            {/* Component Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Upcoming Appointments</h2>
                    <p className="text-xs text-slate-400">Next scheduled sessions</p>
                </div>
                <span className="text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 px-2.5 py-1 rounded-full">
                    {upcomingList.length} Total
                </span>
            </div>

            {/* Content List Area */}
            {upcomingList.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-400 mb-2">
                        <FaUser className="text-lg" />
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No scheduled visits</p>
                    <p className="text-xs text-slate-400 mt-0.5">Your schedule is currently clear.</p>
                </div>
            ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800 flex-1">
                    {/* Limit preview slice to the top 4 closest upcoming bookings */}
                    {upcomingList.slice(0, 4).map((app, index) => (
                        <div key={app.id || index} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0 group">
                            <div className="flex items-center space-x-3.5">
                                {/* Profile Placeholder Icon */}
                                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300">
                                    <FaUser className="text-xs" />
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                        {app.patientName || "Unknown Patient"}
                                    </h4>
                                    <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        <FaClock className="text-slate-400 text-[10px]" />
                                        <span>{app.appointmentDate} • {app.appointmentTime || "Not Specified"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                {/* Dynamic Status Pill */}
                                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium border capitalize ${app.status === 'confirmed'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50'
                                        : 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50'
                                    }`}>
                                    {app.status || 'Pending'}
                                </span>
                                <FaChevronRight className="text-slate-300 dark:text-slate-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 transform duration-200" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}