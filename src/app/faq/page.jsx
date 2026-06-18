"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaSearch, FaStethoscope, FaEnvelope, FaQuestionCircle } from "react-icons/fa";

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("general");
    const [openIndex, setOpenIndex] = useState(null);

    // FAQ Data Array categorized by categories
    const faqData = [
        {
            category: "general",
            question: "What exactly is MediCare Connect?",
            answer: "MediCare Connect is a modern centralized healthcare management platform designed to cleanly connect patients with verified doctors and clinics. It allows you to schedule visits, manage medical histories, and process digital payments all within a single application layer."
        },
        {
            category: "general",
            question: "Is there any registration or monthly maintenance fee?",
            answer: "No, creating an account and registering on MediCare Connect is entirely free for patients. You only pay for the direct appointments or consultations you book with healthcare specialists."
        },
        {
            category: "appointments",
            question: "How do I book or reschedule a medical appointment?",
            answer: "Once signed into your user dashboard, head over to the 'Find Doctors' page, choose your preferred specialist, select an available date/time slot, and confirm. To reschedule, navigate to your dashboard appointments module and click 'Reschedule' up to 24 hours prior to your slot."
        },
        {
            category: "appointments",
            question: "Can I choose between virtual tele-health and physical visits?",
            answer: "Yes. When finalizing an appointment booking form, you will be prompted to select your preference: either an in-person physical clinical checkup or a secure in-app live video tele-health consultation."
        },
        {
            category: "security",
            question: "Is my personal electronic health record kept private?",
            answer: "Absolutely. Security is our absolute priority. All patient healthcare datasets, messaging histories, and diagnostic documents are protected under end-to-end encryption protocols adhering strictly to global digital health privacy guidelines."
        },
        {
            category: "security",
            question: "What payment gateways do you support for consultations?",
            answer: "We support fully secure, encrypted checking transactions via modern payment handlers, accepting all primary international credit cards, debit cards, and streamlined mobile digital wallets."
        }
    ];

    // Handle single accordion expansion toggle
    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Filter FAQs based on current tab selection AND search keyword match
    const filteredFAQs = faqData.filter(faq => {
        const matchesTab = faq.category === activeTab;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <main className="min-h-screen bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 transition-colors duration-200 py-12">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6">

                {/* Header Block */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 mb-3">
                        <FaQuestionCircle /> Help Center
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Frequently Asked Questions
                    </h1>
                    <p className="mt-3 text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                        Got questions about appointments, accounts, or privacy protocols? We have compiled direct answers right here.
                    </p>
                </div>

                {/* Live Search Input Component */}
                <div className="relative max-w-lg mx-auto mb-10">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 pointer-events-none">
                        <FaSearch className="text-sm" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for keywords (e.g., encryption, virtual...)"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setOpenIndex(null); // Close open answers while typing to avoid layout flash
                        }}
                        className="w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 py-3.5 text-sm text-slate-900 outline-none shadow-sm transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    />
                </div>

                {/* Categorized Tab Toggles */}
                <div className="flex justify-center gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto whitespace-nowrap scrollbar-none">
                    {["general", "appointments", "security"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                setOpenIndex(null); // Reset open states on tab switches
                            }}
                            className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${activeTab === tab
                                    ? "bg-blue-600 text-white shadow-md dark:bg-blue-500"
                                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Accordion FAQ Items Grid */}
                <div className="space-y-4">
                    {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm dark:border-slate-800 dark:bg-slate-900 transition duration-200"
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full flex items-center justify-between gap-4 text-left px-6 py-4 font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition duration-150 group"
                                    >
                                        <span>{faq.question}</span>
                                        <FaChevronDown className={`text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-sm shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                                    </button>

                                    {/* Smooth Collapsible Content Container */}
                                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] border-t border-slate-100 dark:border-slate-800" : "max-h-0"}`}>
                                        <div className="px-6 py-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400 bg-slate-50/40 dark:bg-slate-950/20">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        // Zero State Fallback
                        <div className="text-center py-12 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-6">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                No matching questions found matching your filter criteria. Try alternate keywords.
                            </p>
                        </div>
                    )}
                </div>

                {/* Support Sticky Callout Banner */}
                <div className="mt-14 text-center rounded-2xl bg-white border border-slate-200 p-6 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">Still have questions?</h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        If your inquiry isn't cataloged here, reach out to our emergency customer desks directly.
                    </p>
                    <div className="mt-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-4 py-2.5 rounded-xl transition shadow-sm"
                        >
                            <FaEnvelope /> Open Support Ticket
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}