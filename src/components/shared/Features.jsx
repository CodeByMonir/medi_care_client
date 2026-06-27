"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDoctorsData } from "@/src/lib/api/doctors";

const Features = () => {
    const [featuredDoctors, setFeaturedDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data inside useEffect to support Client Component architecture
    useEffect(() => {
        const fetchData = async () => {
            try {
                const doctorList = await getDoctorsData();
                setFeaturedDoctors(doctorList.slice(0, 6));
            } catch (error) {
                console.error("Error fetching doctor data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Framer Motion Parent Variant (Stagger effect for children)
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    // Framer Motion Child Variant (Individual card animation)
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        },
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center bg-white dark:bg-slate-950">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <section className="bg-white py-16 sm:py-24 dark:bg-slate-950 transition-colors duration-200 overflow-hidden">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl text-center mb-16 sm:mb-20"
                >
                    <h2 className="text-base font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Our Experts
                    </h2>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                        Meet Our Medical Professionals
                    </p>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Connect with highly qualified doctors across various specializations, ready to provide top-tier care.
                    </p>
                </motion.div>

                {/* Animated Doctors Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {featuredDoctors.map((doctor, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{
                                y: -6,
                                boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                            }}
                            className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex gap-5">
                                {/* Doctor Avatar/Image Container */}
                                <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-950">
                                    {doctor?.profileImage ? (
                                        <motion.img
                                            whileHover={{ scale: 1.08 }}
                                            transition={{ duration: 0.3 }}
                                            src={doctor.profileImage}
                                            alt={doctor.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-800">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                <div>{/* Doctor Professional Details */}
                                    <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-slate-100">
                                        {doctor.name}
                                    </h3>

                                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                                        {doctor.specialization}
                                    </p></div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <div className="flex justify-between">
                                    <span className="font-medium text-slate-500 dark:text-slate-500">Experience:</span>
                                    <span>{doctor.experience}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-slate-500 dark:text-slate-500">Consultation Fee:</span>
                                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                                        {doctor.consultationFee}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}

export default Features;