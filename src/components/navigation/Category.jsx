import React from "react";

const categories = [
  { name: "Sports", value: "sports", variant: "success" },
  { name: "Health", value: "health", variant: "danger" },
  { name: "Entertainment", value: "entertainment", variant: "primary" },
  { name: "Science", value: "science", variant: "primary" },
  { name: "Business", value: "business", variant: "warning" },
  { name: "Technology", value: "technology", variant: "info" },
];

const Category = ({ setSearch }) => {
  return (
    <nav className="category">
      <div className="category__list">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`category-btn category-btn--${cat.variant}`}
            onClick={() => setSearch(cat.value)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Category;
