export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">
          Daily Delight
        </h1>

        <p className="text-xl text-gray-600 mb-2">
          Read • Reflect • Apply • Pray
        </p>

        <p className="max-w-2xl text-gray-500 mb-8">
          Build a consistent habit of reading God's Word, reflecting on
          Scripture, applying biblical truths, and growing through prayer.
        </p>

        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700">
            Start Journey
          </button>

          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50">
            Login
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-8 pb-24 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">📖 Daily Reading</h3>
          <p>Follow your Bible reading plan every day.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">✍ Daily Reflection</h3>
          <p>Record observations, applications and prayers.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">⭐ Earn Points</h3>
          <p>Receive points for consistency and meaningful reflections.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">🏆 Leaderboard</h3>
          <p>Track your progress among fellow participants.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">🔥 Streaks</h3>
          <p>Build daily habits and maintain devotion streaks.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">👑 Achievements</h3>
          <p>Unlock badges as you grow in consistency.</p>
        </div>
      </section>
    </main>
  );
}