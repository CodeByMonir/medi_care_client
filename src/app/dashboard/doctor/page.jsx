import DashboardHeader from '@/src/components/doctor/HeaderTittle';
import MetricsGrid from '@/src/components/doctor/MatrixGrid';
import { FavoritePeers } from '@/src/components/doctor/SidebarPanels';
import UpcomingAppointments from '@/src/components/doctor/UpcomingAppointments';
import AppointmentHistory from '@/src/components/patients/AppointmentHistory';
import { getAppointmentsData } from '@/src/lib/api/appointments';
import { getPaymentData } from '@/src/lib/api/payments';
import { getReviewData } from '@/src/lib/api/reviews';
import { getUserSession } from '@/src/lib/core/session';
import React from 'react';
import { FaCalendarCheck, FaUsers, FaStar } from "react-icons/fa";

const HomePage = async () => {
    const session = await getUserSession();
    const sessionId = session?.id;

    // Fetch your database arrays concurrently to save load time
    const [appointmentData, paymentData, reviewData] = await Promise.all([
        getAppointmentsData(sessionId).then(res => res || []),
        getPaymentData(sessionId).then(res => res || []),
        getReviewData(sessionId).then(res => res || [])
    ]);

    // 1. Total Patients Count
    const totalPatientsCount = appointmentData.length;

    // 2. Today's Appointments Filter 
    // Extracts today's system date dynamically into 'YYYY-MM-DD' format
    const todayStr = new Date().toISOString().split('T')[0];
    const todaysAppointmentsCount = appointmentData.filter(app => {
        return app?.appointmentDate?.startsWith(todayStr);
    }).length;

    // 3. Total Reviews Count
    const totalReviewsCount = reviewData.length;

    // Bundle metrics configuration dynamically into the layout schema array
    const metricsConfig = [
        {
            title: "Total Patients",
            count: totalPatientsCount,
            sub: "All-time patient files",
            color: "bg-blue-500",
            icon: <FaUsers />
        },
        {
            title: "Today's Appointments",
            count: todaysAppointmentsCount,
            sub: "Remaining visits today",
            color: "bg-emerald-500",
            icon: <FaCalendarCheck />
        },
        {
            title: "Reviews Received",
            count: totalReviewsCount,
            sub: "Overall patient feedback",
            color: "bg-amber-500",
            icon: <FaStar />
        }
    ];

    return (
        <div className="p-6 space-y-8">
            <DashboardHeader title="Doctor Dashboard" />

            {/* Displaying your dynamic totals through the metrics component */}
            <MetricsGrid appointmentsData={metricsConfig} />

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <UpcomingAppointments appointments={appointmentData} />
                    <AppointmentHistory history={appointmentData} />
                </div>

                <div className="space-y-6">
                    <FavoritePeers />
                </div>
            </div>
        </div>
    );
};

export default HomePage;