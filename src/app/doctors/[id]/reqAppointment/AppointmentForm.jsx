'use client';

import React, { useState } from 'react';

export default function AppointmentForm({ doctor, user, handleFormSubmit, validAppointmentDates }) {
    const [selectedDate, setSelectedDate] = useState('');

    // Extracts the day of the week (e.g., "monday") from the selected YYYY-MM-DD string
    const getSelectedDayName = (dateString) => {
        if (!dateString) return '';
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dateParts = dateString.split('-'); // [YYYY, MM, DD]
        const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        return daysOfWeek[dateObj.getDay()].toLowerCase();
    };

    const currentDayName = getSelectedDayName(selectedDate);

    // Filters slot arrays to only match the selected day of the week
    const filteredSlots = doctor.availableSlots?.filter(
        (slot) => slot.day.toLowerCase() === currentDayName
    ) || [];

    return (
        <form action={handleFormSubmit} className="p-6 md:p-8 space-y-6">
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
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-400"
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
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-500 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400 cursor-not-allowed"
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
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-400"
                        required
                    >
                        <option value="">Choose an available date...</option>
                        {validAppointmentDates.map((dateObj, idx) => (
                            <option key={idx} value={dateObj.value}>
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
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-400 disabled:opacity-60 disabled:cursor-not-allowed"
                        required
                        disabled={!selectedDate}
                    >
                        {!selectedDate ? (
                            <option value="">Please select a date first...</option>
                        ) : filteredSlots.length === 0 ? (
                            <option value="">No shifts available for this day</option>
                        ) : (
                            <>
                                <option value="">Choose a time slot...</option>
                                {filteredSlots.map((slot, index) => (
                                    <option key={index} value={`${slot.day}-${slot.hours}`}>
                                        {slot.hours}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
            </div>

            {/* Sub-grid for Gender and Phone Number (2nd to last block) */}
            <div className="grid sm:grid-cols-2 gap-5">
                {/* Patient Gender Dropdown */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Gender Identity
                    </label>
                    <select
                        name="patientGender"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-400"
                        required
                    >
                        <option value="">Select gender...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Added: Patient Phone Number */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="patientPhone"
                        placeholder="e.g., +1 (555) 000-0000"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-400"
                        required
                    />
                </div>
            </div>

            {/* Description / Symptoms (Last element before submit) */}
            <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Description of Symptoms / Medical Reasons
                </label>
                <textarea
                    name="symptoms"
                    rows={4}
                    placeholder="Briefly write any clinical conditions or custom reasons regarding your consultation session request..."
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-400 resize-none"
                />
            </div>

            {/* Action Submit Button */}
            <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md transition-all"
            >
                Confirm Booking Parameters
            </button>
        </form>
    );
}