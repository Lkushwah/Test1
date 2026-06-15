import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  renderLoadout,
  initLoadout,
  CLASS_DATA,
} from '../src/screens/loadout.js';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function mount() {
  const div = document.createElement('div');
  div.innerHTML = renderLoadout();
  document.body.appendChild(div);
}

const CLASS_KEYS = Object.keys(CLASS_DATA);

describe('Loadout Screen — renderLoadout()', () => {
  beforeEach(() => {
    mount();
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    window.AeroStrikeActiveLoadout = undefined;
    vi.useRealTimers();
  });

  it('returns a non-empty HTML string', () => {
    const html = renderLoadout();
    expect(typeof html).toBe('string');
    expect(html.trim().length).toBeGreaterThan(0);
  });

  it('renders loadout tabs for all 3 loadouts', () => {
    const tabs = document.querySelectorAll('#loadout-tabs .tab-bar__item');
    expect(tabs.length).toBe(3);
  });

  it('first loadout tab is active by default', () => {
    const tabs = document.querySelectorAll('#loadout-tabs .tab-bar__item');
    expect(tabs[0].classList.contains('tab-bar__item--active')).toBe(true);
  });

  it('renders all 5 class icons', () => {
    const icons = document.querySelectorAll('#class-selector [data-class]');
    expect(icons.length).toBeGreaterThanOrEqual(CLASS_KEYS.length);
  });

  it('renders 4 weapon slots (primary, secondary, melee, grenade)', () => {
    const slots = document.querySelectorAll('#weapon-slots .weapon-slot');
    expect(slots.length).toBe(4);
  });

  it('assault class icon is active by default', () => {
    const assaultIcon = document.querySelector('.class-icon--active[data-class="assault"]');
    expect(assaultIcon).toBeTruthy();
  });

  it('renders character preview area', () => {
    expect(document.getElementById('character-preview')).toBeTruthy();
  });

  it('renders the CHANGE CLASS button', () => {
    expect(document.getElementById('btn-change-class')).toBeTruthy();
  });

  it('renders stat bars for weapons with stats', () => {
    const statBars = document.querySelectorAll('.stat-bar');
    expect(statBars.length).toBeGreaterThan(0);
  });
});

describe('Loadout Screen — CLASS_DATA', () => {
  it('contains exactly 5 classes', () => {
    expect(CLASS_KEYS.length).toBe(5);
  });

  it.each(CLASS_KEYS)('class "%s" has required fields', (key) => {
    const cls = CLASS_DATA[key];
    expect(cls.name).toBeTruthy();
    expect(cls.image).toBeTruthy();
    expect(cls.character).toBeTruthy();
    expect(cls.subtitle).toBeTruthy();
    expect(cls.weapons).toBeTruthy();
    expect(cls.weapons.primary).toBeTruthy();
    expect(cls.weapons.secondary).toBeTruthy();
    expect(cls.weapons.melee).toBeTruthy();
    expect(cls.weapons.grenade).toBeTruthy();
  });

  it.each(CLASS_KEYS)('class "%s" primary weapon has stat values in range', (key) => {
    const w = CLASS_DATA[key].weapons.primary;
    if (w.damage !== undefined) {
      expect(w.damage).toBeGreaterThan(0);
      expect(w.damage).toBeLessThanOrEqual(100);
    }
    if (w.range !== undefined) {
      expect(w.range).toBeGreaterThan(0);
      expect(w.range).toBeLessThanOrEqual(100);
    }
    if (w.fireRate !== undefined) {
      expect(w.fireRate).toBeGreaterThan(0);
      expect(w.fireRate).toBeLessThanOrEqual(100);
    }
  });
});

