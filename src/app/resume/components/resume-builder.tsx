"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Download,
    Edit,
    Loader2,
    Monitor,
    Save,
    Sparkles,
    User,
    Phone,
    Mail,
    Linkedin,
    Twitter
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/Button";
import { EntryForm, EntryParams } from "./entry-form";
import { improveWithAI, saveResume } from "@/actions/resume";
import { z } from "zod";

// --- MOCKS & UTILS START ---
const resumeSchema = z.object({
    contactInfo: z.object({
        email: z.any().optional(),
        mobile: z.any().optional(),
        linkedin: z.any().optional(),
        twitter: z.any().optional(),
    }).optional(),
    summary: z.any().optional(),
    skills: z.any().optional(),
    experience: z.any().optional(),
    education: z.any().optional(),
    projects: z.any().optional(),
});

type ResumeFormValues = z.infer<typeof resumeSchema>;

const entriesToMarkdown = (entries: any[], title: string) => {
    if (!entries || entries.length === 0) return "";
    const header = `## ${title}\n\n`;
    const content = entries
        .map(
            (entry) =>
                `### **${entry.title}** @ ${entry.organization}\n*${entry.current
                    ? `${entry.startDate} - Present`
                    : `${entry.startDate} - ${entry.endDate}`
                }*\n\n${entry.description}`
        )
        .join("\n\n");
    return header + content;
};

// --- MOCKS & UTILS END ---

interface ResumeBuilderProps {
    initialContent?: string;
}

