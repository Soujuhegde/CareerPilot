import ATSChecker from "./components/ats-checker";
import { Zap } from "lucide-react";

export default function AtsScore() {
    return (
        <div className="min-h-screen bg-bg-cream flex flex-col items-center py-16 px-6">
            <div className="max-w-4xl w-full text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-neo-yellow neo-border text-xs font-black uppercase mb-6">
                    <Zap className="w-4 h-4" /> AI Powered Analysis
                </div>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">ATS Score Check</h1>
                <p className="text-xl font-bold text-gray-600">Optimize your resume for applicant tracking systems.</p>
            </div>

            <ATSChecker />
        </div>
    );
}
