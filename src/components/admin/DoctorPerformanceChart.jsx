'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DoctorPerformanceChart = ({ data }) => {
    // Graceful handling if there is no data matching reviews yet
    if (!data || data.length === 0) {
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af' }}>No review data available to map.</div>;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} />
                <YAxis domain={[0, 5]} stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #e5e7eb' }}
                    formatter={(value) => [`${value} ★`, 'Avg Rating']}
                />
                <Bar dataKey="avgRating" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default DoctorPerformanceChart;