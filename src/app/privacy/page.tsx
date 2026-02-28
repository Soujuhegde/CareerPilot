import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center p-6">
            <div className="bg-white neo-border p-10 max-w-2xl w-full neo-shadow-lg text-center">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-text-black">Privacy Policy</h1>
                <p className="text-text-black font-bold mb-8">We take your data seriously.</p>
                <div className="text-left space-y-4 mb-8">
                    <p>This is a placeholder for the privacy policy.</p>
                    <p>In a real application, you would put all your GDPR and CCPA compliant text here about data tracking, resume parsing privacy, and third-party sharing policies.</p>
                </div>
                <Link href="/" className="text-sm font-bold uppercase tracking-widest hover:text-neo-blue underline">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
