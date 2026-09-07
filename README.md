# Al Muhaidib Group × SAP — The Autonomous Enterprise Journey

An interactive, presenter-led platform for walking Al Muhaidib Group's IT, Business, and Executive
audiences from a Group-specific use case through SAP Business Data Cloud, SAP Business AI Platform,
Joule, and the Autonomous Enterprise — ending with a live, hands-on Joule Agent workshop.

## How to open this

Keep these together in one folder:

```
index.html       ← open this in a browser — double-click it, that's it
media/           ← logos, diagrams, and all 12 demo videos
```

**`index.html` now works by simply double-clicking it** — no local server needed. All of the
page's styling and interactive logic are built directly into that one file, so the only thing
it needs alongside it is the `media` folder (kept separate because the videos are too large to
embed directly without breaking the file).

`styles.css`, `content.js`, and `app.js` are also included in this folder as readable reference
copies of what's inside `index.html`, in case you want to review or hand them to a developer —
but they are not loaded by the page itself anymore, so you don't need to keep them next to
`index.html` for it to work.

If double-clicking still doesn't play video in your specific browser setup (some locked-down
corporate machines restrict local file playback entirely), running a tiny local server is the
fallback:

```
python3 -m http.server 8080
```

then open `http://localhost:8080`.


## Navigating during the session

- **Left rail** (desktop) or **menu icon, top right** (mobile/narrow window): jump to any of the
  15 sections directly.
- **Bottom bar**: Back / Next buttons, plus a progress indicator.
- **Arrow keys**: ← and → also move between sections.
- Videos only play one at a time, and always stop and reset the moment you navigate away —
  so nothing keeps running in the background during your session.
- The **Joule bubble** (bottom right) is a lightweight, illustrative assistant — it offers
  section-relevant suggested questions and responds with a placeholder message pointing back
  to your live SAP environment. It is not a live AI connection.

## What's complete vs. what's a placeholder

| Section | Status |
|---|---|
| The Challenge (Al Muhaidib use case) | Complete |
| Your Hosts (presenter intro) | Complete — Amal Al-Rebh and Zainab Abdulsalam, with photos |
| SAP Business Data Cloud | Diagram and copy complete. **5 video placeholders waiting on real files** — overview, SAP Datasphere, SAP Analytics Cloud, Joule Agents on BDC, and Master Data Governance. See "Adding videos to placeholder slots" below. |
| How It's Built, Joule Beyond Chat, Autonomous Suite, Assistant Catalog, Finance Spotlight, What Changes, HR in Action | Complete — built from your approved SAP decks |
| Joule for Developers | **Placeholder videos** — the wheel diagram is in; the two demo videos (overview + Application Generation) are waiting on real files. See "Adding videos to placeholder slots" below. |
| Build Your Own Agent (Joule Studio overview) | Complete |
| → Live workshop hand-off (QR code + steps) | QR code is live. Steps are written from the workshop title only — the source PDF still wasn't shared, so it's worth checking them against the real guide before presenting |
| Joule for Consultants | Complete |
| AI Beyond Joule | Complete |
| Get Started with Joule | Complete — both real QR codes, decoded and verified |

## Recent revisions

- **SAP Business Data Cloud page rebuilt.** The real architecture diagram (AI Agents, Knowledge
  Core, Intelligent Compute, Business Data Fabric, Master Data Governance) is in, along with
  5 video slots — each one already wired exactly like the videos on the "What Changes" page,
  meaning the moment a real file is dropped in, clicking play opens it in the same centered
  pop-up player, with the same close behavior. They're placeholders only because the actual
  video files haven't been uploaded yet (same situation as the two Joule for Developers videos).
- **Fixed for real this time: the opening page's bottom row was getting cut off.** Took a few
  passes to find the actual cause — it wasn't just short screens, it was narrower ones too.
  At widths like 1280px, the AI insight paragraph wrapped onto extra lines, which quietly
  pushed the card taller than the space available and shoved "Begin the journey" and the
  SAP Business Data Cloud → Business AI Platform → Joule row down behind the bottom bar. The
  card now accounts for both dimensions together, with paragraphs that gracefully shorten
  instead of silently growing the card. Tested across nine combinations of width and height,
  from a small laptop window up to a 1920×1080 monitor — confirmed clean, nothing hidden or
  overlapping, at every one.
