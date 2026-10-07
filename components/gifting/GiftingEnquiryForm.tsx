'use client';

import React, { useActionState, useState } from 'react';
import { submitGiftingEnquiry, type GiftingState } from '@/app/(shop)/personal-gifting/actions';

const occasions = [
  'Wedding Favours & Invites',
  'Baby Arrival / Announcement',
  'Special Invitation / Milestone Anniversary',
  'Housewarming / Griha Pravesh',
  'Festive / Diwali Hampers',
  'Corporate & Executive Gifting',
];

const quantitySlabs = [
  '25 – 50 gifts',
  '50 – 100 gifts',
  '100 – 250 gifts',
  '250 – 500 gifts',
  '500+ gifts',
];

const budgetTiers = [
  '₹1,500 – ₹3,000 per gift',
  '₹3,000 – ₹5,000 per gift',
  '₹5,000 – ₹8,000 per gift',
  '₹8,000+ per gift (Ultra Bespoke)',
];

export default function GiftingEnquiryForm() {
  const [state, formAction, pending] = useActionState<GiftingState, FormData>(
    submitGiftingEnquiry,
    { status: 'idle' }
  );

  const [selectedPieceValue, setSelectedPieceValue] = useState('');

  if (state.status === 'success') {
    return (
      <section id="catalogue-enquiry" className="bg-[#2D0B18] text-[#FBF5EA] py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 text-center border border-[#E8D08A]/40 bg-[#1F0711] p-10 sm:p-14 shadow-2xl">
          <span className="inline-flex w-16 h-16 items-center justify-center rounded-full bg-[#E8D08A]/20 text-3xl text-[#E8D08A] mb-6">
            ✦
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[#FDF9F3] mb-4">
            Catalogue Request Received
          </h2>
          <p className="text-sm sm:text-base text-[#D4C3B7] font-light leading-relaxed mb-8">
            Thank you for sharing your celebration brief. A senior gifting curator from Kaansa will review your requirements and send your curated catalogue and custom mock-up options within 48 hours.
          </p>

          <div className="pt-6 border-t border-[#E8D08A]/20 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/917269016093?text=Hi%20Kaansa,%20I%20just%20submitted%20the%20catalogue%20request%20form%20for%20our%20celebration."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#E8D08A] text-[#2D0B18] hover:bg-white text-xs uppercase tracking-widest font-medium transition-colors"
            >
              Connect On WhatsApp Instantly
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="catalogue-enquiry" className="bg-[#2D0B18] text-[#FBF5EA] py-20 lg:py-28 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="border border-[#E8D08A]/35 bg-[#240914] p-8 sm:p-12 lg:p-16 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2.5">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#E8D08A] font-medium font-[family-name:var(--font-body)]">
              Plan Your Gifting
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#FDF9F3]">
              What Are You Celebrating?
            </h2>
            <p className="text-xs sm:text-sm text-[#D4C3B7] font-light font-[family-name:var(--font-body)] leading-relaxed pt-1">
              Tell us the occasion, date, quantity, and budget. We’ll send the catalogue and curated options suited to your brief within 48 hours. No unnecessary follow-ups.
            </p>
          </div>

          <form action={formAction} noValidate className="space-y-6 sm:space-y-7">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-[11px] uppercase tracking-[0.16em] text-[#E8D08A] mb-2 font-medium">
                Your Name <span className="text-[#E8D08A]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Full Name"
                required
                className="w-full bg-[#18050D] border border-[#E8D08A]/30 px-4 py-3 text-sm text-[#FDF9F3] placeholder-[#E5D2C2]/30 outline-none focus:border-[#E8D08A] transition-colors"
              />
              {state.errors?.name && (
                <p className="text-xs text-[#FFA0A0] mt-1">{state.errors.name}</p>
              )}
            </div>

            {/* Phone & Email */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-[11px] uppercase tracking-[0.16em] text-[#E8D08A] mb-2 font-medium">
                  Phone / WhatsApp <span className="text-[#E8D08A]">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  required
                  className="w-full bg-[#18050D] border border-[#E8D08A]/30 px-4 py-3 text-sm text-[#FDF9F3] placeholder-[#E5D2C2]/30 outline-none focus:border-[#E8D08A] transition-colors"
                />
                {state.errors?.phone && (
                  <p className="text-xs text-[#FFA0A0] mt-1">{state.errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-[11px] uppercase tracking-[0.16em] text-[#E8D08A] mb-2 font-medium">
                  Email <span className="text-[#E8D08A]">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full bg-[#18050D] border border-[#E8D08A]/30 px-4 py-3 text-sm text-[#FDF9F3] placeholder-[#E5D2C2]/30 outline-none focus:border-[#E8D08A] transition-colors"
                />
                {state.errors?.email && (
                  <p className="text-xs text-[#FFA0A0] mt-1">{state.errors.email}</p>
                )}
              </div>
            </div>

            {/* Occasion & Event Date */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="occasion" className="block text-[11px] uppercase tracking-[0.16em] text-[#E8D08A] mb-2 font-medium">
                  Occasion <span className="text-[#E8D08A]">*</span>
                </label>
                <select
                  id="occasion"
                  name="occasion"
                  required
                  defaultValue=""
                  className="w-full bg-[#18050D] border border-[#E8D08A]/30 px-4 py-3 text-sm text-[#FDF9F3] outline-none focus:border-[#E8D08A] transition-colors cursor-pointer"
                >
                  <option value="" disabled className="bg-[#18050D] text-[#888]">
                    Select Occasion
                  </option>
                  {occasions.map((occ) => (
                    <option key={occ} value={occ} className="bg-[#18050D] text-[#FDF9F3]">
                      {occ}
                    </option>
                  ))}
                </select>
                {state.errors?.occasion && (
                  <p className="text-xs text-[#FFA0A0] mt-1">{state.errors.occasion}</p>
                )}
              </div>

              <div>
                <label htmlFor="eventDate" className="block text-[11px] uppercase tracking-[0.16em] text-[#E8D08A] mb-2 font-medium">
                  Event Date
                </label>
                <input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  className="w-full bg-[#18050D] border border-[#E8D08A]/30 px-4 py-3 text-sm text-[#FDF9F3] outline-none focus:border-[#E8D08A] transition-colors"
                />
              </div>
            </div>

            {/* Quantity & Budget */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="quantity" className="block text-[11px] uppercase tracking-[0.16em] text-[#E8D08A] mb-2 font-medium">
                  How Many Gifts? <span className="text-[#E8D08A]">*</span>
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  required
                  defaultValue=""
                  className="w-full bg-[#18050D] border border-[#E8D08A]/30 px-4 py-3 text-sm text-[#FDF9F3] outline-none focus:border-[#E8D08A] transition-colors cursor-pointer"
                >
                  <option value="" disabled className="bg-[#18050D] text-[#888]">
                    Select How Many Gifts?
                  </option>
                  {quantitySlabs.map((q) => (
                    <option key={q} value={q} className="bg-[#18050D] text-[#FDF9F3]">
                      {q}
                    </option>
                  ))}
                </select>
                {state.errors?.quantity && (
                  <p className="text-xs text-[#FFA0A0] mt-1">{state.errors.quantity}</p>
                )}
              </div>

              <div>
                <label htmlFor="budget" className="block text-[11px] uppercase tracking-[0.16em] text-[#E8D08A] mb-2 font-medium">
                  Budget Per Gift (Optional)
                </label>
                <select
                  id="budget"
                  name="budget"
                  defaultValue=""
                  className="w-full bg-[#18050D] border border-[#E8D08A]/30 px-4 py-3 text-sm text-[#FDF9F3] outline-none focus:border-[#E8D08A] transition-colors cursor-pointer"
                >
                  <option value="" className="bg-[#18050D] text-[#888]">
                    Select Budget Range (Optional)
                  </option>
                  {budgetTiers.map((b) => (
                    <option key={b} value={b} className="bg-[#18050D] text-[#FDF9F3]">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* City & Selected Piece / Notes */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="block text-[11px] uppercase tracking-[0.16em] text-[#E8D08A] mb-2 font-medium">
                  City (Optional)
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="e.g. New Delhi, Mumbai, Bengaluru"
                  className="w-full bg-[#18050D] border border-[#E8D08A]/30 px-4 py-3 text-sm text-[#FDF9F3] placeholder-[#E5D2C2]/30 outline-none focus:border-[#E8D08A] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="selected-piece" className="block text-[11px] uppercase tracking-[0.16em] text-[#E8D08A] mb-2 font-medium">
                  Piece of Interest / Notes
                </label>
                <input
                  id="selected-piece"
                  name="notes"
                  type="text"
                  value={selectedPieceValue}
                  onChange={(e) => setSelectedPieceValue(e.target.value)}
                  placeholder="e.g. Brass Urli, Spice Dabba, or Gifting Atelier"
                  className="w-full bg-[#18050D] border border-[#E8D08A]/30 px-4 py-3 text-sm text-[#FDF9F3] placeholder-[#E5D2C2]/30 outline-none focus:border-[#E8D08A] transition-colors"
                />
              </div>
            </div>

            {/* Submit Button matching PDF page 6 */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={pending}
                className="w-full sm:w-auto px-12 py-4 bg-[#E8D08A] text-[#2D0B18] hover:bg-[#FBF5EA] font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 shadow-lg cursor-pointer disabled:opacity-50"
              >
                {pending ? 'Submitting Your Brief...' : 'Request The Catalogue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
