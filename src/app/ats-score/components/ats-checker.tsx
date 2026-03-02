"use client";

import { useState } from "react";
import {
    Upload,
    FileText as ClipboardIcon,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ChevronRight,
    TrendingUp,
    FileText,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getAtsScore, AtsResult } from "@/actions/ats";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function ATSChecker() {
    const [activeTab, setActiveTab] = useState<"upload" | "paste">("paste");
    const [resumeText, setResumeText] = useState("");
    const [fileData, setFileData] = useState<{ base64: string; mimeType: string } | null>(null);
    const [fileName, setFileName] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<AtsResult | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "text/plain",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
            "image/png",
            "image/jpeg",
        ];

        if (!allowedTypes.includes(file.type) && !file.name.endsWith(".txt") && !file.name.endsWith(".docx")) {
            toast.error("Unsupported file type. Please use PDF, DOCX, TXT or Images!");
            return;
        }

        setFileName(file.name);

        const reader = new FileReader();

        if (file.type === "text/plain" || file.name.endsWith(".txt")) {
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setResumeText(text);
                setFileData(null);
                toast.success("Text file content loaded!");
            };
            reader.readAsText(file);
        } else {
            // Multimodal: PDF, DOCX, Images
            reader.onload = (e) => {
                const base64 = (e.target?.result as string).split(",")[1];
                setFileData({ base64, mimeType: file.type || "application/octet-stream" });
                setResumeText(""); // Clear text if file is used
                toast.success(`${file.name} ready for AI analysis!`);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCheck = async () => {
        if (!resumeText && !fileData) {
            toast.error("Please paste your resume or upload a file first!");
            return;
        }

        setIsProcessing(true);
        try {
            const data = await getAtsScore(resumeText || undefined, fileData || undefined);
            setResult(data);
            toast.success("Analysis complete!");
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to analyze resume");
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setResult(null);
        setResumeText("");
        setFileData(null);
        setFileName("");
    };

    if (result) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl space-y-8"
            >
                <div className="bg-white neo-border p-8 neo-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <TrendingUp className="w-12 h-12 text-neo-pink opacity-20" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
                        <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    fill="transparent"
                                    stroke="#e5e7eb"
                                    strokeWidth="12"
                                />
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    fill="transparent"
                                    stroke="#FFD400"
                                    strokeWidth="12"
                                    strokeDasharray={440}
                                    strokeDashoffset={440 - (440 * result.score) / 100}
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <span className="absolute text-4xl font-black">{result.score}%</span>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-black uppercase tracking-tight mb-2">ATS Compatibility Score</h2>
                            <p className="text-gray-600 font-bold leading-relaxed">{result.summary}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {result.details.map((detail, idx) => (
                            <div key={idx} className="neo-border-thin p-5 bg-bg-cream">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-black uppercase text-sm tracking-wider">{detail.category}</h3>
                                    <span className="font-black text-neo-blue">{detail.score}%</span>
                                </div>
                                <div className="space-y-2">
                                    {detail.findings.map((f, i) => (
                                        <div key={i} className="flex gap-2 items-start text-xs font-bold">
                                            <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                                            <span>{f}</span>
                                        </div>
                                    ))}
                                    {detail.suggestions.map((s, i) => (
                                        <div key={i} className="flex gap-2 items-start text-xs font-bold text-neo-pink">
                                            <Zap className="w-3 h-3 shrink-0 mt-0.5" />
                                            <span>{s}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-neo-blue text-white neo-border p-6 neo-shadow">
                        <h3 className="font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" /> Strong Keywords
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {result.impactKeywords.map((k, i) => (
                                <span key={i} className="px-3 py-1 bg-white text-black text-xs font-black neo-border-thin">
                                    {k}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-neo-pink text-white neo-border p-6 neo-shadow">
                        <h3 className="font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" /> Missing Keywords
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {result.missingKeywords.map((k, i) => (
                                <span key={i} className="px-3 py-1 bg-white text-black text-xs font-black neo-border-thin">
                                    {k}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button onClick={reset} size="lg" variant="secondary">
                        Check Another Resume
                    </Button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="w-full max-w-2xl bg-white neo-border p-8 neo-shadow relative">
            <div className="flex mb-8 bg-bg-cream neo-border-thin p-1 rounded-sm">
                <button
                    onClick={() => setActiveTab("paste")}
                    className={`flex-1 py-3 font-black uppercase text-sm flex items-center justify-center gap-2 transition-all ${activeTab === "paste" ? "bg-black text-white" : "hover:bg-gray-100"}`}
                >
                    <ClipboardIcon className="w-4 h-4" /> Paste Resume
                </button>
                <button
                    onClick={() => setActiveTab("upload")}
                    className={`flex-1 py-3 font-black uppercase text-sm flex items-center justify-center gap-2 transition-all ${activeTab === "upload" ? "bg-black text-white" : "hover:bg-gray-100"}`}
                >
                    <Upload className="w-4 h-4" /> Upload File
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === "paste" ? (
                    <motion.div
                        key="paste"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <textarea
                            className="w-full h-64 p-6 bg-bg-cream neo-border-thin font-bold text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-neo-yellow transition-all"
                            placeholder="Paste your full resume content here (Ctrl+V)..."
                            value={resumeText}
                            onChange={(e) => setResumeText(e.target.value)}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="neo-border-dashed p-12 flex flex-col items-center justify-center bg-bg-cream cursor-pointer hover:bg-white transition-colors relative group">
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept=".pdf,.txt,.docx,.png,.jpg,.jpeg"
                                onChange={handleFileUpload}
                            />
                            <div className="w-20 h-20 bg-neo-yellow rounded-full flex items-center justify-center mb-6 neo-border group-hover:scale-110 transition-transform">
                                <FileText className="w-10 h-10" />
                            </div>
                            {fileName ? (
                                <div className="text-center">
                                    <h3 className="text-xl font-black uppercase mb-1">{fileName}</h3>
                                    <p className="text-neo-blue font-bold mb-4">File successfully loaded! Click analyze below.</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <h3 className="text-xl font-black uppercase mb-2">Drop your resume here</h3>
                                    <p className="text-gray-500 font-bold mb-4">or click to browse files</p>
                                </div>
                            )}
                            <span className="px-4 py-1 bg-black text-white text-xs font-black uppercase tracking-widest">
                                Supports PDF, Images, DOCX & TXT
                            </span>
                        </div>
                        <div className="p-4 bg-neo-blue/5 border-l-4 border-neo-blue">
                            <p className="text-sm font-bold text-neo-blue flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" /> Tip: Multimodal AI analyzes your file's layout and content!
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-8">
                <Button
                    className="w-full py-6 text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                    size="lg"
                    variant="primary"
                    onClick={handleCheck}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Analyzing with Multimodal AI...
                        </>
                    ) : (
                        <>
                            Analyze Resume Compatibility
                            <ChevronRight className="w-6 h-6" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}

// Icons not found in lucide-react? Fixed standard icons.
