export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Daily Delight Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl">⭐ 0</h2>
          <p>Total Points</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl">🔥 0</h2>
          <p>Current Streak</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl">🏆 Unranked</h2>
          <p>Leaderboard Position</p>
        </div>
      </div>
    </main>
  );
}