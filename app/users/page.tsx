"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/reqres";
import AuthGuard from "../components/AuthGuard";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get("/users?page=1")
      .then(res => setUsers(res.data.data));
  }, []);

  return (
    <AuthGuard>
      <main>
        <h1>User List</h1>

        {users.map((user: User) => (
          <div key={user.id}>
            <img src={user.avatar} width={50} />
            <p>{user.first_name} {user.last_name}</p>
            <button onClick={() => router.push(`/users/${user.id}`)}>
              Detail
            </button>
          </div>
        ))}
      </main>
    </AuthGuard>
  );
}