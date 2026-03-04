"use client";

import StatsCards from "./components/stats-cards";
import PerformanceChart from "./components/performance-chart";
import QuizList from "./components/quiz-list";
import { useQuizHistory } from "@/hooks/use-quiz-history";

export default function InterviewPrepPage() {
    const { assessments } = useQuizHistory();

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-title">
                    Interview Preparation
                </h1>
            </div>

            <div className="space-y-6">
                <StatsCards assessments={assessments} />
                <PerformanceChart assessments={assessments} />
                <QuizList assessments={assessments} />
            </div>
        </div>
    );
}
