// ============================================
// BATTLE PASS — Season 1: Sky Hunter
// ============================================

const CURRENT_TIER = 45;
const CURRENT_XP = 650;
const MAX_XP = 1000;

// Free-track reward pool (cycled across 50 tiers)
const FREE_REWARDS = [
  { icon: '🪙', name: '500 Coins' },
  { icon: '🎨', name: 'Spray' },
  { icon: '📦', name: 'Crate' },
  { icon: '⭐', name: 'XP Boost' },
  { icon: '🔫', name: 'Weapon Skin' },
  { icon: '🪙', name: '750 Coins' },
  { icon: '🎯', name: 'Reticle' },
  { icon: '📦', name: 'Rare Crate' },
  { icon: '⭐', name: '2x XP Token' },
  { icon: '🔫', name: 'Camo Skin' },
  { icon: '🪙', name: '1000 Coins' },
  { icon: '🎨', name: 'Tag Spray' },
  { icon: '📦', name: 'Supply Drop' },
  { icon: '⭐', name: 'XP Mega Boost' },
  { icon: '🔫', name: 'Arctic Skin' },
  { icon: '🪙', name: '1500 Coins' },
  { icon: '🎯', name: 'Holo Sight' },
  { icon: '📦', name: 'Elite Crate' },
  { icon: '⭐', name: '3x XP Token' },
  { icon: '🔫', name: 'Neon Skin' },
  { icon: '🪙', name: '2000 Coins' },
  { icon: '🎨', name: 'Kill Spray' },
  { icon: '📦', name: 'Legend Crate' },
  { icon: '⭐', name: 'Season Boost' },
  { icon: '🔫', name: 'Plasma Skin' },
  { icon: '🪙', name: '500 Coins' },
  { icon: '🎨', name: 'Graffiti' },
  { icon: '📦', name: 'Crate' },
  { icon: '⭐', name: 'XP Boost' },
  { icon: '🔫', name: 'Desert Skin' },
  { icon: '🪙', name: '800 Coins' },
  { icon: '🎯', name: 'Red Dot' },
  { icon: '📦', name: 'Rare Crate' },
  { icon: '⭐', name: '2x XP Token' },
  { icon: '🔫', name: 'Shadow Skin' },
  { icon: '🪙', name: '1200 Coins' },
  { icon: '🎨', name: 'Emblem' },
  { icon: '📦', name: 'Supply Drop' },
  { icon: '⭐', name: 'XP Mega Boost' },
  { icon: '🔫', name: 'Chrome Skin' },
  { icon: '🪙', name: '1800 Coins' },
  { icon: '🎯', name: 'Scope Skin' },
  { icon: '📦', name: 'Elite Crate' },
  { icon: '⭐', name: '3x XP Token' },
  { icon: '🔫', name: 'Fire Skin' },
  { icon: '🪙', name: '2500 Coins' },
  { icon: '🎨', name: 'Victory Spray' },
  { icon: '📦', name: 'Mega Crate' },
  { icon: '⭐', name: 'Ultimate Boost' },
  { icon: '🏆', name: 'Season Trophy' },
];

