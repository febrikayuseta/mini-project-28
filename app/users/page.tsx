"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../components/AuthGuard";

interface Me {
  id?: number; 
  email: string;
  first_name?: string;
  last_name?: string;
  project_id?: number;
}

interface RegisteredUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role?: string;
}

export default function UsersPage() {
  const [me, setMe] = useState<Me | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const router = useRouter();

  // Fetch logged-in user info
  useEffect(() => {
    const fetchMe = async () => {
      const sessionToken = localStorage.getItem("session_token");
      if (!sessionToken) {
        router.push("/");
        return;
      }

      try {
        const res = await fetch("https://reqres.in/api/app-users/me", {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await res.json();

        setMe({
          email: data.data.email,
          project_id: data.data.project_id,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
        });
      } catch (err) {
        console.error(err);
        router.push("/");
      }
    };

    fetchMe();
  }, [router]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("session_token");
    router.push("/");
  };

  // Fetch registered users
  const fetchRegisteredUsers = async () => {
  setLoadingUsers(true);
  try {
    const res = await fetch(
      "https://reqres.in/api/collections/mini-project-28/records/2510ee26-8395-449c-a8f9-2f1ed716bfc0?project_id=1082",
      {
        headers: {
          "x-api-key": "dev_463f95f2c7a51604101a02030c80e8e137afbfcfd3bcc059",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch registered users");
    }

    const data = await res.json();

    // 🔴 OLD
    // setRegisteredUsers(data.data ? [data.data] : []);

    // ✅ NEW — get users from record response
    setRegisteredUsers(data?.data?.data?.records ?? []);
  } catch (err) {
    console.error(err);
    alert("Error fetching registered users");
  } finally {
    setLoadingUsers(false);
  }
};


  return (
    <AuthGuard>
      <main style={{ padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>User Info</h1>
          <button onClick={handleLogout} style={{ padding: "0.5rem 1rem" }}>
            Logout
          </button>
        </div>

        {me ? (
          <div style={{ marginTop: "1rem" }}>
            <p>Email: {me.email}</p>
            {me.first_name && me.last_name && (
              <p>
                Name: {me.first_name} {me.last_name}
              </p>
            )}
            {me.project_id && <p>Project ID: {me.project_id}</p>}
          </div>
        ) : (
          <p>Loading user info...</p>
        )}

        {/* Button to fetch registered users */}
        <div style={{ marginTop: "2rem" }}>
          <button onClick={fetchRegisteredUsers} style={{ padding: "0.5rem 1rem" }}>
            {loadingUsers ? "Loading..." : "Show Registered Users"}
          </button>

          {/* Display registered users */}
          {registeredUsers.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
              <h2>Mock Registered Users:</h2>
              <ul>
                {registeredUsers.map((user) => (
                  <li key={user.id}>
                    {user.first_name} {user.last_name} ({user.email}) {user.role && `- ${user.role}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </AuthGuard>
  );
}
