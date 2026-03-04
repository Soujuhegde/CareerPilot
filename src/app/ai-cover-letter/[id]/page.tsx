"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import CoverLetterPreview from "../components/coverletter-preview";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function CoverLetterContent() {
    const searchParams = useSearchParams();

    const jobTitle = searchParams.get("jobTitle") || "Cover Letter";
    const companyName = searchParams.get("companyName") || "";
    const content = searchParams.get("content") || "No content found. Please go back and generate again.";

    return (
        <div className="min-h-screen bg-bg-cream p-4 sm:p-8 font-sans">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">

                {/* Back Button */}
                <Link
                    href="/ai-cover-letter"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-neo-blue transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Generator
                </Link>

                {/* Header */}
                <div className="w-full text-center sm:text-left">
                    <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-black mb-2">
                        {jobTitle}
                    </h1>
                    {companyName && (
                        <p className="text-lg font-bold text-gray-600 uppercase tracking-widest">
                            @ {companyName}
                        </p>
                    )}
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-neo-green neo-border text-xs font-black uppercase tracking-widest">
                        ✓ AI Generated Cover Letter
                    </div>
                </div>

                {/* Cover Letter Preview & Editor */}
                <CoverLetterPreview content={content} />
            </div>
        </div>
    );
}

export default function CoverLetterPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-bg-cream flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl font-black uppercase tracking-tighter mb-4">Loading...</div>
                    <p className="font-bold text-gray-600">Preparing your cover letter</p>
                </div>
            </div>
        }>
            <CoverLetterContent />
        </Suspense>
    );
}
