"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">

      <div className="max-w-5xl mx-auto text-center">

        <h1 className="text-5xl font-bold text-blue-900 mt-12">
          Daily Delight
        </h1>

        <p className="text-xl text-gray-700 mt-6 mb-10">
          Grow deeper in God daily through Scripture,
          prayer, reflection, and consistency.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">

          <Link
            href="/login"
            className="bg-blue-900 text-white px-8 py-4 rounded-xl text-lg hover:bg-blue-700 transition"
          >
            Start Journey
          </Link>

          <Link
            href="/login"
            className="border-2 border-blue-900 text-blue-900 px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition"
          >
            Login
          </Link>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-3">
              📖 Daily Reading
            </h2>

            <p className="text-gray-700">
              Follow your Bible reading plan every day.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-3">
              ✍ Daily Reflection
            </h2>

            <p className="text-gray-700">
              Record observations, applications and prayers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-3">
              ⭐ Earn Points
            </h2>

            <p className="text-gray-700">
              Receive points for consistency and meaningful reflections.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-3">
              🏆 Leaderboard
            </h2>

            <p className="text-gray-700">
              Track your progress among fellow participants.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-3">
              🔥 Streaks
            </h2>

            <p className="text-gray-700">
              Build daily habits and maintain devotion streaks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-3">
              👑 Achievements
            </h2>

            <p className="text-gray-700">
              Unlock badges as you grow in consistency.
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}