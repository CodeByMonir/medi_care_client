import { getUserSession } from '@/src/lib/core/session';
import React from 'react';

const HomePage = async () => {

    const user = await getUserSession();
    const sessionId = user?.id;

    return (
        <div>
            
        </div>
    );
};

export default HomePage;