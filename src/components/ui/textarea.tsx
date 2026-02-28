"use client";

import React, { forwardRef } from "react";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={`flex w-full items-center justify-center bg-white text-text-black neo-border-thin neo-shadow focus-visible:outline-none focus-visible:translate-x-1 focus-visible:translate-y-1 focus-visible:shadow-none placeholder:text-gray-500 rounded-none px-4 py-2 text-sm transition-all min-h-[100px] ${className || ""
                    }`}
                ref={ref}
                {...props}
            />
        );
    }
);

Textarea.displayName = "Textarea";

export { Textarea };
