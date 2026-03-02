"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    TrendingUp,
    ArrowLeft,
    Briefcase,
    DollarSign,
    Zap,
    Globe,
    BarChart3,
    LineChart,
    PieChart as PieChartIcon
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart as RechartsLineChart,
    Line,
    Cell,
    PieChart,
    Pie
} from "recharts";
import { Suspense } from "react";

// Mock data generator based on industry
const getIndustryData = (industry: string) => {
    const defaultData = {
        name: "Professional Services",
        salary: [
            { range: "Entry", value: 45000 },
            { range: "Mid-Level", value: 75000 },
            { range: "Senior", value: 110000 },
            { range: "Lead", value: 145000 },
        ],
        trends: [
            { month: "Jan", demand: 65 },
            { month: "Feb", demand: 68 },
            { month: "Mar", demand: 75 },
            { month: "Apr", demand: 82 },
            { month: "May", demand: 80 },
            { month: "Jun", demand: 85 },
        ],
        skills: [
            { name: "Communication", level: 90 },
            { name: "Management", level: 75 },
            { name: "Strategy", level: 80 },
            { name: "Analysis", level: 70 },
        ],
        growth: "+12%",
        remote: "65%",
        outlook: "High"
    };

    const industrySpecific: Record<string, typeof defaultData> = {
        tech: {
            name: "Technology & Software",
            salary: [
                { range: "Entry", value: 85000 },
                { range: "Mid-Level", value: 130000 },
                { range: "Senior", value: 185000 },
                { range: "Lead", value: 240000 },
            ],
            trends: [
                { month: "Jan", demand: 80 },
                { month: "Feb", demand: 85 },
                { month: "Mar", demand: 92 },
                { month: "Apr", demand: 95 },
                { month: "May", demand: 94 },
                { month: "Jun", demand: 98 },
            ],
            skills: [
                { name: "React/Next.js", level: 95 },
                { name: "TypeScript", level: 90 },
                { name: "AI/ML", level: 85 },
                { name: "Cloud Architecture", level: 80 },
            ],
            growth: "+24%",
            remote: "92%",
            outlook: "Excellent"
        },
        finance: {
            name: "Finance & Banking",
            salary: [
                { range: "Entry", value: 70000 },
                { range: "Mid-Level", value: 115000 },
                { range: "Senior", value: 160000 },
                { range: "Lead", value: 210000 },
            ],
            trends: [
                { month: "Jan", demand: 60 },
                { month: "Feb", demand: 62 },
                { month: "Mar", demand: 65 },
                { month: "Apr", demand: 68 },
                { month: "May", demand: 70 },
                { month: "Jun", demand: 72 },
            ],
            skills: [
                { name: "Financial Analysis", level: 95 },
                { name: "Risk Management", level: 85 },
                { name: "Data Viz", level: 80 },
                { name: "Python", level: 75 },
            ],
            growth: "+8%",
            remote: "45%",
            outlook: "Stable"
        },
        marketing: {
            name: "Marketing & Advertising",
            salary: [
                { range: "Entry", value: 50000 },
                { range: "Mid-Level", value: 85000 },
                { range: "Senior", value: 125000 },
                { range: "Lead", value: 160000 },
            ],
            trends: [
                { month: "Jan", demand: 70 },
                { month: "Feb", demand: 75 },
                { month: "Mar", demand: 72 },
                { month: "Apr", demand: 78 },
                { month: "May", demand: 85 },
                { month: "Jun", demand: 90 },
            ],
            skills: [
                { name: "SEO/SEM", level: 90 },
                { name: "Content Strategy", level: 85 },
                { name: "Data Analytics", level: 80 },
                { name: "AI Tools", level: 75 },
            ],
            growth: "+15%",
            remote: "70%",
            outlook: "Positive"
        }
    };

    return industrySpecific[industry] || defaultData;
};

