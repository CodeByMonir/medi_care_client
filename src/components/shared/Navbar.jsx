"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes"; // next-themes ইম্পোর্ট করলাম

import {
    FaStethoscope,
    FaBars,
    FaTimes,
    FaSun,
    FaMoon
} from "react-icons/fa";

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme(); // থিম স্টেট ও ফাংশন
    const [mounted, setMounted] = useState(false);

    // Hydration mismatch (সার্ভার ও ক্লায়েন্ট থিম অমিল) রোধ করতে এই ইফেক্টটি জরুরি
    useEffect(() => {
        setMounted(true);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Doctors", href: "/doctors" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md dark:bg-slate-900/90 dark:border-slate-800 transition-colors duration-200">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                        <FaStethoscope className="text-blue-600 dark:text-blue-400 text-2xl" />
                        <span className="text-slate-800 dark:text-slate-100">
                            MediCare <span className="text-blue-600 dark:text-blue-400">Connect</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${isActive(link.href)
                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Theme Toggle Button */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-lg border text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-slate-700 transition"
                                aria-label="Toggle Theme"
                            >
                                {theme === "dark" ? <FaSun className="text-amber-500" /> : <FaMoon />}
                            </button>
                        )}

                        <Link href="/login" className="rounded-lg border px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                            Login
                        </Link>
                        <Link href="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition">
                            Register
                        </Link>
                    </div>

                    {/* Mobile Menu Controls */}
                    <div className="flex items-center gap-2 md:hidden">
                        {/* Mobile Theme Toggle */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-lg text-xl text-slate-700 dark:text-slate-300"
                                aria-label="Toggle Theme"
                            >
                                {theme === "dark" ? <FaSun className="text-amber-500" /> : <FaMoon />}
                            </button>
                        )}

                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-slate-700 dark:text-slate-300">
                            {menuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="border-t dark:border-slate-800 py-4 md:hidden">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`rounded-lg px-4 py-3 text-sm font-medium ${isActive(link.href)
                                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="mt-3 flex flex-col gap-2">
                                <Link href="/login" onClick={() => setMenuOpen(false)} className="rounded-lg border dark:border-slate-700 px-4 py-3 text-center font-medium text-slate-700 dark:text-slate-300">
                                    Login
                                </Link>
                                <Link href="/register" onClick={() => setMenuOpen(false)} className="rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-3 text-center font-medium text-white">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}