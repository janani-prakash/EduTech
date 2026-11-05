import { Suspense } from "react";
import { notFound } from "next/navigation";
import AppHeader from "../../components/app-header";
import CourseHeader from "../../components/course-header";
import FeedbackPanel from "../../components/feedback-panel";
import SemesterTrends from "../../components/semester-trends";
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

  return (
    <>
      <AppHeader />
      <main className="dashboard">
        <CourseHeader course={course} subtitle="Semester trends" />

        <div className="dashboard-grid">
          <section className="dashboard-left" aria-label="Semester AI usage summary">
            <SemesterTrends course={course} />
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