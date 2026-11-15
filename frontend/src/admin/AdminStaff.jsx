
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

function AdminStaff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    speciality: "",
  });

  const fetchStaff = async () => {
    try {
      setError("");
      const response = await API.get("/api/staff");
      setStaff(response.data.staff || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load staff."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      await API.post("/api/staff/add", {
        name: form.name.trim(),
        speciality: form.speciality,
        isAvailable: true,
      });

      setForm({ name: "", speciality: "" });
      await fetchStaff();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add staff member."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleAvailability = async (member) => {
    try {
      setError("");

      await API.put(
        `/api/staff/availability/${member._id}`,
        { isAvailable: !member.isAvailable }
      );

      await fetchStaff();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to update availability."
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) {
      return;
    }

    try {
      setError("");
      setDeletingId(id);

      await API.delete(`/api/staff/delete/${id}`);

      setStaff((prev) =>
        prev.filter((member) => member._id !== id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete staff member."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#292D28]">
      <Navbar />

      <main className="px-5 py-10 sm:px-8 md:px-16">
        <h1 className="mb-2 text-3xl font-bold">Manage Staff</h1>

        <p className="mb-8 text-gray-600">
          View your salon team and their availability.
        </p>

        {error && (
          <p className="mb-5 rounded-xl bg-red-100 p-4 text-red-700">
            {error}
          </p>
        )}

        <form
          onSubmit={handleAddStaff}
          className="mb-8 rounded-2xl bg-white p-6 shadow-sm"
        >
          <h2 className="mb-5 text-xl font-semibold">
            Add New Staff Member
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Staff Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
              className="rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#71816A]"
            />

            <select
              value={form.speciality}
              onChange={(e) =>
                setForm({ ...form, speciality: e.target.value })
              }
              required
              className="rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#71816A]"
            >
              <option value="">Select Speciality</option>
              <option value="Hair Stylist">Hair Stylist</option>
              <option value="Makeup Artist">Makeup Artist</option>
              <option value="Massage Therapist">Massage Therapist</option>
              <option value="Nail Technician">Nail Technician</option>
              <option value="Skin Specialist">Skin Specialist</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-5 rounded-lg bg-[#71816A] px-6 py-3 font-medium text-white transition hover:bg-[#5D6C57] disabled:opacity-50"
          >
            {saving ? "Adding..." : "Add Staff"}
          </button>
        </form>

        <div className="overflow-x-auto rounded-2xl bg-white p-4 shadow-sm sm:p-6">
          {loading ? (
            <p className="p-5 text-[#71816A]">Loading staff...</p>
          ) : (
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="p-4">Name</th>
                  <th className="p-4">Speciality</th>
                  <th className="p-4">Availability</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {staff.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">
                      No staff members found.
                    </td>
                  </tr>
                ) : (
                  staff.map((member) => (
                    <tr
                      key={member._id}
                      className="border-b last:border-0"
                    >
                      <td className="p-4 font-medium">{member.name}</td>

                      <td className="p-4">
                        {member.speciality || member.role || "N/A"}
                      </td>

                      <td className="p-4">
                        <span
                          className={
                            member.isAvailable
                              ? "font-medium text-green-700"
                              : "font-medium text-red-600"
                          }
                        >
                          {member.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>

                      <td className="flex flex-wrap gap-2 p-4">
                        <button
                          onClick={() => handleAvailability(member)}
                          className="rounded-lg bg-[#D9CBB8] px-3 py-2 text-sm font-medium hover:bg-[#CBBBA5]"
                        >
                          Change Status
                        </button>

                        <button
                          onClick={() => handleDelete(member._id)}
                          disabled={deletingId === member._id}
                          className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200 disabled:opacity-50"
                        >
                          {deletingId === member._id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminStaff;
