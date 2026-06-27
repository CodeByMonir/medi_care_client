import Link from 'next/link';
import React from 'react';

const UpcomingAppointments = ({ appointmentData = [] }) => {
    const appointments = appointmentData;

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-200">
            <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
                {appointments.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-slate-400">No upcoming appointments.</p>
                ) : (
                    appointments.map((app) => (
                        <div key={app._id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-transparent dark:border-slate-800">
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-slate-200">{app.doctor}</h3>
                                <p className="text-sm text-gray-500 dark:text-slate-400">{app.specialty}</p>
                                <div className="flex gap-4 mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
                                    <span>📅 {app.appointmentDate}</span>
                                    <span>⏰ {app.appointmentSlot}</span>
                                </div>
                            </div>
                            <Link
                                href="/dashboard/patient/appointments"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition"
                            >
                                Reschedule
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UpcomingAppointments;