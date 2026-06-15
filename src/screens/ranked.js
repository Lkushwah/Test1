// ============================================
// AERO STRIKE — Ranked Screen
// Competitive ranked mode with rank progression
// ============================================

const RANK_TIERS = [
  { name: 'Bronze',       icon: '🛡️', color: '#cd7f32', divisions: ['I','II','III'] },
  { name: 'Silver',       icon: '⚙️', color: '#c0c0c0', divisions: ['I','II','III'] },
  { name: 'Gold',         icon: '🏅', color: '#ffd700', divisions: ['I','II','III'] },
  { name: 'Platinum',     icon: '⚔️', color: '#00e5ff', divisions: ['I','II','III'] },
  { name: 'Diamond',      icon: '💎', color: '#b9f2ff', divisions: ['I','II','III'] },
  { name: 'Master',       icon: '👑', color: '#a855f7', divisions: ['I','II','III'] },
  { name: 'Grandmaster',  icon: '🔱', color: '#ff2d55', divisions: ['I']            },
];

const GAME_MODES = [
  { id: 'tdm',  name: 'Team Deathmatch',  icon: '👥' },
  { id: 'ffa',  name: 'Free For All',     icon: '💀' },
  { id: 'dom',  name: 'Domination',       icon: '🚩' },
  { id: 'snd',  name: 'Search & Destroy', icon: '💣' },
];

const RECENT_MATCHES = [
  { result: 'W', kills: 18, deaths: 5,  map: 'Skybridge',  mode: 'TDM' },
  { result: 'W', kills: 22, deaths: 8,  map: 'Reactor',    mode: 'TDM' },
  { result: 'L', kills: 9,  deaths: 12, map: 'Outpost',    mode: 'TDM' },
  { result: 'W', kills: 15, deaths: 6,  map: 'Skybridge',  mode: 'TDM' },
  { result: 'W', kills: 20, deaths: 7,  map: 'Hangar Bay',  mode: 'TDM' },
];

