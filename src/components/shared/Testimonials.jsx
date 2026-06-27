"use client";

import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

export default function Testimonials() {
    const reviews = [
        {
            name: "Sarah Jenkins",
            role: "Cardiology Patient",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
            rating: 5,
            quote: "Finding a reliable specialist used to take weeks. Through MediCare Connect, I booked an appointment with a top cardiologist within 48 hours. The video consultation went smoothly, and the digital prescription was sent instantly to my pharmacy."
        },
        {
            name: "David Chen",
            role: "Parent of Pediatric Patient",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
            rating: 5,
            quote: "As a busy parent, the 24/7 care chat is a lifesaver. I was able to consult a verified pediatrician at 11 PM regarding my son's sudden fever. The advice was clear, reassuring, and completely saved us an anxious midnight trip to the ER."
        },
        {
            name: "Elena Rostova",
            role: "Dental Care Patient",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120",
            rating: 5,
            quote: "The interface is extraordinarily clean. I love having my medical history and encrypted reports all saved securely under one private dashboard. Booking dental cleanings and tracking follow-ups is incredibly automated now."
        }
    ];

    // Parent container variant triggers orchestrated delays for children cards
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    // Child item variant for individual card entries
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

                {/* Animated Testimonials Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {reviews.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{
                                y: -6,
                                boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)"
                            }}
                            className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900"
                        >
                            {/* Decorative Quote Icon */}
                            <FaQuoteLeft className="absolute top-6 right-8 text-3xl text-slate-200 dark:text-slate-800 pointer-events-none" />

                            <div>
                                {/* Stars Row */}
                                <div className="flex items-center gap-1 text-amber-400 mb-5">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-sm" />
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 italic">
                                    "{item.quote}"
                                </p>
                            </div>

                            {/* User Profile Footer */}
                            <div className="mt-8 flex items-center gap-4 border-t border-slate-200/60 pt-6 dark:border-slate-800/80">
                                <motion.img
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ duration: 0.2 }}
                                    src={item.image}
                                    alt={`${item.name} profile portrait`}
                                    className="h-12 w-12 rounded-full object-cover border-2 border-blue-500/20"
                                    loading="lazy"
                                />
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                        {item.role}
                                    </p>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}