import { Suspense, ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

function LoadingBar() {
    return (
        <div className="mt-4 w-full h-1 bg-muted overflow-hidden rounded-full">
            <div className="h-full bg-gray-400 animate-pulse w-full" />
        </div>
    );
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-bg-cream pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <Suspense fallback={<LoadingBar />}>
                    {children}
                </Suspense>
            </div>
        </div>
    );
}
