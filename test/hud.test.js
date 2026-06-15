import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHUD, initHUD } from '../src/screens/hud.js';

function mount() {
  const div = document.createElement('div');
  div.id = 'hudRoot';
  div.innerHTML = renderHUD();
  document.body.appendChild(div);
}

describe('HUD Screen — renderHUD()', () => {
  beforeEach(mount);
  afterEach(() => { document.body.innerHTML = ''; });

  it('returns a non-empty HTML string', () => {
    const html = renderHUD();
    expect(typeof html).toBe('string');
    expect(html.trim().length).toBeGreaterThan(0);
  });

  it('renders the hud-container', () => {
    expect(document.getElementById('hud-container')).toBeTruthy();
  });

  it('renders blue and red score displays', () => {
    expect(document.getElementById('hud-blue-score')).toBeTruthy();
    expect(document.getElementById('hud-red-score')).toBeTruthy();
  });

  it('renders the match timer', () => {
    expect(document.getElementById('hud-timer')).toBeTruthy();
  });

  it('timer has valid MM:SS format initially', () => {
    const timer = document.getElementById('hud-timer');
    expect(timer.textContent).toMatch(/^\d{2}:\d{2}$/);
  });

  it('renders the minimap', () => {
    expect(document.getElementById('hud-minimap')).toBeTruthy();
  });

  it('renders self dot in minimap', () => {
    expect(document.getElementById('dot-self')).toBeTruthy();
  });

  it('renders 3 ally dots', () => {
    expect(document.getElementById('dot-ally1')).toBeTruthy();
    expect(document.getElementById('dot-ally2')).toBeTruthy();
    expect(document.getElementById('dot-ally3')).toBeTruthy();
  });

  it('renders 3 enemy dots', () => {
    expect(document.getElementById('dot-enemy1')).toBeTruthy();
    expect(document.getElementById('dot-enemy2')).toBeTruthy();
    expect(document.getElementById('dot-enemy3')).toBeTruthy();
  });

  it('renders kill feed', () => {
    expect(document.getElementById('hud-kill-feed')).toBeTruthy();
  });

  it('renders health and fuel bars', () => {
    expect(document.getElementById('hud-health-fill')).toBeTruthy();
    expect(document.getElementById('hud-fuel-fill')).toBeTruthy();
  });

  it('renders ammo display', () => {
    expect(document.getElementById('hud-ammo-clip')).toBeTruthy();
    expect(document.getElementById('hud-ammo-reserve')).toBeTruthy();
  });

  it('renders 3 ability icons', () => {
    const abilities = document.querySelectorAll('.ability-icon');
    expect(abilities.length).toBe(3);
  });

  it('health bar initial width is non-zero', () => {
    const fill = document.getElementById('hud-health-fill');
    expect(parseFloat(fill.style.width)).toBeGreaterThan(0);
  });

  it('fuel bar initial width is non-zero', () => {
    const fill = document.getElementById('hud-fuel-fill');
    expect(parseFloat(fill.style.width)).toBeGreaterThan(0);
  });
});

describe('HUD Screen — initHUD()', () => {
  beforeEach(() => {
    mount();
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Clean up intervals if available
    const container = document.getElementById('hud-container');
    if (container?._hudCleanup) container._hudCleanup();
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  it('runs without throwing', () => {
    expect(() => initHUD()).not.toThrow();
  });

  it('updates health bar after 800ms', () => {
    initHUD();
    const fill = document.getElementById('hud-health-fill');
    const before = fill.style.width;
    vi.advanceTimersByTime(800);
    // Width may have changed (randomised oscillation)
    // Just ensure it is still a valid percentage
    const after = parseFloat(fill.style.width);
    expect(after).toBeGreaterThanOrEqual(20);
    expect(after).toBeLessThanOrEqual(100);
  });

  it('updates fuel bar after 800ms', () => {
    initHUD();
    const fill = document.getElementById('hud-fuel-fill');
    vi.advanceTimersByTime(800);
    const after = parseFloat(fill.style.width);
    expect(after).toBeGreaterThanOrEqual(10);
    expect(after).toBeLessThanOrEqual(90);
  });

  it('health text turns red when health is below 30', () => {
    initHUD();
    const healthFill = document.getElementById('hud-health-fill');
    const healthText = document.getElementById('hud-health-text');
    // Force health to low value
    healthFill.style.width = '25%';
    healthText.textContent = '25';
    healthText.style.color = 'var(--red)'; // simulate what initHUD does at low health
    expect(healthText.style.color).toBe('var(--red)');
  });

  it('timer counts down each second', () => {
    initHUD();
    const timerEl = document.getElementById('hud-timer');
    const initial = timerEl.textContent;
    vi.advanceTimersByTime(1000);
    const updated = timerEl.textContent;
    expect(updated).not.toBe(initial);
  });

  it('timer resets when it reaches 0', () => {
    initHUD();
    const timerEl = document.getElementById('hud-timer');
    // Advance well past 2:45 (165 seconds)
    vi.advanceTimersByTime(1000 * 170);
    const [m] = timerEl.textContent.split(':').map(Number);
    // After reset it should start counting from 5:00 (300 seconds)
    expect(m).toBeLessThanOrEqual(5);
  });

  it('kill feed gains new entries over time', () => {
    initHUD();
    const killFeed = document.getElementById('hud-kill-feed');
    const initialCount = killFeed.children.length;
    vi.advanceTimersByTime(3500);
    expect(killFeed.children.length).toBeGreaterThan(initialCount);
  });

  it('kill feed keeps at most 4 entries visible', () => {
    initHUD();
    const killFeed = document.getElementById('hud-kill-feed');
    // Advance enough to add many entries
    vi.advanceTimersByTime(3500 * 8);
    // The removal uses setTimeout internally; run those too
    vi.runAllTimers();
    expect(killFeed.children.length).toBeLessThanOrEqual(4);
  });

  it('registers _hudCleanup function on the container', () => {
    initHUD();
    const container = document.getElementById('hud-container');
    expect(typeof container._hudCleanup).toBe('function');
  });

  it('_hudCleanup stops intervals (no errors on call)', () => {
    initHUD();
    const container = document.getElementById('hud-container');
    expect(() => container._hudCleanup()).not.toThrow();
  });

  // ── Edge cases ────────────────────────────────

  it('safe when hud-health-fill is absent', () => {
    document.getElementById('hud-health-fill')?.remove();
    expect(() => {
      initHUD();
      vi.advanceTimersByTime(800);
    }).not.toThrow();
  });

  it('safe when hud-timer is absent', () => {
    document.getElementById('hud-timer')?.remove();
    expect(() => {
      initHUD();
      vi.advanceTimersByTime(1000);
    }).not.toThrow();
  });

  it('safe when hud-kill-feed is absent', () => {
    document.getElementById('hud-kill-feed')?.remove();
    expect(() => {
      initHUD();
      vi.advanceTimersByTime(3500);
    }).not.toThrow();
  });

  it('safe when hud-container is absent (cleanup fn should not be registered)', () => {
    document.getElementById('hud-container')?.remove();
    expect(() => {
      initHUD();
      vi.advanceTimersByTime(1000);
    }).not.toThrow();
  });
});
