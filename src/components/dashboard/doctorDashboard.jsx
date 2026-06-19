"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutSideContentLeft } from '@gravity-ui/icons';
import {
    FaTimes,
    FaThLarge,
    FaSignOutAlt,
    FaCalendarAlt,
    FaClipboardList,
    FaUserMd,
} from "react-icons/fa";
import { FaPrescriptionBottleMedical } from "react-icons/fa6";

export default function DoctorDashboard({ onLogout }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Sidebar Routes Definitions 
    const menuItems = [
        { href: "/dashboard/doctor", name: "Overview", icon: <FaThLarge /> },
        { href: "/dashboard/doctor/schedule", name: "Manage Schedule", icon: <FaCalendarAlt /> },
        { href: "/dashboard/doctor/requests", name: "Appointment Requests", icon: <FaClipboardList /> },
        { href: "/dashboard/doctor/prescriptions", name: "Prescriptions", icon: <FaPrescriptionBottleMedical /> },
        { href: "/dashboard/doctor/profile", name: "Profile Management", icon: <FaUserMd /> },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/* MOBILE FLOATING TRIGGER TOP NAVBAR */}
            <div className="md:hidden flex items-center justify-between h-10 bg-white dark:bg-slate-900 dark:border-slate-800 sticky top-0 z-40 rounded-2xl">
                
                <button
                    onClick={toggleMobileMenu}
                    className="px-3 text-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                    aria-label="Toggle Navigation Sidebar"
                >
                    <LayoutSideContentLeft />
                </button>
            </div>

            {/* BACKDROP LAYER (Closes mobile menu on click outside) */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* SIDEBAR CONTAINER DRAWER */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform 
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
                md:translate-x-0 md:sticky md:top-0 h-screen transition-transform duration-300 ease-in-out flex flex-col justify-between`}
            >
                <div>
                    {/* Mobile Only Header Close Bar */}
                    <div className="h-16 flex md:hidden items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
                        <span className="font-semibold text-slate-400 text-sm">Navigation</span>
                        <button
                            className="text-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg transition"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Route Navigation Links */}
                    <nav className="p-4 space-y-1">
                        {menuItems.map((item) => {
                            // Check active page path matching
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)} // Close drawer on navigation selection
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 dark:bg-blue-500"
                                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                                        }`}
                                >
                                    <span className={`text-base transition-transform duration-200 ${isActive ? "scale-110" : ""}`}>
                                        {item.icon}
                                    </span>
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Footer Sign Out Action */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors duration-150"
                    >
                        <FaSignOutAlt className="text-base" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}