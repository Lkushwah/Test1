import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderBattlePass, initBattlePass } from '../src/screens/battlepass.js';

function mount() {
  const div = document.createElement('div');
  div.innerHTML = renderBattlePass();
  document.body.appendChild(div);
}

describe('BattlePass Screen — renderBattlePass()', () => {
  beforeEach(mount);
  afterEach(() => { document.body.innerHTML = ''; });

  it('returns a non-empty HTML string', () => {
    const html = renderBattlePass();
    expect(typeof html).toBe('string');
    expect(html.trim().length).toBeGreaterThan(0);
  });

  it('renders the season title', () => {
    expect(document.body.textContent).toMatch(/Season 1/i);
  });

  it('renders 50 free tier cards', () => {
    const cards = document.querySelectorAll('#bp-free-row .tier-card');
    expect(cards.length).toBe(50);
  });

  it('renders 50 premium tier cards', () => {
    const cards = document.querySelectorAll('#bp-premium-row .tier-card');
    expect(cards.length).toBe(50);
  });

  it('tier 45 card is marked active (current tier)', () => {
    const activeFree = document.querySelector('#bp-free-row .tier-card--active');
    expect(activeFree).toBeTruthy();
    expect(activeFree.dataset.tier).toBe('45');
  });

  it('tiers before 45 are marked as completed', () => {
    const completed = document.querySelectorAll('#bp-free-row .tier-card:not(.tier-card--active):not(.tier-card--locked)');
    // All 44 before 45 should be completed
    expect(completed.length).toBe(44);
  });

  it('tiers after 45 are marked as locked', () => {
    const locked = document.querySelectorAll('#bp-free-row .tier-card--locked');
    expect(locked.length).toBe(5); // tiers 46-50
  });

  it('XP progress bar reflects 65% (650/1000)', () => {
    // The progress bar fill should have width:65%
    const fill = document.querySelector('.progress-bar--gold .progress-bar__fill');
    expect(fill?.style.width).toBe('65%');
  });

  it('renders the upgrade button', () => {
    expect(document.querySelector('.bp-upgrade-btn')).toBeTruthy();
  });

  it('renders the reward modal (initially hidden)', () => {
    const modal = document.getElementById('bp-reward-modal');
    expect(modal).toBeTruthy();
    expect(modal.classList.contains('modal-overlay--visible')).toBe(false);
  });

  it('renders scroll buttons (left / right)', () => {
    const scrollBtns = document.querySelectorAll('.bp-scroll-btn');
    expect(scrollBtns.length).toBe(2);
  });

  it('renders tier filter tabs (All / Free / Premium)', () => {
    const tabs = document.querySelectorAll('.bp-track-wrapper .tab-bar__item');
    expect(tabs.length).toBe(3);
  });

  it('each tier card has a data-tier attribute', () => {
    document.querySelectorAll('.tier-card').forEach(card => {
      const tier = parseInt(card.dataset.tier);
      expect(tier).toBeGreaterThanOrEqual(1);
      expect(tier).toBeLessThanOrEqual(50);
    });
  });

  it('each tier card has data-reward-name attribute', () => {
    document.querySelectorAll('.tier-card').forEach(card => {
      expect(card.dataset.rewardName).toBeTruthy();
    });
  });

  it('premium tier cards have tier-card--premium class', () => {
    const premiumCards = document.querySelectorAll('#bp-premium-row .tier-card--premium');
    expect(premiumCards.length).toBe(50);
  });
});

