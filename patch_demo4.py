import re

with open('src/screens/demo.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update MAPS
new_maps = """const MAPS = [
  // Map 0: "The Foundry" (Multi-tiered)
  {
    width: 960, height: 540,
    platforms: [
      { x: 0, y: 500, width: 960, height: 40 },
      { x: 200, y: 400, width: 40, height: 100 },
      { x: 720, y: 400, width: 40, height: 100 },
      { x: 0, y: 320, width: 160, height: 16 },
      { x: 800, y: 320, width: 160, height: 16 },
      { x: 360, y: 340, width: 240, height: 16 },
      { x: 220, y: 220, width: 140, height: 16 },
      { x: 600, y: 220, width: 140, height: 16 },
      { x: 430, y: 120, width: 100, height: 16 },
      { x: 0, y: 150, width: 80, height: 16 },
      { x: 880, y: 150, width: 80, height: 16 },
    ]
  },
  // Map 1: "Symmetrical Arena" (Original)
  {
    width: 960, height: 540,
    platforms: [
      { x: 0, y: 500, width: 960, height: 40 },
      { x: 250, y: 440, width: 30, height: 60 },
      { x: 680, y: 440, width: 30, height: 60 },
      { x: 330, y: 380, width: 300, height: 16 },
      { x: 40, y: 300, width: 200, height: 16 },
      { x: 720, y: 300, width: 200, height: 16 },
      { x: 380, y: 200, width: 200, height: 16 },
      { x: 80, y: 140, width: 120, height: 16 },
      { x: 760, y: 140, width: 120, height: 16 },
    ]
  },
  // Map 2: "Proving Grounds" (Massive Roaming Map)
  {
    width: 3000, height: 1500,
    platforms: [
      { x: 0, y: 1460, width: 3000, height: 40 }, // Ground floor
      { x: 500, y: 1300, width: 300, height: 20 },
      { x: 1000, y: 1100, width: 200, height: 20 },
      { x: 1500, y: 1200, width: 400, height: 20 },
      { x: 2200, y: 1350, width: 150, height: 20 },
      // High floating islands
      { x: 800, y: 800, width: 200, height: 20 },
      { x: 1400, y: 600, width: 300, height: 20 },
      { x: 2000, y: 750, width: 150, height: 20 },
      // Sniper towers
      { x: 200, y: 1000, width: 80, height: 460 },
      { x: 2800, y: 900, width: 80, height: 560 },
      // Mid-air stepping stones
      { x: 1200, y: 400, width: 80, height: 16 },
      { x: 1500, y: 300, width: 80, height: 16 },
      { x: 1800, y: 400, width: 80, height: 16 },
    ]
  }
];"""
code = re.sub(r'const MAPS = \[.*?\];', new_maps, code, flags=re.DOTALL)

# Update map loading in constructor and restart
code = code.replace(
    'this.platforms = MAPS[this.currentMapIndex];',
    '''const mapDef = MAPS[this.currentMapIndex];
    this.mapWidth = mapDef.width;
    this.mapHeight = mapDef.height;
    this.platforms = mapDef.platforms;
    this.camera = { x: 0, y: 0 };'''
)

# Fix bounds in update()
# Players
code = code.replace('p.x + p.width > this.width', 'p.x + p.width > this.mapWidth')
code = code.replace('p.x = this.width - p.width', 'p.x = this.mapWidth - p.width')
code = code.replace('p.y + p.height >= this.height', 'p.y + p.height >= this.mapHeight')
code = code.replace('p.y = this.height - p.height', 'p.y = this.mapHeight - p.height')
# Enemies
code = code.replace('e.x < 0 || e.x > this.width', 'e.x < 0 || e.x > this.mapWidth')
code = code.replace('e.y > this.height', 'e.y > this.mapHeight')
# Pickups
code = code.replace('pk.y > this.height', 'pk.y > this.mapHeight')
# Grenades
code = code.replace('g.y > this.height', 'g.y > this.mapHeight')
code = code.replace('g.x < 0 || g.x > this.width', 'g.x < 0 || g.x > this.mapWidth')
# Bullets
code = code.replace('b.x < 0 || b.x > this.width || b.y < 0 || b.y > this.height', 'b.x < 0 || b.x > this.mapWidth || b.y < 0 || b.y > this.mapHeight')

# Update draw()
draw_start = """  draw() {
    const ctx = this.ctx;

    // Update Camera
    const p1 = this.players[0];
    if (p1) {
      let targetX = p1.x + p1.width/2 - this.width/2;
      let targetY = p1.y + p1.height/2 - this.height/2;
      // Clamp camera
      targetX = Math.max(0, Math.min(this.mapWidth - this.width, targetX));
      targetY = Math.max(0, Math.min(this.mapHeight - this.height, targetY));
      // Smooth camera
      if (!this.camera) this.camera = {x: targetX, y: targetY};
      this.camera.x += (targetX - this.camera.x) * 0.1;
      this.camera.y += (targetY - this.camera.y) * 0.1;
    }

    ctx.save();
    
    // 1. Draw Background (Parallax)
    this.drawBackground(ctx);

    if (this.screenShake > 0.5) {
      ctx.translate(
        (Math.random()-0.5) * this.screenShake * 2,
        (Math.random()-0.5) * this.screenShake * 2
      );
    }
    
    // 2. Translate world
    ctx.translate(-this.camera.x, -this.camera.y);"""

code = re.sub(
    r'  draw\(\) \{\s*const ctx = this\.ctx;\s*// Screen shake.*?ctx\.globalAlpha = 1;',
    draw_start,
    code,
    flags=re.DOTALL
)

# Add drawBackground() method
draw_bg = """  drawBackground(ctx) {
    // Fill base black
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, this.width, this.height);
    
    const cx = this.camera ? this.camera.x : 0;
    const cy = this.camera ? this.camera.y : 0;

    if (this.currentMapIndex === 0) {
      // The Foundry: Neon Grid
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.1)';
      ctx.lineWidth = 2;
      const gridSize = 60;
      const offsetX = -(cx * 0.5) % gridSize;
      const offsetY = -(cy * 0.5) % gridSize;
      
      ctx.beginPath();
      for (let x = offsetX; x < this.width + gridSize; x += gridSize) { ctx.moveTo(x, 0); ctx.lineTo(x, this.height); }
      for (let y = offsetY; y < this.height + gridSize; y += gridSize) { ctx.moveTo(0, y); ctx.lineTo(this.width, y); }
      ctx.stroke();

    } else if (this.currentMapIndex === 1) {
      // Symmetrical Arena: Stars
      const grad = ctx.createLinearGradient(0, 0, 0, this.height);
      grad.addColorStop(0, COLORS.bgGradient1);
      grad.addColorStop(1, COLORS.bgGradient2);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, this.width, this.height);
      
      for (const star of this.stars) {
        star.twinkle += 0.02;
        ctx.globalAlpha = Math.max(0, star.alpha + Math.sin(star.twinkle) * 0.15);
        ctx.fillStyle = COLORS.star;
        // Apply parallax to stars
        const sx = (star.x - cx * 0.2) % this.width;
        const sy = (star.y - cy * 0.2) % this.height;
        ctx.fillRect(sx < 0 ? sx + this.width : sx, sy < 0 ? sy + this.height : sy, star.size, star.size);
      }
      ctx.globalAlpha = 1;

    } else if (this.currentMapIndex === 2) {
      // Proving Grounds: Parallax Mountains
      const grad = ctx.createLinearGradient(0, 0, 0, this.height);
      grad.addColorStop(0, '#0a1020');
      grad.addColorStop(1, '#1a0b16');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.fillStyle = '#060a14';
      ctx.beginPath();
      const mOffsetX = -(cx * 0.3) % 400;
      const baseY = this.height - 100 + (cy * 0.1);
      ctx.moveTo(0, this.height);
      for(let i=-400; i<this.width+400; i+=100) {
        ctx.lineTo(i + mOffsetX, baseY - Math.abs(Math.sin(i*0.01)*150));
      }
      ctx.lineTo(this.width, this.height);
      ctx.fill();
    }
  }

"""
code = code.replace('  drawPlayer(ctx, p) {', draw_bg + '  drawPlayer(ctx, p) {')

# Debug Utilities Injection
debug_panel = """
      <!-- Debug Tools Panel -->
      <div id="debugPanel" style="position:absolute; top:80px; right:20px; background:rgba(0,0,0,0.8); border:1px solid #00e5ff; border-radius:8px; padding:10px; z-index:110; display:flex; flex-direction:column; gap:8px;">
        <div class="text-cyan font-mono" style="font-size:10px; text-align:center;">DEBUG TOOLS</div>
        <button class="btn btn-ghost btn-sm" id="btnSpawnBot" style="font-size:10px;">🤖 Spawn Bot</button>
        <button class="btn btn-ghost btn-sm" id="btnSpawnHp" style="font-size:10px;">💉 Spawn HP</button>
        <button class="btn btn-ghost btn-sm" id="btnSpawnFuel" style="font-size:10px;">⛽ Spawn Fuel</button>
        <button class="btn btn-ghost btn-sm" id="btnSpawnOverdrive" style="font-size:10px;">⚡ Spawn Overdrive</button>
      </div>
"""
code = code.replace('<div class="demo-controls-info">', debug_panel + '\n      <div class="demo-controls-info">')

init_debug = """
  // Debug Tools Wireup
  const p1 = () => gameInstance.players[0];
  document.getElementById('btnSpawnBot')?.addEventListener('click', () => {
    if(p1()) gameInstance.enemies.push(gameInstance.createEnemy(p1().x + (Math.random()>0.5?200:-200), p1().y - 100));
  });
  document.getElementById('btnSpawnHp')?.addEventListener('click', () => {
    if(p1()) gameInstance.pickups.push(gameInstance.createPickup(p1().x, p1().y - 100, 'hp'));
  });
  document.getElementById('btnSpawnFuel')?.addEventListener('click', () => {
    if(p1()) gameInstance.pickups.push(gameInstance.createPickup(p1().x + 50, p1().y - 100, 'fuel'));
  });
  document.getElementById('btnSpawnOverdrive')?.addEventListener('click', () => {
    if(p1()) gameInstance.pickups.push(gameInstance.createPickup(p1().x - 50, p1().y - 100, 'overdrive'));
  });
"""
code = code.replace('const isTouchDevice', init_debug + '\n  const isTouchDevice')

# Make sure HUD draws statically
code = code.replace('this.drawHUD(ctx);\n\n    // Game Over', 'ctx.restore();\n    this.drawHUD(ctx);\n\n    // Game Over')
code = code.replace('    ctx.restore();\n  }\n\n  drawPlayer', '  }\n\n  drawPlayer')

with open('src/screens/demo.js', 'w', encoding='utf-8') as f:
    f.write(code)
