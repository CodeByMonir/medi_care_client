"use client";

import { useState } from "react";
// Change this line near the top of app/patient/payment-history/page.jsx
import {
    FaReceipt,
    FaCalendarCheck,
    FaCreditCard,
    FaSearch,
    FaDownload,
    FaFileInvoiceDollar,
    FaCheckCircle,
    FaExternalLinkAlt // <-- Replace FaArrowUpRightFromSquare with this
} from "react-icons/fa";

export default function PaymentHistoryPage() {
    // Search filter state tracking
    const [searchQuery, setSearchQuery] = useState("");

    // Mock Data State representing database payments join records
    const [transactions] = useState([
        {
            id: "TXN-98432-A",
            doctor: "Dr. Sarah Jenkins",
            specialty: "Cardiologist",
            appointmentDate: "2026-06-15",
            paymentDate: "2026-06-14",
            amount: 120.00,
            method: "Visa ending in 4242",
            status: "Successful",
            insuranceCoverage: "80% Covered"
        },
        {
            id: "TXN-87121-B",
            doctor: "Dr. Amanda Ross",
            specialty: "Pediatrician",
            appointmentDate: "2026-04-02",
            paymentDate: "2026-04-01",
            amount: 110.00,
            method: "Mastercard ending in 8812",
            status: "Successful",
            insuranceCoverage: "Fully Covered"
        },
        {
            id: "TXN-45109-M",
            doctor: "Dr. Michael Chang",
            specialty: "Dermatologist",
            appointmentDate: "2026-01-20",
            paymentDate: "2026-01-20",
            amount: 90.00,
            method: "Apple Pay",
            status: "Successful",
            insuranceCoverage: "Out of Pocket"
        }
    ]);

    // Simple conditional search matching logic
    const filteredTransactions = transactions.filter(txn =>
        txn.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate total summary values
    const totalPaidSum = transactions.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="flex justify-center">
            <div className="space-y-6 animate-fade-in py-10">
                {/* Header Title Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Payment History</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Monitor your transaction ledgers, paid healthcare invoices, and balance breakdowns.
                        </p>
                    </div>

                    {/* Aggregate Financial Metrics Header Card */}
                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-3 shrink-0">
                        <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600">
                            <FaFileInvoiceDollar className="text-sm" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Amount Contributed</p>
                            <p className="text-base font-bold text-slate-900 dark:text-white">${totalPaidSum}.00</p>
                        </div>
                    </div>
                </div>

                {/* Utility Search Controls Panel */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative w-full sm:max-w-xs">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                            <FaSearch className="text-xs" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search doctor or transaction ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl border pl-9 pr-4 py-2 border-slate-300 dark:border-slate-700 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        />
                    </div>
                    <div className="w-full sm:w-auto ml-auto text-xs text-slate-400 font-medium text-right">
                        Showing {filteredTransactions.length} of {transactions.length} records
                    </div>
                </div>

                {/* TRANSACTION RECORD TABLE DISPLAY */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                                    <th className="p-4 font-semibold">Transaction ID / Date</th>
                                    <th className="p-4 font-semibold">Paid Appointment</th>
                                    <th className="p-4 font-semibold">Billing Details</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold text-right">Receipts</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map((txn) => (
                                        <tr key={txn.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition-colors">

                                            {/* Transaction Reference Column */}
                                            <td className="p-4">
                                                <p className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 select-all">{txn.id}</p>
                                                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                                                    Paid on {txn.paymentDate}
                                                </p>
                                            </td>

                                            {/* Linked Appointment Target Data */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="h-7 w-7 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-lg shrink-0">
                                                        <FaCalendarCheck className="text-xs" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{txn.doctor}</p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">Session: {txn.appointmentDate}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Pricing Breakdown Structure */}
                                            <td className="p-4">
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-slate-100">${txn.amount}.00</p>
                                                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                                                        <FaCreditCard className="text-[10px]" /> {txn.method}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Status / Insurance Badge Indicators */}
                                            <td className="p-4">
                                                <div className="space-y-1">
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30">
                                                        <FaCheckCircle className="text-[10px]" /> {txn.status}
                                                    </span>
                                                    <p className="text-[10px] font-medium text-slate-400 pl-1">{txn.insuranceCoverage}</p>
                                                </div>
                                            </td>

                                            {/* Document Action Triggers */}
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-1.5">
                                                    <button
                                                        onClick={() => alert(`Downloading PDF Invoice file statement for reference: ${txn.id}`)}
                                                        className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                                                        title="Download Formal Invoice"
                                                    >
                                                        <FaDownload className="text-xs" />
                                                    </button>
                                                    <button
                                                        onClick={() => alert(`Redirecting to secure merchant payment gateway receipt URL lookup stub.`)}
                                                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition"
                                                        title="View Gateway Receipt"
                                                    >
                                                        <FaExternalLinkAlt className="text-xs" /> {/* <-- Changed here */}
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-slate-400 font-medium">
                                            <FaReceipt className="mx-auto text-2xl text-slate-300 mb-2" />
                                            No billing records matched your query terms.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}