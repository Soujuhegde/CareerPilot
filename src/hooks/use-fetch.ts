import { useState } from "react";
import { toast } from "sonner";

interface UseFetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export default function useFetch<T, Args extends any = any>(
    fetchFn: (args: Args) => Promise<T>
) {
    const [state, setState] = useState<UseFetchState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const fn = async (args: Args) => {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            const result = await fetchFn(args);
            setState({ data: result, loading: false, error: null });
            return result;
        } catch (error) {
            setState({
                data: null,
                loading: false,
                error: error instanceof Error ? error : new Error("An error occurred")
            });
            throw error;
        }
    };

    return { ...state, fn };
}
