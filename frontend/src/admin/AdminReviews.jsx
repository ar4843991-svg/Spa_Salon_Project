
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/api/reviews/all");
      setReviews(response.data.reviews || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      setDeletingId(id);

      await API.delete(`/api/reviews/delete/${id}`);

      setReviews((previous) =>
        previous.filter((review) => review._id !== id)
      );
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to delete review"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#292D28]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#71816A]">
            VELOURA BEAUTY
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Customer Reviews
          </h1>

          <p className="mt-2 text-gray-600">
            Manage and view customer feedback.
          </p>
        </div>

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Reviews</p>
          <h2 className="mt-2 text-3xl font-bold">
            {reviews.length}
          </h2>
        </div>

        {loading ? (
          <p className="py-10 text-center">Loading reviews...</p>
        ) : error ? (
          <div className="rounded-xl bg-white p-6 text-center text-red-600">
            {error}
            <button
              onClick={fetchReviews}
              className="ml-3 font-semibold underline"
            >
              Retry
            </button>
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center text-gray-500">
            No reviews found yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-[#292D28] text-white">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Comment</th>
                  <th className="p-4">Appointment</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {reviews.map((review) => (
                  <tr
                    key={review._id}
                    className="border-b border-gray-100"
                  >
                    <td className="p-4 font-medium">
                      {review.customer?.name || "Unknown"}
                    </td>

                    <td className="p-4 text-amber-500">
                      {"★".repeat(
                        Math.min(5, Math.max(0, Number(review.rating) || 0))
                      )}
                      <span className="ml-1 text-gray-600">
                        ({review.rating}/5)
                      </span>
                    </td>

                    <td className="max-w-xs p-4 text-gray-600">
                      {review.comment}
                    </td>

                    <td className="p-4 text-gray-600">
                      {review.appointment?._id
                        ? String(review.appointment._id).slice(-6)
                        : "N/A"}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(review._id)}
                        disabled={deletingId === review._id}
                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
                      >
                        {deletingId === review._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminReviews;
