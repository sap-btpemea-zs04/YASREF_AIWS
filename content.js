/* ============================================================
   CONTENT.JS
   Defines the ordered journey sections. Each entry:
   { id, navLabel, kind ('dark'|'light'), html: <string> }
   Built from: real content extracted from the six approved SAP
   PPTX decks (SAP_Autonomous-AMG, AMG2, J4C, Joule_Agents,
   AI_Beyond_Joule, Get_started_with_Joule_today), plus an
   Al Muhaidib-specific opening use case and a presenter intro
   slot, per the agreed structure.
   ============================================================ */

/* ---------- Interactive AI insight tabs for the opening storytelling page ---------- */
const OPENER_INSIGHTS = [
  {
    label: 'Financial Investment',
    text: `AMG already monitors performance and benchmarks every portfolio company. AI doesn't replace that judgment — it removes the lag between a signal appearing <em>anywhere</em> in the Group (a bank's exposure, a build cost in Egypt, a market shift in Real Estate) and a decision-maker seeing it. One picture, every sector, continuously.`,
    signal: `Live signal: a covenant shift at one bank surfaces group-wide exposure before quarter close, not after.`
  },
  {
    label: 'Food & Consumer',
    text: `Mayar Foods alone holds a 22% share of the Saudi rice market; Savola's stakes in Almarai and Herfy span dairy and quick-service food; Panda Retail moves household goods through stores trusted in 30 countries. AI ties demand signals from the shelf back to procurement and the balance sheet in one motion, instead of three separate monthly reports arriving three different ways.`,
    signal: `Live signal: a demand spike at Panda is matched against Mayar's rice supply position the same day, not at next month's review.`
  },
  {
    label: 'Industrial & Infrastructure',
    text: `From Al Yamamah Steel to Acwa, Bawan, and DataVolt, the Industrial &amp; Infrastructure sector runs on long, capital-heavy cycles where a single delayed shipment or energy-price swing can ripple across multiple plants at once. AI watches those cycles continuously, so a cost pressure in one facility is visible across the whole portfolio <em>before</em> it shows up in next quarter's numbers.`,
    signal: `Live signal: a raw-material cost spike at one steel facility flags margin risk across every linked project, in real time.`
  },
  {
    label: 'Real Estate',
    text: `Rafal, Thabat, and Ajdan each run multi-year developments — like Burj Rafal or the new $5bn Oman venture — where construction pace, financing cost, and market demand all move independently. AI ties those threads together as they happen, turning scattered project updates into one live read on the whole development pipeline.`,
    signal: `Live signal: a financing-rate move is matched instantly against every active development's exposure, not discovered at the next review.`
  }
];

