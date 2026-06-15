import re

with open('src/screens/demo.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Load background images at the top
bg_images = """
const bgFoundry = new Image(); bgFoundry.src = '/assets/backgrounds/bg_foundry.png';
const bgArena = new Image(); bgArena.src = '/assets/backgrounds/bg_arena.png';
const bgMaze = new Image(); bgMaze.src = '/assets/backgrounds/bg_maze.png';
"""
code = code.replace('const playerImg = new Image();', bg_images + '\nconst playerImg = new Image();')

# 2. Update Map 2 to a massive maze
maze_map = """  // Map 2: "Proving Grounds" (Massive Roaming Maze)
  {
    width: 3000, height: 1500,
    platforms: [
      { x: 0, y: 1460, width: 3000, height: 40 }, // Ground floor
      { x: 0, y: 0, width: 40, height: 1500 }, // Left wall
      { x: 2960, y: 0, width: 40, height: 1500 }, // Right wall
      { x: 0, y: 0, width: 3000, height: 40 }, // Ceiling
      
      // The Labyrinth
      { x: 300, y: 1300, width: 600, height: 40 },
      { x: 1100, y: 1300, width: 800, height: 40 },
      { x: 2100, y: 1300, width: 600, height: 40 },
      
      { x: 300, y: 1100, width: 40, height: 200 },
      { x: 860, y: 1100, width: 40, height: 240 },
      { x: 1300, y: 1000, width: 400, height: 40 },
      
      { x: 2100, y: 900, width: 40, height: 400 },
      { x: 2300, y: 1100, width: 400, height: 40 },
      
      { x: 100, y: 900, width: 500, height: 40 },
      { x: 800, y: 900, width: 300, height: 40 },
      
      { x: 600, y: 600, width: 40, height: 340 },
      { x: 1200, y: 700, width: 600, height: 40 },
      { x: 1480, y: 400, width: 40, height: 300 },
      
      { x: 2000, y: 600, width: 700, height: 40 },
      { x: 2400, y: 300, width: 40, height: 300 },
      
      { x: 300, y: 500, width: 400, height: 40 },
      { x: 900, y: 400, width: 400, height: 40 },
      { x: 100, y: 250, width: 600, height: 40 },
      
      { x: 1800, y: 250, width: 800, height: 40 },
      { x: 2000, y: 50, width: 40, height: 200 },
    ]
  }"""
code = re.sub(r'  // Map 2: "Proving Grounds".*?\]\n  \}', maze_map, code, flags=re.DOTALL)

# 3. Add debug methods to Game class
debug_methods = """  spawnDebugEnemy(x, y) {
    this.enemies.push(new Enemy(x, y, this.platforms));
  }
  spawnDebugPickup(x, y, type) {
    this.pickups.push(new Pickup(x, y, type));
  }"""
code = code.replace('  spawnEnemy() {', debug_methods + '\n\n  spawnEnemy() {')

# 4. Fix Player bounds check (line ~621)
code = code.replace('if (p.x + p.width >= this.width) { p.x = this.mapWidth - p.width;', 'if (p.x + p.width >= this.mapWidth) { p.x = this.mapWidth - p.width;')

# 5. Fix Enemy bounds checking in Enemy.update
enemy_bounds = """    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) { this.x = 0; this.patrolDir = 1; }
    let mWidth = platforms[0] ? platforms[0].width : 3000;
    if (this.x + this.width > mWidth) { this.x = mWidth - this.width; this.patrolDir = -1; }
"""
code = code.replace('    this.x += this.vx;\n    this.y += this.vy;', enemy_bounds)

# 6. Update drawBackground to use the generative images
bg_logic = """  drawBackground(ctx) {
    // Fill base black
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, this.width, this.height);
    
    const cx = this.camera ? this.camera.x : 0;
    const cy = this.camera ? this.camera.y : 0;
    
    const drawBgImage = (img, parallaxFactor) => {
      if (img.complete && img.naturalHeight !== 0) {
        const scale = 1.2;
        const dw = this.width * scale;
        const dh = this.height * scale;
        const dx = - (cx * parallaxFactor) % (dw - this.width);
        const dy = - (cy * parallaxFactor) % (dh - this.height);
        ctx.drawImage(img, dx, dy, dw, dh);
      }
    };

    if (this.currentMapIndex === 0) {
      if (bgFoundry.complete && bgFoundry.naturalHeight !== 0) {
        drawBgImage(bgFoundry, 0.1);
      } else {
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.1)';
        ctx.lineWidth = 2;
        const gridSize = 60;
        const offsetX = -(cx * 0.5) % gridSize;
        const offsetY = -(cy * 0.5) % gridSize;
        ctx.beginPath();
        for (let x = offsetX; x < this.width + gridSize; x += gridSize) { ctx.moveTo(x, 0); ctx.lineTo(x, this.height); }
        for (let y = offsetY; y < this.height + gridSize; y += gridSize) { ctx.moveTo(0, y); ctx.lineTo(this.width, y); }
        ctx.stroke();
      }
    } else if (this.currentMapIndex === 1) {
      if (bgArena.complete && bgArena.naturalHeight !== 0) {
        drawBgImage(bgArena, 0.2);
      }
      for (const star of this.stars) {
        star.twinkle += 0.02;
        ctx.globalAlpha = Math.max(0, star.alpha + Math.sin(star.twinkle) * 0.15);
        ctx.fillStyle = COLORS.star;
        const sx = (star.x - cx * 0.2) % this.width;
        const sy = (star.y - cy * 0.2) % this.height;
        ctx.fillRect(sx < 0 ? sx + this.width : sx, sy < 0 ? sy + this.height : sy, star.size, star.size);
      }
      ctx.globalAlpha = 1;
    } else if (this.currentMapIndex === 2) {
      if (bgMaze.complete && bgMaze.naturalHeight !== 0) {
        drawBgImage(bgMaze, 0.05);
      } else {
        ctx.fillStyle = '#060a14';
        ctx.beginPath();
        const mOffsetX = -(cx * 0.3) % 400;
        const baseY = this.height - 100 + (cy * 0.1);
        ctx.moveTo(0, this.height);
        for(let i=-400; i<this.width+400; i+=100) { ctx.lineTo(i + mOffsetX, baseY - Math.abs(Math.sin(i*0.01)*150)); }
        ctx.lineTo(this.width, this.height);
        ctx.fill();
      }
    }
  }"""
code = re.sub(r'  drawBackground\(ctx\) \{.*?(?=  drawPlayer)', bg_logic + '\n\n', code, flags=re.DOTALL)

# 7. Fix initDemo debug hooks
init_debug_fix = """  // Debug Tools Wireup
  const p1 = () => gameInstance?.players[0];
  document.getElementById('btnSpawnBot')?.addEventListener('click', () => {
    if(p1()) gameInstance.spawnDebugEnemy(p1().x + (Math.random()>0.5?200:-200), p1().y - 100);
  });
  document.getElementById('btnSpawnHp')?.addEventListener('click', () => {
    if(p1()) gameInstance.spawnDebugPickup(p1().x, p1().y - 100, 'health');
  });
  document.getElementById('btnSpawnFuel')?.addEventListener('click', () => {
    if(p1()) gameInstance.spawnDebugPickup(p1().x + 50, p1().y - 100, 'fuel');
  });
  document.getElementById('btnSpawnOverdrive')?.addEventListener('click', () => {
    if(p1()) gameInstance.spawnDebugPickup(p1().x - 50, p1().y - 100, 'overdrive');
  });
"""
code = re.sub(r'  // Debug Tools Wireup.*?\}\);\n', init_debug_fix, code, flags=re.DOTALL)

with open('src/screens/demo.js', 'w', encoding='utf-8') as f:
    f.write(code)
