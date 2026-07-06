"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import MobileNav from "@/components/MobileNav";

export default function DevotionPage() {
  const [scripture, setScripture] = useState("");
  const [observation, setObservation] = useState("");
  const [application, setApplication] = useState("");
  const [prayer, setPrayer] = useState("");

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("You must login first");
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  // Check if already submitted today
  const { data: existingDevotion } = await supabase
    .from("devotions")
    .select("*")
    .eq("user_id", user.id)
    .eq("devotion_date", today)
    .maybeSingle();

  if (existingDevotion) {
    alert(
      "You have already submitted today's devotion. Come back tomorrow."
    );
    return;
  }

  // Insert devotion
  const { error } = await supabase.from("devotions").insert([
    {
      user_id: user.id,
      devotion_date: today,
      scripture,
      observation,
      application,
      prayer,
    },
  ]);

  if (error) {
    alert(error.message);
    return;
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select(`
      total_points,
      devotion_count,
      current_streak,
      longest_streak,
      last_devotion_date
    `)
    .eq("id", user.id)
    .single();

  if (profile) {
    const newPoints =
      (profile.total_points || 0) + 20;

    let newStreak = 1;

    if (profile.last_devotion_date) {
      const lastDate = new Date(profile.last_devotion_date);
      const todayDate = new Date(today);

      const diffTime =
        todayDate.getTime() - lastDate.getTime();

      const diffDays =
        diffTime / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        newStreak =
          (profile.current_streak || 0) + 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      } else {
        newStreak =
          profile.current_streak || 1;
      }
    }

    const longest =
      newStreak > (profile.longest_streak || 0)
        ? newStreak
        : profile.longest_streak;

    await supabase
      .from("profiles")
      .update({
        total_points: newPoints,
        devotion_count:
          (profile.devotion_count || 0) + 1,
        current_streak: newStreak,
        longest_streak: longest,
        last_devotion_date: today,
      })
      .eq("id", user.id);
  }

  alert("Devotion submitted! +20 points");

  // Clear form
    setScripture("");
  setObservation("");
  setApplication("");
  setPrayer("");
}

return (
  <main className="min-h-screen bg-blue-50 pb-24">

    <div className="p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Daily Devotion
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Scripture"
            value={scripture}
            onChange={(e) => setScripture(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />

          <textarea
            placeholder="Observation"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />

          <textarea
            placeholder="Application"
            value={application}
            onChange={(e) => setApplication(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />

          <textarea
            placeholder="Prayer"
            value={prayer}
            onChange={(e) => setPrayer(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Submit Devotion
          </button>

        </form>

      </div>
    </div>

    <MobileNav />

  </main>
);