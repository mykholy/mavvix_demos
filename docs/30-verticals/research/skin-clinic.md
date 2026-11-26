# Elyra Skin — sector 25 / competitor and content brief
Reviewed 2026-11-26. Public sites show positioning, not verified medical outcomes or affiliations.
| Comparator | Source | Observed feature | Design response |
|---|---|---|---|
| Skin House Cairo | https://skinhouse-eg.com/treatments | Distinct consultation and procedure categories | Separate educational service dossiers from administrative contact. |
| Al Sham Clinics | https://alshamclinics.com/ | Dermatology and aesthetic service categories, informational caveat | Lead with assessment and informed choices; no diagnosis. |
| Avant Clinics Riyadh | https://avantclinic.sa/en | Appointment request, service choice after assessment | Nonbinding callback request, no confirmed appointments or physician claims. |
| RICCI Clinics | https://ricciclinics.com/ | Category navigation and direct contact | Clear specialist navigation and minimal contact intake. |

Art direction: restrained editorial, warm porcelain #F7F3EF, deep aubergine #352B39, muted mauve #86566B, sage #DCE6DA. Real licensed clinical editorial imagery, no fabricated physicians, patients, results, devices, testimonials or licenses. Candidate Dermascope.jpg (Whispyhistory, CC BY-SA 4.0, 2886x2551, SHA1 765279e39fe306f89af5fef87f594dbcc0030e4a) source page verified; actual image bytes and framing must be checked before use. Retain license for derivative, credit and changes.
 
Build 9+ meaningful homepage sections, 8 distinct dossiers, 3 articles, 5 FAQ, 7+ route families, consent-led administrative callback request. Strict API: collect contact name, phone, preferred callback window, consent and idempotency only; no clinical concern or service selection in stored payload or URL-derived tracking, no free text, symptoms, images, patient records, payment, diagnosis or treatment. Do not send UTM on this medical-sector callback; no advertising pixels on enquiry. Store general 'consultation' placeholder in internal payload solely for queue compatibility, not clinical classification. Real care, emergency, clinician credentials and launch review separate. Full all-site regression, media local, privacy and visual review required before merge. Registry remains planned until completed.
