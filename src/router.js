// ============================================
// AERO STRIKE — SPA Router
// Hash-based routing with animated transitions
// ============================================

export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.container = null;
    this.onRouteChange = null;
    // Track in-flight transition so rapid clicks don't stack up
    this._transitioning = false;
    this._pendingRoute = null;
    // Cleanup callbacks registered by screens
    this._cleanupFns = {};
  }

  init(containerId) {
    this.container = document.getElementById(containerId);
    window.addEventListener('hashchange', () => this.handleRoute());
    // Initial route
    if (!window.location.hash) {
      window.location.hash = '#lobby';
    } else {
      this.handleRoute();
    }
  }

  register(name, renderFn) {
    this.routes[name] = renderFn;
  }

  /**
   * Screens can register a teardown function that will be called when
   * the user navigates away from that screen.
   */
  registerCleanup(name, cleanupFn) {
    this._cleanupFns[name] = cleanupFn;
  }

  navigate(route) {
    window.location.hash = `#${route}`;
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'lobby';
    const renderFn = this.routes[hash];

    if (!renderFn) {
      this.navigate('lobby');
      return;
    }

    // If same route, do nothing
    if (hash === this.currentRoute) return;

    // If a transition is already running, remember the latest destination
    // and let the running transition finish, then immediately kick off
    // another one.
    if (this._transitioning) {
      this._pendingRoute = hash;
      return;
    }

    this._doTransition(hash, renderFn);
  }

  _doTransition(hash, renderFn) {
    if (!this.container) return;

    this._transitioning = true;
    this._pendingRoute = null;

    // Run cleanup for the screen we are leaving
    const leaving = this.currentRoute;
    if (leaving && typeof this._cleanupFns[leaving] === 'function') {
      try { this._cleanupFns[leaving](); } catch (_) {}
    }

    // Transition out
    this.container.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    this.container.style.opacity = '0';
    this.container.style.transform = 'translateY(10px)';

    setTimeout(() => {
      // Swap content
      this.container.innerHTML = '';
      const content = renderFn();
      if (typeof content === 'string') {
        this.container.innerHTML = content;
      } else if (content instanceof HTMLElement) {
        this.container.appendChild(content);
      }

      // Transition in
      requestAnimationFrame(() => {
        this.container.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        this.container.style.opacity = '1';
        this.container.style.transform = 'translateY(0)';
      });

      this.currentRoute = hash;
      if (this.onRouteChange) {
        this.onRouteChange(hash);
      }

      this._transitioning = false;

      // If another navigation was requested while we were busy, handle it now
      if (this._pendingRoute && this._pendingRoute !== hash) {
        const nextHash = this._pendingRoute;
        const nextFn = this.routes[nextHash];
        if (nextFn) {
          this._doTransition(nextHash, nextFn);
        }
      }
    }, 200);
  }
}

export const router = new Router();
