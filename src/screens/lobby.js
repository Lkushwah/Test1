// ============================================
// AERO STRIKE — Main Lobby Screen
// ============================================

export function renderLobby() {
  return `
    <div class="lobby-screen screen-enter">
      <!-- Lobby Grid Layout -->
      <div class="lobby-grid">
        
        <!-- Left Panel: Player Info & Season -->
        <div class="lobby-left">
          <!-- Featured Season Banner -->
          <div class="glass-panel lobby-season-banner">
            <div class="lobby-season-banner__badge">
              <span class="badge badge--orange">CURRENT SEASON</span>
            </div>
            <h2 class="lobby-season-banner__title text-glow-cyan">SEASON 1</h2>
            <h3 class="lobby-season-banner__subtitle text-orange" style="font-size:1.6rem; margin-top:4px;">SKY HUNTER</h3>
            <div class="lobby-season-banner__tier">
              <div class="flex flex-between items-center" style="margin-top:16px;">
                <span class="font-mono" style="font-size:0.75rem; color:var(--text-dim);">TIER 45</span>
                <span class="font-mono" style="font-size:0.75rem; color:var(--cyan);">650 / 1000 XP</span>
              </div>
              <div class="progress-bar progress-bar--gold progress-bar--lg" style="margin-top:8px;">
                <div class="progress-bar__fill" style="width: 65%;"></div>
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="glass-panel lobby-quick-stats">
            <h4 class="text-secondary" style="margin-bottom:12px; font-size:0.85rem; letter-spacing:2px;">TODAY'S STATS</h4>
            <div class="lobby-stats-grid">
              <div class="lobby-stat">
                <div class="lobby-stat__value text-cyan font-mono">12</div>
                <div class="lobby-stat__label">Matches</div>
              </div>
              <div class="lobby-stat">
                <div class="lobby-stat__value text-green font-mono">8</div>
                <div class="lobby-stat__label">Wins</div>
              </div>
              <div class="lobby-stat">
                <div class="lobby-stat__value text-orange font-mono">2.8</div>
                <div class="lobby-stat__label">K/D</div>
              </div>
              <div class="lobby-stat">
                <div class="lobby-stat__value text-gold font-mono">67%</div>
                <div class="lobby-stat__label">Win Rate</div>
              </div>
            </div>
          </div>

          <!-- Friends Online -->
          <div class="glass-panel lobby-friends">
            <h4 class="text-secondary" style="margin-bottom:12px; font-size:0.85rem; letter-spacing:2px;">FRIENDS ONLINE</h4>
            <div class="lobby-friends-list">
              <div class="lobby-friend">
                <div class="lobby-friend__status lobby-friend__status--online"></div>
                <span class="lobby-friend__name">SkyLord</span>
                <span class="badge badge--green" style="font-size:0.55rem;">IN MATCH</span>
              </div>
              <div class="lobby-friend">
                <div class="lobby-friend__status lobby-friend__status--online"></div>
                <span class="lobby-friend__name">ShadowX</span>
                <span class="badge badge--cyan" style="font-size:0.55rem;">LOBBY</span>
              </div>
              <div class="lobby-friend">
                <div class="lobby-friend__status lobby-friend__status--online"></div>
                <span class="lobby-friend__name">NightHawk</span>
                <span class="badge badge--cyan" style="font-size:0.55rem;">LOBBY</span>
              </div>
              <div class="lobby-friend">
                <div class="lobby-friend__status lobby-friend__status--away"></div>
                <span class="lobby-friend__name">Alpha</span>
                <span class="badge badge--orange" style="font-size:0.55rem;">AWAY</span>
              </div>
              <div class="lobby-friend">
                <div class="lobby-friend__status lobby-friend__status--offline"></div>
                <span class="lobby-friend__name">GhostRider</span>
                <span class="text-dim" style="font-size:0.65rem;">Last seen 2h ago</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Center Panel: Character & Play Button -->
        <div class="lobby-center">
          <!-- Character Display -->
          <div class="lobby-character">
            <div class="lobby-character__spotlight"></div>
            <div class="lobby-character__model" id="lobbyCharacter">
              <div class="lobby-character__class-badge">
                <span class="badge badge--cyan">ASSAULT</span>
              </div>
              <img src="/assets/characters/assault.png" style="height: 220px; object-fit: contain; filter: drop-shadow(0 0 20px rgba(0, 229, 255, 0.3)); margin-bottom: var(--space-sm);" alt="Assault" />
              <div class="lobby-character__name font-heading">STRIKER-7</div>
            </div>
          </div>

          <!-- Play Button Area -->
          <div class="lobby-play-area">
            <div class="lobby-mode-selector">
              <span class="text-dim font-mono" style="font-size:0.7rem;">GAME MODE</span>
              <div class="lobby-mode-current" id="gameModeBtn">
                <span class="text-cyan font-heading" style="font-size:1.1rem;">TEAM DEATHMATCH</span>
                <span class="text-dim">▾</span>
              </div>
            </div>
            <button class="btn btn-play" id="playBtn">
              <span>▶</span> PLAY
            </button>
            <button class="btn btn-ghost btn-sm" id="startMatchBtn" style="margin-top:12px;">
              START MATCH
            </button>
          </div>
        </div>

        <!-- Right Panel: News & Events -->
        <div class="lobby-right">
          <!-- Featured Event -->
          <div class="glass-panel glass-panel--orange lobby-event">
            <span class="badge badge--red" style="font-size:0.6rem; margin-bottom:8px; display:inline-block;">🔥 LIVE EVENT</span>
            <h3 class="text-orange" style="font-size:1.1rem;">DOUBLE XP WEEKEND</h3>
            <p class="text-secondary" style="font-size:0.8rem; margin-top:6px;">Earn 2x XP in all game modes. Ends in:</p>
            <div class="countdown" style="margin-top:8px;">
              <span class="countdown__segment">23h</span>
              <span class="countdown__segment">45m</span>
              <span class="countdown__segment">12s</span>
            </div>
          </div>

          <!-- News Feed -->
          <div class="glass-panel lobby-news">
            <h4 class="text-secondary" style="margin-bottom:12px; font-size:0.85rem; letter-spacing:2px;">NEWS</h4>
            <div class="lobby-news-list">
              <div class="lobby-news-item">
                <div class="lobby-news-item__dot" style="background:var(--cyan);"></div>
                <div>
                  <div class="lobby-news-item__title">New Map: Skyfall Arena</div>
                  <div class="lobby-news-item__time text-dim">2 hours ago</div>
                </div>
              </div>
              <div class="lobby-news-item">
                <div class="lobby-news-item__dot" style="background:var(--orange);"></div>
                <div>
                  <div class="lobby-news-item__title">Patch 1.2.5 — Balance Update</div>
                  <div class="lobby-news-item__time text-dim">1 day ago</div>
                </div>
              </div>
              <div class="lobby-news-item">
                <div class="lobby-news-item__dot" style="background:var(--gold);"></div>
                <div>
                  <div class="lobby-news-item__title">Season 1 Battle Pass Live!</div>
                  <div class="lobby-news-item__time text-dim">3 days ago</div>
                </div>
              </div>
              <div class="lobby-news-item">
                <div class="lobby-news-item__dot" style="background:var(--green);"></div>
                <div>
                  <div class="lobby-news-item__title">Clan Wars Tournament Open</div>
                  <div class="lobby-news-item__time text-dim">5 days ago</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Store Highlight -->
          <div class="glass-panel glass-panel--gold lobby-store-highlight">
            <span class="badge badge--gold" style="font-size:0.6rem; margin-bottom:8px; display:inline-block;">✨ FEATURED</span>
            <h3 class="text-gold" style="font-size:1rem;">NEON VIPER SKIN</h3>
            <div class="lobby-store-item">
              <div class="lobby-store-item__preview">🐍</div>
              <div>
                <p class="text-secondary" style="font-size:0.75rem;">Legendary Weapon Skin</p>
                <div class="flex items-center gap-sm" style="margin-top:6px;">
                  <span class="currency__icon" style="color:var(--purple);">💎</span>
                  <span class="font-mono text-gold" style="font-size:0.9rem;">800</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Tab Bar -->
      <div class="lobby-bottom-bar">
        <div class="tab-bar" id="lobbyTabs">
          <div class="tab-bar__item tab-bar__item--active" data-tab="inventory">📦 INVENTORY</div>
          <div class="tab-bar__item" data-tab="weapons">🔫 WEAPONS</div>
          <div class="tab-bar__item" data-tab="events">🎯 EVENTS</div>
          <div class="tab-bar__item" data-tab="friends">👥 FRIENDS</div>
        </div>
      </div>
    </div>
  `;
}

