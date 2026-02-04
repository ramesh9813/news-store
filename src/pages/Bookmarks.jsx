import React from "react";
import NewsCard from "../components/cards/NewsCard";
import useBookmarks from "../hooks/useBookmarks";
import Hero from "../components/layout/Hero";
import Footer from "../components/layout/Footer";
import "../styles/pages/bookmarks.css";
import { Link } from "react-router-dom";

const Bookmarks = () => {
  const { bookmarks } = useBookmarks();

  return (
    <div className="page-wrapper">
      <Hero currentTopic="bookmarks" setSearch={() => {}} />

      <main className="section bookmarks-page">
        <div className="section__header">
          <h1 className="section__title">
            <span className="material-icons">bookmark</span>
            Saved Articles
          </h1>
          <p className="section__subtitle">{bookmarks.length} articles saved</p>
        </div>

        {bookmarks.length === 0 ? (
          <div className="bookmarks-empty">
            <span className="material-icons bookmarks-empty__icon">
              bookmark_border
            </span>
            <h2 className="bookmarks-empty__title">No bookmarks yet</h2>
            <p className="bookmarks-empty__text">
              Save articles you want to read later by clicking the bookmark icon
              on any news card.
            </p>
            <Link to="/" className="button button--primary">
              Browse News
            </Link>
          </div>
        ) : (
          <div className="news-grid">
            {bookmarks.map((article) => (
              <NewsCard key={article.url} article={article} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Bookmarks;
