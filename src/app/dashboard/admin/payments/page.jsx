import React from 'react';
import { getAllPaymentData } from '@/src/lib/api/admin';
import PaymentTable from './PaymentTable';

export default async function HomePage() {
    const payments = await getAllPaymentData() || [];

    // Calculate total transactions value
    const totalTransactions = payments.reduce((sum, pay) => sum + Number(pay.consultationFee || 0), 0);

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen bg-[var(--bg-page)] transition-colors duration-200">
            <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-main)]">Payment Management</h1>
                    <p className="text-sm text-[var(--text-muted)]">
                        Track platform revenue, transaction receipts, and practitioner payouts.
                    </p>
                </div>
                {/* Total Transactions Aggregation Widget */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] px-5 py-3 rounded-lg shadow-sm">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-muted)] block">Total Revenue</span>
                    <span className="text-2xl font-bold text-emerald-500">${totalTransactions.toLocaleString()}</span>
                </div>
            </header>

            <PaymentTable initialPayments={payments} />
        </div>
    );
}