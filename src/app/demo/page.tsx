"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function Demo() {
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!company.trim()) {
            setError("Please enter your company name.");
            return;
        }
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid work email.");
            return;
        }
        setError("");
        setSubmitted(true);
    }

    return (
        <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center p-6">
            <div className="bg-neo-blue neo-border neo-shadow-lg p-10 max-w-lg w-full text-center">
                {submitted ? (
                    <div className="flex flex-col items-center gap-6">
                        <CheckCircle className="w-16 h-16 text-neo-green" />
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-white">You&apos;re Booked!</h1>
                        <p className="text-white font-bold text-lg">
                            Thanks, <span className="text-neo-yellow">{company}</span>! We&apos;ll send a calendar invite to{" "}
                            <span className="text-neo-yellow">{email}</span> shortly.
                        </p>
                        <Link
                            href="/"
                            className="mt-4 px-8 py-4 bg-neo-green text-black font-black uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200 inline-block"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                ) : (
                    <>
                        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 text-white">Book Demo</h1>
                        <p className="text-white font-bold mb-8 text-lg">
                            See CareerPilot in action with our recruiting experts.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                            <input
                                type="text"
                                placeholder="Company Name"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="w-full neo-border-thin p-4 font-bold bg-white outline-none focus:ring-2 focus:ring-neo-yellow"
                            />
                            <input
                                type="email"
                                placeholder="Work Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full neo-border-thin p-4 font-bold bg-white outline-none focus:ring-2 focus:ring-neo-yellow"
                            />
                            {error && (
                                <p className="text-neo-yellow font-bold text-sm text-left">{error}</p>
                            )}
                            <button
                                type="submit"
                                className="w-full px-8 py-4 bg-neo-green text-black font-black uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200"
                            >
                                Schedule Tour
                            </button>
                        </form>
                        <Link href="/" className="text-sm font-bold uppercase tracking-widest text-white hover:text-neo-yellow underline">
                            ← Back to Home
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
