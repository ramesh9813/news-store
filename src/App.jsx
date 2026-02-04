import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import Hero from "./components/layout/Hero";
import Footer from "./components/layout/Footer";
import NewsCard from "./components/cards/NewsCard";
import { SkeletonGrid } from "./components/common/SkeletonCard";
import ScrollToTop from "./components/common/ScrollToTop";
import useNews from "./hooks/useNews";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Bookmarks from "./pages/Bookmarks";
import NewsDetail from "./pages/NewsDetail";

// Home page content with URL-synced search & infinite scroll
const HomeContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get search query from URL
  const searchQuery = searchParams.get("q") || "everything";
  const language = searchParams.get("lang") || "en";
  const [page, setPage] = useState(1);

  const { news, loading, error, hasMore, fetchNews } = useNews(
    searchQuery,
    language,
  );

  // Load more function
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNews(searchQuery, nextPage, language);
    }
  }, [loading, hasMore, page, fetchNews, searchQuery, language]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 // Load when 1000px from bottom
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  // Trigger fetch when search or language changes
  useEffect(() => {
    // Reset page and fetch new data when search or language changes
    setPage(1);
    fetchNews(searchQuery, 1, language);
  }, [searchQuery, language, fetchNews]);

  // Handle search change from Hero
  const handleSearchChange = (newSearch, newLang) => {
    const params = new URLSearchParams(searchParams);
    if (newSearch) {
      if (newSearch !== "everything") params.set("q", newSearch);
      else params.delete("q");
    }
    if (newLang) {
      params.set("lang", newLang);
    }
    setSearchParams(params);
    setPage(1);
  };

  return (
    <>
      <Hero
        currentTopic={searchQuery}
        currentLang={language}
        setSearch={handleSearchChange}
      />

      <main className="section">
        {error && news.length === 0 && (
          <div className="news-empty">
            <p className="news-empty__text">Error: {error}</p>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="news-empty">
            <p className="news-empty__text">
              No news found. Try a different search.
            </p>
          </div>
        )}

        <div className="news-grid">
          {news.map((article, index) => (
            <NewsCard key={`${article.url}-${index}`} article={article} />
          ))}
        </div>

        {loading && (
          <div style={{ marginTop: "2rem" }}>
            <SkeletonGrid count={news.length === 0 ? 12 : 4} />
          </div>
        )}

        {!loading && hasMore && news.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button className="button button--primary" onClick={loadMore}>
              Load More
            </button>
          </div>
        )}

        {!hasMore && news.length > 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              color: "var(--text-secondary)",
            }}
          >
            You've reached the end.
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

// Page wrapper for static pages (About, Contact, Privacy, etc)
const PageLayout = () => {
  const navigate = useNavigate();

  const handleSearchChange = (newSearch) => {
    if (newSearch && newSearch !== "everything") {
      navigate(`/?q=${encodeURIComponent(newSearch)}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Hero currentTopic="everything" setSearch={handleSearchChange} />
      <Outlet />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route element={<PageLayout />}>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>
        </Routes>
        <ScrollToTop />
      </div>
    </BrowserRouter>
  );
};

export default App;
