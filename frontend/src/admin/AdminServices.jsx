
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  duration: "",
};

function AdminServices() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function fetchServices() {
    try {
      setError("");
      const response = await API.get("/api/services");
      setServices(response.data.services || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load services."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function resetForm() {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function handleEdit(service) {
    setFormData({
      name: service.name || "",
      description: service.description || "",
      price: String(service.price ?? ""),
      duration: String(service.duration ?? ""),
    });

    setEditingId(service._id);
    setShowForm(true);
    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setSaving(true);

      const serviceData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        duration: Number(formData.duration),
      };

      if (editingId) {
        const response = await API.put(
          `/api/services/update/${editingId}`,
          serviceData
        );

        setServices((previous) =>
          previous.map((service) =>
            service._id === editingId
              ? response.data.service
              : service
          )
        );

        setSuccess("Service updated successfully!");
      } else {
        const response = await API.post(
          "/api/services/add",
          serviceData
        );

        setServices((previous) => [
          ...previous,
          response.data.service,
        ]);

        setSuccess("Service added successfully!");
      }

      resetForm();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to save service."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      setDeletingId(id);

      await API.delete(`/api/services/delete/${id}`);

      setServices((previous) =>
        previous.filter((service) => service._id !== id)
      );

      if (editingId === id) {
        resetForm();
      }

      setSuccess("Service deleted successfully!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to delete service."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#292D28]">
      <Navbar />

      <main className="px-4 py-10 sm:px-6 md:px-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="mb-2 text-3xl font-bold">
              Manage Services
            </h1>

            <p className="text-gray-600">
              Add, edit and manage salon services, prices and durations.
            </p>
          </div>

          <button
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setShowForm(true);
                setEditingId(null);
                setFormData(emptyForm);
              }

              setError("");
              setSuccess("");
            }}
            className="rounded-full bg-[#71816A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#596950]"
          >
            {showForm ? "Close Form" : "+ Add Service"}
          </button>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {success}
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 rounded-2xl border border-[#D9CBB8] bg-white p-6 shadow-sm"
          >
            <h2 className="mb-6 font-serif text-2xl">
              {editingId ? "Edit Service" : "Add New Service"}
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Service Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Hair Styling"
                  required
                  className="w-full rounded-xl border border-[#D9CBB8] px-4 py-3 outline-none focus:border-[#71816A]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Price (PKR)
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 2500"
                  min="0"
                  required
                  className="w-full rounded-xl border border-[#D9CBB8] px-4 py-3 outline-none focus:border-[#71816A]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Duration (Minutes)
                </label>

                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 45"
                  min="1"
                  required
                  className="w-full rounded-xl border border-[#D9CBB8] px-4 py-3 outline-none focus:border-[#71816A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe this salon service..."
                  rows="3"
                  required
                  className="w-full rounded-xl border border-[#D9CBB8] px-4 py-3 outline-none focus:border-[#71816A]"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-[#71816A] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#596950] disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Service"
                    : "Save Service"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-[#D9CBB8] px-8 py-3 text-sm font-semibold hover:bg-[#F5F0E8]"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto rounded-xl bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-5 font-serif text-2xl">
            All Services
          </h2>

          {loading ? (
            <p className="py-8 text-center text-gray-500">
              Loading services...
            </p>
          ) : services.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              No services found. Add your first service.
            </p>
          ) : (
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="p-4">Service</th>
                  <th className="p-4">Price (PKR)</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {services.map((service) => (
                  <tr
                    key={service._id}
                    className="border-b last:border-0"
                  >
                    <td className="p-4">
                      <p className="font-medium">
                        {service.name}
                      </p>

                      <p className="mt-1 max-w-sm text-xs text-gray-500">
                        {service.description}
                      </p>
                    </td>

                    <td className="p-4">
                      Rs. {service.price}
                    </td>

                    <td className="p-4">
                      {service.duration} minutes
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="rounded-lg bg-[#D9CBB8] px-4 py-2 text-sm font-medium hover:bg-[#CBBBA5]"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(service._id)}
                          disabled={deletingId === service._id}
                          className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 disabled:opacity-50"
                        >
                          {deletingId === service._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminServices;
