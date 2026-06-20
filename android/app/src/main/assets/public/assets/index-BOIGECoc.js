(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new class{constructor(){this.routes={},this.currentRoute=null,this.container=null,this.onRouteChange=null,this._transitioning=!1,this._pendingRoute=null,this._cleanupFns={}}init(e){this.container=document.getElementById(e),window.addEventListener(`hashchange`,()=>this.handleRoute()),window.location.hash?this.handleRoute():window.location.hash=`#lobby`}register(e,t){this.routes[e]=t}registerCleanup(e,t){this._cleanupFns[e]=t}navigate(e){window.location.hash=`#${e}`}handleRoute(){let e=window.location.hash.slice(1)||`lobby`,t=this.routes[e];if(!t){this.navigate(`lobby`);return}if(e!==this.currentRoute){if(this._transitioning){this._pendingRoute=e;return}this._doTransition(e,t)}}_doTransition(e,t){if(!this.container)return;this._transitioning=!0,this._pendingRoute=null;let n=this.currentRoute;if(n&&typeof this._cleanupFns[n]==`function`)try{this._cleanupFns[n]()}catch{}this.container.style.transition=`opacity 0.2s ease, transform 0.2s ease`,this.container.style.opacity=`0`,this.container.style.transform=`translateY(10px)`,setTimeout(()=>{this.container.innerHTML=``;let n=t();if(typeof n==`string`?this.container.innerHTML=n:n instanceof HTMLElement&&this.container.appendChild(n),requestAnimationFrame(()=>{this.container.style.transition=`opacity 0.35s ease, transform 0.35s ease`,this.container.style.opacity=`1`,this.container.style.transform=`translateY(0)`}),this.currentRoute=e,this.onRouteChange&&this.onRouteChange(e),this._transitioning=!1,this._pendingRoute&&this._pendingRoute!==e){let e=this._pendingRoute,t=this.routes[e];t&&this._doTransition(e,t)}},200)}};function t(){return`
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
  `}var n={inventory:`
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
  `,weapons:`
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
  `,events:`
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
  `,friends:`
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
  `};function r(){let e=document.getElementById(`playBtn`);e&&e.addEventListener(`click`,()=>{e.innerHTML=`<span class="lobby-spinner"></span> FINDING MATCH...`,e.style.pointerEvents=`none`,setTimeout(()=>{e.innerHTML=`<span>▶</span> PLAY`,e.style.pointerEvents=`auto`},3e3)});let t=document.getElementById(`gameModeBtn`);if(t){let e=[`TEAM DEATHMATCH`,`FREE FOR ALL`,`DOMINATION`,`BATTLE ROYALE`,`SEARCH & DESTROY`],n=0;t.addEventListener(`click`,()=>{n=(n+1)%e.length,t.querySelector(`.text-cyan`).textContent=e[n]})}let r=document.getElementById(`lobbyTabContent`),o=document.querySelectorAll(`#lobbyTabs .tab-bar__item`);r&&(r.innerHTML=n.inventory,i(`inventory`)),o.forEach(e=>{e.addEventListener(`click`,()=>{o.forEach(e=>e.classList.remove(`tab-bar__item--active`)),e.classList.add(`tab-bar__item--active`);let t=e.dataset.tab;r&&n[t]&&(r.innerHTML=n[t],i(t))})}),a()}function i(e){if(e===`inventory`&&(document.querySelectorAll(`.btn-inventory-equip`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.item;e.textContent===`EQUIPPED`?(e.textContent=`EQUIP`,e.classList.replace(`btn-primary`,`btn-ghost`),o(`Unequipped Striker Gear!`)):(e.textContent=`EQUIPPED`,e.classList.replace(`btn-ghost`,`btn-primary`),o(`Equipped striker attachment: ${t.toUpperCase()}`))})}),document.querySelectorAll(`.btn-inventory-use`).forEach(e=>{e.addEventListener(`click`,()=>{o(`Activated 1 Hour Gold Coin Booster! (+100% Gold coins in match)`),e.textContent=`ACTIVE (0h 59m)`,e.classList.replace(`btn-ghost`,`btn-primary`),e.disabled=!0})}),document.querySelectorAll(`.btn-inventory-open`).forEach(e=>{e.addEventListener(`click`,()=>{let t=document.getElementById(`goldCount`);if(t){let e=parseInt(t.textContent.replace(/,/g,``))||0;e+=500,t.textContent=e.toLocaleString()}o(`Crate opened! Received 🪙 500 Gold Coins!`),e.textContent=`OPENED`,e.disabled=!0,e.style.opacity=`0.5`})})),e===`weapons`&&document.querySelectorAll(`.btn-equip-weapon`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.btn-equip-weapon`).forEach(e=>{e.textContent=`EQUIP`,e.classList.replace(`btn-primary`,`btn-ghost`)}),e.textContent=`EQUIPPED`,e.classList.replace(`btn-ghost`,`btn-primary`),o(`Equipped Weapon Loadout: ${e.dataset.weapon.toUpperCase()}`)})}),e===`events`&&document.querySelectorAll(`.btn-claim-reward`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.reward,n=parseInt(e.dataset.amount)||0;if(t===`gems`){let e=document.getElementById(`gemCount`);if(e){let t=parseInt(e.textContent.replace(/,/g,``))||0;t+=n,e.textContent=t.toLocaleString()}o(`Claimed reward: 💎 ${n} Gems!`)}e.textContent=`CLAIMED`,e.disabled=!0,e.style.opacity=`0.5`})}),e===`friends`){let e=document.getElementById(`addFriendBtn`),t=document.getElementById(`addFriendInput`);e&&t&&e.addEventListener(`click`,()=>{let e=t.value.trim();if(e){o(`Friend request sent to ${e}!`),t.value=``;let n=document.getElementById(`friendsTabList`);if(n){let t=document.createElement(`div`);t.className=`glass-panel`,t.style.padding=`10px 14px`,t.style.display=`flex`,t.style.alignItems=`center`,t.style.justifyContent=`space-between`,t.innerHTML=`
              <div style="display: flex; align-items: center; gap: 8px;">
                <div class="lobby-friend__status lobby-friend__status--offline"></div>
                <span class="font-heading" style="font-size: 0.85rem;">${e}</span>
              </div>
              <span class="text-dim" style="font-size: 0.65rem;">PENDING</span>
            `,n.appendChild(t)}}}),document.querySelectorAll(`.btn-friend-action`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.action,n=e.dataset.name;t===`spectate`?o(`Connecting to ${n}'s match spectator slot...`):t===`invite`&&(o(`Invite sent to ${n}!`),e.textContent=`SENT`,e.disabled=!0)})})}}function a(){let e=document.querySelectorAll(`.countdown__segment`);if(e.length<3)return;let t=23,n=45,r=12;setInterval(()=>{r--,r<0&&(r=59,n--),n<0&&(n=59,t--),t<0&&(t=23,n=59,r=59),e[0].textContent=`${t}h`,e[1].textContent=`${n}m`,e[2].textContent=`${r}s`},1e3)}function o(e){let t=document.body,n=document.createElement(`div`);n.className=`glass-panel`,n.style.position=`fixed`,n.style.bottom=`20px`,n.style.right=`20px`,n.style.padding=`12px 24px`,n.style.background=`rgba(10, 22, 40, 0.9)`,n.style.border=`1px solid var(--cyan)`,n.style.borderRadius=`var(--radius-md)`,n.style.boxShadow=`0 0 15px rgba(0, 229, 255, 0.3)`,n.style.color=`var(--text-primary)`,n.style.fontFamily=`var(--font-heading)`,n.style.fontSize=`0.9rem`,n.style.zIndex=`9999`,n.style.transition=`opacity 0.3s ease, transform 0.3s ease`,n.style.transform=`translateY(20px)`,n.style.opacity=`0`,n.textContent=e,t.appendChild(n),requestAnimationFrame(()=>{n.style.opacity=`1`,n.style.transform=`translateY(0)`}),setTimeout(()=>{n.style.opacity=`0`,n.style.transform=`translateY(20px)`,setTimeout(()=>{n.remove()},300)},2500)}var s={assault:{name:`ASSAULT`,image:`/assets/characters/assault.png`,icon:`🔫`,character:`SGT. REAPER`,subtitle:`Frontline Combatant`,weapons:{primary:{name:`Assault Rifle`,damage:75,range:60,fireRate:80},secondary:{name:`Pistol`,damage:40,range:45,fireRate:90},melee:{name:`Combat Knife`},grenade:{name:`Frag Grenade`}}},medic:{name:`MEDIC`,image:`/assets/characters/medic.png`,icon:`💉`,character:`DR. VOSS`,subtitle:`Combat Medic`,weapons:{primary:{name:`SMG`,damage:55,range:40,fireRate:95},secondary:{name:`Heal Gun`,damage:10,range:50,fireRate:60},melee:{name:`Scalpel`},grenade:{name:`Smoke Grenade`}}},engineer:{name:`ENGINEER`,image:`/assets/characters/engineer.png`,icon:`🔧`,character:`CPL. TORQUE`,subtitle:`Tech Specialist`,weapons:{primary:{name:`Shotgun`,damage:90,range:25,fireRate:35},secondary:{name:`Pistol`,damage:40,range:45,fireRate:90},melee:{name:`Wrench`},grenade:{name:`Mine`}}},scout:{name:`SCOUT`,image:`/assets/characters/scout.png`,icon:`🎯`,character:`LT. SPECTRA`,subtitle:`Recon Operative`,weapons:{primary:{name:`Sniper Rifle`,damage:95,range:98,fireRate:20},secondary:{name:`Pistol`,damage:40,range:45,fireRate:90},melee:{name:`Combat Knife`},grenade:{name:`Flash Grenade`}}},heavy:{name:`HEAVY`,image:`/assets/characters/heavy.png`,icon:`🚀`,character:`MAJ. TITAN`,subtitle:`Heavy Weapons`,weapons:{primary:{name:`LMG`,damage:70,range:55,fireRate:92},secondary:{name:`Rocket Launcher`,damage:100,range:70,fireRate:10},melee:{name:`Combat Axe`},grenade:{name:`Frag Grenade`}}}},c=[`LOADOUT 1`,`LOADOUT 2`,`LOADOUT 3`];function l(e){return e.damage?`
    <div class="flex-col gap-xs" style="margin-top:6px">
      <div class="stat-bar">
        <span class="stat-bar__label">Damage</span>
        <div class="stat-bar__track">
          <div class="stat-bar__fill" style="width:${e.damage}%"></div>
        </div>
        <span class="font-mono text-cyan" style="font-size:0.7rem;min-width:28px;text-align:right">${e.damage}%</span>
      </div>
      <div class="stat-bar">
        <span class="stat-bar__label">Range</span>
        <div class="stat-bar__track">
          <div class="stat-bar__fill" style="width:${e.range}%"></div>
        </div>
        <span class="font-mono text-cyan" style="font-size:0.7rem;min-width:28px;text-align:right">${e.range}%</span>
      </div>
      <div class="stat-bar">
        <span class="stat-bar__label">Fire Rate</span>
        <div class="stat-bar__track">
          <div class="stat-bar__fill" style="width:${e.fireRate}%"></div>
        </div>
        <span class="font-mono text-cyan" style="font-size:0.7rem;min-width:28px;text-align:right">${e.fireRate}%</span>
      </div>
    </div>`:``}function u(e,t){return`
    <div class="weapon-slot" data-slot="${e.toLowerCase()}">
      <div class="flex-col" style="flex:1">
        <span class="weapon-slot__label">${e}</span>
        <span class="weapon-slot__name">${t.name}</span>
        ${l(t)}
      </div>
    </div>`}function d(e){return`
    <div class="flex-col flex-center gap-md" style="height:100%">
      <img src="${e.image}" style="height: 250px; object-fit: contain; filter: drop-shadow(0 0 24px rgba(0,229,255,0.35));" />
      <h2 class="text-cyan text-glow-cyan font-heading" style="font-size:1.75rem">${e.character}</h2>
      <span class="badge badge--cyan">${e.subtitle}</span>
      <span class="text-dim font-mono" style="font-size:0.7rem;letter-spacing:2px">CLASS: ${e.name}</span>
    </div>`}function f(){let e=s.assault,t=e.weapons;return`
    <div class="flex-col gap-lg" style="max-width:1200px;margin:0 auto;width:100%">

      <!-- Header -->
      <div class="flex items-center flex-between">
        <h1 class="font-heading text-cyan text-glow-cyan" style="font-size:1.6rem;letter-spacing:3px">⚔️ LOADOUT</h1>
        <div class="flex items-center gap-sm">
          <span class="currency currency--gold"><span class="currency__icon">🪙</span> 14,250</span>
          <span class="currency currency--gem"><span class="currency__icon">💎</span> 320</span>
        </div>
      </div>

      <!-- Loadout Tabs -->
      <div class="tab-bar" id="loadout-tabs">
        ${c.map((e,t)=>`<div class="tab-bar__item${t===0?` tab-bar__item--active`:``}" data-tab="${t}">${e}</div>`).join(``)}
      </div>

      <!-- Main Content: Character Preview + Weapons -->
      <div class="flex gap-lg" style="min-height:420px">

        <!-- Character Preview -->
        <div class="glass-panel flex-center" id="character-preview"
             style="flex:1;padding:var(--space-xl);position:relative;overflow:hidden">
          <!-- Decorative grid overlay -->
          <div style="position:absolute;inset:0;background:
            repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(0,229,255,0.04) 39px,rgba(0,229,255,0.04) 40px),
            repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(0,229,255,0.04) 39px,rgba(0,229,255,0.04) 40px);
            pointer-events:none"></div>
          ${d(e)}
        </div>

        <!-- Weapon Slots -->
        <div class="flex-col gap-md" id="weapon-slots" style="width:380px;flex-shrink:0">
          ${u(`PRIMARY`,t.primary)}
          ${u(`SECONDARY`,t.secondary)}
          ${u(`MELEE`,t.melee)}
          ${u(`GRENADE`,t.grenade)}
        </div>
      </div>

      <!-- Class Selector -->
      <div class="glass-panel flex-col gap-md" style="padding:var(--space-lg)">
        <div class="flex items-center flex-between">
          <h3 class="font-heading text-secondary" style="letter-spacing:2px">SELECT CLASS</h3>
          <button class="btn btn-primary btn-sm" id="btn-change-class">CHANGE CLASS</button>
        </div>

        <div class="flex flex-center gap-xl" id="class-selector">
          ${Object.entries(s).map(([e,t])=>`
            <div class="flex-col items-center gap-xs" data-class="${e}">
              <div class="class-icon${e===`assault`?` class-icon--active`:``}" data-class="${e}">
                <img src="${t.image}" style="width: 48px; height: 48px; object-fit: contain; border-radius: 4px;" />
              </div>
              <span class="class-icon__label">${t.name}</span>
            </div>
          `).join(``)}
        </div>
      </div>

    </div>`}function p(){let e=0,t=window.AeroStrikeActiveLoadout||`assault`;window.AeroStrikeActiveLoadout=t;let n=document.getElementById(`loadout-tabs`);n&&n.addEventListener(`click`,t=>{let r=t.target.closest(`.tab-bar__item`);if(!r)return;let i=Number(r.dataset.tab);i!==e&&(e=i,n.querySelectorAll(`.tab-bar__item`).forEach(e=>e.classList.toggle(`tab-bar__item--active`,Number(e.dataset.tab)===i)))});let r=document.getElementById(`class-selector`),i=document.getElementById(`character-preview`),a=document.getElementById(`weapon-slots`);function o(e){if(e===t)return;let n=s[e];n&&(t=e,window.AeroStrikeActiveLoadout=t,r.querySelectorAll(`.class-icon`).forEach(t=>t.classList.toggle(`class-icon--active`,t.dataset.class===e)),i.style.opacity=`0`,setTimeout(()=>{let e=i.querySelector(`div[style*="repeating-linear-gradient"]`);i.innerHTML=``,e&&i.appendChild(e),i.insertAdjacentHTML(`beforeend`,d(n)),i.style.opacity=`1`},180),a.style.opacity=`0`,setTimeout(()=>{a.innerHTML=[u(`PRIMARY`,n.weapons.primary),u(`SECONDARY`,n.weapons.secondary),u(`MELEE`,n.weapons.melee),u(`GRENADE`,n.weapons.grenade)].join(``),a.style.opacity=`1`},180))}r&&r.addEventListener(`click`,e=>{let t=e.target.closest(`[data-class]`);t&&o(t.dataset.class)}),a&&a.addEventListener(`mouseenter`,e=>{let t=e.target.closest(`.weapon-slot`);t&&(t.style.transition=`all 0.25s ease`)},!0);let c=document.getElementById(`btn-change-class`);c&&c.addEventListener(`click`,()=>{let e=Object.keys(s);o(e[(e.indexOf(t)+1)%e.length])}),i&&(i.style.transition=`opacity 0.18s ease`),a&&(a.style.transition=`opacity 0.18s ease`)}var m=45,h=650,g=1e3,_=[{icon:`🪙`,name:`500 Coins`},{icon:`🎨`,name:`Spray`},{icon:`📦`,name:`Crate`},{icon:`⭐`,name:`XP Boost`},{icon:`🔫`,name:`Weapon Skin`},{icon:`🪙`,name:`750 Coins`},{icon:`🎯`,name:`Reticle`},{icon:`📦`,name:`Rare Crate`},{icon:`⭐`,name:`2x XP Token`},{icon:`🔫`,name:`Camo Skin`},{icon:`🪙`,name:`1000 Coins`},{icon:`🎨`,name:`Tag Spray`},{icon:`📦`,name:`Supply Drop`},{icon:`⭐`,name:`XP Mega Boost`},{icon:`🔫`,name:`Arctic Skin`},{icon:`🪙`,name:`1500 Coins`},{icon:`🎯`,name:`Holo Sight`},{icon:`📦`,name:`Elite Crate`},{icon:`⭐`,name:`3x XP Token`},{icon:`🔫`,name:`Neon Skin`},{icon:`🪙`,name:`2000 Coins`},{icon:`🎨`,name:`Kill Spray`},{icon:`📦`,name:`Legend Crate`},{icon:`⭐`,name:`Season Boost`},{icon:`🔫`,name:`Plasma Skin`},{icon:`🪙`,name:`500 Coins`},{icon:`🎨`,name:`Graffiti`},{icon:`📦`,name:`Crate`},{icon:`⭐`,name:`XP Boost`},{icon:`🔫`,name:`Desert Skin`},{icon:`🪙`,name:`800 Coins`},{icon:`🎯`,name:`Red Dot`},{icon:`📦`,name:`Rare Crate`},{icon:`⭐`,name:`2x XP Token`},{icon:`🔫`,name:`Shadow Skin`},{icon:`🪙`,name:`1200 Coins`},{icon:`🎨`,name:`Emblem`},{icon:`📦`,name:`Supply Drop`},{icon:`⭐`,name:`XP Mega Boost`},{icon:`🔫`,name:`Chrome Skin`},{icon:`🪙`,name:`1800 Coins`},{icon:`🎯`,name:`Scope Skin`},{icon:`📦`,name:`Elite Crate`},{icon:`⭐`,name:`3x XP Token`},{icon:`🔫`,name:`Fire Skin`},{icon:`🪙`,name:`2500 Coins`},{icon:`🎨`,name:`Victory Spray`},{icon:`📦`,name:`Mega Crate`},{icon:`⭐`,name:`Ultimate Boost`},{icon:`🏆`,name:`Season Trophy`}],v=[{icon:`🎖️`,name:`Recon Skin`},{icon:`💎`,name:`200 Gems`},{icon:`🎭`,name:`Salute Emote`},{icon:`🔥`,name:`Epic Blaster`},{icon:`👑`,name:`Pilot Outfit`},{icon:`🎖️`,name:`Stealth Skin`},{icon:`💎`,name:`300 Gems`},{icon:`🎭`,name:`Taunt Emote`},{icon:`🔥`,name:`Epic Railgun`},{icon:`👑`,name:`Ace Outfit`},{icon:`🎖️`,name:`Viper Skin`},{icon:`💎`,name:`400 Gems`},{icon:`🎭`,name:`Dance Emote`},{icon:`🔥`,name:`Epic Launcher`},{icon:`👑`,name:`Shadow Outfit`},{icon:`🎖️`,name:`Ghost Skin`},{icon:`💎`,name:`500 Gems`},{icon:`🎭`,name:`Wave Emote`},{icon:`🔥`,name:`Epic Shotgun`},{icon:`👑`,name:`Titan Outfit`},{icon:`🎖️`,name:`Blaze Skin`},{icon:`💎`,name:`600 Gems`},{icon:`🎭`,name:`Flip Emote`},{icon:`🔥`,name:`Epic SMG`},{icon:`👑`,name:`Raptor Outfit`},{icon:`🎖️`,name:`Frost Skin`},{icon:`💎`,name:`250 Gems`},{icon:`🎭`,name:`Clap Emote`},{icon:`🔥`,name:`Epic Sniper`},{icon:`👑`,name:`Hawk Outfit`},{icon:`🎖️`,name:`Neon Skin`},{icon:`💎`,name:`350 Gems`},{icon:`🎭`,name:`Shrug Emote`},{icon:`🔥`,name:`Epic Pistol`},{icon:`👑`,name:`Falcon Outfit`},{icon:`🎖️`,name:`Crimson Skin`},{icon:`💎`,name:`450 Gems`},{icon:`🎭`,name:`Cheer Emote`},{icon:`🔥`,name:`Epic Rifle`},{icon:`👑`,name:`Storm Outfit`},{icon:`🎖️`,name:`Omega Skin`},{icon:`💎`,name:`550 Gems`},{icon:`🎭`,name:`GG Emote`},{icon:`🔥`,name:`Epic Cannon`},{icon:`👑`,name:`Phoenix Outfit`},{icon:`🎖️`,name:`Apex Skin`},{icon:`💎`,name:`800 Gems`},{icon:`🎭`,name:`Crown Emote`},{icon:`🔥`,name:`Legendary Blade`},{icon:`👑`,name:`Sky Hunter Set`}];function y(e){return e<m?`completed`:e===m?`active`:`locked`}function b(e,t){let n=y(e),r=`tier-card`;return t&&(r+=` tier-card--premium`),n===`active`&&(r+=` tier-card--active`),n===`locked`&&(r+=` tier-card--locked`),r}function x(e,t){let n=y(e)===`completed`?`<span class="bp-checkmark">✓</span>`:``;return`
    <div class="tier-card__icon">
      ${t.icon}
      ${n}
    </div>`}function S(e,t,n){return`
    <div class="${b(e,n)}" data-tier="${e}" data-track="${n?`premium`:`free`}" data-reward-name="${t.name}" data-reward-icon="${t.icon}">
      <div class="tier-card__number">${e}</div>
      ${x(e,t)}
      <div class="tier-card__reward">${t.name}</div>
    </div>`}function C(){let e=Math.round(h/g*100),t=``,n=``;for(let e=1;e<=50;e++)t+=S(e,_[e-1],!1),n+=S(e,v[e-1],!0);return`
