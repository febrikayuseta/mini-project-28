"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    try {
      if (!otp) return alert("Please enter the OTP");

      const res = await fetch("https://reqres.in/api/app-users/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Verification failed");
        return;
      }

      // Save session_token from API response
      localStorage.setItem("session_token", data.data.session_token);

      // Save email for convenience
      localStorage.setItem("user_email", data.data.email);

      router.push("/users");
    } catch (err) {
      console.error(err);
      alert("Something went wrong during verification");
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Enter OTP</h1>
      <input
        placeholder="6-digit code"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={{ display: "block", margin: "1rem 0", padding: "0.5rem" }}
      />
      <button onClick={handleVerify} style={{ padding: "0.5rem 1rem" }}>
        Verify
      </button>
    </main>
  );
}
