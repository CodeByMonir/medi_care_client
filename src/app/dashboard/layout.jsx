import DashboardSidebar from '@/src/components/dashboard/dashboardSidebar';
import { getUserSession } from '@/src/lib/core/session';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const DashboardLayout = async ({ children }) => {
    return (
        <div className=" flex min-h-screen">
            <div className='flex-1'>{children}</div>
            <DashboardSidebar />
            <ToastContainer />
        </div>

    );
};

export default DashboardLayout;