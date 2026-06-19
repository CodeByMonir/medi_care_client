"use client";

import { useState } from "react";
import {
    FaStar,
    FaRegStar,
    FaPlus,
    FaEdit,
    FaTrashAlt,
    FaUserMd,
    FaTimes,
    FaSpinner,
    FaCommentMedical
} from "react-icons/fa";

export default function MyReviewsPage() {
    // Core state tracking array for reviews list
    const [reviews, setReviews] = useState([
        { id: 1, doctor: "Dr. Sarah Jenkins", specialty: "Cardiologist", rating: 5, comment: "Extremely attentive and explained my diagnosis clearly. Highly recommend her clinic!", date: "2026-05-14" },
        { id: 2, doctor: "Dr. Michael Chang", specialty: "Dermatologist", rating: 4, comment: "Great appointment. The prescription worked perfectly within a week, though wait times were long.", date: "2026-02-28" }
    ]);

    // UI Configuration & Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form inputs states
    const [doctorName, setDoctorName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [hoveredRating, setHoveredRating] = useState(null);

    // CRUD: Open Dialog for Creating a new review
    const openCreateModal = () => {
        setEditingReview(null);
        setDoctorName("");
        setSpecialty("");
        setRating(5);
        setComment("");
        setIsModalOpen(true);
    };

    // CRUD: Open Dialog for Updating an existing review
    const openEditModal = (review) => {
        setEditingReview(review);
        setDoctorName(review.doctor);
        setSpecialty(review.specialty);
        setRating(review.rating);
        setComment(review.comment);
        setIsModalOpen(true);
    };

    // CRUD: Delete Action
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to remove this public provider review? This choice is permanent.")) {
            setReviews(reviews.filter(rev => rev.id !== id));
        }
    };

    // CRUD: Submit Form (Handles both Add & Update operations)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!doctorName || !comment) return;

        setIsSaving(true);

        setTimeout(() => {
            const today = new Date().toISOString().split("T")[0];

            if (editingReview) {
                // UPDATE branch
                setReviews(reviews.map(rev =>
                    rev.id === editingReview.id
                        ? { ...rev, doctor: doctorName, specialty, rating, comment, date: today }
                        : rev
                ));
            } else {
                // CREATE branch
                const newReview = {
                    id: Date.now(),
                    doctor: doctorName,
                    specialty: specialty || "General Practitioner",
                    rating,
                    comment,
                    date: today
                };
                setReviews([newReview, ...reviews]);
            }

            setIsSaving(false);
            setIsModalOpen(false);
        }, 600);
    };

    // Star Rating Helper Renderer Function
    const renderStars = (count, interactive = false) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = interactive
                        ? (hoveredRating !== null ? star <= hoveredRating : star <= rating)
                        : star <= count;

                    return (
                        <button
                            key={star}
                            type="button"
                            disabled={!interactive}
                            onClick={() => interactive && setRating(star)}
                            onMouseEnter={() => interactive && setHoveredRating(star)}
                            onMouseLeave={() => interactive && setHoveredRating(null)}
                            className={`${interactive ? "cursor-pointer text-xl transition transform hover:scale-110" : "text-sm"} ${isFilled ? "text-amber-400" : "text-slate-200 dark:text-slate-700"
                                }`}
                        >
                            {isFilled ? <FaStar /> : <FaRegStar />}
                        </button>
                    );
                })}
            </div>
        );
    };

    return (
        /* FIXED WRAPPER: Changed to a standard block element container centered using mx-auto and max-width */
        <div className="max-w-5xl mx-auto px-4 py-6 w-full space-y-6 animate-fade-in">

            {/* Header layout controls block */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Reviews</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Share feedback or modify ratings regarding your consultations and provider treatments.
                    </p>
                </div>

                {/* CREATE operational button trigger */}
                <button
                    onClick={openCreateModal}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition shrink-0"
                >
                    <FaPlus className="text-xs" />
                    Write a Review
                </button>
            </div>

            {/* REVIEWS GRID CARDS (READ & OPERATION WRAPPERS) */}
            {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviews.map((rev) => (
                        <div key={rev.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
                            <div className="space-y-3">
                                {/* Provider header signature snippet */}
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2.5">
                                        <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                            <FaUserMd className="text-sm" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm leading-tight">{rev.doctor}</h4>
                                            <p className="text-xs text-slate-400 mt-0.5">{rev.specialty}</p>
                                        </div>
                                    </div>
                                    <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">{rev.date}</span>
                                </div>

                                {/* Star Score Rating display array */}
                                <div>{renderStars(rev.rating)}</div>

                                {/* Comment text block content line */}
                                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-4 leading-relaxed italic">
                                    "{rev.comment}"
                                </p>
                            </div>

                            {/* UPDATE & DELETE Management Row */}
                            <div className="flex justify-end items-center gap-1.5 border-t dark:border-slate-800/60 pt-3 mt-1">
                                <button
                                    onClick={() => openEditModal(rev)}
                                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition inline-flex items-center gap-1 text-xs font-medium"
                                    title="Edit Review Content"
                                >
                                    <FaEdit className="text-xs" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(rev.id)}
                                    className="p-2 text-slate-500 hover:text-rose-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition inline-flex items-center gap-1 text-xs font-medium"
                                    title="Delete Review"
                                >
                                    <FaTrashAlt className="text-xs" /> Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-400 max-w-xl mx-auto">
                    <FaCommentMedical className="mx-auto text-4xl text-slate-300 mb-3" />
                    <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">No Feedback Published Yet</h3>
                    <p className="text-sm text-slate-400 mt-1 max-w-xs mx-auto">
                        Your submitted medical team experience and facility ratings will show up right here.
                    </p>
                </div>
            )}

            {/* DIALOG BOX CONTAINER FOR ADD & EDIT MODAL SUBMISSIONS */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleFormSubmit} className="bg-white dark:bg-slate-900 border dark:border-slate-800 max-w-md w-full rounded-2xl p-6 shadow-2xl relative animate-scale-up space-y-4">

                        {/* Close window overlay cross wire button */}
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition"
                        >
                            <FaTimes />
                        </button>

                        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <FaCommentMedical className="text-blue-600" />
                            {editingReview ? "Modify Review Entry" : "Write a New Review"}
                        </h3>

                        {/* Provider Practitioner Target Entry */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Doctor Name</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Dr. Jane Doe"
                                value={doctorName}
                                onChange={(e) => setDoctorName(e.target.value)}
                                className="w-full text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl border p-2.5 border-slate-300 dark:border-slate-700 outline-none transition focus:border-blue-600"
                            />
                        </div>

                        {/* Specialist Department Subtag */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Medical Specialty</label>
                            <input
                                type="text"
                                placeholder="e.g. Neurologist, Dentist"
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                                className="w-full text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl border p-2.5 border-slate-300 dark:border-slate-700 outline-none transition focus:border-blue-600"
                            />
                        </div>

                        {/* Interactive Star Rank Selection */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Your Rating Score</label>
                            <div className="p-1 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 inline-block">
                                {renderStars(rating, true)}
                            </div>
                        </div>

                        {/* Comment Body Input Box */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Patient Review Comment</label>
                            <textarea
                                required
                                rows="4"
                                placeholder="Share details of your clinical visit experience, communication style, or treatment satisfaction..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl border p-2.5 border-slate-300 dark:border-slate-700 outline-none resize-none transition focus:border-blue-600"
                            ></textarea>
                        </div>

                        {/* Form Submission Controls Footer Toolbar */}
                        <div className="flex gap-2 justify-end pt-2">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                            >
                                Dismiss
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition disabled:opacity-75 inline-flex items-center gap-1.5"
                            >
                                {isSaving ? <FaSpinner className="animate-spin" /> : "Publish Feedback"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}