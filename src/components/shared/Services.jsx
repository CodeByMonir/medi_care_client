import Link from "next/link";
import {
    FaHeartbeat,
    FaBrain,
    FaBaby,
    FaTooth,
    FaXRay,
    FaEye,
    FaArrowRight
} from "react-icons/fa";

export default function Services() {
    const servicesList = [
        {
            icon: <FaHeartbeat />,
            title: "Cardiology",
            tagline: "Heart & Vascular Care",
            description: "Comprehensive cardiovascular screenings, chest pain evaluation, management of hypertension, and heart disease prevention strategies.",
            colorClass: "text-rose-600 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400",
            href: "/services/cardiology"
        },
        {
            icon: <FaBrain />,
            title: "Neurology",
            tagline: "Brain & Nervous System",
            description: "Expert diagnosis and treatment for chronic migraines, sleep disorders, nerve issues, memory care, and cognitive health.",
            colorClass: "text-purple-600 bg-purple-50 dark:bg-purple-950/30 dark:text-purple-400",
            href: "/services/neurology"
        },
        {
            icon: <FaBaby />,
            title: "Pediatrics",
            tagline: "Child & Infant Care",
            description: "Dedicated healthcare solutions for your children, including regular wellness checkups, vaccinations, and growth monitoring.",
            colorClass: "text-blue-600 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400",
            href: "/services/pediatrics"
        },
        {
            icon: <FaTooth />,
            title: "Dental Care",
            tagline: "Oral Health & Surgery",
            description: "Advanced dental procedures from routine cleanings and cavity fillings to root canals, orthodontics, and cosmetic treatments.",
            colorClass: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400",
            href: "/services/dental"
        },
        {
            icon: <FaXRay />,
            title: "Radiology & Imaging",
            tagline: "Advanced Diagnostics",
            description: "State-of-the-art diagnostic imaging consultations including X-rays, MRI analysis, CT scans, and ultrasound reporting.",
            colorClass: "text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400",
            href: "/services/radiology"
        },
        {
            icon: <FaEye />,
            title: "Ophthalmology",
            tagline: "Vision & Eye Care",
            description: "Complete vision testing, prescription adjustments, glaucoma screenings, and treatment plans for structural eye disorders.",
            colorClass: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/30 dark:text-cyan-400",
            href: "/services/ophthalmology"
        }
    ];

    return (
        <section className="bg-slate-50 py-16 sm:py-24 dark:bg-slate-950 transition-colors duration-200">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            Our Departments
                        </span>
                        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                            Specialized Medical Services
                        </h2>
                        <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
                            Access world-class medical departments online or book physical visits. Our specialists are equipped with modern practices to handle diverse health challenges.
                        </p>
                    </div>
                    <div>
                        <Link
                            href="/doctors"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            View All Specialists <FaArrowRight className="text-xs" />
                        </Link>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesList.map((service, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-between rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900"
                        >
                            <div>
                                {/* Header with Icon and Tagline */}
                                <div className="flex items-center gap-4">
                                    <div className={`rounded-xl p-3.5 text-2xl shrink-0 ${service.colorClass}`}>
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                            {service.title}
                                        </h3>
                                        <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                                            {service.tagline}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    {service.description}
                                </p>
                            </div>

                            {/* Action Link */}
                            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                                <Link
                                    href={service.href}
                                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
                                >
                                    Consult Specialist
                                    <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}