describe('Loadout Screen — initLoadout()', () => {
  beforeEach(() => {
    mount();
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    window.AeroStrikeActiveLoadout = undefined;
    vi.useRealTimers();
  });

  it('runs without throwing', () => {
    expect(() => initLoadout()).not.toThrow();
  });

  it('sets window.AeroStrikeActiveLoadout to assault by default', () => {
    initLoadout();
    expect(window.AeroStrikeActiveLoadout).toBe('assault');
  });

  it('restores previous active loadout from window.AeroStrikeActiveLoadout', () => {
    window.AeroStrikeActiveLoadout = 'scout';
    initLoadout();
    expect(window.AeroStrikeActiveLoadout).toBe('scout');
  });

  it('loadout tab switching changes active tab', () => {
    initLoadout();
    const tabBar = document.getElementById('loadout-tabs');
    const tabs = [...tabBar.querySelectorAll('.tab-bar__item')];
    tabs[1].click();
    expect(tabs[1].classList.contains('tab-bar__item--active')).toBe(true);
    expect(tabs[0].classList.contains('tab-bar__item--active')).toBe(false);
  });

  it('clicking the same tab twice keeps it active', () => {
    initLoadout();
    const tabBar = document.getElementById('loadout-tabs');
    const tabs = [...tabBar.querySelectorAll('.tab-bar__item')];
    tabs[0].click();
    tabs[0].click();
    expect(tabs[0].classList.contains('tab-bar__item--active')).toBe(true);
  });

  it('CHANGE CLASS button cycles to the next class', () => {
    initLoadout();
    const btn = document.getElementById('btn-change-class');
    btn.click(); // assault → medic
    vi.runAllTimers();
    expect(window.AeroStrikeActiveLoadout).toBe('medic');
  });

  it('CHANGE CLASS button wraps around after last class', () => {
    initLoadout();
    const btn = document.getElementById('btn-change-class');
    // Cycle through all classes
    for (let i = 0; i < CLASS_KEYS.length; i++) btn.click();
    vi.runAllTimers();
    // Should wrap around to assault
    expect(window.AeroStrikeActiveLoadout).toBe('assault');
  });

  it('clicking a class icon updates window.AeroStrikeActiveLoadout', () => {
    initLoadout();
    const scoutIcon = document.querySelector('[data-class="scout"]');
    scoutIcon.click();
    vi.runAllTimers();
    expect(window.AeroStrikeActiveLoadout).toBe('scout');
  });

  it('clicking the already-active class does nothing', () => {
    initLoadout();
    const assaultIcon = document.querySelector('.class-icon--active[data-class="assault"]');
    const before = window.AeroStrikeActiveLoadout;
    assaultIcon.click();
    vi.runAllTimers();
    expect(window.AeroStrikeActiveLoadout).toBe(before);
  });

  it('class selection updates active icon styling', () => {
    initLoadout();
    const medicIcon = document.querySelector('[data-class="medic"] .class-icon');
    medicIcon.click();
    vi.runAllTimers();
    // medic should now be active
    expect(
      document.querySelector('.class-icon--active[data-class="medic"]')
    ).toBeTruthy();
    // assault should no longer be active
    expect(
      document.querySelector('.class-icon--active[data-class="assault"]')
    ).toBeNull();
  });

  it('class selection updates weapon slots after transition', () => {
    initLoadout();
    const slotsDiv = document.getElementById('weapon-slots');
    const engineerIcon = document.querySelector('[data-class="engineer"]');
    engineerIcon.click();
    vi.runAllTimers();
    // Engineer primary weapon is Shotgun
    expect(slotsDiv.textContent).toMatch(/Shotgun/i);
  });

  // ── Edge cases ────────────────────────────────

  it('is safe when loadout-tabs element is absent', () => {
    document.getElementById('loadout-tabs')?.remove();
    expect(() => initLoadout()).not.toThrow();
  });

  it('is safe when class-selector element is absent', () => {
    document.getElementById('class-selector')?.remove();
    expect(() => initLoadout()).not.toThrow();
  });

  it('is safe when character-preview element is absent', () => {
    document.getElementById('character-preview')?.remove();
    expect(() => initLoadout()).not.toThrow();
  });

  it('is safe when weapon-slots element is absent', () => {
    document.getElementById('weapon-slots')?.remove();
    expect(() => initLoadout()).not.toThrow();
  });

  it('is safe when btn-change-class element is absent', () => {
    document.getElementById('btn-change-class')?.remove();
    expect(() => initLoadout()).not.toThrow();
  });

  it('clicking unknown data-class does not crash', () => {
    initLoadout();
    const selector = document.getElementById('class-selector');
    const ghost = document.createElement('div');
    ghost.dataset.class = 'nonexistent';
    selector.appendChild(ghost);
    const before = window.AeroStrikeActiveLoadout;
    expect(() => {
      ghost.click();
      vi.runAllTimers();
    }).not.toThrow();
    // Active loadout must remain a valid class (not 'nonexistent')
    expect(window.AeroStrikeActiveLoadout).not.toBe('nonexistent');
    // The original class should still be valid
    expect(CLASS_DATA[before]).toBeTruthy();
  });
});
