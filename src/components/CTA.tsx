"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-24 relative z-20 px-4 md:px-6 bg-bg-cream pb-32">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-5xl mx-auto bg-neo-yellow neo-border neo-shadow-lg p-12 md:p-20 lg:p-24 text-center relative overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full neo-border" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neo-pink neo-border rotate-45" />

                <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center">
                    <h2 className="text-5xl md:text-6xl lg:text-[72px] font-black text-black mb-6 leading-tight tracking-tighter uppercase relative">
                        Ready to Upgrade <br />
                        <span className="bg-white px-4 py-1 inline-block -rotate-1 neo-border mt-2">Your Career?</span>
                    </h2>
                    <p className="text-black text-lg md:text-xl mb-12 font-bold max-w-2xl mx-auto leading-relaxed border-l-4 border-black pl-4 text-left">
                        Join the platform that top professionals use to bypass the competition and land dream roles twice as fast.
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-4 relative z-30">
                        <Link href="/signup" className="px-10 py-5 bg-black text-white font-black uppercase tracking-widest text-lg md:text-xl neo-border neo-shadow-hover hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200">
                            Create Free Account
                        </Link>
                    </div>
                    <span className="text-black font-bold uppercase tracking-widest text-xs mt-6">
                        * No credit card required *
                    </span>
                </div>
            </motion.div>
        </section>
    );
}
