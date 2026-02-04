import React, { useState, useRef, useEffect } from "react";
import useBookmarks from "../../hooks/useBookmarks";

const FALLBACK_IMAGE =
  import.meta.env.VITE_FALLBACK_IMAGE ||
  "https://c0.wallpaperflare.com/preview/105/94/569/administration-articles-bank-black-and-white.jpg";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${dateStr} · ${timeStr}`;
};

// Calculate reading time based on description (estimate ~200 words/min)
const getReadingTime = (description) => {
  if (!description) return "1 min";
  const words = description.split(/\s+/).length;
  // NewsAPI gives truncated content, so estimate full article is ~5x longer
  const estimatedWords = words * 5;
  const minutes = Math.max(1, Math.ceil(estimatedWords / 200));
  return `${minutes} min read`;
};

// Extract source name from source object
const getSourceName = (source) => {
  if (!source) return null;
  if (typeof source === "string") return source;
  return source.name || null;
};

const NewsCard = ({ article }) => {
  const { title, description, urlToImage, url, publishedAt, source } = article;
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef(null);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const bookmarked = isBookmarked(url);
  const sourceName = getSourceName(source);
  const readingTime = getReadingTime(description);

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
  };

  // Close share popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShare(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  };

  return (
    <article className="news-card">
      <div className="news-card__image-wrapper">
        <img
          className="news-card__image"
          src={urlToImage || FALLBACK_IMAGE}
          alt={title}
          onError={handleImageError}
        />
        {/* Source Badge */}
        {sourceName && <span className="news-card__source">{sourceName}</span>}
        {/* Bookmark Button */}
        <button
          className={`news-card__bookmark ${bookmarked ? "news-card__bookmark--active" : ""}`}
          onClick={() => toggleBookmark(article)}
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <span className="material-icons">
            {bookmarked ? "bookmark" : "bookmark_border"}
          </span>
        </button>
      </div>
      <div className="news-card__content">
        <h3
          className="news-card__title"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="news-card__meta">
          {publishedAt && (
            <time className="news-card__date" dateTime={publishedAt}>
              {formatDate(publishedAt)}
            </time>
          )}
          <span className="news-card__reading-time">
            <span className="material-icons">schedule</span>
            {readingTime}
          </span>
        </div>
        <p className="news-card__description">
          {description || "No description available."}
        </p>
        <div className="news-card__footer">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="news-card__button"
          >
            Read More
          </a>

          <div className="share" ref={shareRef}>
            <button
              className="share__trigger"
              onClick={() => setShowShare(!showShare)}
              aria-label="Share"
            >
              <span className="material-icons">share</span>
            </button>

            {showShare && (
              <div className="share__popup">
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share__option"
                >
                  <span className="share__icon share__icon--twitter">𝕏</span>
                  Twitter
                </a>
                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share__option"
                >
                  <span className="share__icon share__icon--facebook">f</span>
                  Facebook
                </a>
                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share__option"
                >
                  <span className="share__icon share__icon--linkedin">in</span>
                  LinkedIn
                </a>
                <a
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share__option"
                >
                  <span className="share__icon share__icon--whatsapp">W</span>
                  WhatsApp
                </a>
                <button
                  className="share__option share__option--copy"
                  onClick={handleCopyLink}
                >
                  <span className="material-icons share__icon--copy">
                    {copied ? "check" : "content_copy"}
                  </span>
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
