import React, { useState, useRef, useEffect } from "react";

const topics = [
  "Everything",
  "Sports",
  "Health",
  "Entertainment",
  "Science",
  "Business",
  "Technology",
  "Politics",
  "World",
  "Finance",
  "Education",
  "Environment",
  "Travel",
  "Food",
  "Art",
  "Music",
  "Gaming",
];

const TopicDropdown = ({ currentTopic, onSelectTopic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (topic) => {
    onSelectTopic(topic.toLowerCase());
    setIsOpen(false);
  };

  const displayTopic =
    currentTopic === "everything"
      ? "All Topics"
      : currentTopic.charAt(0).toUpperCase() + currentTopic.slice(1);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown__trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="dropdown__label">Topic:</span>
        <span className="dropdown__value">{displayTopic}</span>
        <span
          className={`dropdown__arrow ${isOpen ? "dropdown__arrow--open" : ""}`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="dropdown__menu">
          {topics.map((topic) => (
            <button
              key={topic}
              className={`dropdown__item ${
                topic.toLowerCase() === currentTopic
                  ? "dropdown__item--active"
                  : ""
              }`}
              onClick={() => handleSelect(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicDropdown;
