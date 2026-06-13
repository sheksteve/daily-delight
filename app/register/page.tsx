export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create Account
        </h1>

        <input
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          placeholder="Church Name"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
          Create Account
        </button>
      </div>
    </main>
  );
}