
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchCustomers = async () => {
    try {
      setError("");
      const response = await API.get("/api/customers/all");
      setCustomers(response.data.customers || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load customers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await API.delete(`/api/customers/delete/${id}`);

      setCustomers((prev) =>
        prev.filter((customer) => customer._id !== id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to delete customer."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#292D28]">
      <Navbar />

      <main className="px-5 py-10 sm:px-8 md:px-16">
        <h1 className="mb-2 text-3xl font-bold">
          Manage Customers
        </h1>

        <p className="mb-8 text-gray-600">
          View and manage registered salon customers.
        </p>

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Registered Customers
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#71816A]">
            {customers.length}
          </h2>
        </div>

        {loading && (
          <p className="p-5 text-[#71816A]">
            Loading customers...
          </p>
        )}

        {error && (
          <p className="mb-5 rounded-xl bg-red-100 p-4 text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto rounded-2xl bg-white p-4 shadow-sm sm:p-6">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-8 text-center text-gray-500"
                    >
                      No customers registered yet.
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="border-b last:border-0 hover:bg-[#F5F0E8]/50"
                    >
                      <td className="p-4 font-medium">
                        {customer.name}
                      </td>

                      <td className="p-4">
                        {customer.email}
                      </td>

                      <td className="p-4">
                        {customer.phone || "N/A"}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() =>
                            handleDelete(customer._id)
                          }
                          disabled={deletingId === customer._id}
                          className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === customer._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminCustomers;
