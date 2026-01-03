"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/reqres";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await api.post("/register", {
        email,
        password
      });

      alert("Register success. Token: " + res.data.token);
      router.push("/");
    } catch {
      alert("Register failed");
    }
  };

  return (
    <main>
      <h1>Register</h1>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
    </main>
  );
}