<div class="bp-screen flex-col gap-lg">

  <!-- ===== HEADER ===== -->
  <div class="glass-panel bp-header flex flex-between items-center gap-lg">
    <div class="flex-col gap-xs">
      <h1 class="text-gold text-glow-gold font-heading">Season 1: Sky Hunter</h1>
      <p class="text-secondary font-heading" style="font-size:0.9rem;letter-spacing:2px;text-transform:uppercase">Battle Pass</p>
    </div>
    <div class="flex items-center gap-md">
      <div class="countdown">
        <span class="text-dim font-heading" style="margin-right:4px">ENDS IN</span>
        <span class="countdown__segment">54d</span>
        <span class="countdown__segment">12h</span>
        <span class="countdown__segment">23m</span>
      </div>
    </div>
  </div>

  <!-- ===== XP PROGRESS ===== -->
  <div class="glass-panel bp-xp-section flex items-center gap-lg">
    <div class="flex-col items-center gap-xs bp-tier-display">
      <span class="text-dim font-mono" style="font-size:0.65rem;letter-spacing:2px">CURRENT TIER</span>
      <span class="text-gold text-glow-gold font-mono bp-tier-number">${m}</span>
    </div>
    <div class="flex-col gap-xs" style="flex:1">
      <div class="flex flex-between items-center">
        <span class="text-secondary font-heading" style="font-size:0.85rem">TIER ${m} PROGRESS</span>
        <span class="font-mono text-gold" style="font-size:0.85rem">${h} / ${g} XP</span>
      </div>
      <div class="progress-bar progress-bar--gold progress-bar--xl">
        <div class="progress-bar__fill" style="width:${e}%"></div>
      </div>
      <div class="flex flex-between items-center">
        <span class="text-dim font-mono" style="font-size:0.65rem">${g-h} XP to Tier 46</span>
        <span class="badge badge--gold">${e}%</span>
      </div>
    </div>
  </div>

  <!-- ===== TIER TRACK ===== -->
  <div class="bp-track-wrapper glass-panel flex-col gap-sm">
    <div class="flex flex-between items-center bp-track-header">
      <div class="flex items-center gap-md">
        <h3 class="text-cyan font-heading">Tier Rewards</h3>
        <div class="tab-bar">
          <div class="tab-bar__item tab-bar__item--active" data-filter="all">All</div>
          <div class="tab-bar__item" data-filter="free">Free</div>
          <div class="tab-bar__item" data-filter="premium">Premium</div>
        </div>
      </div>
      <div class="flex items-center gap-sm">
        <button class="btn btn-ghost btn-sm bp-scroll-btn" data-dir="left">◀</button>
        <button class="btn btn-ghost btn-sm bp-scroll-btn" data-dir="right">▶</button>
      </div>
    </div>

    <div class="bp-track-scroll" id="bp-track-scroll">
      <!-- Free Row -->
      <div class="bp-track-label">
        <span class="badge badge--cyan">FREE</span>
      </div>
      <div class="bp-tier-row" id="bp-free-row">
        ${t}
      </div>

      <!-- Premium Row -->
      <div class="bp-track-label">
        <span class="badge badge--gold">PREMIUM 👑</span>
      </div>
      <div class="bp-tier-row" id="bp-premium-row">
        ${n}
      </div>
    </div>
  </div>

  <!-- ===== UPGRADE CTA ===== -->
  <div class="glass-panel glass-panel--gold bp-upgrade-section flex flex-between items-center">
    <div class="flex-col gap-xs">
      <h3 class="text-gold text-glow-gold font-heading">Unlock Premium Rewards</h3>
      <p class="text-secondary" style="font-size:0.85rem">Get exclusive skins, emotes, gems, and the legendary Sky Hunter outfit.</p>
    </div>
    <button class="btn btn-gold bp-upgrade-btn">
      👑 Upgrade Pass — 950 💎
    </button>
  </div>

  <!-- ===== REWARD DETAIL MODAL ===== -->
  <div class="modal-overlay" id="bp-reward-modal">
    <div class="modal">
      <div class="modal__header">
        <h3 class="modal__title" id="bp-modal-title">Reward Details</h3>
        <button class="modal__close" id="bp-modal-close">✕</button>
      </div>
      <div class="flex-col flex-center gap-md" id="bp-modal-body">
        <div class="bp-modal-icon" id="bp-modal-icon"></div>
        <div class="flex-col items-center gap-xs">
          <span class="font-heading text-gold" id="bp-modal-reward" style="font-size:1.25rem"></span>
          <span class="text-secondary font-mono" id="bp-modal-tier" style="font-size:0.8rem"></span>
          <span class="text-dim" id="bp-modal-track" style="font-size:0.75rem"></span>
        </div>
        <div id="bp-modal-status"></div>
      </div>
    </div>
  </div>
