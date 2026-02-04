import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="page">
      <div className="page__container">
        <Link to="/" className="page__back">
          ← Back to Home
        </Link>
        <h1 className="page__title">Contact Us</h1>

        <div className="page__content">
          <p>
            Have questions, feedback, or suggestions? We'd love to hear from
            you.
          </p>

          <div className="contact-info">
            <div className="contact-item">
              <h3 className="contact-item__label">Email</h3>
              <p className="contact-item__value">hello@newsstore.com</p>
            </div>

            <div className="contact-item">
              <h3 className="contact-item__label">Social Media</h3>
              <div className="contact-social">
                <a href="#" className="contact-social__link">
                  Twitter
                </a>
                <a href="#" className="contact-social__link">
                  Facebook
                </a>
                <a href="#" className="contact-social__link">
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="contact-item">
              <h3 className="contact-item__label">Business Hours</h3>
              <p className="contact-item__value">24/7 — News never sleeps</p>
            </div>
          </div>

          <h2 className="page__subtitle">Send us a message</h2>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="contact-form__input"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="contact-form__input"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="contact-form__textarea"
            />
            <button type="submit" className="contact-form__button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