const JOURNEY_SECTIONS = [

/* ============================================================
   01 — USE CASE OPENER (Al Muhaidib specific — investment-led storytelling)
   ============================================================ */
{
  id: 'usecase',
  navLabel: 'The Challenge',
  kind: 'dark',
  html: `
    <div class="opener">
      <svg class="opener__crystal" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id="heroCrystal1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6FA0FF"/><stop offset="50%" stop-color="#5D36FF"/><stop offset="100%" stop-color="#9333EA"/>
          </linearGradient>
        </defs>
        <path d="M 36 6 Q 50 0 64 6 L 88 30 Q 95 37 89 44 L 56 91 Q 50 99 44 91 L 11 44 Q 5 37 12 30 Z M 50 32 L 56 46 L 70 50 L 56 54 L 50 68 L 44 54 L 30 50 L 44 46 Z" fill="url(#heroCrystal1)" fill-rule="evenodd"/>
      </svg>

      <div class="opener__top">
        <div class="opener__intro">
          <div class="opener__eyebrow"><span class="dot"></span> Introducing SAP Business AI, for Al Muhaidib Group</div>
          <h1 class="opener__title">81 years of finding the next opportunity. <em>Now built to find it faster.</em></h1>
          <p class="opener__sub">Since 1943, AMG has grown into an investment powerhouse across Food &amp; Consumer, Industrial &amp; Infrastructure, Real Estate, and Financial Investment — 4 continents, 25 countries, one ownership mindset. Today, that same portfolio runs on dozens of disconnected systems. This is the story of giving AMG's own philosophy — continuous search for opportunity — an AI-scale engine.</p>
        </div>
        <div class="opener__portfolio">
          <div class="opener__portfolio-label">A glimpse of the portfolio this connects</div>
          <div class="opener__portfolio-chips">
            <span class="chip">SAB <i>· HSBC-associated</i></span>
            <span class="chip">Saudi National Bank</span>
            <span class="chip">Arab Bank Iraq</span>
            <span class="chip">Mansour Bank <i>· QNB Group</i></span>
            <span class="chip">BLOMINVEST</span>
            <span class="chip">Seedra Ventures <i>· VC</i></span>
            <span class="chip">Gadwa <i>· Egypt</i></span>
            <span class="chip">Pioneer Properties</span>
          </div>
        </div>
      </div>

      <div class="opener__mid">
        <div class="opener__stats">
          <div class="opener__stat"><div class="opener__stat-num">4</div><div class="opener__stat-label">sectors, each on its own cycle and its own books</div></div>
          <div class="opener__stat"><div class="opener__stat-num">25</div><div class="opener__stat-label">countries across 4 continents</div></div>
          <div class="opener__stat"><div class="opener__stat-num">10+</div><div class="opener__stat-label">banking, VC &amp; PE relationships in Financial Investment alone</div></div>
          <div class="opener__stat"><div class="opener__stat-num">1</div><div class="opener__stat-label">foundation needed to see it all at once</div></div>
        </div>
        <div class="opener__insight" id="openerInsight">
          <div class="opener__insight-head">
            <div class="opener__insight-title">The AI insight</div>
            <div class="opener__insight-tabs" id="openerInsightTabs">
              <button class="opener__insight-tab is-active" data-insight="0" aria-label="Financial Investment insight">Financial Investment</button>
              <button class="opener__insight-tab" data-insight="1" aria-label="Food &amp; Consumer insight">Food &amp; Consumer</button>
              <button class="opener__insight-tab" data-insight="2" aria-label="Industrial &amp; Infrastructure insight">Industrial &amp; Infrastructure</button>
              <button class="opener__insight-tab" data-insight="3" aria-label="Real Estate insight">Real Estate</button>
            </div>
          </div>
          <p class="opener__insight-text" id="openerInsightText">AMG already monitors performance and benchmarks every portfolio company. AI doesn't replace that judgment — it removes the lag between a signal appearing <em>anywhere</em> in the Group (a bank's exposure, a build cost in Egypt, a market shift in Real Estate) and a decision-maker seeing it. One picture, every sector, continuously.</p>
          <div class="opener__insight-signal" id="openerInsightSignal">
            <svg viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
            <span>Live signal: a covenant shift at one bank surfaces group-wide exposure before quarter close, not after.</span>
          </div>
          <div class="opener__insight-dots" id="openerInsightDots" role="tablist" aria-label="Auto-rotating sector insights"></div>
        </div>
      </div>

      <div class="opener__bottom">
        <div class="opener__flow">
          <div class="opener__flow-step">
            <span class="opener__flow-num">1</span>
            <div><strong>SAP Business Data Cloud</strong><span>unifies every sector's data into one governed foundation</span></div>
          </div>
          <svg class="opener__flow-arrow" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <div class="opener__flow-step">
            <span class="opener__flow-num">2</span>
            <div><strong>SAP Business AI Platform</strong><span>turns that unified data into action, not just dashboards</span></div>
          </div>
          <svg class="opener__flow-arrow" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <div class="opener__flow-step">
            <span class="opener__flow-num">3</span>
            <div><strong>Joule &amp; the Autonomous Enterprise</strong><span>carry it forward across Finance, Supply Chain, Spend, HCM, CX</span></div>
          </div>
        </div>
        <button class="btn btn-primary opener__cta" data-nav="next">
          Begin the journey
          <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>
  `
},

/* ============================================================
   02 — PRESENTER INTRODUCTION SLOT
   ============================================================ */
{
  id: 'intro',
  navLabel: 'Your Hosts',
  kind: 'light',
  html: `
    <div class="section-head section-head--center">
      <div class="eyebrow" style="justify-content:center;">Before we continue</div>
      <h2 class="headline">Meet your guides for today's journey</h2>
    </div>

    <div class="team-grid" style="max-width:680px; margin-left:auto; margin-right:auto;" id="teamGrid">
      <div class="team-card">
        <div class="team-card__photo">
          <img src="media/img/amal-photo.jpg" alt="Amal Al-Rebh" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="team-card__info">
          <div class="team-card__name">Amal Al-Rebh</div>
          <div class="team-card__title">Senior Solution Advisor, SAP BDC</div>
        </div>
      </div>
      <div class="team-card">
        <div class="team-card__photo">
          <img src="media/img/zainab-photo.jpg" alt="Zainab Abdulsalam" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="team-card__info">
          <div class="team-card__name">Zainab Abdulsalam</div>
          <div class="team-card__title">Lead Advisor, SAP BAIP</div>
        </div>
      </div>
    </div>
  `
},

/* ============================================================
   03 — SAP BUSINESS DATA CLOUD
   ============================================================ */
{
  id: 'bdc',
  navLabel: 'Business Data Cloud',
  kind: 'light',
  html: `
    <div class="section-head">
      <div class="eyebrow">Step One — The Foundation</div>
      <h2 class="headline">SAP Business Data Cloud</h2>
      <p class="subhead">The unified data foundation that makes everything that follows possible.</p>
    </div>

    <div class="diagram-panel" style="margin-bottom:36px;">
      <img src="media/img/bdc-architecture.png" alt="SAP Business Data Cloud architecture — AI Agents (Joule Agents, Intelligent content), Knowledge Core (SAP Datasphere, SAP Analytics Cloud), and Intelligent Compute (SAP HANA Cloud, SAP Databricks, SAP Snowflake), built on Business Data Fabric and Master Data Governance" loading="lazy">
    </div>

    <div class="section-head">
      <div class="eyebrow">See it live</div>
      <h3 class="headline" style="font-size:clamp(24px,2.8vw,32px);">Inside SAP Business Data Cloud</h3>
    </div>

    <div style="margin-bottom:36px;">
      <div class="grid grid-2">
        <div>
          <div class="video-frame" data-video-id="v-bdc-just-ask" data-modal="true">
            <video src="media/video/just-ask.mp4" data-src="media/video/just-ask.mp4" preload="none" playsinline></video>
            <button class="video-frame__play" aria-label="Play Just Ask demo">
              <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
            </button>
            <span class="video-frame__label"><span class="rec-dot"></span> Just Ask</span>
          </div>
          <p class="video-caption">Just Ask — asking SAP Business Data Cloud a question in plain language and getting a governed answer back.</p>
        </div>
        <div>
          <div class="video-frame" data-video-id="v-bdc-agh-landing" data-modal="true">
            <video src="media/video/agh-landing-page.mp4" data-src="media/video/agh-landing-page.mp4" preload="none" playsinline></video>
            <button class="video-frame__play" aria-label="Play AGH Landing Page demo">
              <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
            </button>
            <span class="video-frame__label"><span class="rec-dot"></span> AGH Landing Page</span>
          </div>
          <p class="video-caption">AGH Landing Page — the entry point into the experience, where the story begins.</p>
        </div>
      </div>
    </div>

    <div style="margin-bottom:36px;">
      <div class="grid grid-2">
        <div>
          <div class="video-frame" data-video-id="v-bdc-investment-details" data-modal="true">
            <video src="media/video/investment-details.mp4" data-src="media/video/investment-details.mp4" preload="none" playsinline></video>
            <button class="video-frame__play" aria-label="Play Investment Details demo">
              <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
            </button>
            <span class="video-frame__label"><span class="rec-dot"></span> Investment Details</span>
          </div>
          <p class="video-caption">Investment Details — drilling into a single investment with full context, sourced from the unified data foundation.</p>
        </div>
        <div>
          <div class="video-frame" data-video-id="v-bdc-financial-statement" data-modal="true">
            <video src="media/video/financial-statement.mp4" data-src="media/video/financial-statement.mp4" preload="none" playsinline></video>
            <button class="video-frame__play" aria-label="Play Financial Statement demo">
              <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
            </button>
            <span class="video-frame__label"><span class="rec-dot"></span> Financial Statement</span>
          </div>
          <p class="video-caption">Financial Statement — a consolidated financial view built on governed, AI-ready data.</p>
        </div>
      </div>
    </div>

    <div style="margin-bottom:44px; max-width:calc(50% - 12px);">
      <div class="video-frame" data-video-id="v-bdc-compass-simulation" data-modal="true">
        <video src="media/video/compass-simulation.mp4" data-src="media/video/compass-simulation.mp4" preload="none" playsinline></video>
        <button class="video-frame__play" aria-label="Play Compass Simulation demo">
          <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
        </button>
        <span class="video-frame__label"><span class="rec-dot"></span> Compass Simulation</span>
      </div>
      <p class="video-caption">Compass Simulation — modeling a scenario forward and seeing the impact ripple across the portfolio.</p>
    </div>

    <div style="margin-bottom:36px;">
      <div class="grid grid-2">
        <div>
          <div class="video-frame video-frame--pending" data-modal="true">
            <svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
            <div class="video-frame--pending__title">Demo video pending upload</div>
            <div class="video-frame--pending__sub">This slot is reserved for "Investment Details". Drop the file into the project and I'll wire it in.</div>
          </div>
          <p class="video-caption">Investment Details — drilling into a single investment with full context, sourced from the unified data foundation.</p>
        </div>
        <div>
          <div class="video-frame video-frame--pending" data-modal="true">
            <svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
            <div class="video-frame--pending__title">Demo video pending upload</div>
            <div class="video-frame--pending__sub">This slot is reserved for "Financial Statement". Drop the file into the project and I'll wire it in.</div>
          </div>
          <p class="video-caption">Financial Statement — a consolidated financial view built on governed, AI-ready data.</p>
        </div>
      </div>
    </div>

    <div style="margin-bottom:44px; max-width:calc(50% - 12px);">
      <div class="video-frame video-frame--pending" data-modal="true">
        <svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
        <div class="video-frame--pending__title">Demo video pending upload</div>
        <div class="video-frame--pending__sub">This slot is reserved for "Compass Simulation". Drop the file into the project and I'll wire it in.</div>
      </div>
      <p class="video-caption">Compass Simulation — modeling a scenario forward and seeing the impact ripple across the portfolio.</p>
    </div>

    <div class="grid grid-3">
      <div class="pillar-card">
        <div class="icon-circle icon-circle--soft">
          <svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" stroke-width="1.7"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" stroke="currentColor" stroke-width="1.7"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="currentColor" stroke-width="1.7"/></svg>
        </div>
        <div class="pillar-card__title">Unified data foundation</div>
        <div class="pillar-card__text">Bring SAP and non-SAP data together into one governed, trusted layer — without costly point-to-point integration.</div>
      </div>
      <div class="pillar-card">
        <div class="icon-circle icon-circle--soft">
          <svg viewBox="0 0 24 24" fill="none"><path d="M3 12l6-6m0 0l6 6m-6-6v18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="18" cy="6" r="3" stroke="currentColor" stroke-width="1.7"/></svg>
        </div>
        <div class="pillar-card__title">Built for AI from day one</div>
        <div class="pillar-card__text">A data foundation purpose-built to feed SAP Business AI Platform, Joule, and every Autonomous Suite domain.</div>
      </div>
      <div class="pillar-card">
        <div class="icon-circle icon-circle--soft">
          <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7"/></svg>
        </div>
        <div class="pillar-card__title">One Group, one picture</div>
        <div class="pillar-card__text">For Al Muhaidib, this is what finally connects Food &amp; Consumer, Industrial &amp; Infrastructure, Real Estate, and Financial Investment into a single, governed view.</div>
      </div>
    </div>
  `
},

/* ============================================================
   04 — HOW THE AUTONOMOUS ENTERPRISE IS BUILT (architecture)
   ============================================================ */
{
  id: 'architecture',
  navLabel: 'How It\'s Built',
  kind: 'light',
  html: `
    <div class="section-head">
      <div class="eyebrow">Step Two — SAP Business AI Platform</div>
      <h2 class="headline">Welcome to the <em>Autonomous Enterprise</em></h2>
      <p class="subhead">The beginning of better. People set the direction. AI executes.</p>
    </div>

    <div class="grid grid-2" style="align-items:center; gap:36px;">
      <div>
        <p class="body-text" style="margin-bottom:22px;">With Business Data Cloud as the foundation, Al Muhaidib gains the three layers that make the Autonomous Enterprise real — built one on top of the other, not bolted together.</p>
        <div class="grid" style="gap:16px;">
          <div class="pillar-card" style="display:flex; gap:16px; align-items:flex-start; padding:22px;">
            <div class="icon-circle" style="margin-bottom:0;">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l8 5v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
            </div>
            <div>
              <div class="pillar-card__title" style="margin-bottom:6px; font-size:16px;">Joule</div>
              <div class="pillar-card__text">The engagement layer where people set intent, and Joule Assistants and Agents bring together the right data, workflow, and actions across SAP systems and beyond.</div>
            </div>
          </div>
          <div class="pillar-card" style="display:flex; gap:16px; align-items:flex-start; padding:22px;">
            <div class="icon-circle" style="margin-bottom:0;">
              <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M3 9h18M9 21V9" stroke="currentColor" stroke-width="1.6"/></svg>
            </div>
            <div>
              <div class="pillar-card__title" style="margin-bottom:6px; font-size:16px;">SAP Autonomous Suite</div>
              <div class="pillar-card__text">The operational core — applications, data, and AI agents automate functions across Finance, Spend, Supply Chain, HCM, and CX. Industry AI adds purpose-built intelligence for your regulatory and process needs.</div>
            </div>
          </div>
          <div class="pillar-card" style="display:flex; gap:16px; align-items:flex-start; padding:22px;">
            <div class="icon-circle" style="margin-bottom:0;">
              <svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" stroke-width="1.6"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" stroke="currentColor" stroke-width="1.6"/></svg>
            </div>
            <div>
              <div class="pillar-card__title" style="margin-bottom:6px; font-size:16px;">SAP Business AI Platform</div>
              <div class="pillar-card__text">The foundation that combines deep process context, unified business data, and purpose-built models with enterprise governance.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="diagram-panel">
        <img src="media/img/how-autonomous-built.png" alt="Diagram: How the Autonomous Enterprise is built — Joule, SAP Autonomous Suite, and SAP Business AI Platform layered architecture" loading="lazy">
      </div>
    </div>

    <div style="margin-top:48px;">
      <h3 class="story-step__title" style="margin-bottom:16px;">See it in action: the SAP Knowledge Graph</h3>
      <p class="body-text" style="margin-bottom:20px; max-width:760px;">Underneath the platform sits the SAP Knowledge Graph — the semantic layer that lets Joule and every Agent understand how Al Muhaidib's business objects actually relate to one another. Watch how a single sales order connects across the model in seconds.</p>
      <div class="video-frame" data-video-id="v-knowledge-graph">
        <video src="media/video/amg-knowledge-graph-demo.mp4" data-src="media/video/amg-knowledge-graph-demo.mp4" preload="none" playsinline></video>
        <button class="video-frame__play" aria-label="Play Knowledge Graph Explorer demo">
          <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
        </button>
        <span class="video-frame__label"><span class="rec-dot"></span> Knowledge Graph Explorer — live demo</span>
      </div>
      <p class="video-caption">SAP Knowledge Graph Explorer: exploring entity relationships from a single Sales Order across the connected business data model.</p>
    </div>
  `
},

/* ============================================================
   05 — JOULE, BEYOND CHAT
   ============================================================ */
{
  id: 'joule-beyond-chat',
  navLabel: 'Joule, Beyond Chat',
  kind: 'light',
  html: `
    <div class="arch-strip">
      <span class="arch-node is-current">Joule</span><span class="arch-arrow">→</span>
      <span class="arch-node">SAP Autonomous Suite</span><span class="arch-arrow">→</span>
      <span class="arch-node">SAP Business AI Platform</span>
    </div>
    <div class="section-head">
      <div class="eyebrow">One place for work</div>
      <h2 class="headline">Joule, <em>beyond chat</em></h2>
      <p class="subhead">Less navigation. Faster action. Better decisions. AI does the busy work, so Al Muhaidib's people do their best work.</p>
    </div>

    <div class="diagram-panel" style="margin-bottom:36px;">
      <img src="media/img/joule-beyond-chat.png" alt="Joule beyond chat — A new human advantage, plus the Conversations, Spaces, and Develop workspaces with live product screenshots" loading="lazy">
    </div>

    <div style="margin-top:48px;">
      <div class="video-frame" data-video-id="v-joule-beyond-chat">
        <video src="media/video/joule-beyond-chat-demo.mp4" data-src="media/video/joule-beyond-chat-demo.mp4" preload="none" playsinline></video>
        <button class="video-frame__play" aria-label="Play Joule new conversation demo">
          <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
        </button>
        <span class="video-frame__label"><span class="rec-dot"></span> Starting a new Joule conversation</span>
      </div>
      <p class="video-caption">"What would you like to work on?" — the Joule entry point your teams will see from day one.</p>
    </div>

    <div style="margin-top:32px;">
      <div class="video-frame" data-video-id="v-joule-work">
        <video src="media/video/joule-work-demo.mp4" data-src="media/video/joule-work-demo.mp4" preload="none" playsinline></video>
        <button class="video-frame__play" aria-label="Play Joule at work demo">
          <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
        </button>
        <span class="video-frame__label"><span class="rec-dot"></span> Joule at work — live demo</span>
      </div>
      <p class="video-caption">A new human advantage: watch how a single Joule workspace adapts to a real business goal.</p>
    </div>
  `
},

/* ============================================================
   06 — AUTONOMOUS SUITE (people direct, agents execute)
   ============================================================ */
{
  id: 'autonomous-suite',
  navLabel: 'Autonomous Suite',
  kind: 'light',
  html: `
    <div class="arch-strip">
      <span class="arch-node">Joule</span><span class="arch-arrow">→</span>
      <span class="arch-node is-current">SAP Autonomous Suite</span><span class="arch-arrow">→</span>
      <span class="arch-node">SAP Business AI Platform</span>
    </div>
    <div class="section-head">
      <div class="eyebrow">The operational core</div>
      <h2 class="headline">People direct. Assistants orchestrate. <em>Agents execute.</em></h2>
    </div>

    <div class="grid grid-2" style="align-items:center; gap:36px; margin-bottom:20px;">
      <div>
        <p class="body-text" style="margin-bottom:16px;">The Autonomous Suite is where applications, data, and AI agents come together to run every function end to end — for Al Muhaidib, that means Finance, Spend, Supply Chain, HCM and CX, never disconnected from one another.</p>
        <p class="body-text" style="margin-bottom:16px;"><strong>The business moves as a single system.</strong> A supplier disruption in the Industrial &amp; Infrastructure sector can automatically surface in Finance and Procurement — triggering the right workflows before anyone picks up the phone. No integration tax. No stitched-together stack.</p>
        <p class="body-text">The result: a business that is designed to <strong style="color:var(--indigo-7);">anticipate, absorb, and adapt</strong> in real time — inside every function, the cycle is continuous. People set the direction. Applications generate signals. Data provides context. Agents take action. Value compounds.</p>
      </div>
      <div class="diagram-panel">
        <img src="media/img/autonomous-suite-cycle.png" alt="The Autonomous Suite — Joule, Agents, Apps, Data layers, plus the continuous Data, Agents, Apps cycle inside each business function" loading="lazy">
      </div>
    </div>
  `
},

/* ============================================================
   07 — ASSISTANT OVERVIEW (interactive catalog)
   ============================================================ */
{
  id: 'assistant-overview',
  navLabel: 'Assistant Catalog',
  kind: 'light',
  html: `
    <div class="section-head">
      <div class="eyebrow">Across every domain</div>
      <h2 class="headline">Autonomous Domains: <em>Assistant Overview</em></h2>
      <p class="subhead">Five domains. Dozens of Assistants. Hundreds of purpose-built Agents working underneath them — explore each domain below.</p>
    </div>

    <div class="tabs" id="domainTabs"></div>
    <div id="domainPanel"></div>

    <p class="video-caption" style="margin-top:28px;">Counts reflect the current SAP Autonomous Suite catalog and continue to expand as new Agents ship across every domain.</p>
  `
},

/* ============================================================
   08 — AUTONOMOUS FINANCE SPOTLIGHT
   ============================================================ */
{
  id: 'autonomous-finance',
  navLabel: 'Finance Spotlight',
  kind: 'light',
  html: `
    <div class="section-head">
      <div class="eyebrow">A closer look</div>
      <h2 class="headline">SAP Autonomous Finance</h2>
      <p class="subhead">For a multi-sector group like Al Muhaidib, Finance is where fragmentation hurts most — and where the Autonomous Suite pays back fastest.</p>
    </div>

    <div class="diagram-panel" style="margin-bottom:40px;">
      <img src="media/img/autonomous-finance-iso.png" alt="SAP Autonomous Finance isometric diagram — Account & Financial Close, Revenue Management, Enterprise Performance Management, Treasury & Working Capital Management, Governance Risk & Compliance, Tax & Trade" loading="lazy">
    </div>

    <div class="section-head">
      <div class="eyebrow">From process to people</div>
      <h2 class="headline" style="font-size:clamp(26px,3vw,36px);">Six finance domains, <em>one connected flow</em></h2>
    </div>
    <div class="diagram-panel">
      <img src="media/img/finance-domain-tabs.png" alt="Autonomous Finance domain tabs with Financial Planning, Revenue Management, Treasury, Accounting & Close, Governance, Tax & Trade process flow and assistant/agent tree" loading="lazy">
    </div>

    <div style="margin-top:40px; display:none;">
      <div class="section-head">
        <div class="eyebrow">End to end</div>
        <h3 class="headline" style="font-size:clamp(24px,2.8vw,32px);">Record to Report, <em>covered by Assistants</em></h3>
      </div>
      <div class="diagram-panel">
        <img src="media/img/e2e-record-to-report.png" alt="Autonomous Finance E2E Record to Report process map covered by Financial Planning, Sales Operations, Billing, AR, AP, Cash & Treasury, Close, Consolidation, Governance, and Tax & Compliance Assistants" loading="lazy">
      </div>
    </div>

    <div style="margin-top:48px; padding:36px 40px; border-radius:var(--radius-lg); background:linear-gradient(135deg, var(--indigo-9), var(--indigo-7)); box-shadow: var(--shadow-float);">
      <div class="grid grid-2" style="gap:32px;">
        <div style="display:flex; gap:16px; align-items:flex-start;">
          <div class="icon-circle" style="background:rgba(255,255,255,0.18); box-shadow:none; flex-shrink:0;">
            <svg viewBox="0 0 24 24" fill="none"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke="#fff" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="#fff" stroke-width="1.7"/></svg>
          </div>
          <div>
            <div style="font-family:var(--font-display); font-weight:700; font-size:13px; letter-spacing:0.06em; text-transform:uppercase; color:var(--blue-3); margin-bottom:8px;">Vision</div>
            <p style="color:#fff; font-size:17px; line-height:1.55; font-weight:500;">Empower Finance leaders to steer the business with speed, accuracy, and confidence, supported by connected insights and streamlined, intelligent operations.</p>
          </div>
        </div>
        <div style="display:flex; gap:16px; align-items:flex-start;">
          <div class="icon-circle" style="background:rgba(255,255,255,0.18); box-shadow:none; flex-shrink:0;">
            <svg viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="#fff" stroke-width="1.7" stroke-linejoin="round"/></svg>
          </div>
          <div>
            <div style="font-family:var(--font-display); font-weight:700; font-size:13px; letter-spacing:0.06em; text-transform:uppercase; color:var(--blue-3); margin-bottom:8px;">Mission</div>
            <p style="color:#fff; font-size:17px; line-height:1.55; font-weight:500;">Enable Finance teams to bring out their best by reducing manual work and improving outcomes across every process.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="compare-grid" style="margin-top:28px;">
      <div class="stat-block">
        <div class="stat-block__num">80%</div>
        <div class="stat-block__label">touchless processing in a fully automated finance function</div>
      </div>
      <div class="stat-block">
        <div class="stat-block__num">2 hrs</div>
        <div class="stat-block__label">documented close time, down from 20 hours in a continuous close model</div>
      </div>
    </div>
  `
},

/* ============================================================
   09 — WHAT CHANGES: TODAY vs AUTONOMOUS FINANCE
   ============================================================ */
{
  id: 'what-changes',
  navLabel: 'What Changes',
  kind: 'light',
  html: `
    <div class="section-head">
      <div class="eyebrow">Same team. Different century.</div>
      <h2 class="headline">What changes: from today's finance to <em>fully Autonomous Finance</em></h2>
      <p class="subhead">Powered by SAP ERP Cloud — this is the before-and-after Al Muhaidib's Finance organization can expect.</p>
    </div>

    <div class="compare-grid">
      <div class="compare-col compare-col--before">
        <div class="compare-col__head">Today's burdensome finance</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#94A3B8" stroke-width="1.6"/></svg> Manual Processes</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#94A3B8" stroke-width="1.6"/></svg> Reactive Decisions</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#94A3B8" stroke-width="1.6"/></svg> Siloed Functions</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#94A3B8" stroke-width="1.6"/></svg> Data Inconsistencies</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#94A3B8" stroke-width="1.6"/></svg> Monthly Financial Close – Days or Weeks</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#94A3B8" stroke-width="1.6"/></svg> Periodic Audit Preparation</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#94A3B8" stroke-width="1.6"/></svg> Fragmented ESG Reporting</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#94A3B8" stroke-width="1.6"/></svg> CFO as Financial Gatekeeper</div>
      </div>
      <div class="compare-col compare-col--after">
        <div class="compare-col__head">Autonomous finance: powered by SAP ERP Cloud</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#5D36FF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> <strong>Fully Automated</strong> — 80% touchless processing</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#5D36FF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> <strong>Proactive &amp; Predictive</strong> — up to 60% faster forecast cycles</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#5D36FF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> <strong>Seamlessly Orchestrated</strong> — one data model, five functions, zero seams</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#5D36FF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> <strong>Semantic Business Data</strong> — single source of financial truth</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#5D36FF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> <strong>Continuous Close</strong> — 20 hrs. → 2 hrs. documented</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#5D36FF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> <strong>Continuous Controls &amp; Audit Readiness</strong> — always audit-ready, no sprint</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#5D36FF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> <strong>Real-Time Auditable ESG Intelligence</strong> — CSRD &amp; other ESG regulations, built in</div>
        <div class="compare-item"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#5D36FF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> <strong>CFO as Strategic Architect</strong> — from retrospective to generative</div>
      </div>
    </div>
    <p class="video-caption">Sources: Bain Capital Ventures 2025 · Economist Impact / SAP 2025 · ChatFin 2026 · CFO Engine 2026 · McKinsey 2025 · PwC Finance Benchmarking 2024 · SAP Architecture Documentation</p>

    <div style="margin-top:44px;">
      <div class="section-head">
        <div class="eyebrow">See it live</div>
        <h3 class="headline" style="font-size:clamp(24px,2.8vw,32px);">Inside the Autonomous Finance experience</h3>
      </div>
      <div class="grid grid-2">
        <div>
          <div class="video-frame" data-video-id="v-ar-finance" data-modal="true">
            <video src="media/video/ar-finance-demo.mp4" data-src="media/video/ar-finance-demo.mp4" preload="none" playsinline></video>
            <button class="video-frame__play" aria-label="Play Accounts Payable demo">
              <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
            </button>
            <span class="video-frame__label"><span class="rec-dot"></span> Accounts Payable — S/4HANA Cloud</span>
          </div>
          <p class="video-caption">A day in the life of an Accounts Payable team — My Home, To-Dos, and Cash Management working together in one Fiori experience.</p>
        </div>
        <div style="display:none;">
          <div class="video-frame" data-video-id="v-finance-today" data-modal="true">
            <video src="media/video/finance-today-demo.mp4" data-src="media/video/finance-today-demo.mp4" preload="none" playsinline></video>
            <button class="video-frame__play" aria-label="Play Finance overview demo">
              <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
            </button>
            <span class="video-frame__label"><span class="rec-dot"></span> Unleashing transformation with AI</span>
          </div>
          <p class="video-caption">Customer-specific AI as the new catalyst of enterprise innovation — explored from the Finance home page.</p>
        </div>
      </div>
    </div>

    <div style="margin-top:36px;">
      <div class="grid grid-2">
        <div>
          <div class="video-frame" data-video-id="v-cash-app" data-modal="true">
            <video src="media/video/cash-app-demo.mp4" data-src="media/video/cash-app-demo.mp4" preload="none" playsinline></video>
            <button class="video-frame__play" aria-label="Play Cash Application demo">
              <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
            </button>
            <span class="video-frame__label"><span class="rec-dot"></span> Cash Application — Boost efficiency</span>
          </div>
          <p class="video-caption">Payment advice extraction and lockbox processing — automated cash application in action.</p>
        </div>
        <div>
          <div class="video-frame" data-video-id="v-gl" data-modal="true">
            <video src="media/video/general-ledger-demo.mp4" data-src="media/video/general-ledger-demo.mp4" preload="none" playsinline></video>
            <button class="video-frame__play" aria-label="Play General Ledger demo">
              <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
            </button>
            <span class="video-frame__label"><span class="rec-dot"></span> General Ledger — guided workspace</span>
          </div>
          <p class="video-caption">A guided walkthrough of the General Ledger workspace inside SAP's unified home experience.</p>
        </div>
      </div>
    </div>
  `
},

/* ============================================================
   10 — HR PERFORMANCE AGENT SPOTLIGHT (AMG2)
   ============================================================ */
{
  id: 'hr-agent',
  navLabel: 'HR in Action',
  kind: 'light',
  html: `
    <div class="section-head">
      <div class="eyebrow">Autonomous HCM in practice</div>
      <h2 class="headline">Conduct effective <em>performance evaluation sessions</em></h2>
      <p class="subhead">SAP SuccessFactors, Performance and Goals Agent — a concrete look at the business value an Autonomous HCM Agent delivers.</p>
    </div>

    <div style="margin-bottom:36px;">
      <div class="video-frame" data-video-id="v-hr-agent">
        <video src="media/video/successfactors-hr-agent-demo.mp4" data-src="media/video/successfactors-hr-agent-demo.mp4" preload="none" playsinline></video>
        <button class="video-frame__play" aria-label="Play SuccessFactors HR Agent demo">
          <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
        </button>
        <span class="video-frame__label"><span class="rec-dot"></span> SAP SuccessFactors — live demo</span>
      </div>
      <p class="video-caption">A walkthrough of the SAP SuccessFactors home experience that powers this Agent.</p>
    </div>

    <div class="grid grid-2" style="align-items:start; gap:36px;">
      <div class="grid" style="gap:14px;">
        <div class="pillar-card" style="padding:20px;">
          <div class="pillar-card__title" style="font-size:15px; margin-bottom:6px;">More meaningful conversations</div>
          <div class="pillar-card__text">Personalized insights and relevant talking points for every manager, every session.</div>
        </div>
        <div class="pillar-card" style="padding:20px;">
          <div class="pillar-card__title" style="font-size:15px; margin-bottom:6px;">Reduce time spent preparing</div>
          <div class="pillar-card__text">Automating data gathering and generating structured content ahead of performance evaluations.</div>
        </div>
        <div class="pillar-card" style="padding:20px;">
          <div class="pillar-card__title" style="font-size:15px; margin-bottom:6px;">Improve employee development</div>
          <div class="pillar-card__text">Actionable recommendations that drive stronger follow-through after every conversation.</div>
        </div>
      </div>
      <div>
        <div class="stat-grid" style="grid-template-columns:repeat(2,1fr);">
          <div class="stat-block"><div class="stat-block__num">50%</div><div class="stat-block__label">reduction in manager's time preparing for performance discussions</div></div>
          <div class="stat-block"><div class="stat-block__num">80%</div><div class="stat-block__label">reduction in manager's time following up on performance discussions</div></div>
          <div class="stat-block"><div class="stat-block__num">30%</div><div class="stat-block__label">reduction in voluntary turnover attributable to poor performance discussions</div></div>
          <div class="stat-block"><div class="stat-block__num">€60k</div><div class="stat-block__label">annual benefit per the SAP Value Management model*</div></div>
        </div>
        <p class="video-caption" style="margin-top:14px;">* Numbers assumed for a Consumer Products company, €1bn in revenue and 2,000 employees. Annual benefits result from one or more value drivers. Source: SAP Value Management.</p>
      </div>
    </div>
  `
},

/* ============================================================
   11 — JOULE FOR DEVELOPERS
   ============================================================ */
{
  id: 'joule-for-developers',
  navLabel: 'Joule for Developers',
  kind: 'light',
  html: `
    <div class="section-head">
      <div class="eyebrow">Built for SAP's own developers</div>
      <h2 class="headline">Joule, <em>for Developers</em></h2>
      <p class="subhead">The same Joule intelligence Al Muhaidib's business users rely on — purpose-built for SAP development teams, from full-stack application work to ABAP migration.</p>
    </div>

    <div style="margin-bottom:32px;">
      <div class="video-frame" data-video-id="v-jfd-overview">
        <video src="media/video/joule-for-developers-overview.mp4" data-src="media/video/joule-for-developers-overview.mp4" preload="none" playsinline></video>
        <button class="video-frame__play" aria-label="Play Joule for Developers overview demo">
          <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
        </button>
        <span class="video-frame__label"><span class="rec-dot"></span> Joule for Developers — walkthrough</span>
      </div>
      <p class="video-caption">A walkthrough of Joule for Developers in action — full-stack application generation, end to end.</p>
    </div>

    <div style="margin-bottom:40px;">
      <div class="video-frame" data-video-id="v-jfd-appgen">
        <video src="media/video/joule-application-generation-demo.mp4" data-src="media/video/joule-application-generation-demo.mp4" preload="none" playsinline></video>
        <button class="video-frame__play" aria-label="Play Application Generation demo">
          <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
        </button>
        <span class="video-frame__label"><span class="rec-dot"></span> Application Generation — in action</span>
      </div>
      <p class="video-caption">Application Generation — turning a natural-language brief into working application code.</p>
    </div>

    <div class="section-head">
      <div class="eyebrow">What's inside</div>
      <h3 class="headline" style="font-size:clamp(24px,2.8vw,32px);">One assistant, the full development lifecycle</h3>
    </div>
    <div class="diagram-panel">
      <img src="media/img/joule-for-developers.png" alt="Joule for Developers — comprehensive AI capabilities including Code Generation, Unit Test Generation, Artifacts Generation, Artifacts Summarization, Code Explanation, Application Generation, Code Optimization, full-stack and low-code application development, ABAP development, specialized SAP-centric outcomes, integrated AI tools, and process automation" loading="lazy">
    </div>
  `
},

/* ============================================================
   12 — JOULE AGENTS / JOULE STUDIO + LIVE WORKSHOP
   ============================================================ */
{
  id: 'joule-agents',
  navLabel: 'Build Your Own Agent',
  kind: 'light',
  html: `
    <div class="section-head">
      <div class="eyebrow">Build on the web. Take the code with you.</div>
      <h2 class="headline">Working side by side with Joule — <em>so business and IT build together</em></h2>
    </div>

    <div class="grid grid-3" style="margin-bottom:44px;">
      <div class="pillar-card" style="padding:20px;">
        <div class="pillar-card__title" style="font-size:15px;">Lightweight and high-speed</div>
        <div class="pillar-card__text">An SAP coding agent enabled by best-practice and tool expertise, built directly into the browser.</div>
      </div>
      <div class="pillar-card" style="padding:20px;">
        <div class="pillar-card__title" style="font-size:15px;">Agents, automations, and data models</div>
        <div class="pillar-card__text">All in one place — no switching tools to go from idea to working agent.</div>
      </div>
      <div class="pillar-card" style="padding:20px;">
        <div class="pillar-card__title" style="font-size:15px;">Idea to deployment</div>
        <div class="pillar-card__text">Full support from first prototype to a skill running in production.</div>
      </div>
    </div>

    <div style="margin-bottom:44px;">
      <div class="video-frame" data-video-id="v-build">
        <video src="media/video/sap-build-playground-demo.mp4" data-src="media/video/sap-build-playground-demo.mp4" preload="none" playsinline></video>
        <button class="video-frame__play" aria-label="Play SAP Build Playground demo">
          <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
        </button>
        <span class="video-frame__label"><span class="rec-dot"></span> SAP Build Playground — walkthrough</span>
      </div>
      <p class="video-caption">The SAP Build Playground: the simplified, demo-safe environment your IT team will use in the next exercise.</p>
    </div>

    <div style="margin-bottom:20px;">
      <div class="video-frame" data-video-id="v-studio-e2e">
        <video src="media/video/joule-studio-e2e-demo.mp4" data-src="media/video/joule-studio-e2e-demo.mp4" preload="none" playsinline></video>
        <button class="video-frame__play" aria-label="Play E2E Joule Studio demo">
          <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
        </button>
        <span class="video-frame__label"><span class="rec-dot"></span> E2E Joule Studio Demo</span>
      </div>
      <p class="video-caption">Joule Studio: working side by side with Joule from a fresh workspace to a deployed skill.</p>
    </div>

    <!-- ===== LIVE WORKSHOP HAND-OFF ===== -->
    <div style="margin-top:64px; padding-top:48px; border-top:1.5px solid rgba(15,26,74,0.08);">
      <div class="section-head">
        <div class="eyebrow">Now it's your turn</div>
        <h2 class="headline">Build a Joule Agent <em>yourselves</em>, right now</h2>
        <p class="subhead">Your IT team gets hands-on for a few minutes in a live SAP Build Playground — building a real Joule Skill for SAP SuccessFactors, guided step by step.</p>
      </div>

      <div class="placeholder-banner">
        <svg viewBox="0 0 24 24" fill="none"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <p>The QR code is live. The source workshop guide ("Create Joule Agents and Skills for SAP SuccessFactors with SAP Build") still wasn't included — the six steps below are written from the workshop title alone, so it's worth double-checking them against the real guide before presenting. Share the PDF and I'll tighten them up to match exactly.</p>
      </div>

      <div class="workshop-panel">
        <div class="steps-strip" id="workshopSteps">
          <div class="step-row">
            <div class="step-row__num">1</div>
            <div>
              <div class="step-row__title">Open SAP Build</div>
              <div class="step-row__text">Scan the QR code with your phone, or open the Playground link on your laptop.</div>
            </div>
          </div>
          <div class="step-row">
            <div class="step-row__num">2</div>
            <div>
              <div class="step-row__title">Start the Playground</div>
              <div class="step-row__text">Click "Start" on the welcome screen — this is a safe, demo-limited environment. Up to 2 agent projects, deployment disabled.</div>
            </div>
          </div>
          <div class="step-row">
            <div class="step-row__num">3</div>
            <div>
              <div class="step-row__title">Create a new agent-based project</div>
              <div class="step-row__text">Choose "Create" → start from the SAP SuccessFactors Joule Skill template.</div>
            </div>
          </div>
          <div class="step-row">
            <div class="step-row__num">4</div>
            <div>
              <div class="step-row__title">Define the Skill in Joule Studio</div>
              <div class="step-row__text">Describe what the Skill should do in natural language — Joule Studio scaffolds the structure for you.</div>
            </div>
          </div>
          <div class="step-row">
            <div class="step-row__num">5</div>
            <div>
              <div class="step-row__title">Connect the SuccessFactors action</div>
              <div class="step-row__text">Point the Skill at the relevant SuccessFactors API action or data object.</div>
            </div>
          </div>
          <div class="step-row">
            <div class="step-row__num">6</div>
            <div>
              <div class="step-row__title">Preview and test</div>
              <div class="step-row__text">Run the Skill inside the Playground preview and see Joule respond using your new capability.</div>
            </div>
          </div>
        </div>
        <div class="qr-card">
          <div class="qr-card__inner">
            <div class="qr-card__box qr-card__box--image">
              <img src="media/img/workshop-qr-code.png" alt="QR code to join the SAP Build Playground workshop" class="qr-card__img">
            </div>
            <div class="qr-card__title">Scan to join the Playground</div>
            <p class="qr-card__sub">Opens the SAP Build Playground sign-in for today's hands-on exercise.</p>
          </div>
        </div>
      </div>
    </div>

    <p class="video-caption" style="margin-top:18px; max-width:760px;">Heads-up for the presenter: this QR code carries a one-time SAP sign-in link (it includes session security tokens), so it may expire if generated long before the session. Test the scan shortly before presenting and ask your SAP contact for a fresh code if it doesn't resolve.</p>
  `
},

/* ============================================================
   13 — JOULE FOR CONSULTANTS (J4C)
   ============================================================ */
{
  id: 'joule-for-consultants',
  navLabel: 'Joule for Consultants',
  kind: 'dark',
  html: `
    <div class="hero" style="min-height:auto; padding:56px;">
      <svg class="hero__crystal-deco" style="opacity:0.5;" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M 36 6 Q 50 0 64 6 L 88 30 Q 95 37 89 44 L 56 91 Q 50 99 44 91 L 11 44 Q 5 37 12 30 Z M 50 32 L 56 46 L 70 50 L 56 54 L 50 68 L 44 54 L 30 50 L 44 46 Z" fill="#ffffff" fill-rule="evenodd"/>
      </svg>
      <div class="hero__content" style="max-width:600px;">
        <div class="hero__eyebrow"><span class="dot"></span> For the implementation team</div>
        <h1 class="hero__title">Introducing Joule <em>for Consultants</em></h1>
        <p class="hero__sub">The same Joule intelligence Al Muhaidib's business users will rely on — now built directly into how SAP and partner teams implement, configure, and run the project.</p>
      </div>
    </div>

    <div style="margin-top:44px;">
      <div class="video-frame" data-video-id="v-j4c">
        <video src="media/video/joule-for-consultants-demo.mp4" data-src="media/video/joule-for-consultants-demo.mp4" preload="none" playsinline></video>
        <button class="video-frame__play" aria-label="Play Joule for Consultants demo">
          <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
        </button>
        <span class="video-frame__label"><span class="rec-dot"></span> Joule for Consultants — full walkthrough</span>
      </div>
      <p class="video-caption">A complete look at how Joule accelerates the implementation lifecycle itself — for the team delivering Al Muhaidib's RISE with SAP S/4HANA transformation.</p>
    </div>
  `
},

/* ============================================================
   14 — AI BEYOND JOULE
   ============================================================ */
{
  id: 'ai-beyond-joule',
  navLabel: 'AI Beyond Joule',
  kind: 'dark',
  html: `
    <div class="hero" style="min-height:auto; padding:56px; background:linear-gradient(125deg,#050B24 0%,#0E1640 40%,#1B1E6E 100%);">
      <div class="hero__content" style="max-width:600px;">
        <div class="hero__eyebrow"><span class="dot"></span> Document Information Extraction</div>
        <h1 class="hero__title">AI capability, <em>beyond the Joule chat window</em></h1>
        <p class="hero__sub">Not every AI moment looks like a conversation. Document Information Extraction reads any document, in over 40 languages, and turns it directly into structured, usable business data.</p>
        <div class="stat-grid" style="margin-top:32px; grid-template-columns:repeat(2,1fr); max-width:380px;">
          <div class="stat-block" style="background:rgba(255,255,255,0.07); border-color:rgba(255,255,255,0.12);">
            <div class="stat-block__num" style="color:#BFE0FF;">Any</div>
            <div class="stat-block__label" style="color:var(--ink-on-dark-dim);">document type</div>
          </div>
          <div class="stat-block" style="background:rgba(255,255,255,0.07); border-color:rgba(255,255,255,0.12);">
            <div class="stat-block__num" style="color:#BFE0FF;">+40</div>
            <div class="stat-block__label" style="color:var(--ink-on-dark-dim);">languages supported</div>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top:44px;">
      <div class="video-frame" data-video-id="v-doc-extract">
        <video src="media/video/document-extraction-demo.mp4" data-src="media/video/document-extraction-demo.mp4" preload="none" playsinline></video>
        <button class="video-frame__play" aria-label="Play Document Information Extraction demo">
          <span class="video-frame__play-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7-11-7z" fill="currentColor"/></svg></span>
        </button>
        <span class="video-frame__label"><span class="rec-dot"></span> Document Information Extraction — demo</span>
      </div>
      <p class="video-caption">For Al Muhaidib: think customs paperwork across 25 countries, multilingual supplier invoices, and lease or contract documents across the Real Estate portfolio — extracted automatically.</p>
    </div>
  `
},

/* ============================================================
   15 — GET STARTED WITH JOULE TODAY (closing)
   ============================================================ */
{
  id: 'get-started',
  navLabel: 'Get Started',
  kind: 'dark',
  html: `
    <div class="hero">
      <svg class="hero__crystal-deco" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id="gsCrystal1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6FA0FF"/><stop offset="50%" stop-color="#5D36FF"/><stop offset="100%" stop-color="#9333EA"/>
          </linearGradient>
        </defs>
        <path d="M 36 6 Q 50 0 64 6 L 88 30 Q 95 37 89 44 L 56 91 Q 50 99 44 91 L 11 44 Q 5 37 12 30 Z M 50 32 L 56 46 L 70 50 L 56 54 L 50 68 L 44 54 L 30 50 L 44 46 Z" fill="url(#gsCrystal1)" fill-rule="evenodd"/>
      </svg>
      <div class="hero__content">
        <div class="hero__eyebrow"><span class="dot"></span> Get started with Joule today</div>
        <h1 class="hero__title">Joule Base is already included <em>in your SAP subscription.</em></h1>
        <p class="hero__sub">Get access to Agents, Assistants, and advanced enterprise AI capabilities with Joule Premium — and bring this journey back to Al Muhaidib's own environment.</p>
      </div>
    </div>

    <div style="margin-top:48px;">
      <div class="qr-card" style="padding:40px;">
        <div class="qr-card__inner" style="width:100%;">
          <div style="display:flex; justify-content:center; flex-wrap:wrap;">
            <div style="text-align:center; max-width:240px; margin-right:385px; margin-bottom:24px;">
              <div class="qr-card__box qr-card__box--image" style="margin-bottom:16px;">
                <img src="media/img/qr-activate-joule.png" alt="QR code to activate Joule Base for free" class="qr-card__img">
              </div>
              <div class="qr-card__title" style="font-size:15px;">Activate Joule Base for free</div>
              <p class="qr-card__sub">With your existing SAP cloud subscription — no separate purchase needed to begin.</p>
            </div>
            <div style="text-align:center; max-width:240px;">
              <div class="qr-card__box qr-card__box--image" style="margin-bottom:16px;">
                <img src="media/img/qr-learning-course.png" alt="QR code to start the Joule learning free online course" class="qr-card__img">
              </div>
              <div class="qr-card__title" style="font-size:15px;">Start the Joule learning course</div>
              <p class="qr-card__sub">A free, self-paced online course for Al Muhaidib's teams to go deeper after today.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="closing-hero">
      <svg class="closing-hero__crystal" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="closeCrystal1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6FA0FF"/><stop offset="50%" stop-color="#5D36FF"/><stop offset="100%" stop-color="#9333EA"/>
          </linearGradient>
        </defs>
        <path d="M 36 6 Q 50 0 64 6 L 88 30 Q 95 37 89 44 L 56 91 Q 50 99 44 91 L 11 44 Q 5 37 12 30 Z M 50 32 L 56 46 L 70 50 L 56 54 L 50 68 L 44 54 L 30 50 L 44 46 Z" fill="url(#closeCrystal1)" fill-rule="evenodd"/>
      </svg>
      <p class="hero__eyebrow" style="margin:0 auto 18px; display:inline-flex;">The beginning of better.</p>
      <h2 class="headline" style="font-size:clamp(36px,5vw,58px);">Thank you.</h2>
    </div>
  `
},
];

/* ============================================================
   ASSISTANT CATALOG DATA (for the interactive domain tabs
   in the 'assistant-overview' section). Counts and names are
   taken as-is from the SAP_Autonomous-AMG deck, slide 9.
   ============================================================ */
const ASSISTANT_DOMAINS = [
  {
    key: 'finance',
    label: 'Autonomous Finance',
    icon: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M8 13l2.5 2.5L16 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    assistants: [
      ['Accounts Payable Assistant','3 Agents'],['Accounts Receivable Assistant','11 Agents'],
      ['Billing Assistant','4 Agents'],['Cash and Treasury Assistant','3 Agents'],
      ['Enterprise Architecture Assistant','3 Agents'],['Expense Management Assistant','4 Agents'],
      ['Financial Closing Assistant','6 Agents'],['Financial Planning Assistant','5 Agents'],
      ['Governance Assistant','3 Agents'],['Sales Operations Assistant','4 Agents'],
      ['Tax and Compliance Assistant','11 Agents'],['Travel Assistant','2 Agents'],
    ]
  },
  {
    key: 'supply-chain',
    label: 'Autonomous Supply Chain',
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M3 7v10l9 4 9-4V7M12 11v10" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    assistants: [
      ['Product Design Assistant','7 Agents'],['Planning Assistant','5 Agents'],
      ['Manufacturing Assistant','3 Agents'],['Logistics Assistant','11 Agents'],
      ['Asset & Service Assistant','5 Agents'],
    ]
  },
  {
    key: 'spend',
    label: 'Autonomous Spend',
    icon: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v10M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1 3 2.2c0 3-6 1.3-6 4.2 0 1.3 1.3 2.3 3 2.3s3-1 3-2.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    assistants: [
      ['Buying Assistant','3 Agents'],['Category Mgmt Assistant','3 Agents'],
      ['Invoicing Assistant','11 Agents'],['Procurement Contract Assistant','3 Agents'],
      ['Receiving Assistant','4 Agents'],['Requisition Assistant','2 Agents'],
      ['Services Procurement Assistant','3 Agents'],['Sourcing Assistant','4 Agents'],
      ['Supplier Management Assistant','5 Agents'],['Business Network Assistant','12 Agents'],
    ]
  },
  {
    key: 'hcm',
    label: 'Autonomous HCM',
    icon: `<svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="7" r="3.2" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="8.5" r="2.4" stroke="currentColor" stroke-width="1.6"/><path d="M3 20c0-3.6 2.7-6.2 6-6.2s6 2.6 6 6.2M15 20c0-2.6 1.6-4.7 4-5.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    assistants: [
      ['Career and Talent Development','5 Agents'],['Compensation Assistant','3 Agents'],
      ['Core HR Assistant','4 Agents'],['HR Knowledge Assistant','2 Agents'],
      ['HR Service Assistant','5 Agents'],['HR System Assistant','5 Agents'],
      ['Learning Assistant','4 Agents'],['Onboarding Assistant','4 Agents'],
      ['Payroll Assistant','3 Agents'],['People Intelligent Assistant','3 Agents'],
      ['Performance Goals Assistant','7 Agents'],['Recruiting Assistant','5 Agents'],
      ['Skills Assistant','4 Agents'],['Time Assistant','4 Agents'],
    ]
  },
  {
    key: 'cx',
    label: 'Autonomous CX',
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.5 8.5 0 01-12.4 7.55L3 20l1.05-5.4A8.5 8.5 0 1121 11.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    assistants: [
      ['Campaign Assistant','4 Agents'],['Case Management Assistant','6 Agents'],
      ['Content Assistant','3 Agents'],['Deal Closing Assistant','3 Agents'],
      ['Deal Qualification Assistant','4 Agents'],['Merchandising Assistant','7 Agents'],
      ['Order Management Assistant','3 Agents'],['Sales Assistant','4 Agents'],
      ['Self-Service Assistant','3 Agents'],['Shopping Assistant','3 Agents'],
    ]
  },
];

/* ============================================================
   JOULE WIDGET — contextual suggestion prompts per section.
   Purely illustrative front-end interaction (no live model
   call) so the widget feels alive throughout the journey.
   ============================================================ */
const JOULE_SUGGESTIONS = {
  'usecase': ["How does AI help spot the next investment opportunity?", "What does Business Data Cloud unify, exactly?"],
  'intro': ["Tell me more about today's session"],
  'bdc': ["How does Business Data Cloud connect to S/4HANA?", "What does this foundation unlock for AI?"],
  'architecture': ["Explain the three layers in plain terms", "What is the SAP Knowledge Graph?"],
  'joule-beyond-chat': ["What's the difference between a Space and a Conversation?", "Can business users build their own agents?"],
  'autonomous-suite': ["Give me an example of agents acting across functions", "How does this reduce integration costs?"],
  'assistant-overview': ["Which domain has the most agents?", "Show me Finance assistants"],
  'autonomous-finance': ["Walk me through Record to Report", "What's the ROI of Autonomous Finance?"],
  'what-changes': ["How long does a continuous close take?", "What sources back these benchmarks?"],
  'hr-agent': ["How much time does this save managers?", "When is this agent planned to ship?"],
  'joule-for-developers': ["What can Joule generate for our developers?", "Does this work with ABAP?"],
  'joule-for-consultants': ["How does this help our implementation timeline?"],
  'joule-agents': ["How do I join the live workshop?", "What can our IT team build in 10 minutes?"],
  'ai-beyond-joule': ["What languages are supported?", "Can this read scanned PDFs?"],
  'get-started': ["How do we activate Joule Base?", "Where do I find the learning course?"],
};
