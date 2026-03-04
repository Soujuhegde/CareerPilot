"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { generateCoverLetter, CoverLetterResult } from "@/actions/cover-letter";

/* ---------------------------------- */
/* Schema */
/* ---------------------------------- */

const schema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    tone: z.enum(["professional", "friendly", "enthusiastic"]),
    companyName: z.string().min(1, "Company Name is required"),
    jobTitle: z.string().min(1, "Job Title is required"),
    jobDescription: z.string().min(10, "Job Description is too short"),
});

type CoverLetterFormValues = z.infer<typeof schema>;

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */

export default function CoverLetterGenerator() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CoverLetterFormValues>({
        resolver: zodResolver(schema),
    });

    const {
        loading: generating,
        fn: generateLetterFn,
        data: generatedLetter,
        error,
    } = useFetch<CoverLetterResult, [CoverLetterFormValues]>(
        generateCoverLetter
    );

    /* ---------------------------------- */
    /* Submit Handler */
    /* ---------------------------------- */

    const onSubmit: SubmitHandler<CoverLetterFormValues> = async (
        data
    ) => {
        try {
            await generateLetterFn(data);
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Error generating cover letter");
            }
        }
    };

    /* ---------------------------------- */
    /* Handle Result */
    /* ---------------------------------- */

    useEffect(() => {
        if (generatedLetter) {
            toast.success("Cover letter generated!");
            // Encode the full letter data as URL params (no DB needed)
            const params = new URLSearchParams({
                jobTitle: generatedLetter.jobTitle,
                companyName: generatedLetter.companyName,
                content: generatedLetter.content,
            });
            router.push(`/ai-cover-letter/${generatedLetter.id}?${params.toString()}`);
            reset();
        }

        if (error) {
            toast.error(
                error.message || "Failed to generate cover letter"
            );
        }
    }, [generatedLetter, error, router, reset]);


    /* ---------------------------------- */
    /* UI */
    /* ---------------------------------- */

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Generate Cover Letter</CardTitle>
                    <CardDescription>
                        Fill the fields and click submit
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Full Name</Label>
                                <Input {...register("fullName")} />
                                {errors.fullName && (
                                    <p className="text-red-500 text-sm">
                                        {errors.fullName.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label>Tone</Label>
                                <select
                                    {...register("tone")}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="professional">
                                        Professional
                                    </option>
                                    <option value="friendly">Friendly</option>
                                    <option value="enthusiastic">
                                        Enthusiastic
                                    </option>
                                </select>
                                {errors.tone && (
                                    <p className="text-red-500 text-sm">
                                        {errors.tone.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Company Name</Label>
                                <Input {...register("companyName")} />
                                {errors.companyName && (
                                    <p className="text-red-500 text-sm">
                                        {errors.companyName.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label>Job Title</Label>
                                <Input {...register("jobTitle")} />
                                {errors.jobTitle && (
                                    <p className="text-red-500 text-sm">
                                        {errors.jobTitle.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label>Job Description</Label>
                            <Textarea
                                {...register("jobDescription")}
                                className="h-32"
                            />
                            {errors.jobDescription && (
                                <p className="text-red-500 text-sm">
                                    {errors.jobDescription.message}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={generating}>
                                {generating ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    "Generate Cover Letter"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
