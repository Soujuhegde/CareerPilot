import Link from "next/link";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center p-6">
            <div className="bg-white neo-border p-10 max-w-2xl w-full neo-shadow-lg text-center">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-text-black">Terms of Service</h1>
                <p className="text-text-black font-bold mb-8">Rules of the Road.</p>
                <div className="text-left space-y-4 mb-8">
                    <p>This is a placeholder for the terms of service.</p>
                    <p>In a real application, you would put your usage agreements, disclaimers, and user responsibilities here.</p>
                </div>
                <Link href="/" className="text-sm font-bold uppercase tracking-widest hover:text-neo-blue underline">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
