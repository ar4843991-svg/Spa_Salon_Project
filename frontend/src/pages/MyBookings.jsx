
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";

function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const [activeReviewId, setActiveReviewId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewedIds, setReviewedIds] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("customerToken");
        const customerInfo = JSON.parse(
          localStorage.getItem("customerInfo") || "null"
        );

        const customerId = customerInfo?.id || customerInfo?._id;

        if (!token || !customerId) {
          navigate("/login");
          return;
        }

        const response = await API.get(
          `/api/appointments/customer/${customerId}`
        );

        setBookings(response.data.appointments || []);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("customerToken");
          localStorage.removeItem("customerInfo");
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
          "Unable to load your appointments."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  async function handleCancel(id) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmed) return;

    try {
      setCancellingId(id);
      setError("");

      await API.put(`/api/appointments/cancel/${id}`);

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === id
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to cancel this appointment."
      );
    } finally {
      setCancellingId(null);
    }
  }

  async function handleSubmitReview(appointmentId) {
    if (!comment.trim()) {
      setError("Please write a review comment.");
      return;
    }

    try {
      setSubmittingReview(true);
      setError("");

      const customerInfo = JSON.parse(
        localStorage.getItem("customerInfo") || "null"
      );

      const customerId = customerInfo?.id || customerInfo?._id;

      await API.post("/api/reviews/add", {
        customer: customerId,
        appointment: appointmentId,
        rating,
        comment: comment.trim(),
      });

      setReviewedIds((previous) => [...previous, appointmentId]);
      setActiveReviewId(null);
      setRating(5);
      setComment("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to submit your review."
      );
    } finally {
      setSubmittingReview(false);
    }
  }

  const getStatusStyle = (status) => {
    const styles = {
      Pending: "bg-amber-100 text-amber-800",
      Confirmed: "bg-green-100 text-green-800",
      Completed: "bg-blue-100 text-blue-800",
      Cancelled: "bg-red-100 text-red-800",
    };

    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length;

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#292D28]">
      <Navbar />

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-[#71816A]">
              Customer Dashboard
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl">
              My Bookings
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600">
              Manage your appointments and keep track of
              your beauty and self-care visits.
            </p>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#D9CBB8] bg-white p-6">
              <p className="text-sm text-gray-500">
                Pending Appointments
              </p>
              <h2 className="mt-3 font-serif text-3xl">
                {pendingCount}
              </h2>
            </div>

            <div className="rounded-2xl border border-[#D9CBB8] bg-white p-6">
              <p className="text-sm text-gray-500">
                Confirmed Appointments
              </p>
              <h2 className="mt-3 font-serif text-3xl">
                {confirmedCount}
              </h2>
            </div>

            <div className="rounded-2xl border border-[#D9CBB8] bg-white p-6">
              <p className="text-sm text-gray-500">
                Completed Appointments
              </p>
              <h2 className="mt-3 font-serif text-3xl">
                {completedCount}
              </h2>
            </div>
          </div>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-serif text-2xl sm:text-3xl">
                Appointment History
              </h2>

              <span className="rounded-full bg-[#D9CBB8] px-4 py-2 text-xs font-semibold">
                {bookings.length} Appointments
              </span>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {loading ? (
              <div className="rounded-2xl bg-white px-6 py-14 text-center shadow-sm">
                <p className="text-gray-600">
                  Loading your appointments...
                </p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="rounded-2xl bg-white px-6 py-14 text-center shadow-sm">
                <p className="font-serif text-2xl">
                  No Appointments Yet
                </p>

                <p className="mt-3 text-sm text-gray-500">
                  Your booking history will appear here.
                </p>

                <button
                  onClick={() => navigate("/booking")}
                  className="mt-6 rounded-full bg-[#71816A] px-7 py-3 text-sm font-semibold text-white"
                >
                  Book an Appointment
                </button>
              </div>
            ) : (
              <div className="grid gap-5">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="rounded-2xl border border-[#D9CBB8] bg-white p-5 shadow-sm sm:p-7"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <h3 className="font-serif text-xl sm:text-2xl">
                            {booking.service?.name || "Service"}
                          </h3>

                          <span
                            className={`rounded-full px-4 py-1.5 text-xs font-semibold ${getStatusStyle(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <div className="grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                          <p>
                            <strong className="text-[#292D28]">Date:</strong>{" "}
                            {formatDate(booking.date)}
                          </p>

                          <p>
                            <strong className="text-[#292D28]">Time:</strong>{" "}
                            {booking.time}
                          </p>

                          <p>
                            <strong className="text-[#292D28]">Staff:</strong>{" "}
                            {booking.staff?.name || "Not assigned"}
                          </p>

                          <p>
                            <strong className="text-[#292D28]">Booking ID:</strong>{" "}
                            #{booking._id.slice(-6)}
                          </p>
                        </div>
                      </div>

                      <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                        {["Pending", "Confirmed"].includes(booking.status) && (
                          <button
                            onClick={() => handleCancel(booking._id)}
                            disabled={cancellingId === booking._id}
                            className="w-full rounded-full border border-red-300 px-6 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50 sm:w-auto"
                          >
                            {cancellingId === booking._id
                              ? "Cancelling..."
                              : "Cancel Booking"}
                          </button>
                        )}

                        {booking.status === "Completed" &&
                          !reviewedIds.includes(booking._id) && (
                            <button
                              onClick={() => {
                                setActiveReviewId(
                                  activeReviewId === booking._id
                                    ? null
                                    : booking._id
                                );
                                setError("");
                              }}
                              className="w-full rounded-full bg-[#71816A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#596950] sm:w-auto"
                            >
                              {activeReviewId === booking._id
                                ? "Close Review"
                                : "Write a Review"}
                            </button>
                          )}

                        {reviewedIds.includes(booking._id) && (
                          <span className="rounded-full bg-green-100 px-5 py-3 text-center text-sm font-semibold text-green-800">
                            Review Submitted
                          </span>
                        )}
                      </div>
                    </div>

                    {activeReviewId === booking._id && (
                      <div className="mt-6 rounded-2xl border border-[#D9CBB8] bg-[#F5F0E8] p-5">
                        <h3 className="font-serif text-xl">
                          Share Your Experience
                        </h3>

                        <p className="mt-4 text-sm font-semibold">
                          Your Rating
                        </p>

                        <div className="mt-2 flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className={`text-3xl ${
                                star <= rating
                                  ? "text-amber-500"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>

                        <label className="mt-4 block text-sm font-semibold">
                          Your Comment
                        </label>

                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows="4"
                          placeholder="Write about your experience..."
                          className="mt-2 w-full rounded-xl border border-[#D9CBB8] bg-white p-4 text-sm outline-none focus:border-[#71816A]"
                        />

                        <button
                          onClick={() => handleSubmitReview(booking._id)}
                          disabled={submittingReview}
                          className="mt-4 rounded-full bg-[#292D28] px-7 py-3 text-sm font-semibold text-white hover:bg-[#71816A] disabled:opacity-50"
                        >
                          {submittingReview
                            ? "Submitting..."
                            : "Submit Review"}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyBookings;
