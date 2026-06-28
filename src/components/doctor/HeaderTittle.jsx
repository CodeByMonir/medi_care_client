import React from 'react';

export default function DashboardHeader({ title = "Doctor Dashboard" }) {
    // Dynamically format today's date nicely for the doctor
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                    {title}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Welcome back! Here is an overview of your medical practice performance.
                </p>
            </div>

            {/* Elegant contextual date pill */}
            <div className="mt-2 sm:mt-0 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start sm:self-auto text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
                {today}
            </div>
        </div>
    );
}