"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDoctorDetails } from "@/src/lib/api/doctors";
import { createReviews } from "@/src/lib/api/reviews";
import { useSession } from "@/src/lib/auth-client";
import { toast } from "react-toastify";

export default function GiveReviewPage() {
    const params = useParams();
    const router = useRouter();
    const license = params?.id;

    const { data: session } = useSession();

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false); // 🟢 Tracks the 3s window before route switch
    const [fetchingDoctor, setFetchingDoctor] = useState(true);

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
                        name: doctor?.name || "Unknown Doctor",
                        doctorId: doctor?.doctorId,
                    });
                }
            } catch (error) {
                console.error("Failed to load doctor details:", error);
                toast.error("Failed to fetch doctor details.");
            } finally {
                setFetchingDoctor(false);
            }
        }
        fetchDoctor();
    }, [license]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const patientId = session?.user?.id || session?.id;
            const patientName = session?.user?.name || session?.name;

            if (!patientId) {
                toast.error("You must be logged in to submit a review.");
                setLoading(false);
                return;
            }

            const reviewData = {
                license: license,
                patientId: patientId,
                doctorId: doctorInfo.doctorId,
                doctorName: doctorInfo.name,
                patientName: patientName,
                rating,
                comment,
            };

            const res = await createReviews(reviewData);

            if (res && res.success) {
                toast.success("Review submitted successfully!");
                setComment("");
                setRating(5);
                setIsRedirecting(true); // 🟢 Switch to redirecting state

                setTimeout(() => {
                    router.push("/dashboard/patient/reviews");
                }, 3000);
            } else {
                toast.error(res?.data?.message || "Something went wrong.");
                setLoading(false); // 🔴 Only stop loading if there is an error
            }
        } catch (error) {
            toast.error("Failed to connect to the server.");
            setLoading(false); // 🔴 Only stop loading if there is an error
        }
    };

    // Form inputs are disabled during both standard loading or final redirecting
    const isFormDisabled = loading || isRedirecting || fetchingDoctor;

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
                                    disabled={isFormDisabled}
                                    onClick={() => setRating(star)}
                                    className={`text-3xl transition-colors duration-150 focus:outline-none ${star <= rating ? "text-amber-400" : "text-gray-300 dark:text-gray-600"
                                        } disabled:opacity-50`}
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
                            disabled={isFormDisabled}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            placeholder="Tell us about your experience..."
                            className="w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none text-sm
                                bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                                dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50
                                disabled:opacity-60"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isFormDisabled}
                        className="w-full py-3 px-4 font-semibold text-sm rounded-xl shadow-md transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none
                            bg-blue-600 text-white hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                    >
                        {isRedirecting
                            ? "Success! Redirecting..."
                            : loading
                                ? "Submitting..."
                                : "Submit Review"}
                    </button>
                </form>
            </div>
        </div>
    );
}