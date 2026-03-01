"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

const DialogContext = createContext<{
    open: boolean;
    setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => { } });

export function Dialog({
    children,
    open: controlledOpen,
    onOpenChange,
}: {
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
    const setOpen = onOpenChange || setUncontrolledOpen;

    return (
        <DialogContext.Provider value={{ open, setOpen }}>
            {children}
        </DialogContext.Provider>
    );
}

export const DialogTrigger = React.forwardRef<HTMLElement, { children: React.ReactElement; asChild?: boolean }>(
    ({ children, asChild, ...props }, ref) => {
        const { setOpen } = useContext(DialogContext);

        if (asChild && React.isValidElement(children)) {
            const childProps = children.props as Record<string, any>;
            return React.cloneElement(children, {
                ...props,
                ...childProps,
                onClick: (e: any) => {
                    setOpen(true);
                    if (childProps.onClick) childProps.onClick(e);
                },
            } as any);
        }

        return (
            <button type="button" onClick={() => setOpen(true)} {...props}>
                {children}
            </button>
        );
    }
);
DialogTrigger.displayName = "DialogTrigger";

export const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        const { open, setOpen } = useContext(DialogContext);

        if (!open) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                />
                {/* Modal */}
                <div
                    ref={ref}
                    className={`relative z-50 bg-white p-6 neo-border-thin neo-shadow w-full max-w-lg mx-4 ${className || ""}`}
                    {...props}
                >
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                    {children}
                </div>
            </div>
        );
    }
);
DialogContent.displayName = "DialogContent";

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`flex flex-col space-y-2 mb-4 ${className || ""}`} {...props} />
);
DialogHeader.displayName = "DialogHeader";

export const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h2 ref={ref} className={`text-lg font-black ${className || ""}`} {...props} />
    )
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p ref={ref} className={`text-sm text-gray-500 ${className || ""}`} {...props} />
    )
);
DialogDescription.displayName = "DialogDescription";

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 ${className || ""}`} {...props} />
);
DialogFooter.displayName = "DialogFooter";