</div>

<style>
  /* ---- Battle Pass Layout ---- */
  .bp-screen {
    padding: var(--space-lg);
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }
  .bp-header {
    padding: var(--space-lg) var(--space-xl);
  }
  .bp-xp-section {
    padding: var(--space-lg) var(--space-xl);
  }
  .bp-tier-display {
    min-width: 100px;
    padding-right: var(--space-lg);
    border-right: 1px solid var(--border-default);
  }
  .bp-tier-number {
    font-size: 2.5rem;
    font-weight: 900;
    line-height: 1;
  }

  /* ---- Tier Track ---- */
  .bp-track-wrapper {
    padding: var(--space-md) var(--space-lg);
    overflow: hidden;
  }
  .bp-track-header {
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--border-default);
    margin-bottom: var(--space-sm);
  }
  .bp-track-scroll {
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: var(--space-sm);
    scroll-behavior: smooth;
  }
  .bp-track-label {
    padding: var(--space-xs) 0;
    position: sticky;
    left: 0;
    z-index: 2;
  }
  .bp-tier-row {
    display: flex;
    gap: var(--space-sm);
    padding: var(--space-xs) 0;
    min-width: max-content;
  }

  /* ---- Tier Card Extras ---- */
  .bp-checkmark {
    position: absolute;
    top: 2px;
    right: 4px;
    font-size: 0.65rem;
    color: var(--green);
    font-weight: 800;
    text-shadow: 0 0 6px var(--green-glow);
  }
  .tier-card__icon {
    position: relative;
  }
  .tier-card:hover {
    cursor: pointer;
  }
  .tier-card--active .tier-card__number {
    color: var(--cyan);
  }
  .tier-card--active .tier-card__reward {
    color: var(--cyan);
  }
  .tier-card--premium .tier-card__icon {
    background: rgba(255, 215, 0, 0.08);
  }
  .tier-card--premium.tier-card--active {
    border-color: var(--gold);
    box-shadow: 0 0 15px var(--gold-glow);
    background: rgba(255, 215, 0, 0.1);
  }

  /* ---- Upgrade Section ---- */
  .bp-upgrade-section {
    padding: var(--space-lg) var(--space-xl);
    border-color: var(--border-gold);
    background: linear-gradient(135deg, rgba(255,215,0,0.04) 0%, rgba(13,26,45,0.85) 100%);
  }

  /* ---- Modal Icon ---- */
  .bp-modal-icon {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5rem;
    background: rgba(0, 229, 255, 0.06);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-default);
  }
