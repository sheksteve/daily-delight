"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import MobileNav from "@/components/MobileNav";

type Profile = {
  id: string;
  full_name: string;
  church_name: string;
  total_points: number;
  devotion_count: number;
  current_streak: number;
};

export default function LeaderboardPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  async function fetchLeaderboard() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("total_points", { ascending: false });

    if (!error && data) {
      setProfiles(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          🏆 Daily Delight Leaderboard
        </h1>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="grid grid-cols-5 bg-blue-900 text-white p-4 font-bold">
            <div>Rank</div>
            <div>Name</div>
            <div>Church</div>
            <div>Points</div>
            <div>Streak</div>
          </div>

          {profiles.map((profile, index) => (
            <div
              key={profile.id}
              className="grid grid-cols-5 p-4 border-b items-center"
            >
              <div className="font-bold text-lg">
                #{index + 1}
              </div>

              <div>{profile.full_name}</div>

              <div>{profile.church_name || "—"}</div>

              <div className="font-bold text-blue-700">
                {profile.total_points}
              </div>

              <div>
                🔥 {profile.current_streak || 0}
              </div>
            </div>
          ))}

        </div>
      </div>
      <MobileNav />
    </main>
  );
}