"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function AnimatedCounter({ value }: { value: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.ceil(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [value, isInView]);

    return <span ref={ref}>{count}</span>;
}

export default function DashboardPreview() {
    return (
        <section id="dashboard" className="py-20 sm:py-32 relative z-20 overflow-hidden bg-bg-cream">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-text-black tracking-tighter uppercase leading-tight">
                        The Intelligent <br className="hidden md:block" />
                        <span className="bg-neo-green text-black px-4 py-1 mt-2 inline-block neo-border -rotate-1">Command Center</span>
                    </h2>
                    <p className="text-text-black text-lg md:text-xl font-bold">
                        Every metric that matters, elegantly tracked in real-time.
                    </p>
                </motion.div>

                {/* Dashboard Mockup Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-white neo-border neo-shadow-lg relative overflow-hidden group p-2 md:p-6"
                >
                    {/* Mockup Top Bar */}
                    <div className="flex items-center gap-2 px-4 py-3 neo-border-thin mb-6 bg-bg-cream">
                        <div className="w-4 h-4 rounded-full bg-neo-pink neo-border-thin" />
                        <div className="w-4 h-4 rounded-full bg-neo-yellow neo-border-thin" />
                        <div className="w-4 h-4 rounded-full bg-neo-green neo-border-thin" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        {/* ATS Score Card */}
                        <div className="bg-neo-yellow neo-border neo-shadow-hover p-7 hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200">
                            <h4 className="text-text-black text-xs font-black uppercase tracking-widest mb-8">ATS Match Score</h4>
                            <div className="flex items-end gap-2 mb-4">
                                <span className="text-6xl font-black text-black leading-none tracking-tighter">
                                    <AnimatedCounter value={94} />
                                </span>
                                <span className="text-black font-bold pb-1.5">/ 100</span>
                            </div>
                            <div className="flex justify-between text-xs text-black mb-2 font-bold uppercase tracking-widest">
                                <span>Requirements Match</span>
                                <span className="text-neo-blue">Excellent</span>
                            </div>
                            <div className="w-full bg-white neo-border-thin h-4">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "94%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                    className="bg-black h-full border-r-2 border-black border-dashed"
                                />
                            </div>
                        </div>

                        {/* Profile Strength */}
                        <div className="bg-neo-pink text-white neo-border neo-shadow-hover p-7 hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200">
                            <h4 className="text-black text-xs font-black uppercase tracking-widest mb-8">Profile Strength</h4>
                            <div className="space-y-6">
                                {[
                                    { label: "Experience", value: 98, width: "98%" },
                                    { label: "Skills Matrix", value: 85, width: "85%" },
                                    { label: "Formatting", value: 92, width: "92%" }
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs mb-2.5 font-bold uppercase tracking-widest">
                                            <span className="text-black">{stat.label}</span>
                                            <span className="text-white">{stat.value}%</span>
                                        </div>
                                        <div className="w-full bg-white neo-border-thin h-4">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: stat.width }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.2, delay: 0.5 + (i * 0.2), ease: "easeOut" }}
                                                className="bg-black h-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Application Chart (Mock Bar Chart) */}
                        <div className="md:col-span-1 bg-white neo-border neo-shadow-hover p-7 hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200">
                            <h4 className="text-text-black text-xs font-black uppercase tracking-widest mb-6">Profile Views</h4>
                            <div className="flex items-end h-32 gap-3 mt-4">
                                {[12, 18, 15, 25, 22, 35, 45].map((val, i) => (
                                    <div key={i} className="flex-1 flex flex-col justify-end group h-full">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${(val / 45) * 100}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                                            className="w-full bg-neo-blue neo-border border-b-0 rounded-t-sm transition-all duration-200 group-hover:bg-neo-orange"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-[10px] text-text-black font-black px-1 uppercase tracking-wider">
                                <span>Oct</span>
                                <span>Nov</span>
                                <span>Dec</span>
                                <span>Jan</span>
                            </div>
                        </div>

                        <div className="md:col-span-3 bg-neo-green neo-border neo-shadow-hover p-6 hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200 overflow-x-auto relative">
                            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neo-green to-transparent z-10 pointer-events-none" />
                            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-1">
                                <span className="text-black text-xs font-black uppercase tracking-widest whitespace-nowrap hidden md:block border-r-4 border-black pr-6">AI Matched Roles</span>
                                <div className="flex gap-4 min-w-max">
                                    <div className="px-4 py-2 bg-white neo-border flex items-center gap-3 hover:bg-neo-yellow transition-colors duration-200">
                                        <span className="text-sm font-bold text-text-black uppercase">Senior Frontend Dev</span>
                                        <span className="text-xs font-black text-white bg-black px-2 py-1 tracking-widest">98% Match</span>
                                    </div>
                                    <div className="px-4 py-2 bg-white neo-border flex items-center gap-3 hover:bg-neo-yellow transition-colors duration-200">
                                        <span className="text-sm font-bold text-text-black uppercase">Staff Engineer</span>
                                        <span className="text-xs font-black text-white bg-black px-2 py-1 tracking-widest">92% Match</span>
                                    </div>
                                    <div className="px-4 py-2 bg-white neo-border flex items-center gap-3 hover:bg-neo-yellow transition-colors duration-200">
                                        <span className="text-sm font-bold text-text-black uppercase">Tech Lead</span>
                                        <span className="text-xs font-black text-white bg-black px-2 py-1 tracking-widest">88% Match</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
