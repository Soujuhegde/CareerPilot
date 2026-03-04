"use client";

// This component is a passthrough. Clerk handles session management via ClerkProvider in layout.tsx.
export default function SessionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
