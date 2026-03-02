import { useState, useEffect, useCallback } from "react";

export interface StoredAssessment {
    id: string;
    createdAt: string;
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

const STORAGE_KEY = "careerpilot_quiz_history";

export function useQuizHistory() {
    const [assessments, setAssessments] = useState<StoredAssessment[]>([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setAssessments(JSON.parse(stored));
            }
        } catch {
            setAssessments([]);
        }
    }, []);

    const addAssessment = useCallback((result: Omit<StoredAssessment, "id" | "createdAt">) => {
        const newAssessment: StoredAssessment = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            ...result,
        };
        setAssessments((prev) => {
            const updated = [newAssessment, ...prev];
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch {
                // quota exceeded – ignore
            }
            return updated;
        });
        return newAssessment;
    }, []);

    return { assessments, addAssessment };
}
