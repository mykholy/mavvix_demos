# Dental (Lumen Dental / لومِن لطب الأسنان) — Route Verification Table

| Route | Purpose | Interactions | Validation & SQLite Persistence | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/[locale]/preview/dental` | Clinic Welcome & Care Nav | Dynamic concern category filter, patient journey, trust cards | Reads SQLite catalog_items & practitioners | DONE |
| `/[locale]/preview/dental/services` | Clinical Treatments Index | Search bar + Category pills (restorative, prevention, etc.) | Non-diagnostic banner, links to detail & request | DONE |
| `/[locale]/preview/dental/services/[slug]` | Service Dossier | Expected visit flow, safety note, associated doctors | Pre-selects service in request form | DONE |
| `/[locale]/preview/dental/team` | Practitioner Directory | Filter by clinical specialty (ortho, pediatric, etc.) | Fictional persona disclosure, consultation days | DONE |
| `/[locale]/preview/dental/team/[slug]` | Practitioner Profile | Philosophy, background, consultation days, linked services | Pre-selects doctor in appointment form | DONE |
| `/[locale]/preview/dental/patient-guide` | First-Visit Guide | Interactive checklist saved in localStorage (non-PII) | 8 patient education articles from SQLite | DONE |
| `/[locale]/preview/dental/patient-guide/[slug]` | Educational Article | Reading progress bar, Table of Contents, related services | Clinical review caveat, 300+ words | DONE |
| `/[locale]/preview/dental/locations` | Studio Locations | 3 concept branches (North, Central, West) | Amenities, floorplan concept, pre-selects branch | DONE |
| `/[locale]/preview/dental/request-appointment` | Appointment Request | 3-step wizard (Service, Doctor/Window, Guest info) | Server validation rejects health/PII, SQLite receipt | DONE |
| `/[locale]/preview/dental/faq` | Patient FAQ | Category filters, live search, accessible accordion | Policy guidelines & emergency notice | DONE |
| `/[locale]/preview/dental/contact` | Contact Intent | Demonstrative clinic desk & Mavvix commercial agency | Clear demo boundary, no fake patient portal | DONE |

