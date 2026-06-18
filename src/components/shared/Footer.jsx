// app/components/Footer.jsx
import Link from "next/link";
import { FaStethoscope, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-slate-50 text-slate-600 border-t border-slate-200 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-900 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
                            <FaStethoscope className="text-blue-600 dark:text-blue-400" />
                            <span>
                                MediCare<span className="text-blue-600 dark:text-blue-400">Connect</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            Modern healthcare management platform connecting patients with doctors
                            and hospitals through a centralized online system.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
                            <li><Link href="/doctors" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Find Doctors</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
                            <li><Link href="/faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Appointments</Link></li>
                            <li><Link href="/records" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Medical Records</Link></li>
                            <li><Link href="/payments" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Payments</Link></li>
                            <li><Link href="/consultations" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Consultations</Link></li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2.5">
                                <FaMapMarkerAlt className="mt-1 text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>123 Healthcare Ave, NY</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <FaPhoneAlt className="text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <FaEnvelope className="text-blue-600 dark:text-blue-400 shrink-0" />
                                <span className="break-all">info@medicareconnect.com</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <FaClock className="text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>24/7 Support Available</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-200 dark:border-slate-900 mt-8 pt-8 text-sm text-center">
                    <p>&copy; 2026 MediCare Connect. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}