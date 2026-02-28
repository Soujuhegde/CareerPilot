import ResumeBuilder from "./components/resume-builder";

// Mocking getResume since the action doesn't exist yet
async function getResume() {
    return { content: "" };
}

export default async function ResumePage() {
    const resume = await getResume();

    return (
        <div className="min-h-screen bg-bg-cream p-4 sm:p-8 font-sans">
            <div className="max-w-5xl mx-auto flex flex-col items-center">
                <div className="w-full mb-8 text-center sm:text-left">
                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-black mb-2">
                        Resume Builder
                    </h1>
                    <p className="text-lg font-bold text-gray-800">
                        Craft your ATS-friendly resume in seconds.
                    </p>
                </div>
                <ResumeBuilder initialContent={resume?.content ?? ""} />
            </div>
        </div>
    );
}