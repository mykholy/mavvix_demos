# Dental (Lumen Dental) — Journey & Oracle Verification

## Journey 1: Service Discovery to Simulated Appointment Request
- **Path:** `/[locale]/preview/dental` → Service Finder (Preventative) → `service-02` (Professional Cleaning) → Request Appointment → Select Branch & Time Window → Submit Guest Info → Simulated Receipt.
- **Oracle Result:** PASS.
- **Database Verification:** Record stored in `demo_submissions` with `flow_type = 'dental_appointment'`, status `'simulated'`, reference `MVX-DEN-XXXXXX`, and non-confirmed demo notice.

## Journey 2: Parent Explores First Visit Preparation
- **Path:** `/[locale]/preview/dental/patient-guide` → Interactive First Visit Checklist → Check off non-sensitive items (saved in browser `localStorage`) → Read Educational Article (`article-01`) → Link to Pediatric Care (`kids-preventive`) → Request Consultation.
- **Oracle Result:** PASS. No medical history, symptoms, or personal health info stored.

## Journey 3: Invalid Sensitive Medical Data Path
- **Path:** Client / API attempts to send payload with medical symptoms, diagnostic notes, or health history to `/api/demo/dental`.
- **Server Gate:** The API gate in `/api/demo/[vertical]/route.ts` detects sensitive medical keys or phrases, responds with status `422 Unprocessable Entity` and code `SENSITIVE_MEDICAL_DATA_REJECTED`, rejecting clinical symptom storage.
- **Oracle Result:** PASS. No health diagnostic PII is ever recorded in SQLite.

