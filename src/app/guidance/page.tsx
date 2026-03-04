"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    Lock,
    Info,
    LayoutPanelTop,
    Lightbulb,
    ExternalLink,
    Code,
    Sparkles,
    CheckCircle
} from "lucide-react";
import { Suspense, useState, useMemo } from "react";

// Roadmap Data for the new Node Structure
const getRoadmapNodes = (industry: string) => {
    // Core path nodes
    return [
        {
            id: "internet",
            label: "Internet",
            description: "How the internet works",
            status: "done",
            branches: [
                { id: "internet-1", label: "How does the internet work?", status: "done" },
                { id: "internet-2", label: "What is HTTP?", status: "done" },
                { id: "internet-3", label: "Browsers and how they work?", status: "done" },
                { id: "internet-4", label: "DNS and how it works?", status: "done" }
            ]
        },
        { id: "basic-html", label: "HTML", status: "done", branches: [] },
        { id: "basic-css", label: "CSS", status: "done", branches: [] },
        { id: "basic-js", label: "JavaScript", status: "current", branches: [] },
        {
            id: "vcs",
            label: "Version Control Systems",
            status: "locked",
            branches: [
                { id: "vcs-1", label: "Git", status: "locked" },
                { id: "vcs-2", label: "GitHub", status: "locked" },
                { id: "vcs-3", label: "GitLab", status: "locked" }
            ]
        },
        {
            id: "package-managers",
            label: "Package Managers",
            status: "locked",
            branches: [
                { id: "pm-1", label: "npm", status: "locked" },
                { id: "pm-2", label: "yarn", status: "locked" },
                { id: "pm-3", label: "pnpm", status: "locked" }
            ]
        },
        {
            id: "frameworks",
            label: "Pick a Framework",
            status: "locked",
            branches: [
                { id: "fw-1", label: "React", status: "locked" },
                { id: "fw-2", label: "Vue.js", status: "locked" },
                { id: "fw-3", label: "Angular", status: "locked" }
            ]
        },
        {
            id: "ai-coding",
            label: "AI Assisted Coding",
            status: "locked",
            branches: [
                { id: "ai-1", label: "Claude Code", status: "locked" },
                { id: "ai-2", label: "GitHub Copilot", status: "locked" },
                { id: "ai-3", label: "Antigravity", status: "locked" }
            ]
        }
    ];
};

function RoadmapContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const industry = searchParams.get("industry") || "tech";
    const experience = parseInt(searchParams.get("experience") || "0");
    const industryName = industry.charAt(0).toUpperCase() + industry.slice(1);

    // State for Interactivity
    const [activeTab, setActiveTab] = useState<"roadmap" | "projects" | "tutor">("roadmap");
    const [completedIds, setCompletedIds] = useState<string[]>(["internet", "internet-1", "internet-2", "internet-3", "internet-4", "basic-html", "basic-css"]);
    const [isTracking, setIsTracking] = useState(false);

    // AI Tutor States
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    const initialNodes = useMemo(() => getRoadmapNodes(industry), [industry]);

    const handleStartSession = () => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages([
                {
                    role: 'assistant',
                    content: `Hello! I'm your AI Career Tutor. I see you're building your ${industryName} roadmap. You've already completed ${completedIds.length} topics—great start! How can I help you today?`
                }
            ]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        const newMessages = [...messages, { role: 'user' as const, content: text }];
        setMessages(newMessages);
        setIsTyping(true);

        // Simulated AI Response
        setTimeout(() => {
            let response = "That's a great question! For your current stage, I recommend focusing on mastering the core concepts before moving to complex frameworks.";
            const lowText = text.toLowerCase();

            if (lowText.includes("js") || lowText.includes("javascript")) {
                response = "JavaScript is a high-level, interpreted scripting language that is a core technology of the web. It allows you to implement complex features on web pages, such as dynamic content updates, interactive maps, and 2D/3D graphics.";
            } else if (lowText.includes("datatype")) {
                response = "In JavaScript, there are 8 basic data types: String, Number, BigInt, Boolean, Undefined, Null, Symbol (primitive types), and Object (non-primitive). Understanding these is crucial for data manipulation!";
            } else if (lowText.includes("react")) {
                response = "React is a popular JavaScript library for building user interfaces, especially single-page applications. Focus on understanding Components, JSX, and Hooks (useState, useEffect) first.";
            } else if (lowText.includes("project")) {
                response = "I recommend starting with a Todo List, then moving to a Weather App using an API, and finally a Portfolio site. These cover DOM manipulation, API fetching, and layout skills.";
            } else if (lowText.includes("job") || lowText.includes("career")) {
                response = "To land a job, build a strong portfolio and practice 'whiteboard' coding questions. Knowing how to explain your code is just as important as writing it!";
            } else if (lowText.includes("css")) {
                response = "CSS (Cascading Style Sheets) is used for styling your HTML. I'd recommend mastering Flexbox and CSS Grid first, as they are essential for modern responsive layouts.";
            } else if (lowText.includes("html")) {
                response = "HTML is the backbone ofทุก web page. Make sure you understand semantic HTML elements (like <main>, <article>, <section>) as they help with SEO and accessibility.";
            }

            setMessages([...newMessages, { role: 'assistant', content: response }]);
            setIsTyping(false);
        }, 2000);
    };

    // Handle progress toggle
    const toggleProgress = (id: string) => {
        if (!isTracking) return;
        setCompletedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const completionPercentage = Math.round((completedIds.length / 22) * 100);

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 border-t-8 border-neo-blue">
            {/* Header Section */}
            <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-8 border-b border-slate-100">
                <button
                    onClick={() => router.push(`/trends?industry=${industry}&experience=${experience}`)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-neo-blue transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Back to Insights
                </button>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-slate-900">
                    {industryName} Developer
                </h1>
                <p className="text-slate-500 font-medium text-lg mb-8">
                    Step by step guide to becoming a modern {industryName.toLowerCase()} developer in 2026
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <nav className="flex gap-2 p-1 bg-slate-50 rounded-lg border border-slate-200">
                        <button
                            onClick={() => setActiveTab("roadmap")}
                            className={`px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "roadmap" ? 'bg-white shadow-sm border border-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-100'}`}
                        >
                            <LayoutPanelTop className="w-4 h-4 text-neo-blue" /> Roadmap
                        </button>
                        <button
                            onClick={() => setActiveTab("projects")}
                            className={`px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "projects" ? 'bg-white shadow-sm border border-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-100'}`}
                        >
                            <Code className="w-4 h-4 text-neo-pink" /> Projects
                        </button>
                        <button
                            onClick={() => setActiveTab("tutor")}
                            className={`px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "tutor" ? 'bg-white shadow-sm border border-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-100'}`}
                        >
                            <Sparkles className="w-4 h-4 text-neo-yellow" /> AI Tutor
                        </button>
                    </nav>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 ${completionPercentage > 0 ? 'bg-neo-blue text-white' : 'bg-neo-yellow text-slate-900'} text-[10px] font-black rounded border border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase tracking-widest transition-all`}>
                            {completionPercentage}% DONE
                        </span>
                        <span className="text-sm font-bold text-slate-500">
                            {isTracking ? "Click nodes to mark as complete" : "Track your progress manually"}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsTracking(!isTracking)}
                        className={`text-sm font-black flex items-center gap-2 transition-all px-4 py-2 rounded-lg border ${isTracking ? 'bg-neo-green text-white border-neo-green' : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'}`}
                    >
                        {isTracking ? <CheckCircle className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        {isTracking ? "Tracking Active" : "Track Progress"}
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col lg:flex-row gap-10 lg:gap-16 relative">
                {/* Sidebar Left */}
                <aside className="lg:w-72 hidden lg:block sticky top-8 h-fit space-y-10">
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Legend</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-neo-blue/20 rounded-full border border-neo-blue flex items-center justify-center">
                                <CheckCircle2 className="w-2.5 h-2.5 text-neo-blue" />
                            </div>
                            <span className="text-xs font-bold text-slate-600 italic">Personal Recommendation</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-neo-yellow/20 rounded-full border border-neo-yellow flex items-center justify-center">
                                <CheckCircle2 className="w-2.5 h-2.5 text-neo-orange" />
                            </div>
                            <span className="text-xs font-bold text-slate-600 italic">Alternative Option</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-slate-100 rounded-full border border-slate-300"></div>
                            <span className="text-xs font-bold text-slate-600 italic">Order not strict on roadmap</span>
                        </div>
                    </div>

                    <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-900 shadow-xl">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Pro Tip</h3>
                        <p className="text-sm font-medium leading-relaxed mb-4">
                            Start with the <span className="text-neo-yellow">Yellow</span> nodes. These are the absolute essentials for any modern developer.
                        </p>
                        <button
                            onClick={() => router.push("/industry-insights")}
                            className="w-full py-2 bg-neo-blue text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-colors"
                        >
                            Reset My Path
                        </button>
                    </div>

                    <div className="p-6 border border-slate-100 rounded-2xl">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 underline underline-offset-8">Related Roadmaps</h3>
                        <ul className="space-y-4">
                            {["JavaScript", "React", "TypeScript", "Node.js"].map((item, i) => (
                                <li
                                    key={i}
                                    onClick={() => router.push(`/trends?industry=${item.toLowerCase()}`)}
                                    className="flex items-center gap-3 group cursor-pointer"
                                >
                                    <div className="w-4 h-4 bg-slate-100 rounded-full border border-slate-300 group-hover:bg-neo-blue/20 group-hover:border-neo-blue transition-colors"></div>
                                    <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{item} Roadmap</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1">
                    {activeTab === "roadmap" && (
                        <div className="flex flex-col items-center relative">
                            {/* Background Line */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block" />

                            {initialNodes.map((node, index) => {
                                const isDone = completedIds.includes(node.id);
                                return (
                                    <div key={node.id} className="relative w-full flex flex-col items-center mb-12">
                                        {/* Main Node */}
                                        <div
                                            onClick={() => toggleProgress(node.id)}
                                            className={`relative z-10 px-12 py-3 border-2 border-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] font-black uppercase tracking-widest text-sm transition-all cursor-pointer group
                                            ${isDone ? 'bg-neo-yellow' : node.status === 'current' ? 'bg-neo-blue text-white' : 'bg-white text-slate-400 border-slate-300'}`}
                                        >
                                            {node.label}

                                            {isDone && (
                                                <div className="absolute -top-3 -right-3 w-6 h-6 bg-white border-2 border-slate-900 rounded-full flex items-center justify-center">
                                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Branching Sub-nodes */}
                                        {node.branches.length > 0 && (
                                            <div className="mt-8 relative w-full flex flex-col items-center md:items-start md:pl-[60%] space-y-3">
                                                {node.branches.map((branch, bi) => {
                                                    const isBranchDone = completedIds.includes(branch.id);
                                                    return (
                                                        <div key={bi} className="flex items-center gap-4 group">
                                                            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-8 h-px border-t border-dashed border-slate-400"></div>

                                                            <div
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleProgress(branch.id);
                                                                }}
                                                                className={`px-4 py-2 border border-slate-300 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all cursor-pointer
                                                                ${isBranchDone ? 'bg-slate-50 text-slate-900 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'bg-white text-slate-400 hover:border-slate-900 hover:text-slate-900 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]'}`}
                                                            >
                                                                {branch.label}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Transition Connector if not last */}
                                        {index < initialNodes.length - 1 && (
                                            <div className="h-12 w-0.5 bg-slate-200 hidden md:block"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {activeTab === "projects" && (
                        <div className="bg-slate-50 border border-slate-200 p-12 rounded-3xl text-center space-y-6">
                            <div className="w-16 h-16 bg-neo-pink/10 rounded-2xl flex items-center justify-center mx-auto">
                                <Code className="w-10 h-10 text-neo-pink" />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tight">Project Ideas</h2>
                            <p className="text-slate-500 font-bold max-w-md mx-auto">Build these to solidify your {industryName} skills.</p>
                            <div className="grid md:grid-cols-2 gap-4 text-left">
                                {[
                                    { title: "Portfolio Website", level: "Beginner" },
                                    { title: "Social Media App", level: "Intermediate" },
                                    { title: "Crypto Tracker", level: "Expert" }
                                ].map((p, i) => (
                                    <div key={i} className="bg-white p-6 border border-slate-200 rounded-xl hover:shadow-lg transition-all cursor-pointer">
                                        <span className="text-[10px] font-black uppercase text-neo-pink">{p.level}</span>
                                        <h3 className="font-bold mt-1 uppercase">{p.title}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "tutor" && (
                        <div className="bg-slate-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-[600px]">
                            {/* Chat Header */}
                            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-neo-yellow/20 rounded-xl flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-neo-yellow" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black uppercase tracking-tight leading-none">AI Career Tutor</h2>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Online & Analyzing Progress</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Feedback</span>
                                </div>
                            </div>

                            {/* Message Window */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-950/50 custom-scrollbar">
                                {messages.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center border-2 border-dashed border-slate-700">
                                            <Sparkles className="w-10 h-10 text-slate-600" />
                                        </div>
                                        <div>
                                            <p className="text-slate-400 font-medium mb-4">Start a session to get personalized <br /> {industryName} career advice.</p>
                                            <button
                                                onClick={handleStartSession}
                                                className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-neo-yellow transition-all shadow-[4px_4px_0px_rgba(255,255,255,0.1)] hover:shadow-none translate-y-0 hover:translate-y-1"
                                            >
                                                Start Session
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    messages.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                            <div className={`max-w-[80%] p-4 rounded-2xl font-bold text-sm leading-relaxed shadow-lg border
                                                ${msg.role === 'user'
                                                    ? 'bg-neo-blue text-white border-blue-400 rounded-tr-none'
                                                    : 'bg-slate-800 text-slate-200 border-slate-700 rounded-tl-none'}`}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))
                                )}
                                {isTyping && (
                                    <div className="flex justify-start animate-in fade-in duration-300">
                                        <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 flex gap-1">
                                            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-6 bg-slate-900 border-t border-slate-800">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const form = e.target as HTMLFormElement;
                                        const input = form.elements.namedItem('chat-input') as HTMLInputElement;
                                        handleSendMessage(input.value);
                                        input.value = '';
                                    }}
                                    className="flex gap-3"
                                >
                                    <input
                                        name="chat-input"
                                        placeholder={messages.length > 0 ? "Ask anything about your path..." : "Click Start Session first..."}
                                        disabled={messages.length === 0 || isTyping}
                                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-neo-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        autoComplete="off"
                                    />
                                    <button
                                        type="submit"
                                        disabled={messages.length === 0 || isTyping}
                                        className="bg-white text-black px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-neo-blue hover:text-white transition-all shadow-[4px_4px_0px_rgba(255,255,255,0.1)] hover:shadow-none disabled:opacity-50"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="mt-20 p-8 bg-neo-yellow/10 border-2 border-dashed border-neo-yellow rounded-3xl text-center max-w-lg mx-auto">
                        <Lightbulb className="w-8 h-8 mx-auto mb-4 text-neo-yellow" />
                        <h3 className="text-lg font-black uppercase mb-2">More Content Coming</h3>
                        <p className="text-sm font-bold text-slate-500 mb-6"> Our AI is constantly mapping out the most efficient paths. Stay tuned for advanced modules.</p>
                        <button className="px-6 py-3 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-xl flex items-center gap-2 mx-auto hover:bg-neo-blue transition-all">
                            Submit a topic <ExternalLink className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* Sidebar Right (Progress / Info) */}
                <aside className="lg:w-72 hidden xl:block sticky top-8 h-fit space-y-8">
                    <div className="border border-slate-200 p-8 rounded-3xl bg-white shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-neo-blue/10 rounded-xl flex items-center justify-center">
                                <Info className="w-5 h-5 text-neo-blue" />
                            </div>
                            <h3 className="font-black text-sm uppercase tracking-tight">Roadmap Key</h3>
                        </div>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            This roadmap is generated based on your <span className="text-slate-900 font-bold">{experience} years of experience</span> in <span className="text-slate-900 font-bold">{industryName}</span>.
                        </p>
                        <hr className="my-6 border-slate-100" />
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs font-bold">
                                <span className="text-slate-400">Completion</span>
                                <span className="text-neo-blue">{completedIds.length} / 22 topics</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-neo-blue transition-all duration-500" style={{ width: `${completionPercentage}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push("/industry-insights")}
                        className="w-full py-6 bg-slate-50 border border-slate-200 rounded-3xl flex flex-col items-center justify-center group hover:bg-white hover:shadow-xl transition-all border-dashed"
                    >
                        <span className="text-xs font-black uppercase text-slate-400 group-hover:text-neo-pink transition-colors">Personalize</span>
                        <span className="text-[10px] font-bold text-slate-400">Adjust career goals</span>
                    </button>

                    <button
                        onClick={() => router.push("/")}
                        className="w-full py-6 border border-slate-100 rounded-3xl flex flex-col items-center justify-center group hover:bg-slate-900 hover:text-white transition-all bg-white"
                    >
                        <span className="text-xs font-black uppercase">Exit Map</span>
                    </button>
                </aside>
            </main>
        </div>
    );
}

export default function Guidance() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-bg-cream flex items-center justify-center font-black uppercase tracking-widest animate-pulse">Building Your Roadmap...</div>}>
            <RoadmapContent />
        </Suspense>
    );
}
