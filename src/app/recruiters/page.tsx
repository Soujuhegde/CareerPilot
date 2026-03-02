"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Briefcase, Search, UserCheck, Users, ArrowRight,
    Loader2, CheckCircle, ChevronDown
} from "lucide-react";

const ALL_CANDIDATES = [
    { id: 1, name: "Alex Rivera", role: "Senior Frontend Engineer", match: 98, skills: ["React", "TypeScript", "Next.js"], experience: "6 years" },
    { id: 2, name: "Sarah Chen", role: "Product Designer", match: 95, skills: ["Figma", "UI/UX", "Design Systems"], experience: "4 years" },
    { id: 3, name: "Jordan Smith", role: "Backend Developer", match: 92, skills: ["Node.js", "PostgreSQL", "AWS"], experience: "5 years" },
    { id: 4, name: "Priya Kapoor", role: "Full Stack Engineer", match: 89, skills: ["React", "Python", "Django"], experience: "3 years" },
    { id: 5, name: "Marcus Lee", role: "DevOps Engineer", match: 88, skills: ["Docker", "Kubernetes", "CI/CD"], experience: "7 years" },
    { id: 6, name: "Emily Zhang", role: "Data Scientist", match: 85, skills: ["Python", "ML", "TensorFlow"], experience: "4 years" },
];

const SAVED_SEARCHES = [
    { label: "Frontend React Engineer", query: "React" },
    { label: "Product Designer", query: "Figma" },
];

