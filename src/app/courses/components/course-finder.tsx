"use client";

import { useState } from "react";
import {
    Search,
    BookOpen,
    ExternalLink,
    ArrowRight,
    Star,
    Clock,
    Trophy,
    Loader2,
    Zap,
    ChevronRight,
    Map
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getCourseRecommendations, CourseRecommendationResult } from "@/actions/courses";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function CourseFinder() {
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState<CourseRecommendationResult | null>(null);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!query || query.length < 3) {
            toast.error("Please enter a more specific career goal or topic.");
            return;
        }

        setIsSearching(true);
        try {
            const data = await getCourseRecommendations(query);
            setResult(data);
            toast.success("Learning path generated!");
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to find recommendations");
        } finally {
            setIsSearching(false);
        }
    };

    const categories = ["Artificial Intelligence", "Frontend Development", "Data Science", "Cloud Architecture", "Product Management"];

    if (result) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-6xl space-y-12"
            >
                {/* Header Section */}
                <div className="bg-neo-green neo-border p-8 neo-shadow relative overflow-hidden">
                    <div className="absolute -right-8 -bottom-8 opacity-10">
                        <Map className="w-48 h-48" />
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-black">
                        Roadmap: {result.careerGoal}
                    </h2>
                    <p className="text-black font-bold text-lg max-w-3xl leading-relaxed">
                        {result.roadmapDescription}
                    </p>
                    <button
                        onClick={() => setResult(null)}
                        className="mt-6 text-sm font-black uppercase border-b-2 border-black hover:bg-black hover:text-white transition-all"
                    >
                        Change Goal
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Curriculum Sidebar */}
                    <div className="lg:col-span-1 space-y-4">
                        <h3 className="text-2xl font-black uppercase flex items-center gap-2 mb-4">
                            <BookOpen className="w-6 h-6" /> Learning Path
                        </h3>
                        {result.curriculum.map((module, idx) => (
                            <div key={idx} className="bg-white neo-border-thin p-5 hover:bg-bg-cream transition-colors group">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-black text-sm">
                                        {idx + 1}
                                    </span>
                                    <h4 className="font-black uppercase text-sm group-hover:text-neo-blue transition-colors">
                                        {module.title}
                                    </h4>
                                </div>
                                <p className="text-xs font-bold text-gray-600 mb-3">{module.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {module.keyTopics.map((topic, i) => (
                                        <span key={i} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-sm font-bold">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recommended Courses Grid */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-2xl font-black uppercase flex items-center gap-2 mb-4">
                            <Star className="w-6 h-6 text-neo-yellow fill-neo-yellow" /> Featured Courses
                        </h3>
                        <div className="grid gap-6">
                            {result.recommendedCourses.map((course, idx) => (
                                <div key={idx} className="bg-white neo-border p-6 neo-shadow-sm hover:neo-shadow transition-all group">
                                    <div className="flex flex-col md:flex-row justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-3 py-1 bg-neo-blue text-white text-[10px] font-black uppercase tracking-widest">
                                                    {course.platform}
                                                </span>
                                                <span className="px-3 py-1 bg-neo-pink text-white text-[10px] font-black uppercase tracking-widest">
                                                    {course.level}
                                                </span>
                                            </div>
                                            <h4 className="text-xl font-black uppercase mb-3 group-hover:underline">
                                                {course.title}
                                            </h4>
                                            <p className="text-sm font-bold text-gray-600 mb-4">
                                                {course.description}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs font-black uppercase">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {course.duration}
                                                </div>
                                                <div className="flex items-center gap-1 text-neo-green">
                                                    <Trophy className="w-3 h-3" /> Certificate Included
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <a
                                                href={course.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full md:w-auto px-6 py-3 bg-black text-white font-black uppercase text-sm flex items-center justify-center gap-2 neo-border-thin hover:bg-neo-yellow hover:text-black transition-all"
                                            >
                                                View Course <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="w-full max-w-4xl">
            <div className="bg-white neo-border p-8 md:p-12 neo-shadow text-center">
                <div className="mb-10 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
                        What do you want to <span className="bg-neo-yellow px-2">Master</span> today?
                    </h2>
                    <p className="text-gray-600 font-bold text-lg">
                        AI analyzes your goal to build a custom roadmap and find the best learning resources across the web.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="relative mb-12">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g. Become a Prompt Engineer, Master React & Framer Motion..."
                        className="w-full h-20 pl-16 pr-32 bg-bg-cream neo-border font-black text-xl placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-neo-yellow transition-all"
                    />
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search className="w-8 h-8" />
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSearching}
                            className="h-14 px-8"
                        >
                            {isSearching ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                "Find Paths"
                            )}
                        </Button>
                    </div>
                </form>

                <div className="flex flex-wrap justify-center gap-3">
                    <span className="w-full text-xs font-black uppercase text-gray-400 mb-2">Try these favorites:</span>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setQuery(cat);
                            }}
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
                        <Map className="w-6 h-6 text-neo-blue" />
                    </div>
                    <h4 className="font-black uppercase mb-2">Custom Roadmaps</h4>
                    <p className="text-sm font-bold opacity-80">Step-by-step curriculum generated specifically for your goal.</p>
                </div>
                <div className="bg-neo-pink text-white neo-border p-6 neo-shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 neo-border-thin">
                        <Star className="w-6 h-6 text-neo-pink" />
                    </div>
                    <h4 className="font-black uppercase mb-2">Top Platforms</h4>
                    <p className="text-sm font-bold opacity-80">Courses sourced from Coursera, Udemy, edX, and more.</p>
                </div>
                <div className="bg-neo-green text-black neo-border p-6 neo-shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 neo-border-thin">
                        <Zap className="w-6 h-6 text-neo-green" />
                    </div>
                    <h4 className="font-black uppercase mb-2">Instant Discovery</h4>
                    <p className="text-sm font-bold opacity-70">Stop searching for resources and start learning immediately.</p>
                </div>
            </div>
        </div>
    );
}
