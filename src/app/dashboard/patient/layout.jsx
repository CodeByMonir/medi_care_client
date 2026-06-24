import { requireRole } from '@/src/lib/core/session';
import React from 'react';

const patientLayout = async ({ children }) => {
    await requireRole('patient')
    return children;
};

export default patientLayout;