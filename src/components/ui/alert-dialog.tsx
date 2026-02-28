"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

const AlertDialogContext = createContext<{
    open: boolean;
    setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => { } });

export function AlertDialog({
    children,
    open: controlledOpen,
    onOpenChange
}: {
    children: ReactNode,
    open?: boolean,
    onOpenChange?: (open: boolean) => void
}) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
    const setOpen = onOpenChange || setUncontrolledOpen;

    return (
        <AlertDialogContext.Provider value={{ open, setOpen }}>
            {children}
        </AlertDialogContext.Provider>
    );
}

export const AlertDialogTrigger = React.forwardRef<HTMLElement, { children: React.ReactElement, asChild?: boolean }>(
    ({ children, asChild, ...props }, ref) => {
        const { setOpen } = useContext(AlertDialogContext);

        if (asChild && React.isValidElement(children)) {
            const childProps = children.props as Record<string, any>;
            return React.cloneElement(children, {
                ...props,
                ...childProps,
                onClick: (e: any) => {
                    setOpen(true);
                    if (childProps.onClick) {
                        childProps.onClick(e);
                    }
                }
            } as any);
        }

        return (
            <button type="button" onClick={() => setOpen(true)} {...props}>
                {children}
            </button>
        );
    }
);
AlertDialogTrigger.displayName = "AlertDialogTrigger";

export const AlertDialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        const { open, setOpen } = useContext(AlertDialogContext);

        if (!open) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
                {/* Modal */}
                <div ref={ref} className={`relative z-50 bg-white p-6 neo-border-thin neo-shadow w-full max-w-lg mx-4 ${className || ""}`} {...props}>
                    {children}
                </div>
            </div>
        );
    }
);
AlertDialogContent.displayName = "AlertDialogContent";

export const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`flex flex-col space-y-2 text-center sm:text-left ${className || ""}`} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

export const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h2 ref={ref} className={`text-lg font-black ${className || ""}`} {...props} />
    )
);
AlertDialogTitle.displayName = "AlertDialogTitle";

export const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p ref={ref} className={`text-sm text-gray-500 ${className || ""}`} {...props} />
    )
);
AlertDialogDescription.displayName = "AlertDialogDescription";

export const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 ${className || ""}`} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

export const AlertDialogAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, onClick, ...props }, ref) => {
        const { setOpen } = useContext(AlertDialogContext);
        return (
            <button
                ref={ref}
                onClick={(e) => {
                    if (onClick) onClick(e);
                    setOpen(false);
                }}
                className={`inline-flex h-10 items-center justify-center px-4 py-2 font-black uppercase tracking-widest text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-red-500 text-white ${className || ""}`}
                {...props}
            />
        );
    }
);
AlertDialogAction.displayName = "AlertDialogAction";

export const AlertDialogCancel = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, onClick, ...props }, ref) => {
        const { setOpen } = useContext(AlertDialogContext);
        return (
            <button
                ref={ref}
                onClick={(e) => {
                    if (onClick) onClick(e);
                    setOpen(false);
                }}
                className={`inline-flex h-10 items-center justify-center px-4 py-2 font-black uppercase tracking-widest text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-white text-text-black neo-border-thin hover:translate-x-1 hover:translate-y-1 hover:shadow-none neo-shadow min-w-[100px] ${className || ""}`}
                {...props}
            />
        );
    }
);
AlertDialogCancel.displayName = "AlertDialogCancel";
