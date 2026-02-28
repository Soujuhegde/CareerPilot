import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function AtsScore() {
    return (
        <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center p-6">
            <div className="bg-neo-blue neo-border p-10 max-w-2xl w-full neo-shadow-lg text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full opacity-10" />
                <CheckCircle className="w-16 h-16 mx-auto mb-6 text-white" />
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">ATS Score Check</h1>
                <p className="text-white font-bold mb-8 text-lg">Coming Soon</p>
                <div className="text-left space-y-4 mb-10 bg-white p-6 neo-border text-black">
                    <p className="font-medium text-black">This is a placeholder for the ATS resume parsing and scoring tool.</p>
                </div>
                <Link href="/" className="inline-block px-8 py-4 bg-black text-white font-black uppercase tracking-widest neo-border hover:bg-white hover:text-black transition-colors duration-200">
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
