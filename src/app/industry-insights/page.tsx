import Link from "next/link";
import { MoveRight, TrendingUp } from "lucide-react";

export default function IndustryInsights() {
    return (
        <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center p-6 md:p-12">
            <div className="w-full max-w-3xl mt-20">
                <div className="mb-8 relative">
                    <div className="absolute -left-6 -top-6 w-16 h-16 
                    bg-neo-yellow rounded-full -z-10 blur-xl opacity-50"></div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase 
                    tracking-tighter text-black flex items-center gap-4">
                        <TrendingUp className="w-10 h-10 text-neo-orange" />
                        Complete Profile
                    </h1>
                    <p className="text-lg font-bold text-gray-700 mt-4 max-w-2xl">
                        Select your industry to get personalized career insights and recommendations.
                    </p>
                </div>

                <div className="bg-white neo-border p-6 md:p-10 neo-shadow-lg relative overflow-hidden">
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neo-pink/10 
                    -rotate-45 translate-x-16 -translate-y-16"></div>

                    <form className="space-y-8 relative z-10" action="/trends" method="GET">
                        {/* Industry */}
                        <div className="space-y-3">
                            <label className="font-black text-sm uppercase tracking-widest block">
                                Industry
                            </label>
                            <div className="relative">
                                <select
                                    name="industry"
                                    className="w-full p-4 neo-border-thin bg-bg-cream 
                                    font-bold text-black appearance-none cursor-pointer hover:bg-white transition-colors"
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled>Select an industry</option>
                                    <option value="tech">Technology & Software</option>
                                    <option value="finance">Finance & Banking</option>
                                    <option value="healthcare">Healthcare & Medical</option>
                                    <option value="education">Education & E-Learning</option>
                                    <option value="marketing">Marketing & Advertising</option>
                                    <option value="design">Design & Creative</option>
                                    <option value="engineering">Engineering & Architecture</option>
                                    <option value="other">Other</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" 
                                    xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L7 7L13 1" stroke="black" strokeWidth="2" 
                                        strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Years of Experience */}
                        <div className="space-y-3">
                            <label className="font-black text-sm uppercase tracking-widest block">
                                Years of Experience
                            </label>
                            <input
                                name="experience"
                                type="number"
                                min="0"
                                max="50"
                                placeholder="Enter years of experience"
                                className="w-full p-4 neo-border-thin bg-bg-cream font-bold 
                                text-black placeholder:text-gray-400 focus:bg-white transition-colors"
                                required
                            />
                        </div>

                        {/* Skills */}
                        <div className="space-y-3">
                            <label className="font-black text-sm uppercase tracking-widest block">
                                Skills
                            </label>
                            <input
                                name="skills"
                                type="text"
                                placeholder="e.g., Python, JavaScript, Project Management"
                                className="w-full p-4 neo-border-thin bg-bg-cream 
                                font-bold text-black placeholder:text-gray-400 focus:bg-white transition-colors"
                                required
                            />
                            <p className="text-xs font-bold 
                            text-gray-500 uppercase tracking-wider">Separate multiple skills with commas</p>
                        </div>

                        {/* Professional Bio */}
                        <div className="space-y-3">
                            <label className="font-black text-sm uppercase tracking-widest block">
                                Professional Bio
                            </label>
                            <textarea
                                name="bio"
                                placeholder="Tell us about your professional background..."
                                className="w-full p-4 neo-border-thin bg-bg-cream 
                                font-medium text-black placeholder:text-gray-400 h-40 resize-y
                                 focus:bg-white transition-colors"
                                required
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full md:w-auto px-8 py-4 bg-neo-blue 
                                text-white font-black uppercase tracking-widest neo-border
                                 neo-shadow-hover hover:translate-y-1 hover:translate-x-1
                                  hover:shadow-none transition-all duration-200 flex items-center 
                                  justify-center gap-3"
                            >
                                Get Insights
                                <MoveRight className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-sm font-bold uppercase
                     tracking-widest text-gray-500 hover:text-neo-blue 
                     transition-colors relative group inline-block">
                        Skip for now
                        <span className="absolute -bottom-1 left-0 w-full 
                        h-0.5 bg-neo-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
