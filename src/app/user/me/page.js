"use client";

import "../../styles/user.css";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import ProfileForm from "@/components/ProfileForm";

export default function MyProfilePage() {
  const { user, isLoaded } = useUser();
  const [form, setForm] = useState({ username: "", bio: "", skills: "" });

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchProfile = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("clerk_user_id", user.id)
        .single();

      if (data) {
        setForm({
          username: data.username || "",
          bio: data.bio || "",
          skills: data.skills?.join(", ") || "",
        });
      }
    };

    fetchProfile();
  }, [isLoaded, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("users").upsert(
      {
        clerk_user_id: user.id,
        username: form.username,
        bio: form.bio,
        skills: form.skills.split(",").map((s) => s.trim()),
      },
      { onConflict: "clerk_user_id" }
    );

    if (error) {
      alert("Failed to save profile.");
      console.error("Save failed:", error.message);
      return;
    }

    alert("Profile saved!");
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h1>Edit Profile</h1>
      <ProfileForm form={form} setForm={setForm} onSubmit={handleSubmit} />
    </div>
  );
}
