# Biduyt Das, CV Content, SDET

Fresh draft for the Populate Software Development Engineer in Test role. Built entirely from facts already verified elsewhere in this project (the Harp QA work, GenFit's test bar, BillPay-POS's compliance work) plus two things you confirmed directly: real, usable SQL experience, and that you grew/hardened an existing Playwright framework rather than building one from scratch. Nothing invented beyond that, this hasn't been through the adversarial review pass the TPM CV went through, so read it critically before using it.

---

Biduyt Das
Target role: Software Development Engineer in Test (SDET)
Sylhet, Bangladesh
pkdasbiduyt@gmail.com · +880 1633 004104 · linkedin.com/in/biduytdas · github.com/PKD118 · learnwithbiduyt.blogspot.com

## Summary

Mobile Application Developer at a healthcare SaaS company who took ownership of quality for a live platform end to end, nobody assigned it, I saw the gap and built the automation, CI, and standards to close it. I grew a Playwright suite from 220 to 298 tests, introduced a testing standard that fixed tests reporting green while the UI was actually broken, and wired CI straight into Slack so failures surfaced the same day instead of at the next release. On two other products I held myself to that same bar solo: a 978-test unit and contract suite before one App Store launch, and PCI/HIPAA-grade audit logging and security design on the other.

## Core Skills

**Test Automation:** Playwright · Manual and automated QA · Unit and contract testing · Reliable-selector standards (data-testid)

**CI/CD & Release Quality:** GitHub Actions · Slack-synced PR results · Scheduled regression sweeps · Test-gated PR sequencing

**Debugging & Defect Diagnosis:** Sentry monitoring · Root-cause investigation · State-machine failure analysis on AI features

**Data & Backend:** SQL · Firebase · API and contract-level testing

**Compliance & Data Integrity:** PCI/HIPAA compliance verification · Append-only audit log design

**Technical Fluency:** Swift · SwiftUI · React Native · TypeScript

## Experience

**Mobile Application Developer (QA Owner, Harp Platform)**, Lab3, Remote (Boston, MA)
*Sep 2025 – Jul 2026*

- Owned QA for the Harp platform end to end, nobody assigned it, from manual testing through full automation: grew the Playwright suite from 220 to 298 tests, introduced a data-testid standard that fixed tests reporting green while the UI was actually broken, and built a GitHub Actions CI pipeline posting results to Slack on every PR plus scheduled regression sweeps. Sequenced PR reviews and merges based on prior test results, so a merge never landed ahead of the testing that validated it. Surfaced and fixed 13 payment defects this way, most self-identified before being reported by anyone else.
- Took GenFit, an AI fitness app, from a 500-word brief to a public App Store launch in 8 weeks, solo: held a quality bar of 978 unit and contract tests before submitting to the App Store, integrated Apple HealthKit and Android Health Connect, and shipped 4 AI-backed features. Built specifically for a large US gym chain, which reports over 1,300 members onboarded so far.
- Rebuilt BillPay-POS, Lab3's own product, from a clinic's existing web app into a PCI- and HIPAA-compliant iPad point-of-sale with a self-service kiosk mode, solo, no design handoff: designed the kiosk's patient-facing security model and an append-only audit log covering 6 tracked actions on patient data, shipped 3 payment paths (terminal, Bluetooth reader, manual entry), and coordinated the AnyPay reader integration directly with AnywhereCommerce's engineering team.
- Managed releases across both Apple distribution channels (public App Store, TestFlight), including recovering a capabilities-related App Store rejection through rescoping.
- Delivered 160 tickets total across two shipped products and the Harp platform, sequencing work by risk so the highest-uncertainty items surfaced early.
- Collaborated daily in Agile/Scrum with backend, QA, and product teams across US and Bangladesh time zones, and was recognized as Lab3's Most Universal Employee at the annual company retreat for contributing across the BillPay-POS, Harp, and GenHealth teams in a single year.

**iOS Developer Intern**, SahiTech Ltd., Remote, Dhaka
*Feb 2025 – Aug 2025*

- Owned three widget and watch-face collections end to end within an existing product line (53 widgets, 7 watch faces) on a fixed roadmap and release cadence.
- Built reusable SwiftUI components adopted by the rest of the team across future collections.
- Took part in sprint planning and code review on a fully remote, cross-timezone team.

**General Secretary**, CSE Association, Khulna University of Engineering & Technology
*Apr 2023 – Apr 2024*

- Ran operations, events, and budget for a 500+ member student association with no formal authority.
- Built the documentation and task-tracking habits I still use for release management and QA process work.

## Education

**BSc in Computer Science & Engineering**, Khulna University of Engineering & Technology, Jan 2020 – Sep 2025

---

## Notes for you before using this

- **SQL:** listed as a real skill since you confirmed it, but no specific query/schema story is written in, since I don't have one. If you want it to carry more weight, give me one real example (a query you wrote, a bug you found by checking the DB directly) and I'll fold it in as a proper detail instead of a bare skill tag.
- **"Built the automation" language:** every claim here says "grew," "introduced," or "hardened," not "built" or "architected" the Playwright framework, matching what you confirmed (you extended an existing one). Don't upgrade this wording without checking it's still accurate.
- **Krishibandhu (personal project) intentionally left out.** It's real engineering work but not QA-relevant, and this CV is trying to stay tightly aimed at the SDET ask rather than padded with unrelated breadth. Say the word if you want it back in.
- **PM-specific framing removed:** no "Acting Product Owner," no target-roles list of PM titles, since none of that helps this application and some of it (stakeholder/PRD language) would read as noise against a JD this technical.
