// ============================================
// AERO STRIKE — Loadout Screen
// Weapon loadout & class selection
// ============================================

export const CLASS_DATA = {
  assault: {
    name: 'ASSAULT',
    image: '/assets/characters/assault.png',
    icon: '🔫',
    character: 'SGT. REAPER',
    subtitle: 'Frontline Combatant',
    weapons: {
      primary:   { name: 'Assault Rifle', damage: 75, range: 60, fireRate: 80 },
      secondary: { name: 'Pistol',        damage: 40, range: 45, fireRate: 90 },
      melee:     { name: 'Combat Knife' },
      grenade:   { name: 'Frag Grenade' },
    },
  },
  medic: {
    name: 'MEDIC',
    image: '/assets/characters/medic.png',
    icon: '💉',
    character: 'DR. VOSS',
    subtitle: 'Combat Medic',
    weapons: {
      primary:   { name: 'SMG',          damage: 55, range: 40, fireRate: 95 },
      secondary: { name: 'Heal Gun',     damage: 10, range: 50, fireRate: 60 },
      melee:     { name: 'Scalpel' },
      grenade:   { name: 'Smoke Grenade' },
    },
  },
  engineer: {
    name: 'ENGINEER',
    image: '/assets/characters/engineer.png',
    icon: '🔧',
    character: 'CPL. TORQUE',
    subtitle: 'Tech Specialist',
    weapons: {
      primary:   { name: 'Shotgun',  damage: 90, range: 25, fireRate: 35 },
      secondary: { name: 'Pistol',   damage: 40, range: 45, fireRate: 90 },
      melee:     { name: 'Wrench' },
      grenade:   { name: 'Mine' },
    },
  },
  scout: {
    name: 'SCOUT',
    image: '/assets/characters/scout.png',
    icon: '🎯',
    character: 'LT. SPECTRA',
    subtitle: 'Recon Operative',
    weapons: {
      primary:   { name: 'Sniper Rifle', damage: 95, range: 98, fireRate: 20 },
      secondary: { name: 'Pistol',       damage: 40, range: 45, fireRate: 90 },
      melee:     { name: 'Combat Knife' },
      grenade:   { name: 'Flash Grenade' },
    },
  },
  heavy: {
    name: 'HEAVY',
    image: '/assets/characters/heavy.png',
    icon: '🚀',
    character: 'MAJ. TITAN',
    subtitle: 'Heavy Weapons',
    weapons: {
      primary:   { name: 'LMG',             damage: 70, range: 55, fireRate: 92 },
      secondary: { name: 'Rocket Launcher', damage: 100, range: 70, fireRate: 10 },
      melee:     { name: 'Combat Axe' },
      grenade:   { name: 'Frag Grenade' },
    },
  },
};

const LOADOUT_NAMES = ['LOADOUT 1', 'LOADOUT 2', 'LOADOUT 3'];

// ---- Helpers ----

function statBarsHTML(weapon) {
  if (!weapon.damage) return '';
  return `
    <div class="flex-col gap-xs" style="margin-top:6px">
      <div class="stat-bar">
        <span class="stat-bar__label">Damage</span>
        <div class="stat-bar__track">
          <div class="stat-bar__fill" style="width:${weapon.damage}%"></div>
        </div>
        <span class="font-mono text-cyan" style="font-size:0.7rem;min-width:28px;text-align:right">${weapon.damage}%</span>
      </div>
      <div class="stat-bar">
        <span class="stat-bar__label">Range</span>
        <div class="stat-bar__track">
          <div class="stat-bar__fill" style="width:${weapon.range}%"></div>
        </div>
        <span class="font-mono text-cyan" style="font-size:0.7rem;min-width:28px;text-align:right">${weapon.range}%</span>
      </div>
      <div class="stat-bar">
        <span class="stat-bar__label">Fire Rate</span>
        <div class="stat-bar__track">
          <div class="stat-bar__fill" style="width:${weapon.fireRate}%"></div>
        </div>
        <span class="font-mono text-cyan" style="font-size:0.7rem;min-width:28px;text-align:right">${weapon.fireRate}%</span>
      </div>
    </div>`;
}

function weaponSlotHTML(label, weapon) {
  return `
    <div class="weapon-slot" data-slot="${label.toLowerCase()}">
      <div class="flex-col" style="flex:1">
        <span class="weapon-slot__label">${label}</span>
        <span class="weapon-slot__name">${weapon.name}</span>
        ${statBarsHTML(weapon)}
      </div>
    </div>`;
}

function characterPreviewHTML(cls) {
  return `
    <div class="flex-col flex-center gap-md" style="height:100%">
      <img src="${cls.image}" style="height: 250px; object-fit: contain; filter: drop-shadow(0 0 24px rgba(0,229,255,0.35));" />
      <h2 class="text-cyan text-glow-cyan font-heading" style="font-size:1.75rem">${cls.character}</h2>
      <span class="badge badge--cyan">${cls.subtitle}</span>
      <span class="text-dim font-mono" style="font-size:0.7rem;letter-spacing:2px">CLASS: ${cls.name}</span>
    </div>`;
}

