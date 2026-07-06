"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import MobileNav from "@/components/MobileNav";

type Devotion = {
  id: string;
  scripture_reference: string;
  observation: string;
  application: string;
  prayer: string;
  created_at: string;
};

export default function HistoryPage() {
  const [devotions, setDevotions] = useState<Devotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevotions();
  }, []);

  async function fetchDevotions() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("devotions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert(error.message);
    } else if (data) {
      setDevotions(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading devotions...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          📖 Devotion History
        </h1>

        {devotions.length === 0 ? (
          <div className="text-center text-gray-600 text-xl">
            No devotions submitted yet.
          </div>
        ) : (
          <div className="space-y-6">

            {devotions.map((devotion) => (
              <div
                key={devotion.id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-blue-800">
                    {devotion.scripture_reference}
                  </h2>

                  <span className="text-sm text-gray-500">
                    {new Date(
                      devotion.created_at
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-gray-700 mb-1">
                    Observation
                  </h3>

                  <p className="text-gray-600">
                    {devotion.observation}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-gray-700 mb-1">
                    Application
                  </h3>

                  <p className="text-gray-600">
                    {devotion.application}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-700 mb-1">
                    Prayer
                  </h3>

                  <p className="text-gray-600">
                    {devotion.prayer}
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
      <MobileNav />
    </main>
  );
}