"use server";

import { callGemini } from "@/lib/gemini";

export interface CoverLetterResult {
    id: string;
    fullName: string;
    jobTitle: string;
    companyName: string;
    tone: string;
    content: string;
}

export async function generateCoverLetter(data: {
    fullName: string;
    tone: string;
    companyName: string;
    jobTitle: string;
    jobDescription: string;
}): Promise<CoverLetterResult> {
    const { fullName, tone, companyName, jobTitle, jobDescription } = data;

    const toneDescriptions: Record<string, string> = {
        professional: "formal, polished, and professional",
        friendly: "warm, conversational, and approachable",
        enthusiastic: "energetic, passionate, and highly motivated",
    };

    const toneDesc = toneDescriptions[tone] || "professional";

    const prompt = `Write a compelling cover letter for a job application with the following details:

Applicant Name: ${fullName}
Job Title: ${jobTitle}
Company Name: ${companyName}
Tone: ${toneDesc}
Job Description:
${jobDescription}

Instructions:
- Write the cover letter in a ${toneDesc} tone
- Address it to "Dear Hiring Manager,"
- Include 3-4 paragraphs: opening, why you are a fit, what you bring, and a closing
- Reference specific details from the job description naturally
- End with "Sincerely," followed by the applicant's name
- Do NOT include any markdown, asterisks, or formatting symbols
- Output ONLY the plain text cover letter, nothing else`;

    const content = await callGemini(prompt);

    const id = Math.random().toString(36).substring(2, 10);

    return {
        id,
        fullName,
        jobTitle,
        companyName,
        tone,
        content,
    };
}

export async function deleteCoverLetter(id: string): Promise<void> {
    // No-op without DB
    return Promise.resolve();
}
