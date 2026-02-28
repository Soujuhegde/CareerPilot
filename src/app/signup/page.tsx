"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle actual authentication
        // For now, it will redirect back to home once "Continue" is pressed
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center p-4 sm:p-6">
            <div className="bg-neo-yellow neo-border neo-shadow-lg p-6 sm:p-8 sm:px-12 max-w-[620px] w-full text-center rotate-1 relative my-4">
                <div className="absolute -top-4 -left-4 w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full neo-border" />
                <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-2 sm:mb-3 text-black leading-tight sm:leading-none">
                    Create your account
                </h1>
                <p className="text-black font-bold mb-6 sm:mb-6 text-sm sm:text-base">
                    Welcome! Please fill in the details to get started.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <button type="button" className="w-full px-6 py-3.5 sm:py-4 bg-white text-black font-black uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200 flex items-center justify-center gap-4 text-sm sm:text-base">
                        <span className="font-extrabold text-lg flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-black">G</span>
                        <span className="whitespace-nowrap">Continue with Google</span>
                    </button>

                    <div className="flex items-center gap-4 py-0 sm:py-1">
                        <div className="h-[2px] bg-black flex-1"></div>
                        <span className="font-black text-xs uppercase tracking-widest px-2">OR</span>
                        <div className="h-[2px] bg-black flex-1"></div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-left">
                        <div className="w-full sm:w-1/2">
                            <div className="flex justify-between items-end mb-1">
                                <label className="font-black text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">First Name</label>
                            </div>
                            <input type="text" placeholder="First Name" className="w-full neo-border-thin px-4 py-3 font-bold bg-white text-sm" />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <div className="flex justify-between items-end mb-1">
                                <label className="font-black text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">Last Name</label>
                            </div>
                            <input type="text" placeholder="Last Name" className="w-full neo-border-thin px-4 py-3 font-bold bg-white text-sm" />
                        </div>
                    </div>

                    <div className="text-left">
                        <label className="font-black text-xs sm:text-sm uppercase tracking-wider block mb-1 whitespace-nowrap">Email Address</label>
                        <input type="email" required placeholder="Enter your email address" className="w-full neo-border-thin px-4 py-3 font-bold bg-white text-sm" />
                    </div>

                    <div className="text-left relative">
                        <label className="font-black text-xs sm:text-sm uppercase tracking-wider block mb-1 whitespace-nowrap">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="Enter your password"
                                className="w-full neo-border-thin px-4 py-3 font-bold bg-white pr-12 text-sm"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 transition-colors neo-border-thin bg-white"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="w-full px-8 py-3.5 sm:py-4 bg-black text-white font-black uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200 mt-2 sm:mt-4 text-sm sm:text-base">
                        Sign Up
                    </button>

                    <div className="pt-2 sm:pt-3">
                        <p className="font-bold text-sm">
                            Already have an account? <Link href="/login" className="underline hover:text-neo-blue uppercase tracking-wider ml-1 font-black">Sign in</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
