
import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/api/appointments/");

      const data = response.data.appointments || response.data;
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Could not load appointments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      setError("");

      await API.put(`/api/appointments/update-status/${id}`, {
        status,
      });

      setAppointments((previous) =>
        previous.map((item) =>
          item._id === id ? { ...item, status } : item
        )
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Could not update appointment status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleDateString();
  };

  const statusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-[#D9CBB8] text-[#292D28]";
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] p-6 text-[#292D28] md:p-10">
      <h1 className="mb-2 text-3xl font-semibold">
        Manage Appointments
      </h1>

      <p className="mb-8 text-gray-600">
        View and manage customer bookings.
      </p>

      {error && (
        <div className="mb-5 rounded-xl bg-red-100 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl bg-white p-6 shadow-sm">
        {loading ? (
          <p className="py-8 text-center text-gray-500">
            Loading appointments...
          </p>
        ) : appointments.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            No appointments found.
          </p>
        ) : (
          <table className="w-full min-w-[950px] text-left">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="p-4">Customer</th>
                <th className="p-4">Service</th>
                <th className="p-4">Staff</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-4">
                    {item.customer?.name || "Unknown"}
                  </td>

                  <td className="p-4">
                    {item.service?.name || "Unknown"}
                  </td>

                  <td className="p-4">
                    {item.staff?.name || "Unknown"}
                  </td>

                  <td className="p-4">
                    {formatDate(item.date)}
                  </td>

                  <td className="p-4">
                    {item.time || "—"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-2 text-sm ${statusStyle(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {item.status === "Pending" && (
                        <>
                          <button
                            disabled={updatingId === item._id}
                            onClick={() =>
                              updateStatus(item._id, "Confirmed")
                            }
                            className="rounded-lg bg-[#71816A] px-3 py-2 text-sm text-white hover:bg-[#596851] disabled:opacity-50"
                          >
                            Confirm
                          </button>

                          <button
                            disabled={updatingId === item._id}
                            onClick={() =>
                              updateStatus(item._id, "Cancelled")
                            }
                            className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {item.status === "Confirmed" && (
                        <button
                          disabled={updatingId === item._id}
                          onClick={() =>
                            updateStatus(item._id, "Completed")
                          }
                          className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                          Complete
                        </button>
                      )}

                      {["Completed", "Cancelled"].includes(item.status) && (
                        <span className="text-sm text-gray-500">
                          No actions
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminAppointments;
