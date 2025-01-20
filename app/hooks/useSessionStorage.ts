import { useEffect, useState } from "react";

const useSessionStorage = <T>(key: string, initialValue: T) => {
  const [data, setData] = useState<T>(() => {
    try {
      const storedValue = sessionStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(`Error parsing session storage key "${key}":`, error);
      return initialValue; // Fallback to initial value
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error setting session storage key "${key}":`, error);
    }
  }, [key, data]);

  return [data, setData] as [typeof data, typeof setData];
};

export default useSessionStorage;
