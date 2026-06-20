// ============================================
// AERO STRIKE — In-Match HUD Screen
// Preview/demo of the heads-up display overlay
// ============================================

export function renderHUD() {
  return `
    <div class="game-canvas-container" id="hud-container" style="background: linear-gradient(135deg, #030810 0%, #0a1628 30%, #0d1a2d 60%, #060e1c 100%);">

      <!-- Ambient game-scene elements -->
      <div style="position:absolute;inset:0;pointer-events:none;">
        <div style="position:absolute;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(0,229,255,0.06) 0%,transparent 70%);top:20%;left:30%;"></div>
        <div style="position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,0,0.04) 0%,transparent 70%);bottom:10%;right:20%;"></div>
        <div style="position:absolute;width:150px;height:150px;border-radius:50%;background:radial-gradient(circle,rgba(74,158,255,0.05) 0%,transparent 70%);top:50%;left:60%;"></div>
      </div>

      <!-- ═══ TOP CENTER: Team Scores & Timer ═══ -->
      <div style="position:absolute;top:12px;left:50%;transform:translateX(-50%);z-index:10;" class="flex items-center gap-md">
        <div class="glass-panel flex items-center gap-lg" style="padding:8px 24px;">
          <div class="flex items-center gap-sm">
            <span class="font-heading" style="font-size:0.75rem;color:var(--blue);letter-spacing:1px;text-transform:uppercase;">BLUE</span>
            <span class="font-mono text-glow-cyan" style="font-size:1.5rem;color:var(--cyan);" id="hud-blue-score">12</span>
          </div>
          <div class="flex-col flex-center">
            <span class="font-mono" style="font-size:0.6rem;color:var(--text-dim);letter-spacing:2px;">MATCH</span>
            <span class="font-mono text-glow-cyan" style="font-size:1.1rem;color:var(--text-primary);" id="hud-timer">02:45</span>
          </div>
          <div class="flex items-center gap-sm">
            <span class="font-mono text-glow-orange" style="font-size:1.5rem;color:var(--red);" id="hud-red-score">8</span>
            <span class="font-heading" style="font-size:0.75rem;color:var(--red);letter-spacing:1px;text-transform:uppercase;">RED</span>
          </div>
        </div>
      </div>

      <!-- ═══ TOP LEFT: Minimap ═══ -->
      <div style="position:absolute;top:12px;left:12px;z-index:10;">
        <div class="minimap" id="hud-minimap">
          <!-- Grid lines inside minimap -->
          <div style="position:absolute;inset:0;background:
            linear-gradient(0deg, rgba(0,229,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.05) 1px, transparent 1px);
            background-size:30px 30px;"></div>
          <!-- Player dots -->
          <div class="minimap__dot minimap__dot--self" id="dot-self" style="top:50%;left:50%;"></div>
          <div class="minimap__dot minimap__dot--ally" id="dot-ally1" style="top:40%;left:35%;"></div>
          <div class="minimap__dot minimap__dot--ally" id="dot-ally2" style="top:60%;left:45%;"></div>
          <div class="minimap__dot minimap__dot--ally" id="dot-ally3" style="top:30%;left:55%;"></div>
          <div class="minimap__dot minimap__dot--enemy" id="dot-enemy1" style="top:25%;left:70%;"></div>
          <div class="minimap__dot minimap__dot--enemy" id="dot-enemy2" style="top:65%;left:75%;"></div>
          <div class="minimap__dot minimap__dot--enemy" id="dot-enemy3" style="top:45%;left:80%;"></div>
        </div>
      </div>

      <!-- ═══ TOP RIGHT: Kill Feed ═══ -->
      <div class="kill-feed" id="hud-kill-feed" style="top:12px;right:12px;">
        <div class="kill-feed__entry" style="animation-delay:0s;">
          <span class="kill-feed__killer">AceHunter</span>
          <span class="kill-feed__weapon">🔫</span>
          <span class="kill-feed__victim">NightHawk</span>
        </div>
        <div class="kill-feed__entry" style="animation-delay:0.1s;">
          <span class="kill-feed__killer">PlayerOne</span>
          <span class="kill-feed__weapon">💥</span>
          <span class="kill-feed__victim">ShadowX</span>
        </div>
        <div class="kill-feed__entry" style="animation-delay:0.2s;">
          <span class="kill-feed__killer">SkyLord</span>
          <span class="kill-feed__weapon">🔫</span>
          <span class="kill-feed__victim">DarkBlade</span>
        </div>
      </div>

      <!-- ═══ CENTER: Crosshair ═══ -->
      <div id="hud-crosshair" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:5;pointer-events:none;">
        <!-- Horizontal line -->
        <div style="position:absolute;width:24px;height:2px;background:rgba(255,255,255,0.8);top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 0 4px rgba(255,255,255,0.4);"></div>
        <!-- Vertical line -->
        <div style="position:absolute;width:2px;height:24px;background:rgba(255,255,255,0.8);top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 0 4px rgba(255,255,255,0.4);"></div>
        <!-- Center dot -->
        <div style="position:absolute;width:4px;height:4px;border-radius:50%;background:var(--red);top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 0 6px var(--red);"></div>
        <!-- Gap cutouts (transparent sections in cross) -->
        <div style="position:absolute;width:8px;height:2px;background:#030810;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.9;"></div>
        <div style="position:absolute;width:2px;height:8px;background:#030810;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.9;"></div>
      </div>

      <!-- ═══ BOTTOM LEFT: Health & Fuel Bars ═══ -->
      <div style="position:absolute;bottom:12px;left:12px;z-index:10;width:220px;" class="flex-col gap-sm">
        <!-- Health Bar -->
        <div class="hud-bar">
          <span class="hud-bar__label" style="min-width:28px;">❤️</span>
          <div class="hud-bar__track" style="height:10px;border-radius:5px;">
            <div class="hud-bar__fill hud-bar__fill--health" id="hud-health-fill" style="width:75%;border-radius:5px;"></div>
          </div>
          <span class="font-mono" style="font-size:0.65rem;color:var(--green);min-width:32px;text-align:right;" id="hud-health-text">75</span>
        </div>
        <!-- Fuel Bar -->
        <div class="hud-bar">
          <span class="hud-bar__label" style="min-width:28px;">⛽</span>
          <div class="hud-bar__track" style="height:10px;border-radius:5px;">
            <div class="hud-bar__fill hud-bar__fill--fuel" id="hud-fuel-fill" style="width:60%;border-radius:5px;"></div>
          </div>
          <span class="font-mono" style="font-size:0.65rem;color:var(--cyan);min-width:32px;text-align:right;" id="hud-fuel-text">60</span>
        </div>
        <!-- Player Name Tag -->
        <div class="flex items-center gap-sm" style="margin-top:2px;">
          <span class="badge badge--cyan">LVL 42</span>
          <span class="font-heading" style="font-size:0.8rem;color:var(--text-primary);letter-spacing:1px;">PLAYERONE</span>
        </div>
      </div>

      <!-- ═══ BOTTOM CENTER: Ability Icons ═══ -->
      <div style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);z-index:10;" class="flex items-center gap-md">
        <div class="flex items-center gap-sm" id="hud-abilities">
          <!-- Ability 1: Ready -->
          <div class="ability-icon" data-cooldown="0" data-max="8" style="width:48px;height:48px;border-radius:50%;background:rgba(0,229,255,0.15);border:2px solid var(--cyan);display:flex;align-items:center;justify-content:center;position:relative;cursor:pointer;transition:all 0.2s ease;">
            <span style="font-size:1.2rem;">🚀</span>
            <span class="font-mono ability-cd-text" style="display:none;position:absolute;font-size:0.7rem;color:var(--text-primary);"></span>
          </div>
          <!-- Ability 2: On cooldown -->
          <div class="ability-icon" data-cooldown="3" data-max="12" style="width:48px;height:48px;border-radius:50%;background:rgba(255,107,0,0.1);border:2px solid var(--text-dim);display:flex;align-items:center;justify-content:center;position:relative;cursor:pointer;transition:all 0.2s ease;opacity:0.6;">
            <span style="font-size:1.2rem;">🛡️</span>
            <span class="font-mono ability-cd-text" style="position:absolute;font-size:0.75rem;color:var(--orange);font-weight:700;">3</span>
          </div>
          <!-- Ability 3: On cooldown -->
          <div class="ability-icon" data-cooldown="7" data-max="15" style="width:48px;height:48px;border-radius:50%;background:rgba(255,45,85,0.1);border:2px solid var(--text-dim);display:flex;align-items:center;justify-content:center;position:relative;cursor:pointer;transition:all 0.2s ease;opacity:0.6;">
            <span style="font-size:1.2rem;">⚡</span>
            <span class="font-mono ability-cd-text" style="position:absolute;font-size:0.75rem;color:var(--red);font-weight:700;">7</span>
          </div>
        </div>
      </div>

      <!-- ═══ BOTTOM RIGHT: Ammo Counter & Weapon ═══ -->
      <div style="position:absolute;bottom:12px;right:12px;z-index:10;" class="flex items-center gap-md">
        <div class="glass-panel flex items-center gap-md" style="padding:8px 16px;">
          <!-- Weapon icon -->
          <div style="width:60px;height:36px;display:flex;align-items:center;justify-content:center;background:rgba(0,229,255,0.05);border-radius:var(--radius-sm);">
            <span style="font-size:1.5rem;filter:drop-shadow(0 0 4px rgba(0,229,255,0.3));">🔫</span>
          </div>
          <!-- Ammo -->
          <div class="flex-col" style="text-align:right;">
            <span class="font-mono" style="font-size:0.55rem;color:var(--text-dim);letter-spacing:2px;text-transform:uppercase;">ARC RIFLE</span>
            <div class="flex items-center gap-xs">
              <span class="font-mono" style="font-size:1.4rem;color:var(--text-primary);" id="hud-ammo-clip">6</span>
              <span class="font-mono" style="font-size:0.9rem;color:var(--text-dim);">/</span>
              <span class="font-mono" style="font-size:0.9rem;color:var(--text-secondary);" id="hud-ammo-reserve">30</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;
}

export function initHUD() {
  // ---- Animated Health & Fuel Bars ----
  const healthFill = document.getElementById('hud-health-fill');
  const healthText = document.getElementById('hud-health-text');
  const fuelFill = document.getElementById('hud-fuel-fill');
  const fuelText = document.getElementById('hud-fuel-text');

  let health = 75;
  let fuel = 60;
  let healthDir = -1;
  let fuelDir = -1;

  const barsInterval = setInterval(() => {
    // Health oscillates between 20 and 100
    health += healthDir * (Math.random() * 3 + 0.5);
    if (health <= 20) { health = 20; healthDir = 1; }
    if (health >= 100) { health = 100; healthDir = -1; }

    // Fuel oscillates between 10 and 90
    fuel += fuelDir * (Math.random() * 2 + 0.3);
    if (fuel <= 10) { fuel = 10; fuelDir = 1; }
    if (fuel >= 90) { fuel = 90; fuelDir = -1; }

    const h = Math.round(health);
    const f = Math.round(fuel);

    if (healthFill) {
      healthFill.style.width = h + '%';
      healthText.textContent = h;
      // Low-health warning
      if (h < 30) {
        healthText.style.color = 'var(--red)';
      } else {
        healthText.style.color = 'var(--green)';
      }
    }
    if (fuelFill) {
      fuelFill.style.width = f + '%';
      fuelText.textContent = f;
    }
  }, 800);

  // ---- Timer Countdown ----
  let totalSeconds = 2 * 60 + 45; // 02:45
  const timerEl = document.getElementById('hud-timer');

  const timerInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      totalSeconds = 5 * 60; // reset
    }
    totalSeconds--;
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    if (timerEl) timerEl.textContent = `${m}:${s}`;
  }, 1000);

  // ---- Kill Feed Animation ----
  const killFeedEl = document.getElementById('hud-kill-feed');
  const killMessages = [
    { killer: 'AceHunter', weapon: '🔫', victim: 'NightHawk' },
    { killer: 'PlayerOne', weapon: '💥', victim: 'ShadowX' },
    { killer: 'SkyLord', weapon: '🔫', victim: 'DarkBlade' },
    { killer: 'Phoenix', weapon: '🚀', victim: 'GhostRider' },
    { killer: 'PlayerOne', weapon: '🔫', victim: 'StormBreak' },
    { killer: 'Viper', weapon: '💥', victim: 'PlayerOne' },
    { killer: 'NightHawk', weapon: '⚡', victim: 'AceHunter' },
    { killer: 'ShadowX', weapon: '🔫', victim: 'SkyLord' },
    { killer: 'PlayerOne', weapon: '🚀', victim: 'Viper' },
    { killer: 'DarkBlade', weapon: '🔫', victim: 'Phoenix' },
  ];
  let killIdx = 3;

  const killInterval = setInterval(() => {
    if (!killFeedEl) return;
    const msg = killMessages[killIdx % killMessages.length];
    killIdx++;

    const entry = document.createElement('div');
    entry.className = 'kill-feed__entry';
    entry.innerHTML = `
      <span class="kill-feed__killer">${msg.killer}</span>
      <span class="kill-feed__weapon">${msg.weapon}</span>
      <span class="kill-feed__victim">${msg.victim}</span>
    `;
    killFeedEl.appendChild(entry);

    // Remove old entries to keep max 4
    const activeEntries = Array.from(killFeedEl.children).filter(el => !el.classList.contains('killing'));
    if (activeEntries.length > 4) {
      for (let i = 0; i < activeEntries.length - 4; i++) {
        const oldest = activeEntries[i];
        oldest.classList.add('killing');
        oldest.style.opacity = '0';
        oldest.style.transform = 'translateX(50px)';
        oldest.style.transition = 'all 0.3s ease';
        setTimeout(() => oldest.remove(), 300);
      }
    }
  }, 3500);

  // ---- Minimap Dots Movement ----
  const dots = [
    { id: 'dot-ally1', x: 35, y: 40 },
    { id: 'dot-ally2', x: 45, y: 60 },
    { id: 'dot-ally3', x: 55, y: 30 },
    { id: 'dot-enemy1', x: 70, y: 25 },
    { id: 'dot-enemy2', x: 75, y: 65 },
    { id: 'dot-enemy3', x: 80, y: 45 },
  ];

  const dotsInterval = setInterval(() => {
    dots.forEach(dot => {
      dot.x += (Math.random() - 0.5) * 4;
      dot.y += (Math.random() - 0.5) * 4;
      dot.x = Math.max(10, Math.min(90, dot.x));
      dot.y = Math.max(10, Math.min(90, dot.y));

      const el = document.getElementById(dot.id);
      if (el) {
        el.style.left = dot.x + '%';
        el.style.top = dot.y + '%';
        el.style.transition = 'left 0.8s ease, top 0.8s ease';
      }
    });
  }, 1000);

  // ---- Ability Cooldown Ticks ----
  const abilityIntervals = [];
  const abilities = document.querySelectorAll('.ability-icon');
  abilities.forEach(ab => {
    let cd = parseInt(ab.dataset.cooldown) || 0;
    const cdText = ab.querySelector('.ability-cd-text');

    const abInterval = setInterval(() => {
      if (cd > 0) {
        cd--;
        if (cdText) {
          cdText.textContent = cd > 0 ? cd : '';
          cdText.style.display = cd > 0 ? 'block' : 'none';
        }
        if (cd === 0) {
          ab.style.opacity = '1';
          ab.style.borderColor = 'var(--cyan)';
          ab.style.background = 'rgba(0,229,255,0.15)';
          // Pulse ready effect
          ab.style.boxShadow = '0 0 12px var(--cyan-glow)';
          setTimeout(() => { ab.style.boxShadow = 'none'; }, 1500);
        }
      } else {
        // Reset to new cooldown after a random delay (simulate ability usage)
        if (Math.random() < 0.1) {
          const maxCd = parseInt(ab.dataset.max) || 10;
          cd = maxCd;
          ab.style.opacity = '0.6';
          ab.style.borderColor = 'var(--text-dim)';
          ab.style.background = 'rgba(255,107,0,0.1)';
          if (cdText) {
            cdText.textContent = cd;
            cdText.style.display = 'block';
          }
        }
      }
    }, 1000);
    abilityIntervals.push(abInterval);
  });

  // Store cleanup references on the container
  const container = document.getElementById('hud-container');
  if (container) {
    container._hudCleanup = () => {
      clearInterval(barsInterval);
      clearInterval(timerInterval);
      clearInterval(killInterval);
      clearInterval(dotsInterval);
      abilityIntervals.forEach(clearInterval);
    };
  }
}
