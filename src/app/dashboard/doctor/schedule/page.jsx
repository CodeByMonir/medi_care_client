import React from 'react';

import { getUserSession } from '@/src/lib/core/session';
import UpdateDoctorSchedulePage from './Schedule';


export const metadata = {
    title: "Update Schedule",
    description: "Doctors Can Update Their Schedule Details",
};


const updatePage = async () => {

    const user = await getUserSession();

    return (
        <div>
            <UpdateDoctorSchedulePage doctor={user} />
        </div>
    );
};

export default updatePage;