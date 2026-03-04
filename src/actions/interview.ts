"use server";

import { callGemini } from "@/lib/gemini";

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

interface QuizResultData {
    quizScore: number;
    improvementTip?: string;
    questions: {
        question: string;
        userAnswer: string;
        answer: string;
        explanation: string;
        isCorrect: boolean;
    }[];
}

/**
 * Generates 10 quiz questions using the Gemini API.
 */
export async function generateQuiz(
    industry?: string,
    skills?: string[]
): Promise<QuizQuestion[]> {
    const personalityContext = (industry || skills?.length)
        ? `targeting the ${industry || "general"} industry and focusing 
        on skills like ${skills?.join(", ") || "professional communication"}`
        : "on career and professional skills";

    const prompt = `Generate a quiz with exactly 10 high-quality questions ${personalityContext}. 
Each question should be practical and scenarios-based. 
Ensure these questions are completely NEW and DIFFERENT from any
 standard list—vary the topics across technical knowledge, situational judgment, and soft skills relevant to this context.

Return a valid JSON array (no markdown, no code blocks) in this exact format:
[
  {
    "question": "Question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A",
    "explanation": "Brief explanation of why this is correct"
  }
]

Rules:
- Exactly 10 questions
- Exactly 4 options per question
- correctAnswer MUST exactly match one of the options
- Do not repeat questions from previous calls
- Output ONLY the JSON array`;

    const cleaned = await callGemini(prompt);

    let questions: QuizQuestion[];
    try {
        questions = JSON.parse(cleaned);
    } catch {
        throw new Error("Failed to parse quiz questions from AI response.");
    }

    if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("AI returned an invalid quiz format.");
    }

    return questions;
}

/**
 * Calculates the quiz result locally (no DB needed).
 * Generates an improvement tip using Gemini based on wrong answers.
 */
export async function saveQuizResult(
    questions: QuizQuestion[],
    answers: (string | null)[],
    score: number
): Promise<QuizResultData> {
    const processedQuestions = questions.map((q, i) => ({
        question: q.question,
        userAnswer: answers[i] ?? "Not answered",
        answer: q.correctAnswer,
        explanation: q.explanation,
        isCorrect: answers[i] === q.correctAnswer,
    }));

    const wrongQuestions = processedQuestions
        .filter((q) => !q.isCorrect)
        .map((q) => q.question);

    let improvementTip: string | undefined;

    if (wrongQuestions.length > 0) {
        const tipPrompt = `A candidate answered these quiz questions incorrectly:\n${wrongQuestions
            .slice(0, 3)
            .map((q, i) => `${i + 1}. ${q}`)
            .join(
                "\n"
            )}\n\nGive a short, encouraging improvement tip (2-3 sentences max) focused on what
             they should study or practice. Be direct and actionable.`;

        try {
            improvementTip = await callGemini(tipPrompt);
        } catch (err: any) {
            console.error("Gemini Tip Generation Error:", err);
            improvementTip = "Review the topics you found challenging and practice more sample questions!";
        }
    }

    return {
        quizScore: score,
        improvementTip,
        questions: processedQuestions,
    };
}
