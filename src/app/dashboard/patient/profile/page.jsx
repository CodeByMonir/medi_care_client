import { getUserData } from '@/src/lib/api/patients';
import { getUserSession } from '@/src/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import {
    FaUser,
    FaIdCard,
    FaPhone,
    FaMapMarkerAlt,
    FaTint,
    FaWeight,
    FaRulerVertical,
    FaVenusMars,
    FaShieldAlt
} from "react-icons/fa";

const Homepage = async () => {
    const user = await getUserSession();
    const sessionId = user?.id;

    const userData = await getUserData(sessionId);

    // If userData does not exist, trigger a clean server-side redirect to verification page
    if (!userData) {
        redirect("/dashboard/patient/profile/verify");
    }

    const {
        name,
        image,
        patientId,
        role,
        gender,
        phone,
        address,
        bloodGroup,
        weight,
        height
    } = userData;

    return (
        <div className="flex justify-center bg-slate-50 min-h-screen dark:bg-slate-950">
            <div className="max-w-4xl w-full space-y-6 animate-fade-in py-10 px-4 md:px-0">

                {/* HEADER HERO SECTION (WITH LARGER PROFILE PHOTO) */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center sm:text-left">
                    {/* Increased Avatar Size from w-16 h-16 to w-32 h-32 */}
                    <div className="shrink-0">
                        {image ? (
                            <img
                                src={image}
                                alt={name}
                                className="w-32 h-32 rounded-2xl object-cover ring-4 ring-blue-500/10 border border-slate-200 dark:border-slate-700 shadow-sm"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-2xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400 ring-4 ring-blue-500/5 border border-dashed border-blue-200 dark:border-blue-900/50">
                                <FaUser className="text-5xl" />
                            </div>
                        )}
                    </div>

                    {/* User Info Alignment */}
                    <div className="flex-1 space-y-2 pt-2">
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {name || "Patient Member"}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                            <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 shadow-2sub">
                                <FaShieldAlt className="text-[10px]" /> {role || "Patient"}
                            </span>
                            <span className="text-xs font-mono font-medium text-slate-400 bg-slate-50 dark:bg-slate-950 dark:text-slate-500 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-900/60">
                                ID: {patientId || sessionId}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* LEFT COLUMN: CONTACT & ACCOUNT OVERVIEW */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                Contact Information
                            </h3>

                            {/* Phone Element */}
                            <div className="space-y-1">
                                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                                    <FaPhone /> PHONE NUMBER
                                </span>
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                    {phone || "Not provided"}
                                </p>
                            </div>

                            <hr className="border-slate-100 dark:border-slate-800" />

                            {/* Address Element */}
                            <div className="space-y-1">
                                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                                    <FaMapMarkerAlt /> RESIDENTIAL ADDRESS
                                </span>
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                                    {address || "Not provided"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: HEALTH CARD METRICS */}
                    <div className="md:col-span-2 space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-2">
                            Medical Metrics & Vitals
                        </h3>

                        <div className="grid grid-cols-2 gap-4">

                            {/* Gender Card */}
                            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                                <div className="p-3.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-purple-600 dark:text-purple-400">
                                    <FaVenusMars className="text-lg" />
                                </div>
                                <div>
                                    <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">Gender</span>
                                    <span className="text-base font-bold text-slate-800 dark:text-slate-200">{gender || "—"}</span>
                                </div>
                            </div>

                            {/* Blood Type Card */}
                            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                                <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl text-rose-600 dark:text-rose-400">
                                    <FaTint className="text-lg" />
                                </div>
                                <div>
                                    <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">Blood Group</span>
                                    <span className="text-base font-bold text-slate-800 dark:text-slate-200">{bloodGroup || "—"}</span>
                                </div>
                            </div>

                            {/* Weight Card */}
                            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                                <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-amber-600 dark:text-amber-400">
                                    <FaWeight className="text-lg" />
                                </div>
                                <div>
                                    <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">Weight</span>
                                    <span className="text-base font-bold text-slate-800 dark:text-slate-200">
                                        {weight ? `${weight} kg` : "—"}
                                    </span>
                                </div>
                            </div>

                            {/* Height Card */}
                            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-600 dark:text-emerald-400">
                                    <FaRulerVertical className="text-lg" />
                                </div>
                                <div>
                                    <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">Height</span>
                                    <span className="text-base font-bold text-slate-800 dark:text-slate-200">
                                        {height ? `${height} cm` : "—"}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Homepage;