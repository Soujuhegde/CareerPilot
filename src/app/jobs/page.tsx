import JobBoard from "./components/job-board";
import { BarChart, Target } from "lucide-react";

export default function Jobs() {
    return (
        <div className="min-h-screen bg-bg-cream pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                {/* Hero Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 
                    bg-neo-blue text-white neo-border-thin text-xs font-black uppercase tracking-widest mb-4">
                        <Target className="w-4 h-4" /> Professional Pairing Board
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-6">
                        AI Job <br />
                        <span className="text-neo-green">Matchmaking</span>
                    </h1>
                    <p className="text-xl font-bold max-w-2xl mx-auto text-gray-600">
                        Stop hunting for roles. Our AI engine scans industry data to pair your unique expertise
                        with the high-impact opportunities you've been waiting for.
                    </p>
                </div>

                {/* Main Interaction Area */}
                <JobBoard />
            </div>
        </div>
    );
}
