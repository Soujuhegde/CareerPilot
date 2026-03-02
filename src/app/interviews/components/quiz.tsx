"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { BUTTONS_MENUS } from "@/lib/constants";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { useQuizHistory } from "@/hooks/use-quiz-history";
import { BarLoader } from "react-spinners";

/* ✅ Quiz Question Type */
interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

/* ✅ Result Type (must match your QuizResult component) */
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

import { useSearchParams } from "next/navigation";

export default function Quiz() {
    const searchParams = useSearchParams();
    const industry = searchParams.get("industry") || undefined;
    const skills = searchParams.get("skills")?.split(",").map(s => s.trim()).filter(Boolean);

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answers, setAnswers] = useState<(string | null)[]>([]);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);
    const { addAssessment } = useQuizHistory();

    const {
        loading: generatingQuiz,
        fn: generateQuizFn,
        data: quizData,
    } = useFetch<QuizQuestion[]>(generateQuiz);

    const handleStartQuiz = () => {
        generateQuizFn(industry, skills);
    };

    const {
        loading: savingResult,
        fn: saveQuizResultFn,
        data: resultData,
        setData: setResultData,
    } = useFetch<QuizResultData>(saveQuizResult);

    useEffect(() => {
        if (quizData) {
            setAnswers(new Array(quizData.length).fill(null));
        }
    }, [quizData]);

    const handleAnswer = (answer: string) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (!quizData) return;

        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setShowExplanation(false);
        } else {
            finishQuiz();
        }
    };

    const calculateScore = (): number => {
        if (!quizData) return 0;

        let correct = 0;
        answers.forEach((answer, index) => {
            if (answer === quizData[index].correctAnswer) {
                correct++;
            }
        });

        return (correct / quizData.length) * 100;
    };

    const finishQuiz = async () => {
        if (!quizData) return;

        const score = calculateScore();

        try {
            const result = await saveQuizResultFn(quizData, answers, score);
            if (result) {
                addAssessment(result);
            }
            toast.success("Quiz completed!");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Failed to save quiz results");
            }
        }
    };

    const startNewQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowExplanation(false);
        generateQuizFn(industry, skills);
        setResultData(null);
    };

    if (generatingQuiz) {
        return (
            <Card className="mx-2">
                <CardContent className="py-10 flex flex-col items-center justify-center space-y-4">
                    <BarLoader width={"100%"} color="#3E54FF" />
                    <p className="text-sm font-bold uppercase tracking-widest animate-pulse">
                        Crafting your personalized quiz...
                    </p>
                </CardContent>
            </Card>
        );
    }

    if (resultData) {
        return (
            <div className="mx-2">
                <QuizResult result={resultData} onStartNew={startNewQuiz} />
            </div>
        );
    }

    if (!quizData) {
        return (
            <Card className="mx-2 bg-white neo-border neo-shadow">
                <CardHeader>
                    <CardTitle className="text-3xl font-black uppercase tracking-tighter">
                        Ready to test your knowledge?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 font-medium">
                        {industry
                            ? `This quiz is custom-built for the ${industry} industry with emphasis on ${skills?.join(", ") || "core professional skills"}.`
                            : "Take a general professional skills quiz to sharpen your interview readiness."}
                    </p>
                    <p className="text-xs font-bold text-neo-blue uppercase mt-4 tracking-widest">
                        10 Questions • Tailored to you • Instant feedback
                    </p>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={handleStartQuiz}
                        className="w-full h-14 bg-neo-yellow text-black hover:bg-yellow-400 neo-border neo-shadow-hover text-sm font-black uppercase tracking-widest transition-all"
                    >
                        {BUTTONS_MENUS.START_QUIZ}
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    const question = quizData[currentQuestion];

    return (
        <Card className="mx-2">
            <CardHeader>
                <CardTitle>
                    Question {currentQuestion + 1} of {quizData.length}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-lg font-medium">{question.question}</p>

                <RadioGroup
                    onValueChange={handleAnswer}
                    value={answers[currentQuestion] ?? ""}
                    className="space-y-2"
                >
                    {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>

                {showExplanation && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="font-medium">Explanation:</p>
                        <p className="text-muted-foreground">
                            {question.explanation}
                        </p>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex justify-between">
                {!showExplanation && (
                    <Button
                        onClick={() => setShowExplanation(true)}
                        variant="outline"
                    >
                        {BUTTONS_MENUS.EXPLAIN}
                    </Button>
                )}

                <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion] || savingResult}
                    className="ml-auto"
                >
                    {currentQuestion < quizData.length - 1
                        ? "Next Question"
                        : "Finish Quiz"}
                </Button>
            </CardFooter>
        </Card>
    );
}
