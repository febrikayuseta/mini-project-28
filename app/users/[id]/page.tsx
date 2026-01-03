"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/reqres";
import AuthGuard from "../../components/AuthGuard";
import type { AxiosResponse } from "axios";
import type { User } from "../page";

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    api.get(`/users/${id}`)
      .then((res: AxiosResponse) => setUser(res.data.data));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <AuthGuard>
      <main>
        <h1>User Detail</h1>
        <img src={user.avatar} width={100} />
        <p>{user.first_name} {user.last_name}</p>
        <p>{user.email}</p>
      </main>
    </AuthGuard>
  );
}