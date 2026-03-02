"use client";

import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

/* ---------------------------------- */
/* Props Type */
/* ---------------------------------- */

interface CoverLetterPreviewProps {
    content: string;
}

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */

export default function CoverLetterPreview({
    content,
}: CoverLetterPreviewProps) {
    const [editableContent, setEditableContent] =
        useState<string>(content);

    const pdfRef = useRef<HTMLDivElement | null>(null);

    /* ---------------------------------- */
    /* Download PDF */
    /* ---------------------------------- */

    const handleDownload = async () => {
        if (!pdfRef.current) {
            toast.error("Download failed: Preview area not found");
            return;
        }

        const downloadToast = toast.loading("Generating your PDF...");

        try {
            const element = pdfRef.current;
            const opt = {
                margin: 0.5,
                filename: `cover-letter-${Date.now()}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    letterRendering: true,
                },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            await html2pdf().from(element).set(opt).save();
            toast.dismiss(downloadToast);
            toast.success("PDF Downloaded Successfully!");
        } catch (err) {
            console.error("PDF Generation Error:", err);
            toast.dismiss(downloadToast);
            toast.error("Failed to generate PDF. Your browser might be blocking the download.");
        }
    };

    /* ---------------------------------- */
    /* Copy to Clipboard */
    /* ---------------------------------- */

    const handleCopy = async () => {
        if (!editableContent) {
            toast.error("Nothing to copy!");
            return;
        }

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(editableContent);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = editableContent;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                } catch (err) {
                    throw new Error("execCommand copy failed");
                }
                document.body.removeChild(textArea);
            }
            toast.success("Copied to clipboard!");
        } catch (err) {
            console.error("Copy Error:", err);
            toast.error("Copy failed. Please select and copy text manually.");
        }
    };

    /* ---------------------------------- */
    /* UI */
    /* ---------------------------------- */

    return (
        <div className="space-y-6">
            {/* Editable Textarea */}
            <div className="relative group">
                <Textarea
                    className="h-[600px] font-mono bg-white text-black neo-border neo-shadow focus:shadow-none transition-all p-8 text-base leading-relaxed resize-none"
                    value={editableContent}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setEditableContent(e.target.value)
                    }
                />
                <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-2 py-1 rounded">Editor View</span>
                </div>
            </div>

            {/* Off-screen PDF Render Area (Must be in DOM and not hidden) */}
            <div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: '-10000px',
                    left: '-10000px',
                    zIndex: -100,
                    pointerEvents: 'none',
                    visibility: 'visible',
                    opacity: 1
                }}
            >
                <div
                    ref={pdfRef}
                    className="bg-white p-12 text-black"
                    style={{
                        width: "816px", // 8.5in at 96dpi
                        minHeight: "1056px", // 11in at 96dpi
                        whiteSpace: "pre-wrap",
                        fontFamily: "'Times New Roman', serif",
                        fontSize: "12pt",
                        lineHeight: "1.6",
                    }}
                >
                    {editableContent}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-6 pt-4">
                <Button
                    onClick={handleDownload}
                    className="flex-1 min-w-[200px] h-14 bg-neo-yellow text-black hover:bg-yellow-400 neo-border neo-shadow-hover text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                >
                    <span className="text-xl">📄</span> Download PDF
                </Button>

                <Button
                    onClick={handleCopy}
                    className="flex-1 min-w-[200px] h-14 bg-neo-yellow text-black hover:bg-yellow-400 neo-border neo-shadow-hover text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                >
                    <span className="text-xl">📋</span> Copy to Clipboard
                </Button>
            </div>
        </div>
    );
}
