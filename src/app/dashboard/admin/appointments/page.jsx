import React from 'react';
import { getAllAppointments } from '@/src/lib/api/admin';
import AppointmentTable from './AppointmentTable'; // Adjust path as needed

export default async function HomePage() {
    // Server-side data fetching
    const appointments = await getAllAppointments();

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen bg-[var(--bg-page)] transition-colors duration-200">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-[var(--text-main)]">Appointment Management</h1>
                <p className="text-sm text-[var(--text-muted)]">
                    Monitor scheduling status, assigned practitioners, and detailed reservation metrics.
                </p>
            </header>

            <AppointmentTable initialAppointments={appointments} />
        </div>
    );
}