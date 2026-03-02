"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import { Button } from "./ui/Button";
import { useRef } from "react";

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Fast and slow parallax speeds for scattered chunky blocks
    const block1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
    const block2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const block3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
    const block4Y = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <section ref={containerRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center bg-bg-cream">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

            {/* Parallax Floating Brutalist Blocks */}
            <motion.div style={{ y: block1Y }} className="absolute top-[20%] left-[5%] w-24 h-24 bg-neo-yellow neo-border neo-shadow-lg -rotate-6 z-0" />
            <motion.div style={{ y: block2Y }} className="absolute top-[60%] left-[2%] w-16 h-16 rounded-full bg-neo-pink neo-border neo-shadow-lg rotate-12 z-0" />
            <motion.div style={{ y: block3Y }} className="absolute top-[25%] right-[8%] w-32 h-16 bg-neo-blue neo-border neo-shadow-lg rotate-6 z-0" />
            <motion.div style={{ y: block4Y }} className="absolute bottom-[20%] right-[15%] w-20 h-20 rounded-full bg-neo-green neo-border neo-shadow-lg -rotate-12 z-0" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center lg:text-left pt-10"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-white neo-border neo-shadow-hover text-text-black text-xs font-black uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 rounded-full bg-neo-pink animate-pulse" />
                        Product Hunt #1 AI Tool
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 leading-tight text-text-black uppercase">
                        Land your <span className="bg-neo-yellow px-4 py-1 inline-block -rotate-2 mx-1 neo-border">dream job</span><br />
                        faster.
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-black mb-10 max-w-xl mx-auto lg:mx-0 font-bold border-l-4 border-black pl-4">
                        The intelligent career acceleration platform. Optimize resumes, master interviews, and get matched to top companies.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                        <Button size="lg" className="w-full sm:w-auto px-10" href="/signup">
                            Start for free
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button variant="blue" size="lg" className="w-full sm:w-auto gap-2 px-8" href="/demo">
                            <Play className="w-5 h-5 fill-current" /> Book Demo
                        </Button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-14 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <div className="flex -space-x-3 mr-2">
                            {[
                                "https://i.pravatar.cc/100?img=33",
                                "https://i.pravatar.cc/100?img=47",
                                "https://i.pravatar.cc/100?img=12",
                                "https://i.pravatar.cc/100?img=44",
                                "https://i.pravatar.cc/100?img=68"
                            ].map((src, i) => (
                                <img key={i} src={src} alt="User" className="w-12 h-12 rounded-full neo-border z-10 hover:z-20 transform hover:-translate-y-2 transition-transform duration-200" style={{ zIndex: 10 - i }} />
                            ))}
                        </div>
                        <div className="flex flex-col items-center sm:items-start bg-white px-5 py-3 neo-border neo-shadow-hover">
                            <div className="flex gap-1 text-neo-yellow mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current text-neo-yellow drop-shadow-[1px_1px_0px_#000]" />
                                ))}
                            </div>
                            <p className="text-xs font-black uppercase tracking-widest text-text-black">
                                4.9/5 from 10k+ users
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Neobrutalist Dashboard Mockup */}
                <motion.div
                    style={{ y, opacity }}
                    initial={{ opacity: 0, x: 50, y: 50 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className="relative z-10 hidden lg:block"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-full aspect-[1.2/1] bg-white neo-border neo-shadow-lg flex flex-col"
                    >
                        {/* Mockup Top Bar */}
                        <div className="flex items-center gap-2 px-4 py-3 neo-border-thin border-t-0 border-l-0 border-r-0 bg-bg-cream">
                            <div className="w-3 h-3 rounded-full bg-neo-pink neo-border-thin" />
                            <div className="w-3 h-3 rounded-full bg-neo-yellow neo-border-thin" />
                            <div className="w-3 h-3 rounded-full bg-neo-green neo-border-thin" />
                        </div>

                        {/* Mockup Dashboard Body */}
                        <div className="p-6 flex-1 flex flex-col gap-6 bg-white overflow-hidden">
                            {/* Top Row Cards */}
                            <div className="grid grid-cols-2 gap-4 h-32">
                                <div className="bg-neo-yellow neo-border neo-shadow-hover p-5 flex flex-col justify-between hover:bg-white transition-colors duration-200">
                                    <h4 className="font-black uppercase tracking-widest text-xs">Applications</h4>
                                    <div className="text-4xl font-black">124</div>
                                </div>
                                <div className="bg-neo-pink neo-border neo-shadow-hover p-5 flex flex-col justify-between text-white hover:text-black hover:bg-white transition-colors duration-200">
                                    <h4 className="font-black uppercase tracking-widest text-xs text-inherit">Interviews</h4>
                                    <div className="text-4xl font-black text-inherit">12</div>
                                </div>
                            </div>

                            {/* Main Chart Area */}
                            <div className="flex-1 bg-neo-blue neo-border neo-shadow-hover p-6 relative flex flex-col hover:bg-white transition-colors duration-300 group/chart">
                                <h4 className="font-black uppercase tracking-widest text-xs text-white group-hover/chart:text-black transition-colors duration-300 mb-4">Growth Trajectory</h4>

                                <div className="flex-1 flex items-end gap-2 pt-4">
                                    {[30, 50, 40, 70, 60, 90, 80].map((height, i) => (
                                        <div key={i} className="flex-1 group relative flex justify-center">
                                            <div
                                                className="w-full bg-white neo-border-thin transition-all duration-200 group-hover:-translate-y-2 group-hover:bg-neo-yellow"
                                                style={{ height: `${height}%` }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Overlay floating card */}
                                <div className="absolute top-4 right-4 bg-white px-3 py-2 neo-border neo-shadow-hover rotate-6">
                                    <span className="font-black text-neo-green text-sm flex items-center gap-1">
                                        +340%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
