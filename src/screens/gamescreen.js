// ============================================
// AERO STRIKE — Battle Royale Game Screen
// Full BR mode in-match preview
// ============================================

export function renderGameScreen() {
  return `
    <div class="game-canvas-container" id="br-container" style="background: linear-gradient(160deg, #040812 0%, #0c1e32 25%, #162840 50%, #0a1420 75%, #050a14 100%);">

      <!-- Ambient game-scene background elements -->
      <div style="position:absolute;inset:0;pointer-events:none;">
        <div style="position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(255,45,85,0.04) 0%,transparent 70%);top:10%;right:10%;"></div>
        <div style="position:absolute;width:250px;height:250px;border-radius:50%;background:radial-gradient(circle,rgba(0,229,255,0.05) 0%,transparent 70%);bottom:20%;left:15%;"></div>
        <div style="position:absolute;width:500px;height:2px;background:linear-gradient(90deg,transparent,rgba(0,229,255,0.1),transparent);top:40%;left:10%;transform:rotate(-5deg);"></div>
        <div style="position:absolute;width:350px;height:2px;background:linear-gradient(90deg,transparent,rgba(255,107,0,0.08),transparent);top:60%;left:30%;transform:rotate(3deg);"></div>
        <!-- Ground grid perspective illusion -->
        <div style="position:absolute;bottom:0;left:0;right:0;height:40%;background:linear-gradient(0deg,rgba(0,229,255,0.02) 0%,transparent 100%);"></div>
      </div>

      <!-- ═══ TOP: Danger Alert Banner ═══ -->
      <div class="alert-banner alert-banner--danger" id="br-alert" style="position:absolute;top:0;left:0;right:0;z-index:15;">
        ⚠️ GAS IS RISING! ⚠️
      </div>

      <!-- ═══ TOP LEFT: Alive Counter ═══ -->
      <div style="position:absolute;top:52px;left:12px;z-index:10;">
        <div class="glass-panel flex items-center gap-sm" style="padding:8px 14px;">
          <span style="font-size:1.1rem;">💀</span>
          <div class="flex-col">
            <span class="font-mono" style="font-size:0.55rem;color:var(--text-dim);letter-spacing:2px;">ALIVE</span>
            <span class="font-mono text-glow-orange" style="font-size:1.3rem;color:var(--orange);" id="br-alive-count">12</span>
          </div>
        </div>
      </div>

      <!-- ═══ TOP LEFT below alive: Zone Timer ═══ -->
      <div style="position:absolute;top:110px;left:12px;z-index:10;">
        <div class="glass-panel flex items-center gap-sm" style="padding:6px 12px;">
          <span style="font-size:0.9rem;">🔴</span>
          <div class="flex-col">
            <span class="font-heading" style="font-size:0.6rem;color:var(--text-dim);letter-spacing:1px;text-transform:uppercase;">Zone Closing In</span>
            <span class="font-mono" style="font-size:1rem;color:var(--red);" id="br-zone-timer">1:30</span>
          </div>
        </div>
      </div>

      <!-- ═══ TOP RIGHT: Kill Counter ═══ -->
      <div style="position:absolute;top:52px;right:12px;z-index:10;">
        <div class="glass-panel flex items-center gap-sm" style="padding:8px 14px;">
          <span style="font-size:1.1rem;">🎯</span>
          <div class="flex-col" style="text-align:right;">
            <span class="font-mono" style="font-size:0.55rem;color:var(--text-dim);letter-spacing:2px;">KILLS</span>
            <div class="flex items-center gap-xs">
              <span class="font-heading" style="font-size:0.75rem;color:var(--cyan);">PlayerOne</span>
              <span class="font-mono text-glow-gold" style="font-size:1.3rem;color:var(--gold);" id="br-kill-count">12</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ RIGHT PANEL: Leaderboard ═══ -->
      <div style="position:absolute;top:110px;right:12px;z-index:10;width:200px;">
        <div class="glass-panel flex-col" style="padding:8px;" id="br-leaderboard">
          <div class="font-heading" style="font-size:0.7rem;color:var(--text-dim);letter-spacing:2px;text-transform:uppercase;padding:4px 8px;margin-bottom:4px;">
            🏆 TOP 5
          </div>

          <div class="leaderboard-entry leaderboard-entry--self" id="lb-entry-1">
            <span class="leaderboard-entry__rank">#1</span>
            <span class="leaderboard-entry__name text-cyan">PlayerOne</span>
            <span class="leaderboard-entry__score" id="lb-score-1">12</span>
          </div>
          <div class="leaderboard-entry" id="lb-entry-2">
            <span class="leaderboard-entry__rank">#2</span>
            <span class="leaderboard-entry__name">SkyLord</span>
            <span class="leaderboard-entry__score" id="lb-score-2">8</span>
          </div>
          <div class="leaderboard-entry" id="lb-entry-3">
            <span class="leaderboard-entry__rank">#3</span>
            <span class="leaderboard-entry__name">ShadowX</span>
            <span class="leaderboard-entry__score" id="lb-score-3">6</span>
          </div>
          <div class="leaderboard-entry" id="lb-entry-4">
            <span class="leaderboard-entry__rank">#4</span>
            <span class="leaderboard-entry__name">Alpha</span>
            <span class="leaderboard-entry__score" id="lb-score-4">5</span>
          </div>
          <div class="leaderboard-entry" id="lb-entry-5">
            <span class="leaderboard-entry__rank">#5</span>
            <span class="leaderboard-entry__name">NightHawk</span>
            <span class="leaderboard-entry__score" id="lb-score-5">4</span>
          </div>
        </div>
      </div>

      <!-- ═══ CENTER: Crosshair ═══ -->
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:5;pointer-events:none;">
        <div style="position:absolute;width:20px;height:2px;background:rgba(255,255,255,0.7);top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 0 3px rgba(255,255,255,0.3);"></div>
        <div style="position:absolute;width:2px;height:20px;background:rgba(255,255,255,0.7);top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 0 3px rgba(255,255,255,0.3);"></div>
        <div style="position:absolute;width:3px;height:3px;border-radius:50%;background:var(--red);top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 0 5px var(--red);"></div>
      </div>

      <!-- ═══ BOTTOM: Inventory Bar ═══ -->
      <div style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);z-index:10;" class="flex items-center gap-sm" id="br-inventory">
        <!-- Slot 1: Active weapon -->
        <div class="weapon-slot" style="border-color:var(--cyan);box-shadow:0 0 10px var(--cyan-glow);padding:8px 12px;min-width:80px;">
          <div class="flex-col flex-center gap-xs">
            <span style="font-size:1.3rem;">🔫</span>
            <span class="weapon-slot__label" style="font-size:0.5rem;">ARC RIFLE</span>
            <span class="font-mono" style="font-size:0.6rem;color:var(--cyan);">6/30</span>
          </div>
        </div>
        <!-- Slot 2 -->
        <div class="weapon-slot" style="padding:8px 12px;min-width:80px;opacity:0.7;">
          <div class="flex-col flex-center gap-xs">
            <span style="font-size:1.3rem;">💣</span>
            <span class="weapon-slot__label" style="font-size:0.5rem;">FRAG x3</span>
            <span class="font-mono" style="font-size:0.6rem;color:var(--text-dim);">3</span>
          </div>
        </div>
        <!-- Slot 3 -->
        <div class="weapon-slot" style="padding:8px 12px;min-width:80px;opacity:0.7;">
          <div class="flex-col flex-center gap-xs">
            <span style="font-size:1.3rem;">🚀</span>
            <span class="weapon-slot__label" style="font-size:0.5rem;">LAUNCHER</span>
            <span class="font-mono" style="font-size:0.6rem;color:var(--text-dim);">2/8</span>
          </div>
        </div>
        <!-- Slot 4 -->
        <div class="weapon-slot" style="padding:8px 12px;min-width:80px;opacity:0.7;">
          <div class="flex-col flex-center gap-xs">
            <span style="font-size:1.3rem;">💊</span>
            <span class="weapon-slot__label" style="font-size:0.5rem;">MED KIT</span>
            <span class="font-mono" style="font-size:0.6rem;color:var(--green);">x2</span>
          </div>
        </div>
        <!-- Slot 5: Empty -->
        <div class="weapon-slot" style="padding:8px 12px;min-width:80px;opacity:0.35;">
          <div class="flex-col flex-center gap-xs">
            <span style="font-size:1.3rem;color:var(--text-dim);">➕</span>
            <span class="weapon-slot__label" style="font-size:0.5rem;">EMPTY</span>
            <span class="font-mono" style="font-size:0.6rem;color:var(--text-dim);">—</span>
          </div>
        </div>
      </div>

    </div>
  `;
}

