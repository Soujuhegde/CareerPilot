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
import { z } from "zod";

// --- MOCKS & UTILS START ---
const resumeSchema = z.object({
    contactInfo: z.object({
        email: z.string().email("Invalid email").optional().or(z.literal("")),
        mobile: z.string().optional(),
        linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
        twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
    }),
    summary: z.string().optional(),
    skills: z.string().optional(),
    experience: z.array(z.any()),
    education: z.array(z.any()),
    projects: z.array(z.any()),
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

const saveResume = async (content: string) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
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
            entriesToMarkdown(experience, "Work Experience"),
            entriesToMarkdown(education, "Education"),
            entriesToMarkdown(projects, "Projects"),
        ]
            .filter(Boolean)
            .join("\n\n");
    };

    const generatePDF = async () => {
        setIsGenerating(true);
        try {
            const element = document.getElementById("resume-pdf");
            if (!element) return;

            const opt = {
                margin: [15, 15],
                filename: "resume.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            };

            const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default;
            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error("PDF generation error:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const onSubmit: SubmitHandler<ResumeFormValues> = async () => {
        try {
            setIsProcessing(true);
            await saveResume(previewContent);
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
                        onClick={() => setActiveTab("edit")}
                        className={`px-4 py-2 font-black uppercase text-sm tracking-widest flex items-center gap-2 transition-colors ${activeTab === "edit" ? "bg-black text-white" : "text-black hover:bg-gray-100"
                            }`}
                    >
                        <Edit size={16} /> Edit Form
                    </button>
                    <button
                        onClick={() => setActiveTab("preview")}
                        className={`px-4 py-2 font-black uppercase text-sm tracking-widest flex items-center gap-2 transition-colors ${activeTab === "preview" ? "bg-black text-white" : "text-black hover:bg-gray-100"
                            }`}
                    >
                        <Monitor size={16} /> Markdown
                    </button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <Button variant="secondary" size="md" onClick={generatePDF} disabled={isGenerating}>
                        {isGenerating ? <Loader2 className="animate-spin w-4 h-4" /> : <Download className="w-4 h-4" />}
                        Download PDF
                    </Button>
                    <Button onClick={handleSubmit(onSubmit)} disabled={isProcessing}>
                        {isProcessing ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                        Save Resume
                    </Button>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 p-6 md:p-10 bg-bg-cream">
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
                                <Button type="button" variant="outline" size="sm">
                                    <Sparkles className="w-4 h-4 text-neo-pink" />
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
                                    entries={formValues.experience}
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
                                    entries={formValues.education}
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
                                    entries={formValues.projects}
                                    onChange={createEntryHandler("projects")}
                                />
                            </div>
                        </section>

                    </form>
                ) : (
                    <div id="resume-pdf" className="bg-white p-4 md:p-8 neo-border neo-shadow max-w-4xl mx-auto flex flex-col min-h-[600px]" data-color-mode="light">
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
