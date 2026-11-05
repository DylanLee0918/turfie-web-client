import { useCallback, useEffect, useState } from "react";

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

const safeParse = <T,>(value: string, fallback: T): T => {
    try {
        return JSON.parse(value) as T;
    } catch {
        return fallback;
    }
};

const useLocalStorage = <T,>(
    key: string,
    initialValue: T,
): [T, SetValue<T>, () => void] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") return initialValue;
        const saved = localStorage.getItem(key);
        return saved ? safeParse(saved, initialValue) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);

    useEffect(() => {
        const onStorageChange = (event: StorageEvent) => {
            if (event.key !== key) return;
            const updated = event.newValue
                ? safeParse(event.newValue, initialValue)
                : initialValue;
            setStoredValue(updated);
        };

        window.addEventListener("storage", onStorageChange);
        return () => window.removeEventListener("storage", onStorageChange);
    }, [key, initialValue]);

    const setValue: SetValue<T> = useCallback((value) => {
        setStoredValue((prev) =>
            value instanceof Function ? value(prev) : value,
        );
    }, []);

    const removeValue = useCallback(() => {
        localStorage.removeItem(key);
        setStoredValue(initialValue);
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
