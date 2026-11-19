# Release gate: previewable vs complete

## PREVIEWABLE vertical
Public route and its fully working primary journey, valid SQLite persistence, full Arabic/English and mobile/desktop accessibility. Must show 'concept demo'. May be shared for testing; not considered complete without full route/admin/test coverage.

## COMPLETE vertical
All route patterns, rich seeded details, 3 functional journeys, CMS updates, valid DB, translated UI, images/rights, snapshots, passing tests. `progress/evidence/{vertical}` has screenshots and test output. No cosmetic stubs.

## COMPLETE KIT
All eight complete, Showcase contains exactly eight tested live links, Node+SQLite deploy runbook, accurate marketing screenshots, report and no broken link. If only 3 pass, report "3/8 staged previews" not "all complete".

## QA must search for shortcuts
Run grep for `TODO`, `coming soon`, `lorem`, placeholder hero cards, `href="#"`, `alert(`, `Math.random` seeded UI, fake counter stats, copy/paste layout duplication, `onClick={()=>{}}`, fake toast on checkout, hardcoded `setTimeout(success)`, `output: export`, leaky `.db` in `public`, unprotected `/admin` APIs. Investigate hits, do not simply force grep empty.
