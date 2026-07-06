"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [churchName, setChurchName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
        email: email,
        church_name: churchName,
      });

      alert("Registration successful!");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create Account
        </h1>

        <input
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg mb-4"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          placeholder="Church Name"
          className="w-full border p-3 rounded-lg mb-4"
          value={churchName}
          onChange={(e) => setChurchName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Create Account
        </button>
      </div>
    </main>
  );
}