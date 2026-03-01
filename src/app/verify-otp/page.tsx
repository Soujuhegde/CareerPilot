"use client";

import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VerifyOtpPage() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        setLoading(true);
        setError("");

        try {
            const result = await signUp.attemptEmailAddressVerification({ code });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/onboarding");
            } else {
                setError("Verification failed. Please try again.");
            }
        } catch (err: unknown) {
            const clerkError = err as { errors?: Array<{ message: string }> };
            setError(clerkError.errors?.[0]?.message || "Verification failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // If there's no active sign up attempt, redirect back to sign up
    if (isLoaded && !signUp?.emailAddress) {
        router.push("/sign-up");
        return null;
    }

    return (
        <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center p-4 sm:p-6">
            <div className="bg-neo-yellow neo-border neo-shadow-lg p-6 sm:p-8 sm:px-12 max-w-[620px] w-full text-center rotate-1 relative my-4">
                <div className="absolute -top-4 -left-4 w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full neo-border" />

                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-2 sm:mb-3 text-black">
                    Verify Your Email
                </h1>
                <p className="text-black font-bold mb-6 text-sm sm:text-base">
                    We sent a 6-digit code to <span className="underline">{signUp?.emailAddress}</span>. Enter it below.
                </p>

                <form onSubmit={handleVerification} className="space-y-4 sm:space-y-5">
                    <div className="text-left">
                        <label className="font-black text-xs sm:text-sm uppercase tracking-wider block mb-1">
                            Verification Code
                        </label>
                        <input
                            type="text"
                            required
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                            placeholder="Enter 6-digit code"
                            className="w-full neo-border-thin px-4 py-3 font-bold bg-white text-sm tracking-[0.5em] text-center"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="flex items-start gap-2 bg-red-100 neo-border-thin p-3 text-left">
                            <AlertCircle size={16} className="text-red-700 mt-0.5 shrink-0" />
                            <p className="text-red-700 font-bold text-xs">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-8 py-3.5 sm:py-4 bg-black text-white font-black uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                        Verify Email
                    </button>
                </form>
            </div>
        </div>
    );
}
