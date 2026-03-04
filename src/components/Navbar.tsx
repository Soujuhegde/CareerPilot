"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import { useUser, UserButton } from "@clerk/nextjs";
import { LayoutGrid, Sparkles, ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const { user, isLoaded } = useUser();
    const isLoggedIn = isLoaded && !!user;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);

    const growthTools = [
        { name: "Career Roadmap", href: "/industry-insights" },
        { name: "AI Cover Letter", href: "/ai-cover-letter" },
        { name: "Mock Interviews", href: "/interviews" },
        { name: "ATS Resume Scorer", href: "/ats-score" },
    ];

    const publicNavLinks = [
        { name: "Features", href: "/#features" },
        { name: "How it Works", href: "/#how-it-works" },
        { name: "Dashboard", href: "/#dashboard" },
        { name: "Testimonials", href: "/#testimonials" },
    ];

    const loggedInNavLinks = [
        { name: "Industry Insights", href: "/industry-insights" },
        { name: "AI Cover Letter", href: "/ai-cover-letter" },
        { name: "Mock Interviews", href: "/interviews" },
        { name: "ATS Score", href: "/ats-score" },
        { name: "Jobs", href: "/jobs" },
        { name: "Resume", href: "/resume" },
    ];

    return (
        <>
            <nav className="fixed top-0 w-full z-50 neo-border-thin border-t-0 border-l-0 border-r-0 bg-bg-cream transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter text-text-black uppercase shrink-0">
                        Career<span className="text-neo-blue">Pilot</span>
                    </Link>

                    {/* Desktop Nav Links (public) */}
                    {!isLoggedIn && (
                        <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-bold uppercase tracking-widest text-text-black">
                            {publicNavLinks.map(link => (
                                <Link key={link.href} href={link.href} className="hover:text-neo-blue transition-colors whitespace-nowrap">
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-3 lg:gap-4">
                        {isLoggedIn ? (
                            <>
                                <Link href="/industry-insights" className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200">
                                    <LayoutGrid className="w-4 h-4" />
                                    <span className="hidden lg:inline">Industry Insights</span>
                                    <span className="lg:hidden">Insights</span>
                                </Link>

                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200"
                                    >
                                        <Sparkles className="w-4 h-4 text-neo-pink" />
                                        Growth Tools
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-52 bg-white neo-border neo-shadow p-2 space-y-1 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                                            {growthTools.map((tool) => (
                                                <Link
                                                    key={tool.href}
                                                    href={tool.href}
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase tracking-wider hover:bg-neo-blue hover:text-white transition-colors rounded"
                                                >
                                                    <Sparkles className="w-4 h-4 shrink-0" />
                                                    {tool.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="w-9 h-9 flex items-center justify-center">
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-bold uppercase tracking-widest text-text-black hover:text-neo-blue transition-colors">
                                    Log In
                                </Link>
                                <Button variant="primary" size="sm" href="/signup">
                                    Get Started
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Right Side */}
                    <div className="flex md:hidden items-center gap-3">
                        {isLoggedIn && (
                            <div className="w-8 h-8 flex items-center justify-center">
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        )}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 neo-border bg-white hover:bg-neo-yellow transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Drawer */}
            <div className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] z-50 bg-bg-cream neo-border border-r-0 border-t-0 border-b-0 flex flex-col md:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-5 h-16 border-b-2 border-black">
                    <span className="text-lg font-black tracking-tighter uppercase">
                        Career<span className="text-neo-blue">Pilot</span>
                    </span>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-1.5 neo-border bg-white hover:bg-neo-pink transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Drawer Links */}
                <nav className="flex-1 overflow-y-auto p-5 space-y-1">
                    {isLoggedIn ? (
                        <>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2 pt-2 pb-1">Navigation</p>
                            {loggedInNavLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-3 font-bold text-sm uppercase tracking-wider border-2 border-transparent hover:border-black hover:bg-white transition-all duration-150 ${pathname === link.href ? "bg-neo-yellow border-black" : ""}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </>
                    ) : (
                        <>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2 pt-2 pb-1">Menu</p>
                            {publicNavLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center px-4 py-3 font-bold text-sm uppercase tracking-wider border-2 border-transparent hover:border-black hover:bg-white transition-all duration-150"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </>
                    )}
                </nav>

                {/* Drawer Footer */}
                {!isLoggedIn && (
                    <div className="p-5 border-t-2 border-black space-y-3">
                        <Link
                            href="/login"
                            className="block w-full text-center py-3 font-black uppercase tracking-widest text-sm neo-border bg-white hover:bg-neo-yellow transition-colors"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/signup"
                            className="block w-full text-center py-3 font-black uppercase tracking-widest text-sm neo-border bg-black text-white hover:bg-neo-blue transition-colors"
                        >
                            Get Started Free
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
