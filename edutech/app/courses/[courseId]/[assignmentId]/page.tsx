import { Suspense } from "react";
import { notFound } from "next/navigation";
import { courses, getCourse } from "../../../data/course-data";
import AssignmentDashboard from "./dashboard";

type AssignmentPageProps = {
  params: Promise<{ courseId: string; assignmentId: string }>;
};

export function generateStaticParams() {
  return courses.flatMap((course) =>
    course.assignments.map((assignment) => ({
      courseId: course.id,
      assignmentId: assignment.id,
    })),
  );
}

async function AssignmentContent({ params }: AssignmentPageProps) {
  const { courseId, assignmentId } = await params;
  const course = getCourse(courseId);
  const assignment = course?.assignments.find(
    (item) => item.id === assignmentId,
  );

  if (!course || !assignment) {
    notFound();
  }

  return (
    <AssignmentDashboard
      key={assignment.id}
      course={course}
      assignment={assignment}
    />
  );
}

export default function AssignmentPage({ params }: AssignmentPageProps) {
  return (
    <Suspense
      fallback={
        <main className="dashboard dashboard-loading" role="status">
          Loading assignment report…
        </main>
      }
    >
      <AssignmentContent params={params} />
    </Suspense>
  );
}
