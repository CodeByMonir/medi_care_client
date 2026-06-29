import { getPatientsData } from '@/src/lib/api/admin';
import UserTable from './UserTable';
import React from 'react';

const HomePage = async () => {
    
    const fetchedUsers = await getPatientsData() || [];
    // console.log(fetchedUsers)
    const users = Array.isArray(fetchedUsers) ? fetchedUsers : [];

    return (
        <div className="min-h-screen p-6 bg-gray-50 text-gray-900 dark:bg-[#0b0f19] dark:text-gray-100 transition-colors duration-200">
            <h1 className="text-24px font-bold mb-6">Manage Users</h1>
            <UserTable initialUsers={users} />
        </div>
    );
};

export default HomePage;