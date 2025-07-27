"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/utils/supabase/client";

export default function Comments({ postId, refreshPosts }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at");

    setComments(data || []);
  }, [postId]);

  useEffect(() => {
    if (!postId) return;

    fetchComments();
  }, [postId, fetchComments]);

  async function handleSubmit(e) {
    e.preventDefault();
    const content = newComment.trim();
    if (!content) return;

    const { error } = await supabase
      .from("comments")
      .insert([{ post_id: postId, content }]);

    if (!error) {
      setNewComment("");
      fetchComments();
      refreshPosts?.();
    }
  }

  return (
    <div>
      <h4>Comments</h4>
      {comments.map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
