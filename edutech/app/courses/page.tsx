"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../components/app-header";
import { courses } from "../data/course-data";

export default function CoursesPage() {
  const router = useRouter();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  function openAssignment(courseId: string, assignmentId: string) {
    router.push(`/courses/${courseId}/${assignmentId}`);
  }

  return (
    <main className="courses-page">
      <AppHeader />

      <section className="courses-content" aria-labelledby="courses-title">
        <div className="courses-intro">
          <p className="courses-eyebrow">INSTRUCTOR DASHBOARD</p>
          <h1 id="courses-title">Your courses</h1>
          <p>Choose a course to view its assignments and AI usage reports.</p>
        </div>

        <ul className="course-card-grid">
          {courses.map((course) => {
            const isSelected = selectedCourseId === course.id;
            const assignmentsId = `assignments-${course.id}`;

            return (
              <li className="course-card-item" key={course.id}>
                <article className={`course-card${isSelected ? " selected" : ""}`}>
                  <button
                    className="course-card-button"
                    type="button"
                    aria-expanded={isSelected}
                    aria-controls={assignmentsId}
                    onClick={() =>
                      setSelectedCourseId(isSelected ? null : course.id)
                    }
                  >
                    <span className="course-code">{course.code}</span>
                    <span className="course-card-title">{course.name}</span>
                    <span className="course-card-description">
                      {course.description}
                    </span>
                    <span className="course-card-footer">
                      {course.assignments.length} assignments
                      <span className="course-card-arrow" aria-hidden="true">
                        {isSelected ? "−" : "+"}
                      </span>
                    </span>
                  </button>

                  {isSelected && (
                    <div className="course-assignment-picker" id={assignmentsId}>
                      <label htmlFor={`assignment-${course.id}`}>
                        Choose an assignment
                      </label>
                      <select
                        id={`assignment-${course.id}`}
                        defaultValue=""
                        onChange={(event) => {
                          if (event.target.value) {
                            openAssignment(course.id, event.target.value);
                          }
                        }}
                      >
                        <option value="" disabled>
                          Select an assignment
                        </option>
                        {course.assignments.map((assignment) => (
                          <option key={assignment.id} value={assignment.id}>
                            {assignment.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        style={{
                          marginTop: 10,
                          width: "100%",
                          padding: "9px 12px",
                          font: "inherit",
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#fff",
                          background: "#4f46e5",
                          border: "none",
                          borderRadius: 8,
                          cursor: "pointer",
                        }}
                        onClick={() => router.push(`/courses/${course.id}`)}
                      >
                        View semester trends
                      </button>
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}