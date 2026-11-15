
import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalAppointments: 0,
    totalServices: 0,
    totalStaff: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get("/api/admin/stats");
        setStats(response.data.stats);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load dashboard statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Customers",
      value: stats.totalCustomers,
    },
    {
      title: "Total Appointments",
      value: stats.totalAppointments,
    },
    {
      title: "Total Services",
      value: stats.totalServices,
    },
    {
      title: "Total Staff",
      value: stats.totalStaff,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#292D28]">
      <aside className="bg-[#292D28] px-5 py-6 text-white sm:px-8">
        <h1 className="text-2xl font-bold text-[#D9CBB8]">
          VELOURA BEAUTY
        </h1>
        <p className="mt-2 text-sm text-gray-300">
          Spa & Salon Management
        </p>
      </aside>

      <main className="p-5 sm:p-8">
        <h2 className="mb-2 text-3xl font-semibold">
          Dashboard
        </h2>

        <p className="mb-8 text-gray-600">
          Welcome to your salon management dashboard.
        </p>

        {loading && (
          <p className="text-[#71816A]">
            Loading dashboard statistics...
          </p>
        )}

        {error && (
          <p className="mb-5 rounded-xl bg-red-100 p-4 text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-[#71816A]">
                  {item.value}
                </h3>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
