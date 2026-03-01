"use client";

import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function PasswordStrengthIndicator({ password }: { password: string }) {
    const hasMinLength = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    const checks = [
        { label: "At least 8 characters", passed: hasMinLength },
        { label: "One special character (!@#$%...)", passed: hasSpecialChar },
        { label: "One uppercase letter", passed: hasUppercase },
        { label: "One number", passed: hasNumber },
    ];

    if (!password) return null;

    return (
        <ul className="mt-2 space-y-1">
            {checks.map((c) => (
                <li key={c.label} className={`flex items-center gap-2 text-xs font-bold ${c.passed ? "text-green-700" : "text-red-600"}`}>
                    {c.passed ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                    {c.label}
                </li>
            ))}
        </ul>
    );
}

export default function SignUpPage() {
    const { isLoaded, signUp } = useSignUp();
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const passwordValid =
        password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        if (!passwordValid) {
            setError("Password must be at least 8 characters and contain a special character.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await signUp.create({
                firstName,
                lastName,
                emailAddress: email,
                password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            // Redirect to the new OTP verification page instead of showing it inline
            router.push("/verify-otp");
        } catch (err: unknown) {
            const clerkError = err as { errors?: Array<{ message: string }> };
            setError(clerkError.errors?.[0]?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center p-4 sm:p-6">
            <div className="bg-neo-yellow neo-border neo-shadow-lg p-6 sm:p-8 sm:px-12 max-w-[620px] w-full text-center rotate-1 relative my-4">
                <div className="absolute -top-4 -left-4 w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full neo-border" />

                <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-2 sm:mb-3 text-black leading-tight sm:leading-none">
                    Create your account
                </h1>
                <p className="text-black font-bold mb-6 text-sm sm:text-base">
                    Welcome! Please fill in the details to get started.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* Google OAuth */}
                    <button
                        type="button"
                        onClick={() =>
                            signUp?.authenticateWithRedirect({
                                strategy: "oauth_google",
                                redirectUrl: "/sso-callback",
                                redirectUrlComplete: "/onboarding",
                            })
                        }
                        className="w-full px-6 py-3.5 sm:py-4 bg-white text-black font-black uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200 flex items-center justify-center gap-4 text-sm sm:text-base"
                    >
                        <span className="font-extrabold text-lg flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-black">
                            G
                        </span>
                        <span className="whitespace-nowrap">Continue with Google</span>
                    </button>

                    <div className="flex items-center gap-4 py-0 sm:py-1">
                        <div className="h-[2px] bg-black flex-1" />
                        <span className="font-black text-xs uppercase tracking-widest px-2">OR</span>
                        <div className="h-[2px] bg-black flex-1" />
                    </div>

                    {/* Name fields */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-left">
                        <div className="w-full sm:w-1/2">
                            <label className="font-black text-xs sm:text-sm uppercase tracking-wider block mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                                className="w-full neo-border-thin px-4 py-3 font-bold bg-white text-sm"
                            />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <label className="font-black text-xs sm:text-sm uppercase tracking-wider block mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                className="w-full neo-border-thin px-4 py-3 font-bold bg-white text-sm"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="text-left">
                        <label className="font-black text-xs sm:text-sm uppercase tracking-wider block mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full neo-border-thin px-4 py-3 font-bold bg-white text-sm"
                        />
                    </div>

                    {/* Password */}
                    <div className="text-left">
                        <label className="font-black text-xs sm:text-sm uppercase tracking-wider block mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min 8 chars + special character"
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
                        <PasswordStrengthIndicator password={password} />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="flex items-start gap-2 bg-red-100 neo-border-thin p-3 text-left">
                            <AlertCircle size={16} className="text-red-700 mt-0.5 shrink-0" />
                            <p className="text-red-700 font-bold text-xs">{error}</p>
                        </div>
                    )}

                    {/* Clerk requires this element for invisible CAPTCHA bot protection */}
                    <div id="clerk-captcha"></div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-8 py-3.5 sm:py-4 bg-black text-white font-black uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200 mt-2 sm:mt-4 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                        Sign Up
                    </button>

                    <div className="pt-2 sm:pt-3">
                        <p className="font-bold text-sm">
                            Already have an account?{" "}
                            <Link
                                href="/sign-in"
                                className="underline hover:text-neo-blue uppercase tracking-wider ml-1 font-black"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
