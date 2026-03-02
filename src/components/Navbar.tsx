"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import { useUser, UserButton } from "@clerk/nextjs";
import { LayoutGrid, Sparkles, ChevronDown, User } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const { user, isLoaded } = useUser();
    const isLoggedIn = isLoaded && !!user;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const growthTools = [
        { name: "Career Roadmap", href: "/industry-insights", icon: Sparkles },
        { name: "AI Cover Letter", href: "/ai-cover-letter", icon: Sparkles },
        { name: "Mock Interviews", href: "/interviews", icon: Sparkles },
        { name: "ATS Resume Scorer", href: "/ats-score", icon: Sparkles },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 neo-border-thin border-t-0 border-l-0 border-r-0 bg-bg-cream transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter text-text-black uppercase">
                    Career<span className="text-neo-blue">Pilot</span>
                </Link>

                {!isLoggedIn && (
                    <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-text-black">
                        <Link href="/#features" className="hover:text-neo-blue transition-colors">Features</Link>
                        <Link href="/#how-it-works" className="hover:text-neo-blue transition-colors">How it Works</Link>
                        <Link href="/#dashboard" className="hover:text-neo-blue transition-colors">Dashboard</Link>
                        <Link href="/#testimonials" className="hover:text-neo-blue transition-colors">Testimonials</Link>
                    </div>
                )}

                <div className="flex items-center gap-4 md:gap-6">
                    {/* Simulated Authenticated State UI */}
                    {isLoggedIn ? (
                        <>
                            <Link href="/industry-insights" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-black text-white text-xs md:text-sm font-bold uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200">
                                <LayoutGrid className="w-4 h-4" />
                                Industry Insights
                            </Link>

                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-black text-xs md:text-sm font-bold uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200"
                                >
                                    <Sparkles className="w-4 h-4 text-neo-pink" />
                                    Growth Tools
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-56 bg-white neo-border neo-shadow p-2 space-y-1 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                                        {growthTools.map((tool) => (
                                            <Link
                                                key={tool.href}
                                                href={tool.href}
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase tracking-wider hover:bg-neo-blue hover:text-white transition-colors rounded"
                                            >
                                                <tool.icon className="w-4 h-4" />
                                                {tool.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="w-10 h-10 flex items-center justify-center">
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
            </div>
        </nav>
    );
}
