"use server";

import { callGemini } from "@/lib/gemini";

export interface AtsResult {
    score: number;
    summary: string;
    details: {
        category: string;
        score: number;
        findings: string[];
        suggestions: string[];
    }[];
    impactKeywords: string[];
    missingKeywords: string[];
}

/**
 * Main action to get ATS score. Support both text and file data.
 */
export async function getAtsScore(
    resumeText?: string,
    fileData?: { base64: string; mimeType: string }
): Promise<AtsResult> {
    if (!resumeText && !fileData) {
        throw new Error("No resume content provided.");
    }

    const payload: any[] = [
        `Analyze the following resume for ATS (Applicant Tracking System) compatibility. 
Rate it on a scale of 0-100 and provide detailed feedback.

Return a valid JSON object (no markdown) with this exact structure:
{
  "score": 85,
  "summary": "Overall professional summary...",
  "details": [
    {
      "category": "Contact Information",
      "score": 100,
      "findings": ["Email and phone found"],
      "suggestions": []
    },
    {
      "category": "Skills & Keywords",
      "score": 70,
      "findings": ["Good technical skills section"],
      "suggestions": ["Add more specific cloud technologies"]
    },
    {
      "category": "Formatting & Structure",
      "score": 80,
      "findings": ["Clear hierarchy"],
      "suggestions": ["Use simpler headers"]
    }
  ],
  "impactKeywords": ["Architect", "Led", "Optimized"],
  "missingKeywords": ["Kubernetes", "CI/CD"]
}

Rules:
- score: 0-100
- summary: 2-3 sentences
- details: exactly 3-4 categories
- Return ONLY the raw JSON object`
    ];

    if (resumeText) {
        payload.push(`Resume Text:\n${resumeText}`);
    }

    if (fileData) {
        payload.push({
            inlineData: {
                data: fileData.base64,
                mimeType: fileData.mimeType,
            },
        });
    }

    const responseText = await callGemini(payload);

    try {
        return JSON.parse(responseText);
    } catch (err) {
        console.error("Parse error:", err, "Raw response:", responseText);
        throw new Error("Failed to parse ATS analysis result.");
    }
}
