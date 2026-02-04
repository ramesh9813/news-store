import React, { useState, useEffect } from "react";
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
import Pagination from "./components/navigation/Pagination";
import Loader from "./components/common/Loader";
import ScrollToTop from "./components/common/ScrollToTop";
import useNews from "./hooks/useNews";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";

const ITEMS_PER_PAGE = 15;

// Home page content with URL-synced search
const HomeContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get search query and page from URL, with defaults
  const searchQuery = searchParams.get("q") || "everything";
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const { news, loading, error } = useNews(searchQuery);

  // Sync page state with URL when URL changes
  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  // Update URL when search changes
  const handleSearchChange = (newSearch) => {
    const params = new URLSearchParams();
    if (newSearch && newSearch !== "everything") {
      params.set("q", newSearch);
    }
    // Reset to page 1 on new search
    setSearchParams(params);
    setCurrentPage(1);
  };

  // Update URL when page changes
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    if (newPage > 1) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }
    setSearchParams(params);
    setCurrentPage(newPage);
  };

  // Pagination logic
  const totalPages = Math.ceil((news?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews =
    news?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];

  return (
    <>
      <Hero currentTopic={searchQuery} setSearch={handleSearchChange} />

      <main className="section">
        {loading && <Loader text="" />}

        {error && (
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

        {!loading && !error && paginatedNews.length > 0 && (
          <>
            <div className="news-grid">
              {paginatedNews.map((article, index) => (
                <NewsCard key={article.url || index} article={article} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
};

// Page wrapper for static pages (About, Contact, Privacy)
const PageLayout = () => {
  const navigate = useNavigate();

  const handleSearchChange = (newSearch) => {
    // Navigate to home with search query
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
