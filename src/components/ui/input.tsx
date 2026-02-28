import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={`flex w-full items-center justify-center bg-white text-text-black neo-border-thin neo-shadow focus-visible:outline-none focus-visible:translate-x-1 focus-visible:translate-y-1 focus-visible:shadow-none placeholder:text-gray-500 rounded-none px-4 py-2 text-sm transition-all h-10 ${className || ""}`}
                ref={ref}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };
