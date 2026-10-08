'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Review, ProductRatingSummary } from '@/lib/reviews/types';
import { getAggregatedProductReviews, saveLocalReview } from '@/lib/reviews/storage';
import { getProductRatingData } from '@/lib/reviews/data';
import { reviewsEnabled } from '@/lib/site';
import Button from '@/components/ui/Button';

export interface ProductReviewsProps {
  productHandle: string;
  productTitle: string;
}

function ProductReviewsContent({ productHandle, productTitle }: ProductReviewsProps) {

  // SSR initial state
  const initialData = useMemo(() => getProductRatingData(productHandle), [productHandle]);
  const [summary, setSummary] = useState<ProductRatingSummary>(initialData.summary);
  const [reviews, setReviews] = useState<Review[]>(initialData.reviews);

  // Filter & sorting states
  const [selectedFilter, setSelectedFilter] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'highest'>('recent');

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [helpfulMap, setHelpfulMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const refreshReviews = () => {
      const data = getAggregatedProductReviews(productHandle);
      setSummary(data.summary);
      setReviews(data.reviews);
    };

    const timer = setTimeout(refreshReviews, 0);

    const handleReviewSubmitted = (e: Event) => {
      const customEvent = e as CustomEvent<{ handle: string }>;
      if (customEvent.detail?.handle === productHandle) {
        refreshReviews();
      }
    };

    window.addEventListener('kaansa:review-submitted', handleReviewSubmitted);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('kaansa:review-submitted', handleReviewSubmitted);
    };
  }, [productHandle]);

  // Handle helpful click
  const toggleHelpful = (reviewId: string) => {
    if (helpfulMap[reviewId]) return;
    setHelpfulMap((prev) => ({ ...prev, [reviewId]: true }));
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r
      )
    );
  };

  // Submit review handler
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      saveLocalReview(productHandle, {
        productHandle,
        author: author.trim(),
        rating,
        title: title.trim(),
        content: content.trim(),
        location: location.trim() || undefined,
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTitle('');
      setContent('');
      setAuthor('');
      setLocation('');
      setRating(5);

      setTimeout(() => {
        setSubmitSuccess(false);
        setShowForm(false);
      }, 3000);
    }, 400);
  };

  // Filtered & sorted reviews
  const displayedReviews = useMemo(() => {
    let list = [...reviews];
    if (selectedFilter !== 'all') {
      list = list.filter((r) => Math.round(r.rating) === selectedFilter);
    }
    if (sortBy === 'recent') {
      list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'highest') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [reviews, selectedFilter, sortBy]);

  const starLabels = ['', 'Disappointing', 'Fair', 'Good', 'Very Good', 'Exceptional'];

  return (
    <section
      id="reviews"
      className="mt-20 pt-16 border-t border-[var(--color-border)] scroll-mt-24"
      aria-label="Customer Reviews"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[var(--color-border)]/60">
        <div>
          <span className="text-[11px] font-[family-name:var(--font-body)] uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium block mb-1">
            Artisan Quality Assurance
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--color-text)] font-normal">
            Customer Reviews
          </h2>
          <p className="mt-1 text-sm text-[var(--color-muted)] font-[family-name:var(--font-body)]">
            Verified reflections from homes and temples across India
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-[0.14em] font-medium font-[family-name:var(--font-body)] bg-[var(--color-accent)] text-[#FAF6F0] hover:bg-[var(--color-accent-hover)] transition-all cursor-pointer self-start md:self-auto rounded-none shadow-xs"
        >
          {showForm ? 'Cancel Review' : 'Write A Review'}
        </button>
      </div>

      {/* Review Summary & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-10 border-b border-[var(--color-border)]/60">
        {/* Overall Score */}
        <div className="lg:col-span-4 flex flex-col justify-center bg-[var(--color-surface)] p-6 sm:p-8 border border-[var(--color-border)]/70">
          <div className="flex items-baseline gap-3">
            <span className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-medium text-[var(--color-text)]">
              {summary.averageRating.toFixed(1)}
            </span>
            <span className="text-sm uppercase tracking-wider text-[var(--color-muted)]">
              / 5.0
            </span>
          </div>

          <div className="flex items-center gap-1.5 my-3 text-[var(--color-gold)] text-lg" aria-hidden="true">
            {'★'.repeat(Math.floor(summary.averageRating))}
            {summary.averageRating % 1 >= 0.5 ? '★' : ''}
            {'☆'.repeat(5 - Math.ceil(summary.averageRating))}
          </div>

          <p className="text-xs uppercase tracking-wider text-[var(--color-text)] font-medium font-[family-name:var(--font-body)]">
            Based on {summary.totalReviews} verified reviews
          </p>
          <p className="mt-2 text-xs text-[var(--color-muted)] font-[family-name:var(--font-body)]">
            {summary.recommendPercentage}% of customers recommend this heirloom piece
          </p>
        </div>

        {/* Rating Bars */}
        <div className="lg:col-span-8 flex flex-col justify-center space-y-2.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = summary.distribution[star as 1 | 2 | 3 | 4 | 5] || 0;
            const percentage = summary.totalReviews > 0 ? (count / summary.totalReviews) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-4 text-xs font-[family-name:var(--font-body)]">
                <button
                  type="button"
                  onClick={() => setSelectedFilter(selectedFilter === star ? 'all' : star)}
                  className="flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-accent)] w-16 text-left transition-colors cursor-pointer"
                >
                  <span className="font-medium">{star}</span>
                  <span className="text-[var(--color-gold)]">★</span>
                </button>

                <div className="flex-1 h-2 bg-[var(--color-border)]/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--color-accent)] transition-all duration-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="text-[var(--color-muted)] w-12 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Submission Form Drawer */}
      {showForm && (
        <div className="my-8 p-6 sm:p-8 bg-[var(--color-surface)] border border-[var(--color-border)] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="max-w-2xl mx-auto">
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-text)] mb-2">
              Share Your Experience with {productTitle}
            </h3>
            <p className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-body)] mb-6">
              Your feedback guides other connoisseurs seeking pure Indian heirloom metalware.
            </p>

            {submitSuccess ? (
              <div className="p-4 bg-[#EBF5EE] border border-[#B7E1CD] text-[#0D652D] text-sm font-medium font-[family-name:var(--font-body)]">
                ✓ Thank you! Your review has been recorded and published.
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-5">
                {/* Rating selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[var(--color-text)] font-[family-name:var(--font-body)] mb-1.5">
                    Your Rating *
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-2xl">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          onMouseEnter={() => setHoverRating(s)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="text-[var(--color-gold)] hover:scale-110 transition-transform cursor-pointer focus-visible:outline-none"
                          aria-label={`${s} star`}
                        >
                          {(hoverRating !== null ? s <= hoverRating : s <= rating) ? '★' : '☆'}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-body)] ml-2">
                      {starLabels[hoverRating || rating]}
                    </span>
                  </div>
                </div>

                {/* Review Headline */}
                <div>
                  <label
                    htmlFor="review-title"
                    className="block text-xs uppercase tracking-wider font-medium text-[var(--color-text)] font-[family-name:var(--font-body)] mb-1.5"
                  >
                    Headline / Title *
                  </label>
                  <input
                    id="review-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Pure authentic resonance and stunning weight"
                    className="w-full px-3.5 py-2.5 bg-white border border-[var(--color-border)] text-sm text-[var(--color-text)] focus:border-[var(--color-gold)] focus:outline-none rounded-none"
                  />
                </div>

                {/* Review Body */}
                <div>
                  <label
                    htmlFor="review-body"
                    className="block text-xs uppercase tracking-wider font-medium text-[var(--color-text)] font-[family-name:var(--font-body)] mb-1.5"
                  >
                    Detailed Review *
                  </label>
                  <textarea
                    id="review-body"
                    rows={4}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Describe the craftsmanship, tactile weight, chime, or daily rituals with this piece..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[var(--color-border)] text-sm text-[var(--color-text)] focus:border-[var(--color-gold)] focus:outline-none rounded-none"
                  />
                </div>

                {/* Author Name and Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="review-author"
                      className="block text-xs uppercase tracking-wider font-medium text-[var(--color-text)] font-[family-name:var(--font-body)] mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="review-author"
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Radhika V."
                      className="w-full px-3.5 py-2.5 bg-white border border-[var(--color-border)] text-sm text-[var(--color-text)] focus:border-[var(--color-gold)] focus:outline-none rounded-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="review-location"
                      className="block text-xs uppercase tracking-wider font-medium text-[var(--color-text)] font-[family-name:var(--font-body)] mb-1.5"
                    >
                      City / Region (Optional)
                    </label>
                    <input
                      id="review-location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Bengaluru, Karnataka"
                      className="w-full px-3.5 py-2.5 bg-white border border-[var(--color-border)] text-sm text-[var(--color-text)] focus:border-[var(--color-gold)] focus:outline-none rounded-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" disabled={isSubmitting} size="md">
                    {isSubmitting ? 'Publishing...' : 'Submit Review'}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-xs uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--color-text)] font-medium px-4 py-3"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-b border-[var(--color-border)]/60 text-xs font-[family-name:var(--font-body)]">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-[var(--color-muted)] uppercase tracking-wider mr-1">
            Filter:
          </span>
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 border transition-colors cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[var(--color-accent)] text-[#FAF6F0] border-[var(--color-accent)]'
                : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-gold)]'
            }`}
          >
            All ({reviews.length})
          </button>
          {[5, 4, 3].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setSelectedFilter(selectedFilter === star ? 'all' : star)}
              className={`px-3 py-1.5 border transition-colors cursor-pointer inline-flex items-center gap-1 ${
                selectedFilter === star
                  ? 'bg-[var(--color-accent)] text-[#FAF6F0] border-[var(--color-accent)]'
                  : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-gold)]'
              }`}
            >
              <span>{star}</span>
              <span className="text-[var(--color-gold)]">★</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[var(--color-muted)] uppercase tracking-wider">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recent' | 'highest')}
            className="px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-gold)] cursor-pointer"
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rating</option>
          </select>
        </div>
      </div>

      {/* Review List */}
      <div className="divide-y divide-[var(--color-border)]/60">
        {displayedReviews.length === 0 ? (
          <div className="py-12 text-center text-sm text-[var(--color-muted)] font-[family-name:var(--font-body)]">
            No reviews match the selected filter.
          </div>
        ) : (
          displayedReviews.map((rev) => (
            <article key={rev.id} className="py-8 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-[var(--color-gold)] text-sm" aria-label={`${rev.rating} out of 5 stars`}>
                    {'★'.repeat(Math.floor(rev.rating))}
                    {'☆'.repeat(5 - Math.floor(rev.rating))}
                  </div>

                  <span className="font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-wider text-[var(--color-text)]">
                    {rev.author}
                  </span>

                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#0D652D] bg-[#EBF5EE] px-2 py-0.5 font-medium tracking-wide">
                      <span aria-hidden="true">✓</span> Verified Buyer
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-[var(--color-muted)] font-[family-name:var(--font-body)]">
                  {rev.location && `${rev.location} • `}
                  {new Date(rev.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>

              <h4 className="font-[family-name:var(--font-heading)] text-base font-medium text-[var(--color-text)]">
                {rev.title}
              </h4>

              <p className="text-sm font-[family-name:var(--font-body)] text-[var(--color-muted)] leading-relaxed max-w-3xl">
                {rev.content}
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-[family-name:var(--font-body)] text-[var(--color-muted)]">
                <button
                  type="button"
                  onClick={() => toggleHelpful(rev.id)}
                  className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                    helpfulMap[rev.id] ? 'text-[var(--color-accent)] font-medium' : 'hover:text-[var(--color-text)]'
                  }`}
                >
                  <span aria-hidden="true">👍</span>
                  <span>Helpful ({rev.helpfulCount || 0})</span>
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export function ProductReviews(props: ProductReviewsProps) {
  if (!reviewsEnabled) return null;
  return <ProductReviewsContent {...props} />;
}

export default ProductReviews;
