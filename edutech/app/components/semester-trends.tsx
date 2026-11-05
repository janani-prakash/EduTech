"use client";

import { useState } from "react";
import type { Course } from "../data/course-data";
import { assignmentDates } from "../data/trend-data";
import DateFilter, { DEFAULT_FILTERS, rangeLabel, type Filters } from "./date-filter";
import styles from "./trends-styles.module.css";

export default function SemesterTrends({ course }: { course: Course }) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const inRange = course.assignments
    .filter((a) => {
      const d = assignmentDates[a.id];
      return d && d >= filters.start && d <= filters.end;
    })
    .sort((a, b) => assignmentDates[a.id].localeCompare(assignmentDates[b.id]));

  const peak = inRange.length
    ? inRange.reduce((t, a) => (a.usagePercentage > t.usagePercentage ? a : t))
    : null;
  const low = inRange.length
    ? inRange.reduce((t, a) => (a.usagePercentage < t.usagePercentage ? a : t))
    : null;
  const average = inRange.length
    ? Math.round(inRange.reduce((t, a) => t + a.usagePercentage, 0) / inRange.length)
    : 0;

  return (
    <section className={styles.panel} aria-label="AI usage across the semester">
      <div className={styles.top}>
        <h2>AI usage across the semester</h2>
        <DateFilter value={filters} onApply={setFilters} />
      </div>
      <p className={styles.range}>Showing {rangeLabel(filters.start, filters.end)}</p>

      {!peak || !low ? (
        <p className={styles.empty}>No assignments fall in this date range. Try a wider range.</p>
      ) : (
        <>
          <div className={styles.chart}>
            {inRange.map((a) => (
              <div key={a.id} className={styles.col}>
                <span className={styles.value}>{a.usagePercentage}%</span>
                <div
                  className={`${styles.bar} ${a.id === peak.id ? styles.peak : ""}`}
                  style={{ height: `${a.usagePercentage * 2}px` }}
                />
                <span className={styles.label}>{a.name}</span>
              </div>
            ))}
          </div>

          <div className={styles.stat}>
            <p className={styles.big}>{average}%</p>
            <p>
              average AI usage across {inRange.length} assignment{inRange.length === 1 ? "" : "s"}
            </p>
            <p className={styles.detail}>
              Peak: {peak.name} ({peak.usagePercentage}%) · Lowest: {low.name} ({low.usagePercentage}%)
            </p>
          </div>
        </>
      )}
    </section>
  );
}