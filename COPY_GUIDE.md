# COPY_GUIDE.md — Kaansa Brand Voice & UI Copy

> All UI copy must sound human: warm, short, specific.
> No AI filler: "elevate", "tapestry", "seamlessly", "unlock", "curated experience".
> No triple-adjective lists. No em-dash chains.

---

## Brand Voice

**Three words:** Honest. Warm. Unhurried.

Kaansa makes things by hand. The copy should feel the same way — like someone who knows the craft is telling you about it, not a marketing team.

**Write like this:**
- "Made by hand, made to be used every day."
- "Light it tonight."
- "Brass keeps well. So does the memory of where it came from."
- "A gift that doesn't need wrapping to feel special."

**Never write like this:**
- "Elevate your pooja experience with our curated collection."
- "Seamlessly blend tradition and modernity."
- "Unlock the timeless beauty of handcrafted heritage."

---

## Page-by-Page Copy Reference

### Homepage

**Hero headline (two lines):**
```
Made by hand.
Made to last.
```

**Hero subtext:**
```
Brass and copper pieces from Indian artisans.
For the home, the altar, and the table.
```

**Hero CTA:**
```
Shop the collection
```

**Featured collection heading:**
```
From the workshop
```

**Category tiles:**
```
Pooja Essentials
Home Decor
Kitchen & Tableware
```

**"Why Kaansa" strip — three pillars:**
```
Pillar 1:
  Heading: Made by hand
  Body: Every piece is shaped, hammered and finished by artisans in India.
        No machines. No shortcuts.

Pillar 2:
  Heading: Built to use
  Body: Not just to look at. Brass and copper are meant to be touched,
        used and passed on.

Pillar 3:
  Heading: Rooted in tradition
  Body: These forms have been made the same way for generations.
        We just make sure they reach you.
```

**Gifting block:**
```
Heading: A gift worth giving
Body:    Something made by hand says more than something bought in a hurry.
         We pack every order carefully, so it arrives the way it should.
CTA:     Shop gifts
```

**Newsletter signup:**
```
Heading: Stay in the loop
Body:    New pieces, restocks and the occasional story from the workshop.
         No noise.
Placeholder: Your email
Button: Subscribe
```

---

### Product Detail Page

**Add to cart button:**
```
Add to cart
```

**Sold out state:**
```
Sold out
```

**Quantity label:**
```
Qty
```

**Details section heading:**
```
About this piece
```

**Related products heading:**
```
Pairs well with
```

**% off badge:**
```
{n}% off
```

**Free shipping note (if applicable):**
```
Free shipping on orders above ₹999
```

---

### Cart Drawer

**Empty cart:**
```
Heading: Nothing here yet
Body:    Add something from the collection.
CTA:     Browse pieces
```

**Cart heading:**
```
Your cart
```

**Checkout button:**
```
Go to checkout
```

**Subtotal label:**
```
Subtotal
```

**Note below checkout:**
```
Taxes and shipping calculated at checkout.
```

---

### Search

**Placeholder:**
```
Search for a piece…
```

**No results:**
```
Nothing found for "{query}".
Try a different word, or browse the collection.
```

**Results heading:**
```
Results for "{query}"
```

---

### 404 Page

```
Heading: This page doesn't exist.
Body:    It may have moved, or the link might be wrong.
CTA:     Go back home
```

---

### About Page (editable placeholder)

```
Heading: About Kaansa

Body:
Kaansa started with a simple idea: brass and copper objects made by Indian
artisans should be easy to find and easy to buy.

We work directly with craftspeople who have been making these forms for
generations. The diya, the urli, the ghee pot — these are not decorative
objects. They are things people use every day, in kitchens and pooja rooms
across India.

We photograph them honestly, describe them plainly, and ship them carefully.
That's the whole idea.

[Edit this copy with your actual brand story]
```

---

### Contact Page

```
Heading: Get in touch

Body:
Questions about an order, a piece, or anything else — write to us.
We reply within one business day.

Email: [your-email@kaansa.com]
```

---

## Microcopy Rules

| Context | Copy |
|---|---|
| Loading state | (skeleton only — no text) |
| Image alt fallback | `"{Product title} — Kaansa"` |
| Cart item removed | `"Removed"` (toast, 2s) |
| Cart updated | `"Updated"` (toast, 2s) |
| Form error | `"Please check this field."` |
| Form success | `"Done. We'll be in touch."` |
| Stock low (< 5) | `"Only {n} left"` |
| Back to collection | `"← Back"` |
| Breadcrumb separator | `/` |

---

## Currency Format

```typescript
new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(amount)
// Output: ₹1,499
```
