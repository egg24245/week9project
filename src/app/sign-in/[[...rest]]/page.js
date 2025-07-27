"use client";
import "@/app/styles/Auth.css";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="auth-container">
      <h1>Welcome Back!</h1>
      <SignIn
        path="/sign-in"
        routing="path"
        appearance={{ elements: { card: "cl-auth-card" } }}
      />
    </div>
  );
}
