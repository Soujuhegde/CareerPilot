"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Sparkles, PlusCircle, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

/* ---------------------------------- */
/* Schema */
/* ---------------------------------- */

const entrySchema = z
    .object({
        title: z.string().min(1, "Title is required"),
        organization: z.string().min(1, "Organization is required"),
        startDate: z.string().min(1, "Start Date is required"),
        endDate: z.string().optional(),
        description: z.string().optional(),
        current: z.boolean(),
    })
    .refine((data) => data.current || data.endDate, {
        message: "End Date is required if not current",
        path: ["endDate"],
    });

export type EntryParams = z.infer<typeof entrySchema>;

export interface EntryFormProps {
    type: string;
    entries: EntryParams[];
    onChange: (entries: EntryParams[]) => void;
}

/* ---------------------------------- */
/* Mock AI Function */
/* ---------------------------------- */

import { improveWithAI } from "@/actions/resume";

/* ---------------------------------- */
/* Generic useFetch Hook */
/* ---------------------------------- */

function useFetch<T, P>(fn: (params: P) => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const execute = async (params: P) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fn(params);
            setData(result);
        } catch (err) {
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error("Something went wrong"));
            }
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fn: execute };
}

/* ---------------------------------- */
/* Date Formatter */
/* ---------------------------------- */

const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";
    try {
        const date = parse(dateString, "yyyy-MM", new Date());
        return format(date, "MMM yyyy");
    } catch {
        return dateString;
    }
};

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */

export function EntryForm({
    type,
    entries,
    onChange,
}: EntryFormProps) {
    const [isAdding, setIsAdding] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm<EntryParams>({
        resolver: zodResolver(entrySchema),
        defaultValues: {
            title: "",
            organization: "",
            startDate: "",
            endDate: "",
            description: "",
            current: false,
        },
    });

    const current = watch("current");

    /* ---------------------------------- */
    /* Add Entry (VALIDATED) */
    /* ---------------------------------- */

    const handleAdd: SubmitHandler<EntryParams> = (data) => {
        const formattedEntry: EntryParams = {
            ...data,
            startDate: formatDisplayDate(data.startDate),
            endDate: data.current
                ? ""
                : formatDisplayDate(data.endDate ?? ""),
        };

        onChange([...entries, formattedEntry]);
        reset();
        setIsAdding(false);
    };

    const handleDelete = (index: number) => {
        const newEntries = entries.filter((_, i) => i !== index);
        onChange(newEntries);
    };

    /* ---------------------------------- */
    /* AI Improve */
    /* ---------------------------------- */

    const {
        loading: isImproving,
        fn: improveWithAIFn,
        data: improvedContent,
        error: improveError,
    } = useFetch<string, { content: string; type: any }>(
        async (params) => await improveWithAI(params.content, params.type)
    );

    useEffect(() => {
        if (improvedContent && !isImproving) {
            setValue("description", improvedContent);
            toast.success("Description improved successfully!");
        }

        if (improveError) {
            toast.error(
                improveError.message || "Failed to improve description"
            );
        }
    }, [improvedContent, improveError, isImproving, setValue]);

    const handleImproveDescription = async () => {
        const description = watch("description");

        if (!description) {
            toast.error("Please enter a description first");
            return;
        }

        const aiType = type.toLowerCase() === "experience"
            ? "experience"
            : type.toLowerCase() === "education"
                ? "experience" // Re-using experience logic for education
                : "projects";

        await improveWithAIFn({
            content: description,
            type: aiType as any,
        });
    };

    /* ---------------------------------- */
    /* UI */
    /* ---------------------------------- */

    return (
        <div className="space-y-6">
            {/* Existing Entries */}
            <div className="space-y-4">
                {entries.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white neo-border p-6 relative neo-shadow"
                    >
                        <div className="flex justify-between mb-2">
                            <h3 className="text-xl font-black uppercase">
                                {item.title}{" "}
                                <span className="text-neo-pink">
                                    @ {item.organization}
                                </span>
                            </h3>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <p className="text-sm font-bold text-gray-500">
                            {item.current
                                ? `${item.startDate} - Present`
                                : `${item.startDate} - ${item.endDate}`}
                        </p>

                        <p className="mt-4 text-sm whitespace-pre-wrap">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Add Form */}
            {isAdding && (
                <div className="bg-neo-yellow neo-border p-6">
                    <div className="space-y-4">
                        <input
                            placeholder="Title"
                            {...register("title")}
                            className="w-full border p-2"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">
                                {errors.title.message}
                            </p>
                        )}

                        <input
                            placeholder="Organization"
                            {...register("organization")}
                            className="w-full border p-2"
                        />

                        <input
                            type="month"
                            {...register("startDate")}
                            className="w-full border p-2"
                        />

                        <input
                            type="month"
                            {...register("endDate")}
                            disabled={current}
                            className="w-full border p-2"
                        />

                        <textarea
                            placeholder="Description"
                            {...register("description")}
                            className="w-full border p-2"
                        />

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                {...register("current")}
                                onChange={(e) => {
                                    setValue("current", e.target.checked);
                                    if (e.target.checked) {
                                        setValue("endDate", "");
                                    }
                                }}
                            />
                            <label>Current {type}</label>
                        </div>

                        <div className="flex justify-between">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleImproveDescription}
                                disabled={isImproving}
                            >
                                {isImproving ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Improving...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="h-4 w-4 mr-2" />
                                        Improve with AI
                                    </>
                                )}
                            </Button>

                            <Button
                                type="button"
                                onClick={handleSubmit(handleAdd)}
                            >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add Entry
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {!isAdding && (
                <button
                    type="button"
                    className="w-full border-2 border-dashed p-4 font-bold"
                    onClick={() => setIsAdding(true)}
                >
                    <PlusCircle className="h-5 w-5 inline mr-2" />
                    Add {type}
                </button>
            )}
        </div>
    );
}
