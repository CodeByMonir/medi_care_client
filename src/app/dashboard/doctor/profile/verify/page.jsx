import React from 'react';
import ApplyForVerificationPage from './ApplyForVerificationPage';
import { getUserSession } from '@/src/lib/core/session';

export const metadata = {
    title: "Practitioner Verification Application",
    description: "Doctors Profile Details",
};

const verifyPage = async () => {

    const user = await getUserSession();


    return (
        <div>
            <ApplyForVerificationPage doctor={user} />
        </div>
    );
};

export default verifyPage;