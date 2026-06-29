"use client";

import { getAllReviewData } from "@/src/lib/api/admin";
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import { FaStar, FaQuoteLeft, FaSpinner, FaUser } from "react-icons/fa";

export default function Testimonials() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    // Track broken image states by mapping index or unique ID to boolean flags
    const [brokenImages, setBrokenImages] = useState({});

    // Fetch dynamic data from API on component mount
    useEffect(() => {
        async function fetchReviews() {
            try {
                const apiData = await getAllReviewData();

                if (Array.isArray(apiData)) {
                    // Filter by ratings (Only include 4 and 5-star reviews) and limit to 6
                    const filteredAndLimited = apiData
                        .filter(review => review.rating >= 4)
                        .slice(0, 6);

                    setReviews(filteredAndLimited);
                }
            } catch (error) {
                console.error("Failed to load testimonials:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchReviews();
    }, []);

    const handleImageError = (idOrIndex) => {
        setBrokenImages(prev => ({ ...prev, [idOrIndex]: true }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 80, damping: 15 }
        }
    };

    return (
        <section className="bg-white py-16 sm:py-24 dark:bg-slate-950 transition-colors duration-200 overflow-hidden">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl text-center mb-16"
                >
                    <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Patient Stories
                    </span>
                    <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                        Trusted by Thousands of Patients
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Read how our integrated healthcare platform is transforming the medical experience with immediate, secure, and expert support.
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-500 dark:text-slate-400">
                        <FaSpinner className="animate-spin text-3xl text-blue-600" />
                        <p className="text-sm">Loading authentic patient reviews...</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && reviews.length === 0 && (
                    <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                        <p className="text-slate-500 dark:text-slate-400">No high-rated testimonials available right now.</p>
                    </div>
                )}

                {/* Animated Testimonials Grid */}
                {!loading && reviews.length > 0 && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {reviews.map((item, index) => {
                            const uniqueKey = item._id || index;
                            const isImageBroken = brokenImages[uniqueKey] || !item.patientImg;

                            return (
                                <motion.div
                                    key={uniqueKey}
                                    variants={cardVariants}
                                    whileHover={{
                                        y: -6,
                                        boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)"
                                    }}
                                    className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <FaQuoteLeft className="absolute top-6 right-8 text-3xl text-slate-200 dark:text-slate-800 pointer-events-none" />

                                    <div>
                                        {/* Stars Row */}
                                        <div className="flex items-center gap-1 text-amber-400 mb-5">
                                            {[...Array(Number(item.rating) || 5)].map((_, i) => (
                                                <FaStar key={i} className="text-sm" />
                                            ))}
                                        </div>

                                        {/* Review Text */}
                                        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 italic">
                                            "{item.comment || "No comment provided."}"
                                        </p>
                                    </div>

                                    {/* User Profile Footer */}
                                    <div className="mt-8 flex items-center gap-4 border-t border-slate-200/60 pt-6 dark:border-slate-800/80">

                                        {/* Dynamic Fallback Render */}
                                        {isImageBroken ? (
                                            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-2 border-blue-500/20 text-lg font-bold uppercase select-none">
                                                {item.patientName ? item.patientName.charAt(0) : <FaUser className="text-sm" />}
                                            </div>
                                        ) : (
                                            <motion.img
                                                whileHover={{ scale: 1.08 }}
                                                transition={{ duration: 0.2 }}
                                                src={item.patientImg}
                                                alt={`${item.patientName || 'Patient'} profile portrait`}
                                                className="h-12 w-12 rounded-full object-cover border-2 border-blue-500/20 bg-slate-200 dark:bg-slate-800"
                                                loading="lazy"
                                                onError={() => handleImageError(uniqueKey)}
                                            />
                                        )}

                                        <div>
                                            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                                {item.patientName || 'Verified Patient'}
                                            </h3>
                                            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                                Patient Community Member
                                            </p>
                                        </div>
                                    </div>

                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}

            </div>
        </section>
    );
}