"use client";
import "../styles/AuthorInfo.css";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import Avatar from "@/components/Avatar";
import Image from "next/image";

export default function ProfilesPage() {
  const [users, setUsers] = useState();

  useEffect(() => {
    supabase
      .from("users")
      .select("*")
      .order("username")
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching users:", error);
          setUsers([]);
        } else {
          setUsers(data || []);
        }
      });
  }, []);

  if (!users) return <p>Loading...</p>;
  if (!users.length) return <p>No profiles found.</p>;

  return (
    <div>
      <h1>All User Profiles</h1>
      <ul>
        {users.map(({ id, avatar_url, username, bio, skills }) => (
          <li key={id}>
            {avatar_url ? (
              <Image
                src={avatar_url}
                alt={username}
                width={100}
                height={100}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <Avatar username={username} />
            )}
            <div>
              <h2>{username}</h2>
              <p>{bio}</p>
              <p>Skills: {skills?.join(", ") || "None"}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
