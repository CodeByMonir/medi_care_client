import React from 'react';
import DoctorProfilePage from './DoctorProfilePage';
import { getUserSession } from '@/src/lib/core/session';

export const metadata = {
    title: "Practitioner Profile",
    description: "Doctors Profile Details",
};

const doctorProfile = async () => {

    const user = await getUserSession();

    return (
        <div>
            <DoctorProfilePage doctor={user} />
        </div>
    );
};

export default doctorProfile;