export default function Recruiters() {
    const [searchQuery, setSearchQuery] = useState("");
    const [shortlisted, setShortlisted] = useState<number[]>([]);
    const [showAll, setShowAll] = useState(false);
    const [isMatching, setIsMatching] = useState(false);
    const [matchDone, setMatchDone] = useState(false);

    const filteredCandidates = ALL_CANDIDATES.filter(c => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            c.name.toLowerCase().includes(q) ||
            c.role.toLowerCase().includes(q) ||
            c.skills.some(s => s.toLowerCase().includes(q))
        );
    });

    const visibleCandidates = showAll ? filteredCandidates : filteredCandidates.slice(0, 3);

    const toggleShortlist = (id: number) => {
        setShortlisted(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSmartMatch = () => {
        setIsMatching(true);
        setMatchDone(false);
        setTimeout(() => {
            setIsMatching(false);
            setMatchDone(true);
            setShowAll(true);
            setSearchQuery("");
        }, 2000);
    };

    const handleSavedSearch = (query: string) => {
        setSearchQuery(query);
        setShowAll(true);
    };

    return (
        <div className="min-h-screen bg-bg-cream p-6 md:p-12 font-sans text-black">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-neo-blue transition-colors mb-4">
                            <ArrowRight className="w-3 h-3 rotate-180" /> Back to Dashboard
                        </Link>
                        <h1 className="text-5xl font-black uppercase tracking-tighter flex items-center gap-4">
                            <Briefcase className="w-12 h-12 text-neo-blue" />
                            Recruiter Tools
                        </h1>
                        <p className="text-slate-600 font-bold mt-2">Manage your pipeline and discover world-class talent.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-neo-yellow neo-border px-4 py-2 flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            <span className="font-black">{ALL_CANDIDATES.length} Active Candidates</span>
                        </div>
                        {shortlisted.length > 0 && (
                            <div className="bg-neo-green text-white neo-border px-4 py-2 flex items-center gap-2 animate-in fade-in">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-black">{shortlisted.length} Shortlisted</span>
                            </div>
                        )}
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Search & Filters */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white neo-border p-6 neo-shadow">
                            <h2 className="text-xl font-black uppercase mb-4">Find Talent</h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by role or skill..."
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-200 focus:border-neo-blue outline-none font-bold transition-all"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowAll(true);
                                    }}
                                />
                            </div>

                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="mt-2 text-xs text-slate-400 font-bold hover:text-red-500 transition-colors"
                                >
                                    Clear search
                                </button>
                            )}

                            <div className="mt-6 space-y-2">
                                <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-3">Saved Searches</h3>
                                {SAVED_SEARCHES.map(s => (
                                    <button
                                        key={s.label}
                                        onClick={() => handleSavedSearch(s.query)}
                                        className={`w-full text-left p-3 border-b border-slate-100 font-bold flex justify-between items-center group hover:bg-slate-50 transition-all ${searchQuery === s.query ? "bg-neo-blue/5 border-neo-blue text-neo-blue" : ""}`}
                                    >
                                        <span>{s.label}</span>
                                        <ArrowRight className="w-4 h-4 text-neo-blue opacity-0 group-hover:opacity-100 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-neo-blue text-white neo-border p-6 neo-shadow">
                            <h2 className="text-xl font-black uppercase mb-2">Smart Match</h2>
                            <p className="font-bold text-sm text-blue-100 mb-6">
                                Let our AI find the perfect candidates for your open positions.
                            </p>
                            <button
                                onClick={handleSmartMatch}
                                disabled={isMatching}
                                className="w-full py-3 bg-white text-black font-black uppercase tracking-widest text-xs neo-border hover:bg-black hover:text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isMatching ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Matching...</>
                                ) : matchDone ? (
                                    <><CheckCircle className="w-4 h-4 text-neo-green" /> Match Complete!</>
                                ) : (
                                    "Run Smart Match"
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Candidate List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white neo-border p-6 neo-shadow">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black uppercase">
                                    {searchQuery ? `Results for "${searchQuery}"` : "Top Matches"}
                                </h2>
                                <span className="px-3 py-1 bg-neo-green text-white text-[10px] font-black rounded border border-black uppercase tracking-widest">
                                    Highly Recommended
                                </span>
                            </div>

                            {filteredCandidates.length === 0 ? (
                                <div className="text-center py-16 text-slate-400 font-bold">
                                    No candidates found for &quot;{searchQuery}&quot;
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {visibleCandidates.map(candidate => {
                                        const isShortlisted = shortlisted.includes(candidate.id);
                                        return (
                                            <div
                                                key={candidate.id}
                                                className={`p-6 border-2 transition-all group relative ${isShortlisted ? "border-neo-green bg-neo-green/5" : "border-slate-100 hover:border-neo-blue"}`}
                                            >
                                                <div className="absolute top-4 right-4 text-4xl font-black text-slate-50 opacity-10 group-hover:opacity-20 transition-all">
                                                    #{candidate.id}
                                                </div>

                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                    <div className="flex gap-4">
                                                        <div className="w-16 h-16 bg-slate-100 border-2 border-slate-900 flex items-center justify-center font-black text-2xl uppercase shrink-0">
                                                            {candidate.name.split(" ").map(n => n[0]).join("")}
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-black uppercase">{candidate.name}</h3>
                                                            <p className="font-bold text-slate-500">{candidate.role} · {candidate.experience}</p>
                                                            <div className="flex gap-2 mt-2 flex-wrap">
                                                                {candidate.skills.slice(0, 2).map(skill => (
                                                                    <span
                                                                        key={skill}
                                                                        className="text-[10px] font-black uppercase px-2 py-0.5 bg-slate-50 border border-slate-200 cursor-pointer hover:border-neo-blue transition-all"
                                                                        onClick={() => handleSavedSearch(skill)}
                                                                    >
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                                {candidate.skills.length > 2 && (
                                                                    <span className="text-[10px] font-black uppercase px-2 py-0.5 text-slate-400">
                                                                        +{candidate.skills.length - 2} more
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <div className="text-2xl font-black text-neo-blue">{candidate.match}%</div>
                                                            <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Match Score</div>
                                                        </div>
                                                        <button
                                                            onClick={() => toggleShortlist(candidate.id)}
                                                            title={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
                                                            className={`p-3 neo-border transition-all ${isShortlisted
                                                                ? "bg-neo-green text-white"
                                                                : "bg-black text-white hover:bg-neo-yellow hover:text-black"}`}
                                                        >
                                                            <UserCheck className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {filteredCandidates.length > 3 && (
                                <button
                                    onClick={() => setShowAll(prev => !prev)}
                                    className="w-full mt-8 py-4 border-2 border-dashed border-slate-200 text-slate-500 font-black uppercase tracking-widest text-xs hover:border-neo-blue hover:text-neo-blue transition-all flex items-center justify-center gap-2"
                                >
                                    <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
                                    {showAll ? `Show Less` : `View All ${filteredCandidates.length} Candidates`}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
