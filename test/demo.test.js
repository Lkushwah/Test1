import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initDemo, destroyDemo } from '../src/screens/demo.js';

describe('Demo 2D Game Engine', () => {
  beforeEach(() => {
    // Setup minimal DOM
    document.body.innerHTML = `
      <div id="demoCanvasContainer">
        <canvas id="demoCanvas" width="960" height="540"></canvas>
      </div>
      <button id="btnSpawnBot"></button>
      <button id="btnSpawnHp"></button>
      <button id="btnSpawnFuel"></button>
      <button id="btnSpawnOverdrive"></button>
      <div id="mobileControls">
        <button id="btnLeft"></button>
        <button id="btnRight"></button>
        <button id="btnUp"></button>
        <button id="btnDown"></button>
        <button id="btnShoot"></button>
        <button id="btnDash"></button>
        <button id="btnGrenade"></button>
      </div>
    `;
    
    // Mock HTMLCanvasElement context since JSDOM doesn't implement Canvas API fully
    HTMLCanvasElement.prototype.getContext = () => ({
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      drawImage: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      scale: vi.fn(),
      fillText: vi.fn(),
      createLinearGradient: vi.fn(() => ({
        addColorStop: vi.fn()
      }))
    });
  });

  afterEach(() => {
    destroyDemo();
    document.body.innerHTML = '';
  });

  it('initializes the game instance without crashing', () => {
    initDemo();
    expect(window.gameInstance).toBeDefined();
    expect(window.gameInstance.players.length).toBe(2);
  });

  it('spawns a debug enemy and executes update loop safely', () => {
    initDemo();
    const game = window.gameInstance;
    
    const initialEnemyCount = game.enemies.length;
    game.spawnDebugEnemy(500, 200);
    expect(game.enemies.length).toBe(initialEnemyCount + 1);

    // Call update() to simulate one frame of physics and AI
    // If there is a ReferenceError (like platforms is not defined), this will throw and fail the test.
    expect(() => {
      game.update();
    }).not.toThrow();
  });

  it('clamps player to map bounds', () => {
    initDemo();
    const game = window.gameInstance;
    const p1 = game.players[0];
    
    // Move player completely out of bounds to the left
    p1.x = -100;
    p1.vx = -10;
    
    // Force some keypresses so game doesn't instantly think player is doing nothing
    game.keys['a'] = true;

    game.update(); // Should clamp x to 0
    expect(p1.x).toBeGreaterThanOrEqual(0);

    // Move player out of bounds to the right
    p1.x = game.mapWidth + 100;
    p1.vx = 10;
    game.keys['a'] = false;
    game.keys['d'] = true;
    
    game.update(); // Should clamp x to mapWidth - p1.width
    expect(p1.x + p1.width).toBeLessThanOrEqual(game.mapWidth);
  });

  it('spawns pickups via debug method', () => {
    initDemo();
    const game = window.gameInstance;
    
    const initialPickups = game.pickups.length;
    game.spawnDebugPickup(100, 100, 'health');
    game.spawnDebugPickup(200, 100, 'fuel');
    
    expect(game.pickups.length).toBe(initialPickups + 2);
  });

  it('can jetpack when pressing w or space', () => {
    initDemo();
    const game = window.gameInstance;
    const p1 = game.players[0];
    
    game.keys['w'] = true;
    expect(() => {
      game.update();
      game.update();
    }).not.toThrow();
  });
});
