# Necessary Edits — TPM CV vs. Current Portfolio

Source compared: `assets/Biduyt_Das_Technical_Product_Manager.pdf` (the CV currently downloadable from the portfolio) against the live content of `index.html` as it stands today. The portfolio has been corrected substantially since this PDF was generated — several facts in the PDF are now factually wrong, not just out of date. Fixes below are ordered by section, in the order they appear in the PDF.

---

## 1. Header / subtitle — self-titling issue

**PDF has:** `Technical Product Manager · Associate Product Manager · Business Analyst` as the subtitle directly under the name, formatted like a held job title.

**Problem:** This reads as claiming three titles he doesn't hold. The portfolio itself no longer does this anywhere (it uses "Mobile Application Developer, Acting Product Owner" as the real title everywhere: hero, contact card, footer, browser tab).

**Edit:** Change the subtitle to something that states intent, not identity, e.g.:
`Target roles: Technical Product Manager · Associate Product Manager · Business Analyst`

---

## 2. Summary — three wrong/outdated facts in one paragraph

**PDF has:** *"Mobile Application Developer at a healthcare SaaS company who ended up doing the product manager's job. For three products in 11 months, the brief was often just a short readme or a Figma file, and turning that into scope, a schedule, and a case stakeholders could act on fell to me. That included an AI fitness app taken from a 500-word brief to a public App Store launch in 8 weeks, HIPAA requirements translated into a build-ready spec, and the quality process for a live healthcare platform."*

**Problems:**
- "three products" — the portfolio now says **two products shipped (GenFit, BillPay-POS), plus QA ownership on Harp**, one of Lab3's largest platforms. "Three" overclaims that Harp was a product he built rather than a platform he did QA on.
- "a short readme or a Figma file" — the Figma reference is wrong. BillPay-POS was never a Figma handoff; it was reverse-engineered from a client's existing web app. The portfolio now says "a short readme or an existing product to reverse-engineer."
- "HIPAA requirements translated into a build-ready spec" — incomplete. The portfolio now also credits PCI compliance and the self-service kiosk mode he designed, which is some of the strongest product-thinking evidence on the whole site.

**Edit:**
*"Mobile Application Developer at a healthcare SaaS company who ended up doing the product manager's job. For two products in 11 months, plus quality ownership on a third, the brief was often just a short readme or an existing product to reverse-engineer, and turning that into scope, a schedule, and a case stakeholders could act on fell to me. That included an AI fitness app taken from a 500-word brief to a public App Store launch in 8 weeks, a clinic web app rebuilt as a PCI- and HIPAA-compliant iPad and self-service kiosk, and the quality process for a live healthcare platform."*

---

## 3. Skills — Launch & Compliance line

**PDF has:** *"App Store review (Public App Store, Custom Apps, TestFlight) · Rejection recovery · HIPAA compliance specification"*

**Problem:** "Custom Apps" is no longer accurate — that distribution channel was tied specifically to a minor product that's been removed from the portfolio narrative. The portfolio now says he shipped through **both** Apple channels: public App Store and TestFlight, not three.

**Edit:** *"App Store review (Public App Store, TestFlight) · Rejection recovery · Review-cycle foresight · PCI/HIPAA compliance specification"*

