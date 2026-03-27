"use server";

import { callGemini } from "@/lib/gemini";

export interface RoadmapBranch {
    id: string;
    label: string;
    status: "done" | "current" | "locked";
}

export interface RoadmapNode {
    id: string;
    label: string;
    description?: string;
    status: "done" | "current" | "locked";
    branches: RoadmapBranch[];
}

export async function generateRoadmap(industry: string, experience: number): Promise<RoadmapNode[]> {
    if (!industry) {
        throw new Error("Industry is required to generate a roadmap.");
    }

    const payload: any[] = [
        `Act as an expert Career Counselor.
Create a highly specific, step-by-step career and learning roadmap for a professional in the "${industry}" industry with ${experience} years of experience.

Return a valid JSON array of objects (no markdown blocks, ONLY raw JSON) matching this exact format:
[
  {
    "id": "unique-string-id",
    "label": "Main Topic / Skill",
    "description": "Short description of this stage",
    "status": "locked", 
    "branches": [
      { "id": "subtopic-id-1", "label": "Specific Sub-topic 1", "status": "locked" },
      { "id": "subtopic-id-2", "label": "Specific Sub-topic 2", "status": "locked" }
    ]
  }
]

Rules:
- Generate exactly 6-8 main sequential nodes specific to ${industry}.
- For each main node, provide 2-4 highly specific branches.
- "status" logic based on their ${experience} years of experience: Use "done" for foundational early steps they already know, "current" for the immediate next logical step they should learn, and "locked" for advanced future steps.
- DO NOT return generic web development nodes (HTML/CSS) UNLESS their chosen industry is web development. Make it completely customized to ${industry}.
- Output ONLY the JSON array.`
    ];

    try {
        const responseText = await callGemini(payload);
        try {
            return JSON.parse(responseText);
        } catch (parseErr) {
            console.error("Parse error:", parseErr, "Raw HTML/Text:", responseText);
            throw new Error("Failed to parse AI roadmap result.");
        }
    } catch (err: any) {
        console.error("Gemini AI API Error:", err);
        throw new Error(err.message || "Failed to generate AI roadmap result.");
    }
}
