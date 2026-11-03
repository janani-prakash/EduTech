"use client";

import { useId, useState } from "react";

export type FeedbackPanelItem = {
  heading: string;
  category: string;
  text: string;
};

type Props = {
  title: string;
  items: FeedbackPanelItem[];
  categories: string[];
};

export default function FeedbackPanel({ title, items, categories }: Props) {
  const titleId = useId();
  const [categoryFilter, setCategoryFilter] = useState("View all");

  const visibleItems =
    categoryFilter === "View all"
      ? items
      : items.filter((item) => item.category === categoryFilter);

  return (
    <section className="panel feedback-panel" aria-labelledby={titleId}>
      <div className="feedback-header">
        <div className="feedback-heading-group">
          <h2 id={titleId}>{title}</h2>
          <span className="feedback-sample-label">Sample data</span>
        </div>
        <label className="feedback-filter-wrap">
          <span className="visually-hidden">Filter {title.toLowerCase()}</span>
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option>View all</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>

      {visibleItems.length > 0 ? (
        <ul className="feedback-list">
          {visibleItems.map((item) => (
            <li className="feedback-card" key={item.heading}>
              <div className="feedback-card-heading">
                <h3>{item.heading}</h3>
                <span className="category-tag">{item.category}</span>
              </div>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="feedback-empty">
          No {title.toLowerCase()} in this category yet.
        </p>
      )}
    </section>
  );
}
