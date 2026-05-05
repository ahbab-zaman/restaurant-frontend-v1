const reviews = [
  { id: "RV-1092", hotel: "Lumos Downtown", rating: 5, text: "Excellent stay and very clean room.", date: "Apr 28, 2026" },
  { id: "RV-1083", hotel: "Lumos Bay View", rating: 4, text: "Great location and friendly staff.", date: "Apr 11, 2026" },
];

export default function GuestReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">My Reviews</h1>
        <p className="mt-1 text-zinc-600">View and manage feedback from your recent stays.</p>
      </div>

      <div className="space-y-3">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-zinc-500">{review.id}</p>
            <h3 className="text-xl font-medium text-zinc-900">{review.hotel}</h3>
            <p className="mt-1 text-zinc-700">{review.text}</p>
            <p className="mt-2 text-sm text-zinc-500">
              {review.rating}/5 stars · {review.date}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
