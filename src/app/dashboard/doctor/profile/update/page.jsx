import React from 'react';
import UpdateDoctorProfilePage from './UpdateDoctorProfilePage';
import { getUserSession } from '@/src/lib/core/session';


export const metadata = {
    title: "Update Profile",
    description: "Doctors Can Update Their Profile Details",
};


const updatePage = async () => {

    const user = await getUserSession();

    return (
        <div>
            <UpdateDoctorProfilePage doctor={user} />
        </div>
    );
};

export default updatePage;