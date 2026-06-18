import Link from "next/link";
import { FaStethoscope, FaUserMd, FaShieldAlt, FaRegHandshake, FaAward, FaUsers, FaHospital } from "react-icons/fa";

export default function AboutPage() {
    // Stats Array
    const stats = [
        { label: "Active Patients", value: "50,000+", icon: <FaUsers /> },
        { label: "Verified Doctors", value: "1,200+", icon: <FaUserMd /> },
        { label: "Partner Hospitals", value: "180+", icon: <FaHospital /> },
        { label: "Success Rate", value: "99.2%", icon: <FaAward /> },
    ];

    // Core Values Array
    const values = [
        {
            title: "Patient-First Care",
            description: "We orchestrate our tech stacks around human wellness, lowering administrative barriers between you and elite medical expertise.",
            icon: <FaStethoscope className="text-blue-600 dark:text-blue-400" />,
        },
        {
            title: "Ironclad Security",
            description: "Medical infrastructure demands premium compliance. Your electronic healthcare records remain end-to-end encrypted and completely confidential.",
            icon: <FaShieldAlt className="text-blue-600 dark:text-blue-400" />,
        },
        {
            title: "Absolute Transparency",
            description: "From direct specialist consult metrics to straightforward digital payments, we believe clear interactions generate optimal health outcomes.",
            icon: <FaRegHandshake className="text-blue-600 dark:text-blue-400" />,
        },
    ];

    return (
        <main className="min-h-screen bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 transition-colors duration-200">

            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-28 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                                Our Mission
                            </span>
                            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                                Redefining the Patient Experience.
                            </h1>
                            <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                                MediCare Connect bridges the gap between modern technology and clinical expertise.
                                We empower individuals to find, book, and communicate with premium healthcare professionals
                                smoothly through a secure, unified ecosystem.
                            </p>
                            <div className="mt-8">
                                <Link
                                    href="/doctors"
                                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                                >
                                    Meet Our Specialists
                                </Link>
                            </div>
                        </div>
                        {/* Graphical Mock Element */}
                        <div className="relative mx-auto w-full max-w-md md:max-w-none aspect-square bg-gradient-to-tr from-blue-600 to-indigo-700 dark:from-blue-950 dark:to-indigo-950 rounded-3xl p-8 shadow-xl flex items-center justify-center overflow-hidden group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
                            <FaStethoscope className="text-[12rem] text-white/20 transform group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute bottom-6 left-6 right-6 bg-white/10 dark:bg-slate-950/40 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                                <p className="text-white text-sm font-medium text-center">
                                    "Bringing data-driven agility to physical and virtual medicine."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Metrics Counter Section */}
            <section className="py-12 bg-slate-100 dark:bg-slate-950/60">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center shadow-sm transition hover:shadow-md">
                                <div className="inline-flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl mb-2">
                                    {stat.icon}
                                </div>
                                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-16 sm:py-24">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                            The Principles That Drive Us
                        </h2>
                        <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
                            We operate strictly under the assumption that navigating essential global healthcare
                            should be as intuitive and lightning-fast as any other web layer tool.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition hover:shadow-md"
                            >
                                <div className="mb-4 inline-block rounded-xl bg-blue-50 p-3 dark:bg-blue-950/50">
                                    {value.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {value.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    {value.description}
                                
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simple Dynamic CTA Box */}
            <section className="pb-20">
                <div className="container mx-auto max-w-5xl px-4">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-950 dark:to-indigo-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
                        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/5 blur-xl pointer-events-none"></div>
                        <h2 className="text-2xl sm:text-3xl font-bold">Have questions or need support?</h2>
                        <p className="mt-2 text-blue-100 max-w-xl mx-auto text-sm sm:text-base">
                            Our support teams and network engineers remain active 24 hours a day, 7 days a week to assist you.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-md hover:bg-slate-50 transition"
                            >
                                Contact Support
                            </Link>
                            <Link
                                href="/faq"
                                className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20 transition"
                            >
                                Read FAQs
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}