"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "blue";
    size?: "sm" | "md" | "lg" | "icon";
    className?: string;
    href?: string;
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    href,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all duration-200 relative";

    const variants = {
        primary: "bg-neo-yellow text-text-black neo-border-thin neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
        secondary: "bg-white text-text-black neo-border-thin neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
        outline: "bg-transparent text-text-black neo-border-thin hover:bg-black hover:text-white",
        blue: "bg-neo-blue text-white neo-border-thin neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
    };

    const sizes = {
        sm: "px-5 py-2 text-xs",
        md: "px-8 py-3 text-sm",
        lg: "px-10 py-4 text-base",
        icon: "h-10 w-10 p-2",
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClassName}>
                <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
            </Link>
        );
    }

    return (
        <button
            className={combinedClassName}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
        </button>
    );
}
