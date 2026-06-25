import { getUserSession } from '@/src/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { FaUserMd, FaChevronLeft, FaHospital, FaStethoscope } from 'react-icons/fa';
import { getDoctorDetails } from '@/src/lib/api/doctors';
import AppointmentForm from './AppointmentForm';
import { stripe } from '@/src/lib/stripe';

function getUpcomingDatesForDays(allowedDays) {
    const dates = [];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const targetDays = allowedDays.map(d => d.toLowerCase());

    let current = new Date();
    for (let i = 0; i < 14; i++) {
        const dayName = daysOfWeek[current.getDay()].toLowerCase();
        if (targetDays.includes(dayName)) {
            dates.push({
                display: current.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
                value: current.toISOString().split('T')[0]
            });
        }
        current.setDate(current.getDate() + 1);
    }
    return dates;
}

export default async function RequestAppointmentPage({ params, searchParams }) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const id = resolvedParams?.id;
    const sessionId = resolvedSearchParams?.session_id;

    if (!sessionId) {
        return redirect(`/doctors/${id}?error=payment_failed`);
    }

    let stripeSession;
    try {
        stripeSession = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items', 'payment_intent']
        });
    } catch (error) {
        console.error("Stripe session retrieval failed:", error);
        return redirect(`/doctors/${id}?error=payment_failed`);
    }

    if (stripeSession.status !== 'complete') {
        return redirect(`/doctors/${id}?error=payment_failed`);
    }

    const user = await getUserSession();
    const doctorData = await getDoctorDetails(id);
    const doctor = Array.isArray(doctorData) ? doctorData[0] : doctorData;

    if (!doctor) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-md text-center space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-500 flex items-center justify-center mx-auto text-lg">
                        <FaUserMd />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Practitioner Not Found</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">The profile could not be verified.</p>
                    <Link href="/doctors" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline pt-2">
                        <FaChevronLeft className="text-[10px]" /> Return to Directory
                    </Link>
                </div>
            </div>
        );
    }

    const operationalDays = doctor.availableSlots?.map(slot => slot.day) || [];
    const validAppointmentDates = getUpcomingDatesForDays(operationalDays);

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-slate-700 dark:text-slate-300 transition-colors duration-200">
            <div className="max-w-3xl mx-auto space-y-6">
                <Link
                    href={`/doctors/${id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
                >
                    <FaChevronLeft className="text-[10px]" /> Back to Specialist Profile
                </Link>

                <div className="bg-white border border-slate-200 rounded-3xl dark:bg-slate-900 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-6 md:p-8 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                        <img
                            src={doctor.profileImage || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"}
                            alt={doctor.name}
                            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-200 dark:ring-slate-700 shadow-sm"
                        />
                        <div className="text-center sm:text-left space-y-1">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">Appointment Scheduling</span>
                            <h1 className="text-xl font-black text-slate-900 dark:text-white">{doctor.name}</h1>
                            <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-xs text-slate-500 dark:text-slate-400">
                                <span className="flex items-center gap-1"><FaStethoscope className="text-blue-500" /> {doctor.specialization}</span>
                                <span className="flex items-center gap-1"><FaHospital className="text-slate-400" /> {doctor.hospitalName}</span>
                            </div>
                        </div>
                    </div>

                    <AppointmentForm
                        doctor={doctor}
                        user={user}
                        sessionId={sessionId}
                        validAppointmentDates={validAppointmentDates}
                        resolvedParams={resolvedParams}
                    />
                </div>
            </div>
        </div>
    );
}