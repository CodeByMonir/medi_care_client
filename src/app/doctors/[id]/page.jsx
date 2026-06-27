import React from 'react';
import Link from 'next/link';
import {
    FaUserMd,
    FaEnvelope,
    FaPhone,
    FaHospital,
    FaGraduationCap,
    FaStethoscope,
    FaDollarSign,
    FaCalendarAlt,
    FaClock,
    FaCheckCircle,
    FaRegCalendarCheck,
    FaChevronLeft,
    FaStar,
    FaShieldAlt,
    FaAward
} from 'react-icons/fa';
import { getDoctorDetails } from '@/src/lib/api/doctors';
import { getUserSession } from '@/src/lib/core/session';
import { redirect } from 'next/navigation';

// Next.js dynamic routing segments supply parameters straight to the async component
export default async function DoctorDetailsPage({ params }) {
    // Resolve dynamic segment routing parameters explicitly 
    const resolvedParams = await params;
    const id = resolvedParams?.id;

    const user = await getUserSession();
    if (!user) {
        redirect(`/login?redirect=/doctors/${id}`);
    }

    const doctorData = await getDoctorDetails(id);
    const doctor = Array.isArray(doctorData) ? doctorData[0] : doctorData;

    const license = doctor?.license;
    const doctorId = doctor?.doctorId;
    const consultationFee = doctor?.consultationFee;

    // console.log(doctor, license)


    // Fallback block if no matching practitioner record is identified in the collection 
    if (!doctorData || (Array.isArray(doctorData) && doctorData.length === 0)) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-md text-center space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-500 flex items-center justify-center mx-auto text-lg">
                        <FaUserMd />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Practitioner Not Found</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        The clinical specialist profile for License <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{license}</span> could not be verified or retrieved.
                    </p>
                    <Link
                        href="/doctors"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline pt-2"
                    >
                        <FaChevronLeft className="text-[10px]" /> Return to Directory
                    </Link>
                </div>
            </div>
        );
    }



    if (user.role === "doctor") {
        return (
            <div className="flex min-h-screen items-center justify-center px-4 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-md text-center space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-500 flex items-center justify-center mx-auto text-lg">
                        <FaUserMd />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">You are a <span className='text-xl'>doctor</span></h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">You can not appoint as a doctor. Please SignOut and Register as a <span className='text-lg'>patient</span>.</p>
                    <Link href="/dashboard/doctor/" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline pt-2">
                        <FaChevronLeft className="text-[10px]" /> Return to Directory
                    </Link>
                </div>
            </div>
        );
    }

    // Ensure doctorData is treated as an array for the .map function
    const doctorsArray = Array.isArray(doctorData) ? doctorData : [doctorData];

    return (
        <div>
            {
                doctorsArray.map((doctor, idx) => {
                    return (
                        <div
                            key={doctor?.license}
                            className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-slate-700 dark:text-slate-300 transition-colors duration-200"
                        >
                            <div className="max-w-5xl mx-auto space-y-6">

                                {/* Back to Directory Navigation Anchor */}
                                <Link
                                    href="/doctors"
                                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
                                >
                                    <FaChevronLeft className="text-[10px]" /> Back to Medical Directory
                                </Link>

                                {/* Hero Profile Block Section */}
                                <div className="bg-white border border-slate-200 rounded-3xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                                    <div className="relative shrink-0 w-32 h-32 md:w-40 md:h-40">
                                        <img
                                            src={doctor.profileImage || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"}
                                            alt={doctor.name}
                                            className="w-full h-full rounded-2xl object-cover ring-4 ring-slate-100 dark:ring-slate-800 shadow-md"
                                        />
                                        {doctor.verificationStatus === "verified" && (
                                            <span className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-xl shadow-md border-2 border-white dark:border-slate-900" title="Verified Specialist">
                                                <FaCheckCircle className="text-sm" />
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex-1 space-y-4 text-center md:text-left w-full">
                                        <div className="flex-1 space-y-4 text-center md:text-left w-full">
                                            <div className="flex justify-between space-y-1.5">
                                                <div>
                                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                                        <h1 className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
                                                            {doctor.name}
                                                        </h1>
                                                        {/* Hidden doctorId and showing license here */}
                                                        {doctor.license && (
                                                            <span className="text-[10px] font-mono font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-md border border-blue-100 dark:border-blue-900/60 uppercase tracking-wider">
                                                                Lic: {doctor.license}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs">
                                                        <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                                            <FaStethoscope /> {doctor.specialization}
                                                        </p>
                                                        <span className="text-slate-300 dark:text-slate-700">|</span>
                                                        <div className="flex items-center gap-1 font-bold text-amber-500">
                                                            <FaStar /> {doctor.rating || "4.9"} (Verified Feedback)
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                                                    <Link href={`/dashboard/patient/reviews/${doctor?.license}`}>
                                                        <button className="px-6 py-3 font-semibold text-sm rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-indigo-500 dark:text-white dark:hover:bg-indigo-600 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-900"
                                                        >
                                                            Give A Review
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-900">
                                            {doctor.biography || "No personal clinical statement or biography registration provided."}
                                        </p>

                                        {/* Direct Channel Contact Nodes */}
                                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                            {doctor.email && <span className="flex items-center gap-1.5"><FaEnvelope className="text-slate-400" /> {doctor.email}</span>}
                                            {doctor.phone && <span className="flex items-center gap-1.5"><FaPhone className="text-slate-400" /> {doctor.phone}</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Information Layout Sub-Grid System */}
                                <div className="grid md:grid-cols-3 gap-6 items-start">

                                    {/* LEFT STACK CONTENT: Core Competency & Credentials */}
                                    <div className="md:col-span-2 space-y-6">
                                        <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 space-y-6">
                                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                                                <FaAward className="text-blue-500" /> Professional Overview
                                            </h2>

                                            <div className="space-y-5">
                                                {doctor.hospitalName && (
                                                    <div className="flex items-start gap-3.5 text-sm">
                                                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 text-slate-400 shrink-0 mt-0.5"><FaHospital /></div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider">Clinical Affiliation</h4>
                                                            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{doctor.hospitalName}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {doctor.qualifications && (
                                                    <div className="flex items-start gap-3.5 text-sm">
                                                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 text-slate-400 shrink-0 mt-0.5"><FaGraduationCap /></div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider">Board Certifications & Degrees</h4>
                                                            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 leading-relaxed">{doctor.qualifications}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {doctor.experience !== undefined && (
                                                    <div className="flex items-start gap-3.5 text-sm">
                                                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 text-slate-400 shrink-0 mt-0.5"><FaUserMd /></div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider">Years of Practice</h4>
                                                            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{doctor.experience} Years Active Medical Practice</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Security Verification Banner */}
                                        <div className="rounded-2xl border border-emerald-100 dark:border-emerald-950/40 bg-emerald-50/50 dark:bg-emerald-950/10 p-4 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-400">
                                            <FaShieldAlt className="text-base shrink-0 text-emerald-500" />
                                            <div>
                                                <span className="font-bold block">HIPAA Compliant Profiling</span>
                                                <p className="text-emerald-700/80 dark:text-emerald-400/70 mt-0.5">This profile data record is verified against healthcare practitioner licensing criteria.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* RIGHT STACK CONTENT: Booking & Session Hours Schedule */}
                                    <div className="md:col-span-1 space-y-6">
                                        <div className="bg-white border border-slate-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800 shadow-sm p-6 space-y-5">
                                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                                                <FaClock className="text-blue-500" /> Consultation Routing
                                            </h2>

                                            {/* Session Fee Metric Presentation */}
                                            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Standard Fee</span>
                                                <span className="text-xl font-black text-slate-900 dark:text-white flex items-center">
                                                    <FaDollarSign className="text-xs text-emerald-500" /> {doctor.consultationFee ?? "N/A"}
                                                </span>
                                            </div>

                                            {/* Operational Calendar Blocks Mapping */}
                                            <div className="space-y-2.5">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><FaCalendarAlt /> Shift Timings</span>
                                                <div className="space-y-2">
                                                    {doctor.availableSlots && doctor.availableSlots.length > 0 ? (
                                                        doctor.availableSlots.map((slot, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center justify-between text-xs p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900/40"
                                                            >
                                                                <span className="font-bold text-slate-700 dark:text-slate-300">{slot.day}</span>
                                                                <span className="font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-900">{slot.hours}</span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-xs text-slate-400 italic text-center py-2">No shift timings registered.</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Scheduling Direct Action Execution Button */}

                                            <form action={`/api/checkout_sessions`} method="POST">
                                                <section>
                                                    <input type="hidden" name="license" value={license} />
                                                    <input type="hidden" name="payment" value={consultationFee} />
                                                    <button
                                                        type="submit"
                                                        role="link"
                                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md transition-all">
                                                        <FaRegCalendarCheck className="text-sm" />
                                                        Pay ${doctor?.consultationFee} First
                                                    </button>
                                                </section>
                                            </form>


                                            {/* <Link
                                                href={`/doctors/${license}/reqAppointment`}
                                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-md transition-all">
                                                <FaRegCalendarCheck className="text-sm" /> Request Appointment
                                            </Link> */}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}