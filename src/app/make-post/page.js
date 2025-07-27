"use client";

import "../styles/MakePostPage.css";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
export default function MakePostPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userUUID, setUserUUID] = useState(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", user.id)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setUserUUID(data.id);
      });
  }, [isLoaded, user]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!userUUID) return alert("User info loading...");

    const { error } = await supabase
      .from("devposts")
      .insert([{ user_id: userUUID, title, content }]);

    if (error) {
      alert("Failed: " + error.message);
    } else {
      router.push("/");
    }
  }

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          required
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
