"use server";

import { callGemini } from "@/lib/gemini";

export interface Course {
  title: string;
  platform: string;
  level: string;
  duration: string;
  url: string;
  description: string;
}

export interface CurriculumModule {
  title: string;
  description: string;
  keyTopics: string[];
}

export interface CourseRecommendationResult {
  careerGoal: string;
  roadmapDescription: string;
  curriculum: CurriculumModule[];
  recommendedCourses: Course[];
}

export async function getCourseRecommendations(query: string): Promise<CourseRecommendationResult> {
  if (!query || query.length < 3) {
    throw new Error("Please enter a valid career goal or topic.");
  }

  const prompt = `Act as an AI Career Counselor. Based on the career goal or topic: "${query}", generate a structured learning path (curriculum) and recommend top-tier courses from platforms like Coursera, Udemy, edX, LinkedIn Learning, or YouTube.

Return a valid JSON object (no markdown) with this exact structure:
{
  "careerGoal": "User's goal",
  "roadmapDescription": "A high-level overview of the learning journey...",
  "curriculum": [
    {
      "title": "Module Name (e.g., Fundamentals)",
      "description": "Brief summary",
      "keyTopics": ["Topic 1", "Topic 2"]
    }
  ],
  "recommendedCourses": [
    {
      "title": "Course Full Title",
      "platform": "Platform Name",
      "level": "Beginner/Intermediate/Advanced",
      "duration": "Duration (e.g., 4 weeks)",
      "url": "A realistic link to search for this course (or actual home link)",
      "description": "Why this course is good"
    }
  ]
}

Rules:
- curriculum: 4-6 sequential modules
- recommendedCourses: 3-5 high-quality courses
- Return ONLY the JSON object. No other text.`;

  try {
    const cleaned = await callGemini([prompt]);
    return JSON.parse(cleaned);
  } catch (error: any) {
    console.error("Error in getCourseRecommendations:", error);
    throw new Error(error.message || "Failed to generate recommendations.");
  }
}
