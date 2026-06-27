"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDoctorDetails } from "@/src/lib/api/doctors";
import { createReviews } from "@/src/lib/api/reviews";
import { useSession } from "@/src/lib/auth-client";
// 🔴 REMOVED: getUserSession import since it uses server-only 'next/headers'

export default function GiveReviewPage() {
    const params = useParams();
    const router = useRouter();
    const license = params?.id;

    // 🟢 FIXED: Call the session hook at the top level of the component
    const { data: session } = useSession();

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetchingDoctor, setFetchingDoctor] = useState(true);
    const [message, setMessage] = useState({ type: "", text: "" });

    const [doctorInfo, setDoctorInfo] = useState({ id: null, name: "" });

    useEffect(() => {
        async function fetchDoctor() {
            if (!license) return;
            try {
                const doctorData = await getDoctorDetails(license);
                const doctor = Array.isArray(doctorData) ? doctorData[0] : doctorData;

                if (doctor) {
                    setDoctorInfo({
                        id: doctor?._id || doctor?.id,
                        name: doctor?.name || "Unknown Doctor"
                    });
                }
            } catch (error) {
                console.error("Failed to load doctor details:", error);
            } finally {
                setFetchingDoctor(false);
            }
        }
        fetchDoctor();
    }, [license]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            // 🟢 FIXED: Extract user data from the top-level session state
            const patientId = session?.user?.id || session?.id;

            if (!patientId) {
                setMessage({ type: "error", text: "You must be logged in to submit a review." });
                setLoading(false);
                return;
            }

            const reviewData = {
                license: license,
                patientId: patientId,
                doctorId: doctorInfo.id,
                doctorName:doctorInfo.name,
                rating,
                comment,
            };

            console.log("Submitting:", reviewData);

            const res = await createReviews(reviewData);

            if (res && res.success) {
                setMessage({ type: "success", text: "Review submitted successfully!" });
                setComment("");
                setRating(5);

                setTimeout(() => {
                    router.push("/dashboard/patient/reviews");
                }, 3000);
            } else {
                setMessage({ type: "error", text: res?.data?.message || "Something went wrong." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Failed to connect to the server." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">

                <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white text-center">
                    Share Your Experience
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                    You are reviewing:{" "}
                    <span className="font-semibold text-indigo-500">
                        {fetchingDoctor ? "Loading..." : doctorInfo.name || "Unknown Doctor"}
                    </span>
                </p>

                {message.text && (
                    <div className={`p-3 mb-4 rounded-lg text-sm text-center font-medium ${message.type === "success"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Rating Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Rating (1 to 5 Stars)
                        </label>
                        <div className="flex items-center space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`text-3xl transition-colors duration-150 focus:outline-none ${star <= rating ? "text-amber-400" : "text-gray-300 dark:text-gray-600"
                                        }`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Comment Textarea */}
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Your Comments
                        </label>
                        <textarea
                            id="comment"
                            rows="4"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            placeholder="Tell us about your experience..."
                            className="w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none text-sm
                                bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                                dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || fetchingDoctor}
                        className="w-full py-3 px-4 font-semibold text-sm rounded-xl shadow-md transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none
                            bg-blue-600 text-white hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                    >
                        {loading ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            </div>
        </div>
    );
}