function TrendsContent() {
    const searchParams = useSearchParams();
    const industry = searchParams.get("industry") || "tech";
    const experience = parseInt(searchParams.get("experience") || "0");
    const userSkills = (searchParams.get("skills") || "").toLowerCase().split(",").map(s => s.trim());

    const data = getIndustryData(industry);

    // Determine user's bracket based on experience
    const getUserBracket = (exp: number) => {
        if (exp <= 2) return "Entry";
        if (exp <= 5) return "Mid-Level";
        if (exp <= 10) return "Senior";
        return "Lead";
    };
    const userBracket = getUserBracket(experience);

    const COLORS = ['#2563eb', '#ec4899', '#eab308', '#f97316'];
    const HIGHLIGHT_COLOR = '#000000'; // Black border/contrast for highlight

    // Filter recommended skills (don't show what user already has)
    const recommendedSkills = data.skills.filter(s => !userSkills.includes(s.name.toLowerCase()));
    const matchingSkills = data.skills.filter(s => userSkills.includes(s.name.toLowerCase()));

    return (
        <div className="min-h-screen bg-bg-cream p-6 md:p-12 mb-20">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <Link href="/industry-insights" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-neo-blue transition-colors mb-4 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Profile
                        </Link>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest neo-border-thin">
                                {experience} Years Experience
                            </span>
                            <span className="px-3 py-1 bg-neo-blue text-white text-[10px] font-black uppercase tracking-widest neo-border-thin">
                                {userBracket}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black flex items-center gap-4">
                            <TrendingUp className="w-10 h-10 text-neo-pink" />
                            {data.name} <span className="text-neo-blue">Insights</span>
                        </h1>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-white neo-border px-6 py-4 flex flex-col items-center justify-center">
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Growth</span>
                            <span className="text-2xl font-black text-neo-blue">{data.growth}</span>
                        </div>
                        <div className="bg-white neo-border px-6 py-4 flex flex-col items-center justify-center">
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Remote</span>
                            <span className="text-2xl font-black text-neo-pink">{data.remote}</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Salary Trends */}
                    <div className="lg:col-span-2 bg-white neo-border p-8 neo-shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-neo-yellow/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                                    <DollarSign className="w-6 h-6 text-neo-orange" />
                                    Salary Ranges (USD)
                                </h2>
                                <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-widest">
                                    Based on your {experience} years of experience, you fall into <span className="text-neo-blue">{userBracket}</span> range.
                                </p>
                            </div>
                            <BarChart3 className="hidden md:block w-5 h-5 text-gray-300" />
                        </div>
                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.salary} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={40}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                    <XAxis
                                        dataKey="range"
                                        fontFamily="inherit"
                                        fontWeight="700"
                                        fontSize={10}
                                        axisLine={{ stroke: '#000', strokeWidth: 2 }}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        fontFamily="inherit"
                                        fontWeight="700"
                                        fontSize={10}
                                        axisLine={{ stroke: '#000', strokeWidth: 2 }}
                                        tickLine={false}
                                        tickFormatter={(val) => `$${val / 1000}k`}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            borderRadius: '0',
                                            border: '2px solid black',
                                            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                        }}
                                        cursor={{ fill: '#f8fafc', opacity: 0.4 }}
                                    />
                                    <Bar dataKey="value" radius={[0, 0, 0, 0]}>
                                        {data.salary.map((entry, index) => {
                                            const isUserBracket = entry.range === userBracket;
                                            return (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={isUserBracket ? COLORS[index % COLORS.length] : `${COLORS[index % COLORS.length]}80`}
                                                    stroke="black"
                                                    strokeWidth={isUserBracket ? 3 : 1}
                                                />
                                            );
                                        })}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-black"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Your Range</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-gray-300"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Market Range</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="space-y-8">
                        <div className="bg-neo-blue text-white neo-border p-8 neo-shadow-lg transform hover:-translate-y-1 transition-transform cursor-default">
                            <Zap className="w-8 h-8 mb-4" />
                            <h3 className="text-sm font-black uppercase tracking-widest mb-1 opacity-80">Market Outlook</h3>
                            <p className="text-4xl font-black uppercase">{data.outlook}</p>
                            <div className="w-full h-2 bg-white/20 mt-6 overflow-hidden">
                                <div
                                    className="h-full bg-white transition-all duration-1000"
                                    style={{ width: data.outlook === "Excellent" ? "95%" : data.outlook === "Positive" ? "75%" : "50%" }}
                                ></div>
                            </div>
                        </div>

                        <div className="bg-white neo-border p-8 neo-shadow-lg relative overflow-hidden">
                            <Globe className="w-8 h-8 mb-4 text-neo-pink" />
                            <h3 className="text-sm font-black uppercase tracking-widest mb-1 text-gray-500 font-bold">Recommended Path</h3>
                            <p className="text-2xl font-black text-black">
                                {experience < 3 ? "Rapid Upskilling" : "Leadership Growth"}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-neo-pink text-white text-[10px] font-black uppercase">High ROI</span>
                                <span className="px-2 py-1 bg-neo-orange text-white text-[10px] font-black uppercase">Future-Proof</span>
                            </div>
                        </div>
                    </div>

                    {/* Job Demand Chart */}
                    <div className="bg-white neo-border p-8 neo-shadow-lg relative group">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                                <LineChart className="w-6 h-6 text-neo-pink" />
                                Demand Trend
                            </h2>
                        </div>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsLineChart data={data.trends}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="month" fontWeight="700" fontSize={10} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            borderRadius: '0',
                                            border: '2px solid black',
                                            boxShadow: '4px 4px 0px rgba(0,0,0,1)'
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="demand"
                                        stroke="#ec4899"
                                        strokeWidth={4}
                                        dot={{ r: 4, fill: "#ec4899", stroke: "black", strokeWidth: 2 }}
                                        activeDot={{ r: 6, strokeWidth: 2 }}
                                    />
                                </RechartsLineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Personalized Skill Analysis */}
                    <div className="bg-white neo-border p-8 neo-shadow-lg">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                                <Briefcase className="w-6 h-6 text-neo-blue" />
                                Skill Gap Analysis
                            </h2>
                        </div>

                        <div className="space-y-8">
                            {/* Skills already possessed */}
                            {matchingSkills.length > 0 && (
                                <div>
                                    <p className="text-[10px] font-black uppercase text-neo-blue mb-4 tracking-widest">Matched Skills (Keep it up!)</p>
                                    <div className="flex flex-wrap gap-2">
                                        {matchingSkills.map((s, i) => (
                                            <span key={i} className="px-3 py-1 bg-neo-blue/10 text-neo-blue text-xs font-bold uppercase neo-border-thin">
                                                {s.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Skills to learn */}
                            <div>
                                <p className="text-[10px] font-black uppercase text-neo-pink mb-4 tracking-widest">Recommended for {data.name}</p>
                                <div className="space-y-5">
                                    {(recommendedSkills.length > 0 ? recommendedSkills : data.skills).map((skill, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between items-end">
                                                <span className="font-bold text-xs uppercase">{skill.name}</span>
                                                <span className="font-black text-[10px] text-neo-blue">{skill.level}% Market Match</span>
                                            </div>
                                            <div className="w-full h-2 bg-bg-cream neo-border-thin overflow-hidden">
                                                <div
                                                    className="h-full bg-neo-pink transition-all duration-1000"
                                                    style={{ width: `${skill.level}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Market Distribution */}
                    <div className="bg-white neo-border p-8 neo-shadow-lg">
                        <h2 className="text-xl font-black uppercase tracking-widest mb-4 flex items-center gap-3">
                            <PieChartIcon className="w-6 h-6 text-neo-orange" />
                            Work Style
                        </h2>
                        <div className="h-[220px] w-full flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'On-site', value: 30 },
                                            { name: 'Hybrid', value: 35 },
                                            { name: 'Remote', value: 35 },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={75}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="black"
                                        strokeWidth={1}
                                    >
                                        <Cell fill="#2563eb" />
                                        <Cell fill="#ec4899" />
                                        <Cell fill="#eab308" />
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-[10px] font-black uppercase text-gray-400">Industry</span>
                                <span className="text-sm font-black uppercase">Mix</span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-2">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-neo-blue"></div><span className="text-[10px] font-bold">On-site</span></div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-neo-pink"></div><span className="text-[10px] font-bold">Hybrid</span></div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-neo-yellow"></div><span className="text-[10px] font-bold">Remote</span></div>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="mt-12 text-center bg-black p-10 neo-border neo-shadow-lg text-white">
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Want a personalized career roadmap?</h3>
                    <p className="text-white/70 font-bold mb-8 max-w-xl mx-auto">Get an AI-generated guide to mastering these skills and advancing your career in {data.name} based on your unique background.</p>
                    <Link
                        href={`/guidance?industry=${industry}&experience=${experience}&skills=${searchParams.get("skills") || ""}`}
                        className="inline-block px-10 py-4 bg-neo-pink text-white font-black uppercase tracking-widest neo-border hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200"
                    >
                        Generate roadmap
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function Trends() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-bg-cream flex items-center justify-center font-black uppercase tracking-widest animate-pulse">Loading Insights...</div>}>
            <TrendsContent />
        </Suspense>
    );
}
