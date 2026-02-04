import { useState, useEffect, useCallback } from 'react';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = import.meta.env.VITE_NEWS_API_URL;

/**
 * Custom hook for fetching news articles
 * Uses 'everything' endpoint for more results
 * @param {string} initialSearch - Initial search query
 * @returns {Object} - news data, loading state, error, and refetch function
 */
const useNews = (initialSearch = 'everything') => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use 'everything' endpoint for more results (up to 100)
      // sortBy=publishedAt gets latest news first
      const url = `${API_URL}?q=${encodeURIComponent(query)}&pageSize=100&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
      
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
      
      setNews(validArticles);
    } catch (err) {
      setError(err.message);
      setNews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(initialSearch);
  }, [initialSearch, fetchNews]);

  return { news, loading, error, refetch: fetchNews };
};

export default useNews;
