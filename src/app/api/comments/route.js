import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export async function GET(req) {
  const postId = new URL(req.url).searchParams.get("postId");
  if (!postId)
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });

  const { data, error } = await supabase
    .from("devcomments")
    .select("*, users(username)")
    .eq("post_id", postId)
    .order("created_at");

  return NextResponse.json(error ? { error: error.message } : data, {
    status: error ? 500 : 200,
  });
}

export async function POST(req) {
  const { postId, userId, content } = await req.json();
  if (!postId || !userId || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("devcomments")
    .insert({ post_id: postId, user_id: userId, content })
    .select()
    .single();

  return NextResponse.json(error ? { error: error.message } : data, {
    status: error ? 500 : 200,
  });
}
