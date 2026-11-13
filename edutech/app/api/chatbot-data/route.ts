import { courses } from "../../data/course-data";

export function GET() {
  return Response.json({ courses });
}
