"use client";

import { useState } from "react";
import styles from "./datefilter-styles.module.css";

export type Filters = { start: string; end: string; section: string };

export const SEMESTER = { start: "2026-08-24", end: "2026-12-11" };
export const DEFAULT_FILTERS: Filters = { ...SEMESTER, section: "All sections" };
const SECTIONS = ["All sections", "Section 001", "Section 002"];
const PRESETS = [
  ["week", "This week"],
  ["month", "This month"],
  ["semester", "Entire semester"],
  ["custom", "Custom"],
];

function toIso(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function fmt(iso: string, withYear = false) {
  return new Date(iso + "T00:00:00").toLocaleDateString(
    "en-US",
    withYear ? { month: "short", day: "numeric", year: "numeric" } : { month: "short", day: "numeric" },
  );
}

export function rangeLabel(start: string, end: string) {
  return `${fmt(start)} – ${fmt(end, true)}`;
}

function presetRange(name: string) {
  const now = new Date();
  if (name === "week") {
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start: toIso(start), end: toIso(end) };
  }
  if (name === "month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { start: toIso(start), end: toIso(end) };
  }
  return SEMESTER;
}

type Props = { value: Filters; onApply: (f: Filters) => void };

export default function DateFilter({ value, onApply }: Props) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Filters>(value);
  const [preset, setPreset] = useState("semester");
  const invalid = draft.start > draft.end;

  function openPopup() {
    setDraft(value);
    setOpen(true);
  }

  function choose(name: string) {
    setPreset(name);
    if (name !== "custom") setDraft({ ...draft, ...presetRange(name) });
  }

  function apply() {
    if (invalid) return;
    onApply(draft);
    setOpen(false);
  }

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.trigger} onClick={openPopup} aria-expanded={open}>
        <span aria-hidden="true">📅</span>
        <span>{rangeLabel(value.start, value.end)}</span>
        {value.section !== "All sections" && <span>· {value.section}</span>}
      </button>

      {open && (
        <div className={styles.popup} role="dialog" aria-label="Filter AI usage trends">
          <p className={styles.title}>Filter AI usage trends</p>

          <div className={styles.presets}>
            {PRESETS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`${styles.preset} ${preset === id ? styles.presetActive : ""}`}
                onClick={() => choose(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <label className={styles.field}>
            Start date
            <input
              type="date"
              value={draft.start}
              onChange={(e) => {
                setPreset("custom");
                setDraft({ ...draft, start: e.target.value });
              }}
            />
          </label>

          <label className={styles.field}>
            End date
            <input
              type="date"
              value={draft.end}
              onChange={(e) => {
                setPreset("custom");
                setDraft({ ...draft, end: e.target.value });
              }}
            />
          </label>

          <label className={styles.field}>
            Section
            <select value={draft.section} onChange={(e) => setDraft({ ...draft, section: e.target.value })}>
              {SECTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>

          {invalid ? (
            <p className={styles.error}>The end date must be after the start date.</p>
          ) : (
            <p className={styles.summary}>Showing {rangeLabel(draft.start, draft.end)}</p>
          )}

          <div className={styles.actions}>
            <button type="button" className={styles.cancel} onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" className={styles.apply} onClick={apply}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}