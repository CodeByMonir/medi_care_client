"use client";

import { deleteReviewData, getReviewData, updateReviewData } from "@/src/lib/api/reviews";
import { useSession } from "@/src/lib/auth-client";
import { useState, useEffect } from "react";
import {
    FaStar,
    FaRegStar,
    FaEdit,
    FaTrashAlt,
    FaUserMd,
    FaTimes,
    FaSpinner,
    FaCommentMedical,
    FaExclamationTriangle
} from "react-icons/fa";

export default function MyReviewsPage() {
    const { data: session } = useSession();
    const sessionId = session?.user?.id;

    // Core state tracking array for reviews list
    const [reviews, setReviews] = useState([]);
    const [isLoadingFetch, setIsLoadingFetch] = useState(true);

    // UI Configuration & Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Form inputs states
    const [doctorName, setDoctorName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [hoveredRating, setHoveredRating] = useState(null);

    // Fetch review records from API accurately on client load
    useEffect(() => {
        async function loadReviews() {
            if (!sessionId) return;
            try {
                setIsLoadingFetch(true);
                const apiData = await getReviewData(sessionId);
                setReviews(Array.isArray(apiData) ? apiData : apiData?.data || []);
            } catch (err) {
                console.error("Failed loading patient reviews:", err);
            } finally {
                setIsLoadingFetch(false);
            }
        }
        loadReviews();
    }, [sessionId]);

    // CRUD: Open Dialog for Updating an existing review
    const openEditModal = (review) => {
        setEditingReview(review);
        setDoctorName(review.doctor || review.doctorName || "");
        setSpecialty(review.specialty || "");
        setRating(review.rating || 5);
        setComment(review.comment || "");
        setIsModalOpen(true);
    };

    // CRUD: Trigger Delete Modal Setup
    const openDeleteModal = (id) => {
        setDeletingId(id);
        setIsDeleteModalOpen(true);
    };

    // CRUD: Confirmed Delete Action
    const handleConfirmDelete = async () => {
        if (!deletingId) return;
        setIsDeleting(true);
        try {
            await deleteReviewData(deletingId);
            setReviews(reviews.filter(rev => (rev._id || rev.id) !== deletingId));
            setIsDeleteModalOpen(false);
            setDeletingId(null);
        } catch (err) {
            console.error("Delete operation unsuccessful:", err);
        } finally {
            setIsDeleting(false);
        }
    };

    // CRUD: Submit Form (Handles Update operations exclusively)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!comment) return;

        setIsSaving(true);

        try {
            const today = new Date().toISOString().split("T")[0];
            const currentId = editingReview._id || editingReview.id;

            const updatedPayload = {
                rating,
                comment,
                date: today
            };

            await updateReviewData(currentId, updatedPayload);

            setReviews(reviews.map(rev =>
                (rev._id || rev.id) === currentId
                    ? { ...rev, ...updatedPayload }
                    : rev
            ));

            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed saving adjustments:", error);
        } finally {
            setIsSaving(false);
        }
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
        <div className="max-w-5xl mx-auto px-4 py-6 w-full space-y-6 animate-fade-in">

            {/* Header layout controls block */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Reviews</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Modify historical ratings or text descriptions regarding your consultation treatments.
                    </p>
                </div>
            </div>

            {/* Main view state switcher mapping */}
            {isLoadingFetch ? (
                <div className="flex justify-center items-center py-12">
                    <FaSpinner className="animate-spin text-3xl text-blue-600" />
                </div>
            ) : reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviews.map((rev) => {
                        const uniqueId = rev._id || rev.id;
                        return (
                            <div key={uniqueId} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-2.5">
                                            <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                                <FaUserMd className="text-sm" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm leading-tight">
                                                    {rev.doctor || rev.doctorName || "Medical Practitioner"}
                                                </h4>
                                                {rev.specialty && <p className="text-xs text-slate-400 mt-0.5">{rev.specialty}</p>}
                                            </div>
                                        </div>
                                        <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">{rev.date || "Recent"}</span>
                                    </div>

                                    <div>{renderStars(rev.rating)}</div>

                                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-4 leading-relaxed italic">
                                        "{rev.comment}"
                                    </p>
                                </div>

                                {/* UPDATE & DELETE Management Row */}
                                <div className="flex justify-end items-center gap-1.5 border-t dark:border-slate-800/60 pt-3 mt-1">
                                    <button
                                        onClick={() => openEditModal(rev)}
                                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition inline-flex items-center gap-1 text-xs font-medium"
                                        title="Modify Review Content"
                                    >
                                        <FaEdit className="text-xs" /> Edit
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(uniqueId)}
                                        className="p-2 text-slate-500 hover:text-rose-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition inline-flex items-center gap-1 text-xs font-medium"
                                        title="Delete Review"
                                    >
                                        <FaTrashAlt className="text-xs" /> Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
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

            {/* DIALOG BOX CONTAINER FOR EDIT MODAL SUBMISSIONS */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleFormSubmit} className="bg-white dark:bg-slate-900 border dark:border-slate-800 max-w-md w-full rounded-2xl p-6 shadow-2xl relative space-y-4">

                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition"
                        >
                            <FaTimes />
                        </button>

                        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <FaCommentMedical className="text-blue-600" />
                            Modify Review Entry
                        </h3>

                        {/* Read-Only Information Presentation */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Doctor Name</label>
                            <input
                                type="text"
                                disabled
                                value={doctorName}
                                className="w-full text-sm bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl border p-2.5 border-slate-200 dark:border-slate-700 outline-none cursor-not-allowed"
                            />
                        </div>

                        {/* Interactive Star Rank Selection */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Update Rating Score</label>
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
                                placeholder="Share details of your clinical visit experience..."
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
                                // collect review if from here to 
                                className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition disabled:opacity-75 inline-flex items-center gap-1.5"
                            >
                                {isSaving ? <FaSpinner className="animate-spin" /> : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* CUSTOM MODAL FOR DELETE CONFIRMATION */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 max-w-sm w-full rounded-2xl p-6 shadow-2xl relative text-center space-y-4 animate-scale-up">

                        <div className="mx-auto h-12 w-12 bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center rounded-full">
                            <FaExclamationTriangle className="text-xl" />
                        </div>

                        <div className="space-y-1">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                Remove Public Review?
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Are you sure you want to delete this provider review? This action is permanent and cannot be undone.
                            </p>
                        </div>

                        <div className="flex gap-2 justify-center pt-2">
                            <button
                                type="button"
                                disabled={isDeleting}
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setDeletingId(null);
                                }}
                                className="w-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                disabled={isDeleting}
                                onClick={handleConfirmDelete}
                                className="w-full px-4 py-2 text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 rounded-xl shadow-md transition disabled:opacity-75 flex items-center justify-center gap-1.5"
                            >
                                {isDeleting ? <FaSpinner className="animate-spin" /> : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}