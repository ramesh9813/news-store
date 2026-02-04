import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopicDropdown from "../navigation/TopicDropdown";
import NSLogo from "../common/NSLogo";

const Header = ({ showSearch = false, currentTopic, setSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() && setSearch) {
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
    setQuery("");
    if (setSearch) {
      setSearch("everything");
    }
    navigate("/");
  };

  return (
    <header className="hero">
      <div className="hero__content">
        <a href="/" className="hero__logo" onClick={handleHomeClick}>
          <NSLogo size={48} />
        </a>

        {showSearch && (
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
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
