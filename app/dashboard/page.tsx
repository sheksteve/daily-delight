"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import MobileNav from "@/components/MobileNav";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-700">
              Welcome, {profile?.full_name}
            </h1>

            <p className="text-gray-600">
              {profile?.church_name}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">Total Points</h3>
            <p className="text-3xl font-bold">
              {profile?.total_points || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">Devotions</h3>
            <p className="text-3xl font-bold">
              {profile?.devotion_count || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">Current Streak</h3>
            <p className="text-3xl font-bold">
              {profile?.current_streak || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">Longest Streak</h3>
            <p className="text-3xl font-bold">
              {profile?.longest_streak || 0}
            </p>
          </div>

        </div>

        <div className="mt-10">
          <button
            onClick={() => router.push("/devotion")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Submit Today's Devotion
          </button>
        </div>

      </div>
      <MobileNav />
    </main>
  );
}