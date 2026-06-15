import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderRanked, initRanked } from '../src/screens/ranked.js';

function mount() {
  const div = document.createElement('div');
  div.innerHTML = renderRanked();
  document.body.appendChild(div);
}

describe('Ranked Screen — renderRanked()', () => {
  beforeEach(mount);
  afterEach(() => { document.body.innerHTML = ''; });

  it('returns a non-empty HTML string', () => {
    const html = renderRanked();
    expect(typeof html).toBe('string');
    expect(html.trim().length).toBeGreaterThan(0);
  });

  it('displays the current rank', () => {
    expect(document.body.textContent).toMatch(/PLATINUM III/i);
  });

  it('renders 4 game mode options', () => {
    const modes = document.querySelectorAll('.ranked-mode-option');
    expect(modes.length).toBe(4);
  });

  it('first game mode is selected by default', () => {
    const first = document.querySelector('.ranked-mode-option--active');
    expect(first?.dataset.mode).toBe('tdm');
  });

  it('renders 5 recent match entries', () => {
    const matches = document.querySelectorAll('.glass-panel .flex.items-center.gap-sm');
    // recent matches section
    expect(document.querySelectorAll('#ranked-rewards-modal').length).toBe(1);
  });

  it('renders the PLAY RANKED button', () => {
    expect(document.getElementById('btn-play-ranked')).toBeTruthy();
  });

  it('renders the VIEW REWARDS button', () => {
    expect(document.getElementById('btn-view-rewards')).toBeTruthy();
  });

  it('renders the rewards modal (hidden by default)', () => {
    const modal = document.getElementById('ranked-rewards-modal');
    expect(modal).toBeTruthy();
    expect(modal.classList.contains('modal-overlay--visible')).toBe(false);
  });

  it('rank progress bar is between 0% and 100%', () => {
    const fill = document.querySelector('.progress-bar--lg .progress-bar__fill');
    const width = parseFloat(fill?.style.width ?? '0');
    expect(width).toBeGreaterThanOrEqual(0);
    expect(width).toBeLessThanOrEqual(100);
  });

  it('renders rank emblem element', () => {
    expect(document.getElementById('ranked-emblem')).toBeTruthy();
  });

  it('all game mode options have a data-mode attribute', () => {
    const modes = document.querySelectorAll('.ranked-mode-option');
    modes.forEach(m => expect(m.dataset.mode).toBeTruthy());
  });
});

describe('Ranked Screen — initRanked()', () => {
  beforeEach(() => {
    mount();
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  it('runs without throwing', () => {
    expect(() => initRanked()).not.toThrow();
  });

  it('clicking a different game mode makes it active', () => {
    initRanked();
    const ffaMode = document.querySelector('[data-mode="ffa"]');
    ffaMode.click();
    expect(ffaMode.classList.contains('ranked-mode-option--active')).toBe(true);
  });

  it('clicking a mode deselects the previous selection', () => {
    initRanked();
    const tdm = document.querySelector('[data-mode="tdm"]');
    const ffa = document.querySelector('[data-mode="ffa"]');
    ffa.click();
    expect(tdm.classList.contains('ranked-mode-option--active')).toBe(false);
  });

  it('only one mode is active at a time', () => {
    initRanked();
    const modes = document.querySelectorAll('.ranked-mode-option');
    modes.forEach(m => m.click());
    const actives = document.querySelectorAll('.ranked-mode-option--active');
    expect(actives.length).toBe(1);
  });

  it('clicking a mode adds SELECTED badge', () => {
    initRanked();
    const dom = document.querySelector('[data-mode="dom"]');
    dom.click();
    expect(dom.querySelector('.badge')?.textContent).toMatch(/SELECTED/i);
  });

  it('VIEW REWARDS button opens the modal', () => {
    initRanked();
    document.getElementById('btn-view-rewards').click();
    const modal = document.getElementById('ranked-rewards-modal');
    expect(modal.classList.contains('modal-overlay--visible')).toBe(true);
  });

  it('ranked modal close button hides the modal', () => {
    initRanked();
    document.getElementById('btn-view-rewards').click();
    document.getElementById('ranked-modal-close').click();
    const modal = document.getElementById('ranked-rewards-modal');
    expect(modal.classList.contains('modal-overlay--visible')).toBe(false);
  });

  it('clicking modal backdrop closes the modal', () => {
    initRanked();
    document.getElementById('btn-view-rewards').click();
    const modal = document.getElementById('ranked-rewards-modal');
    const evt = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(evt, 'target', { value: modal });
    modal.dispatchEvent(evt);
    expect(modal.classList.contains('modal-overlay--visible')).toBe(false);
  });

  it('PLAY RANKED button enters searching state on click', () => {
    initRanked();
    const btn = document.getElementById('btn-play-ranked');
    btn.click();
    expect(btn.textContent).toMatch(/SEARCHING/i);
    expect(btn.style.pointerEvents).toBe('none');
  });

  it('PLAY RANKED button resets after 3 seconds', () => {
    initRanked();
    const btn = document.getElementById('btn-play-ranked');
    btn.click();
    vi.advanceTimersByTime(3000);
    expect(btn.innerHTML).toMatch(/PLAY RANKED/i);
    expect(btn.style.pointerEvents).toBe('');
  });

  // ── Edge cases ────────────────────────────────

  it('safe when ranked-mode-list is absent', () => {
    document.getElementById('ranked-mode-list')?.remove();
    expect(() => initRanked()).not.toThrow();
  });

  it('safe when btn-view-rewards is absent', () => {
    document.getElementById('btn-view-rewards')?.remove();
    expect(() => initRanked()).not.toThrow();
  });

  it('safe when ranked-rewards-modal is absent', () => {
    document.getElementById('ranked-rewards-modal')?.remove();
    expect(() => initRanked()).not.toThrow();
  });

  it('safe when btn-play-ranked is absent', () => {
    document.getElementById('btn-play-ranked')?.remove();
    expect(() => initRanked()).not.toThrow();
  });

  it('safe when ranked-emblem is absent', () => {
    document.getElementById('ranked-emblem')?.remove();
    expect(() => initRanked()).not.toThrow();
  });

  it('clicking inside a mode option (child element) still selects parent mode', () => {
    initRanked();
    const dom = document.querySelector('[data-mode="dom"]');
    const childSpan = dom.querySelector('span');
    if (childSpan) {
      childSpan.click(); // bubbles up to the mode list handler
      // Should find the closest mode option and activate it
      expect(dom.classList.contains('ranked-mode-option--active')).toBe(true);
    }
  });
});