</style>`}function w(){let e=document.getElementById(`bp-track-scroll`),t=document.getElementById(`bp-reward-modal`),n=document.getElementById(`bp-modal-close`);requestAnimationFrame(()=>{let t=document.querySelector(`#bp-free-row .tier-card--active`);if(t&&e){let n=t.offsetLeft-e.offsetWidth/2+t.offsetWidth/2;e.scrollTo({left:Math.max(0,n),behavior:`smooth`})}}),document.querySelectorAll(`.bp-scroll-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.dir;e.scrollBy({left:n===`right`?400:-400,behavior:`smooth`})})}),e&&e.addEventListener(`wheel`,t=>{Math.abs(t.deltaY)>Math.abs(t.deltaX)&&(t.preventDefault(),e.scrollLeft+=t.deltaY)},{passive:!1}),document.querySelectorAll(`.tier-card`).forEach(e=>{e.addEventListener(`click`,()=>{let n=parseInt(e.dataset.tier),r=e.dataset.track,i=e.dataset.rewardName,a=e.dataset.rewardIcon,o=y(n);document.getElementById(`bp-modal-title`).textContent=`Tier ${n} Reward`,document.getElementById(`bp-modal-icon`).textContent=a,document.getElementById(`bp-modal-reward`).textContent=i,document.getElementById(`bp-modal-tier`).textContent=`TIER ${n}`,document.getElementById(`bp-modal-track`).textContent=r===`premium`?`👑 Premium Track`:`Free Track`;let s=document.getElementById(`bp-modal-status`);o===`completed`?s.innerHTML=`<span class="badge badge--green">✓ CLAIMED</span>`:o===`active`?s.innerHTML=`<span class="badge badge--cyan">▶ IN PROGRESS</span>`:s.innerHTML=`<span class="badge badge--red">🔒 LOCKED — Tier ${n}</span>`,t.classList.add(`modal-overlay--visible`)})}),n&&n.addEventListener(`click`,()=>{t.classList.remove(`modal-overlay--visible`)}),t&&t.addEventListener(`click`,e=>{e.target===t&&t.classList.remove(`modal-overlay--visible`)}),document.querySelectorAll(`.bp-track-wrapper .tab-bar__item`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.bp-track-wrapper .tab-bar__item`).forEach(e=>e.classList.remove(`tab-bar__item--active`)),e.classList.add(`tab-bar__item--active`);let t=e.dataset.filter,n=document.getElementById(`bp-free-row`),r=document.getElementById(`bp-premium-row`),i=n?.previousElementSibling,a=r?.previousElementSibling;t===`free`?(n.style.display=`flex`,r.style.display=`none`,i&&(i.style.display=``),a&&(a.style.display=`none`)):t===`premium`?(n.style.display=`none`,r.style.display=`flex`,i&&(i.style.display=`none`),a&&(a.style.display=``)):(n.style.display=`flex`,r.style.display=`flex`,i&&(i.style.display=``),a&&(a.style.display=``))})}),document.querySelector(`.bp-upgrade-btn`)?.addEventListener(`click`,()=>{alert(`Premium Battle Pass upgraded! 🎉 All premium rewards are now unlocked.`)})}var T=[{name:`Bronze`,icon:`🛡️`,color:`#cd7f32`,divisions:[`I`,`II`,`III`]},{name:`Silver`,icon:`⚙️`,color:`#c0c0c0`,divisions:[`I`,`II`,`III`]},{name:`Gold`,icon:`🏅`,color:`#ffd700`,divisions:[`I`,`II`,`III`]},{name:`Platinum`,icon:`⚔️`,color:`#00e5ff`,divisions:[`I`,`II`,`III`]},{name:`Diamond`,icon:`💎`,color:`#b9f2ff`,divisions:[`I`,`II`,`III`]},{name:`Master`,icon:`👑`,color:`#a855f7`,divisions:[`I`,`II`,`III`]},{name:`Grandmaster`,icon:`🔱`,color:`#ff2d55`,divisions:[`I`]}],E=[{id:`tdm`,name:`Team Deathmatch`,icon:`👥`},{id:`ffa`,name:`Free For All`,icon:`💀`},{id:`dom`,name:`Domination`,icon:`🚩`},{id:`snd`,name:`Search & Destroy`,icon:`💣`}],D=[{result:`W`,kills:18,deaths:5,map:`Skybridge`,mode:`TDM`},{result:`W`,kills:22,deaths:8,map:`Reactor`,mode:`TDM`},{result:`L`,kills:9,deaths:12,map:`Outpost`,mode:`TDM`},{result:`W`,kills:15,deaths:6,map:`Skybridge`,mode:`TDM`},{result:`W`,kills:20,deaths:7,map:`Hangar Bay`,mode:`TDM`}];function O(){return`
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
            PLATINUM III
          </h1>
        </div>

        <!-- Rank Progress -->
        <div class="flex-col gap-xs w-full" style="max-width:420px;">
          <div class="flex flex-between items-center">
            <span class="font-mono text-secondary" style="font-size:.75rem;">RANK POINTS</span>
            <span class="font-mono text-cyan" style="font-size:.85rem;">${3700 .toLocaleString()} / ${5e3.toLocaleString()}</span>
          </div>
          <div class="progress-bar progress-bar--lg">
            <div class="progress-bar__fill" style="width:74%;"></div>
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
          ${E.map((e,t)=>`
            <div class="ranked-mode-option flex items-center gap-md ${t===0?`ranked-mode-option--active`:``}"
                 data-mode="${e.id}"
                 style="padding:12px var(--space-md);border-radius:var(--radius-md);cursor:pointer;
                        border:1px solid ${t===0?`var(--cyan)`:`var(--border-default)`};
                        background:${t===0?`rgba(0,229,255,0.08)`:`rgba(13,26,45,0.5)`};
                        transition:all var(--transition-normal);">
              <span style="font-size:1.4rem;">${e.icon}</span>
              <span class="font-heading ${t===0?`text-cyan`:`text-secondary`}"
                    style="font-size:1.05rem;font-weight:600;letter-spacing:1px;flex:1;">
                ${e.name}
              </span>
              ${t===0?`<span class="badge badge--cyan">SELECTED</span>`:``}
            </div>
          `).join(``)}
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
            ${D.map(e=>`
              <div class="glass-panel flex-col items-center gap-xs"
                   style="padding:var(--space-sm) var(--space-md);min-width:120px;flex:1;
                          border-color:${e.result===`W`?`rgba(0,255,136,0.25)`:`rgba(255,45,85,0.25)`};">
                <div class="flex items-center gap-sm">
                  <span style="width:10px;height:10px;border-radius:50%;
                               background:${e.result===`W`?`var(--green)`:`var(--red)`};
                               box-shadow:0 0 8px ${e.result===`W`?`var(--green-glow)`:`var(--red-glow)`};"></span>
                  <span class="font-heading ${e.result===`W`?`text-green`:`text-red`}"
                        style="font-weight:700;font-size:.9rem;">${e.result===`W`?`VICTORY`:`DEFEAT`}</span>
                </div>
                <span class="font-mono text-secondary" style="font-size:.7rem;">${e.kills}/${e.deaths} — ${e.map}</span>
              </div>
            `).join(``)}
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
            ${T.map((e,t)=>{let n=e.name===`Platinum`,r=t>3,i=k(e.name);return`
                <div class="flex items-center gap-md"
                     style="padding:var(--space-sm) var(--space-md);border-radius:var(--radius-md);
                            border:1px solid ${n?`var(--cyan)`:`var(--border-default)`};
                            background:${n?`rgba(0,229,255,0.08)`:`rgba(13,26,45,0.5)`};
                            opacity:${r?`0.5`:`1`};">
                  <span style="font-size:1.6rem;min-width:36px;text-align:center;">${e.icon}</span>
                  <div class="flex-col" style="flex:1;">
                    <span class="font-heading" style="font-weight:700;font-size:.95rem;color:${e.color};">
                      ${e.name}
                    </span>
                    <span class="font-mono text-dim" style="font-size:.65rem;">${i}</span>
                  </div>
                  ${n?`<span class="badge badge--cyan">CURRENT</span>`:r?`<span class="badge badge--red">🔒 LOCKED</span>`:`<span class="badge badge--green">✓ CLAIMED</span>`}
                </div>
              `}).join(``)}
          </div>
        </div>
      </div>

    </div>
  `}function k(e){return{Bronze:`Title: "Recruit" + 100 Gems`,Silver:`Silver Banner + 200 Gems`,Gold:`Gold Weapon Skin + 350 Gems`,Platinum:`Platinum Frame + 500 Gems`,Diamond:`Diamond Frame + 750 Gems + Jetpack Trail`,Master:`Master Emblem + 1000 Gems + Legendary Camo`,Grandmaster:`Grandmaster Title + 2000 Gems + Exclusive Skin`}[e]||``}function A(){let e=document.getElementById(`ranked-mode-list`);e&&e.addEventListener(`click`,t=>{let n=t.target.closest(`.ranked-mode-option`);if(!n)return;e.querySelectorAll(`.ranked-mode-option`).forEach(e=>{e.classList.remove(`ranked-mode-option--active`),e.style.borderColor=`var(--border-default)`,e.style.background=`rgba(13,26,45,0.5)`;let t=e.querySelector(`.font-heading`);t&&(t.classList.remove(`text-cyan`),t.classList.add(`text-secondary`));let n=e.querySelector(`.badge`);n&&n.remove()}),n.classList.add(`ranked-mode-option--active`),n.style.borderColor=`var(--cyan)`,n.style.background=`rgba(0,229,255,0.08)`;let r=n.querySelector(`.font-heading`);r&&(r.classList.remove(`text-secondary`),r.classList.add(`text-cyan`));let i=document.createElement(`span`);i.className=`badge badge--cyan`,i.textContent=`SELECTED`,n.appendChild(i)});let t=document.getElementById(`btn-view-rewards`),n=document.getElementById(`ranked-rewards-modal`),r=document.getElementById(`ranked-modal-close`);t&&n&&t.addEventListener(`click`,()=>{n.classList.add(`modal-overlay--visible`)}),r&&n&&r.addEventListener(`click`,()=>{n.classList.remove(`modal-overlay--visible`)}),n&&n.addEventListener(`click`,e=>{e.target===n&&n.classList.remove(`modal-overlay--visible`)});let i=document.getElementById(`ranked-emblem`);if(i){let e=document.createElement(`div`);e.className=`rank-emblem__ring`,e.style.animationDirection=`reverse`,e.style.animationDuration=`15s`,e.style.opacity=`0.15`,e.style.inset=`-8px`,i.appendChild(e),i.addEventListener(`mouseenter`,()=>{let e=i.querySelector(`.rank-emblem__glow`);e&&(e.style.animationDuration=`0.8s`)}),i.addEventListener(`mouseleave`,()=>{let e=i.querySelector(`.rank-emblem__glow`);e&&(e.style.animationDuration=`3s`)})}let a=document.getElementById(`btn-play-ranked`);a&&a.addEventListener(`click`,()=>{a.textContent=`🔍 SEARCHING...`,a.style.pointerEvents=`none`,a.style.opacity=`0.7`,setTimeout(()=>{a.innerHTML=`⚔️ PLAY RANKED`,a.style.pointerEvents=``,a.style.opacity=``},3e3)})}function ee(){return`
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
  `}function te(){let e=document.getElementById(`hud-health-fill`),t=document.getElementById(`hud-health-text`),n=document.getElementById(`hud-fuel-fill`),r=document.getElementById(`hud-fuel-text`),i=75,a=60,o=-1,s=-1,c=setInterval(()=>{i+=o*(Math.random()*3+.5),i<=20&&(i=20,o=1),i>=100&&(i=100,o=-1),a+=s*(Math.random()*2+.3),a<=10&&(a=10,s=1),a>=90&&(a=90,s=-1);let c=Math.round(i),l=Math.round(a);e&&(e.style.width=c+`%`,t.textContent=c,c<30?t.style.color=`var(--red)`:t.style.color=`var(--green)`),n&&(n.style.width=l+`%`,r.textContent=l)},800),l=165,u=document.getElementById(`hud-timer`),d=setInterval(()=>{l<=0&&(l=300),l--;let e=String(Math.floor(l/60)).padStart(2,`0`),t=String(l%60).padStart(2,`0`);u&&(u.textContent=`${e}:${t}`)},1e3),f=document.getElementById(`hud-kill-feed`),p=[{killer:`AceHunter`,weapon:`🔫`,victim:`NightHawk`},{killer:`PlayerOne`,weapon:`💥`,victim:`ShadowX`},{killer:`SkyLord`,weapon:`🔫`,victim:`DarkBlade`},{killer:`Phoenix`,weapon:`🚀`,victim:`GhostRider`},{killer:`PlayerOne`,weapon:`🔫`,victim:`StormBreak`},{killer:`Viper`,weapon:`💥`,victim:`PlayerOne`},{killer:`NightHawk`,weapon:`⚡`,victim:`AceHunter`},{killer:`ShadowX`,weapon:`🔫`,victim:`SkyLord`},{killer:`PlayerOne`,weapon:`🚀`,victim:`Viper`},{killer:`DarkBlade`,weapon:`🔫`,victim:`Phoenix`}],m=3,h=setInterval(()=>{if(!f)return;let e=p[m%p.length];m++;let t=document.createElement(`div`);t.className=`kill-feed__entry`,t.innerHTML=`
      <span class="kill-feed__killer">${e.killer}</span>
      <span class="kill-feed__weapon">${e.weapon}</span>
      <span class="kill-feed__victim">${e.victim}</span>
    `,f.appendChild(t);let n=Array.from(f.children).filter(e=>!e.classList.contains(`killing`));if(n.length>4)for(let e=0;e<n.length-4;e++){let t=n[e];t.classList.add(`killing`),t.style.opacity=`0`,t.style.transform=`translateX(50px)`,t.style.transition=`all 0.3s ease`,setTimeout(()=>t.remove(),300)}},3500),g=[{id:`dot-ally1`,x:35,y:40},{id:`dot-ally2`,x:45,y:60},{id:`dot-ally3`,x:55,y:30},{id:`dot-enemy1`,x:70,y:25},{id:`dot-enemy2`,x:75,y:65},{id:`dot-enemy3`,x:80,y:45}],_=setInterval(()=>{g.forEach(e=>{e.x+=(Math.random()-.5)*4,e.y+=(Math.random()-.5)*4,e.x=Math.max(10,Math.min(90,e.x)),e.y=Math.max(10,Math.min(90,e.y));let t=document.getElementById(e.id);t&&(t.style.left=e.x+`%`,t.style.top=e.y+`%`,t.style.transition=`left 0.8s ease, top 0.8s ease`)})},1e3),v=[];document.querySelectorAll(`.ability-icon`).forEach(e=>{let t=parseInt(e.dataset.cooldown)||0,n=e.querySelector(`.ability-cd-text`),r=setInterval(()=>{t>0?(t--,n&&(n.textContent=t>0?t:``,n.style.display=t>0?`block`:`none`),t===0&&(e.style.opacity=`1`,e.style.borderColor=`var(--cyan)`,e.style.background=`rgba(0,229,255,0.15)`,e.style.boxShadow=`0 0 12px var(--cyan-glow)`,setTimeout(()=>{e.style.boxShadow=`none`},1500))):Math.random()<.1&&(t=parseInt(e.dataset.max)||10,e.style.opacity=`0.6`,e.style.borderColor=`var(--text-dim)`,e.style.background=`rgba(255,107,0,0.1)`,n&&(n.textContent=t,n.style.display=`block`))},1e3);v.push(r)});let y=document.getElementById(`hud-container`);y&&(y._hudCleanup=()=>{clearInterval(c),clearInterval(d),clearInterval(h),clearInterval(_),v.forEach(clearInterval)})}function j(){return`
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
  `}function ne(){let e=document.getElementById(`br-alert`),t=!0,n=setInterval(()=>{e&&(t=!t,e.style.opacity=t?`1`:`0.4`,e.style.transition=`opacity 0.5s ease`)},1e3),r=document.getElementById(`br-alive-count`),i=12,a=setInterval(()=>{!r||i<=1||Math.random()<.4&&(i--,r.textContent=i,r.style.color=`var(--red)`,r.style.transition=`color 0.15s ease`,setTimeout(()=>{r&&(r.style.color=`var(--orange)`)},400))},3e3),o=document.getElementById(`br-zone-timer`),s=90,c=setInterval(()=>{o&&(s<=0&&(s=120),s--,o.textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,`0`)}`,s<=15?(o.style.color=`var(--red)`,o.style.textShadow=`0 0 8px rgba(255,45,85,0.6)`):s<=30?(o.style.color=`var(--orange)`,o.style.textShadow=`0 0 6px rgba(255,107,0,0.4)`):(o.style.color=`var(--red)`,o.style.textShadow=`none`))},1e3),l=[{id:`lb-score-1`,score:12},{id:`lb-score-2`,score:8},{id:`lb-score-3`,score:6},{id:`lb-score-4`,score:5},{id:`lb-score-5`,score:4}],u=setInterval(()=>{let e=Math.floor(Math.random()*l.length);l[e].score++;let t=document.getElementById(l[e].id);if(t&&(t.textContent=l[e].score,t.style.color=`var(--gold)`,t.style.transition=`color 0.15s ease`,setTimeout(()=>{t&&(t.style.color=`var(--cyan)`)},500)),e===0){let e=document.getElementById(`br-kill-count`);e&&(e.textContent=l[0].score)}[...l].sort((e,t)=>t.score-e.score).forEach((e,t)=>{let n=document.getElementById(e.id);n&&(n.textContent=e.score)})},4e3),d=document.querySelectorAll(`#br-inventory .weapon-slot`);d.forEach((e,t)=>{e.addEventListener(`click`,()=>{d.forEach(e=>{e.style.borderColor=`var(--border-default)`,e.style.boxShadow=`none`,e.style.opacity=`0.7`}),e.style.borderColor=`var(--cyan)`,e.style.boxShadow=`0 0 10px var(--cyan-glow)`,e.style.opacity=`1`})});let f=document.getElementById(`br-container`);f&&(f._brCleanup=()=>{clearInterval(n),clearInterval(a),clearInterval(c),clearInterval(u)})}var M=.4,N=-.7,P=4,F=10,I=100,L=.15,R=.5,z=8,B=3,V=[{width:960,height:540,platforms:[{x:0,y:500,width:960,height:40},{x:200,y:400,width:40,height:100},{x:720,y:400,width:40,height:100},{x:0,y:320,width:160,height:16},{x:800,y:320,width:160,height:16},{x:360,y:340,width:240,height:16},{x:220,y:220,width:140,height:16},{x:600,y:220,width:140,height:16},{x:430,y:120,width:100,height:16},{x:0,y:150,width:80,height:16},{x:880,y:150,width:80,height:16}]},{width:960,height:540,platforms:[{x:0,y:500,width:960,height:40},{x:250,y:440,width:30,height:60},{x:680,y:440,width:30,height:60},{x:330,y:380,width:300,height:16},{x:40,y:300,width:200,height:16},{x:720,y:300,width:200,height:16},{x:380,y:200,width:200,height:16},{x:80,y:140,width:120,height:16},{x:760,y:140,width:120,height:16}]},{width:3e3,height:1500,platforms:[{x:0,y:1460,width:3e3,height:40},{x:0,y:0,width:40,height:1500},{x:2960,y:0,width:40,height:1500},{x:0,y:0,width:3e3,height:40},{x:300,y:1300,width:600,height:40},{x:1100,y:1300,width:800,height:40},{x:2100,y:1300,width:600,height:40},{x:300,y:1100,width:40,height:200},{x:860,y:1100,width:40,height:240},{x:1300,y:1e3,width:400,height:40},{x:2100,y:900,width:40,height:400},{x:2300,y:1100,width:400,height:40},{x:100,y:900,width:500,height:40},{x:800,y:900,width:300,height:40},{x:600,y:600,width:40,height:340},{x:1200,y:700,width:600,height:40},{x:1480,y:400,width:40,height:300},{x:2e3,y:600,width:700,height:40},{x:2400,y:300,width:40,height:300},{x:300,y:500,width:400,height:40},{x:900,y:400,width:400,height:40},{x:100,y:250,width:600,height:40},{x:1800,y:250,width:800,height:40},{x:2e3,y:50,width:40,height:200}]}],H=new Image;H.src=`/assets/backgrounds/bg_foundry.png`;var U=new Image;U.src=`/assets/backgrounds/bg_arena.png`;var W=new Image;W.src=`/assets/backgrounds/bg_maze.png`;var G=new Image;G.src=`/assets/characters/assault.png`;var K=new Image;K.src=`/assets/characters/scout.png`;var q={bg:`#060a14`,bgGradient1:`#0a1020`,bgGradient2:`#0d1a2d`,platform:`#1a2a42`,platformTop:`#00e5ff`,platformGlow:`rgba(0, 229, 255, 0.1)`,player:`#00e5ff`,playerBody:`#1a3a5c`,jetpackFlame:`#ff6b00`,jetpackFlame2:`#ffaa00`,bullet:`#00e5ff`,bulletGlow:`rgba(0, 229, 255, 0.5)`,enemy:`#ff2d55`,enemyBody:`#5c1a2a`,healthBar:`#00ff88`,healthBarBg:`rgba(255,255,255,0.1)`,fuelBar:`#00e5ff`,fuelBarBg:`rgba(255,255,255,0.1)`,particle:`#ff6b00`,star:`rgba(255,255,255,0.3)`,text:`#e8ecf4`,textDim:`#4a5568`,gold:`#ffd700`,damage:`#ff2d55`},J=class{constructor(e,t,n,r,i,a,o){this.x=e,this.y=t,this.vx=n,this.vy=r,this.color=i,this.life=a,this.maxLife=a,this.size=o}update(){return this.x+=this.vx,this.y+=this.vy,this.vy+=.1,this.life--,this.life>0}draw(e){e.globalAlpha=this.life/this.maxLife,e.fillStyle=this.color,e.fillRect(this.x-this.size/2,this.y-this.size/2,this.size,this.size),e.globalAlpha=1}},Y=class{constructor(e,t,n,r=!1,i=`normal`,a=1){this.x=e,this.y=t,this.dir=n,this.type=i,this.isEnemy=r,this.ownerId=a,this.life=60,this.width=12,this.height=3,i===`shotgun`?(this.vx=n*(8+Math.random()*2),this.vy=(Math.random()-.5)*4,this.life=25,this.width=6,this.height=2):i===`rocket`?(this.vx=n*6,this.vy=0,this.life=80,this.width=16,this.height=6):i===`sniper`?(this.vx=n*20,this.vy=0,this.life=40,this.width=24,this.height=2):(this.vx=n*F,this.vy=i===`smg`?(Math.random()-.5)*1.5:0)}update(){return this.x+=this.vx,this.y+=this.vy,this.life--,this.life>0}draw(e){let t=this.isEnemy?q.enemy:q.bullet;e.shadowColor=this.isEnemy?`rgba(255,45,85,0.5)`:q.bulletGlow,e.shadowBlur=8,e.fillStyle=t,this.type===`rocket`?(e.fillStyle=`#ff6b00`,e.fillRect(this.x,this.y-3,this.width,this.height),Math.random()>.5&&(e.fillStyle=`#fff`,e.fillRect(this.dir===1?this.x-4:this.x+this.width,this.y,4,4))):e.fillRect(this.x,this.y-1,this.width,this.height),e.shadowBlur=0}},X=class{constructor(e,t,n){this.x=e,this.y=t,this.type=n,this.width=24,this.height=24,this.vy=-2,this.life=900}update(e){this.life--,this.vy+=.4,this.vy>8&&(this.vy=8),this.y+=this.vy;for(let t of e)this.x+this.width>t.x&&this.x<t.x+t.width&&this.y+this.height>t.y&&this.y+this.height<t.y+t.height+10&&this.vy>=0&&(this.y=t.y-this.height,this.vy=0);return this.life>0}draw(e){e.globalAlpha=this.life<120&&this.life%10<5?.3:1,e.font=`20px sans-serif`,this.type===`health`&&e.fillText(`🟢`,this.x,this.y+20),this.type===`fuel`&&e.fillText(`🔵`,this.x,this.y+20),this.type===`overdrive`&&e.fillText(`⚡`,this.x,this.y+20),e.globalAlpha=1}},re=class{constructor(e,t,n,r=1){this.x=e,this.y=t,this.vx=n*6,this.vy=-4,this.width=8,this.height=8,this.timer=120,this.exploded=!1,this.ownerId=r}update(e,t){if(this.timer--,this.timer<=0){this.exploded=!0;for(let e=0;e<30;e++)t.push(new J(this.x,this.y,(Math.random()-.5)*10,(Math.random()-.5)*10,Math.random()>.5?q.jetpackFlame:q.damage,30+Math.random()*20,5));return!1}this.vy+=.4,this.x+=this.vx,this.y+=this.vy;for(let t of e)this.x+this.width>t.x&&this.x<t.x+t.width&&this.y+this.height>t.y&&this.y+this.height<t.y+t.height+10&&this.vy>=0&&(this.y=t.y-this.height,this.vy*=-.5,this.vx*=.8);return!0}draw(e){e.fillStyle=this.timer%10<5?`#fff`:`#ff2d55`,e.beginPath(),e.arc(this.x+4,this.y+4,4,0,Math.PI*2),e.fill()}},Z=class{constructor(e,t,n){this.x=e,this.y=t,this.width=24,this.height=32,this.vy=0,this.vx=0,this.hp=3,this.maxHp=3,this.dir=-1,this.shootTimer=0,this.shootInterval=90+Math.random()*60,this.patrolTimer=0,this.patrolDir=1,this.onGround=!1,this.platforms=n,this.jetpacking=!1,this.fuel=I,this.hitFlash=0,this.alive=!0}update(e,t,n,r){if(!this.alive)return!1;if(this.dir=e>this.x?1:-1,this.patrolTimer++,this.patrolTimer>120&&(this.patrolDir*=-1,this.patrolTimer=0),this.vx=this.patrolDir*1.5,t-this.y<-60&&this.fuel>30&&Math.random()<.03&&(this.jetpacking=!0),this.jetpacking){this.vy+=N*.7,this.fuel-=R,(this.fuel<=0||this.y<t-20)&&(this.jetpacking=!1);for(let e=0;e<2;e++)r.push(new J(this.x+this.width/2+(Math.random()-.5)*6,this.y+this.height,(Math.random()-.5)*2,Math.random()*3+1,Math.random()>.5?q.jetpackFlame:q.jetpackFlame2,15+Math.random()*10,3))}else this.fuel=Math.min(I,this.fuel+L);this.vy+=M,this.vy>z&&(this.vy=z),this.x+=this.vx,this.y+=this.vy,this.x<0&&(this.x=0,this.patrolDir=1);let i=this.platforms&&this.platforms[0]?this.platforms[0].width:3e3;this.x+this.width>i&&(this.x=i-this.width,this.patrolDir=-1),this.onGround=!1;for(let e of this.platforms)this.x+this.width>e.x&&this.x<e.x+e.width&&this.y+this.height>e.y&&this.y+this.height<e.y+e.height+10&&this.vy>=0&&(this.y=e.y-this.height,this.vy=0,this.onGround=!0,this.jetpacking=!1);if(this.shootTimer++,this.shootTimer>=this.shootInterval){this.shootTimer=0;let e=this.dir===1?this.x+this.width:this.x;n.push(new Y(e,this.y+this.height/2,this.dir,!0))}return this.hitFlash>0&&this.hitFlash--,this.alive}takeDamage(e){this.hp--,this.hitFlash=8;for(let t=0;t<8;t++)e.push(new J(this.x+this.width/2,this.y+this.height/2,(Math.random()-.5)*6,(Math.random()-.5)*6,q.damage,20,3));if(this.hp<=0){this.alive=!1;for(let t=0;t<20;t++)e.push(new J(this.x+this.width/2,this.y+this.height/2,(Math.random()-.5)*8,(Math.random()-.5)*8,Math.random()>.5?q.enemy:q.jetpackFlame,30+Math.random()*20,4))}}draw(e){if(!this.alive)return;if(K.complete&&K.naturalHeight!==0){let t=this.width*2.2,n=this.height*1.8;e.save(),this.hitFlash>0&&(e.filter=`brightness(200%)`),this.dir===-1?(e.scale(-1,1),e.drawImage(K,-(this.x+this.width+(t-this.width)/2),this.y-(n-this.height),t,n)):e.drawImage(K,this.x-(t-this.width)/2,this.y-(n-this.height),t,n),e.restore()}else{e.fillStyle=this.hitFlash>0?`#fff`:q.enemyBody,e.fillRect(this.x+2,this.y+8,this.width-4,this.height-8),e.fillStyle=this.hitFlash>0?`#fff`:q.enemy,e.beginPath(),e.arc(this.x+this.width/2,this.y+8,10,0,Math.PI*2),e.fill(),e.fillStyle=`#1a0a15`,e.fillRect(this.x+6,this.y+4,12,6),e.fillStyle=q.enemy,e.fillRect(this.x+7,this.y+5,10,4),e.fillStyle=`#4a1a2a`,e.fillRect(this.x+this.width-4,this.y+10,6,14),e.fillStyle=`#666`;let t=this.dir===1?this.x+this.width:this.x-10;e.fillRect(t,this.y+14,10,4)}let t=this.x+this.width/2-30/2;e.fillStyle=q.healthBarBg,e.fillRect(t,this.y-8,30,3),e.fillStyle=q.damage,e.fillRect(t,this.y-8,30*(this.hp/this.maxHp),3)}},ie=class{constructor(e){this.canvas=e,this.ctx=e.getContext(`2d`),this.width=960,this.height=540,this.canvas.width=this.width,this.canvas.height=this.height;let t=window.AeroStrikeActiveLoadout||`assault`;this.currentMapIndex=0;let n=V[this.currentMapIndex];this.mapWidth=n.width,this.mapHeight=n.height,this.platforms=n.platforms,this.camera={x:0,y:0},this.players=[this.createPlayer(1,100,200,t),this.createPlayer(2,800,200,`heavy`)],this.bullets=[],this.grenadesList=[],this.pickups=[],this.particles=[],this.enemies=[],this.stars=[],this.keys={},this.gameOver=!1,this.score=0,this.wave=1,this.enemiesSpawned=0,this.maxEnemiesPerWave=3,this.spawnTimer=0,this.damageNumbers=[],this.screenShake=0,this.gameTime=0;for(let e=0;e<50;e++)this.stars.push({x:Math.random()*this.width,y:Math.random()*this.height*.8,size:Math.random()*2+.5,alpha:Math.random()*.5+.1,twinkle:Math.random()*Math.PI*2});this.setupInput(),this.spawnWave()}setupInput(){window.addEventListener(`keydown`,e=>{this.keys[e.key.toLowerCase()]=!0,[`w`,`a`,`s`,`d`,` `,`arrowup`,`arrowdown`,`arrowleft`,`arrowright`].includes(e.key.toLowerCase())&&e.preventDefault()}),window.addEventListener(`keyup`,e=>{this.keys[e.key.toLowerCase()]=!1})}spawnWave(){this.enemiesSpawned=0,this.maxEnemiesPerWave=2+this.wave,this.spawnTimer=0}spawnDebugEnemy(e,t){this.enemies.push(new Z(e,t,this.platforms))}spawnDebugPickup(e,t,n){this.pickups.push(new X(e,t,n))}spawnEnemy(){let e=[{x:80,y:80},{x:850,y:80},{x:480,y:100},{x:80,y:250},{x:850,y:250},{x:480,y:400}],t=e[0],n=0;for(let r of e){let e=this.players[0],i=r.x-e.x,a=r.y-e.y,o=Math.sqrt(i*i+a*a);o>n&&(n=o,t=r)}this.enemies.push(new Z(t.x,t.y,this.platforms)),this.enemiesSpawned++}createPlayer(e,t,n,r){return{id:e,x:t,y:n,width:24,height:32,vx:0,vy:0,dir:e===1?1:-1,hp:r===`heavy`?8:r===`scout`?3:5,maxHp:r===`heavy`?8:r===`scout`?3:5,fuel:I,kills:0,onGround:!1,jetpacking:!1,shootCooldown:0,hitFlash:0,invincible:0,classId:r,baseCooldown:r===`scout`?30:r===`heavy`?25:r===`medic`?8:12,grenades:3,overdrive:0,dashCooldown:0,isDashing:0,wallSliding:!1}}update(){if(!this.gameOver){this.gameTime++;for(let e of this.players){if(e.hp<=0)continue;let t=e.id===1,n=t?this.keys.a:this.keys.arrowleft,r=t?this.keys.d:this.keys.arrowright,i=t?this.keys.w||this.keys[` `]:this.keys.arrowup,a=t?this.keys.shift:this.keys[`/`],o=t?this.keys.g:this.keys[`.`],s=t?this.keys.f||this.keys.enter:this.keys.enter||this.keys[`'`];if(e.vx=0,e.dashCooldown>0&&e.dashCooldown--,e.isDashing>0?(e.isDashing--,e.vx=e.dir*(P*3),e.vy=0,this.particles.push(new J(e.x+e.width/2,e.y+e.height/2,0,0,q.bullet,10,8))):(n&&(e.vx=-4,e.dir=-1),r&&(e.vx=P,e.dir=1),a&&e.dashCooldown<=0&&e.fuel>=10&&(e.isDashing=8,e.dashCooldown=40,e.fuel-=10,this.screenShake=3)),e.jetpacking=i&&e.fuel>0,e.jetpacking){e.vy+=N,e.fuel-=R,e.fuel<0&&(e.fuel=0);for(let t=0;t<B;t++)this.particles.push(new J(e.x+e.width/2+(Math.random()-.5)*8,e.y+e.height,(Math.random()-.5)*3,Math.random()*4+2,Math.random()>.4?q.jetpackFlame:q.jetpackFlame2,20+Math.random()*15,3+Math.random()*2))}else e.fuel=Math.min(I,e.fuel+L);e.vy+=M,e.vy>z&&(e.vy=z),e.x+=e.vx,e.y+=e.vy,e.onGround=!1;for(let t of this.platforms)e.x+e.width>t.x&&e.x<t.x+t.width&&e.y+e.height>t.y&&e.y+e.height<t.y+t.height+10&&e.vy>=0&&(e.y=t.y-e.height,e.vy=0,e.onGround=!0);e.wallSliding=!1;let c=!1;e.x<=0&&(e.x=0,c=!0),e.x+e.width>=this.mapWidth&&(e.x=this.mapWidth-e.width,c=!0);for(let t of this.platforms)e.y+e.height>t.y+5&&e.y<t.y+t.height&&(e.x+e.width>t.x&&e.x<t.x&&e.vx>0&&(e.x=t.x-e.width,c=!0),e.x<t.x+t.width&&e.x+e.width>t.x+t.width&&e.vx<0&&(e.x=t.x+t.width,c=!0));if(c&&!e.onGround&&e.vy>0&&(n||r)&&(e.wallSliding=!0,e.vy=1.5,Math.random()>.5&&this.particles.push(new J(e.dir===1?e.x+e.width:e.x,e.y+e.height/2,(Math.random()-.5)*2,-2,`#ccc`,15,2))),e.y<0&&(e.y=0,e.vy=0),e.y+e.height>=this.mapHeight&&(e.y=this.mapHeight-e.height,e.vy=0,e.onGround=!0),o&&e.grenades>0&&e.shootCooldown<=0&&(this.grenadesList.push(new re(e.dir===1?e.x+e.width:e.x,e.y+e.height/2,e.dir,e.id)),e.grenades--,e.shootCooldown=30),e.overdrive>0&&e.overdrive--,e.shootCooldown>0&&e.shootCooldown--,s&&e.shootCooldown<=0){let t=e.dir===1?e.x+e.width:e.x-12,n=`normal`;if(e.classId===`engineer`&&(n=`shotgun`),e.classId===`heavy`&&(n=`rocket`),e.classId===`scout`&&(n=`sniper`),e.classId===`medic`&&(n=`smg`),n===`shotgun`){for(let r=0;r<4;r++)this.bullets.push(new Y(t,e.y+e.height/2-2,e.dir,!1,n,e.id));this.screenShake=4}else n===`rocket`?(this.bullets.push(new Y(t,e.y+e.height/2-4,e.dir,!1,n,e.id)),this.screenShake=6):(this.bullets.push(new Y(t,e.y+e.height/2-2,e.dir,!1,n,e.id)),n===`sniper`&&(this.screenShake=3));e.shootCooldown=e.overdrive>0?Math.floor(e.baseCooldown/2):e.baseCooldown;for(let n=0;n<4;n++)this.particles.push(new J(t+(e.dir===1?6:-6),e.y+e.height/2,e.dir*(Math.random()*4+2),(Math.random()-.5)*3,q.bullet,10,2))}}for(let e of this.players)e.invincible>0&&e.invincible--,e.hitFlash>0&&e.hitFlash--;this.bullets=this.bullets.filter(e=>{if(!e.update()||e.x<0||e.x>this.mapWidth||e.y<0||e.y>this.mapHeight)return!1;if(!e.isEnemy){let t=this.players.find(t=>t.id===e.ownerId)||this.players[0],n=!1;for(let r of this.enemies)if(r.alive&&e.x+e.width>r.x&&e.x<r.x+r.width&&e.y+e.height>r.y&&e.y-e.height<r.y+r.height){if(e.type===`rocket`){this.screenShake=12;for(let n of this.enemies){if(!n.alive)continue;let r=n.x+n.width/2-e.x,i=n.y+n.height/2-e.y;Math.sqrt(r*r+i*i)<80&&(n.takeDamage(this.particles),n.takeDamage(this.particles),n.alive||(t.kills++,this.score+=150))}for(let t=0;t<20;t++)this.particles.push(new J(e.x,e.y,(Math.random()-.5)*10,(Math.random()-.5)*10,q.jetpackFlame,30+Math.random()*20,5))}else if(r.takeDamage(this.particles),e.type===`sniper`&&r.takeDamage(this.particles),r.alive)this.damageNumbers.push({x:r.x+r.width/2,y:r.y,text:e.type===`sniper`?`-2`:`-1`,color:q.damage,life:25});else{if(t.kills++,this.score+=100,Math.random()<.35){let e=[`health`,`fuel`,`overdrive`];this.pickups.push(new X(r.x,r.y,e[Math.floor(Math.random()*e.length)]))}this.damageNumbers.push({x:r.x+r.width/2,y:r.y,text:`+100`,color:q.gold,life:40})}n=!0;break}if(n&&e.type!==`sniper`)return!1}if(e.isEnemy){let t=!1;for(let n of this.players)if(!(n.hp<=0||n.invincible>0)&&e.x+e.width>n.x&&e.x<n.x+n.width&&e.y+2>n.y&&e.y-2<n.y+n.height){n.hp--,n.hitFlash=10,n.invincible=30,this.screenShake=8;for(let e=0;e<10;e++)this.particles.push(new J(n.x+n.width/2,n.y+n.height/2,(Math.random()-.5)*6,(Math.random()-.5)*6,q.damage,20,3));t=!0;break}if(this.players.every(e=>e.hp<=0)&&(this.gameOver=!0),t)return!1}return!0}),this.grenadesList=this.grenadesList.filter(e=>{let t=e.update(this.platforms,this.particles);if(!t&&e.exploded){this.screenShake=15;let t=this.players.find(t=>t.id===e.ownerId)||this.players[0];for(let n of this.enemies){if(!n.alive)continue;let r=n.x+n.width/2-e.x,i=n.y+n.height/2-e.y;Math.sqrt(r*r+i*i)<100&&(n.takeDamage(this.particles),n.takeDamage(this.particles),n.alive||(t.kills++,this.score+=100))}}return t}),this.pickups=this.pickups.filter(e=>{if(!e.update(this.platforms))return!1;for(let t of this.players)if(!(t.hp<=0)&&t.x<e.x+e.width&&t.x+t.width>e.x&&t.y<e.y+e.height&&t.y+t.height>e.y)return e.type===`health`&&(t.hp=Math.min(t.maxHp,t.hp+2)),e.type===`fuel`&&(t.fuel=I),e.type===`overdrive`&&(t.overdrive=600),!1;return!0}),this.enemies=this.enemies.filter(e=>{let t=this.players[0],n=999999;for(let r of this.players){if(r.hp<=0)continue;let i=Math.abs(e.x-r.x)+Math.abs(e.y-r.y);i<n&&(n=i,t=r)}return e.update(t.x,t.y,this.bullets,this.particles)}),this.spawnTimer++,this.enemiesSpawned<this.maxEnemiesPerWave&&this.spawnTimer>120&&(this.spawnEnemy(),this.spawnTimer=0),this.enemies.length===0&&this.enemiesSpawned>=this.maxEnemiesPerWave&&(this.wave++,this.spawnWave(),this.score+=50*this.wave,this.damageNumbers.push({x:this.width/2,y:this.height/2-30,text:`WAVE ${this.wave}`,color:q.gold,life:60})),this.particles=this.particles.filter(e=>e.update()),this.damageNumbers=this.damageNumbers.filter(e=>(--e.y,e.life--,e.life>0)),this.screenShake>0&&(this.screenShake*=.8)}}draw(){let e=this.ctx,t=this.players[0];if(t){let e=t.x+t.width/2-this.width/2,n=t.y+t.height/2-this.height/2;e=Math.max(0,Math.min(this.mapWidth-this.width,e)),n=Math.max(0,Math.min(this.mapHeight-this.height,n)),this.camera||={x:e,y:n},this.camera.x+=(e-this.camera.x)*.1,this.camera.y+=(n-this.camera.y)*.1}e.save(),this.drawBackground(e),this.screenShake>.5&&e.translate((Math.random()-.5)*this.screenShake*2,(Math.random()-.5)*this.screenShake*2),e.translate(-this.camera.x,-this.camera.y);for(let t of this.platforms)e.fillStyle=q.platformGlow,e.fillRect(t.x-2,t.y-2,t.width+4,t.height+4),e.fillStyle=q.platform,e.fillRect(t.x,t.y,t.width,t.height),e.fillStyle=q.platformTop,e.fillRect(t.x,t.y,t.width,2),e.shadowColor=q.platformTop,e.shadowBlur=6,e.fillRect(t.x,t.y,t.width,1),e.shadowBlur=0;for(let t of this.pickups)t.draw(e);for(let t of this.grenadesList)t.draw(e);for(let t of this.particles)t.draw(e);for(let t of this.bullets)t.draw(e);for(let t of this.enemies)t.draw(e);for(let t of this.players)this.drawPlayer(e,t);for(let t of this.damageNumbers)e.globalAlpha=t.life/40,e.font=t.text.startsWith(`WAVE`)?`bold 24px Rajdhani`:`bold 14px Orbitron`,e.fillStyle=t.color,e.textAlign=`center`,e.fillText(t.text,t.x,t.y),e.globalAlpha=1;e.restore(),this.drawHUD(e),this.gameOver&&this.drawGameOver(e)}drawBackground(e){e.fillStyle=q.bg,e.fillRect(0,0,this.width,this.height);let t=this.camera?this.camera.x:0,n=this.camera?this.camera.y:0,r=(r,i)=>{if(r.complete&&r.naturalHeight!==0){let a=1.2,o=this.width*a,s=this.height*a,c=-(t*i)%(o-this.width),l=-(n*i)%(s-this.height);e.drawImage(r,c,l,o,s)}};if(this.currentMapIndex===0)if(H.complete&&H.naturalHeight!==0)r(H,.1);else{e.strokeStyle=`rgba(0, 229, 255, 0.1)`,e.lineWidth=2;let r=-(t*.5)%60,i=-(n*.5)%60;e.beginPath();for(let t=r;t<this.width+60;t+=60)e.moveTo(t,0),e.lineTo(t,this.height);for(let t=i;t<this.height+60;t+=60)e.moveTo(0,t),e.lineTo(this.width,t);e.stroke()}else if(this.currentMapIndex===1){U.complete&&U.naturalHeight!==0&&r(U,.2);for(let r of this.stars){r.twinkle+=.02,e.globalAlpha=Math.max(0,r.alpha+Math.sin(r.twinkle)*.15),e.fillStyle=q.star;let i=(r.x-t*.2)%this.width,a=(r.y-n*.2)%this.height;e.fillRect(i<0?i+this.width:i,a<0?a+this.height:a,r.size,r.size)}e.globalAlpha=1}else if(this.currentMapIndex===2)if(W.complete&&W.naturalHeight!==0)r(W,.05);else{e.fillStyle=`#060a14`,e.beginPath();let r=-(t*.3)%400,i=this.height-100+n*.1;e.moveTo(0,this.height);for(let t=-400;t<this.width+400;t+=100)e.lineTo(t+r,i-Math.abs(Math.sin(t*.01)*150));e.lineTo(this.width,this.height),e.fill()}}drawPlayer(e,t){if(t.hp<=0||t.invincible>0&&Math.floor(this.gameTime/3)%2==0)return;let n=t.x,r=t.y;if(G.complete&&G.naturalHeight!==0){let i=t.width*2.2,a=t.height*1.8;e.save(),t.hitFlash>0&&(e.filter=`brightness(200%)`),t.dir===-1?(e.scale(-1,1),e.drawImage(G,-(n+t.width+(i-t.width)/2),r-(a-t.height),i,a)):e.drawImage(G,n-(i-t.width)/2,r-(a-t.height),i,a),e.restore()}else{e.fillStyle=t.hitFlash>0?`#fff`:q.playerBody,e.fillRect(n+2,r+8,t.width-4,t.height-8),e.fillStyle=t.hitFlash>0?`#fff`:q.player,e.beginPath(),e.arc(n+t.width/2,r+8,10,0,Math.PI*2),e.fill(),e.fillStyle=`#0a1520`,e.fillRect(n+6,r+4,12,6),e.fillStyle=q.player,e.fillRect(n+7,r+5,10,4),e.shadowColor=q.player,e.shadowBlur=4,e.fillRect(n+7,r+5,10,4),e.shadowBlur=0;let i=t.dir===1?n-2:n+t.width-4;e.fillStyle=`#2a3a5c`,e.fillRect(i,r+10,6,14),e.fillStyle=q.player,e.fillRect(i,r+10,6,2),e.fillStyle=`#8a8a8a`;let a=t.dir===1?n+t.width:n-14;e.fillRect(a,r+14,14,4),e.fillStyle=q.player,e.fillRect(a+(t.dir===1?10:0),r+14,4,4)}}drawHUD(e){let t=this.players[0];this.players[1],e.fillStyle=`rgba(0,0,0,0.5)`,e.fillRect(14,14,154,14),e.fillStyle=q.healthBarBg,e.fillRect(16,16,150,10);let n=e.createLinearGradient(16,0,166,0);n.addColorStop(0,`#ff2d55`),n.addColorStop(1,`#00ff88`),e.fillStyle=n,e.fillRect(16,16,150*(t.hp/t.maxHp),10),e.font=`10px Orbitron`,e.fillStyle=q.textDim,e.textAlign=`left`,e.fillText(`HP`,16,12),e.fillStyle=q.text,e.fillText(`${t.hp}/${t.maxHp}`,172,25),e.fillStyle=`rgba(0,0,0,0.5)`,e.fillRect(14,34,154,14),e.fillStyle=q.fuelBarBg,e.fillRect(16,36,150,10);let r=e.createLinearGradient(16,0,166,0);r.addColorStop(0,`#ff6b00`),r.addColorStop(1,`#00e5ff`),e.fillStyle=r,e.fillRect(16,36,150*(t.fuel/I),10),e.font=`10px Orbitron`,e.fillStyle=q.textDim,e.fillText(`FUEL`,16,32),e.fillStyle=q.text,e.fillText(`${Math.floor(t.fuel)}%`,172,45),e.textAlign=`center`,e.font=`12px Orbitron`,e.fillStyle=t.overdrive>0?q.gold:q.textDim,e.fillText(t.overdrive>0?`⚡ OVERDRIVE (${Math.ceil(t.overdrive/60)}s)`:``,this.width/2,28),e.fillStyle=q.text,e.fillText(`💣 GRENADES: ${t.grenades}`,this.width/2,this.height-16),e.textAlign=`right`,e.font=`12px Orbitron`,e.fillStyle=q.gold,e.fillText(`SCORE: ${this.score}`,this.width-16,28),e.fillStyle=q.player,e.fillText(`KILLS: ${t.kills}`,this.width-16,44),e.fillStyle=q.text,e.fillText(`WAVE: ${this.wave}`,this.width-16,60),e.font=`10px Orbitron`,e.fillStyle=q.textDim,this.maxEnemiesPerWave-this.enemiesSpawned+this.enemies.length,e.fillText(`ENEMIES: ${this.enemies.length}`,this.width-16,76),e.textAlign=`left`}drawGameOver(e){e.fillStyle=`rgba(0, 0, 0, 0.7)`,e.fillRect(0,0,this.width,this.height),e.textAlign=`center`,e.font=`bold 48px Rajdhani`,e.fillStyle=q.damage,e.fillText(`GAME OVER`,this.width/2,this.height/2-40),e.font=`20px Orbitron`,e.fillStyle=q.gold,e.fillText(`SCORE: ${this.score}`,this.width/2,this.height/2+10),e.fillStyle=q.text;let t=this.players.reduce((e,t)=>e+t.kills,0);e.fillText(`KILLS: ${t}  |  WAVE: ${this.wave}`,this.width/2,this.height/2+40),e.font=`16px Rajdhani`,e.fillStyle=q.textDim,e.fillText(`Press R to restart`,this.width/2,this.height/2+80),e.textAlign=`left`,this.keys.r&&this.restart()}cycleMap(){this.currentMapIndex=(this.currentMapIndex+1)%V.length,this.restart()}restart(){let e=window.AeroStrikeActiveLoadout||`assault`;G.src=(s[e]||s.assault).image;let t=V[this.currentMapIndex];this.mapWidth=t.width,this.mapHeight=t.height,this.platforms=t.platforms,this.camera={x:0,y:0},this.players=[this.createPlayer(1,100,200,e),this.createPlayer(2,800,200,`heavy`)],this.score=0,this.wave=1,this.enemies=[],this.bullets=[],this.grenadesList=[],this.pickups=[],this.particles=[],this.damageNumbers=[],this.gameOver=!1,this.gameTime=0,this.spawnWave()}loop(){this.update(),this.draw(),this.animFrame=requestAnimationFrame(()=>this.loop())}start(){this.loop()}stop(){this.animFrame&&cancelAnimationFrame(this.animFrame)}};function ae(){return`
    <div class="demo-layout screen-enter">
      <div class="flex flex-between items-center">
        <div>
          <h2 class="text-glow-cyan">2D COMBAT DEMO</h2>
          <p class="text-secondary" style="margin-top:4px; font-size:0.85rem;">
            Jetpack combat prototype — test core movement & shooting mechanics
          </p>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn-ghost btn-sm" id="demoCycleMapBtn">🗺️ CYCLE MAP</button>
          <button class="btn btn-ghost btn-sm" id="demoRestartBtn">↻ RESTART</button>
          <button class="btn btn-primary btn-sm" id="demoFullscreenBtn">⛶ FULLSCREEN</button>
        </div>
      </div>

      <!-- Controls Info -->
      
      <!-- Debug Tools Panel -->
      <div id="debugPanel" style="position:absolute; top:80px; right:20px; background:rgba(0,0,0,0.8); border:1px solid #00e5ff; border-radius:8px; padding:10px; z-index:110; display:flex; flex-direction:column; gap:8px;">
        <div class="text-cyan font-mono" style="font-size:10px; text-align:center;">DEBUG TOOLS</div>
        <button class="btn btn-ghost btn-sm" id="btnSpawnBot" style="font-size:10px;">🤖 Spawn Bot</button>
        <button class="btn btn-ghost btn-sm" id="btnSpawnHp" style="font-size:10px;">💉 Spawn HP</button>
        <button class="btn btn-ghost btn-sm" id="btnSpawnFuel" style="font-size:10px;">⛽ Spawn Fuel</button>
        <button class="btn btn-ghost btn-sm" id="btnSpawnOverdrive" style="font-size:10px;">⚡ Spawn Overdrive</button>
      </div>

      <div class="demo-controls-info">
        <div class="demo-control-key"><kbd>W</kbd> / <kbd>↑</kbd> / <kbd>SPACE</kbd> <span class="text-dim">Jetpack</span></div>
        <div class="demo-control-key"><kbd>A</kbd> <kbd>D</kbd> / <kbd>←</kbd> <kbd>→</kbd> <span class="text-dim">Move</span></div>
        <div class="demo-control-key"><kbd>F</kbd> / <kbd>J</kbd> / <kbd>ENTER</kbd> <span class="text-dim">Shoot</span></div>
        <div class="demo-control-key"><kbd>G</kbd> / <kbd>SHIFT</kbd> <span class="text-dim">Grenade</span></div>
        <div class="demo-control-key"><kbd>R</kbd> <span class="text-dim">Restart</span></div>
      </div>

      <!-- Game Canvas -->
      <div class="game-canvas-container" id="demoCanvasContainer">
        <canvas id="demoCanvas"></canvas>
      <!-- Mobile Touch Controls Overlay (Hidden on desktop) -->
      <div id="mobileControls" style="display:none; position:absolute; inset:0; pointer-events:none; z-index:100;">
        <!-- Left side: D-Pad -->
        <div style="position:absolute; bottom:20px; left:20px; pointer-events:auto; display:flex; flex-direction:column; gap:10px; opacity:0.6;">
            <div style="display:flex; justify-content:center;">
               <button id="btnUp" style="width:60px; height:60px; border-radius:30px; background:#fff; border:none; font-size:24px;">⬆️</button>
            </div>
            <div style="display:flex; gap:60px;">
               <button id="btnLeft" style="width:60px; height:60px; border-radius:30px; background:#fff; border:none; font-size:24px;">⬅️</button>
               <button id="btnRight" style="width:60px; height:60px; border-radius:30px; background:#fff; border:none; font-size:24px;">➡️</button>
            </div>
            <div style="display:flex; justify-content:center;">
               <button id="btnDown" style="width:60px; height:60px; border-radius:30px; background:#fff; border:none; font-size:24px;">⬇️</button>
            </div>
        </div>
        <!-- Right side: Actions -->
        <div style="position:absolute; bottom:20px; right:20px; pointer-events:auto; display:flex; gap:15px; opacity:0.6; align-items:flex-end;">
            <button id="btnDash" style="width:60px; height:60px; border-radius:30px; background:#fff; border:none; font-size:24px; margin-bottom:40px;">💨</button>
            <button id="btnGrenade" style="width:60px; height:60px; border-radius:30px; background:#fff; border:none; font-size:24px;">💣</button>
            <button id="btnShoot" style="width:80px; height:80px; border-radius:40px; background:#ff2d55; border:none; font-size:32px;">🔫</button>
        </div>
      </div>

      </div>

      <!-- Game Info -->
      <div class="flex gap-lg" style="margin-top:8px;">
        <div class="glass-panel" style="padding:12px 20px; flex:1;">
          <span class="font-mono text-dim" style="font-size:0.7rem;">OBJECTIVE</span>
          <p class="font-heading" style="font-size:0.9rem; margin-top:4px;">
            Survive enemy waves! Use your jetpack to fly, dodge bullets, and eliminate all enemies. 
            Each wave gets harder.
          </p>
        </div>
        <div class="glass-panel" style="padding:12px 20px;">
          <span class="font-mono text-dim" style="font-size:0.7rem;">PHASE 1</span>
          <p class="font-heading text-cyan" style="font-size:0.9rem; margin-top:4px;">Foundation Prototype</p>
          <p class="text-dim" style="font-size:0.75rem;">Core movement & combat</p>
        </div>
      </div>
    </div>
  `}var Q=null;function oe(){let e=document.getElementById(`demoCanvas`);if(!e)return;Q&&Q.stop(),Q=new ie(e),window.gameInstance=Q,Q.start();let t=document.getElementById(`demoRestartBtn`);t&&t.addEventListener(`click`,()=>{Q.restart()});let n=document.getElementById(`demoCycleMapBtn`);n&&n.addEventListener(`click`,()=>{Q.cycleMap()});let r=()=>Q?.players[0];if(document.getElementById(`btnSpawnBot`)?.addEventListener(`click`,()=>{r()&&Q.spawnDebugEnemy(r().x+(Math.random()>.5?200:-200),r().y-100)}),document.getElementById(`btnSpawnHp`)?.addEventListener(`click`,()=>{r()&&Q.spawnDebugPickup(r().x,r().y-100,`health`)}),document.getElementById(`btnSpawnFuel`)?.addEventListener(`click`,()=>{r()&&Q.spawnDebugPickup(r().x+50,r().y-100,`fuel`)}),document.getElementById(`btnSpawnOverdrive`)?.addEventListener(`click`,()=>{r()&&Q.spawnDebugPickup(r().x-50,r().y-100,`overdrive`)}),`ontouchstart`in window||navigator.maxTouchPoints>0){document.getElementById(`mobileControls`).style.display=`block`;let e=(e,t)=>{let n=document.getElementById(e);n&&(n.addEventListener(`touchstart`,e=>{e.preventDefault(),Q.keys[t]=!0}),n.addEventListener(`touchend`,e=>{e.preventDefault(),Q.keys[t]=!1}),n.addEventListener(`touchcancel`,e=>{e.preventDefault(),Q.keys[t]=!1}))};e(`btnLeft`,`a`),e(`btnRight`,`d`),e(`btnUp`,`w`),e(`btnDown`,`s`),e(`btnShoot`,`f`),e(`btnDash`,`shift`),e(`btnGrenade`,`g`)}let i=document.getElementById(`demoFullscreenBtn`);i&&i.addEventListener(`click`,()=>{let e=document.getElementById(`demoCanvasContainer`);e.requestFullscreen&&e.requestFullscreen()})}function $(){Q&&(Q.stop(),Q=null,window.gameInstance=null)}document.addEventListener(`DOMContentLoaded`,()=>{document.getElementById(`mainNav`).innerHTML=`
    <div class="nav-item nav-item--active" data-route="lobby">
      <span>🏠</span> LOBBY
    </div>
    <div class="nav-item" data-route="loadout">
      <span>🔫</span> LOADOUT
    </div>
    <div class="nav-item" data-route="battlepass">
      <span>⭐</span> BATTLE PASS
    </div>
    <div class="nav-item" data-route="ranked">
      <span>⚔️</span> RANKED
    </div>
    <div class="nav-item" data-route="demo">
      <span>🚀</span> 2D DEMO
    </div>
    <div class="nav-item" data-route="hud">
      <span>👁️</span> IN-MATCH HUD
    </div>
    <div class="nav-item" data-route="gamescreen">
      <span>☠️</span> BR MODE
    </div>
  `,document.getElementById(`sidebarPlayerCard`).innerHTML=`
    <div class="glass-panel" style="padding: 12px; display: flex; align-items: center; gap: 12px;">
      <div style="width: 40px; height: 40px; background: rgba(0, 229, 255, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; border: 1px solid var(--cyan);">
        😎
      </div>
      <div>
        <div class="font-heading" style="font-weight: 600; font-size: 1.1rem; color: var(--text-primary);">PlayerOne</div>
        <div class="text-dim font-mono" style="font-size: 0.75rem;">ID: 7492-AX</div>
      </div>
    </div>
  `,e.register(`lobby`,()=>(setTimeout(r,50),t())),e.register(`loadout`,()=>(setTimeout(p,50),f())),e.register(`battlepass`,()=>(setTimeout(w,50),C())),e.register(`ranked`,()=>(setTimeout(A,50),O())),e.register(`hud`,()=>(setTimeout(()=>{te();let t=document.getElementById(`hud-container`);t&&t._hudCleanup&&e.registerCleanup(`hud`,t._hudCleanup)},50),ee())),e.register(`gamescreen`,()=>(setTimeout(()=>{ne();let t=document.getElementById(`br-container`);t&&t._brCleanup&&e.registerCleanup(`gamescreen`,t._brCleanup)},50),j())),e.register(`demo`,()=>(setTimeout(()=>{window.AeroStrikeActiveLoadout!==void 0&&window.gameInstance!==void 0&&window.gameInstance?(window.gameInstance.players[0].classId=window.AeroStrikeActiveLoadout,window.gameInstance.restart()):oe()},50),ae())),e.onRouteChange=e=>{e!==`demo`&&typeof $==`function`&&$();let t={lobby:`MAIN LOBBY`,loadout:`LOADOUT`,battlepass:`BATTLE PASS`,ranked:`RANKED MATCH`,hud:`HUD PREVIEW`,gamescreen:`BATTLE ROYALE`,demo:`2D DEMO`};document.getElementById(`screenTitle`).textContent=t[e]||`AERO STRIKE`,document.querySelectorAll(`.nav-item`).forEach(t=>{t.dataset.route===e?t.classList.add(`nav-item--active`):t.classList.remove(`nav-item--active`)})},document.querySelectorAll(`.nav-item`).forEach(t=>{t.addEventListener(`click`,()=>{e.navigate(t.dataset.route)})}),e.init(`screenContainer`),setTimeout(()=>{let e=document.getElementById(`loadingScreen`);e&&(e.classList.add(`loading-screen--hidden`),setTimeout(()=>e.remove(),600))},1500),se()});function se(){let e=document.getElementById(`particles`);if(e)for(let t=0;t<30;t++){let t=document.createElement(`div`);t.className=`particle`,t.style.left=`${Math.random()*100}vw`,t.style.animationDuration=`${10+Math.random()*20}s`,t.style.animationDelay=`${Math.random()*10}s`,e.appendChild(t)}}