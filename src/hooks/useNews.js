import { useState, useEffect, useCallback, useRef } from 'react';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = import.meta.env.VITE_NEWS_API_URL;

/**
 * Custom hook for fetching news articles
 * Uses 'everything' endpoint for more results
 * @param {string} initialSearch - Initial search query
 * @param {string} language - Language code (default: 'en')
 * @returns {Object} - news data, loading state, error, and refetch function
 */
const useNews = (initialSearch = 'everything', language = 'en') => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // We need to keep track of the current search to know when to reset
  const currentSearchRef = useRef(initialSearch);

  const fetchNews = useCallback(async (query, page = 1, language = 'en') => {
    // If query changed, clear existing news
    const isNewSearch = query !== currentSearchRef.current;
    if (isNewSearch) {
        setNews([]);
        currentSearchRef.current = query;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Use 'everything' endpoint
      const url = `${API_URL}?q=${encodeURIComponent(query)}&pageSize=${12}&page=${page}&sortBy=publishedAt&language=${language}&apiKey=${API_KEY}`;
      console.log("Fetching URL:", url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch news');
      }
      
      const data = await response.json();
      
      // Filter out articles with [Removed] content
      const validArticles = (data.articles || []).filter(
        article => article.title !== '[Removed]' && article.content !== '[Removed]'
      );
      
      setNews(prev => {
          // If page 1 or new search, replace. Else append.
          if (page === 1 || isNewSearch) return validArticles;
          
          // Deduplicate based on URL
          const newArticles = validArticles.filter(
            newArt => !prev.some(prevArt => prevArt.url === newArt.url)
          );
          return [...prev, ...newArticles];
      });

      // If fewer articles returned than requested, we reached the end
      setHasMore(data.articles.length > 0 && data.totalResults > news.length + validArticles.length);

    } catch (err) {
      setError(err.message);
      if (page === 1) setNews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch handled by component or explicit call
    // But we can trigger it here if search changes prop-driven
    // For now, we leave control to the component mostly, but ensuring initial load:
    fetchNews(initialSearch, 1);
  }, [initialSearch, fetchNews]);

  return { news, loading, error, hasMore, fetchNews };
};

export default useNews;
