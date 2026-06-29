'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DataDistributionChart = ({ doctorCount, patientCount, appointmentCount, reviewCount }) => {
    // Structure data specifically for Recharts Pie
    const data = [
        { name: 'Doctors', value: doctorCount, color: '#3b82f6' },      // Blue
        { name: 'Patients', value: patientCount, color: '#10b981' },     // Green
        { name: 'Appointments', value: appointmentCount, color: '#f59e0b' }, // Amber
        { name: 'Reviews', value: reviewCount, color: '#8b5cf6' },      // Purple
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="45%"
                    innerRadius={60} // Makes it a donut chart (set to 0 for a solid pie chart)
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #e5e7eb' }}
                />
                <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    iconSize={10}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default DataDistributionChart;