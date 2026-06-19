import DoctorDashboard from '@/src/components/dashboard/doctorDashboard';
import PatientDashboard from '@/src/components/dashboard/patientDashboard';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className=" flex min-h-screen">
            <DoctorDashboard />
            {/* <PatientDashboard /> */}
            <div className='flex-1'>{children}</div>
        </div>
    );
};

export default DashboardLayout;