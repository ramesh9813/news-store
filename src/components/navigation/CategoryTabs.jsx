import React, { useRef, useEffect } from "react";
import "../../styles/components/category-tabs.css";

const CATEGORIES = [
  { id: "everything", label: "Breaking" },
  { id: "business", label: "Business" },
  { id: "entertainment", label: "Entertainment" },
  { id: "health", label: "Health" },
  { id: "science", label: "Science" },
  { id: "sports", label: "Sports" },
  { id: "technology", label: "Technology" },
];

const CategoryTabs = ({ currentCategory, onSelectCategory }) => {
  const tabsRef = useRef(null);

  useEffect(() => {
    // Scroll active tab into view
    if (tabsRef.current) {
      const activeTab = tabsRef.current.querySelector(
        ".category-tabs__button--active",
      );
      if (activeTab) {
        activeTab.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentCategory]);

  return (
    <div className="category-tabs-container">
      <div className="category-tabs" ref={tabsRef}>
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            className={`category-tabs__button ${
              currentCategory === category.id
                ? "category-tabs__button--active"
                : ""
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
