"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import MobileNav from "@/components/MobileNav";

type Profile = {
  id: string;
  full_name: string;
  email: string;
  church_name: string;
  total_points: number;
  ai_bonus_points: number;
  current_streak: number;
  longest_streak: number;
  devotion_count: number;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id);

      if (error) {
        console.error(error);
        alert(error.message);
      } else if (data && data.length > 0) {
        setProfile(data[0]);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong loading profile.");
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Profile not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">

          <div className="w-24 h-24 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
            👤
          </div>

          <h1 className="text-4xl font-bold text-blue-900">
            {profile.full_name}
          </h1>

          <p className="text-gray-600 mt-2">
            {profile.email}
          </p>

          <p className="text-blue-700 mt-1">
            ⛪ {profile.church_name || "No church added"}
          </p>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div className="bg-blue-100 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-900">
              {profile.total_points || 0}
            </div>

            <div className="mt-2 text-gray-700">
              Total Points
            </div>
          </div>

          <div className="bg-orange-100 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-orange-700">
              🔥 {profile.current_streak || 0}
            </div>

            <div className="mt-2 text-gray-700">
              Current Streak
            </div>
          </div>

          <div className="bg-green-100 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-green-700">
              {profile.longest_streak || 0}
            </div>

            <div className="mt-2 text-gray-700">
              Longest Streak
            </div>
          </div>

          <div className="bg-purple-100 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-purple-700">
              {profile.devotion_count || 0}
            </div>

            <div className="mt-2 text-gray-700">
              Devotions Submitted
            </div>
          </div>

          <div className="bg-pink-100 p-6 rounded-xl text-center col-span-2">
            <div className="text-3xl font-bold text-pink-700">
              ⭐ {profile.ai_bonus_points || 0}
            </div>

            <div className="mt-2 text-gray-700">
              AI Bonus Points
            </div>
          </div>

        </div>

        <div className="mt-10">

          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            🏆 Achievement Badges
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {profile.current_streak >= 7 && (
              <div className="bg-orange-100 p-4 rounded-xl text-center shadow">
                🔥
                <div className="font-bold mt-2">
                  Consistent Disciple
                </div>
                <div className="text-sm text-gray-600">
                  7 Day Streak
                </div>
              </div>
            )}

            {profile.devotion_count >= 10 && (
              <div className="bg-blue-100 p-4 rounded-xl text-center shadow">
                📖
                <div className="font-bold mt-2">
                  Scripture Seeker
                </div>
                <div className="text-sm text-gray-600">
                  10 Devotions
                </div>
              </div>
            )}

            {profile.total_points >= 500 && (
              <div className="bg-yellow-100 p-4 rounded-xl text-center shadow">
                ⭐
                <div className="font-bold mt-2">
                  Faith Builder
                </div>
                <div className="text-sm text-gray-600">
                  500 Points
                </div>
              </div>
            )}

            {profile.total_points >= 1000 && (
              <div className="bg-purple-100 p-4 rounded-xl text-center shadow">
                👑
                <div className="font-bold mt-2">
                  Devotion Master
                </div>
                <div className="text-sm text-gray-600">
                  1000 Points
                </div>
              </div>
            )}

            {profile.devotion_count >= 25 && (
              <div className="bg-pink-100 p-4 rounded-xl text-center shadow">
                🙏
                <div className="font-bold mt-2">
                  Prayer Warrior
                </div>
                <div className="text-sm text-gray-600">
                  25 Devotions
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
      <MobileNav />
    </main>
  );
}