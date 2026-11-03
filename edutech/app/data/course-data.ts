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

export type Course = {
  id: string;
  code: string;
  name: string;
  description: string;
  assignments: Assignment[];
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
          { student: "Avery Brooks", category: "Clarifying concepts", message: "Asked AI to explain the difference between training and test data using a small example." },
          { student: "Maya Chen", category: "Checking work", message: "Used a second set of eyes on my confusion-matrix calculations before submitting." },
          { student: "Jordan Patel", category: "Brainstorming", message: "Explored possible features for the classification exercise, then chose and justified my own." },
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
          { student: "Riley Morgan", category: "Clarifying concepts", message: "Had AI walk through how regularization changes the loss function in my own words." },
          { student: "Samira Ali", category: "Brainstorming", message: "Compared a few approaches to handling an imbalanced dataset before choosing one." },
          { student: "Noah Williams", category: "Checking work", message: "Asked AI to spot a shape mismatch in my gradient-descent pseudocode." },
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
          { student: "Taylor Nguyen", category: "Clarifying concepts", message: "Used AI to revisit recursion in a practice problem after the lecture notes didn't click." },
          { student: "Casey Rivera", category: "Brainstorming", message: "Asked for ways to structure a response, then wrote the answer independently." },
          { student: "Emerson Davis", category: "Checking work", message: "Checked a final calculation for a logic error and verified the correction myself." },
        ],
      },
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
          { student: "Parker Johnson", category: "Brainstorming", message: "Used AI to compare project questions and narrow our team to one we could answer with our data." },
          { student: "Leila Hassan", category: "Drafting answers", message: "Asked for a clearer outline for the methods section, then wrote it using our actual process." },
          { student: "Quinn Thompson", category: "Checking work", message: "Had AI review chart labels for clarity and checked each suggestion against the source data." },
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
          { student: "Sofia Martinez", category: "Brainstorming", message: "Brainstormed ways to divide the remaining analysis tasks across our project group." },
          { student: "Ethan Brooks", category: "Checking work", message: "Asked AI to check whether the percentages in my progress summary added up correctly." },
          { student: "Amara Wilson", category: "Clarifying concepts", message: "Got a plain-language explanation of the sampling limitation I needed to discuss." },
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
          { student: "Dylan Kim", category: "Clarifying concepts", message: "Asked AI to distinguish correlation from causation with an example from class." },
          { student: "Nia Patel", category: "Checking work", message: "Used AI to verify a confidence-interval calculation, then recomputed it by hand." },
          { student: "Lucas Reed", category: "Brainstorming", message: "Generated a few examples to help remember when a median is more useful than a mean." },
        ],
      },
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
          { student: "Kai Anderson", category: "Clarifying concepts", message: "Asked how to show a one-to-many relationship and compared the explanation with the rubric." },
          { student: "Zoe Campbell", category: "Checking work", message: "Had AI check whether every foreign key in my diagram pointed to an existing entity." },
          { student: "Mateo Garcia", category: "Brainstorming", message: "Used AI to list edge cases for our library-loan scenario before updating the diagram." },
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
          { student: "Ivy Robinson", category: "Clarifying concepts", message: "Asked for another explanation of total versus partial specialization with a new example." },
          { student: "Omar Lewis", category: "Brainstorming", message: "Explored whether the scenario needed a weak entity before making the final design choice." },
          { student: "Grace Park", category: "Checking work", message: "Used AI to look for attributes that might belong on a relationship instead of an entity." },
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
          { student: "Miles Turner", category: "Checking work", message: "Asked AI to review my CREATE TABLE statements for missing constraints and checked each one." },
          { student: "Aisha Bennett", category: "Clarifying concepts", message: "Got help understanding why a composite key fit the table better than a single-column key." },
          { student: "Theo Price", category: "Drafting answers", message: "Used a suggested SQL syntax pattern as a reference, then adapted and tested the script." },
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
          { student: "Elena Foster", category: "Checking work", message: "Had AI help trace why my generated records violated a foreign-key constraint." },
          { student: "Benjamin Scott", category: "Drafting answers", message: "Used a short code example to get started with Faker, then tailored fields to my schema." },
          { student: "Priya Shah", category: "Brainstorming", message: "Asked for realistic test-data cases, including empty values and duplicate-looking names." },
        ],
      },
    ],
  },
];

export function getCourse(courseId: string): Course | undefined {
  return courses.find((course) => course.id === courseId);
}
