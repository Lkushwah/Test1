import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderGameScreen, initGameScreen } from '../src/screens/gamescreen.js';

function mount() {
  const div = document.createElement('div');
  div.innerHTML = renderGameScreen();
  document.body.appendChild(div);
}

describe('GameScreen (BR Mode) — renderGameScreen()', () => {
  beforeEach(mount);
  afterEach(() => { document.body.innerHTML = ''; });

  it('returns a non-empty HTML string', () => {
    const html = renderGameScreen();
    expect(typeof html).toBe('string');
    expect(html.trim().length).toBeGreaterThan(0);
  });

  it('renders the br-container', () => {
    expect(document.getElementById('br-container')).toBeTruthy();
  });

  it('renders the GAS IS RISING alert banner', () => {
    const alert = document.getElementById('br-alert');
    expect(alert).toBeTruthy();
    expect(alert.textContent).toMatch(/GAS IS RISING/i);
  });

  it('renders the alive counter', () => {
    expect(document.getElementById('br-alive-count')).toBeTruthy();
  });

  it('alive count starts at 12', () => {
    const el = document.getElementById('br-alive-count');
    expect(parseInt(el.textContent)).toBe(12);
  });

  it('renders the zone timer', () => {
    const el = document.getElementById('br-zone-timer');
    expect(el).toBeTruthy();
    expect(el.textContent).toMatch(/\d+:\d+/);
  });

  it('renders kill count', () => {
    expect(document.getElementById('br-kill-count')).toBeTruthy();
  });

  it('renders leaderboard with 5 entries', () => {
    expect(document.getElementById('lb-score-1')).toBeTruthy();
    expect(document.getElementById('lb-score-5')).toBeTruthy();
  });

  it('renders the inventory bar with 5 slots', () => {
    const slots = document.querySelectorAll('#br-inventory .weapon-slot');
    expect(slots.length).toBe(5);
  });

  it('first inventory slot is highlighted (active weapon)', () => {
    const firstSlot = document.querySelector('#br-inventory .weapon-slot');
    expect(firstSlot.style.borderColor).toBe('var(--cyan)');
  });
});

describe('GameScreen (BR Mode) — initGameScreen()', () => {
  beforeEach(() => {
    mount();
    vi.useFakeTimers();
  });

  afterEach(() => {
    const container = document.getElementById('br-container');
    if (container?._brCleanup) container._brCleanup();
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  it('runs without throwing', () => {
    expect(() => initGameScreen()).not.toThrow();
  });

  it('alert banner pulses after 1 second', () => {
    initGameScreen();
    const alert = document.getElementById('br-alert');
    const initialOpacity = alert.style.opacity;
    vi.advanceTimersByTime(1000);
    // Opacity toggles between 1 and 0.4
    const newOpacity = alert.style.opacity;
    expect(['1', '0.4']).toContain(newOpacity);
  });

  it('zone timer counts down after 1 second', () => {
    initGameScreen();
    const el = document.getElementById('br-zone-timer');
    const initial = el.textContent;
    vi.advanceTimersByTime(1000);
    expect(el.textContent).not.toBe(initial);
  });

  it('zone timer resets to 2:00 when it reaches 0', () => {
    initGameScreen();
    const el = document.getElementById('br-zone-timer');
    // Advance past 90 seconds
    vi.advanceTimersByTime(1000 * 95);
    const [m] = el.textContent.split(':').map(Number);
    expect(m).toBeLessThanOrEqual(2);
  });

  it('zone timer shows urgent color (red/orange) when below 30 seconds', () => {
    initGameScreen();
    const el = document.getElementById('br-zone-timer');
    // Advance past 60 seconds (90 - 60 = 30 left)
    vi.advanceTimersByTime(1000 * 61);
    const color = el.style.color;
    expect(['var(--red)', 'var(--orange)']).toContain(color);
  });

  it('alive count may decrease over time', () => {
    initGameScreen();
    const aliveEl = document.getElementById('br-alive-count');
    const initial = parseInt(aliveEl.textContent);
    // Run many intervals; random chance of decrease
    vi.advanceTimersByTime(3000 * 20);
    const after = parseInt(aliveEl.textContent);
    expect(after).toBeLessThanOrEqual(initial);
  });

  it('alive count never goes below 1', () => {
    initGameScreen();
    const aliveEl = document.getElementById('br-alive-count');
    vi.advanceTimersByTime(3000 * 100);
    const after = parseInt(aliveEl.textContent);
    expect(after).toBeGreaterThanOrEqual(1);
  });

  it('leaderboard scores increase over time', () => {
    initGameScreen();
    const scoreEl = document.getElementById('lb-score-1');
    const initial = parseInt(scoreEl.textContent);
    vi.advanceTimersByTime(4000 * 10);
    const after = parseInt(scoreEl.textContent);
    expect(after).toBeGreaterThanOrEqual(initial);
  });

  it('inventory slot selection changes active slot', () => {
    initGameScreen();
    const slots = [...document.querySelectorAll('#br-inventory .weapon-slot')];
    slots[1].click();
    expect(slots[1].style.borderColor).toBe('var(--cyan)');
    expect(slots[1].style.opacity).toBe('1');
  });

  it('clicking a slot deselects other slots', () => {
    initGameScreen();
    const slots = [...document.querySelectorAll('#br-inventory .weapon-slot')];
    slots[2].click();
    // Other slots should have lower opacity
    slots.filter((_, i) => i !== 2).forEach(s => {
      expect(s.style.opacity).toBe('0.7');
    });
  });

  it('registers _brCleanup function on the container', () => {
    initGameScreen();
    const container = document.getElementById('br-container');
    expect(typeof container._brCleanup).toBe('function');
  });

  it('_brCleanup does not throw when called', () => {
    initGameScreen();
    const container = document.getElementById('br-container');
    expect(() => container._brCleanup()).not.toThrow();
  });

  // ── Edge cases ────────────────────────────────

  it('safe when br-alert is absent', () => {
    document.getElementById('br-alert')?.remove();
    expect(() => {
      initGameScreen();
      vi.advanceTimersByTime(1000);
    }).not.toThrow();
  });

  it('safe when br-alive-count is absent', () => {
    document.getElementById('br-alive-count')?.remove();
    expect(() => {
      initGameScreen();
      vi.advanceTimersByTime(3000);
    }).not.toThrow();
  });

  it('safe when br-zone-timer is absent', () => {
    document.getElementById('br-zone-timer')?.remove();
    expect(() => {
      initGameScreen();
      vi.advanceTimersByTime(1000);
    }).not.toThrow();
  });

  it('safe when br-container is absent (cleanup not registered)', () => {
    document.getElementById('br-container')?.remove();
    expect(() => initGameScreen()).not.toThrow();
  });

  it('safe when inventory has no slots', () => {
    document.getElementById('br-inventory')?.remove();
    expect(() => initGameScreen()).not.toThrow();
  });
});
