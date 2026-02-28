import CoverLetterGenerator from "./components/cover-letter-generator";
import CoverLetterList, { CoverLetter } from "./components/cover-letter-list";

// Mock function - replace with real DB call when available
async function getCoverLetters(): Promise<CoverLetter[]> {
    return [];
}

export default async function AICoverLetterPage() {
    const coverLetters = await getCoverLetters();

    return (
        <div className="min-h-screen bg-bg-cream p-4 sm:p-8 font-sans">
            <div className="max-w-5xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <div className="w-full text-center sm:text-left">
                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-black mb-2">
                        AI Cover Letter
                    </h1>
                    <p className="text-lg font-bold text-gray-800">
                        Generate a tailored cover letter in seconds.
                    </p>
                </div>

                {/* Generator Form */}
                <CoverLetterGenerator />

                {/* Past Cover Letters */}
                {coverLetters.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4">
                            Past Cover Letters
                        </h2>
                        <CoverLetterList coverLetters={coverLetters} />
                    </div>
                )}
            </div>
        </div>
    );
}
