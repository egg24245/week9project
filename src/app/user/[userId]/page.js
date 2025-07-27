"use client";

import "../../styles/user.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function UserPage() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("Invalid user ID");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const { data: profileData, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("clerk_user_id", userId)
          .single();

        if (profileError) throw profileError;

        setProfile(profileData);

        const { data: postsData, error: postsError } = await supabase
          .from("devposts")
          .select("*")
          .eq("user_id", profileData.id)
          .order("created_at", { ascending: false });

        if (postsError) throw postsError;

        setPosts(postsData || []);
      } catch (err) {
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <p>User not found.</p>;

  return (
    <div className="container">
      <h2>{profile.username || "User Profile"}</h2>
      <p>Bio: {profile.bio || "No bio available."}</p>
      <h3>Posts:</h3>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map(({ id, title, content }) => (
          <div key={id} className="post-card">
            <h4>{title}</h4>
            <p>{content}</p>
          </div>
        ))
      )}
    </div>
  );
}
