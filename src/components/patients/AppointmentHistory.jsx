import React from 'react';

const AppointmentHistory = ({ appointmentData = [] }) => {
    const history = appointmentData;

    // Helper to dynamically style badges across light and dark modes
    const getStatusStyles = (status) => {
        const lowerStatus = status?.toLowerCase() || '';
        if (lowerStatus === 'completed' || lowerStatus === 'visited') {
            return 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400 border border-transparent dark:border-green-800/30';
        }
        if (lowerStatus === 'pending' || lowerStatus === 'scheduled') {
            return 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-transparent dark:border-amber-800/30';
        }
        if (lowerStatus === 'cancelled' || lowerStatus === 'rejected') {
            return 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-transparent dark:border-rose-800/30';
        }
        return 'bg-gray-50 text-gray-700 dark:bg-slate-800 dark:text-slate-400';
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-200">
            <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">Appointment History</h2>
            <div className="overflow-x-auto">
                {history.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-slate-400 py-4">No appointment history found.</p>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-500 text-sm font-medium">
                                <th className="pb-3">Doctor</th>
                                <th className="pb-3">Date</th>
                                <th className="pb-3">Specialization</th>
                                <th className="pb-3 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60 text-sm">
                            {history.map((item) => (
                                <tr key={item.id || item._id} className="text-gray-700 dark:text-slate-300 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="py-3 font-medium text-gray-900 dark:text-slate-100">{item.doctorName}</td>
                                    <td className="py-3">{item.appointmentDate}</td>
                                    <td className="py-3">{item.specialization}</td>
                                    <td className="py-3 text-right">
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusStyles(item.appointmentStatus)}`}>
                                            {item.appointmentStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AppointmentHistory;