export function renderRanked() {
  const currentRank   = 'PLATINUM III';
  const rankPoints    = 3700;
  const rankMax       = 5000;
  const progressPct   = Math.round((rankPoints / rankMax) * 100);
  const selectedMode  = 0;

  return `
    <div class="ranked-screen flex-col gap-lg" style="max-width:900px;margin:0 auto;width:100%;">

      <!-- ===== HEADER ===== -->
      <div class="flex flex-between items-center">
        <div class="flex-col gap-xs">
          <h2 class="font-heading text-cyan text-glow-cyan" style="font-size:1.5rem;letter-spacing:3px;">
            ⚔️ RANKED SEASON 1
          </h2>
          <div class="countdown">
            <span class="text-secondary" style="font-size:.75rem;">Ends in</span>
            <span class="countdown__segment">34d</span>
            <span class="countdown__segment">12h</span>
            <span class="countdown__segment">07m</span>
          </div>
        </div>
        <div class="flex gap-sm">
          <div class="currency currency--gem">
            <span class="currency__icon">💎</span>
            <span>2,450</span>
          </div>
          <div class="currency currency--gold">
            <span class="currency__icon">🪙</span>
            <span>18,300</span>
          </div>
        </div>
      </div>

      <!-- ===== RANK EMBLEM CENTER ===== -->
      <div class="glass-panel flex-col flex-center gap-md" style="padding:var(--space-xl) var(--space-lg);">

        <!-- Animated Rank Emblem -->
        <div class="rank-emblem" id="ranked-emblem">
          <div class="rank-emblem__glow"></div>
          <div class="rank-emblem__ring" id="ranked-ring"></div>
          <div class="rank-emblem__icon">⚔️</div>
        </div>

        <!-- Rank Title -->
        <div class="flex-col flex-center gap-xs" style="text-align:center;">
          <span class="font-mono text-dim" style="font-size:.7rem;letter-spacing:3px;">CURRENT RANK</span>
          <h1 class="text-cyan text-glow-cyan font-heading" style="font-size:2.2rem;letter-spacing:4px;">
            ${currentRank}
          </h1>
        </div>

        <!-- Rank Progress -->
        <div class="flex-col gap-xs w-full" style="max-width:420px;">
          <div class="flex flex-between items-center">
            <span class="font-mono text-secondary" style="font-size:.75rem;">RANK POINTS</span>
            <span class="font-mono text-cyan" style="font-size:.85rem;">${rankPoints.toLocaleString()} / ${rankMax.toLocaleString()}</span>
          </div>
          <div class="progress-bar progress-bar--lg">
            <div class="progress-bar__fill" style="width:${progressPct}%;"></div>
          </div>
          <div class="flex flex-between items-center">
            <span class="badge badge--cyan">Platinum III</span>
            <span class="badge badge--gold">Diamond I ➜</span>
          </div>
        </div>

        <!-- Next Reward Preview -->
        <div class="glass-panel flex items-center gap-md" style="padding:var(--space-md) var(--space-lg);margin-top:var(--space-sm);width:100%;max-width:420px;">
          <div style="font-size:2rem;">💎</div>
          <div class="flex-col gap-xs" style="flex:1;">
            <span class="font-mono text-dim" style="font-size:.65rem;letter-spacing:2px;">NEXT REWARD</span>
            <span class="font-heading text-gold" style="font-size:1rem;font-weight:700;">Diamond Frame + 500 Gems</span>
          </div>
          <button class="btn btn-ghost btn-sm" id="btn-view-rewards">VIEW REWARDS</button>
        </div>
      </div>

      <!-- ===== GAME MODE SELECTOR ===== -->
      <div class="glass-panel flex-col gap-md" style="padding:var(--space-lg);">
        <div class="flex flex-between items-center">
          <h3 class="font-heading text-secondary" style="letter-spacing:2px;">GAME MODE</h3>
          <span class="badge badge--green">RANKED QUEUE</span>
        </div>
        <div class="flex-col gap-xs" id="ranked-mode-list">
          ${GAME_MODES.map((mode, i) => `
            <div class="ranked-mode-option flex items-center gap-md ${i === selectedMode ? 'ranked-mode-option--active' : ''}"
                 data-mode="${mode.id}"
                 style="padding:12px var(--space-md);border-radius:var(--radius-md);cursor:pointer;
                        border:1px solid ${i === selectedMode ? 'var(--cyan)' : 'var(--border-default)'};
                        background:${i === selectedMode ? 'rgba(0,229,255,0.08)' : 'rgba(13,26,45,0.5)'};
                        transition:all var(--transition-normal);">
              <span style="font-size:1.4rem;">${mode.icon}</span>
              <span class="font-heading ${i === selectedMode ? 'text-cyan' : 'text-secondary'}"
                    style="font-size:1.05rem;font-weight:600;letter-spacing:1px;flex:1;">
                ${mode.name}
              </span>
              ${i === selectedMode
                ? '<span class="badge badge--cyan">SELECTED</span>'
                : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ===== MATCH STATS ===== -->
      <div class="glass-panel flex-col gap-md" style="padding:var(--space-lg);">
        <h3 class="font-heading text-secondary" style="letter-spacing:2px;">MATCH STATS</h3>

        <!-- Stats Row -->
        <div class="flex gap-lg flex-wrap">
          <div class="flex-col flex-center gap-xs" style="flex:1;min-width:100px;">
            <span class="font-mono text-dim" style="font-size:.65rem;letter-spacing:2px;">K/D RATIO</span>
            <span class="font-mono text-cyan text-glow-cyan" style="font-size:1.8rem;font-weight:700;">2.4</span>
          </div>
          <div class="flex-col flex-center gap-xs" style="flex:1;min-width:100px;">
            <span class="font-mono text-dim" style="font-size:.65rem;letter-spacing:2px;">WIN RATE</span>
            <span class="font-mono text-green" style="font-size:1.8rem;font-weight:700;">58%</span>
          </div>
          <div class="flex-col flex-center gap-xs" style="flex:1;min-width:100px;">
            <span class="font-mono text-dim" style="font-size:.65rem;letter-spacing:2px;">MATCHES</span>
            <span class="font-mono text-orange" style="font-size:1.8rem;font-weight:700;">127</span>
          </div>
          <div class="flex-col flex-center gap-xs" style="flex:1;min-width:100px;">
            <span class="font-mono text-dim" style="font-size:.65rem;letter-spacing:2px;">WIN STREAK</span>
            <span class="font-mono text-gold text-glow-gold" style="font-size:1.8rem;font-weight:700;">3 🔥</span>
          </div>
        </div>

        <!-- Recent Matches -->
        <div class="flex-col gap-sm" style="margin-top:var(--space-sm);">
          <span class="font-mono text-dim" style="font-size:.65rem;letter-spacing:2px;">RECENT MATCHES</span>
          <div class="flex gap-sm flex-wrap">
            ${RECENT_MATCHES.map(m => `
              <div class="glass-panel flex-col items-center gap-xs"
                   style="padding:var(--space-sm) var(--space-md);min-width:120px;flex:1;
                          border-color:${m.result === 'W' ? 'rgba(0,255,136,0.25)' : 'rgba(255,45,85,0.25)'};">
                <div class="flex items-center gap-sm">
                  <span style="width:10px;height:10px;border-radius:50%;
                               background:${m.result === 'W' ? 'var(--green)' : 'var(--red)'};
                               box-shadow:0 0 8px ${m.result === 'W' ? 'var(--green-glow)' : 'var(--red-glow)'};"></span>
                  <span class="font-heading ${m.result === 'W' ? 'text-green' : 'text-red'}"
                        style="font-weight:700;font-size:.9rem;">${m.result === 'W' ? 'VICTORY' : 'DEFEAT'}</span>
                </div>
                <span class="font-mono text-secondary" style="font-size:.7rem;">${m.kills}/${m.deaths} — ${m.map}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- ===== PLAY RANKED ===== -->
      <div class="flex-col flex-center gap-sm" style="padding:var(--space-md) 0;">
        <button class="btn btn-ranked" id="btn-play-ranked" style="min-width:320px;font-size:1.35rem;padding:18px 48px;">
          ⚔️ PLAY RANKED
        </button>
        <span class="text-dim font-mono" style="font-size:.7rem;letter-spacing:1px;">
          ESTIMATED WAIT: ~1:30
        </span>
      </div>

      <!-- ===== REWARDS MODAL ===== -->
      <div class="modal-overlay" id="ranked-rewards-modal">
        <div class="modal" style="max-width:600px;">
          <div class="modal__header">
            <h3 class="modal__title">🏆 SEASON 1 RANK REWARDS</h3>
            <button class="modal__close" id="ranked-modal-close">✕</button>
          </div>
          <div class="flex-col gap-sm" style="max-height:400px;overflow-y:auto;">
            ${RANK_TIERS.map((tier, i) => {
              const isCurrentTier = tier.name === 'Platinum';
              const isLocked      = i > 3; // Above Platinum
              const rewards = _getTierReward(tier.name);
              return `
                <div class="flex items-center gap-md"
                     style="padding:var(--space-sm) var(--space-md);border-radius:var(--radius-md);
                            border:1px solid ${isCurrentTier ? 'var(--cyan)' : 'var(--border-default)'};
                            background:${isCurrentTier ? 'rgba(0,229,255,0.08)' : 'rgba(13,26,45,0.5)'};
                            opacity:${isLocked ? '0.5' : '1'};">
                  <span style="font-size:1.6rem;min-width:36px;text-align:center;">${tier.icon}</span>
                  <div class="flex-col" style="flex:1;">
                    <span class="font-heading" style="font-weight:700;font-size:.95rem;color:${tier.color};">
                      ${tier.name}
                    </span>
                    <span class="font-mono text-dim" style="font-size:.65rem;">${rewards}</span>
                  </div>
                  ${isCurrentTier
                    ? '<span class="badge badge--cyan">CURRENT</span>'
                    : isLocked
                      ? '<span class="badge badge--red">🔒 LOCKED</span>'
                      : '<span class="badge badge--green">✓ CLAIMED</span>'}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

    </div>
  `;
}

function _getTierReward(tierName) {
  const rewards = {
    'Bronze':      'Title: "Recruit" + 100 Gems',
    'Silver':      'Silver Banner + 200 Gems',
    'Gold':        'Gold Weapon Skin + 350 Gems',
    'Platinum':    'Platinum Frame + 500 Gems',
    'Diamond':     'Diamond Frame + 750 Gems + Jetpack Trail',
    'Master':      'Master Emblem + 1000 Gems + Legendary Camo',
    'Grandmaster': 'Grandmaster Title + 2000 Gems + Exclusive Skin',
  };
  return rewards[tierName] || '';
}

export function initRanked() {
  // --- Game Mode Selector ---
  const modeList = document.getElementById('ranked-mode-list');
  if (modeList) {
    modeList.addEventListener('click', (e) => {
      const option = e.target.closest('.ranked-mode-option');
      if (!option) return;

      // Deselect all
      modeList.querySelectorAll('.ranked-mode-option').forEach(el => {
        el.classList.remove('ranked-mode-option--active');
        el.style.borderColor = 'var(--border-default)';
        el.style.background  = 'rgba(13,26,45,0.5)';
        const label = el.querySelector('.font-heading');
        if (label) {
          label.classList.remove('text-cyan');
          label.classList.add('text-secondary');
        }
        const badge = el.querySelector('.badge');
        if (badge) badge.remove();
      });

      // Select clicked
      option.classList.add('ranked-mode-option--active');
      option.style.borderColor = 'var(--cyan)';
      option.style.background  = 'rgba(0,229,255,0.08)';
      const label = option.querySelector('.font-heading');
      if (label) {
        label.classList.remove('text-secondary');
        label.classList.add('text-cyan');
      }
      const selectedBadge = document.createElement('span');
      selectedBadge.className = 'badge badge--cyan';
      selectedBadge.textContent = 'SELECTED';
      option.appendChild(selectedBadge);
    });
  }

  // --- View Rewards Modal ---
  const btnViewRewards = document.getElementById('btn-view-rewards');
  const modal          = document.getElementById('ranked-rewards-modal');
  const btnModalClose  = document.getElementById('ranked-modal-close');

  if (btnViewRewards && modal) {
    btnViewRewards.addEventListener('click', () => {
      modal.classList.add('modal-overlay--visible');
    });
  }
  if (btnModalClose && modal) {
    btnModalClose.addEventListener('click', () => {
      modal.classList.remove('modal-overlay--visible');
    });
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('modal-overlay--visible');
      }
    });
  }

  // --- Animated Rank Emblem Effects ---
  const emblem = document.getElementById('ranked-emblem');
  if (emblem) {
    // Add a second rotating ring with opposite direction
    const ring2 = document.createElement('div');
    ring2.className = 'rank-emblem__ring';
    ring2.style.animationDirection = 'reverse';
    ring2.style.animationDuration  = '15s';
    ring2.style.opacity = '0.15';
    ring2.style.inset   = '-8px';
    emblem.appendChild(ring2);

    // Hover pulse effect
    emblem.addEventListener('mouseenter', () => {
      const glow = emblem.querySelector('.rank-emblem__glow');
      if (glow) {
        glow.style.animationDuration = '0.8s';
      }
    });
    emblem.addEventListener('mouseleave', () => {
      const glow = emblem.querySelector('.rank-emblem__glow');
      if (glow) {
        glow.style.animationDuration = '3s';
      }
    });
  }

  // --- Play Ranked Button ---
  const btnPlay = document.getElementById('btn-play-ranked');
  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      btnPlay.textContent = '🔍 SEARCHING...';
      btnPlay.style.pointerEvents = 'none';
      btnPlay.style.opacity = '0.7';

      // Simulate matchmaking search for demo
      setTimeout(() => {
        btnPlay.innerHTML = '⚔️ PLAY RANKED';
        btnPlay.style.pointerEvents = '';
        btnPlay.style.opacity = '';
      }, 3000);
    });
  }
}
