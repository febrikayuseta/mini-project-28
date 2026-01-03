"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import reqres from "@/lib/reqres";
import AuthGuard from "../../components/AuthGuard";
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface Me {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  // MOCK fetch “me” info
  const [me, setMe] = useState<Me | null>(null);
  useEffect(() => {
    const email = localStorage.getItem("mock_email");
    setMe({ email, id: 1, first_name: "John", last_name: "Doe" });
  }, []);

  useEffect(() => {
    reqres
      .get("/users")
      .then((res) => setUsers(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <AuthGuard>
      <main style={{ padding: "2rem" }}>
        <h1>User List</h1>
        {me && <p>Logged in as: {me.first_name} {me.last_name} ({me.email})</p>}
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => router.push(`/users/${user.id}`)}
            style={{ cursor: "pointer", margin: "1rem 0" }}
          >
            <p>{user.first_name} {user.last_name}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </main>
    </AuthGuard>
  );
}
