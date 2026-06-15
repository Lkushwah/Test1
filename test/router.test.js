import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Router } from '../src/router.js';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function makeContainer(id = 'screenContainer') {
  const div = document.createElement('div');
  div.id = id;
  document.body.appendChild(div);
  return div;
}

function cleanup() {
  document.body.innerHTML = '';
  window.location.hash = '';
}

// ─────────────────────────────────────────────
// Router Unit Tests
// ─────────────────────────────────────────────

describe('Router', () => {
  let router;

  beforeEach(() => {
    cleanup();
    makeContainer();
    router = new Router();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  // ── Construction ──────────────────────────────

  it('initializes with sensible defaults', () => {
    expect(router.routes).toEqual({});
    expect(router.currentRoute).toBeNull();
    expect(router.container).toBeNull();
    expect(router.onRouteChange).toBeNull();
  });

  // ── register() ────────────────────────────────

  it('register() stores a render function by name', () => {
    const fn = vi.fn(() => '<div>Hello</div>');
    router.register('lobby', fn);
    expect(router.routes['lobby']).toBe(fn);
  });

  it('register() overwrites an existing route', () => {
    const fn1 = vi.fn(() => 'A');
    const fn2 = vi.fn(() => 'B');
    router.register('lobby', fn1);
    router.register('lobby', fn2);
    expect(router.routes['lobby']).toBe(fn2);
  });

  // ── registerCleanup() ─────────────────────────

  it('registerCleanup() stores cleanup function by name', () => {
    const fn = vi.fn();
    router.registerCleanup('demo', fn);
    expect(router._cleanupFns['demo']).toBe(fn);
  });

  // ── init() ────────────────────────────────────

  it('init() sets the container from document', () => {
    router.register('lobby', () => '<div>Lobby</div>');
    window.location.hash = '#lobby';
    router.init('screenContainer');
    expect(router.container).toBeTruthy();
    expect(router.container.id).toBe('screenContainer');
  });

  it('init() defaults to #lobby when no hash is present', () => {
    router.register('lobby', () => '<div>Lobby</div>');
    window.location.hash = '';
    router.init('screenContainer');
    // Setting location.hash triggers hashchange; after timer fires it renders
    vi.runAllTimers();
    expect(router.currentRoute).toBe('lobby');
  });

  it('init() renders current route when hash already set', () => {
    router.register('ranked', () => '<div>Ranked</div>');
    window.location.hash = '#ranked';
    router.init('screenContainer');
    vi.runAllTimers();
    expect(router.currentRoute).toBe('ranked');
  });

  // ── navigate() ────────────────────────────────

  it('navigate() updates the location hash', () => {
    router.navigate('battlepass');
    expect(window.location.hash).toBe('#battlepass');
  });

  // ── handleRoute() ─────────────────────────────

  it('renders string HTML content into the container', () => {
    router.register('lobby', () => '<div id="test-lobby">Lobby Screen</div>');
    router.init('screenContainer');
    window.location.hash = '#lobby';
    router.handleRoute();
    vi.runAllTimers();
    expect(document.getElementById('test-lobby')).toBeTruthy();
  });

  it('renders HTMLElement content into the container', () => {
    router.register('lobby', () => {
      const el = document.createElement('section');
      el.id = 'html-lobby';
      return el;
    });
    router.init('screenContainer');
    window.location.hash = '#lobby';
    router.handleRoute();
    vi.runAllTimers();
    expect(document.getElementById('html-lobby')).toBeTruthy();
  });

  it('redirects to lobby for an unregistered route', () => {
    router.register('lobby', () => '<div>Lobby</div>');
    router.init('screenContainer');
    window.location.hash = '#nonexistent';
    router.handleRoute();
    vi.runAllTimers();
    expect(window.location.hash).toBe('#lobby');
  });

  it('does nothing if navigating to the current route', () => {
    const fn = vi.fn(() => '<div>Lobby</div>');
    router.register('lobby', fn);
    router.init('screenContainer');
    window.location.hash = '#lobby';
    router.handleRoute();
    vi.runAllTimers();

    const callCount = fn.mock.calls.length;
    router.handleRoute(); // Same route again
    vi.runAllTimers();
    expect(fn.mock.calls.length).toBe(callCount); // No additional render
  });

  it('calls onRouteChange callback with the new hash after transition', () => {
    const cb = vi.fn();
    router.register('lobby', () => '<div>Lobby</div>');
    router.onRouteChange = cb;
    router.init('screenContainer');
    window.location.hash = '#lobby';
    router.handleRoute();
    vi.runAllTimers();
    expect(cb).toHaveBeenCalledWith('lobby');
  });

  // ── Rapid navigation / transition guard ──────

  it('does not stack transitions on rapid navigation — only last route wins', () => {
    const fn1 = vi.fn(() => '<div id="r-lobby">Lobby</div>');
    const fn2 = vi.fn(() => '<div id="r-ranked">Ranked</div>');
    router.register('lobby', fn1);
    router.register('ranked', fn2);
    router.container = document.getElementById('screenContainer');

    // Start a transition directly (bypass init/hash complexity)
    router._doTransition('lobby', fn1);
    expect(router._transitioning).toBe(true);

    // Inject pending while in-flight
    router._pendingRoute = 'ranked';

    vi.runAllTimers(); // lobby finishes, queues ranked
    vi.runAllTimers(); // ranked finishes
    expect(router.currentRoute).toBe('ranked');
  });

  it('processes pending route after first transition completes', () => {
    const fn1 = vi.fn(() => '<div>Lobby</div>');
    const fn2 = vi.fn(() => '<div>Ranked</div>');
    router.register('lobby', fn1);
    router.register('ranked', fn2);
    router.container = document.getElementById('screenContainer');

    // Start transition, then inject pending before it settles
    router._doTransition('lobby', fn1);
    router._pendingRoute = 'ranked';

    vi.runAllTimers(); // lobby → queues ranked
    vi.runAllTimers(); // ranked settles
    expect(router.currentRoute).toBe('ranked');
  });

  // ── Cleanup callbacks ─────────────────────────

  it('calls the leaving screen\'s cleanup before rendering new screen', () => {
    const cleanup1 = vi.fn();
    const fn1 = vi.fn(() => '<div>Lobby</div>');
    const fn2 = vi.fn(() => '<div>Ranked</div>');
    router.register('lobby', fn1);
    router.register('ranked', fn2);
    router.registerCleanup('lobby', cleanup1);
    router.init('screenContainer');

    window.location.hash = '#lobby';
    router.handleRoute();
    vi.runAllTimers();

    window.location.hash = '#ranked';
    router.handleRoute();
    vi.runAllTimers();

    expect(cleanup1).toHaveBeenCalledOnce();
  });

  it('does not crash if cleanup throws', () => {
    router.register('lobby', () => '<div>Lobby</div>');
    router.register('ranked', () => '<div>Ranked</div>');
    router.registerCleanup('lobby', () => { throw new Error('oops'); });
    router.init('screenContainer');

    window.location.hash = '#lobby';
    router.handleRoute();
    vi.runAllTimers();

    expect(() => {
      window.location.hash = '#ranked';
      router.handleRoute();
      vi.runAllTimers();
    }).not.toThrow();
    expect(router.currentRoute).toBe('ranked');
  });

  // ── CSS transition properties ─────────────────

  it('fades out container before swapping content', () => {
    router.register('lobby', () => '<div>Lobby</div>');
    router.init('screenContainer');
    window.location.hash = '#lobby';

    const container = router.container;
    router.handleRoute();
    // Before timer fires, opacity should be 0 (transition-out)
    expect(container.style.opacity).toBe('0');
    expect(container.style.transform).toBe('translateY(10px)');
  });

  it('restores container opacity to 1 after transition', () => {
    router.register('lobby', () => '<div>Lobby</div>');
    router.init('screenContainer');
    window.location.hash = '#lobby';
    router.handleRoute();
    vi.runAllTimers();
    expect(router.container.style.opacity).toBe('1');
    expect(router.container.style.transform).toBe('translateY(0)');
  });

  // ── Edge cases ────────────────────────────────

  it('handles init() when containerId does not exist in DOM', () => {
    router.register('lobby', () => '<div>Lobby</div>');
    expect(() => {
      router.init('non-existent-id');
    }).not.toThrow();
    expect(router.container).toBeNull();
  });

  it('handles navigate() being called before init()', () => {
    expect(() => router.navigate('lobby')).not.toThrow();
    expect(window.location.hash).toBe('#lobby');
  });

  it('handles handleRoute() with no container set', () => {
    router.register('lobby', () => '<div>Lobby</div>');
    // Do not call init(); container stays null
    window.location.hash = '#lobby';
    expect(() => {
      router.handleRoute();
      vi.runAllTimers();
    }).not.toThrow();
  });

  it('does not invoke renderFn when container is null', () => {
    const fn = vi.fn(() => '<div>Lobby</div>');
    router.register('lobby', fn);
    window.location.hash = '#lobby';
    router.handleRoute();
    vi.runAllTimers();
    expect(fn).not.toHaveBeenCalled();
  });

  it('hash with extra characters after route name redirects gracefully', () => {
    router.register('lobby', () => '<div>Lobby</div>');
    router.init('screenContainer');
    window.location.hash = '#unknownRoute';
    router.handleRoute();
    vi.runAllTimers();
    // Should redirect to lobby
    expect(window.location.hash).toBe('#lobby');
  });
});
