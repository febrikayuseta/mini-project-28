"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import reqres from "@/lib/reqres";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await reqres.post(
        "/api/app-users/login",
        {
          email,
          project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_PUBLIC_KEY!,
          },
        }
      );

      router.push(`/verify?email=${email}`);
    } catch (err) {
      console.error(err);
      alert("Failed to send verification code");
    }
  };

  return (
    <main>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button onClick={handleLogin}>Send Code</button>
    </main>
  );
}