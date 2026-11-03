"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const user = String(data.get("username") ?? "").trim().toLowerCase();
    const pass = String(data.get("password") ?? "");

    if (!user || !pass) {
      setError("Enter your username and password to sign in.");
      return;
    }
    if (user === "rivera@utdallas.edu" && pass === "password123") {
      router.push("/courses");
    } else {
      setError("That username or password is incorrect. Check both and try again.");
    }
  }

  function otherProvider(name: string) {
    setError(name + " sign-in isn't available in this prototype. Use your UT Dallas NetID.");
  }

  return (
    <>
      <header className="topbar">
        <span className="logo">E</span>
        <span>EduTech</span>
      </header>

      <main className="login-wrap">
        <section className="card">
          <h1>Welcome to EduTech</h1>
          <p className="sub">Sign in to see how your students are using AI.</p>

          <button
            type="button"
            className="btn btn-utd"
            onClick={() => document.getElementById("username")?.focus()}
          >
            Sign in with UT Dallas
          </button>

          <p className="divider">or sign in with your NetID</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" placeholder="netid@utdallas.edu" />

            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Enter your password" />

            {error && <p className="error" role="alert">{error}</p>}

            <button type="submit" className="btn btn-primary">Sign in</button>
          </form>

          <p className="other-label">Other options</p>
          <div className="other">
            <button type="button" className="btn btn-quiet" onClick={() => otherProvider("Google")}>Google</button>
            <button type="button" className="btn btn-quiet" onClick={() => otherProvider("Microsoft")}>Microsoft</button>
          </div>

          <p className="note">
            Built for instructors. Student AI reports are anonymous and kept separate from grades.
          </p>
        </section>
      </main>
    </>
  );
}