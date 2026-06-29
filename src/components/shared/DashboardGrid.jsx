'use client';

import React from 'react';
import { motion } from 'framer-motion';

const DashboardGrid = ({ stats }) => {
    // Animation variants configured for a 2-second ease-out transition
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 2, ease: "easeOut" }
        }
    };

    const cardsData = [
        {
            label: 'Total Doctors',
            value: stats.totalDoctors,
            icon: '⚕️',
            bg: 'bg-blue-50 dark:bg-blue-950/40',
            text: 'text-blue-500 dark:text-blue-400'
        },
        {
            label: 'Total Patients',
            value: stats.totalPatients,
            icon: '👥',
            bg: 'bg-emerald-50 dark:bg-emerald-950/40',
            text: 'text-emerald-500 dark:text-emerald-400'
        },
        {
            label: 'Total Appointments',
            value: stats.totalAppointments,
            icon: '📅',
            bg: 'bg-pink-50 dark:bg-pink-950/40',
            text: 'text-pink-500 dark:text-pink-400'
        },
        {
            label: 'Total Reviews Given',
            value: stats.totalReviews,
            icon: '⭐',
            bg: 'bg-amber-50 dark:bg-amber-950/40',
            text: 'text-amber-500 dark:text-amber-400'
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
            {cardsData.map((card, index) => (
                <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm box-border flex flex-col justify-center transition-colors duration-300"
                >
                    <div className="flex justify-between items-center w-full">
                        <div className="text-left">
                            <p className="text-gray-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                {card.label}
                            </p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white leading-none">
                                {card.value}
                            </p>
                        </div>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl shrink-0 ${card.bg} ${card.text}`}>
                            {card.icon}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default DashboardGrid;