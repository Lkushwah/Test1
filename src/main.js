import './index.css';
import './screens.css';

import { router } from './router.js';
import { renderLobby, initLobby } from './screens/lobby.js';
import { renderLoadout, initLoadout } from './screens/loadout.js';
import { renderBattlePass, initBattlePass } from './screens/battlepass.js';
import { renderRanked, initRanked } from './screens/ranked.js';
import { renderHUD, initHUD } from './screens/hud.js';
import { renderGameScreen, initGameScreen } from './screens/gamescreen.js';
import { renderDemo, initDemo, destroyDemo } from './screens/demo.js';

document.addEventListener('DOMContentLoaded', () => {
  // Setup Navigation
  const navHTML = `
    <div class="nav-item nav-item--active" data-route="lobby">
      <span>🏠</span> LOBBY
    </div>
    <div class="nav-item" data-route="loadout">
      <span>🔫</span> LOADOUT
    </div>
    <div class="nav-item" data-route="battlepass">
      <span>⭐</span> BATTLE PASS
    </div>
    <div class="nav-item" data-route="ranked">
      <span>⚔️</span> RANKED
    </div>
    <div class="nav-item" data-route="demo">
      <span>🚀</span> 2D DEMO
    </div>
    <div class="nav-item" data-route="hud">
      <span>👁️</span> IN-MATCH HUD
    </div>
    <div class="nav-item" data-route="gamescreen">
      <span>☠️</span> BR MODE
    </div>
  `;
  
  document.getElementById('mainNav').innerHTML = navHTML;

  // Player Card in Sidebar
  document.getElementById('sidebarPlayerCard').innerHTML = `
    <div class="glass-panel" style="padding: 12px; display: flex; align-items: center; gap: 12px;">
      <div style="width: 40px; height: 40px; background: rgba(0, 229, 255, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; border: 1px solid var(--cyan);">
        😎
      </div>
      <div>
        <div class="font-heading" style="font-weight: 600; font-size: 1.1rem; color: var(--text-primary);">PlayerOne</div>
        <div class="text-dim font-mono" style="font-size: 0.75rem;">ID: 7492-AX</div>
      </div>
    </div>
  `;

  // Register Routes
  router.register('lobby', () => {
    setTimeout(initLobby, 50);
    return renderLobby();
  });

  router.register('loadout', () => {
    setTimeout(initLoadout, 50);
    return renderLoadout();
  });

  router.register('battlepass', () => {
    setTimeout(initBattlePass, 50);
    return renderBattlePass();
  });

  router.register('ranked', () => {
    setTimeout(initRanked, 50);
    return renderRanked();
  });

  router.register('hud', () => {
    setTimeout(() => {
      initHUD();
      // Register cleanup so intervals are cleared on navigation away
      const container = document.getElementById('hud-container');
      if (container && container._hudCleanup) {
        router.registerCleanup('hud', container._hudCleanup);
      }
    }, 50);
    return renderHUD();
  });

  router.register('gamescreen', () => {
    setTimeout(() => {
      initGameScreen();
      // Register cleanup so intervals are cleared on navigation away
      const container = document.getElementById('br-container');
      if (container && container._brCleanup) {
        router.registerCleanup('gamescreen', container._brCleanup);
      }
    }, 50);
    return renderGameScreen();
  });

  router.register('demo', () => {
    // Force a fresh restart if gameInstance exists so the loadout changes take effect immediately
    setTimeout(() => {
      if (typeof window.AeroStrikeActiveLoadout !== 'undefined' && typeof window.gameInstance !== 'undefined' && window.gameInstance) {
        window.gameInstance.players[0].classId = window.AeroStrikeActiveLoadout;
        window.gameInstance.restart(); // forces it to read the new activeClassId inside restart logic
      } else {
        initDemo();
      }
    }, 50);
    return renderDemo();
  });

  // Handle cleanup for demo
  router.onRouteChange = (hash) => {
    if (hash !== 'demo' && typeof destroyDemo === 'function') {
      destroyDemo();
    }
    
    // Update Title
    const titleMap = {
      'lobby': 'MAIN LOBBY',
      'loadout': 'LOADOUT',
      'battlepass': 'BATTLE PASS',
      'ranked': 'RANKED MATCH',
      'hud': 'HUD PREVIEW',
      'gamescreen': 'BATTLE ROYALE',
      'demo': '2D DEMO'
    };
    document.getElementById('screenTitle').textContent = titleMap[hash] || 'AERO STRIKE';

    // Update Nav Active State
    document.querySelectorAll('.nav-item').forEach(el => {
      if (el.dataset.route === hash) {
        el.classList.add('nav-item--active');
      } else {
        el.classList.remove('nav-item--active');
      }
    });
  };

  // Nav click handlers
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => {
      router.navigate(el.dataset.route);
    });
  });

  // Initialize router on the screen container
  router.init('screenContainer');

  // Remove loading screen
  setTimeout(() => {
    const loader = document.getElementById('loadingScreen');
    if (loader) {
      loader.classList.add('loading-screen--hidden');
      setTimeout(() => loader.remove(), 600);
    }
  }, 1500);

  // Particles background
  initParticles();
});

function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}vw`;
    p.style.animationDuration = `${10 + Math.random() * 20}s`;
    p.style.animationDelay = `${Math.random() * 10}s`;
    container.appendChild(p);
  }
}
