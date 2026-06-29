import React from 'react';
import PatientProfilePage from './PatientProfilePage';
import { getUserSession } from '@/src/lib/core/session';
import { getUserData } from '@/src/lib/api/patients';
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Create Your Profile",
    description: "For better experience create your profile.",
};

const HomePage = async () => {
    const user = await getUserSession()
    const sessionId = user?.id;

    const userData = await getUserData(sessionId);
    const userId = userData?.patientId;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    
        if (userId == sessionId) {
            await delay(1000);
            redirect("/dashboard/patient/profile");
        }
    return (
        <div>
            <PatientProfilePage />
        </div>
    );
};

export default HomePage;