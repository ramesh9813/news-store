import { useState, useEffect, useCallback } from "react";

const BOOKMARKS_KEY = "news_bookmarks";

const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = useCallback((article) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.url === article.url)) return prev;
      return [...prev, { ...article, bookmarkedAt: new Date().toISOString() }];
    });
  }, []);

  const removeBookmark = useCallback((url) => {
    setBookmarks((prev) => prev.filter((b) => b.url !== url));
  }, []);

  const isBookmarked = useCallback(
    (url) => bookmarks.some((b) => b.url === url),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    (article) => {
      if (isBookmarked(article.url)) {
        removeBookmark(article.url);
      } else {
        addBookmark(article);
      }
    },
    [isBookmarked, addBookmark, removeBookmark]
  );

  return { bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark };
};

export default useBookmarks;
