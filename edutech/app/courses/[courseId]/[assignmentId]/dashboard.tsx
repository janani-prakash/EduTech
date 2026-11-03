"use client";

import { useState, type FormEvent } from "react";
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

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const circumference = 2 * Math.PI * 42;

function getAssistantReply(question: string, assignment: Assignment): string {
  const topCategory = assignment.categories.reduce((top, item) =>
    item.percentage > top.percentage ? item : top,
  );
  const examples = assignment.feedback.slice(0, 2);

  if (/concern|risk|worry|follow.?up/i.test(question)) {
    return `Treat this as a conversation starter, not evidence of misconduct. ${assignment.reportCount} of ${assignment.submissionCount} submissions included a self-reported AI report. You could follow up with students about how they verified AI suggestions, especially for ${topCategory.name.toLowerCase()}.`;
  }

  if (/example|student|how|what.*use|use.*ai/i.test(question)) {
    return `A couple of examples from ${assignment.name}: ${examples.map((item) => `${item.student} (${item.category.toLowerCase()}) ${item.message}`).join(" ")} These are sample, anonymized prototype responses.`;
  }

  if (/category|breakdown|common|most/i.test(question)) {
    return `For ${assignment.name}, the most reported use was ${topCategory.name.toLowerCase()} at ${topCategory.percentage}%. ${assignment.categories.map((item) => `${item.name}: ${item.percentage}%`).join("; ")}.`;
  }

  return `${assignment.usagePercentage}% of students reported using AI on ${assignment.name} (${assignment.reportCount} of ${assignment.submissionCount} submissions). The most common use was ${topCategory.name.toLowerCase()} at ${topCategory.percentage}%. You can ask me for examples, a category breakdown, or follow-up ideas.`;
}

export default function AssignmentDashboard({ course, assignment }: Props) {
  const [chatOpen, setChatOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `I can help you explore the ${assignment.name} report. Ask for a summary, category breakdown, student examples, or follow-up ideas.`,
    },
  ]);

  function askAssistant(prompt: string) {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) return;

    setMessages((current) => [
      ...current,
      { role: "user", content: trimmedPrompt },
      {
        role: "assistant",
        content: getAssistantReply(trimmedPrompt, assignment),
      },
    ]);
    setQuestion("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    askAssistant(question);
  }

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

      <aside className={`assistant${chatOpen ? " assistant-open" : ""}`}>
        {chatOpen && (
          <section className="assistant-panel" aria-label="AI report assistant">
            <header className="assistant-header">
              <div>
                <h2>AI report assistant</h2>
                <p>Demo assistant · uses this report&apos;s data</p>
              </div>
              <button
                className="assistant-close"
                type="button"
                aria-label="Close assistant"
                onClick={() => setChatOpen(false)}
              >
                ×
              </button>
            </header>

            <div className="assistant-messages" aria-live="polite">
              {messages.map((message, index) => (
                <p
                  className={`assistant-message ${message.role}`}
                  key={`${message.role}-${index}`}
                >
                  {message.content}
                </p>
              ))}
            </div>

            <div className="assistant-prompts" aria-label="Suggested questions">
              {[
                "Summarize this report",
                "How did students use AI?",
                "What should I follow up on?",
              ].map((prompt) => (
                <button
                  type="button"
                  key={prompt}
                  onClick={() => askAssistant(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form className="assistant-form" onSubmit={handleSubmit}>
              <label className="visually-hidden" htmlFor="assistant-question">
                Ask about this report
              </label>
              <input
                id="assistant-question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask about this report..."
              />
              <button type="submit" disabled={!question.trim()}>
                Send
              </button>
            </form>
          </section>
        )}

        <button
          className="assistant-toggle"
          type="button"
          aria-expanded={chatOpen}
          onClick={() => setChatOpen((open) => !open)}
        >
          <span aria-hidden="true">✦</span>
          {chatOpen ? "Close assistant" : "Ask AI"}
        </button>
      </aside>
      </main>
    </>
  );
}