export function initGameScreen() {
  // ---- Flashing GAS IS RISING Alert ----
  const alertEl = document.getElementById('br-alert');
  let alertVisible = true;
  const alertInterval = setInterval(() => {
    if (!alertEl) return;
    alertVisible = !alertVisible;
    alertEl.style.opacity = alertVisible ? '1' : '0.4';
    alertEl.style.transition = 'opacity 0.5s ease';
  }, 1000);

  // ---- Alive Counter Decreasing ----
  const aliveEl = document.getElementById('br-alive-count');
  let alive = 12;

  const aliveInterval = setInterval(() => {
    if (!aliveEl || alive <= 1) return;
    // Randomly decide to eliminate someone
    if (Math.random() < 0.4) {
      alive--;
      aliveEl.textContent = alive;
      // Flash effect
      aliveEl.style.color = 'var(--red)';
      aliveEl.style.transition = 'color 0.15s ease';
      setTimeout(() => {
        if (aliveEl) {
          aliveEl.style.color = 'var(--orange)';
        }
      }, 400);
    }
  }, 3000);

  // ---- Zone Timer Countdown ----
  const zoneEl = document.getElementById('br-zone-timer');
  let zoneSeconds = 90; // 1:30

  const zoneInterval = setInterval(() => {
    if (!zoneEl) return;
    if (zoneSeconds <= 0) {
      zoneSeconds = 120; // reset to 2:00
    }
    zoneSeconds--;
    const m = Math.floor(zoneSeconds / 60);
    const s = String(zoneSeconds % 60).padStart(2, '0');
    zoneEl.textContent = `${m}:${s}`;

    // Urgent coloring when low
    if (zoneSeconds <= 15) {
      zoneEl.style.color = 'var(--red)';
      zoneEl.style.textShadow = '0 0 8px rgba(255,45,85,0.6)';
    } else if (zoneSeconds <= 30) {
      zoneEl.style.color = 'var(--orange)';
      zoneEl.style.textShadow = '0 0 6px rgba(255,107,0,0.4)';
    } else {
      zoneEl.style.color = 'var(--red)';
      zoneEl.style.textShadow = 'none';
    }
  }, 1000);

  // ---- Leaderboard Score Updates ----
  const scores = [
    { id: 'lb-score-1', score: 12 },
    { id: 'lb-score-2', score: 8 },
    { id: 'lb-score-3', score: 6 },
    { id: 'lb-score-4', score: 5 },
    { id: 'lb-score-5', score: 4 },
  ];

  const lbInterval = setInterval(() => {
    // Pick a random player (including self) to score a kill
    const idx = Math.floor(Math.random() * scores.length);
    scores[idx].score++;

    const scoreEl = document.getElementById(scores[idx].id);
    if (scoreEl) {
      scoreEl.textContent = scores[idx].score;
      // Flash the updated score
      scoreEl.style.color = 'var(--gold)';
      scoreEl.style.transition = 'color 0.15s ease';
      setTimeout(() => {
        if (scoreEl) scoreEl.style.color = 'var(--cyan)';
      }, 500);
    }

    // Also update player's kill count if they scored
    if (idx === 0) {
      const killEl = document.getElementById('br-kill-count');
      if (killEl) killEl.textContent = scores[0].score;
    }

    // Re-sort the leaderboard visually
    const sorted = [...scores].sort((a, b) => b.score - a.score);
    sorted.forEach((entry, i) => {
      const el = document.getElementById(entry.id);
      if (el) el.textContent = entry.score;
    });
  }, 4000);

  // ---- Inventory slot selection ----
  const slots = document.querySelectorAll('#br-inventory .weapon-slot');
  slots.forEach((slot, i) => {
    slot.addEventListener('click', () => {
      // Deselect all
      slots.forEach(s => {
        s.style.borderColor = 'var(--border-default)';
        s.style.boxShadow = 'none';
        s.style.opacity = '0.7';
      });
      // Select clicked
      slot.style.borderColor = 'var(--cyan)';
      slot.style.boxShadow = '0 0 10px var(--cyan-glow)';
      slot.style.opacity = '1';
    });
  });

  // Store cleanup references
  const container = document.getElementById('br-container');
  if (container) {
    container._brCleanup = () => {
      clearInterval(alertInterval);
      clearInterval(aliveInterval);
      clearInterval(zoneInterval);
      clearInterval(lbInterval);
    };
  }
}
