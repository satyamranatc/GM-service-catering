# GM Cuisine Factory Indore — Official Digital Visiting Card & Portal

A modern, luxury **Digital Visiting Card & Mini-Website** engineered for **GM Cuisine Factory**.

Inspired by the comprehensive multi-section digital card format (similar to Jainshree Digital / Smart vCard), elevated with high-end luxury aesthetics: **Deep Obsidian (#0D0C08)**, **Burnished Gold (#DFA753 / #CB9837)**, and **Warm Champagne Linen (#FAF7F2 / #F3ECE1)**.

---

## 📱 Page Architecture & Sections

1. **Profile / Hero Card (`#homesection`):**
   - High-resolution banquet cover photography with Indore live status badge.
   - Official GM Cuisine Factory cutlery crest and Didone gold-framed emblem.
   - 5-button direct contact quick bar (Call, WhatsApp, Alt Line, QR Pay, Instagram).
   - Detailed contact list with phone numbers, base location, and Justdial verification.
   - **Direct WhatsApp Input:** Send the card or message instantly to any 10-digit number.
   - **Tactile Action Buttons:** "Add to Phone Book" (.vcf export) and "Share Profile".

2. **About Us (`#AboutUsSection`):**
   - Brand story of GM Cuisine Factory.
   - 100% Pure Vegetarian & strict Jain preparation commitment.
   - Core value cards: dedicated Jain cookware, live counters, royal hammered copper presentation, and uncompromised hygiene.
   - Executive Banquet Management contact line.

3. **Signature Feasts & Menus (`#ProductsServicesSection`):**
   - Royal Wedding Banquets (multi-course royal thalis, Shahi Paneer, Dal Makhani).
   - Live Event Counters & Smoke Shot Pan.
   - Indori Street Food & Regional Stalls (Pani Puri, Dahi Papdi, butter Dosas, Chhole Bhature).
   - Royal Mithai & Artisanal Sweets (silver-leaf Kaju Katli, saffron Rasmalai, hot Jalebi Rabdi).
   - 1-tap "Enquire on WhatsApp" on every feast card.

4. **Payment Options (`#PaymentOptionsSection`):**
   - Scannable UPI / WhatsApp QR code.
   - UPI Number & ID: `9399231772` / `9399231772@upi`.
   - Badges for Google Pay, PhonePe, Paytm, BHIM UPI, IMPS / NEFT, and Cash.

5. **Photo Gallery (`#gallerysection`):**
   - Interactive 6-photo masonry grid featuring real event setups and feasts.
   - Tap-to-zoom Lightbox Image Modal (`#imageModal`) with high-resolution preview and captions.

6. **Client Feedback & Reviews (`#feedbacksection`):**
   - Real testimonials from Saket, Bypass Road, and Vijay Nagar clients.
   - Interactive 5-star rating widget with review submission.

7. **Quick Enquiry Form (`#enquirysection`):**
   - Form fields: Name, Phone, Event Type, Guest Count, Event Date, Requirements.
   - Instant WhatsApp dispatch with preformatted quote request sent directly to `+91 9399231772`.

8. **Fixed Bottom Navigation Bar (`.footer-menu`):**
   - App-like sticky bottom bar with 7 tabs: `HOME`, `ABOUT US`, `MENU`, `PAYMENT`, `GALLERY`, `FEEDBACK`, `ENQUIRY`.
   - Smooth scroll with real-time active ScrollSpy indicators.

---

## ⚡ Direct Touch Actions & Modals

- **Save Contact (.vcf):** Downloads `GM_Cuisine_Factory_Indore.vcf` formatted to Apple iOS & Android Contacts standards.
- **Share Modal:** Web Share API with fallbacks to WhatsApp, SMS, Facebook, and clipboard copy.
- **Image Lightbox:** Modal for viewing high-res gallery images.

---

## 🚀 How to Run Locally

```bash
cd "/Users/satyamrana/Desktop/GM service catering"
python3 -m http.server 3000
```
Visit: `http://localhost:3000`
