"use client";

import { useState } from "react";
import {
    FaCalendarAlt,
    FaClock,
    FaPlus,
    FaTrash,
    FaEdit,
    FaTimes,
    FaSave,
    FaExclamationCircle
} from "react-icons/fa";

export default function DoctorScheduleCRUD() {
    // Core state array managing active weekly availability blocks
    const [schedules, setSchedules] = useState([
        { id: "SCH-101", day: "Monday", startTime: "09:00", endTime: "13:00", maxPatients: 8 },
        { id: "SCH-102", day: "Monday", startTime: "14:00", endTime: "17:00", maxPatients: 6 },
        { id: "SCH-103", day: "Wednesday", startTime: "09:00", endTime: "13:00", maxPatients: 8 },
        { id: "SCH-104", day: "Friday", startTime: "10:00", endTime: "16:00", maxPatients: 12 },
    ]);

    // Modal & Form Configuration state triggers
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    // Controlled Form values state
    const [day, setDay] = useState("Monday");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [maxPatients, setMaxPatients] = useState(8);

    // --- CRUD OPERATION PIPELINES ---

    // 1. OPEN FORM FOR CREATE (Add Schedule)
    const handleOpenCreate = () => {
        setIsEditing(false);
        setCurrentId(null);
        setDay("Monday");
        setStartTime("");
        setEndTime("");
        setMaxPatients(8);
        setIsModalOpen(true);
    };

    // 2. OPEN FORM FOR UPDATE (Edit Schedule)
    const handleOpenUpdate = (sch) => {
        setIsEditing(true);
        setCurrentId(sch.id);
        setDay(sch.day);
        setStartTime(sch.startTime);
        setEndTime(sch.endTime);
        setMaxPatients(sch.maxPatients);
        setIsModalOpen(true);
    };

    // 3. SUBMIT HANDLER FOR BOTH CREATE & UPDATE
    const handleSaveSchedule = (e) => {
        e.preventDefault();

        if (startTime >= endTime) {
            alert("Error: Start time must occur before your chosen shift end time.");
            return;
        }

        if (isEditing) {
            // UPDATE execution
            setSchedules(prev => prev.map(sch =>
                sch.id === currentId
                    ? { ...sch, day, startTime, endTime, maxPatients: Number(maxPatients) }
                    : sch
            ));
        } else {
            // CREATE execution
            const newSchedule = {
                id: `SCH-${Math.floor(100 + Math.random() * 900)}`,
                day,
                startTime,
                endTime,
                maxPatients: Number(maxPatients)
            };
            setSchedules(prev => [...prev, newSchedule]);
        }

        setIsModalOpen(false);
    };

    // 4. DELETE OPERATION (Remove Schedule)
    const handleRemoveSchedule = (id) => {
        if (confirm("Are you sure you want to completely remove this availability slot? Patients won't be able to book during this window.")) {
            setSchedules(prev => prev.filter(sch => sch.id !== id));
        }
    };

    // Helper formatter to output "09:00" as "09:00 AM" for layout display readability
    const formatDisplayTime = (timeStr) => {
        if (!timeStr) return "";
        const [hour, min] = timeStr.split(":");
        const h = parseInt(hour, 10);
        return `${h % 12 || 12}:${min} ${h >= 12 ? "PM" : "AM"}`;
    };

    const inputClasses = "w-full rounded-xl border border-slate-300 !bg-white px-4 py-2.5 text-sm !text-slate-900 !placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-700 dark:!bg-slate-950 dark:!text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400";

    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className="space-y-8 p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-700 dark:text-slate-300 transition-colors duration-200">

            {/* Upper View Content Headers */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        Manage Availability Schedule
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Configure your weekly working periods, hours, and maximum booking capacities.
                    </p>
                </div>

                {/* CREATE Trigger */}
                <button
                    onClick={handleOpenCreate}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md transition shrink-0"
                >
                    <FaPlus className="text-xs" /> Add New Slot
                </button>
            </div>

            {/* List Table Layout Displaying Active Windows (READ view) */}
            <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                                <th className="p-4 pl-6">Day</th>
                                <th className="p-4">Time Block Window</th>
                                <th className="p-4">Booking Capacity limit</th>
                                <th className="p-4 pr-6 text-right">CRUD Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {schedules.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-slate-400 font-medium">
                                        No active schedule configurations created yet. Click "Add New Slot" to begin.
                                    </td>
                                </tr>
                            ) : (
                                schedules.map((sch) => (
                                    <tr key={sch.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition">
                                        <td className="p-4 pl-6 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <FaCalendarAlt className="text-xs text-blue-500" /> {sch.day}
                                        </td>
                                        <td className="p-4 font-semibold text-slate-800 dark:text-slate-200 text-xs">
                                            <span className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-700/50">
                                                <FaClock className="text-slate-400 text-[11px]" />
                                                {formatDisplayTime(sch.startTime)} – {formatDisplayTime(sch.endTime)}
                                            </span>
                                        </td>
                                        <td className="p-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                                            Max <span className="font-bold text-slate-900 dark:text-white">{sch.maxPatients}</span> Patients / Session
                                        </td>
                                        <td className="p-4 pr-6 text-right space-x-1">
                                            {/* UPDATE Trigger */}
                                            <button
                                                onClick={() => handleOpenUpdate(sch)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition"
                                                title="Edit Slot Settings"
                                            >
                                                <FaEdit className="text-xs" />
                                            </button>

                                            {/* DELETE Trigger */}
                                            <button
                                                onClick={() => handleRemoveSchedule(sch.id)}
                                                className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition"
                                                title="Remove Slot"
                                            >
                                                <FaTrash className="text-xs" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- MODAL DIALOG COMPONENT PANEL FOR CREATE / UPDATE OVERLAYS --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                    <form
                        onSubmit={handleSaveSchedule}
                        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-5"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {isEditing ? "Modify Time Settings" : "Add Availability Block"}
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {isEditing ? "Update configuration criteria for this block." : "Configure a new searchable timetable tier."}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-400"
                            >
                                <FaTimes className="text-xs" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Day Selection */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Day of Week</label>
                                <select
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    className="w-full text-sm font-medium rounded-xl border border-slate-300 !bg-white p-2.5 text-slate-900 dark:border-slate-700 dark:!bg-slate-950 dark:text-slate-100 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                >
                                    {weekDays.map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Hour Split Array Range Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Start Time</label>
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className={inputClasses}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">End Time</label>
                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className={inputClasses}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Numeric Booking limits count */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Maximum Allocation Slots (Capacity)</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={50}
                                    value={maxPatients}
                                    onChange={(e) => setMaxPatients(e.target.value)}
                                    className={inputClasses}
                                    required
                                />
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
                                    Limits total system appointments acceptable during this shift block.
                                </span>
                            </div>
                        </div>

                        {/* Control Triggers */}
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition shadow-md"
                            >
                                <FaSave className="text-[10px]" /> {isEditing ? "Update Shift" : "Save Shift"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    );
}