
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/api/admin/login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem(
        "adminInfo",
        JSON.stringify(response.data.admin)
      );

      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Admin login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F0E8] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-center text-3xl font-bold text-[#292D28]">
          VELOURA BEAUTY
        </h1>

        <h2 className="mt-3 text-center text-2xl font-semibold">
          Admin Login
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Login to manage your salon
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              className="w-full rounded-xl border border-[#D9CBB8] px-4 py-3 outline-none focus:border-[#71816A]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full rounded-xl border border-[#D9CBB8] px-4 py-3 outline-none focus:border-[#71816A]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#71816A] py-3 font-semibold text-white transition hover:bg-[#292D28] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>

        <Link
          to="/"
          className="mt-6 block text-center text-sm text-[#71816A] hover:underline"
        >
          Back to Website
        </Link>
      </div>
    </div>
  );
}

export default AdminLogin;
