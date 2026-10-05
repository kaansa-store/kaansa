'use client';

import { Review, ProductRatingSummary } from './types';
import { getProductRatingData } from './data';

const STORAGE_PREFIX = 'kaansa_reviews_v1_';

export function getLocalReviews(handle: string): Review[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${handle}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load reviews from localStorage', e);
    return [];
  }
}

export function saveLocalReview(
  handle: string,
  newReview: Omit<Review, 'id' | 'date' | 'verified' | 'helpfulCount'>
): Review {
  const localList = getLocalReviews(handle);
  const created: Review = {
    ...newReview,
    id: `user-rev-${Date.now()}`,
    productHandle: handle,
    date: new Date().toISOString().split('T')[0],
    verified: true,
    helpfulCount: 0,
  };

  const updated = [created, ...localList];
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${handle}`, JSON.stringify(updated));
    // Dispatch event so any listening review components refresh instantly
    window.dispatchEvent(
      new CustomEvent('kaansa:review-submitted', { detail: { handle, review: created } })
    );
  } catch (e) {
    console.error('Failed to save review', e);
  }

  return created;
}

export function getAggregatedProductReviews(handle: string): {
  summary: ProductRatingSummary;
  reviews: Review[];
} {
  const { summary: baseSummary, reviews: baseReviews } = getProductRatingData(handle);
  const localReviews = getLocalReviews(handle);

  if (localReviews.length === 0) {
    return { summary: baseSummary, reviews: baseReviews };
  }

  const allReviews = [...localReviews, ...baseReviews];
  const totalReviews = baseSummary.totalReviews + localReviews.length;

  const dist = { ...baseSummary.distribution };
  let totalScore = baseSummary.averageRating * baseSummary.totalReviews;

  for (const r of localReviews) {
    const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    dist[star] = (dist[star] || 0) + 1;
    totalScore += r.rating;
  }

  const averageRating = Number((totalScore / totalReviews).toFixed(1));

  return {
    summary: {
      averageRating,
      totalReviews,
      distribution: dist,
      recommendPercentage: Math.min(100, Math.round(((dist[5] + dist[4]) / totalReviews) * 100)),
    },
    reviews: allReviews,
  };
}
