"use server";

import { callGemini } from "@/lib/gemini";

export interface JobMatch {
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    matchScore: number;
    description: string;
    skills: string[];
}

export interface JobMatchResult {
    query: string;
    summary: string;
    matches: JobMatch[];
}

export async function getJobMatches(query: string): Promise<JobMatchResult> {
    if (!query || query.length < 3) {
        throw new Error("Please enter a valid career title or interest.");
    }

    const prompt = `Act as an AI Job Matching Engine. Based on the user's career interest/title: "${query}", project 3 highly relevant and realistic job opportunities that would exist in the current market.

Return a valid JSON object (no markdown) with this exact structure:
{
  "query": "User's search",
  "summary": "AI summary of why these jobs were matched...",
  "matches": [
    {
      "title": "Job Title (e.g., Senior Frontend Engineer)",
      "company": "A realistic company name (e.g., Vercel, Stripe, or a generic but professional one)",
      "location": "City, Country or 'Remote'",
      "salary": "Estimated salary range (e.g., $120k - $150k)",
      "type": "Full-time / Part-time / Contract",
      "matchScore": 85,
      "description": "Brief summary of the role's impact",
      "skills": ["Skill 1", "Skill 2", "Skill 3"]
    }
  ]
}

Rules:
- matches: exactly 3 jobs
- matchScore: a realistic percentage matching the user's query (80-99)
- Return ONLY the raw JSON object. No other text.`;

    try {
        const cleaned = await callGemini([prompt]);
        return JSON.parse(cleaned);
    } catch (error: any) {
        console.error("Error in getJobMatches:", error);
        throw new Error(error.message || "Failed to find job matches.");
    }
}
