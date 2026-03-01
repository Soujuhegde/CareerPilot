"use client";

import { motion, Variants } from "framer-motion";
import { FileText, PenTool, CheckCircle, Compass, Video, TrendingUp, BarChart, Briefcase } from "lucide-react";
import React from "react";
import Link from "next/link";

interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    colorBg: string;
    buttonText: string;
    href: string;
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
            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-black text-text-black uppercase tracking-widest mb-3 line-clamp-1">{feature.title}</h3>
                <p className="text-sm text-text-black font-medium leading-relaxed mb-6">
                    {feature.description}
                </p>
                <Link href={feature.href} className="mt-auto self-start inline-flex items-center text-xs font-black uppercase tracking-widest text-text-black border-b-2 border-black pb-1 hover:text-neo-blue hover:border-neo-blue transition-colors group-hover:translate-x-1 duration-200">
                    {feature.buttonText}
                </Link>
            </div>
        </motion.div>
    );
}

export default function Features() {
    const features: FeatureProps[] = [
        {
            icon: <FileText className="w-6 h-6 text-black" />,
            title: "AI-Powered Guidance",
            description: "Discover career paths tailored to your skills with AI-driven insights.",
            colorBg: "bg-neo-yellow",
            buttonText: "Get Guidance →",
            href: "/guidance"
        },
        {
            icon: <PenTool className="w-6 h-6 text-black" />,
            title: "Smart Resume & Letter",
            description: "Create ATS-optimized resumes and cover letters effortlessly.",
            colorBg: "bg-neo-pink",
            buttonText: "Build Resume →",
            href: "/resume"
        },
        {
            icon: <CheckCircle className="w-6 h-6 text-black" />,
            title: "Check Your ATS Score",
            description: "Upload your resume and get instant feedback to improve your chances.",
            colorBg: "bg-neo-blue text-white",
            buttonText: "Check Score →",
            href: "/ats-score"
        },
        {
            icon: <Compass className="w-6 h-6 text-black" />,
            title: "Get Course Recommendations",
            description: "AI suggests the best courses to enhance your skills.",
            colorBg: "bg-neo-green",
            buttonText: "Find Courses →",
            href: "/courses"
        },
        {
            icon: <Video className="w-6 h-6 text-black" />,
            title: "Mock Interviews",
            description: "Get AI-driven interview feedback to enhance your skills.",
            colorBg: "bg-neo-orange",
            buttonText: "Practice Now →",
            href: "/interviews"
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-black" />,
            title: "Know Industry Trends",
            description: "Stay updated with salary insights and the latest job trends.",
            colorBg: "bg-white",
            buttonText: "Explore Trends →",
            href: "/industry-insights"
        },
        {
            icon: <BarChart className="w-6 h-6 text-black" />,
            title: "Get Job Matches",
            description: "AI recommends the best job opportunities for you.",
            colorBg: "bg-neo-blue text-white",
            buttonText: "Find Jobs →",
            href: "/jobs"
        },
        {
            icon: <Briefcase className="w-6 h-6 text-black" />,
            title: "Shortlist Top Talent",
            description: "AI-powered tools for recruiters to filter resumes efficiently.",
            colorBg: "bg-neo-yellow",
            buttonText: "For Recruiters →",
            href: "/recruiters"
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
