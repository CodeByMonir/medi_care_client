import { requireRole } from '@/src/lib/core/session';
import React from 'react';

const doctorLayout = async ({ children }) => {
    await requireRole('admin')
    return children;
};

export default doctorLayout;