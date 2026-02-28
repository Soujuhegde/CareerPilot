"use client";

import { motion, Variants } from "framer-motion";
import { FileText, PenTool, CheckCircle, Compass, Video, TrendingUp, BarChart, Briefcase } from "lucide-react";
import React from "react";

interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    colorBg: string;
}

function FeatureCard({ feature, variants }: { feature: FeatureProps, variants: Variants }) {
    return (
        <motion.div
            variants={variants}
            className="group relative h-full bg-white neo-border neo-shadow-hover p-8 flex flex-col gap-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
        >
            <div className={`w-14 h-14 neo-border flex items-center justify-center relative z-20 ${feature.colorBg} group-hover:-rotate-6 transition-transform duration-300`}>
                {feature.icon}
            </div>
            <div>
                <h3 className="text-lg font-black text-text-black uppercase tracking-widest mb-3 line-clamp-1">{feature.title}</h3>
                <p className="text-sm text-text-black font-medium leading-relaxed">
                    {feature.description}
                </p>
            </div>
        </motion.div>
    );
}

export default function Features() {
    const features: FeatureProps[] = [
        {
            icon: <FileText className="w-6 h-6 text-black" />,
            title: "AI Resume Optimize",
            description: "Tailor your resume for any description to beat the ATS and get noticed instantly.",
            colorBg: "bg-neo-yellow"
        },
        {
            icon: <PenTool className="w-6 h-6 text-black" />,
            title: "Cover Letters",
            description: "Auto-generate personalized letters that perfectly match the company's tone.",
            colorBg: "bg-neo-pink"
        },
        {
            icon: <CheckCircle className="w-6 h-6 text-black" />,
            title: "ATS Score Check",
            description: "Instantly see how well your resume scores against specific job postings.",
            colorBg: "bg-neo-blue text-white"
        },
        {
            icon: <Compass className="w-6 h-6 text-black" />,
            title: "Career Tracking",
            description: "Get personalized career path suggestions based on your unique skill matrix.",
            colorBg: "bg-neo-green"
        },
        {
            icon: <Video className="w-6 h-6 text-black" />,
            title: "Mock Interviews",
            description: "Practice with an AI interviewer and get real-time feedback on your answers.",
            colorBg: "bg-neo-orange"
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-black" />,
            title: "Industry Trends",
            description: "Stay way ahead of the curve with real-time insights into your industry metrics.",
            colorBg: "bg-white"
        },
        {
            icon: <BarChart className="w-6 h-6 text-black" />,
            title: "Skill Gap Analysis",
            description: "Identify what high-value skills you're missing for your dream job trajectory.",
            colorBg: "bg-neo-blue text-white"
        },
        {
            icon: <Briefcase className="w-6 h-6 text-black" />,
            title: "Recruiter Tools",
            description: "Stand out to top tier recruiters with an optimized profile they can't ignore.",
            colorBg: "bg-neo-yellow"
        }
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <section id="features" className="py-32 relative z-20 bg-bg-cream">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto mb-20 relative"
                >
                    {/* Decorative element */}
                    <div className="absolute -top-10 left-10 md:left-20 w-16 h-16 bg-neo-pink rounded-full neo-border neo-shadow-lg -z-10" />

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter text-text-black uppercase leading-tight">
                        Your unfair advantage in <br className="hidden md:block" />
                        a <span className="bg-neo-blue text-white px-4 py-1 mt-2 inline-block neo-border -rotate-1">competitive market</span>
                    </h2>
                    <p className="text-text-black text-lg md:text-xl font-bold max-w-2xl mx-auto border-l-4 border-black pl-4">
                        Deep-tech AI tools and insights designed specifically to accelerate your career trajectory.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} variants={cardVariants} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