export function initLobby() {
  // Play button animation
  const playBtn = document.getElementById('playBtn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      playBtn.innerHTML = '<span class="lobby-spinner"></span> FINDING MATCH...';
      playBtn.style.pointerEvents = 'none';
      setTimeout(() => {
        playBtn.innerHTML = '<span>▶</span> PLAY';
        playBtn.style.pointerEvents = 'auto';
      }, 3000);
    });
  }

  // Game mode selector
  const gameModeBtn = document.getElementById('gameModeBtn');
  if (gameModeBtn) {
    const modes = ['TEAM DEATHMATCH', 'FREE FOR ALL', 'DOMINATION', 'BATTLE ROYALE', 'SEARCH & DESTROY'];
    let currentMode = 0;
    gameModeBtn.addEventListener('click', () => {
      currentMode = (currentMode + 1) % modes.length;
      gameModeBtn.querySelector('.text-cyan').textContent = modes[currentMode];
    });
  }

  // Tab switching
  const tabs = document.querySelectorAll('#lobbyTabs .tab-bar__item');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('tab-bar__item--active'));
      tab.classList.add('tab-bar__item--active');
    });
  });

  // Countdown timer
  startCountdown();
}

function startCountdown() {
  const segments = document.querySelectorAll('.countdown__segment');
  if (segments.length < 3) return;

  let h = 23, m = 45, s = 12;
  setInterval(() => {
    s--;
    if (s < 0) { s = 59; m--; }
    if (m < 0) { m = 59; h--; }
    if (h < 0) { h = 23; m = 59; s = 59; }
    segments[0].textContent = `${h}h`;
    segments[1].textContent = `${m}m`;
    segments[2].textContent = `${s}s`;
  }, 1000);
}
