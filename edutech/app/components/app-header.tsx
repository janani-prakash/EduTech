import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="courses-brand">
      <Link className="brand-link" href="/courses" aria-label="EduTech courses">
        <span className="logo" aria-hidden="true">E</span>
        <span>EduTech</span>
      </Link>
      <Link className="logout-button" href="/">
        Log out
      </Link>
    </header>
  );
}
