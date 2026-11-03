import { Suspense } from "react";
import { notFound } from "next/navigation";
import AppHeader from "../../components/app-header";
import CourseHeader from "../../components/course-header";
import FeedbackPanel from "../../components/feedback-panel";
import { categoryNames, courses, getCourse } from "../../data/course-data";

type SemesterPageProps = {
  params: Promise<{ courseId: string }>;
};

export function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.id }));
}

async function SemesterContent({ params }: SemesterPageProps) {
  const { courseId } = await params;
  const course = getCourse(courseId);

  if (!course) {
    notFound();
  }

  const { assignments } = course;
  const averageUsage = Math.round(
    assignments.reduce((total, item) => total + item.usagePercentage, 0) /
      assignments.length,
  );
  const peak = assignments.reduce((top, item) =>
    item.usagePercentage > top.usagePercentage ? item : top,
  );
  const lowest = assignments.reduce((low, item) =>
    item.usagePercentage < low.usagePercentage ? item : low,
  );

  return (
    <>
      <AppHeader />
      <main className="dashboard">
        <CourseHeader course={course} subtitle="Semester trends" />

        <div className="dashboard-grid">
          <section className="dashboard-left" aria-label="Semester AI usage summary">
            <section className="usage-stat" aria-label="Average AI usage">
              <p className="usage-percentage">{averageUsage}%</p>
              <p className="usage-description">
                average AI usage across {assignments.length} assignments
              </p>
              <p className="usage-detail">
                Peak: {peak.name} ({peak.usagePercentage}%) · Lowest:{" "}
                {lowest.name} ({lowest.usagePercentage}%)
              </p>
            </section>
          </section>

          <FeedbackPanel
            title="Recurring themes"
            categories={categoryNames}
            items={course.themes.map((theme) => ({
              heading: theme.title,
              category: theme.category,
              text: theme.summary,
            }))}
          />
        </div>
      </main>
    </>
  );
}

export default function SemesterPage({ params }: SemesterPageProps) {
  return (
    <Suspense
      fallback={
        <main className="dashboard dashboard-loading" role="status">
          Loading semester trends…
        </main>
      }
    >
      <SemesterContent params={params} />
    </Suspense>
  );
}
