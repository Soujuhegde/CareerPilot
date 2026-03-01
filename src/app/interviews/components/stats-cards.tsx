"use client";

import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* ✅ Question type */
interface Question {
  question: string;
  userAnswer: string;
  answer: string;
  explanation: string;
  isCorrect: boolean;
}

/* ✅ Assessment type */
interface Assessment {
  quizScore: number;
  questions: Question[];
}

/* ✅ Props type */
interface StatsCardsProps {
  assessments?: Assessment[];
}

export default function StatsCards({ assessments }: StatsCardsProps) {
  const getAverageScore = (): string => {
    if (!assessments?.length) return "0";

    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );

    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = (): Assessment | null => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = (): number => {
    if (!assessments?.length) return 0;

    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  const latestScore = getLatestAssessment()?.quizScore?.toFixed(1) ?? "0";

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Score
          </CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {getAverageScore()}%
          </div>
          <p className="text-xs text-muted-foreground">
            Across all assessments
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Questions Practiced
          </CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {getTotalQuestions()}
          </div>
          <p className="text-xs text-muted-foreground">
            Total questions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Latest Score
          </CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {latestScore}%
          </div>
          <p className="text-xs text-muted-foreground">
            Most recent quiz
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
