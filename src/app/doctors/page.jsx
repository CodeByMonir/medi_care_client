"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    FaUserMd,
    FaHospital,
    FaStethoscope,
    FaThLarge,
    FaList,
    FaChevronRight,
    FaSearch,
    FaCheckCircle,
    FaSpinner,
    FaBriefcase,
    FaDollarSign,
    FaStar,
    FaSortAmountDown,
    FaSlidersH
} from 'react-icons/fa';
import { getDoctorsData } from '@/src/lib/api/doctors';

export default function DoctorsPage() {
    const [doctorsList, setDoctorsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

    // Separate Search Filter States
    const [searchName, setSearchName] = useState('');
    const [searchSpecialization, setSearchSpecialization] = useState('');

    // Sorting Engine State
    const [sortBy, setSortBy] = useState('none'); // 'none' | 'fee-asc' | 'fee-desc' | 'experience' | 'rating'

    useEffect(() => {
        async function fetchDoctors() {
            try {
                const data = await getDoctorsData();
                setDoctorsList(Array.isArray(data) ? data : data ? [data] : []);
            } catch (error) {
                console.error("Error loading doctors data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDoctors();
    }, []);

    // 1. Filter Engine: Checks explicit matches against both keys simultaneously
    const filteredDoctors = doctorsList.filter(doctor => {
        const matchesName = (doctor.name || '')
            .toLowerCase()
            .includes(searchName.toLowerCase());
        const matchesSpecialization = (doctor.specialization || '')
            .toLowerCase()
            .includes(searchSpecialization.toLowerCase());

        return matchesName && matchesSpecialization;
    });

    // 2. Sort Engine: Multi-conditional array sequencing mapping
    const sortedDoctors = [...filteredDoctors].sort((a, b) => {
        if (sortBy === 'fee-asc') {
            return (a.consultationFee || 0) - (b.consultationFee || 0);
        }
        if (sortBy === 'fee-desc') {
            return (b.consultationFee || 0) - (a.consultationFee || 0);
        }
        if (sortBy === 'experience') {
            return (b.experience || 0) - (a.experience || 0); // Highest experience first
        }
        if (sortBy === 'rating') {
            // Checks user schema metric `rating` first, fallbacks safely if undefined
            return (b.rating || 0) - (a.rating || 0);
        }
        return 0; // Standard default collection arrangement
    });

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center space-y-3">
                    <FaSpinner className="animate-spin text-3xl text-blue-600 dark:text-blue-400 mx-auto" />
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading directory data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8 px-4 sm:px-6 lg:px-8 text-slate-700 dark:text-slate-300 transition-colors duration-200">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Upper Identity Header Context Row */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl flex items-center gap-2">
                            <FaUserMd className="text-blue-600 dark:text-blue-400" /> Medical Directory
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            Search, sort, and book consultations with specialist medical professionals.
                        </p>
                    </div>

                    {/* Layout Switch Option */}
                    <div className="inline-flex items-center p-1 bg-slate-200/60 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg text-xs transition flex items-center gap-1.5 font-bold ${viewMode === 'grid' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500'}`}
                        >
                            <FaThLarge /> Grid
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-lg text-xs transition flex items-center gap-1.5 font-bold ${viewMode === 'table' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500'}`}
                        >
                            <FaList /> Table
                        </button>
                    </div>
                </div>

                {/* ADVANCED CRITERIA CONTROLS WRAPPER PANEL */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <FaSlidersH /> Search & Refine Settings
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* 1. Search by Name Input */}
                        <div className="relative">
                            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/60 pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* 2. Search by Specialization Input */}
                        <div className="relative">
                            <FaStethoscope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                            <input
                                type="text"
                                placeholder="Search specialization..."
                                value={searchSpecialization}
                                onChange={(e) => setSearchSpecialization(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/60 pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* 3. Advanced Sorting Selection Dropdown */}
                        <div className="relative md:col-span-1 lg:col-span-2">
                            <FaSortAmountDown className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/60 pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white outline-none focus:border-blue-500 appearance-none font-medium cursor-pointer"
                            >
                                <option value="none">Default Ordering</option>
                                <option value="fee-asc">Consultation Fee: Low to High</option>
                                <option value="fee-desc">Consultation Fee: High to Low</option>
                                <option value="experience">Longest Clinical Experience</option>
                                <option value="rating">Highest Star Rating</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Empty State Presentation UI Fallback */}
                {sortedDoctors.length === 0 && (
                    <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                        <FaUserMd className="text-4xl text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">No Match Result Found</h3>
                        <p className="text-xs text-slate-400 mt-1">Try modifying your query variables or clear filters.</p>
                    </div>
                )}

                {/* VIEW PIPELINE 1: Grid Cards Presentation Mode Layout */}
                {viewMode === 'grid' && sortedDoctors.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedDoctors.map((doctor) => (
                            <div
                                key={doctor.doctorId || doctor._id}
                                className="bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-16 h-16 shrink-0">
                                                <img
                                                    src={doctor.profileImage || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80"}
                                                    alt={doctor.name}
                                                    className="w-full h-full rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                                                />
                                                {doctor.verificationStatus === "verified" && (
                                                    <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-0.5 rounded-md text-[10px]">
                                                        <FaCheckCircle />
                                                    </span>
                                                )}
                                            </div>
                                            <div className="space-y-0.5">
                                                <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">
                                                    {doctor.name}
                                                </h3>
                                                <p className="text-xs text-blue-600 dark:text-blue-400 font-bold tracking-wide flex items-center gap-1">
                                                    <FaStethoscope className="text-[10px]" /> {doctor.specialization}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Dynamic Rating Chip Integration */}
                                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-[11px] font-black shrink-0">
                                            <FaStar className="text-[10px]" /> {doctor.rating || "4.9"}
                                        </div>
                                    </div>

                                    <div className="space-y-2 border-t border-slate-100 dark:border-slate-800/60 pt-3 text-xs text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <FaHospital className="text-slate-400 shrink-0" />
                                            <span className="line-clamp-1 font-medium">{doctor.hospitalName || "General Affiliation"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaBriefcase className="text-slate-400 shrink-0" />
                                            <span className="font-semibold text-slate-600 dark:text-slate-300">
                                                {doctor.experience ? `${doctor.experience} Years Active` : "Experience N/A"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between gap-2">
                                    <div>
                                        <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Consult Fee</span>
                                        <span className="text-sm font-black text-slate-900 dark:text-white">${doctor.consultationFee || "N/A"}</span>
                                    </div>
                                    <Link
                                        href={`/doctors/${doctor.doctorId || doctor._id}`}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                                    >
                                        View Details <FaChevronRight className="text-[9px]" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* VIEW PIPELINE 2: Structured Tabular Directory Mode Layout */}
                {viewMode === 'table' && sortedDoctors.length > 0 && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        <th className="px-6 py-4">Practitioner Name</th>
                                        <th className="px-6 py-4">Specialization</th>
                                        <th className="px-6 py-4">Hospital Affiliation</th>
                                        <th className="px-6 py-4">Experience</th>
                                        <th className="px-6 py-4">Rating</th>
                                        <th className="px-6 py-4">Fee ($ USD)</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                                    {sortedDoctors.map((doctor) => (
                                        <tr key={doctor.doctorId || doctor._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={doctor.profileImage || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80"}
                                                        alt={doctor.name}
                                                        className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-100 dark:ring-slate-800"
                                                    />
                                                    <div>
                                                        <span className="font-bold text-slate-900 dark:text-white block">{doctor.name}</span>
                                                        <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-tight">{doctor.doctorId}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600 dark:text-blue-400 text-xs">
                                                {doctor.specialization}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400 font-medium text-xs">
                                                {doctor.hospitalName || "N/A"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300 font-semibold text-xs">
                                                {doctor.experience ? `${doctor.experience} Yrs` : "N/A"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-bold text-amber-500 text-xs">
                                                <span className="flex items-center gap-1"><FaStar className="text-[10px]" /> {doctor.rating || "4.9"}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-black text-slate-900 dark:text-white text-xs">
                                                ${doctor.consultationFee || "0"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <Link
                                                    href={`/doctors/${doctor.doctorId || doctor._id}`}
                                                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition"
                                                >
                                                    Details <FaChevronRight className="text-[9px]" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}