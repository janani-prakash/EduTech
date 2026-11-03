export type UsageCategory = {
  name: string;
  percentage: number;
  color: string;
};

export type StudentFeedback = {
  student: string;
  category: string;
  message: string;
};

export type Assignment = {
  id: string;
  name: string;
  usagePercentage: number;
  reportCount: number;
  submissionCount: number;
  categories: UsageCategory[];
  feedback: StudentFeedback[];
};

export type RecurringTheme = {
  title: string;
  category: string;
  summary: string;
};

export type Course = {
  id: string;
  code: string;
  name: string;
  description: string;
  assignments: Assignment[];
  themes: RecurringTheme[];
};

const categoryColors = {
  clarification: "#68a0ed",
  brainstorming: "#f5b91b",
  checking: "#36c99a",
  drafting: "#ef7078",
};

function categories(
  clarification: number,
  brainstorming: number,
  checking: number,
  drafting: number,
): UsageCategory[] {
  return [
    { name: "Clarifying concepts", percentage: clarification, color: categoryColors.clarification },
    { name: "Brainstorming", percentage: brainstorming, color: categoryColors.brainstorming },
    { name: "Checking work", percentage: checking, color: categoryColors.checking },
    { name: "Drafting answers", percentage: drafting, color: categoryColors.drafting },
  ];
}

export const categoryNames = categories(0, 0, 0, 0).map((category) => category.name);

