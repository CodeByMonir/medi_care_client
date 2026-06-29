import { getAllAppointments, getAllReviewData, getPatientsData } from '@/src/lib/api/admin';
import { getDoctorsData } from '@/src/lib/api/doctors';
import React from 'react';
import DashboardGrid from './DashboardGrid';

const StatsPage = async () => {
    const [reviewData, doctorData, patientData, appointmentData] = await Promise.all([
        getAllReviewData(),
        getDoctorsData(),
        getPatientsData(),
        getAllAppointments()
    ]);

    const stats = {
        totalDoctors: doctorData?.length || 0,
        totalPatients: patientData?.length || 0,
        totalAppointments: appointmentData?.length || 0,
        totalReviews: reviewData?.length || 0
    };

    return (
        <div className="flex flex-col justify-center items-center p-8 sm:px-6 lg:px-8 font-sans bg-gray-50 dark:bg-slate-900 text-gray-950 dark:text-gray-50 w-full box-border transition-colors duration-300">
            <header className="mb-10 text-center max-w-2xl">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                    MediCare Statistics
                </h1>
                <p className="text-sm sm:text-base text-gray-500 dark:text-slate-400">
                    Real-time core performance metrics, monitoring healthcare platform engagement, user registrations, and consultation workflows.
                </p>
            </header>

            {/* Render Animated Grid */}
            <DashboardGrid stats={stats} />
        </div>
    );
};

export default StatsPage;