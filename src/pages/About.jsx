import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="page">
      <div className="page__container">
        <Link to="/" className="page__back">
          ← Back to Home
        </Link>
        <h1 className="page__title">About Us</h1>

        <div className="page__content">
          <p>
            Welcome to <strong>News Store</strong> — your trusted source for
            real-time news from around the world.
          </p>

          <h2 className="page__subtitle">Our Mission</h2>
          <p>
            We believe in delivering accurate, unbiased news to keep you
            informed about what matters most. Our platform aggregates news from
            reliable sources worldwide, presented in a clean, modern interface.
          </p>

          <h2 className="page__subtitle">Features</h2>
          <ul className="page__list">
            <li>Real-time news updates from global sources</li>
            <li>Topic-based filtering for personalized reading</li>
            <li>Clean, distraction-free reading experience</li>
            <li>Mobile-responsive design</li>
          </ul>

          <h2 className="page__subtitle">Technology</h2>
          <p>
            Built with React and powered by NewsAPI, our platform delivers fast,
            reliable access to breaking news and trending stories.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
