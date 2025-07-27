"use client";
import "@/app/styles/Auth.css";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="auth-container">
      <h1>Create an Account</h1>
      <SignUp
        path="/sign-up"
        routing="path"
        appearance={{ elements: { card: "cl-auth-card" } }}
      />
    </div>
  );
}
