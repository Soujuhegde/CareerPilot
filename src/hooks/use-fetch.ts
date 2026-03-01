import { useState } from "react";
import { toast } from "sonner";

interface UseFetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useFetch<T, Args extends any[] = any[]>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchFn: (...args: Args) => Promise<T>
) {
    const [state, setState] = useState<UseFetchState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const setData = (data: T | null) =>
        setState((prev) => ({ ...prev, data }));

    const fn = async (...args: Args) => {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            const result = await fetchFn(...args);
            setState({ data: result, loading: false, error: null });
            return result;
        } catch (error) {
            setState({
                data: null,
                loading: false,
                error: error instanceof Error ? error : new Error("An error occurred"),
            });
            throw error;
        }
    };

    return { ...state, fn, setData };
}
