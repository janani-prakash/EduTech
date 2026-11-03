"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const user = data.get("username");
    const pass = data.get("password");

    if (user === "rivera@utdallas.edu" && pass === "password123") {
      router.push("/courses");
    } else {
      setError("Incorrect username or password.");
    }
  }

  return (
    <main>
      <h1>Welcome to EduTech</h1>
      <p>Sign in to see how your students are using AI.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" placeholder="netid@utdallas.edu" />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" placeholder="Enter your password" />

        <button type="submit">Sign in</button>
        <p>{error}</p>
      </form>
    </main>
  );
}