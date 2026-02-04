import React from "react";
import "../../styles/components/skeleton.css";

const SkeletonCard = () => {
  return (
    <article className="news-card skeleton-card">
      <div className="news-card__image-wrapper skeleton-image" />
      <div className="news-card__content">
        <div className="skeleton-text skeleton-title" />
        <div
          className="skeleton-text skeleton-title"
          style={{ width: "80%" }}
        />
        <div className="news-card__meta skeleton-meta">
          <div className="skeleton-text skeleton-date" />
          <div className="skeleton-text skeleton-read-time" />
        </div>
        <div className="news-card__description">
          <div className="skeleton-text skeleton-desc" />
          <div className="skeleton-text skeleton-desc" />
          <div
            className="skeleton-text skeleton-desc"
            style={{ width: "60%" }}
          />
        </div>
        <div className="news-card__footer">
          <div className="skeleton-button" />
        </div>
      </div>
    </article>
  );
};

const SkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="news-grid">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export { SkeletonCard, SkeletonGrid };
export default SkeletonCard;
