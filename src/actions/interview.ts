"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

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
export async function generateQuiz(): Promise<QuizQuestion[]> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a quiz with exactly 10 career and professional skills questions. 
Each question should test knowledge on topics like job interviews, resume writing, workplace communication, leadership, productivity, or industry trends.

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
- Each question has exactly 4 options
- correctAnswer must exactly match one of the options
- Keep questions clear and professional`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Strip markdown code fences if present
    const cleaned = text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/, "")
        .trim();

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
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const tipPrompt = `A candidate answered these quiz questions incorrectly:\n${wrongQuestions
                .slice(0, 3)
                .map((q, i) => `${i + 1}. ${q}`)
                .join(
                    "\n"
                )}\n\nGive a short, encouraging improvement tip (2-3 sentences max) focused on what they should study or practice. Be direct and actionable.`;

            const result = await model.generateContent(tipPrompt);
            improvementTip = result.response.text().trim();
        } catch {
            improvementTip = "Review the topics you found challenging and practice more sample questions!";
        }
    }

    return {
        quizScore: score,
        improvementTip,
        questions: processedQuestions,
    };
}
