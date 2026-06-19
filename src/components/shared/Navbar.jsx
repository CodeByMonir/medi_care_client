"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

import {
    FaStethoscope,
    FaBars,
    FaTimes,
    FaSun,
    FaMoon,
    FaUserCircle,
    FaThLarge, // Changed from FaLayout
    FaSignOutAlt
} from "react-icons/fa";
import { signOut, useSession } from "@/src/lib/auth-client";

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Fetching session state using Better Auth Client hooks
    const { data: session, isPending } = useSession();
    const modalRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close profile modal if clicking outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setProfileModalOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Base navigation links
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Doctors", href: "/doctors" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    // Append Dashboard to links if the user is authenticated
    if (session) {
        navLinks.push({ name: "Dashboard", href: "/dashboard" });
    }

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    const handleLogout = async () => {
        await signOut();
        setProfileModalOpen(false);
    };

    return (
        <header className="z-999 sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md dark:bg-slate-900/90 dark:border-slate-800 transition-colors duration-200">
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

                        {/* Authentication Layout Conditional Render */}
                        {!isPending && (
                            session ? (
                                <div className="relative" ref={modalRef}>
                                    {/* Profile Avatar Trigger Button */}
                                    <button
                                        onClick={() => setProfileModalOpen(!profileModalOpen)}
                                        className="h-9 w-9 rounded-full overflow-hidden border-2 border-blue-600 dark:border-blue-400 focus:outline-none transition hover:opacity-90 flex items-center justify-center bg-slate-100 dark:bg-slate-800"
                                    >
                                        {session.user?.image ? (
                                            <img src={session.user.image} alt="User Avatar" className="h-full w-full object-cover" />
                                        ) : (
                                            <FaUserCircle className="text-2xl text-slate-500" />
                                        )}
                                    </button>

                                    {/* Profile Dropdown Modal */}
                                    {profileModalOpen && (
                                        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 transition-all duration-150">
                                            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{session.user?.name}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{session.user?.email}</p>
                                            </div>
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setProfileModalOpen(false)}
                                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                            >
                                                <FaThLarge className="text-xs text-slate-400" /> {/* Updated here */}
                                                <span>Dashboard</span>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-left transition"
                                            >
                                                <FaSignOutAlt className="text-xs" />
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link href="/login" className="rounded-lg border px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                        Login
                                    </Link>
                                    <Link href="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition">
                                        Register
                                    </Link>
                                </>
                            )
                        )}
                    </div>

                    {/* Mobile Menu Controls */}
                    <div className="flex items-center gap-2 Snowy-Action md:hidden">
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

                            {!isPending && (
                                session ? (
                                    <div className="mt-2 border-t border-slate-100 dark:border-slate-800 pt-3 px-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2 overflow-hidden max-w-[70%]">
                                            <div className="h-9 w-9 shrink-0 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                {session.user?.image ? (
                                                    <img src={session.user.image} alt="User Avatar" className="h-full w-full object-cover" />
                                                ) : (
                                                    <FaUserCircle className="text-xl text-slate-500" />
                                                )}
                                            </div>
                                            <div className="truncate">
                                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{session.user?.name}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{session.user?.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => { setMenuOpen(false); handleLogout(); }}
                                            className="text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 px-3 py-1.5 rounded-lg"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-3 flex flex-col gap-2">
                                        <Link href="/login" onClick={() => setMenuOpen(false)} className="rounded-lg border dark:border-slate-700 px-4 py-3 text-center font-medium text-slate-700 dark:text-slate-300">
                                            Login
                                        </Link>
                                        <Link href="/register" onClick={() => setMenuOpen(false)} className="rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-3 text-center font-medium text-white">
                                            Register
                                        </Link>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}