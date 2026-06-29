import React from 'react';
import DoctorProfilePage from './DoctorProfilePage';
import { getUserSession } from '@/src/lib/core/session';
import { getDoctorData } from '@/src/lib/api/doctors';
import { redirect } from 'next/navigation';
export const metadata = {
    title: "Practitioner Profile",
    description: "Doctors Profile Details",
};

const doctorProfile = async () => {

    const user = await getUserSession();
        const sessionId = user?.id;
    
        const userData = await getDoctorData(sessionId);
        const userId = userData?.doctorId;
    
        
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    
        if (userId !== sessionId) {
            await delay(1000);
            redirect("/dashboard/patient/profile/verify");
        }

    return (
        <div>
            <DoctorProfilePage />
        </div>
    );
};

export default doctorProfile;