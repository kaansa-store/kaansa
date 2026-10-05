import { Review, ProductRatingSummary } from './types';

// Curated artisan reviews for Kaansa heritage pieces
const SEED_REVIEWS_BY_HANDLE: Record<string, Review[]> = {
  'kansa-thali-set': [
    {
      id: 'rev-thali-1',
      productHandle: 'kansa-thali-set',
      author: 'Ananya Sharma',
      rating: 5,
      title: 'Heirloom quality, authentic bell metal',
      content:
        'The acoustic chime when tapped confirms genuine 78:22 bronze. Eating our daily meals in this thali has genuinely brought a sense of ritual back to our dining table. The weight and hand-hammered finish are phenomenal.',
      date: '2026-09-28',
      verified: true,
      location: 'New Delhi',
      helpfulCount: 18,
    },
    {
      id: 'rev-thali-2',
      productHandle: 'kansa-thali-set',
      author: 'Vikramaditya Rao',
      rating: 5,
      title: 'Worth every rupee — feels royal',
      content:
        'Packaging was completely secure with temple-grade care. The natural golden-bronze glow after washing with pitambari is unmatched. My grandmother immediately approved of the metal purity.',
      date: '2026-09-14',
      verified: true,
      location: 'Bengaluru',
      helpfulCount: 12,
    },
    {
      id: 'rev-thali-3',
      productHandle: 'kansa-thali-set',
      author: 'Meera Deshmukh',
      rating: 5,
      title: 'Beautiful daily wellness practice',
      content:
        'We replaced stainless steel plates for our children with this thali set. Food tastes remarkably balanced and alkaline. The craftsmanship of the bowls (katoris) is stunning.',
      date: '2026-08-30',
      verified: true,
      location: 'Pune',
      helpfulCount: 9,
    },
    {
      id: 'rev-thali-4',
      productHandle: 'kansa-thali-set',
      author: 'Rajesh Nair',
      rating: 4,
      title: 'Heavy and exquisite finish',
      content:
        'A very solid set. Requires a bit of gentle hand-drying after wash to maintain the luster, but that is expected with pure Ayurvedic bronze metalware. Very satisfied.',
      date: '2026-08-11',
      verified: true,
      location: 'Kochi',
      helpfulCount: 4,
    },
  ],
  'copper-water-bottle': [
    {
      id: 'rev-cop-1',
      productHandle: 'copper-water-bottle',
      author: 'Pooja Iyer',
      rating: 5,
      title: 'Pure copper with no metallic aftertaste',
      content:
        'Stored water overnight and it feels distinctly refreshing and chilled in the morning. The hammered texture provides a firm grip and prevents minor scratches.',
      date: '2026-09-22',
      verified: true,
      location: 'Chennai',
      helpfulCount: 15,
    },
    {
      id: 'rev-cop-2',
      productHandle: 'copper-water-bottle',
      author: 'Rohit Kulkarni',
      rating: 5,
      title: 'Leak-proof and elegant desk companion',
      content:
        'The silicone seal inside the cap works smoothly without any leakage in my bag. Love the subtle handcrafted dents on the body.',
      date: '2026-09-05',
      verified: true,
      location: 'Mumbai',
      helpfulCount: 8,
    },
    {
      id: 'rev-cop-3',
      productHandle: 'copper-water-bottle',
      author: 'Sunita Verma',
      rating: 4,
      title: 'Great product and quick delivery',
      content:
        'Authentic copper with pure Ayurvedic benefits. Looks very sophisticated on our study table.',
      date: '2026-08-19',
      verified: true,
      location: 'Jaipur',
      helpfulCount: 3,
    },
  ],
  'brass-urli-bowl': [
    {
      id: 'rev-urli-1',
      productHandle: 'brass-urli-bowl',
      author: 'Kavita Menon',
      rating: 5,
      title: 'Centerpiece of our festive entrance',
      content:
        'Filled with fresh water, floating marigolds, and tea-light diyas. The reflection of flames in the polished brass creates the most tranquil ambiance.',
      date: '2026-10-01',
      verified: true,
      location: 'Hyderabad',
      helpfulCount: 22,
    },
    {
      id: 'rev-urli-2',
      productHandle: 'brass-urli-bowl',
      author: 'Harish Singhania',
      rating: 5,
      title: 'Heavy cast brass with master artisan detailing',
      content:
        'This is not flimsy machine-stamped sheet metal; it is thick traditional sand-cast brass with gorgeous weight. A true heirloom piece for generations.',
      date: '2026-09-18',
      verified: true,
      location: 'Kolkata',
      helpfulCount: 14,
    },
  ],
  'brass-diya-set': [
    {
      id: 'rev-diya-1',
      productHandle: 'brass-diya-set',
      author: 'Radhika Joshi',
      rating: 5,
      title: 'Pooja room feels complete',
      content:
        'The flame stays steady and burns cleanly for hours without the metal getting dangerously hot at the base. Extremely auspicious and beautifully proportioned.',
      date: '2026-09-29',
      verified: true,
      location: 'Ahmedabad',
      helpfulCount: 19,
    },
    {
      id: 'rev-diya-2',
      productHandle: 'brass-diya-set',
      author: 'Arjun Sen',
      rating: 5,
      title: 'Sublime golden glow',
      content:
        'Gifted this for a housewarming pooja and the family was touched by the traditional craft. High grade packaging too.',
      date: '2026-09-12',
      verified: true,
      location: 'Lucknow',
      helpfulCount: 7,
    },
  ],
};

