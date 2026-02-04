import React from "react";
import { Link } from "react-router-dom";
import NSLogo from "../common/NSLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <NSLogo size={36} />
          </Link>
          <p className="footer__tagline">Your trusted source for news</p>
        </div>

        <nav className="footer__links">
          <Link to="/about" className="footer__link">
            About
          </Link>
          <Link to="/contact" className="footer__link">
            Contact
          </Link>
          <Link to="/privacy" className="footer__link">
            Privacy
          </Link>
        </nav>

        <div className="footer__social">
          <a href="#" className="footer__social-link" aria-label="Twitter">
            𝕏
          </a>
          <a href="#" className="footer__social-link" aria-label="Facebook">
            f
          </a>
          <a href="#" className="footer__social-link" aria-label="LinkedIn">
            in
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          © {currentYear} News Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
