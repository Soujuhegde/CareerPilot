"use client";

import { useState } from "react";
import {
    Search,
    Briefcase,
    MapPin,
    DollarSign,
    TrendingUp,
    Loader2,
    Zap,
    Building,
    CheckCircle2,
    ArrowUpRight,
    Globe,
    Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getJobMatches, JobMatchResult } from "@/actions/jobs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function JobBoard() {
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState<JobMatchResult | null>(null);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!query || query.length < 3) {
            toast.error("Please enter a job title or your skills.");
            return;
        }

        setIsSearching(true);
        try {
            const data = await getJobMatches(query);
            setResult(data);
            toast.success("AI matches found!");
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to find job matches");
        } finally {
            setIsSearching(false);
        }
    };

    const categories = ["Software Engineer", "Product Manager", "UI/UX Designer", "Data Scientist", "DevOps Engineer"];

    if (result) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-6xl space-y-12"
            >
                {/* Header Section */}
                <div className="bg-neo-blue neo-border p-8 neo-shadow relative overflow-hidden">
                    <div className="absolute -right-8 -bottom-8 opacity-10">
                        <TrendingUp className="w-48 h-48 text-white" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-white">
                            Matches for: {result.query}
                        </h2>
                        <p className="text-white font-bold text-lg max-w-3xl leading-relaxed">
                            {result.summary}
                        </p>
                        <button
                            onClick={() => setResult(null)}
                            className="mt-6 text-sm font-black uppercase 
                            border-b-2 border-white text-white hover:bg-white hover:text-black transition-all"
                        >
                            New Search
                        </button>
                    </div>
                </div>

                {/* Job Matches Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {result.matches.map((job, idx) => (
                        <div key={idx} className="bg-white neo-border
                         p-8 neo-shadow-sm hover:neo-shadow transition-all group relative overflow-hidden">
                            {/* Match Score Badge */}
                            <div className="absolute top-0 right-0
                             bg-neo-green text-black font-black px-4 py-2 neo-border-thin transform translate-x-1 -translate-y-1">
                                {job.matchScore}% MATCH
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 bg-bg-cream 
                                neo-border-thin flex items-center justify-center">
                                    <Building className="w-8 h-8 text-neo-blue" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black 
                                    uppercase tracking-tight group-hover:text-neo-blue transition-colors">
                                        {job.title}
                                    </h3>
                                    <p className="text-sm font-black text-gray-500 uppercase tracking-widest
                                     flex items-center gap-2">
                                        {job.company} <span className="w-1 h-1 bg-gray-300 rounded-full" /> {job.location}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6 text-xs font-black uppercase">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Globe className="w-4 h-4 text-neo-blue" /> {job.type}
                                </div>
                                <div className="flex items-center gap-2 text-neo-green">
                                    <DollarSign className="w-4 h-4" /> {job.salary}
                                </div>
                            </div>

                            <p className="text-sm font-bold text-gray-600 mb-8 leading-relaxed italic">
                                "{job.description}"
                            </p>

                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill, i) => (
                                        <span key={i} className="px-3 py-1 bg-bg-cream neo-border-thin
                                         text-[10px] font-black uppercase">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(`${job.title} ${job.company}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full px-6 py-4 bg-black text-white font-black 
                                    uppercase text-sm flex items-center justify-center 
                                    gap-2 neo-border-thin hover:bg-neo-blue transition-all"
                                >
                                    Apply on LinkedIn <ArrowUpRight className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }

    return (
        <div className="w-full max-w-4xl">
            <div className="bg-white neo-border p-8 md:p-12 neo-shadow text-center">
                <div className="mb-10 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black
                     uppercase tracking-tighter mb-6 leading-none">
                        Ready to Find your <span className="bg-neo-blue text-white px-2">Perfect</span> Role?
                    </h2>
                    <p className="text-gray-600 font-bold text-lg">
                        Our AI analyzes market trends and your unique profile to surface job opportunities that truly fit.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="relative mb-12">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g. Senior Frontend Engineer, Cloud Architect with AWS..."
                        className="w-full h-20 pl-16 pr-32 bg-bg-cream neo-border font-black text-xl placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-neo-blue transition-all"
                    />
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                        <Briefcase className="w-8 h-8" />
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSearching}
                            className="h-14 px-8 bg-black hover:bg-neo-blue"
                        >
                            {isSearching ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                "Get Matches"
                            )}
                        </Button>
                    </div>
                </form>

                {/* Loading Status Text */}
                <AnimatePresence>
                    {isSearching && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mb-8 font-black uppercase tracking-widest text-[10px] text-neo-blue animate-pulse flex items-center justify-center gap-2"
                        >
                            <Sparkles className="w-3 h-3" />
                            AI is analyzing billions of data points to find your perfect fit...
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex flex-wrap justify-center gap-3">
                    <span className="w-full text-xs font-black uppercase text-gray-400 mb-2">Popular Roles:</span>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setQuery(cat)}
                            className="px-4 py-2 bg-bg-cream neo-border-thin text-xs font-bold hover:bg-neo-green transition-colors flex items-center gap-2"
                        >
                            <Zap className="w-3 h-3 text-neo-yellow fill-neo-yellow" /> {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neo-blue text-white neo-border p-6 neo-shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 neo-border-thin">
                        <TrendingUp className="w-6 h-6 text-neo-blue" />
                    </div>
                    <h4 className="font-black uppercase mb-2">AI Precision</h4>
                    <p className="text-sm font-bold opacity-80">Highly accurate matching based on deep career data analysis.
                        
                    </p>
                </div>
                <div className="bg-neo-green text-black neo-border p-6 neo-shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 neo-border-thin">
                        <MapPin className="w-6 h-6 text-neo-green" />
                    </div>
                    <h4 className="font-black uppercase mb-2">Location Flexible</h4>
                    <p className="text-sm font-bold opacity-70">Filtered for Remote, Hybrid, or specific On-site needs.</p>
                </div>
                <div className="bg-neo-yellow text-black neo-border p-6 neo-shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 neo-border-thin">
                        <CheckCircle2 className="w-6 h-6 text-neo-yellow fill-black" />
                    </div>
                    <h4 className="font-black uppercase mb-2">Real Time</h4>
                    <p className="text-sm font-bold opacity-70">Jobs projected based on current industry demands.</p>
                </div>
            </div>
        </div>
    );
}
