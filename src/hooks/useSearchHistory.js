import { useState, useEffect, useCallback } from "react";

const HISTORY_KEY = "news_search_history";
const MAX_HISTORY = 8;

const useSearchHistory = () => {
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const addToHistory = useCallback((query) => {
    if (!query || query.trim() === "" || query === "everything") return;
    
    setHistory((prev) => {
      // Remove if already exists
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== query.toLowerCase()
      );
      // Add to beginning and limit
      return [query, ...filtered].slice(0, MAX_HISTORY);
    });
  }, []);

  const removeFromHistory = useCallback((query) => {
    setHistory((prev) => prev.filter((item) => item !== query));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, addToHistory, removeFromHistory, clearHistory };
};

export default useSearchHistory;
