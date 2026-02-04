import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopicDropdown from "../navigation/TopicDropdown";
import NSLogo from "../common/NSLogo";
import ThemeToggle from "../common/ThemeToggle";

const Hero = ({ currentTopic, setSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      setSearch(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    // Reset search query input
    setQuery("");
    // Reset topic to show all news
    setSearch("everything");
    // Navigate to home
    navigate("/");
  };

  return (
    <header className="hero">
      <div className="hero__content">
        <a href="/" className="hero__logo" onClick={handleHomeClick}>
          <NSLogo size={48} />
        </a>

        <div className="hero__controls">
          <TopicDropdown
            currentTopic={currentTopic}
            onSelectTopic={setSearch}
          />

          <div className="hero__search">
            <input
              type="text"
              className="hero__input"
              placeholder="Search news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="hero__button" onClick={handleSearch}>
              Search
            </button>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Hero;
