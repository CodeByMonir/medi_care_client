import AppointmentHistory from '@/src/components/patients/AppointmentHistory';
import FavoriteDoctors from '@/src/components/patients/FavoriteDoctors';
import TotalPayments from '@/src/components/patients/TotalPayments';
import { getAppointmentsData } from '@/src/lib/api/appointments';
import { getDoctorsData } from '@/src/lib/api/doctors';
import { getPaymentData } from '@/src/lib/api/payments';
import { getUserSession } from '@/src/lib/core/session';
import React from 'react';
import UpcomingAppointments from '../../../components/patients/UpcommingAppointments';

const DashboardPage = async () => {

    const session = await getUserSession();

    const paymentData = await getPaymentData(session?.id);

    const appointmentData = await getAppointmentsData(session?.id);

    const doctorData = await getDoctorsData();

    return (
        /* ডার্ক মোডের জন্য bg-slate-950 বা bg-gray-950 ব্যবহার করা হয়েছে */
        <div className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <UpcomingAppointments appointmentData={appointmentData} />
                    <AppointmentHistory appointmentData={appointmentData} />
                </div>

                {/* Sidebar Area */}
                <div className="space-y-6">
                    <TotalPayments paymentData={paymentData} appointmentData={appointmentData} />
                    {/* এখানে আপনার ফিল্টারিং লজিক লাগলে appointmentData prop-টি পাস করে দিতে পারেন */}
                    <FavoriteDoctors doctorData={doctorData} />
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;