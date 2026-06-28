"use client";

import React from "react";

export default function MetricsGrid({ appointmentsData = [] }) {
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {appointmentsData.map((item, index) => (
                <div
                    key={index}
                    className="bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex items-center justify-between transition-colors duration-200"
                >
                    <div className="space-y-1">
                        {/* Upper Card Title */}
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            {item.title}
                        </p>

                        {/* Dynamic Count Total */}
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {item.count}
                        </h3>

                        {/* Subtext description */}
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {item.sub}
                        </p>
                    </div>

                    {/* Styled Icon Container using custom color config */}
                    <div className={`p-4 rounded-xl text-white ${item.color} shadow-sm text-xl shrink-0`}>
                        {item.icon}
                    </div>
                </div>
            ))}
        </div>
    );
}