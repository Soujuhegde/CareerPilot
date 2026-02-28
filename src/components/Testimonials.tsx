"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Jenkins",
            role: "Product Manager @ TechFlow",
            image: "https://i.pravatar.cc/150?img=47",
            content: "CareerPilot completely transformed my job search. The AI resume optimization helped me land interviews at three MAANG companies within two weeks.",
            color: "bg-neo-pink"
        },
        {
            name: "David Chen",
            role: "Senior Frontend Engineer",
            image: "https://i.pravatar.cc/150?img=11",
            content: "The mock interview feature is a game-changer. Getting real-time feedback on my system design answers gave me the exact confidence I needed.",
            color: "bg-neo-yellow"
        },
        {
            name: "Elena Rodriguez",
            role: "UX Researcher",
            image: "https://i.pravatar.cc/150?img=32",
            content: "I've tried every resume builder out there, but this is the first one that actually feels intelligent. It rewrote my bullet points to highlight exact metrics.",
            color: "bg-neo-blue text-white"
        }
    ];

    return (
        <section id="testimonials" className="py-32 relative z-20 bg-bg-cream">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-1 px-4 py-2 bg-white neo-border neo-shadow-hover text-text-black text-xs font-black tracking-widest uppercase mb-6 shadow-[2px_2px_0_0_#000]">
                        <Star className="w-4 h-4 text-neo-yellow fill-current stroke-black" /> Trusted Worldwide
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-text-black tracking-tighter uppercase relative inline-block leading-tight">
                        Loved by <br />
                        <span className="relative z-10 bg-neo-green px-4 py-1 mt-2 inline-block neo-border -rotate-1">Professionals</span>
                    </h2>
                    <p className="text-text-black text-lg md:text-xl font-bold border-l-4 border-black pl-4 max-w-lg mx-auto md:border-l-0 md:pl-0">
                        Join thousands of users accelerating their careers.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className={`${testimonial.color} neo-border neo-shadow-hover p-8 relative flex flex-col group hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200`}
                        >
                            <div className="flex gap-1 mb-6 text-black">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-current stroke-black stroke-2" />
                                ))}
                            </div>
                            <p className="mb-8 font-bold text-lg leading-relaxed">
                                &quot;{testimonial.content}&quot;
                            </p>
                            <div className="flex items-center gap-4 mt-auto">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-14 h-14 rounded-full border-2 border-black bg-white object-cover shadow-[2px_2px_0_0_#000]"
                                />
                                <div>
                                    <h4 className="font-black text-[16px] uppercase tracking-wider">{testimonial.name}</h4>
                                    <p className="font-bold text-xs tracking-widest uppercase mt-0.5 opacity-80">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
