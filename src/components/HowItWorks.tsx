"use client";

import { motion } from "framer-motion";
import { UserPlus, Brain, Zap, Send } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            icon: <UserPlus className="w-8 h-8 text-black" />,
            title: "Create Profile",
            description: "Tell us about your background and specific trajectory goals."
        },
        {
            icon: <Brain className="w-8 h-8 text-black" />,
            title: "AI Analysis",
            description: "Our proprietary AI evaluates your deep skill matrix."
        },
        {
            icon: <Zap className="w-8 h-8 text-black" />,
            title: "Optimize Insights",
            description: "Get highly actionable feedback to significantly enhance resonance."
        },
        {
            icon: <Send className="w-8 h-8 text-black" />,
            title: "Scale Success",
            description: "Land premium interviews with a dynamically polished profile."
        }
    ];

    return (
        <section id="how-it-works" className="py-20 sm:py-32 relative overflow-hidden bg-bg-cream neo-border-thin border-l-0 border-r-0">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #f4f4f0 25%, #f4f4f0 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 bg-white p-6 sm:p-12 neo-border neo-shadow-lg">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-24"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-text-black tracking-tighter uppercase leading-tight">
                        How <br className="hidden md:block" />
                        <span className="bg-neo-yellow px-4 py-1 mt-2 neo-border -rotate-1 inline-block neo-shadow">CareerPilot</span> Works
                    </h2>
                    <p className="text-text-black text-lg md:text-xl font-bold border-l-4 border-black pl-4 max-w-lg mx-auto md:mx-0 text-left md:text-center md:border-l-0 md:pl-0">
                        Four simple phases to transform your professional trajectory.
                    </p>
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Connecting Solid Black Line */}
                    <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[4px] bg-black" />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center relative z-10">
                        {steps.map((step, index) => {
                            const colors = ["bg-neo-pink", "bg-neo-yellow", "bg-neo-blue", "bg-neo-green"];
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    className="flex flex-col items-center group cursor-default"
                                >
                                    <div className="relative mb-10 pt-1">
                                        <div className={`w-24 h-24 rounded-full ${colors[index]} neo-border flex items-center justify-center relative z-10 hover:-rotate-12 hover:scale-110 transition-transform duration-300 neo-shadow-hover`}>
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {step.icon}
                                            </motion.div>
                                        </div>

                                        {/* Step Number Tag */}
                                        <div className="absolute -bottom-4 right-0 w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg font-black text-black z-20 neo-border shadow-[2px_2px_0_0_#000] rotate-12">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black uppercase tracking-widest text-text-black mb-3">{step.title}</h3>
                                    <p className="text-sm text-text-black font-semibold leading-relaxed max-w-[220px]">
                                        {step.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