- **The opening page's AI insight is now genuinely interactive.** It now covers all four AMG
  sectors — Financial Investment, Food & Consumer (Mayar Foods, Savola/Almarai, Panda Retail),
  Industrial & Infrastructure, and Real Estate — each with its own real example and a "live
  signal" callout. Click any tab or dot to switch instantly, or leave it alone and it rotates
  through all four on its own every 6 seconds (pausing politely if you click something, and
  pausing entirely if you navigate to another page or the browser tab loses focus). Verified
  with a real headless-browser test of every click path, not just visually.
- **Opening page rebuilt as a single-screen story.** "The Challenge" now fits on one screen
  with no scrolling, even on shorter laptop displays — a self-introduction grounded in AMG's
  real history (founded 1943), a chip-list of actual portfolio companies (SAB, Saudi National
  Bank, Arab Bank Iraq, Mansour Bank, BLOMINVEST, Seedra Ventures, Gadwa, Pioneer Properties),
  an investment-specific AI insight, and the SAP Business Data Cloud → SAP Business AI
  Platform → Joule flow, all visible together.

## Adding videos to placeholder slots

There are 7 video slots across the platform still waiting on real files — 5 on the SAP Business
Data Cloud page, 2 on Joule for Developers. None of these could be uploaded directly (project
upload, zip, and chat attachment all reject `.mp4` and archives in this environment), so each
ships as a clearly-labeled placeholder instead of a broken player. They're already wired the
same way every working video on the platform is — same pop-up player, same play/close
behavior — so adding a real file is a drop-in swap, not new development.

**SAP Business Data Cloud (5 slots):**

| Placeholder | Suggested filename |
|---|---|
| SAP Business Data Cloud overview | `bdc-overview.mp4` |
| SAP Datasphere demo | `bdc-datasphere-demo.mp4` |
| SAP Analytics Cloud demo | `bdc-analytics-cloud-demo.mp4` |
| Joule Agents on BDC demo | `bdc-joule-agents-demo.mp4` |
| Master Data Governance demo | `bdc-master-data-governance-demo.mp4` |

**Joule for Developers (2 slots):**

| Placeholder | Suggested filename |
|---|---|
| Joule for Developers walkthrough | `joule-for-developers-overview.mp4` |
| Application Generation demo | `joule-application-generation-demo.mp4` |

**To add a file:**

1. Rename it to match the filename you'll use (the suggestions above, or your own — just stay
   consistent with what you put in the code).
2. Drop it into `media/video/`, alongside the videos already there.
3. In `content.js` (and the matching block inside `index.html`), search for the placeholder's
   exact wording — e.g. `This slot is reserved for the SAP Datasphere demo` — to find the right
   `<div class="video-frame video-frame--pending">` block, then replace it with real `<video>`
   markup. Copy the exact pattern from any working video elsewhere on the page (search for
   `v-hr-agent` for a simple example, or `v-ar-finance` for one that already uses the pop-up
   player the same way these placeholders will).

No other file needs to change. Every other video, the pop-up player, navigation, and all 15
sections work today regardless of how many of these 7 slots are filled in.

Each placeholder is clearly marked in the platform itself, so none of them will be mistaken
for finished content if presented as-is.

## Filling in what's left

Send me:
1. The workshop PDF ("Create Joule Agents and Skills for SAP SuccessFactors with SAP Build")
2. A working link (WeTransfer or similar) to any of the 7 placeholder videos above, if you'd
   rather I wire them in than do it yourself per the steps above

and I'll drop them into the existing structure in place — no rebuild of the rest of the platform
needed.

## A note on one slide

One slide from `SAP_Autonomous-AMG.pptx` (the "Autonomously Orchestrated Finance" snapshot,
slide 12) was marked **INTERNAL – SAP Only** in the source file and has been deliberately left
out of this customer-facing platform.

## Content sourcing

All text, diagrams, screenshots, and videos are used as-is from your six approved SAP decks:
`SAP_Autonomous-AMG.pptx`, `AMG2.pptx`, `J4C.pptx`, `Joule_Agents.pptx`, `AI_Beyond_Joule.pptx`,
and `Get_started_with_Joule_today.pptx`. Videos are the original files at full resolution with no
re-encoding. Dense architecture/process diagrams are embedded as high-resolution images (for
exact fidelity to the approved SAP artwork) inside an otherwise fully interactive HTML
experience — navigation, tabs, video playback, and the Joule widget are all real, built
components, not images.