export const courses: Course[] = [
  {
    id: "cs-4385",
    code: "CS 4385",
    name: "Automata Theory",
    description:
      "Explore formal languages, finite automata, and the theory behind computation.",
    assignments: [
      {
        id: "homework-1",
        name: "Homework 1",
        usagePercentage: 54,
        reportCount: 27,
        submissionCount: 50,
        categories: categories(38, 22, 28, 12),
        feedback: [
          { student: "Student 1", category: "Clarifying concepts", message: "Asked AI to explain the difference between a DFA and an NFA using a small example." },
          { student: "Student 2", category: "Checking work", message: "Traced a few test strings through my DFA with AI to make sure it rejected the ones it should." },
          { student: "Student 3", category: "Brainstorming", message: "Explored possible state designs for the \"ends in 01\" language, then built and justified my own machine." },
        ],
      },
      {
        id: "homework-2",
        name: "Homework 2",
        usagePercentage: 76,
        reportCount: 38,
        submissionCount: 50,
        categories: categories(31, 29, 24, 16),
        feedback: [
          { student: "Student 1", category: "Clarifying concepts", message: "Had AI walk through the subset construction so I could explain converting an NFA to a DFA in my own words." },
          { student: "Student 2", category: "Brainstorming", message: "Compared a few choices of string for my pumping-lemma proof before choosing one." },
          { student: "Student 3", category: "Checking work", message: "Asked AI to spot a missing case in my regular expression for strings with an even number of a's." },
        ],
      },
      {
        id: "exam-1",
        name: "Exam 1",
        usagePercentage: 68,
        reportCount: 34,
        submissionCount: 50,
        categories: categories(42, 26, 18, 14),
        feedback: [
          { student: "Student 1", category: "Clarifying concepts", message: "Used AI to revisit the pumping lemma on a practice problem after the lecture notes didn't click." },
          { student: "Student 2", category: "Brainstorming", message: "Asked for ways to structure a proof, then wrote the answer independently." },
          { student: "Student 3", category: "Checking work", message: "Checked a state diagram for a missing transition and verified the fix myself." },
        ],
      },
    ],
    themes: [
      { title: "Pumping lemma proofs", category: "Clarifying concepts", summary: "Most cited difficulty across 2 assignments. 19 students asked AI to re-explain how to pick a string to pump." },
      { title: "Designing states", category: "Brainstorming", summary: "Students use AI to sketch possible state designs before building their own machines, peaking on Homework 2 (29%)." },
      { title: "Testing with sample strings", category: "Checking work", summary: "Students trace test strings through their DFAs and regular expressions to catch missing cases. Highest on Homework 1 (28%)." },
      { title: "Proof outlines", category: "Drafting answers", summary: "A smaller group asks AI for a proof outline, then writes the argument themselves. Highest on Homework 2 (16%)." },
    ],
  },
  {
    id: "cs-3346",
    code: "CS 3346",
    name: "PYTHON for Biobehavioral Data Science",
    description:
      "Use Python to prepare, analyze, and interpret data in biobehavioral research.",
    assignments: [
      {
        id: "term-project",
        name: "Term Project",
        usagePercentage: 82,
        reportCount: 41,
        submissionCount: 50,
        categories: categories(24, 34, 18, 24),
        feedback: [
          { student: "Student 1", category: "Brainstorming", message: "Used AI to compare project questions and narrow our team to one we could answer with our data." },
          { student: "Student 2", category: "Drafting answers", message: "Asked for a clearer outline for the methods section, then wrote it using our actual process." },
          { student: "Student 3", category: "Checking work", message: "Had AI review chart labels for clarity and checked each suggestion against the source data." },
        ],
      },
      {
        id: "term-project-progress-check",
        name: "Term Project Progress Check",
        usagePercentage: 61,
        reportCount: 30,
        submissionCount: 49,
        categories: categories(29, 32, 25, 14),
        feedback: [
          { student: "Student 1", category: "Brainstorming", message: "Brainstormed ways to divide the remaining analysis tasks across our project group." },
          { student: "Student 2", category: "Checking work", message: "Asked AI to check whether the percentages in my progress summary added up correctly." },
          { student: "Student 3", category: "Clarifying concepts", message: "Got a plain-language explanation of the sampling limitation I needed to discuss." },
        ],
      },
      {
        id: "midterm-exam",
        name: "Midterm Exam",
        usagePercentage: 47,
        reportCount: 23,
        submissionCount: 49,
        categories: categories(45, 20, 23, 12),
        feedback: [
          { student: "Student 1", category: "Clarifying concepts", message: "Asked AI to distinguish correlation from causation with an example from class." },
          { student: "Student 2", category: "Checking work", message: "Used AI to verify a confidence-interval calculation, then recomputed it by hand." },
          { student: "Student 3", category: "Brainstorming", message: "Generated a few examples to help remember when a median is more useful than a mean." },
        ],
      },
    ],
    themes: [
      { title: "Statistics concepts", category: "Clarifying concepts", summary: "Peaks on the Midterm Exam (45%). Students ask AI to explain correlation vs. causation and sampling limits." },
      { title: "Scoping the project", category: "Brainstorming", summary: "Groups use AI to narrow research questions and split up analysis tasks. Highest on the Term Project (34%)." },
      { title: "Verifying calculations", category: "Checking work", summary: "Students check percentages and confidence intervals with AI, then recompute them by hand." },
      { title: "Methods section outlines", category: "Drafting answers", summary: "Drafting help is concentrated on the Term Project (24%), mostly outlines for the methods section." },
    ],
  },
  {
    id: "cs-4347",
    code: "CS 4347",
    name: "Database Systems",
    description:
      "Design relational databases and build dependable data-driven applications.",
    assignments: [
      {
        id: "logical-diagram",
        name: "Logical Diagram",
        usagePercentage: 58,
        reportCount: 29,
        submissionCount: 50,
        categories: categories(32, 27, 29, 12),
        feedback: [
          { student: "Student 1", category: "Clarifying concepts", message: "Asked how to show a one-to-many relationship and compared the explanation with the rubric." },
          { student: "Student 2", category: "Checking work", message: "Had AI check whether every foreign key in my diagram pointed to an existing entity." },
          { student: "Student 3", category: "Brainstorming", message: "Used AI to list edge cases for our library-loan scenario before updating the diagram." },
        ],
      },
      {
        id: "eer-diagram",
        name: "EER Diagram",
        usagePercentage: 73,
        reportCount: 36,
        submissionCount: 49,
        categories: categories(35, 30, 21, 14),
        feedback: [
          { student: "Student 1", category: "Clarifying concepts", message: "Asked for another explanation of total versus partial specialization with a new example." },
          { student: "Student 2", category: "Brainstorming", message: "Explored whether the scenario needed a weak entity before making the final design choice." },
          { student: "Student 3", category: "Checking work", message: "Used AI to look for attributes that might belong on a relationship instead of an entity." },
        ],
      },
      {
        id: "ddl-script",
        name: "DDL Script",
        usagePercentage: 64,
        reportCount: 32,
        submissionCount: 50,
        categories: categories(23, 16, 39, 22),
        feedback: [
          { student: "Student 1", category: "Checking work", message: "Asked AI to review my CREATE TABLE statements for missing constraints and checked each one." },
          { student: "Student 2", category: "Clarifying concepts", message: "Got help understanding why a composite key fit the table better than a single-column key." },
          { student: "Student 3", category: "Drafting answers", message: "Used a suggested SQL syntax pattern as a reference, then adapted and tested the script." },
        ],
      },
      {
        id: "python-faker-script",
        name: "Python Faker Script",
        usagePercentage: 88,
        reportCount: 44,
        submissionCount: 50,
        categories: categories(17, 21, 36, 26),
        feedback: [
          { student: "Student 1", category: "Checking work", message: "Had AI help trace why my generated records violated a foreign-key constraint." },
          { student: "Student 2", category: "Drafting answers", message: "Used a short code example to get started with Faker, then tailored fields to my schema." },
          { student: "Student 3", category: "Brainstorming", message: "Asked for realistic test-data cases, including empty values and duplicate-looking names." },
        ],
      },
    ],
    themes: [
      { title: "Relationships and keys", category: "Clarifying concepts", summary: "Most cited difficulty across 3 assignments. Students ask AI to re-explain one-to-many relationships and composite keys." },
      { title: "Scenario edge cases", category: "Brainstorming", summary: "Students list edge cases with AI before finalizing their designs, mostly on the Logical and EER Diagrams." },
      { title: "Constraint checks", category: "Checking work", summary: "AI use for checking work rises on the coding assignments, peaking on the DDL Script (39%)." },
      { title: "Starter code", category: "Drafting answers", summary: "Students adapt short SQL and Faker examples to their own schema. Highest on the Python Faker Script (26%)." },
    ],
  },
];

export function getCourse(courseId: string): Course | undefined {
  return courses.find((course) => course.id === courseId);
}
