/* ============================================================
   APP.JS — Interactive engine
   Handles: section rendering & navigation, journey rail / mobile
   drawer sync, strict video lifecycle (stop-on-leave), domain
   tab switching, and the Joule assistant widget.
   ============================================================ */
(function(){
  'use strict';

  /* Safety polyfill: NodeList.forEach (standard since 2016, but
     guards against unusual embedded WebViews in corporate kiosks) */
  if (window.NodeList && !NodeList.prototype.forEach){
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  let currentIndex = 0;
  const stage = document.getElementById('stage');
  const journeyList = document.getElementById('journeyList');
  const navDrawerList = document.getElementById('navDrawerList');
  const ambientBg = document.getElementById('ambientBg');
  const brandBar = document.getElementById('brandBar');

  /* ---------- Build section DOM nodes once ---------- */
  function buildSections(){
    JOURNEY_SECTIONS.forEach((sec, i) => {
      const el = document.createElement('section');
      el.className = 'section' + (sec.kind === 'dark' ? ' section--dark' : '');
      el.id = 'sec-' + sec.id;
      el.dataset.index = i;
      el.innerHTML = sec.html;
      stage.appendChild(el);
    });
  }

  /* ---------- Build rail + drawer nav items ---------- */
  function buildNav(){
    JOURNEY_SECTIONS.forEach((sec, i) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.className = 'rail-item';
      btn.dataset.index = i;
      btn.innerHTML = `<span class="rail-item__dot"></span><span class="rail-item__label">${sec.navLabel}</span>`;
      btn.addEventListener('click', () => goTo(i));
      li.appendChild(btn);
      journeyList.appendChild(li);

      const dItem = document.createElement('li');
      const dBtn = document.createElement('button');
      dBtn.className = 'nav-drawer__item';
      dBtn.dataset.index = i;
      dBtn.innerHTML = `<span class="rail-item__dot"></span><span>${sec.navLabel}</span>`;
      dBtn.addEventListener('click', () => { goTo(i); closeDrawer(); });
      dItem.appendChild(dBtn);
      navDrawerList.appendChild(dItem);
    });
  }

  /* ---------- Stop ALL playing videos (lifecycle requirement) ---------- */
  function stopAllVideos(exceptEl){
    const videos = document.querySelectorAll('video');
    for (let i = 0; i < videos.length; i++){
      const v = videos[i];
      if (v === exceptEl) continue;
      if (!v.paused) v.pause();
      try { v.currentTime = 0; } catch(e){ /* not yet seekable, safe to ignore */ }

      // Reset frame UI back to "play" state
      const frame = v.closest('.video-frame');
      if (frame){
        const playBtn = frame.querySelector('.video-frame__play');
        const label = frame.querySelector('.video-frame__label');
        if (playBtn) playBtn.classList.remove('is-hidden');
        if (label) label.classList.remove('is-hidden');
      }

      // Release loaded source so large files aren't held in memory off-screen.
      // Only do this for videos the user actually started loading/playing
      // (tracked via data-loaded) — videos still showing their original,
      // never-played default src should be left alone, or every video would
      // lose its src the instant the page loads (during the initial goTo).
      if (v.dataset.loaded === 'true'){
        v.removeAttribute('src');
        v.load();
        v.dataset.loaded = 'false';
      }
    }
  }

  /* ---------- Navigate to a section index ---------- */
  function goTo(index){
    if (index < 0 || index >= JOURNEY_SECTIONS.length) return;
    stopAllVideos(null);
    closeVideoModal();

    document.querySelectorAll('.section').forEach(s => s.classList.remove('is-active'));
    const target = document.getElementById('sec-' + JOURNEY_SECTIONS[index].id);
    target.classList.add('is-active');
    target.scrollTop = 0;
    stage.scrollTop = 0;
    window.scrollTo(0,0);

    currentIndex = index;
    updateChrome();

    // Lazy-init domain tabs the first time we land on that section
    if (JOURNEY_SECTIONS[index].id === 'assistant-overview' && !window.__domainTabsInit){
      initDomainTabs();
      window.__domainTabsInit = true;
    }

    // Only auto-rotate the opener's AI-insight tabs while actually on that page
    if (JOURNEY_SECTIONS[index].id === 'usecase'){
      startOpenerRotation();
    } else {
      stopOpenerRotation();
    }

    // Refresh Joule suggestions contextually
    refreshJouleSuggestions();
  }

  /* ---------- Update rail / drawer / progress / dark mode chrome ---------- */
  function updateChrome(){
    const sec = JOURNEY_SECTIONS[currentIndex];

    document.querySelectorAll('.rail-item').forEach(b => {
      const i = parseInt(b.dataset.index,10);
      b.classList.toggle('is-active', i === currentIndex);
      b.classList.toggle('is-done', i < currentIndex);
    });
    document.querySelectorAll('.nav-drawer__item').forEach(b => {
      const i = parseInt(b.dataset.index,10);
      b.classList.toggle('is-active', i === currentIndex);
    });

    // Scroll active rail item into view
    const activeRail = document.querySelector('.rail-item.is-active');
    if (activeRail && typeof activeRail.scrollIntoView === 'function'){
      activeRail.scrollIntoView({ block:'nearest', behavior:'smooth' });
    }

    // Dark hero chrome toggle
    const isDark = sec.kind === 'dark';
    ambientBg.classList.toggle('is-dark', isDark);
    brandBar.classList.toggle('is-dark', isDark);

    // Prev/Next buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === JOURNEY_SECTIONS.length - 1;
    document.getElementById('prevLabel').textContent = currentIndex === 0 ? 'Start' : JOURNEY_SECTIONS[currentIndex-1].navLabel;
    document.getElementById('nextLabel').textContent = currentIndex === JOURNEY_SECTIONS.length - 1 ? 'End' : JOURNEY_SECTIONS[currentIndex+1].navLabel;

    // Progress bar
    const pct = (currentIndex / (JOURNEY_SECTIONS.length - 1)) * 100;
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('currentIdx').textContent = currentIndex + 1;
    document.getElementById('totalIdx').textContent = JOURNEY_SECTIONS.length;
  }

  /* ---------- Mobile drawer ---------- */
  function openDrawer(){
    document.getElementById('navDrawer').classList.add('is-open');
    document.getElementById('navToggle').setAttribute('aria-expanded','true');
  }
  function closeDrawer(){
    document.getElementById('navDrawer').classList.remove('is-open');
    document.getElementById('navToggle').setAttribute('aria-expanded','false');
  }

  /* ---------- Video frame play/pause wiring (event delegation) ---------- */
  function wireVideoFrames(){
    stage.addEventListener('click', (e) => {
      const playBtn = e.target.closest('.video-frame__play');
      if (!playBtn) return;
      const frame = playBtn.closest('.video-frame');
      const video = frame.querySelector('video');

      // Videos marked data-modal="true" open in the centered pop-up player
      // instead of playing inline (used for the "What Changes" demo reel).
      if (frame.dataset.modal === 'true'){
        openVideoModal(video, frame);
        return;
      }

      // Stop any other playing video first (only one plays at a time)
      stopAllVideos(video);

      if (video.dataset.loaded !== 'true'){
        video.src = video.dataset.src;
        video.dataset.loaded = 'true';
        video.load();
      }
      video.controls = true;
      try {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function'){
          playPromise.catch(()=>{ /* autoplay/sound restrictions — user can use native controls */ });
        }
      } catch (err){
        /* Some browsers throw synchronously rather than rejecting a promise —
           the user can still use native video controls to start playback. */
      }
      playBtn.classList.add('is-hidden');
      const label = frame.querySelector('.video-frame__label');
      if (label) label.classList.add('is-hidden');
    });

    // When a video ends, restore the play overlay
    stage.addEventListener('ended', (e) => {
      if (e.target.tagName !== 'VIDEO') return;
      const frame = e.target.closest('.video-frame');
      if (!frame) return;
      const playBtn = frame.querySelector('.video-frame__play');
      if (playBtn) playBtn.classList.remove('is-hidden');
      const label = frame.querySelector('.video-frame__label');
      if (label) label.classList.remove('is-hidden');
    }, true);
  }

  /* ---------- Video modal (centered pop-up player) ---------- */
  function openVideoModal(sourceVideo, frame){
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoModalPlayer');
    const labelEl = document.getElementById('videoModalLabel');
    if (!modal || !player) return;

    // Stop any inline videos playing elsewhere first
    stopAllVideos(null);

    const src = sourceVideo.dataset.src || sourceVideo.getAttribute('src');
    player.src = src;
    player.load();

    const sourceLabel = frame.querySelector('.video-frame__label');
    labelEl.textContent = sourceLabel ? sourceLabel.textContent.trim() : '';

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    try {
      const playPromise = player.play();
      if (playPromise && typeof playPromise.catch === 'function'){
        playPromise.catch(()=>{ /* autoplay/sound restrictions — native controls remain available */ });
      }
    } catch (err){ /* see note above */ }
  }

  function closeVideoModal(){
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoModalPlayer');
    if (!modal || !player) return;
    if (!player.paused) player.pause();
    player.removeAttribute('src');
    player.load();
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initVideoModal(){
    const modal = document.getElementById('videoModal');
    const backdrop = document.getElementById('videoModalBackdrop');
    const closeBtn = document.getElementById('videoModalClose');
    if (!modal) return;
    if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);
    if (backdrop) backdrop.addEventListener('click', closeVideoModal);
    document.addEventListener('keydown', (e) => {
      const isEscape = e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
      if (isEscape && modal.classList.contains('is-open')) closeVideoModal();
    });
  }

  /* ---------- Opener AI-insight tabs (interactive, auto-rotating) ---------- */
  let openerRotateTimer = null;
  let openerActiveIndex = 0;

  function renderOpenerInsight(index, fromAutoRotate){
    if (typeof OPENER_INSIGHTS === 'undefined' || !OPENER_INSIGHTS[index]) return;
    const data = OPENER_INSIGHTS[index];
    const textEl = document.getElementById('openerInsightText');
    const signalEl = document.getElementById('openerInsightSignal');
    const tabsWrap = document.getElementById('openerInsightTabs');
    const dotsWrap = document.getElementById('openerInsightDots');
    if (!textEl || !signalEl) return;

    openerActiveIndex = index;

    // Fade the text/signal out, swap content, fade back in — small but
    // genuinely felt transition rather than an instant content jump.
    textEl.style.opacity = '0';
    signalEl.style.opacity = '0';
    setTimeout(() => {
      textEl.innerHTML = data.text;
      const signalSpan = signalEl.querySelector('span');
      if (signalSpan) signalSpan.textContent = data.signal;
      textEl.style.opacity = '1';
      signalEl.style.opacity = '1';
    }, 180);

    if (tabsWrap){
      tabsWrap.querySelectorAll('.opener__insight-tab').forEach(btn => {
        btn.classList.toggle('is-active', parseInt(btn.dataset.insight, 10) === index);
      });
    }
    if (dotsWrap){
      dotsWrap.querySelectorAll('.opener__insight-dot').forEach(dot => {
        dot.classList.toggle('is-active', parseInt(dot.dataset.insight, 10) === index);
      });
    }
  }

  function startOpenerRotation(){
    stopOpenerRotation();
    openerRotateTimer = setInterval(() => {
      const next = (openerActiveIndex + 1) % OPENER_INSIGHTS.length;
      renderOpenerInsight(next, true);
    }, 6000);
  }

  function stopOpenerRotation(){
    if (openerRotateTimer){ clearInterval(openerRotateTimer); openerRotateTimer = null; }
  }

  function initOpenerInsights(){
    const tabsWrap = document.getElementById('openerInsightTabs');
    const dotsWrap = document.getElementById('openerInsightDots');
    if (!tabsWrap || typeof OPENER_INSIGHTS === 'undefined') return;

    // Build the progress dots dynamically from however many insights exist
    if (dotsWrap && !dotsWrap.dataset.built){
      dotsWrap.innerHTML = OPENER_INSIGHTS.map((d, i) =>
        `<button class="opener__insight-dot${i===0?' is-active':''}" data-insight="${i}" role="tab" aria-label="Show ${d.label} insight"></button>`
      ).join('');
      dotsWrap.dataset.built = 'true';
    }

    function selectInsight(index){
      renderOpenerInsight(index, false);
      // A manual choice pauses auto-rotation briefly so the person's pick
      // actually stays on screen, then resumes the ambient rotation.
      stopOpenerRotation();
      setTimeout(startOpenerRotation, 9000);
    }

    tabsWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.opener__insight-tab');
      if (!btn) return;
      selectInsight(parseInt(btn.dataset.insight, 10));
    });
    if (dotsWrap){
      dotsWrap.addEventListener('click', (e) => {
        const dot = e.target.closest('.opener__insight-dot');
        if (!dot) return;
        selectInsight(parseInt(dot.dataset.insight, 10));
      });
    }

    startOpenerRotation();
  }

  /* ---------- Domain tabs (Assistant Overview interactive catalog) ---------- */
  function initDomainTabs(){
    const tabsEl = document.getElementById('domainTabs');
    const panelEl = document.getElementById('domainPanel');
    if (!tabsEl || !panelEl) return;

    ASSISTANT_DOMAINS.forEach((d, i) => {
      const btn = document.createElement('button');
      btn.className = 'tab-btn' + (i === 0 ? ' is-active' : '');
      btn.dataset.key = d.key;
      btn.innerHTML = `${d.icon}<span>${d.label}</span>`;
      btn.addEventListener('click', () => {
        tabsEl.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        renderDomainPanel(d);
      });
      tabsEl.appendChild(btn);
    });
    renderDomainPanel(ASSISTANT_DOMAINS[0]);

    function renderDomainPanel(domain){
      panelEl.innerHTML = `
        <div class="grid grid-4" style="gap:14px;">
          ${domain.assistants.map(([name,count]) => `
            <div class="assistant-card">
              <div class="assistant-card__name">${name}</div>
              <div class="assistant-card__count">${count}</div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  /* ---------- Joule floating widget ---------- */
  function initJouleWidget(){
    const fab = document.getElementById('jouleFab');
    const panel = document.getElementById('joulePanel');
    const closeBtn = document.getElementById('jouleClose');
    const input = document.getElementById('jouleInput');
    const sendBtn = document.getElementById('jouleSend');
    const body = document.getElementById('jouleBody');

    fab.addEventListener('click', () => {
      panel.classList.toggle('is-open');
      if (panel.classList.contains('is-open')) input.focus();
    });
    closeBtn.addEventListener('click', () => panel.classList.remove('is-open'));

    function send(){
      const val = input.value.trim();
      if (!val) return;
      const userMsg = document.createElement('div');
      userMsg.className = 'joule-msg joule-msg--user';
      userMsg.innerHTML = `<p>${escapeHtml(val)}</p>`;
      body.appendChild(userMsg);
      input.value = '';
      body.scrollTop = body.scrollHeight;

      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'joule-msg joule-msg--bot';
        botMsg.innerHTML = `<p>Great question — in the live SAP environment, I'd pull that directly from Al Muhaidib's connected systems. For today's walkthrough, your SAP team can take this one live.</p>`;
        body.appendChild(botMsg);
        body.scrollTop = body.scrollHeight;
      }, 550);
    }
    sendBtn.addEventListener('click', send);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
  }

  function refreshJouleSuggestions(){
    const sec = JOURNEY_SECTIONS[currentIndex];
    const wrap = document.getElementById('jouleSuggestions');
    if (!wrap) return;
    const suggestions = (typeof JOULE_SUGGESTIONS !== 'undefined' && JOULE_SUGGESTIONS[sec.id]) || [];
    wrap.innerHTML = suggestions.map(s => `<button class="joule-suggestion-btn">${escapeHtml(s)}</button>`).join('');
    wrap.querySelectorAll('.joule-suggestion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('jouleInput').value = btn.textContent;
        document.getElementById('jouleSend').click();
      });
    });
  }

  function escapeHtml(str){
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---------- Wire bottom nav + hero CTA + keyboard ---------- */
  function wireNav(){
    document.getElementById('prevBtn').addEventListener('click', () => goTo(currentIndex - 1));
    document.getElementById('nextBtn').addEventListener('click', () => goTo(currentIndex + 1));
    document.getElementById('navToggle').addEventListener('click', openDrawer);
    document.getElementById('navDrawerClose').addEventListener('click', closeDrawer);
    document.getElementById('navDrawer').addEventListener('click', (e) => {
      if (e.target.id === 'navDrawer') closeDrawer();
    });

    stage.addEventListener('click', (e) => {
      const navBtn = e.target.closest('[data-nav]');
      if (!navBtn) return;
      const action = navBtn.dataset.nav;
      if (action === 'next') goTo(currentIndex + 1);
      if (action === 'prev') goTo(currentIndex - 1);
    });

    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') goTo(currentIndex + 1);
      if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
      if (e.key === 'Escape' || e.keyCode === 27) closeDrawer();
    });
  }

  /* ---------- Stop video also when tab loses visibility (battery/courtesy) ---------- */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden){
      stopAllVideos(null);
      closeVideoModal();
      stopOpenerRotation();
    } else if (JOURNEY_SECTIONS[currentIndex] && JOURNEY_SECTIONS[currentIndex].id === 'usecase'){
      startOpenerRotation();
    }
  });

  /* ---------- Init ---------- */
  function init(){
    buildSections();
    buildNav();
    wireNav();
    wireVideoFrames();
    initVideoModal();
    initOpenerInsights();
    initJouleWidget();

    // Optional deep-link: #section=<id> or #idx=<n> (also used for QA)
    let startIndex = 0;
    const hash = window.location.hash.replace('#','');
    if (hash){
      const byId = JOURNEY_SECTIONS.findIndex(s => s.id === hash.replace('section=',''));
      const byIdxMatch = hash.match(/idx=(\d+)/);
      if (hash.startsWith('section=') && byId >= 0) startIndex = byId;
      else if (byIdxMatch) startIndex = Math.min(parseInt(byIdxMatch[1],10), JOURNEY_SECTIONS.length-1);
    }
    goTo(startIndex);
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
