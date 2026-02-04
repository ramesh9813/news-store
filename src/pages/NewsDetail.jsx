import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Hero from "../components/layout/Hero";
import Footer from "../components/layout/Footer";
import useBookmarks from "../hooks/useBookmarks";
import useNews from "../hooks/useNews";
import NewsCard from "../components/cards/NewsCard";
import "../styles/pages/news-detail.css";

const NewsDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = state?.article;
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Fetch related news based on title words or source
  // We use a simple strategy: search for the first few words of the title
  const relatedQuery =
    article?.title?.split(" ").slice(0, 3).join(" ") || "latest";
  const { news: relatedNews, loading: relatedLoading } = useNews(relatedQuery);

  useEffect(() => {
    if (!article) {
      navigate("/");
    } else {
      window.scrollTo(0, 0);
    }
  }, [article, navigate]);

  if (!article) return null;

  const {
    title,
    description,
    urlToImage,
    url,
    publishedAt,
    source,
    content,
    author,
  } = article;
  const bookmarked = isBookmarked(url);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="page-wrapper">
      <Hero currentTopic="article" setSearch={() => {}} />

      <main className="section news-detail">
        <article className="article-container">
          <header className="article-header">
            <Link to="/" className="back-link">
              <span className="material-icons">arrow_back</span>
              Back to News
            </Link>

            <div className="article-meta-top">
              {source?.name && (
                <span className="article-source">{source.name}</span>
              )}
              <time className="article-date">{formatDate(publishedAt)}</time>
            </div>

            <h1
              className="article-title"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            {author && <p className="article-author">By {author}</p>}
          </header>

          <figure className="article-figure">
            <img
              src={urlToImage || "https://placehold.co/800x400?text=No+Image"}
              alt={title}
              className="article-image"
              onError={(e) =>
                (e.target.src = "https://placehold.co/800x400?text=No+Image")
              }
            />
          </figure>

          <div className="article-actions">
            <button
              className={`action-button ${bookmarked ? "action-button--active" : ""}`}
              onClick={() => toggleBookmark(article)}
            >
              <span className="material-icons">
                {bookmarked ? "bookmark" : "bookmark_border"}
              </span>
              {bookmarked ? "Saved" : "Save Article"}
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="action-button primary"
            >
              <span className="material-icons">open_in_new</span>
              Read Full Source
            </a>
          </div>

          <div className="article-content">
            {description && (
              <p className="article-description">{description}</p>
            )}

            <div className="article-body">
              {content ? (
                <>
                  <p>{content.replace(/\[\+\d+ chars\]$/, "")}</p>
                  <p className="read-more-hint">
                    ... This is a preview. To read the full story, please visit
                    the source.
                  </p>
                </>
              ) : (
                <p>Click 'Read Full Source' to read the full article.</p>
              )}
            </div>

            <div className="article-footer-cta">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="button button--primary button--large"
              >
                Read Full Story on {source?.name || "Source"}
                <span className="material-icons">open_in_new</span>
              </a>
            </div>
          </div>
        </article>

        <section className="related-news">
          <h2 className="related-news__title">Related News</h2>
          <div className="news-grid">
            {relatedLoading ? (
              <p>Loading related news...</p>
            ) : (
              relatedNews
                .filter((item) => item.url !== url) // Exclude current article
                .slice(0, 4)
                .map((item) => <NewsCard key={item.url} article={item} />)
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;
