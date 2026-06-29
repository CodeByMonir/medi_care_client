import React from 'react';
import ApplyForVerificationPage from './ApplyForVerificationPage';
import { getUserSession } from '@/src/lib/core/session';
import { getDoctorData } from '@/src/lib/api/doctors';
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Practitioner Verification Application",
    description: "Doctors Profile Details",
};

const verifyPage = async () => {

    const user = await getUserSession();
    const sessionId = user?.id;

    const userData = await getDoctorData(sessionId);
    const userId = userData?.doctorId;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    if (userId == sessionId) {
        await delay(1000);
        redirect("/dashboard/doctor/profile");
    }

    return (
        <div>
            <ApplyForVerificationPage doctor={user} />
        </div>
    );
};

export default verifyPage;