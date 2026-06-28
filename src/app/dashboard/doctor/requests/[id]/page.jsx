import { getAppointmentData } from '@/src/lib/api/appointments';
import React from 'react';
import Link from 'next/link';
import { FaUserMd, FaCalendarAlt, FaClock, FaArrowLeft } from 'react-icons/fa';
import DoctorRequestDetailPage from './DoctorRequestDetailPage';

const HomePage = async ({ params }) => {
    const resolvedParams = await params;
    const appointmentId = resolvedParams?.id;

    const appointmentData = await getAppointmentData(appointmentId);

    // Fallback UI if the record wasn't found or API returned null
    if (!appointmentData) {
        return (
            <div className="max-w-xl mx-auto mt-12 text-center p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border">
                <p className="text-sm text-slate-500">Appointment record not found.</p>
                <Link href="/dashboard/doctor/appointments" className="text-xs text-blue-600 mt-2 inline-block hover:underline">
                    Return to List
                </Link>
            </div>
        );
    }

    return (
        <div>
            <DoctorRequestDetailPage appointmentData={appointmentData} />
        </div>
    );
};

export default HomePage;