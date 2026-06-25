'use client';

import React, { useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { redirect, useRouter } from 'next/navigation';
import { createAppointments } from '@/src/lib/api/appointments';
import { createPayments } from '@/src/lib/api/payments';

export default function AppointmentForm({ doctor, user, sessionId, validAppointmentDates, resolvedParams }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [selectedDate, setSelectedDate] = useState('');

    const getSelectedDayName = (dateString) => {
        if (!dateString) return '';
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dateParts = dateString.split('-');
        const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        return daysOfWeek[dateObj.getDay()].toLowerCase();
    };

    const currentDayName = getSelectedDayName(selectedDate);

    const filteredSlots = doctor.availableSlots?.filter(
        (slot) => slot.day.toLowerCase() === currentDayName
    ) || [];

    // Client-side action execution wrapper
    const clientAction = async (formData) => {
        const appointmentData = {
            appointmentStatus: "pending",
            patientName: formData.get('patientName'),
            patientEmail: formData.get('patientEmail'),
            doctorName: doctor?.name,
            specialization: doctor?.specialization,
            appointmentDate: formData.get('appointmentDate'),
            appointmentSlot: formData.get('appointmentSlot'),
            patientGender: formData.get('patientGender'),
            patientPhone: formData.get('patientPhone'),
            symptoms: formData.get('symptoms'),
            patientId: user.id,
            doctorId: doctor?.doctorId,
            sessionId: sessionId,
        };

        startTransition(async () => {
            try {
                const res = await createAppointments(appointmentData);
                console.log(res);
                if (res?.insertedId) {
                    const paymentsData = {
                        paymentId: res?.insertedId,
                        patientId: user.id,
                        doctorId: doctor?.doctorId,
                        doctorName: doctor?.name,
                        specialization: doctor?.specialization,
                        patientName: formData.get('patientName'),
                        consultationFee: doctor?.consultationFee,
                    }
                    try {
                        const res = await createPayments(paymentsData);
                        if (res) {
                            console.log(res);
                        }
                        else {
                            // console.log("Failed to submit request")
                        }
                    }
                    catch(err){
                        // console.log("An error occurred during submission.")
                    }

                    toast.success("Requested for Appointments Successfully");
                    router.push("/dashboard/patient/appointments");
                } else {
                    toast.error("Failed to submit request.");
                }
            } catch (err) {
                toast.error("An error occurred during submission.");
            }
        });
    };

    return (
        <form action={clientAction} className="p-6 md:p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
                {/* Patient Name */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Patient Full Name
                    </label>
                    <input
                        type="text"
                        name="patientName"
                        defaultValue={user.name || ""}
                        placeholder="Enter full legal name"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-black placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        required
                    />
                </div>

                {/* Contact Information */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Contact Information
                    </label>
                    <input
                        type="email"
                        defaultValue={user.email || ""}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-black outline-none cursor-not-allowed opacity-80"
                        disabled
                    />
                    <input type="hidden" name="patientEmail" value={user.email || ""} />
                </div>

                {/* Date Dropdown */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Select Appointment Date
                    </label>
                    <select
                        name="appointmentDate"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-black outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        required
                    >
                        <option value="" className="text-slate-500 bg-white">Choose an available date...</option>
                        {validAppointmentDates.map((dateObj, idx) => (
                            <option key={idx} value={dateObj.value} className="text-black bg-white">
                                {dateObj.display}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Shift Time Dropdown */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Preferred Practice Shift Time
                    </label>
                    <select
                        name="appointmentSlot"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-black outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
                        required
                        disabled={!selectedDate}
                    >
                        {!selectedDate ? (
                            <option value="" className="text-slate-500 bg-white">Please select a date first...</option>
                        ) : filteredSlots.length === 0 ? (
                            <option value="" className="text-slate-500 bg-white">No shifts available for this day</option>
                        ) : (
                            <>
                                <option value="" className="text-slate-500 bg-white">Choose a time slot...</option>
                                {filteredSlots.map((slot, index) => (
                                    <option key={index} value={`${slot.day}-${slot.hours}`} className="text-black bg-white">
                                        {slot.hours}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
            </div>

            {/* Sub-grid for Gender and Phone Number */}
            <div className="grid sm:grid-cols-2 gap-5">
                {/* Patient Gender Dropdown */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Gender Identity
                    </label>
                    <select
                        name="patientGender"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-black outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        required
                    >
                        <option value="" className="text-slate-500 bg-white">Select gender...</option>
                        <option value="male" className="text-black bg-white">Male</option>
                        <option value="female" className="text-black bg-white">Female</option>
                        <option value="other" className="text-black bg-white">Other</option>
                    </select>
                </div>

                {/* Patient Phone Number */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="patientPhone"
                        placeholder="e.g., +1 (555) 000-0000"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-black placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        required
                    />
                </div>
            </div>

            {/* Description / Symptoms */}
            <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Description of Symptoms / Medical Reasons
                </label>
                <textarea
                    name="symptoms"
                    rows={4}
                    placeholder="Briefly write any clinical conditions or custom reasons regarding your consultation session request..."
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-black placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none"
                />
            </div>

            {/* Action Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-xl shadow-md transition-all"
            >
                {isPending ? "Confirming Booking..." : "Confirm Booking Parameters"}
            </button>
        </form>
    );
}