describe('BattlePass Screen — initBattlePass()', () => {
  beforeEach(() => {
    mount();
    vi.useFakeTimers();
    // Mock scrollTo/scrollBy on the track element
    const track = document.getElementById('bp-track-scroll');
    if (track) {
      track.scrollTo = vi.fn();
      track.scrollBy = vi.fn();
    }
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  it('runs without throwing', () => {
    expect(() => initBattlePass()).not.toThrow();
  });

  it('clicking a tier card opens the reward modal', () => {
    initBattlePass();
    const firstCard = document.querySelector('.tier-card');
    firstCard.click();
    const modal = document.getElementById('bp-reward-modal');
    expect(modal.classList.contains('modal-overlay--visible')).toBe(true);
  });

  it('modal title shows the correct tier number', () => {
    initBattlePass();
    const card = document.querySelector('[data-tier="10"]');
    card.click();
    expect(document.getElementById('bp-modal-title').textContent).toMatch(/Tier 10/i);
  });

  it('clicking X button closes the modal', () => {
    initBattlePass();
    const card = document.querySelector('.tier-card');
    card.click();
    document.getElementById('bp-modal-close').click();
    const modal = document.getElementById('bp-reward-modal');
    expect(modal.classList.contains('modal-overlay--visible')).toBe(false);
  });

  it('clicking modal overlay backdrop closes the modal', () => {
    initBattlePass();
    const card = document.querySelector('.tier-card');
    card.click();
    const modal = document.getElementById('bp-reward-modal');
    modal.dispatchEvent(new MouseEvent('click', { bubbles: true, target: modal }));
    // Simulate clicking on the overlay (not the inner modal)
    Object.defineProperty(modal, 'target', { value: modal, writable: true });
    const evt = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(evt, 'target', { value: modal });
    modal.dispatchEvent(evt);
    expect(modal.classList.contains('modal-overlay--visible')).toBe(false);
  });

  it('completed tier card shows CLAIMED status in modal', () => {
    initBattlePass();
    const completedCard = document.querySelector('#bp-free-row .tier-card:not(.tier-card--active):not(.tier-card--locked)');
    completedCard.click();
    const status = document.getElementById('bp-modal-status');
    expect(status.textContent).toMatch(/CLAIMED/i);
  });

  it('active tier card shows IN PROGRESS status in modal', () => {
    initBattlePass();
    const activeCard = document.querySelector('#bp-free-row .tier-card--active');
    activeCard.click();
    const status = document.getElementById('bp-modal-status');
    expect(status.textContent).toMatch(/IN PROGRESS/i);
  });

  it('locked tier card shows LOCKED status in modal', () => {
    initBattlePass();
    const lockedCard = document.querySelector('#bp-free-row .tier-card--locked');
    lockedCard.click();
    const status = document.getElementById('bp-modal-status');
    expect(status.textContent).toMatch(/LOCKED/i);
  });

  it('premium card shows "👑 Premium Track" in modal', () => {
    initBattlePass();
    const premiumCard = document.querySelector('#bp-premium-row .tier-card');
    premiumCard.click();
    expect(document.getElementById('bp-modal-track').textContent).toMatch(/Premium Track/i);
  });

  it('free card shows "Free Track" in modal', () => {
    initBattlePass();
    const freeCard = document.querySelector('#bp-free-row .tier-card');
    freeCard.click();
    expect(document.getElementById('bp-modal-track').textContent).toMatch(/Free Track/i);
  });

  it('filter tab "Free" hides premium row', () => {
    initBattlePass();
    const freePremiumRow = document.getElementById('bp-premium-row');
    const freeTab = [...document.querySelectorAll('.bp-track-wrapper .tab-bar__item')].find(t => t.dataset.filter === 'free');
    freeTab.click();
    expect(freePremiumRow.style.display).toBe('none');
  });

  it('filter tab "Premium" hides free row', () => {
    initBattlePass();
    const freeRow = document.getElementById('bp-free-row');
    const premiumTab = [...document.querySelectorAll('.bp-track-wrapper .tab-bar__item')].find(t => t.dataset.filter === 'premium');
    premiumTab.click();
    expect(freeRow.style.display).toBe('none');
  });

  it('filter tab "All" shows both rows', () => {
    initBattlePass();
    const freeRow = document.getElementById('bp-free-row');
    const premiumRow = document.getElementById('bp-premium-row');
    // First filter to premium, then switch back to all
    const allTab = [...document.querySelectorAll('.bp-track-wrapper .tab-bar__item')].find(t => t.dataset.filter === 'all');
    const premiumTab = [...document.querySelectorAll('.bp-track-wrapper .tab-bar__item')].find(t => t.dataset.filter === 'premium');
    premiumTab.click();
    allTab.click();
    expect(freeRow.style.display).toBe('flex');
    expect(premiumRow.style.display).toBe('flex');
  });

  it('scroll RIGHT button calls scrollBy with positive amount', () => {
    initBattlePass();
    const track = document.getElementById('bp-track-scroll');
    const rightBtn = [...document.querySelectorAll('.bp-scroll-btn')].find(b => b.dataset.dir === 'right');
    rightBtn.click();
    expect(track.scrollBy).toHaveBeenCalledWith(expect.objectContaining({ left: 400 }));
  });

  it('scroll LEFT button calls scrollBy with negative amount', () => {
    initBattlePass();
    const track = document.getElementById('bp-track-scroll');
    const leftBtn = [...document.querySelectorAll('.bp-scroll-btn')].find(b => b.dataset.dir === 'left');
    leftBtn.click();
    expect(track.scrollBy).toHaveBeenCalledWith(expect.objectContaining({ left: -400 }));
  });

  // ── Edge cases ────────────────────────────────

  it('safe when bp-track-scroll is absent', () => {
    document.getElementById('bp-track-scroll')?.remove();
    expect(() => initBattlePass()).not.toThrow();
  });

  it('safe when bp-reward-modal is absent', () => {
    document.getElementById('bp-reward-modal')?.remove();
    expect(() => initBattlePass()).not.toThrow();
  });

  it('safe when bp-modal-close is absent', () => {
    document.getElementById('bp-modal-close')?.remove();
    expect(() => initBattlePass()).not.toThrow();
  });
});
