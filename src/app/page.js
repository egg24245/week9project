"use client";
import "@/app/styles/HomePage.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Comments from "@/components/Comments";
import AuthorInfo from "@/components/AuthorInfo";

export default function HomePage() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("devposts")
      .select(`*, users:users (id, username)`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading posts:", error);
      setPosts([]);
    } else {
      setPosts(data || []);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function refreshPosts() {
    router.refresh();
  }

  return (
    <div>
      <h1>Welcome to DevConnect</h1>
      <p>
        Use the nav bar above to sign in/out, create posts, and view profiles.
        And use the home link to return to this page.
      </p>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <AuthorInfo user={post.users} />
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <Comments postId={post.id} refreshPosts={refreshPosts} />
          </div>
        ))
      )}
    </div>
  );
}
