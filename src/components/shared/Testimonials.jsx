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

    return (
        <section className="bg-white py-16 sm:py-24 dark:bg-slate-950 transition-colors duration-200">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Patient Stories
                    </span>
                    <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                        Trusted by Thousands of Patients
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Read how our integrated healthcare platform is transforming the medical experience with immediate, secure, and expert support.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {reviews.map((item, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
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
                                <img
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

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}