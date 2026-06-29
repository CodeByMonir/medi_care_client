import React from 'react';
import { doctorsData } from '@/src/lib/api/admin';
import DoctorTable from './DoctorTable'; // Adjust this path based on where you save DoctorTable

export default async function Page() {
    // Fetch data on the server
    const doctors = await doctorsData();

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-[var(--text-main)]">Doctor Management</h1>
                <p className="text-sm text-[var(--text-muted)]">Manage registration requests, verifications, and account statuses.</p>
            </header>

            <DoctorTable initialDoctors={doctors} />
        </div>
    );
}