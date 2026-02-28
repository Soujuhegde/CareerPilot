import { notFound } from "next/navigation";
import CoverLetterPreview from "../components/coverletter-preview";

// Mock function - replace with real DB call when available
async function getCoverLetter(id: string) {
    // Stub: return a placeholder for now
    return {
        id,
        jobTitle: "Software Engineer",
        companyName: "Acme Corp",
        content: `Dear Hiring Manager,\n\nI am excited to apply for the Software Engineer position at Acme Corp...\n\nSincerely,\nYour Name`,
    };
}

interface CoverLetterPageProps {
    params: { id: string };
}

export default async function CoverLetterPage({ params }: CoverLetterPageProps) {
    const { id } = await params;
    const coverLetter = await getCoverLetter(id);

    if (!coverLetter) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-bg-cream p-4 sm:p-8 font-sans">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <div className="w-full text-center sm:text-left">
                    <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-black mb-2">
                        {coverLetter.jobTitle}
                    </h1>
                    <p className="text-lg font-bold text-gray-800">
                        {coverLetter.companyName}
                    </p>
                </div>

                {/* Cover Letter Preview & Editor */}
                <CoverLetterPreview content={coverLetter.content} />
            </div>
        </div>
    );
}
