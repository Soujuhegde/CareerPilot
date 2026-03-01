"use client";

import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        setLoading(true);
        setError("");

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/industry-insights");
            } else {
                setError("Sign in could not be completed. Please try again.");
            }
        } catch (err: unknown) {
            const clerkError = err as { errors?: Array<{ message: string }> };
            setError(clerkError.errors?.[0]?.message || "Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center p-6">
            <div className="bg-white neo-border p-8 sm:p-10 max-w-md w-full neo-shadow-lg text-center">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 text-text-black">
                    Welcome Back
                </h1>
                <p className="text-text-black font-bold mb-6">Ready to land your dream job?</p>

                {/* Google OAuth */}
                <button
                    type="button"
                    onClick={() =>
                        signIn?.authenticateWithRedirect({
                            strategy: "oauth_google",
                            redirectUrl: "/sso-callback",
                            redirectUrlComplete: "/industry-insights",
                        })
                    }
                    className="w-full px-6 py-3.5 bg-white text-black font-black uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200 flex items-center justify-center gap-4 text-sm mb-4"
                >
                    <span className="font-extrabold text-lg flex items-center justify-center w-6 h-6 rounded-full border-2 border-black">
                        G
                    </span>
                    <span>Continue with Google</span>
                </button>

                <div className="flex items-center gap-4 my-4">
                    <div className="h-[2px] bg-black flex-1" />
                    <span className="font-black text-xs uppercase tracking-widest px-2">OR</span>
                    <div className="h-[2px] bg-black flex-1" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                        <label className="font-black text-xs uppercase tracking-wider block mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full neo-border-thin p-3.5 font-bold bg-bg-cream text-sm"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="font-black text-xs uppercase tracking-wider">Password</label>
                            <Link
                                href="/sign-in/forgot-password"
                                className="text-xs font-bold uppercase tracking-wider hover:underline"
                            >
                                Forgot?
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full neo-border-thin p-3.5 font-bold bg-bg-cream pr-12 text-sm"
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

                    {error && (
                        <div className="flex items-start gap-2 bg-red-100 neo-border-thin p-3">
                            <AlertCircle size={16} className="text-red-700 mt-0.5 shrink-0" />
                            <p className="text-red-700 font-bold text-xs">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-8 py-4 bg-neo-pink text-black font-black uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200 text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                        Log In
                    </button>
                </form>

                <div className="mt-6 space-y-2">
                    <p className="font-bold text-sm">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="underline hover:text-neo-blue uppercase tracking-wider font-black"
                        >
                            Sign Up
                        </Link>
                    </p>
                    <Link href="/" className="text-sm font-bold uppercase tracking-widest hover:text-neo-blue underline block mt-2">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