export default function ResumeBuilder({
    initialContent = "",
}: ResumeBuilderProps) {
    const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
    const [previewContent, setPreviewContent] = useState<string>(initialContent);
    const [userFullName] = useState<string>("John Doe");
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ResumeFormValues>({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            contactInfo: { email: "", mobile: "", linkedin: "", twitter: "" },
            summary: "",
            skills: "",
            experience: [],
            education: [],
            projects: [],
        },
    });

    const formValues = watch();

    // Debugging: Watch form errors
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            console.log("Current Form Errors:", errors);
        }
    }, [errors]);

    useEffect(() => {
        if (initialContent) setActiveTab("preview");
    }, [initialContent]);

    useEffect(() => {
        if (activeTab === "edit") {
            const newContent = getCombinedContent();
            setPreviewContent(newContent || initialContent);
        }
    }, [formValues, activeTab]);

    const getContactMarkdown = (): string => {
        const { contactInfo } = formValues;
        const parts: string[] = [];

        if (contactInfo?.email) parts.push(`📧 ${contactInfo.email}`);
        if (contactInfo?.mobile) parts.push(`📱 ${contactInfo.mobile}`);
        if (contactInfo?.linkedin)
            parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
        if (contactInfo?.twitter)
            parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

        return parts.length > 0
            ? `## <div align="center">${userFullName}</div>\n\n<div align="center">\n\n${parts.join(
                " | "
            )}\n\n</div>`
            : "";
    };

    const getCombinedContent = (): string => {
        const { summary, skills, experience, education, projects } = formValues;

        return [
            getContactMarkdown(),
            summary && `## Professional Summary\n\n${summary}`,
            skills && `## Skills\n\n${skills}`,
            entriesToMarkdown(experience || [], "Work Experience"),
            entriesToMarkdown(education || [], "Education"),
            entriesToMarkdown(projects || [], "Projects"),
        ]
            .filter(Boolean)
            .join("\n\n");
    };

    const handleImproveSummary = async () => {
        const currentSummary = watch("summary");
        if (!currentSummary) {
            toast.error("Please enter some summary text first!");
            return;
        }

        try {
            setIsProcessing(true);
            const improved = await improveWithAI(currentSummary, "summary");
            setValue("summary", improved);
            toast.success("Summary improved by AI!");
        } catch (error: any) {
            console.error("AI improvement error:", error);
            toast.error(error.message || "Failed to improve summary");
        } finally {
            setIsProcessing(false);
        }
    };

    const generatePDF = async () => {
        setIsGenerating(true);
        try {
            // Create a dedicated off-screen container for high-quality rendering
            const element = document.getElementById("resume-pdf");
            if (!element) return;

            const opt = {
                margin: [0, 0],
                filename: `${userFullName.replace(/\s+/g, "_")}_Resume.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    backgroundColor: "#ffffff",
                    windowWidth: 800 // Consistent width for rendering
                },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            };

            const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default;
            await html2pdf().set(opt).from(element).save();
            toast.success("Resume downloaded!");
        } catch (error) {
            console.error("PDF generation error:", error);
            toast.error("Failed to generate PDF");
        } finally {
            setIsGenerating(false);
        }
    };

    const onSubmit: SubmitHandler<ResumeFormValues> = async (data) => {
        try {
            setIsProcessing(true);
            console.log("Form Data:", data);
            const content = getCombinedContent();
            await saveResume(content);
            toast.success("Resume saved successfully!");
        } catch (error) {
            console.error("Save error:", error);
            toast.error("Failed to save resume");
        } finally {
            setIsProcessing(false);
        }
    };

    // Safe wrapper for EntryForm onChange
    const createEntryHandler = (field: "experience" | "education" | "projects") => (entries: EntryParams[]) => {
        setValue(field, entries);
    };

    return (
        <div className="w-full flex flex-col neo-border neo-shadow-lg bg-white overflow-hidden">
            {/* HEADER / TOOLBAR */}
            <div className="bg-neo-pink p-4 flex flex-col sm:flex-row justify-between items-center neo-border-b gap-4">
                <div className="flex bg-white neo-border-thin p-1 rounded-sm overflow-hidden">
                    <button
                        type="button"
                        onClick={() => setActiveTab("edit")}
                        className={`px-4 py-2 font-black uppercase text-sm tracking-widest flex items-center gap-2 transition-colors ${activeTab === "edit" ? "bg-black text-white" : "text-black hover:bg-gray-100"
                            }`}
                    >
                        <Edit size={16} /> Edit Form
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("preview")}
                        className={`px-4 py-2 font-black uppercase text-sm tracking-widest flex items-center gap-2 transition-colors ${activeTab === "preview" ? "bg-black text-white" : "text-black hover:bg-gray-100"
                            }`}
                    >
                        <Monitor size={16} /> Markdown
                    </button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <Button type="button" variant="secondary" size="md" onClick={generatePDF} disabled={isGenerating}>
                        {isGenerating ? <Loader2 className="animate-spin w-4 h-4" /> : <Download className="w-4 h-4" />}
                        Download PDF
                    </Button>
                    <Button onClick={handleSubmit(onSubmit, (errors) => {
                        toast.error("Please fix the errors in your resume form.");
                        console.error("RESOLVED VALIDATION ERRORS:", JSON.stringify(errors, null, 2));
                    })} disabled={isProcessing}>
                        {isProcessing ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                        Save Resume
                    </Button>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 p-6 md:p-10 bg-bg-cream">
                {/* HIDDEN RENDERER FOR PDF GENERATION (Always in DOM) */}
                <div
                    id="resume-pdf"
                    className="hidden-for-pdf bg-white p-8 max-w-4xl mx-auto"
                    style={{
                        position: 'fixed',
                        left: '-9999px',
                        top: '0',
                        width: '210mm',
                        backgroundColor: 'white',
                        zIndex: -1,
                        overflow: 'hidden'
                    }}
                >
                    <div className="prose prose-black prose-h2:uppercase prose-h2:tracking-wider prose-h3:text-neo-pink w-full">
                        <MDEditor.Markdown source={getCombinedContent()} style={{ background: 'white', color: 'black' }} />
                    </div>
                </div>

                {activeTab === "edit" ? (
                    <form className="space-y-12">

                        {/* CONTACT INFO */}
                        <section className="bg-white p-6 neo-border neo-shadow relative">
                            <div className="absolute -top-3 -left-3 bg-neo-yellow neo-border neo-shadow-sm px-4 py-1 font-black uppercase tracking-widest text-sm">
                                Contact Info
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div className="space-y-2">
                                    <label className="font-bold text-xs uppercase tracking-wider block">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input className="w-full pl-10 pr-4 py-3 neo-border-thin bg-bg-cream font-bold text-sm" placeholder="john@example.com" {...register("contactInfo.email")} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-xs uppercase tracking-wider block">Mobile Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input className="w-full pl-10 pr-4 py-3 neo-border-thin bg-bg-cream font-bold text-sm" placeholder="+1 234 567 8900" {...register("contactInfo.mobile")} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-xs uppercase tracking-wider block">LinkedIn URL</label>
                                    <div className="relative">
                                        <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input className="w-full pl-10 pr-4 py-3 neo-border-thin bg-bg-cream font-bold text-sm" placeholder="https://linkedin.com/in/..." {...register("contactInfo.linkedin")} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-xs uppercase tracking-wider block">Twitter URL</label>
                                    <div className="relative">
                                        <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input className="w-full pl-10 pr-4 py-3 neo-border-thin bg-bg-cream font-bold text-sm" placeholder="https://twitter.com/..." {...register("contactInfo.twitter")} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SUMMARY */}
                        <section className="bg-white p-6 neo-border neo-shadow relative">
                            <div className="absolute -top-3 -left-3 bg-neo-blue text-white neo-border neo-shadow-sm px-4 py-1 font-black uppercase tracking-widest text-sm">
                                Professional Summary
                            </div>
                            <div className="mt-4 space-y-4">
                                <textarea
                                    className="w-full h-32 p-4 neo-border-thin bg-bg-cream font-medium text-sm leading-relaxed block"
                                    placeholder="Write a brief professional summary..."
                                    {...register("summary")}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleImproveSummary}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-neo-pink" />}
                                    Improve with AI
                                </Button>
                            </div>
                        </section>

                        {/* SKILLS */}
                        <section className="bg-white p-6 neo-border neo-shadow relative">
                            <div className="absolute -top-3 -left-3 bg-[#FF90E8] text-black neo-border neo-shadow-sm px-4 py-1 font-black uppercase tracking-widest text-sm">
                                Technical Skills
                            </div>
                            <div className="mt-4 space-y-4">
                                <textarea
                                    className="w-full h-24 p-4 neo-border-thin bg-bg-cream font-medium text-sm leading-relaxed block"
                                    placeholder="List your skills separated by commas..."
                                    {...register("skills")}
                                />
                            </div>
                        </section>

                        {/* EXPERIENCE */}
                        <section className="bg-white p-6 sm:p-8 neo-border neo-shadow relative">
                            <div className="absolute -top-3 -left-3 bg-[#FFD400] text-black neo-border neo-shadow-sm px-4 py-1 font-black uppercase tracking-widest text-sm">
                                Work Experience
                            </div>
                            <div className="mt-6">
                                <EntryForm
                                    type="Experience"
                                    entries={formValues.experience || []}
                                    onChange={createEntryHandler("experience")}
                                />
                            </div>
                        </section>

                        {/* EDUCATION */}
                        <section className="bg-white p-6 sm:p-8 neo-border neo-shadow relative">
                            <div className="absolute -top-3 -left-3 bg-[#00FF00] text-black neo-border neo-shadow-sm px-4 py-1 font-black uppercase tracking-widest text-sm">
                                Education
                            </div>
                            <div className="mt-6">
                                <EntryForm
                                    type="Education"
                                    entries={formValues.education || []}
                                    onChange={createEntryHandler("education")}
                                />
                            </div>
                        </section>

                        {/* PROJECTS */}
                        <section className="bg-white p-6 sm:p-8 neo-border neo-shadow relative">
                            <div className="absolute -top-3 -left-3 bg-black text-white neo-border neo-shadow-sm px-4 py-1 font-black uppercase tracking-widest text-sm">
                                Projects
                            </div>
                            <div className="mt-6">
                                <EntryForm
                                    type="Project"
                                    entries={formValues.projects || []}
                                    onChange={createEntryHandler("projects")}
                                />
                            </div>
                        </section>

                    </form>
                ) : (
                    <div className="bg-white p-4 md:p-8 neo-border neo-shadow max-w-4xl mx-auto flex flex-col min-h-[600px]" data-color-mode="light">
                        {previewContent ? (
                            <div className="flex-1 w-full prose prose-black prose-h2:uppercase prose-h2:tracking-wider prose-h3:text-neo-pink">
                                <MDEditor
                                    value={previewContent}
                                    onChange={(val) => setPreviewContent(val || "")}
                                    preview="edit"
                                    height="100%"
                                    className="min-h-[500px] font-sans border-0 w-full"
                                    hideToolbar={false}
                                />
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-center text-gray-400 font-bold">
                                No content yet. Switch to Edit Mode to build your resume.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
