import React from 'react';
import DoctorProfilePage from './DoctorProfilePage';
export const metadata = {
    title: "Practitioner Profile",
    description: "Doctors Profile Details",
};

const doctorProfile = () => {

    return (
        <div>
            <DoctorProfilePage />
        </div>
    );
};

export default doctorProfile;