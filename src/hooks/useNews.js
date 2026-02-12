import { useState, useEffect, useCallback, useRef } from 'react';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = import.meta.env.VITE_NEWS_API_URL;

const getApiErrorMessage = (payload, status, statusText) => {
  if (payload?.results?.message) return payload.results.message;
  if (payload?.message) return payload.message;
  if (payload?.error?.message) return payload.error.message;
  if (status === 429) return "Rate limit exceeded. Please try again shortly.";
  return `Request failed (${status}${statusText ? ` ${statusText}` : ""})`;
};

/**
 * Custom hook for fetching news articles from NewsData.io
 * @param {string} initialSearch - Initial search query
 * @param {string} language - Language code (default: 'en')
 * @returns {Object} - news data, loading state, error, and refetch function
 */
const useNews = (initialSearch = 'everything', language = 'en') => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  
  // Use ref for cursor to avoid changing fetchNews identity and causing infinite loops in consumers
  const nextPageCursorRef = useRef(null);

  // We need to keep track of the current search to know when to reset
  const currentSearchRef = useRef(initialSearch);

  const fetchNews = useCallback(async (query, page = 1, language = 'en') => {
    if (!API_KEY || !API_URL) {
      setError("Missing API configuration. Check VITE_NEWS_API_URL and VITE_NEWS_API_KEY.");
      setLoading(false);
      return;
    }

    // If query changed, clear existing news
    const isNewSearch = query !== currentSearchRef.current;
    
    // Reset state for new search
    if (isNewSearch) {
        setNews([]);
        nextPageCursorRef.current = null;
        currentSearchRef.current = query;
        page = 1; // Force page 1 logic for new search
    }
    
    setLoading(true);
    setError(null);
    
    try {
      let url = `${API_URL}?apikey=${API_KEY}&q=${encodeURIComponent(query)}&language=${language}`;
      
      // Handle pagination
      // If page > 1, we expect to use the nextPage cursor if available
      // For the very first load or new search, we don't send 'page' param (which is cursor in this API)
      if (page > 1 && nextPageCursorRef.current) {
          url += `&page=${nextPageCursorRef.current}`;
      } else if (page > 1 && !nextPageCursorRef.current) {
           // If page > 1 requested but no cursor, we might be at end or invalid state
           // BUT, if it's strictly a loadMore call and we don't have a cursor, we should stop.
           // However, if logic is loose, we might just re-fetch page 1 if we didn't return here.
           // Returning here is safer to avoid duplicate page 1 fetches.
           setLoading(false);
           return;
      }
      
      console.log("Fetching URL:", url);
      
      const response = await fetch(url, {
        referrerPolicy: "no-referrer" 
      });

      let data = null;
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await response.json();
      }
      
      if (!response.ok) {
        throw new Error(
          getApiErrorMessage(data, response.status, response.statusText),
        );
      }

      if (data?.status === "error") {
        throw new Error(
          getApiErrorMessage(data, response.status, response.statusText),
        );
      }
      
      // Map NewsData.io response to our internal article format
      const results = Array.isArray(data?.results) ? data.results : [];
      const mappedArticles = results
        .filter(article => !article.duplicate) // Filter out API-marked duplicates
        .map(article => ({
          id: article.article_id, // Map ID for better deduplication
          title: article.title,
          description: article.description || article.content?.slice(0, 200) + "...",
          url: article.link,
          urlToImage: article.image_url,
          publishedAt: article.pubDate,
          source: {
            name: article.source_name,
            id: article.source_id
          },
          content: article.content,
          author: article.creator ? article.creator[0] : null
        }));

      // Filter out invalid articles
      const validArticles = mappedArticles.filter(
        article => article.title && article.url
      );
      
      setNews(prev => {
          if (page === 1 || isNewSearch) return validArticles;
          
          // Deduplicate based on ID or URL
          const newArticles = validArticles.filter(
            newArt => !prev.some(prevArt => 
              (newArt.id && prevArt.id === newArt.id) || 
              prevArt.url === newArt.url ||
              prevArt.title === newArt.title // Last resort title check
            )
          );
          return [...prev, ...newArticles];
      });

      // Update cursor for next page
      if (data.nextPage) {
          nextPageCursorRef.current = data.nextPage;
          setHasMore(true);
      } else {
          nextPageCursorRef.current = null;
          setHasMore(false);
      }

    } catch (err) {
      console.error("News fetch error:", err);
      setError(err.message);
      if (page === 1 || isNewSearch) setNews([]);
    } finally {
      setLoading(false);
    }
  }, []); // Stable dependency array

  useEffect(() => {
    // Initial fetch handled by component or explicit call
    // But we can trigger it here if search changes prop-driven
    // For now, we leave control to the component mostly, but ensuring initial load:
    fetchNews(initialSearch, 1, language);
  }, [initialSearch, language, fetchNews]); 

  return { news, loading, error, hasMore, fetchNews };
};

export default useNews;