(The portfolio's "How I Decide" section now has a whole story about anticipating Apple's review-cycle cost before it happens — "Review-cycle foresight" is the exact phrase used as a skill tag there. Worth adding here too, since it's now one of the strongest stakeholder-conflict stories on the site.)

---

## 4. Experience — Lab3, bullet 1 (minimal input)

**PDF has:** *"...often just a short readme or a Figma file, and turned it into scoped, estimated work."*

**Problem:** Same Figma error as the Summary.
often just a short readme or an existing web app to study, and turned it into scoped, estimated work.
**Edit:** *"..."*

---

## 5. Experience — Lab3, bullet 2 (GenFit) — factually wrong claim

**PDF has:** *"...One of the largest gym chains in the US signed on as a client after launch."*

**Problem:** This is not accurate. GenFit wasn't a general consumer launch that a gym chain later adopted — it was **built and tailored specifically for** a large US gym chain from the start. The portfolio also now has a real, attributable adoption number: the client reports 1,300+ of their members onboarded.

**Edit:** *"...Built and tailored specifically for a large US gym chain; the client reports 1,300+ of their members onboarded so far."*

---

## 6. Experience — Lab3, bullet 3 (BillPay-POS) — needs a full rewrite

**PDF has:** *"Delivered BillPay-POS, a HIPAA-compliant iPad point-of-sale for healthcare clinics, from Figma to TestFlight solo. Translated HIPAA requirements into a build-ready compliance spec, shipped 3 payment paths (terminal, Bluetooth reader, manual entry), designed an append-only audit log covering 6 tracked actions on patient data, and handed the finished product to a partner company for clinic rollout."*

**Problems, all confirmed wrong or incomplete against the current portfolio:**
- Not from Figma — from a clinic's existing web app, no design handoff at all.
- Missing PCI (only HIPAA is mentioned; the real constraint set was both).
- Missing the self-service kiosk mode — this is the single richest piece of product-thinking evidence in the whole portfolio (a patient-facing security model: nothing left on screen after a transaction, not even staff can see payment details) and isn't in the CV at all.
- Missing the AnywhereCommerce vendor-coordination story (no internal resource existed for the AnyPay reader, so he worked directly with the vendor's engineering team) — this is real cross-functional/vendor evidence a BA or TPM screen specifically looks for.
- Missing the real outcome metric: BillPay-POS is Lab3's own product, and a small commission on every payment means the company still tracks volume — now $50k+ a month across live clinics.

**Edit:** *"Rebuilt BillPay-POS, Lab3's own product, from a clinic's existing web app into a PCI- and HIPAA-compliant iPad point-of-sale with a self-service patient kiosk mode, solo, no design handoff. Designed the kiosk's patient-facing security model, coordinated the AnyPay reader integration directly with AnywhereCommerce's engineering team, shipped 3 payment paths (terminal, Bluetooth reader, manual entry), designed an append-only audit log covering 6 tracked actions on patient data, and handed the finished product to a partner company for clinic rollout. Lab3 keeps a commission on every payment, which is how the product is known to still process $50k+ a month."*

---

## 7. Experience — Lab3, bullet 4 (Harp QA) — accurate, no change needed

This bullet already matches the portfolio's current framing (manual QA through automation, 220→298 tests, 13 payment defects, self-identified before being reported). Leave as-is.

---

## 8. Experience — Lab3, bullet 5 (Apple channels) — factually wrong count

**PDF has:** *"Managed releases across all three Apple distribution channels (public App Store, Custom Apps, ad hoc TestFlight), including recovering a capabilities-related App Store rejection through rescoping."*

**Problems:**
- "all three" / "Custom Apps" — wrong, same root cause as the Skills-section fix above. Only two channels apply now.
- "ad hoc TestFlight" — TestFlight isn't ad hoc distribution; that's a separate, distinct Apple mechanism. The portfolio corrected this exact phrasing.

**Edit:** *"Managed releases across both Apple distribution channels (public App Store, TestFlight), including recovering a capabilities-related App Store rejection through rescoping."*

---

## 9. Experience — Lab3, bullet 6 (160 tickets) — wrong product count

**PDF has:** *"Delivered 160 tickets total across three shipped products and platform QA, sequencing work by risk so the highest-uncertainty items surfaced early."*

**Edit:** *"Delivered 160 tickets total across two shipped products and the Harp platform, sequencing work by risk so the highest-uncertainty items surfaced early."*

---

## 10. Experience — Lab3, bullet 7 (Most Universal Employee) — wrong team name

**PDF has:** *"...recognized as Lab3's Most Universal Employee at the annual company retreat for contributing across all three product teams (BillPay-POS, Harp, and GenFit) in a single year."*

**Problem:** GenFit is already covered in bullet 2 — it isn't the third team this award is about. The actual third team is **GenHealth**, a different Lab3 team's patient app (still unshipped), for which he laid out screens and navigation during his Harp QA period. The portfolio now names this explicitly.

**Edit:** *"...recognized as Lab3's Most Universal Employee at the annual company retreat for contributing across the BillPay-POS, Harp, and GenHealth teams in a single year (GenHealth is a different team's patient app, still unshipped; screens and navigation laid out during the Harp QA period)."*

If that reads as too long for a CV bullet, the shorter, still-accurate version is: *"...for contributing across the BillPay-POS, Harp, and GenHealth teams in a single year."*

---

## 11. Missing entirely — the App Store review-cycle pushback story

The portfolio's "How I Decide" section now features what independent hiring-manager review repeatedly called **the single strongest piece of evidence on the whole site**: a real disagreement with a client (they wanted GenFit shipped skeletal-first with features rolled out via updates later), resolved by explaining a genuine technical/business tradeoff (Apple requires a permission to be demonstrated in use, not just declared, so a naive skeletal-first plan would mean re-earning a full review on every future update). This is currently **not in the CV at all**, and it's the exact kind of stakeholder-conflict evidence that TPM/APM/BA screens specifically look for and the CV is currently missing.

**Suggested new bullet** (placed after the BillPay-POS bullet, before the Harp QA bullet, or wherever fits your template):

*"Pushed back on a client's plan to ship GenFit skeletal-first with features added via later updates: Apple requires a permission to be demonstrated in use, not just declared, so a skeletal-first app would have meant re-earning a full review on every feature added afterward. After walking the client through how App Store review actually works, shipped complete instead, one extra week, and every update since has moved through the fast review lane instead of a full one."*

---

## Summary checklist

- [ ] Fix header subtitle — "Target roles:" not a claimed title
- [ ] Fix Summary — two products not three, no Figma, add PCI + kiosk
- [ ] Fix Skills — remove Custom Apps, add PCI, consider adding "Review-cycle foresight"
- [ ] Fix bullet 1 — no Figma
- [ ] Fix bullet 2 (GenFit) — remove the "signed on as a client" claim, add real 1,300+ number
- [ ] Rewrite bullet 3 (BillPay-POS) — kiosk mode, PCI, AnywhereCommerce, $50k+/month
- [ ] Fix bullet 5 — two Apple channels, not three; drop "ad hoc"
- [ ] Fix bullet 6 — two shipped products, not three
- [ ] Fix bullet 7 — GenHealth, not GenFit, as the third team
- [ ] Add new bullet — the App Store review-cycle pushback story

Once these are applied to your CV template, the downloadable PDF needs to be regenerated and re-exported — editing the source document won't update the file currently linked from the portfolio.
