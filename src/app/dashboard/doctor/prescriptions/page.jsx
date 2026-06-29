import React, { Suspense } from 'react';
import DoctorPrescriptionsPage from './DoctorPrescriptionsPage';
import { getPrescriptionsData } from '@/src/lib/api/prescription';
import { getUserSession } from '@/src/lib/core/session';

const HomePage = async () => {


    const user = await getUserSession();
    const sessionId = user?.id;
    const prescriptionData = await getPrescriptionsData(sessionId);
    // console.log(prescriptionData)


    return (
        <Suspense fallback={
            <div className="p-8 text-center text-sm font-medium text-slate-400">
                Loading database configuration parameters...
            </div>
        }>
            <DoctorPrescriptionsPage prescriptionData={prescriptionData} />
        </Suspense>
    );
};

export default HomePage;