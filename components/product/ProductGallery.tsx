'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ShopifyImage } from '@/lib/shopify/types';

export interface ProductGalleryProps {
  images: ShopifyImage[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[3/4] bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-muted)] text-sm">
        No image available
      </div>
    );
  }

  const selectedImage = images[selectedIndex] || images[0];

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Image View */}
      <div className="relative w-full aspect-[3/4] bg-[var(--color-bg)] overflow-hidden border border-[var(--color-border)]">
        <Image
          src={selectedImage.url}
          alt={selectedImage.altText || `${title} — Kaansa`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-2"
        />
      </div>

      {/* Thumbnails if more than 1 image */}
      {images.length > 1 && (
        <div className="flex items-center space-x-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={img.url + idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={clsx(
                'relative w-20 aspect-[3/4] bg-[var(--color-bg)] shrink-0 overflow-hidden border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]',
                selectedIndex === idx
                  ? 'border-[var(--color-gold)] ring-1 ring-[var(--color-gold)]'
                  : 'border-[var(--color-border)] opacity-70 hover:opacity-100'
              )}
            >
              <Image
                src={img.url}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
