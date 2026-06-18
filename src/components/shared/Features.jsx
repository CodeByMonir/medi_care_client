import {
    FaUserMd,
    FaVideo,
    FaPrescriptionBottleAlt,
    FaRegCalendarCheck,
    FaShieldAlt,
    FaCommentMedical
} from "react-icons/fa";

export default function Features() {
    const featureList = [
        {
            icon: <FaUserMd className="text-blue-600 dark:text-blue-400" />,
            title: "Specialist Matching",
            description: "Filter and find doctors across dozens of specialized fields matching your exact health needs and location."
        },
        {
            icon: <FaVideo className="text-purple-600 dark:text-purple-400" />,
            title: "Telehealth Consultations",
            description: "Skip the waiting room. Speak to certified physicians via encrypted, high-definition video calls from home."
        },
        {
            icon: <FaRegCalendarCheck className="text-emerald-600 dark:text-emerald-400" />,
            title: "Instant Booking",
            description: "View real-time availability and lock in your appointment instantly. Receive auto-reminders via SMS or email."
        },
        {
            icon: <FaPrescriptionBottleAlt className="text-amber-600 dark:text-amber-400" />,
            title: "Digital Prescriptions",
            description: "Access and download verified digital prescriptions directly from your dashboard right after your appointment."
        },
        {
            icon: <FaShieldAlt className="text-indigo-600 dark:text-indigo-400" />,
            title: "Secure Health Vault",
            description: "Your medical history and records are protected with bank-grade encryption, accessible only by you and your doctor."
        },
        {
            icon: <FaCommentMedical className="text-rose-600 dark:text-rose-400" />,
            title: "24/7 Care Chat",
            description: "Get connected with our triage team or AI health assistant at any hour of the day for immediate guidance."
        }
    ];

    return (
        <section className="bg-white py-16 sm:py-24 dark:bg-slate-950 transition-colors duration-200">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
                    <h2 className="text-base font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Everything You Need
                    </h2>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                        Our Core Features
                    </p>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        We offer a complete ecosystem engineered to deliver smarter, faster, and more secure medical care right to your fingertips.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featureList.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
                        >
                            {/* Icon Container */}
                            <div className="inline-flex rounded-xl bg-slate-50 p-4 text-3xl dark:bg-slate-950 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            {/* Feature Text */}
                            <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-slate-100">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}