import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderLobby, initLobby } from '../src/screens/lobby.js';

// ─────────────────────────────────────────────
// Helper: mount the lobby screen into the DOM
// ─────────────────────────────────────────────
function mount() {
  const container = document.createElement('div');
  container.id = 'lobbyRoot';
  container.innerHTML = renderLobby();
  document.body.appendChild(container);
}

describe('Lobby Screen', () => {
  beforeEach(() => {
    mount();
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  // ── renderLobby() ─────────────────────────────

  it('renders without throwing', () => {
    expect(() => renderLobby()).not.toThrow();
  });

  it('returns a non-empty HTML string', () => {
    const html = renderLobby();
    expect(typeof html).toBe('string');
    expect(html.trim().length).toBeGreaterThan(0);
  });

  it('contains the season banner', () => {
    expect(document.querySelector('.lobby-season-banner')).toBeTruthy();
  });

  it('contains the PLAY button', () => {
    expect(document.getElementById('playBtn')).toBeTruthy();
  });

  it('contains the START MATCH button', () => {
    expect(document.getElementById('startMatchBtn')).toBeTruthy();
  });

  it('contains the game mode selector', () => {
    expect(document.getElementById('gameModeBtn')).toBeTruthy();
  });

  it('contains 4 lobby tabs', () => {
    const tabs = document.querySelectorAll('#lobbyTabs .tab-bar__item');
    expect(tabs.length).toBe(4);
  });

  it('lobby stats grid has 4 stat cells', () => {
    const stats = document.querySelectorAll('.lobby-stat');
    expect(stats.length).toBe(4);
  });

  it('friends list has at least 3 friends', () => {
    const friends = document.querySelectorAll('.lobby-friend');
    expect(friends.length).toBeGreaterThanOrEqual(3);
  });

  it('countdown has 3 segments', () => {
    const segs = document.querySelectorAll('.countdown__segment');
    expect(segs.length).toBe(3);
  });

  // ── initLobby() ───────────────────────────────

  it('initLobby runs without throwing', () => {
    expect(() => initLobby()).not.toThrow();
  });

  it('PLAY button enters finding-match state on click', () => {
    initLobby();
    const btn = document.getElementById('playBtn');
    btn.click();
    expect(btn.textContent).toMatch(/FINDING MATCH/i);
    expect(btn.style.pointerEvents).toBe('none');
  });

  it('PLAY button resets after 3 seconds', () => {
    initLobby();
    const btn = document.getElementById('playBtn');
    btn.click();
    vi.advanceTimersByTime(3000);
    expect(btn.textContent).toMatch(/PLAY/i);
    expect(btn.style.pointerEvents).toBe('auto');
  });

  it('game mode cycles through modes on click', () => {
    initLobby();
    const btn = document.getElementById('gameModeBtn');
    const modeEl = btn.querySelector('.text-cyan');
    const firstMode = modeEl.textContent;

    btn.click();
    const secondMode = modeEl.textContent;
    expect(secondMode).not.toBe(firstMode);

    // Clicking 4 more times (total 5 = full cycle) returns to firstMode
    for (let i = 0; i < 4; i++) btn.click();
    expect(modeEl.textContent).toBe(firstMode);
  });

  it('tab switching changes the active tab', () => {
    initLobby();
    const tabs = [...document.querySelectorAll('#lobbyTabs .tab-bar__item')];
    // Click second tab
    tabs[1].click();
    expect(tabs[1].classList.contains('tab-bar__item--active')).toBe(true);
    expect(tabs[0].classList.contains('tab-bar__item--active')).toBe(false);
  });

  it('clicking each tab only leaves that tab active', () => {
    initLobby();
    const tabs = [...document.querySelectorAll('#lobbyTabs .tab-bar__item')];
    tabs.forEach((tab, i) => {
      tab.click();
      const actives = tabs.filter(t => t.classList.contains('tab-bar__item--active'));
      expect(actives.length).toBe(1);
      expect(actives[0]).toBe(tab);
    });
  });

  it('countdown updates after 1 second', () => {
    initLobby();
    const segs = document.querySelectorAll('.countdown__segment');
    const initialSecs = segs[2].textContent; // seconds segment
    vi.advanceTimersByTime(1000);
    // The seconds segment should have changed
    const updatedSecs = segs[2].textContent;
    expect(updatedSecs).not.toBe(initialSecs);
  });

  // ── Edge cases ────────────────────────────────

  it('initLobby is safe to call when play button is absent', () => {
    document.getElementById('playBtn')?.remove();
    expect(() => initLobby()).not.toThrow();
  });

  it('initLobby is safe to call when gameModeBtn is absent', () => {
    document.getElementById('gameModeBtn')?.remove();
    expect(() => initLobby()).not.toThrow();
  });

  it('initLobby is safe to call when lobbyTabs is absent', () => {
    document.getElementById('lobbyTabs')?.remove();
    expect(() => initLobby()).not.toThrow();
  });

  it('initLobby is safe when countdown segments are absent', () => {
    document.querySelectorAll('.countdown__segment').forEach(el => el.remove());
    expect(() => initLobby()).not.toThrow();
  });

  it('renderLobby can be called multiple times without side effects', () => {
    const html1 = renderLobby();
    const html2 = renderLobby();
    expect(html1).toBe(html2);
  });
});
