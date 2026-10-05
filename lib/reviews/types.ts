export interface Review {
  id: string;
  productHandle: string;
  author: string;
  rating: number; // 1 to 5
  title: string;
  content: string;
  date: string;
  verified: boolean;
  location?: string;
  helpfulCount?: number;
}

export interface ProductRatingSummary {
  averageRating: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  recommendPercentage: number;
}
