import StatsCards from "./components/stats-cards";
import PerformanceChart from "./components/performance-chart";
import QuizList from "./components/quiz-list";

/* ✅ Shared types (ideally move to types/interview.ts) */
interface Question {
    question: string;
    userAnswer: string;
    answer: string;
    explanation: string;
    isCorrect: boolean;
}

interface Assessment {
    id: string;
    createdAt: string | Date;
    quizScore: number;
    improvementTip?: string;
    questions: Question[];
}

export default async function InterviewPrepPage() {
    const assessments: Assessment[] = [];

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-6xl font-bold gradient-title">
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
