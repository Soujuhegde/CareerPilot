"use server";

import { callGemini } from "@/lib/gemini";

export async function improveWithAI(content: string, type: "summary" | "experience" | "skills" | "projects"): Promise<string> {
    if (!content) return "";

    const prompt = `You are a professional resume writer. Improve the following ${type} content for a resume. 
Make it professional, impactful, and ATS-friendly. Use strong action verbs and quantifiable achievements where appropriate.
Keep the same general length but make the language far more professional.

Content to improve:
${content}

Return ONLY the improved text, no intro, no outro, no markdown formatting.`;

    return await callGemini(prompt);
}

export async function saveResume(content: string) {
    // Mock implementation using state/local storage simulation for now
    console.log(`[saveResume] Received content (Length: ${content?.length || 0})`);
    if (content) {
        console.log("[saveResume] Content snippet:", content.substring(0, 100) + "...");
    }
    return { success: true };
}

export async function getResume() {
    // Mock implementation
    return { content: "" };
}
