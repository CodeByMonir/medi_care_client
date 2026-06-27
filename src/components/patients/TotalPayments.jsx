import React from 'react';

const TotalPayments = ({ paymentData = [], appointmentData = [] }) => {
    let lastDoctorName = "N/A";
    let lastPaymentAmount = 0;
    let latestTimestamp = 0;

    // Calculate the dynamic sum based on your criteria:
    // "condition if (!appointmentData?.sessionId || paymentData?.appointmentId){ don't sum}"
    const totalPaymentsCalculated = paymentData.reduce((sum, payment) => {
        // Find corresponding appointment session to verify it exists and has a sessionId
        const matchingAppointment = appointmentData.find(
            (app) => app._id === payment.appointmentId || app.id === payment.appointmentId
        );

        // Explicit condition check
        if (!matchingAppointment || !matchingAppointment.sessionId) {
            return sum;
        }

        // Keep track of the last payment details based on the latest appointment timeline/index
        const itemTimestamp = matchingAppointment.createdAt ? new Date(matchingAppointment.createdAt).getTime() : Date.now();  //Error: Cannot call impure function during render
        if (itemTimestamp >= latestTimestamp) {
            latestTimestamp = itemTimestamp; //Error: Cannot reassign variable after render completes
            lastDoctorName = payment.doctorName || "Unknown Doctor";
            lastPaymentAmount = Number(payment.consultationFee) || 0;
        }

        // Add fee to running sum safely
        const fee = Number(payment.consultationFee) || 0;
        return sum + fee;
    }, 0);

    // Format utility for standard currency output
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
    };

    return (
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 dark:from-slate-900 dark:to-slate-950 p-6 rounded-xl text-white dark:text-slate-100 shadow-md border border-transparent dark:border-slate-800 transition-all duration-200">
            <h2 className="text-lg font-medium opacity-80 dark:text-slate-400">Total Payments</h2>
            <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight">
                    {formatCurrency(totalPaymentsCalculated)}
                </span>
                <span className="text-xs bg-white/20 dark:bg-slate-800 px-2 py-0.5 rounded text-white dark:text-slate-300">
                    USD
                </span>
            </div>

            {/* Bottom row displaying Last Payment metadata */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 dark:border-slate-800 pt-4 text-sm">
                <div>
                    <p className="opacity-70 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">Last Payment</p>
                    <p className="text-lg font-semibold mt-0.5">{formatCurrency(lastPaymentAmount)}</p>
                </div>
                <div>
                    <p className="opacity-70 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">To Doctor</p>
                    <p className="text-lg font-medium mt-0.5 truncate">{lastDoctorName}</p>
                </div>
            </div>
        </div>
    );
};

export default TotalPayments;