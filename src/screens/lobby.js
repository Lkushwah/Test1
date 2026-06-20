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
        <!-- Injected Tab Content Container -->
        <div class="glass-panel lobby-tab-content-container" id="lobbyTabContent" style="margin-top: 12px; padding: 16px; min-height: 140px; background: rgba(13, 26, 45, 0.4); border-color: rgba(0, 229, 255, 0.15);">
          <!-- Tab content will be rendered here dynamically -->
        </div>
      </div>
    </div>
  `;
}

const tabContentData = {
  inventory: `
    <div class="tab-pane" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
      <div class="glass-panel" style="padding: 12px; border: 1px solid var(--cyan-glow); display: flex; flex-direction: column; justify-content: space-between; gap: 8px; background: rgba(0, 229, 255, 0.03);">
        <div>
          <div style="font-size: 1.5rem;">🐍</div>
          <div class="font-heading" style="font-size: 0.9rem; color: var(--text-primary); font-weight: 600;">NEON VIPER SKIN</div>
          <div class="text-dim font-mono" style="font-size: 0.65rem; color: var(--gold);">LEGENDARY WEAPON</div>
        </div>
        <button class="btn btn-primary btn-sm btn-inventory-equip" data-item="viper" style="width: 100%; font-size: 0.75rem;">EQUIPPED</button>
      </div>
      <div class="glass-panel" style="padding: 12px; display: flex; flex-direction: column; justify-content: space-between; gap: 8px;">
        <div>
          <div style="font-size: 1.5rem;">🪙</div>
          <div class="font-heading" style="font-size: 0.9rem; color: var(--text-primary); font-weight: 600;">GOLD BOOSTER (1H)</div>
          <div class="text-dim font-mono" style="font-size: 0.65rem;">EPIC CONSUMABLE</div>
        </div>
        <button class="btn btn-ghost btn-sm btn-inventory-use" data-item="booster" style="width: 100%; font-size: 0.75rem;">USE (3 LEFT)</button>
      </div>
      <div class="glass-panel" style="padding: 12px; display: flex; flex-direction: column; justify-content: space-between; gap: 8px;">
        <div>
          <div style="font-size: 1.5rem;">🪖</div>
          <div class="font-heading" style="font-size: 0.9rem; color: var(--text-primary); font-weight: 600;">STRIKER HELMET MK II</div>
          <div class="text-dim font-mono" style="font-size: 0.65rem; color: var(--cyan);">EPIC GEAR</div>
        </div>
        <button class="btn btn-primary btn-sm btn-inventory-equip" data-item="helmet" style="width: 100%; font-size: 0.75rem;">EQUIPPED</button>
      </div>
      <div class="glass-panel" style="padding: 12px; display: flex; flex-direction: column; justify-content: space-between; gap: 8px;">
        <div>
          <div style="font-size: 1.5rem;">📦</div>
          <div class="font-heading" style="font-size: 0.9rem; color: var(--text-primary); font-weight: 600;">SEASON 1 LOOT CRATE</div>
          <div class="text-dim font-mono" style="font-size: 0.65rem;">RARE CRATE</div>
        </div>
        <button class="btn btn-ghost btn-sm btn-inventory-open" data-item="crate" style="width: 100%; font-size: 0.75rem;">OPEN CRATE</button>
      </div>
    </div>
  `,
  weapons: `
    <div class="tab-pane" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
      <div class="glass-panel weapon-card" style="padding: 12px; display: flex; flex-direction: column; gap: 8px; border-color: var(--cyan);">
        <div class="flex flex-between items-center">
          <span class="font-heading" style="font-size: 0.9rem; font-weight: 600;">ARC RIFLE</span>
          <span class="badge badge--cyan" style="font-size:0.55rem;">EQUIPPED</span>
        </div>
        <div style="font-size: 1.5rem;">🔫</div>
        <div style="font-size: 0.7rem; display: flex; flex-direction: column; gap: 4px;">
          <div class="flex flex-between"><span>DAMAGE</span><span class="font-mono text-cyan">80%</span></div>
          <div class="progress-bar progress-bar--cyan"><div class="progress-bar__fill" style="width: 80%;"></div></div>
          <div class="flex flex-between" style="margin-top: 4px;"><span>FIRE RATE</span><span class="font-mono text-cyan">70%</span></div>
          <div class="progress-bar progress-bar--cyan"><div class="progress-bar__fill" style="width: 70%;"></div></div>
        </div>
      </div>
      <div class="glass-panel weapon-card" style="padding: 12px; display: flex; flex-direction: column; gap: 8px;">
        <div class="flex flex-between items-center">
          <span class="font-heading" style="font-size: 0.9rem; font-weight: 600;">VAPORIZER SNIPER</span>
          <button class="btn btn-ghost btn-xs btn-equip-weapon" data-weapon="sniper" style="font-size:0.55rem; padding: 2px 6px;">EQUIP</button>
        </div>
        <div style="font-size: 1.5rem;">🎯</div>
        <div style="font-size: 0.7rem; display: flex; flex-direction: column; gap: 4px;">
          <div class="flex flex-between"><span>DAMAGE</span><span class="font-mono text-orange">95%</span></div>
          <div class="progress-bar progress-bar--orange"><div class="progress-bar__fill" style="width: 95%;"></div></div>
          <div class="flex flex-between" style="margin-top: 4px;"><span>FIRE RATE</span><span class="font-mono text-orange">20%</span></div>
          <div class="progress-bar progress-bar--orange"><div class="progress-bar__fill" style="width: 20%;"></div></div>
        </div>
      </div>
      <div class="glass-panel weapon-card" style="padding: 12px; display: flex; flex-direction: column; gap: 8px;">
        <div class="flex flex-between items-center">
          <span class="font-heading" style="font-size: 0.9rem; font-weight: 600;">PLASMA SHOTGUN</span>
          <button class="btn btn-ghost btn-xs btn-equip-weapon" data-weapon="shotgun" style="font-size:0.55rem; padding: 2px 6px;">EQUIP</button>
        </div>
        <div style="font-size: 1.5rem;">☄️</div>
        <div style="font-size: 0.7rem; display: flex; flex-direction: column; gap: 4px;">
          <div class="flex flex-between"><span>DAMAGE</span><span class="font-mono text-red">85%</span></div>
          <div class="progress-bar progress-bar--red"><div class="progress-bar__fill" style="width: 85%;"></div></div>
          <div class="flex flex-between" style="margin-top: 4px;"><span>FIRE RATE</span><span class="font-mono text-red">45%</span></div>
          <div class="progress-bar progress-bar--red"><div class="progress-bar__fill" style="width: 45%;"></div></div>
        </div>
      </div>
    </div>
  `,
  events: `
    <div class="tab-pane" style="display: flex; flex-direction: column; gap: 10px;">
      <div class="glass-panel" style="padding: 12px; display: flex; flex-direction: column; gap: 6px;">
        <div class="flex flex-between items-center">
          <span class="font-heading" style="font-size: 0.95rem; font-weight: 600; color: var(--cyan);">DAILY FLIGHT</span>
          <button class="btn btn-primary btn-sm btn-claim-reward" data-reward="gems" data-amount="100" style="font-size: 0.75rem; padding: 4px 10px;">CLAIM 100 GEMS</button>
        </div>
        <p class="text-secondary" style="font-size: 0.75rem;">Spend 5 minutes in the air with Jetpack.</p>
        <div class="flex flex-between items-center font-mono" style="font-size: 0.7rem; margin-top: 4px;">
          <span class="text-dim">PROGRESS: 5 / 5 min</span>
          <span class="text-green">COMPLETED</span>
        </div>
        <div class="progress-bar progress-bar--green"><div class="progress-bar__fill" style="width: 100%;"></div></div>
      </div>
      <div class="glass-panel" style="padding: 12px; display: flex; flex-direction: column; gap: 6px; opacity: 0.85;">
        <div class="flex flex-between items-center">
          <span class="font-heading" style="font-size: 0.95rem; font-weight: 600; color: var(--orange);">SKY HUNTER CHALLENGE</span>
          <button class="btn btn-ghost btn-sm" disabled style="font-size: 0.75rem; padding: 4px 10px; opacity: 0.5;">IN PROGRESS</button>
        </div>
        <p class="text-secondary" style="font-size: 0.75rem;">Eliminate 50 enemies using Arc Rifle.</p>
        <div class="flex flex-between items-center font-mono" style="font-size: 0.7rem; margin-top: 4px;">
          <span class="text-dim">PROGRESS: 34 / 50 kills</span>
          <span class="text-orange">68%</span>
        </div>
        <div class="progress-bar progress-bar--orange"><div class="progress-bar__fill" style="width: 68%;"></div></div>
      </div>
    </div>
  `,
  friends: `
    <div class="tab-pane" style="display: flex; flex-direction: column; gap: 12px;">
      <div style="display: flex; gap: 8px; margin-bottom: 4px;">
        <input type="text" id="addFriendInput" class="input-text" placeholder="Enter Friend ID (e.g., StrikeForce-99)" style="flex: 1; padding: 8px; border: 1px solid var(--border-default); border-radius: var(--radius-sm); background: rgba(0,0,0,0.5); color: var(--text-primary); font-family: var(--font-heading); font-size: 0.85rem;" />
        <button class="btn btn-primary btn-sm" id="addFriendBtn" style="font-size: 0.8rem; padding: 0 16px;">ADD FRIEND</button>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;" id="friendsTabList">
        <div class="glass-panel" style="padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="lobby-friend__status lobby-friend__status--online"></div>
            <span class="font-heading" style="font-size: 0.85rem;">SkyLord</span>
          </div>
          <button class="btn btn-ghost btn-xs btn-friend-action" data-action="spectate" data-name="SkyLord" style="font-size: 0.65rem; padding: 2px 8px;">SPECTATE</button>
        </div>
        <div class="glass-panel" style="padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="lobby-friend__status lobby-friend__status--online"></div>
            <span class="font-heading" style="font-size: 0.85rem;">ShadowX</span>
          </div>
          <button class="btn btn-primary btn-xs btn-friend-action" data-action="invite" data-name="ShadowX" style="font-size: 0.65rem; padding: 2px 8px;">INVITE</button>
        </div>
        <div class="glass-panel" style="padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="lobby-friend__status lobby-friend__status--online"></div>
            <span class="font-heading" style="font-size: 0.85rem;">NightHawk</span>
          </div>
          <button class="btn btn-primary btn-xs btn-friend-action" data-action="invite" data-name="NightHawk" style="font-size: 0.65rem; padding: 2px 8px;">INVITE</button>
        </div>
      </div>
    </div>
  `
};

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

  // Tab switching and content injection
  const tabContent = document.getElementById('lobbyTabContent');
  const tabs = document.querySelectorAll('#lobbyTabs .tab-bar__item');

  if (tabContent) {
    tabContent.innerHTML = tabContentData.inventory;
    bindTabEvents('inventory');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('tab-bar__item--active'));
      tab.classList.add('tab-bar__item--active');
      const tabName = tab.dataset.tab;
      if (tabContent && tabContentData[tabName]) {
        tabContent.innerHTML = tabContentData[tabName];
        bindTabEvents(tabName);
      }
    });
  });

  // Countdown timer
  startCountdown();
}

function bindTabEvents(tabName) {
  if (tabName === 'inventory') {
    // Equip events
    document.querySelectorAll('.btn-inventory-equip').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.dataset.item;
        if (btn.textContent === 'EQUIPPED') {
          btn.textContent = 'EQUIP';
          btn.classList.replace('btn-primary', 'btn-ghost');
          showToast(`Unequipped Striker Gear!`);
        } else {
          btn.textContent = 'EQUIPPED';
          btn.classList.replace('btn-ghost', 'btn-primary');
          showToast(`Equipped striker attachment: ${item.toUpperCase()}`);
        }
      });
    });

    // Use consumable booster event
    document.querySelectorAll('.btn-inventory-use').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast("Activated 1 Hour Gold Coin Booster! (+100% Gold coins in match)");
        btn.textContent = "ACTIVE (0h 59m)";
        btn.classList.replace('btn-ghost', 'btn-primary');
        btn.disabled = true;
      });
    });

    // Open crate event
    document.querySelectorAll('.btn-inventory-open').forEach(btn => {
      btn.addEventListener('click', () => {
        const goldEl = document.getElementById('goldCount');
        if (goldEl) {
          let currentGold = parseInt(goldEl.textContent.replace(/,/g, '')) || 0;
          currentGold += 500;
          goldEl.textContent = currentGold.toLocaleString();
        }
        showToast("Crate opened! Received 🪙 500 Gold Coins!");
        btn.textContent = "OPENED";
        btn.disabled = true;
        btn.style.opacity = '0.5';
      });
    });
  }

  if (tabName === 'weapons') {
    // Equip weapons
    document.querySelectorAll('.btn-equip-weapon').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-equip-weapon').forEach(b => {
          b.textContent = 'EQUIP';
          b.classList.replace('btn-primary', 'btn-ghost');
        });
        btn.textContent = 'EQUIPPED';
        btn.classList.replace('btn-ghost', 'btn-primary');
        showToast(`Equipped Weapon Loadout: ${btn.dataset.weapon.toUpperCase()}`);
      });
    });
  }

  if (tabName === 'events') {
    // Claim event rewards
    document.querySelectorAll('.btn-claim-reward').forEach(btn => {
      btn.addEventListener('click', () => {
        const rewardType = btn.dataset.reward;
        const amount = parseInt(btn.dataset.amount) || 0;
        
        if (rewardType === 'gems') {
          const gemEl = document.getElementById('gemCount');
          if (gemEl) {
            let currentGems = parseInt(gemEl.textContent.replace(/,/g, '')) || 0;
            currentGems += amount;
            gemEl.textContent = currentGems.toLocaleString();
          }
          showToast(`Claimed reward: 💎 ${amount} Gems!`);
        }
        btn.textContent = 'CLAIMED';
        btn.disabled = true;
        btn.style.opacity = '0.5';
      });
    });
  }

  if (tabName === 'friends') {
    // Add friend
    const addBtn = document.getElementById('addFriendBtn');
    const inputEl = document.getElementById('addFriendInput');
    if (addBtn && inputEl) {
      addBtn.addEventListener('click', () => {
        const val = inputEl.value.trim();
        if (val) {
          showToast(`Friend request sent to ${val}!`);
          inputEl.value = '';
          
          const list = document.getElementById('friendsTabList');
          if (list) {
            const row = document.createElement('div');
            row.className = 'glass-panel';
            row.style.padding = '10px 14px';
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.justifyContent = 'space-between';
            row.innerHTML = `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div class="lobby-friend__status lobby-friend__status--offline"></div>
                <span class="font-heading" style="font-size: 0.85rem;">${val}</span>
              </div>
              <span class="text-dim" style="font-size: 0.65rem;">PENDING</span>
            `;
            list.appendChild(row);
          }
        }
      });
    }

    // Friend actions (spectate/invite)
    document.querySelectorAll('.btn-friend-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const name = btn.dataset.name;
        if (action === 'spectate') {
          showToast(`Connecting to ${name}'s match spectator slot...`);
        } else if (action === 'invite') {
          showToast(`Invite sent to ${name}!`);
          btn.textContent = 'SENT';
          btn.disabled = true;
        }
      });
    });
  }
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

function showToast(message) {
  const container = document.body;
  const toast = document.createElement('div');
  toast.className = 'glass-panel';
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.padding = '12px 24px';
  toast.style.background = 'rgba(10, 22, 40, 0.9)';
  toast.style.border = '1px solid var(--cyan)';
  toast.style.borderRadius = 'var(--radius-md)';
  toast.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.3)';
  toast.style.color = 'var(--text-primary)';
  toast.style.fontFamily = 'var(--font-heading)';
  toast.style.fontSize = '0.9rem';
  toast.style.zIndex = '9999';
  toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  toast.style.transform = 'translateY(20px)';
  toast.style.opacity = '0';
  toast.textContent = message;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  // Fade out
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2500);
}
