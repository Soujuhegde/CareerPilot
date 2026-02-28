"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Login() {
    return (
        <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center p-6">
            <div className="bg-white neo-border p-10 max-w-md w-full neo-shadow-lg text-center">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-text-black">Welcome Back</h1>
                <p className="text-text-black font-bold mb-8">Ready to land your dream job?</p>
                <div className="space-y-4 mb-8">
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="w-full px-8 py-4 bg-white text-black font-black uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200 flex items-center justify-center gap-3"
                    >
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                        Continue with Google
                    </button>
                    <button className="w-full px-8 py-4 bg-black text-white font-black uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200 flex items-center justify-center gap-3">
                        <img src="https://github.com/favicon.ico" alt="GitHub" className="w-5 h-5 invert" />
                        Continue with GitHub
                    </button>

                    <div className="relative py-4 flex items-center">
                        <div className="flex-grow border-t-2 border-black"></div>
                        <span className="flex-shrink mx-4 font-black uppercase tracking-widest text-xs">OR EMAIL</span>
                        <div className="flex-grow border-t-2 border-black"></div>
                    </div>

                    <input type="email" placeholder="Email Address" className="w-full neo-border-thin p-4 font-bold bg-bg-cream" />
                    <input type="password" placeholder="Password" className="w-full neo-border-thin p-4 font-bold bg-bg-cream" />
                    <button className="w-full px-8 py-4 bg-neo-pink text-black font-black uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200">
                        Log In
                    </button>
                </div>
                <Link href="/" className="text-sm font-bold uppercase tracking-widest hover:text-neo-blue underline">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
