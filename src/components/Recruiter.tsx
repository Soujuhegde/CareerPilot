"use client";

import { motion } from "framer-motion";
import { Users, Target, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Recruiter() {
    return (
        <section id="recruiters" className="py-32 relative overflow-hidden bg-bg-cream neo-border-thin border-l-0 border-r-0">
            {/* Background Geometric Shapes */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-neo-yellow rounded-full neo-border neo-shadow-lg" />
            <div className="absolute bottom-20 right-10 w-24 h-24 bg-neo-pink neo-border neo-shadow-lg rotate-45" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neo-green neo-border text-black text-xs font-black uppercase tracking-widest mb-6 shadow-[2px_2px_0_0_#000]">
                            <ShieldCheck className="w-4 h-4 text-black" /> For Employers
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-text-black tracking-tighter uppercase leading-tight">
                            Hire Top 1% Talent <br />
                            <span className="bg-neo-blue text-white px-4 py-1 inline-block -rotate-1 neo-border mt-2">Faster Than Ever</span>
                        </h2>

                        <p className="text-text-black text-lg md:text-xl font-bold mb-10 leading-relaxed border-l-4 border-black pl-4">
                            CareerPilot isn&apos;t just for candidates. We provide recruiters with an exclusive portal to source, filter, and instantly connect with highly-vetted, verified professionals matching exact requirements.
                        </p>

                        <div className="space-y-6 mb-10">
                            {[
                                { icon: <Target className="w-5 h-5" />, text: "AI-powered precision matching", color: "bg-neo-yellow" },
                                { icon: <Users className="w-5 h-5" />, text: "Access to private candidate pools", color: "bg-neo-pink" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-text-black font-bold">
                                    <div className={`w-12 h-12 rounded-full ${item.color} neo-border flex items-center justify-center text-black neo-shadow-hover transition-transform hover:-translate-y-1`}>
                                        {item.icon}
                                    </div>
                                    <span className="text-lg uppercase tracking-wider">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/demo" className="inline-block px-8 py-4 font-black uppercase tracking-widest text-white bg-black neo-border-thin shadow-[4px_4px_0_0_#FFD400] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200">
                            Explore Recruiting Features →
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="relative lg:h-[500px] flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-md bg-white neo-border p-6 neo-shadow-lg rotate-2 hover:rotate-1 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300">
                            {/* Tape accent */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-neo-yellow/80 rotate-[-4deg] opacity-80" />

                            {/* Candidate Card UI Mockup */}
                            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-dashed border-black">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-neo-blue flex items-center justify-center neo-border neo-shadow-hover">
                                        <span className="text-white font-black text-xl">AJ</span>
                                    </div>
                                    <div>
                                        <h3 className="text-black font-black text-xl uppercase tracking-wider">Alex Johnson</h3>
                                        <p className="text-sm font-bold text-slate-600">Senior React Engineer</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-neo-green neo-border text-black text-xs font-black uppercase tracking-widest neo-shadow-hover -rotate-3">
                                    98% MATCH
                                </div>
                            </div>

                            <div className="space-y-5 mb-8">
                                <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                                    <span className="text-black">Tech Assessment</span>
                                    <span className="text-white bg-black px-2 py-0.5">Top 5%</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                                    <span className="text-black">System Design</span>
                                    <span className="text-black bg-neo-yellow border-2 border-black px-2 py-0.5">Expert</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                                    <span className="text-black">Communication</span>
                                    <span className="text-white bg-neo-blue border-2 border-black px-2 py-0.5">Excellent</span>
                                </div>
                            </div>

                            <Link href="/demo" className="block w-full text-center py-4 bg-neo-pink text-black font-black uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200">
                                Request Interview
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