// Generic master reviews pool for deterministic generation across catalog handles
const GENERAL_REVIEWS_POOL = [
  {
    author: 'Sunil Agarwal',
    location: 'Jaipur',
    rating: 5,
    title: 'Supreme artisan craftsmanship',
    content:
      'The finish and solid hand-feel are unmistakable. You immediately know this was created by a generational thathera artisan and not in a mass factory.',
  },
  {
    author: 'Deepika Raman',
    location: 'Bengaluru',
    rating: 5,
    title: 'Exceeded my expectations',
    content:
      'Arrived in tamper-proof sustainable packaging. The sheen and natural brass tone complement our traditional teak decor seamlessly.',
  },
  {
    author: 'Amitabh Sengupta',
    location: 'Kolkata',
    rating: 5,
    title: 'Authentic Indian metalcraft at its finest',
    content:
      'We have been looking for genuine heavy brassware without lacquer or harmful chemical coatings. Kaansa has delivered authentic perfection.',
  },
  {
    author: 'Neha Bansal',
    location: 'Chandigarh',
    rating: 5,
    title: 'Stunning gift for family weddings',
    content:
      'Ordered multiple pieces for gifting. Every recipient called back specifically admiring the detailing and heirloom feel.',
  },
  {
    author: 'Gaurav Trivedi',
    location: 'Varanasi',
    rating: 4,
    title: 'Traditional elegance and pure metal',
    content:
      'Solid weight, smooth edges, and pristine finish. Takes pride of place in our home.',
  },
  {
    author: 'Priyanka Nambiar',
    location: 'Coimbatore',
    rating: 5,
    title: 'A piece of cultural heritage in our home',
    content:
      'The traditional Indian metallurgical balance is evident. It cleans easily with lemon and salt and shines like warm gold.',
  },
];

// Simple deterministic hash based on product handle string
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getProductRatingData(handle: string): {
  summary: ProductRatingSummary;
  reviews: Review[];
} {
  const specificReviews = SEED_REVIEWS_BY_HANDLE[handle] || [];
  const hash = hashString(handle || 'kaansa');

  // Deterministic count: between 24 and 58 reviews for authentic credibility
  const baseCount = 24 + (hash % 35);
  // Deterministic rating: 4.8 or 4.9
  const ratingValue = 4.8 + ((hash % 3) === 0 ? 0.1 : (hash % 2) * 0.1);
  const formattedRating = Math.min(5.0, Number(ratingValue.toFixed(1)));

  // If we already have specific curated reviews, combine with pool
  const reviews: Review[] = [...specificReviews];

  // Fill in additional reviews from pool to show realistic review list
  const poolStartIndex = hash % GENERAL_REVIEWS_POOL.length;
  for (let i = 0; i < 4; i++) {
    const poolItem = GENERAL_REVIEWS_POOL[(poolStartIndex + i) % GENERAL_REVIEWS_POOL.length];
    if (!reviews.some((r) => r.author === poolItem.author)) {
      reviews.push({
        id: `rev-gen-${handle}-${i}`,
        productHandle: handle,
        author: poolItem.author,
        rating: poolItem.rating,
        title: poolItem.title,
        content: poolItem.content,
        date: `2026-0${8 + (i % 2)}-${10 + ((hash + i * 3) % 18)}`,
        verified: true,
        location: poolItem.location,
        helpfulCount: 5 + ((hash + i * 4) % 15),
      });
    }
  }

  // Calculate rating distribution
  const fiveStars = Math.round(baseCount * 0.88);
  const fourStars = Math.max(1, Math.round(baseCount * 0.1));
  const threeStars = Math.max(0, baseCount - fiveStars - fourStars);

  const summary: ProductRatingSummary = {
    averageRating: formattedRating,
    totalReviews: baseCount,
    distribution: {
      5: fiveStars,
      4: fourStars,
      3: threeStars,
      2: 0,
      1: 0,
    },
    recommendPercentage: 97 + (hash % 3),
  };

  return { summary, reviews };
}