// Premium-track reward pool
const PREMIUM_REWARDS = [
  { icon: '🎖️', name: 'Recon Skin' },
  { icon: '💎', name: '200 Gems' },
  { icon: '🎭', name: 'Salute Emote' },
  { icon: '🔥', name: 'Epic Blaster' },
  { icon: '👑', name: 'Pilot Outfit' },
  { icon: '🎖️', name: 'Stealth Skin' },
  { icon: '💎', name: '300 Gems' },
  { icon: '🎭', name: 'Taunt Emote' },
  { icon: '🔥', name: 'Epic Railgun' },
  { icon: '👑', name: 'Ace Outfit' },
  { icon: '🎖️', name: 'Viper Skin' },
  { icon: '💎', name: '400 Gems' },
  { icon: '🎭', name: 'Dance Emote' },
  { icon: '🔥', name: 'Epic Launcher' },
  { icon: '👑', name: 'Shadow Outfit' },
  { icon: '🎖️', name: 'Ghost Skin' },
  { icon: '💎', name: '500 Gems' },
  { icon: '🎭', name: 'Wave Emote' },
  { icon: '🔥', name: 'Epic Shotgun' },
  { icon: '👑', name: 'Titan Outfit' },
  { icon: '🎖️', name: 'Blaze Skin' },
  { icon: '💎', name: '600 Gems' },
  { icon: '🎭', name: 'Flip Emote' },
  { icon: '🔥', name: 'Epic SMG' },
  { icon: '👑', name: 'Raptor Outfit' },
  { icon: '🎖️', name: 'Frost Skin' },
  { icon: '💎', name: '250 Gems' },
  { icon: '🎭', name: 'Clap Emote' },
  { icon: '🔥', name: 'Epic Sniper' },
  { icon: '👑', name: 'Hawk Outfit' },
  { icon: '🎖️', name: 'Neon Skin' },
  { icon: '💎', name: '350 Gems' },
  { icon: '🎭', name: 'Shrug Emote' },
  { icon: '🔥', name: 'Epic Pistol' },
  { icon: '👑', name: 'Falcon Outfit' },
  { icon: '🎖️', name: 'Crimson Skin' },
  { icon: '💎', name: '450 Gems' },
  { icon: '🎭', name: 'Cheer Emote' },
  { icon: '🔥', name: 'Epic Rifle' },
  { icon: '👑', name: 'Storm Outfit' },
  { icon: '🎖️', name: 'Omega Skin' },
  { icon: '💎', name: '550 Gems' },
  { icon: '🎭', name: 'GG Emote' },
  { icon: '🔥', name: 'Epic Cannon' },
  { icon: '👑', name: 'Phoenix Outfit' },
  { icon: '🎖️', name: 'Apex Skin' },
  { icon: '💎', name: '800 Gems' },
  { icon: '🎭', name: 'Crown Emote' },
  { icon: '🔥', name: 'Legendary Blade' },
  { icon: '👑', name: 'Sky Hunter Set' },
];

function getTierState(tier) {
  if (tier < CURRENT_TIER) return 'completed';
  if (tier === CURRENT_TIER) return 'active';
  return 'locked';
}

function tierCardClass(tier, isPremium) {
  const state = getTierState(tier);
  let cls = 'tier-card';
  if (isPremium) cls += ' tier-card--premium';
  if (state === 'active') cls += ' tier-card--active';
  if (state === 'locked') cls += ' tier-card--locked';
  return cls;
}

function renderTierIcon(tier, reward) {
  const state = getTierState(tier);
  const checkmark = state === 'completed' ? '<span class="bp-checkmark">✓</span>' : '';
  return `
    <div class="tier-card__icon">
      ${reward.icon}
      ${checkmark}
    </div>`;
}

function renderTierCard(tier, reward, isPremium) {
  return `
    <div class="${tierCardClass(tier, isPremium)}" data-tier="${tier}" data-track="${isPremium ? 'premium' : 'free'}" data-reward-name="${reward.name}" data-reward-icon="${reward.icon}">
      <div class="tier-card__number">${tier}</div>
      ${renderTierIcon(tier, reward)}
      <div class="tier-card__reward">${reward.name}</div>
    </div>`;
}

export function renderBattlePass() {
  const xpPercent = Math.round((CURRENT_XP / MAX_XP) * 100);

  // Build free and premium tier card rows
  let freeTierCards = '';
  let premiumTierCards = '';
  for (let i = 1; i <= 50; i++) {
    freeTierCards += renderTierCard(i, FREE_REWARDS[i - 1], false);
    premiumTierCards += renderTierCard(i, PREMIUM_REWARDS[i - 1], true);
  }

  return `
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
      <span class="text-gold text-glow-gold font-mono bp-tier-number">${CURRENT_TIER}</span>
    </div>
    <div class="flex-col gap-xs" style="flex:1">
      <div class="flex flex-between items-center">
        <span class="text-secondary font-heading" style="font-size:0.85rem">TIER ${CURRENT_TIER} PROGRESS</span>
        <span class="font-mono text-gold" style="font-size:0.85rem">${CURRENT_XP} / ${MAX_XP} XP</span>
      </div>
      <div class="progress-bar progress-bar--gold progress-bar--xl">
        <div class="progress-bar__fill" style="width:${xpPercent}%"></div>
      </div>
      <div class="flex flex-between items-center">
        <span class="text-dim font-mono" style="font-size:0.65rem">${MAX_XP - CURRENT_XP} XP to Tier ${CURRENT_TIER + 1}</span>
        <span class="badge badge--gold">${xpPercent}%</span>
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
        ${freeTierCards}
      </div>

      <!-- Premium Row -->
      <div class="bp-track-label">
        <span class="badge badge--gold">PREMIUM 👑</span>
      </div>
      <div class="bp-tier-row" id="bp-premium-row">
        ${premiumTierCards}
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
</style>`;
}

