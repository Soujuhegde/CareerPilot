"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import { LayoutGrid, Sparkles, ChevronDown, User } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    // Simulate auth state: consider user logged out on public landing/auth pages
    const isLoggedIn = !["/", "/login", "/signup"].includes(pathname);

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

                            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-black text-xs md:text-sm font-bold uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200">
                                <Sparkles className="w-4 h-4 text-neo-pink" />
                                Growth Tools
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            <button className="w-10 h-10 rounded-full bg-neo-blue neo-border flex items-center justify-center text-white overflow-hidden neo-shadow-sm hover:scale-105 transition-transform">
                                <User className="w-5 h-5 text-white" />
                            </button>
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
