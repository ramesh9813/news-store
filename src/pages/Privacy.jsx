import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="page">
      <div className="page__container">
        <Link to="/" className="page__back">
          ← Back to Home
        </Link>
        <h1 className="page__title">Privacy Policy</h1>

        <div className="page__content">
          <p className="page__date">Last updated: February 2026</p>

          <h2 className="page__subtitle">Information We Collect</h2>
          <p>
            News Store is committed to protecting your privacy. We collect
            minimal data necessary to provide our news aggregation service:
          </p>
          <ul className="page__list">
            <li>Search queries (not linked to personal identity)</li>
            <li>Topic preferences for personalized content</li>
            <li>Anonymous usage analytics</li>
          </ul>

          <h2 className="page__subtitle">How We Use Information</h2>
          <p>Your data is used solely to improve your reading experience:</p>
          <ul className="page__list">
            <li>Deliver relevant news content</li>
            <li>Remember your topic preferences</li>
            <li>Improve our service quality</li>
          </ul>

          <h2 className="page__subtitle">Third-Party Services</h2>
          <p>
            We use NewsAPI to fetch news content. Their privacy policy applies
            to the data they collect. We do not sell or share your personal
            information with third parties.
          </p>

          <h2 className="page__subtitle">Cookies</h2>
          <p>
            We use essential cookies to remember your preferences. No tracking
            cookies are used for advertising purposes.
          </p>

          <h2 className="page__subtitle">Contact</h2>
          <p>
            For privacy-related inquiries, please contact us at
            privacy@newsstore.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
