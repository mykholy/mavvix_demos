# Wave 1 QA checkpoint — 2026-11-24

- Source run [45325876679](https://github.com/mykholy/mavvix_demos/actions/runs/45325876679) at 67e2248: 50 tests passed; 486 pages built; 100 Oakline/Forma locale-route checks; both request workflows validated and persisted.
- Expanded browser run [45325876684](https://github.com/mykholy/mavvix_demos/actions/runs/45325876684) failed on a Wikimedia furniture thumbnail and Forma missing accessible link/select labels.
- This patch uses the original licensed Stephen Di Donato photograph (CC0, https://commons.wikimedia.org/wiki/File:Furnished_living_room._(Unsplash).jpg), adds an accessible consultation link name and associates the design scope label and select. Network availability and accessibility must be confirmed by a fresh browser run.
- BloomSteps implementation at 2a37874: eight program/age/activity dossiers, three parent guides, guardian-only nursery enquiry, no child-identifying fields. QA pending.
- 16 sector implementations exist, including eight original and eight Wave 1; 15 gallery entries, BloomSteps awaiting gallery admission. Fourteen sectors remain unimplemented.
- Do not mark Wave 1 complete or merge while browser verification is failing/pending. Next dependency is still 14.2.24; supported-version upgrade and regression verification remain an explicit gate. No deployment performed.
