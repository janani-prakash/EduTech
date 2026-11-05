"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Course } from "../data/course-data";

type Props = {
  course: Course;
  subtitle: string;
  // Leave unset on the semester trends page ("All assignments").
  assignmentId?: string;
};

export default function CourseHeader({ course, subtitle, assignmentId = "" }: Props) {
  const router = useRouter();

  return (
    <header className="dashboard-header">
      <div className="dashboard-heading">
        <Link className="back-to-courses" href="/courses">
          <span aria-hidden="true">←</span> Back to courses
        </Link>
        <div className="dashboard-title">
          <span className="dashboard-course-code">COURSE</span>
          <h1>{course.code}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <label className="assignment-select-wrap" htmlFor="assignment-select">
        <span className="visually-hidden">Switch assignment</span>
        <select
          id="assignment-select"
          value={assignmentId}
          onChange={(event) =>
            router.push(
              event.target.value
                ? `/courses/${course.id}/${event.target.value}`
                : `/courses/${course.id}`,
            )
          }
        >
          <option value="">All assignments</option>
          {course.assignments.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
    </header>
  );
}