export function initBattlePass() {
  const trackScroll = document.getElementById('bp-track-scroll');
  const modal = document.getElementById('bp-reward-modal');
  const modalClose = document.getElementById('bp-modal-close');

  // ---- Smooth scroll to current tier on load ----
  requestAnimationFrame(() => {
    const activeFreeCard = document.querySelector('#bp-free-row .tier-card--active');
    if (activeFreeCard && trackScroll) {
      const scrollLeft = activeFreeCard.offsetLeft - trackScroll.offsetWidth / 2 + activeFreeCard.offsetWidth / 2;
      trackScroll.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
    }
  });

  // ---- Horizontal scroll buttons ----
  document.querySelectorAll('.bp-scroll-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const dir = btn.dataset.dir;
      const scrollAmount = 400;
      trackScroll.scrollBy({
        left: dir === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    });
  });

  // ---- Mouse wheel horizontal scroll on track ----
  if (trackScroll) {
    trackScroll.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        trackScroll.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  // ---- Tier card click → show reward modal ----
  document.querySelectorAll('.tier-card').forEach(card => {
    card.addEventListener('click', () => {
      const tier = parseInt(card.dataset.tier);
      const track = card.dataset.track;
      const rewardName = card.dataset.rewardName;
      const rewardIcon = card.dataset.rewardIcon;
      const state = getTierState(tier);

      document.getElementById('bp-modal-title').textContent = `Tier ${tier} Reward`;
      document.getElementById('bp-modal-icon').textContent = rewardIcon;
      document.getElementById('bp-modal-reward').textContent = rewardName;
      document.getElementById('bp-modal-tier').textContent = `TIER ${tier}`;
      document.getElementById('bp-modal-track').textContent = track === 'premium' ? '👑 Premium Track' : 'Free Track';

      const statusEl = document.getElementById('bp-modal-status');
      if (state === 'completed') {
        statusEl.innerHTML = '<span class="badge badge--green">✓ CLAIMED</span>';
      } else if (state === 'active') {
        statusEl.innerHTML = '<span class="badge badge--cyan">▶ IN PROGRESS</span>';
      } else {
        statusEl.innerHTML = `<span class="badge badge--red">🔒 LOCKED — Tier ${tier}</span>`;
      }

      modal.classList.add('modal-overlay--visible');
    });
  });

  // ---- Close modal ----
  if (modalClose) {
    modalClose.addEventListener('click', () => {
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

  // ---- Tab filter ----
  document.querySelectorAll('.bp-track-wrapper .tab-bar__item').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.bp-track-wrapper .tab-bar__item').forEach(t => t.classList.remove('tab-bar__item--active'));
      tab.classList.add('tab-bar__item--active');

      const filter = tab.dataset.filter;
      const freeRow = document.getElementById('bp-free-row');
      const premiumRow = document.getElementById('bp-premium-row');
      const freeLabel = freeRow?.previousElementSibling;
      const premiumLabel = premiumRow?.previousElementSibling;

      if (filter === 'free') {
        freeRow.style.display = 'flex';
        premiumRow.style.display = 'none';
        if (freeLabel) freeLabel.style.display = '';
        if (premiumLabel) premiumLabel.style.display = 'none';
      } else if (filter === 'premium') {
        freeRow.style.display = 'none';
        premiumRow.style.display = 'flex';
        if (freeLabel) freeLabel.style.display = 'none';
        if (premiumLabel) premiumLabel.style.display = '';
      } else {
        freeRow.style.display = 'flex';
        premiumRow.style.display = 'flex';
        if (freeLabel) freeLabel.style.display = '';
        if (premiumLabel) premiumLabel.style.display = '';
      }
    });
  });

  // ---- Upgrade button ----
  document.querySelector('.bp-upgrade-btn')?.addEventListener('click', () => {
    alert('Premium Battle Pass upgraded! 🎉 All premium rewards are now unlocked.');
  });
}
