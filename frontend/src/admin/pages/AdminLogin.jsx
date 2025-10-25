import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) navigate("/admin");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={submit}
        className="w-96 bg-white shadow-xl p-6 rounded-2xl border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-600 font-medium mb-4 text-center">{error}</p>
        )}

        <div className="form-control mb-4">
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
            className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-control mb-4">
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          disabled={loading}
          className="w-full py-2 md:py-3 px-4 md:px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md active:scale-95 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
