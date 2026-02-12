import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryTabs from "../navigation/CategoryTabs";
import NSLogo from "../common/NSLogo";
import ThemeToggle from "../common/ThemeToggle";
import useSearchHistory from "../../hooks/useSearchHistory";

const Hero = ({ currentTopic, currentLang, setSearch }) => {
  const [query, setQuery] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const { history, addToHistory, clearHistory } = useSearchHistory();

  const handleSearch = (searchQuery) => {
    const term = searchQuery || query;
    if (term.trim()) {
      setSearch(term);
      addToHistory(term);
      setShowHistory(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setQuery("");
    setSearch("everything");
    navigate("/");
  };

  // Close history when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="hero">
      <div className="hero__content">
        <a href="/" className="hero__logo" onClick={handleHomeClick}>
          <NSLogo size={48} />
        </a>

        <div className="hero__controls">
          <div className="hero__search-container" ref={searchRef}>
            <div className="hero__search">
              <input
                type="text"
                className="hero__input"
                placeholder="Search news..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowHistory(true)}
                onKeyPress={handleKeyPress}
              />
              <button className="hero__button" onClick={() => handleSearch()}>
                Search
              </button>
            </div>

            {showHistory && history.length > 0 && (
              <div className="search-history">
                <div className="search-history__header">
                  <span>Recent Searches</span>
                  <button
                    className="search-history__clear"
                    onClick={clearHistory}
                  >
                    Clear
                  </button>
                </div>
                <ul className="search-history__list">
                  {history.map((item, index) => (
                    <li
                      key={index}
                      className="search-history__item"
                      onClick={() => {
                        setQuery(item);
                        handleSearch(item);
                      }}
                    >
                      <span className="material-icons">history</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <ThemeToggle />

          <div className="language-selector">
            <select
              className="language-selector__select"
              value={currentLang || "en"}
              onChange={(e) => setSearch(null, e.target.value)}
            >
              <option value="en">🇺🇸 EN</option>
              <option value="es">🇪🇸 ES</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="de">🇩🇪 DE</option>
              <option value="it">🇮🇹 IT</option>
            </select>
          </div>

          <Link
            to="/bookmarks"
            className="hero__icon-link"
            aria-label="Bookmarks"
          >
            <span className="material-icons">bookmark_border</span>
          </Link>
        </div>
      </div>

      <CategoryTabs
        currentCategory={currentTopic}
        onSelectCategory={setSearch}
      />
    </header>
  );
};

export default Hero;