// ---- Render ----

export function renderLoadout() {
  const defaultClass = CLASS_DATA.assault;
  const weapons = defaultClass.weapons;

  return `
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
        ${LOADOUT_NAMES.map((name, i) =>
          `<div class="tab-bar__item${i === 0 ? ' tab-bar__item--active' : ''}" data-tab="${i}">${name}</div>`
        ).join('')}
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
          ${characterPreviewHTML(defaultClass)}
        </div>

        <!-- Weapon Slots -->
        <div class="flex-col gap-md" id="weapon-slots" style="width:380px;flex-shrink:0">
          ${weaponSlotHTML('PRIMARY', weapons.primary)}
          ${weaponSlotHTML('SECONDARY', weapons.secondary)}
          ${weaponSlotHTML('MELEE', weapons.melee)}
          ${weaponSlotHTML('GRENADE', weapons.grenade)}
        </div>
      </div>

      <!-- Class Selector -->
      <div class="glass-panel flex-col gap-md" style="padding:var(--space-lg)">
        <div class="flex items-center flex-between">
          <h3 class="font-heading text-secondary" style="letter-spacing:2px">SELECT CLASS</h3>
          <button class="btn btn-primary btn-sm" id="btn-change-class">CHANGE CLASS</button>
        </div>

        <div class="flex flex-center gap-xl" id="class-selector">
          ${Object.entries(CLASS_DATA).map(([key, cls]) => `
            <div class="flex-col items-center gap-xs" data-class="${key}">
              <div class="class-icon${key === 'assault' ? ' class-icon--active' : ''}" data-class="${key}">
                <img src="${cls.image}" style="width: 48px; height: 48px; object-fit: contain; border-radius: 4px;" />
              </div>
              <span class="class-icon__label">${cls.name}</span>
            </div>
          `).join('')}
        </div>
      </div>

    </div>`;
}

// ---- Init ----

export function initLoadout() {
  let activeTab = 0;
  let activeClass = window.AeroStrikeActiveLoadout || 'assault';
  window.AeroStrikeActiveLoadout = activeClass;

  // --- Loadout tab switching ---
  const tabBar = document.getElementById('loadout-tabs');
  if (tabBar) {
    tabBar.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab-bar__item');
      if (!tab) return;
      const idx = Number(tab.dataset.tab);
      if (idx === activeTab) return;
      activeTab = idx;
      tabBar.querySelectorAll('.tab-bar__item').forEach((t) =>
        t.classList.toggle('tab-bar__item--active', Number(t.dataset.tab) === idx)
      );
    });
  }

  // --- Class selection ---
  const selector = document.getElementById('class-selector');
  const preview = document.getElementById('character-preview');
  const weaponSlots = document.getElementById('weapon-slots');

  function selectClass(key) {
    if (key === activeClass) return;
    const cls = CLASS_DATA[key];
    if (!cls) return;
    activeClass = key;
    window.AeroStrikeActiveLoadout = activeClass;

    // Update active icon
    selector.querySelectorAll('.class-icon').forEach((icon) =>
      icon.classList.toggle('class-icon--active', icon.dataset.class === key)
    );

    // Update character preview with transition
    preview.style.opacity = '0';
    setTimeout(() => {
      // Keep decorative grid, replace content
      const grid = preview.querySelector('div[style*="repeating-linear-gradient"]');
      preview.innerHTML = '';
      if (grid) preview.appendChild(grid);
      preview.insertAdjacentHTML('beforeend', characterPreviewHTML(cls));
      preview.style.opacity = '1';
    }, 180);

    // Update weapon slots
    weaponSlots.style.opacity = '0';
    setTimeout(() => {
      weaponSlots.innerHTML = [
        weaponSlotHTML('PRIMARY', cls.weapons.primary),
        weaponSlotHTML('SECONDARY', cls.weapons.secondary),
        weaponSlotHTML('MELEE', cls.weapons.melee),
        weaponSlotHTML('GRENADE', cls.weapons.grenade),
      ].join('');
      weaponSlots.style.opacity = '1';
    }, 180);
  }

  if (selector) {
    selector.addEventListener('click', (e) => {
      const target = e.target.closest('[data-class]');
      if (target) selectClass(target.dataset.class);
    });
  }

  // --- Weapon slot hover glow ---
  if (weaponSlots) {
    weaponSlots.addEventListener('mouseenter', (e) => {
      const slot = e.target.closest('.weapon-slot');
      if (slot) slot.style.transition = 'all 0.25s ease';
    }, true);
  }

  // --- Change class button ---
  const btnChange = document.getElementById('btn-change-class');
  if (btnChange) {
    btnChange.addEventListener('click', () => {
      const keys = Object.keys(CLASS_DATA);
      const nextIdx = (keys.indexOf(activeClass) + 1) % keys.length;
      selectClass(keys[nextIdx]);
    });
  }

  // Smooth transitions for preview / slots
  if (preview) preview.style.transition = 'opacity 0.18s ease';
  if (weaponSlots) weaponSlots.style.transition = 'opacity 0.18s ease';
}
