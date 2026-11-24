# Motion Lab — physiotherapy & rehabilitation website (Wave 2, industry research)
Checked 2026-11-24. Status: **research-only; no functioning Motion Lab site, clinic, doctor or appointment exists.** Next site after GlossBay passes all relevant QA gates.

## Actual service/booking evidence — Egypt and KSA

| Verified operating provider | Source | Public visitor journey | Design takeaways for a bespoke clinic |
|---|---|---|---|
| Elagi Center, Cairo Egypt | https://elagi.net/ and https://elagi.net/services/ | Treatment categories, initial assessment first, Agouza/New Cairo location context, booking by WhatsApp | Content needs assessment-first service explanation and provider-controlled hours; don't copy licensing/branch assertions |
| INSPIRE Clinic, Cairo Egypt | https://www.inspirephysioclinic.com/ | Sports-injury and rehabilitation service pages, approach, actual team, real location and book-a-session contact | Clear scope of assessment, treatment and outcomes; do NOT invent clinicians or verified credentials |
| PhysioEgypt, Cairo Egypt | https://www.physioegyptclinics.com/service-page/physiotherapy-assessment | First assessment booking flow with clinician/location/date/time preferences | Distinguish preference requests from actual available appointment slots |
| PhysioTrio, Saudi Arabia | https://www.physiotrio.sa/en | Orthopedic, knee, spine and other program descriptions with appointment CTA, licensing and provider claims on their own site | Mavvix must never transfer their clinical results/credentials/quantities to Motion Lab |
| ElSumo Rehabilitation, KSA | https://sumo.sa/en/book-appointment?category=%D8%A7%D9%84%D8%B9%D9%84%D8%A7%D8%AC-%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%B9%D9%8A&specialty=%D8%A7%D9%84%D8%A5%D8%A8%D8%B1_%D8%A7%D9%84%D8%AC%D8%A7%D9%81%D8%A9 | Booking request and follow-up to confirm service rather than blanket booking guarantee | Reception confirmation is an appropriate nonbinding status for the concept |
| Saudi Ministry of Health | https://www.moh.gov.sa/Ministry/MediaCenter/Publications/Pages/Guide-Medical-Rehabilitation-ServicesMental-Health.pdf | Rehabilitation team roles and professional licensing framework | Clinical credentials/licenses must be sourced from actual operator; example project must display no imaginary therapists |

Sources checked 2026-11-24; no claim about provider pricing, ratings, medical success rates or live slot inventory.

## Differentiated brand direction
- **Motion Lab**: calm science-led ink navy / therapy mint / bone white, editorial movement trajectories and measured progress visuals; avoids “generic spa clinic” photography, medical promise charts or glossy before/after.
- Desktop asymmetric hero, portrait authentic physical therapy scene and tactile mobility grid; on mobile prioritize patient education and first assessment enquiry without offering a medical diagnosis.
- English display typography should differ from existing Mavvix branches; Arabic must remain crisp/legible at 360/390/768/1440 and not reuse a generic clinic card-farm.
- Primary interaction: choose assessment type (back/neck mobility, sports rehabilitation, joint strengthening, postsurgery supervised rehab, ergonomic movement etc.) and session preference (first assessment vs continuation), broad locality and a contact method only. **No pain severity scales, symptoms, test results, medical photos, prescriptions or diagnosis collected** in this public example. Exact patient files belong only in an actual compliant medical system.
- Form verifies service and preference, rate limits, asks explicit consent, saves a nonbinding request with a reference and `pending_operator_confirmation`; no real clinician or appointment calendar claims.

## Content requirements
At least eight distinct educational service dossiers and 3 original AR/EN journals, five FAQ, ≥9 homepage sections, 7+ internal route families, honest clinician/credential page stating role types only, insurance/visit guide explicitly placeholders until real operator approval. Never claim “treating arthritis”, “cures pain”, instant recovery or sessions completed.

## Buyer positioning hypotheses, not market data
- Egypt: علاج طبيعي, مركز تأهيل إصابات, حجز جلسة علاج طبيعي, إعادة تأهيل بعد الإصابة.
- KSA: مركز علاج طبيعي, تأهيل رياضي, جلسات العلاج الطبيعي, تأهيل الحركة.
- Weighted qualitative opportunity hypothesis: urgency 4.4/5, differentiation 4.3, reuse 4.0, client value 3.8, owner reach 4.0, weighted 4.12/5; not measured demand, conversion or TAM.

## Release-blocking privacy
The concept should not request medical records or identity numbers. A medical clinic commissioned site must follow the actual jurisdiction's medical advertising, professional credential, privacy, telehealth and health record rules. Do not assert HIPAA/KSA/Egypt compliance without a security/legal review. The proposed image in media manifest is genuine but illustrates physiotherapy as editorial art, not an actual Motion Lab patient.
