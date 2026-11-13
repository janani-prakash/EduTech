import AppHeader from "../../../components/app-header";
import CourseHeader from "../../../components/course-header";
import FeedbackPanel from "../../../components/feedback-panel";
import {
  categoryNames,
  type Assignment,
  type Course,
} from "../../../data/course-data";

type Props = {
  course: Course;
  assignment: Assignment;
};

const circumference = 2 * Math.PI * 42;

export default function AssignmentDashboard({ course, assignment }: Props) {
  return (
    <>
      <AppHeader />
      <main className="dashboard">
        <CourseHeader
          course={course}
          subtitle={assignment.name}
          assignmentId={assignment.id}
        />

      <div className="dashboard-grid">
        <section className="dashboard-left" aria-label="AI usage summary">
          <section className="panel usage-panel">
            <h2>AI usage by category</h2>
            <div className="usage-content">
              <div
                className="donut-chart"
                role="img"
                aria-label={`AI usage by category: ${assignment.categories.map((item) => `${item.percentage}% ${item.name}`).join(", ")}`}
              >
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <circle className="donut-track" cx="50" cy="50" r="42" />
                  {assignment.categories.map((category, index) => {
                    const previousPercentage = assignment.categories
                      .slice(0, index)
                      .reduce((total, item) => total + item.percentage, 0);

                    return (
                      <circle
                        key={category.name}
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke={category.color}
                        strokeWidth="16"
                        strokeDasharray={`${(category.percentage / 100) * circumference} ${circumference}`}
                        strokeDashoffset={`${-(previousPercentage / 100) * circumference}`}
                      />
                    );
                  })}
                </svg>
                <span className="donut-label">
                  <strong>% AI</strong>
                  <strong>usage</strong>
                </span>
              </div>

              <ul className="category-legend">
                {assignment.categories.map((category) => (
                  <li key={category.name}>
                    <span
                      className="legend-dot"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="legend-name">{category.name}</span>
                    <strong>{category.percentage}%</strong>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="usage-stat" aria-label="Student AI usage">
            <p className="usage-percentage">{assignment.usagePercentage}%</p>
            <p className="usage-description">
              of students reported using AI on {assignment.name}
            </p>
            <p className="usage-detail">
              {assignment.reportCount} of {assignment.submissionCount}{" "}
              submissions included an AI report
            </p>
          </section>
        </section>

        <FeedbackPanel
          title="Student Feedback"
          categories={categoryNames}
          items={assignment.feedback.map((item) => ({
            heading: item.student,
            category: item.category,
            text: item.message,
          }))}
        />
      </div>

      <aside className="assistant">
        <a
          className="assistant-toggle"
          href="/ChatBot.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span aria-hidden="true">✦</span>
          Ask AI
        </a>
      </aside>
      </main>
    </>
  );
}
