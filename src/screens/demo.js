import { CLASS_DATA } from './loadout.js';
// ============================================
// AERO STRIKE — 2D Playable Demo
// Jetpack movement, shooting, fuel, platforms
// ============================================

const GRAVITY = 0.4;
const JETPACK_FORCE = -0.7;
const MOVE_SPEED = 4;
const BULLET_SPEED = 10;
const FUEL_MAX = 100;
const FUEL_REGEN = 0.15;
const FUEL_COST = 0.5;
const MAX_FALL_SPEED = 8;
const PARTICLE_COUNT = 3;

const MAPS = [
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
  // Map 2: "Proving Grounds" (Massive Roaming Maze)
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
  }
];



const bgFoundry = new Image(); bgFoundry.src = '/assets/backgrounds/bg_foundry.png';
const bgArena = new Image(); bgArena.src = '/assets/backgrounds/bg_arena.png';
const bgMaze = new Image(); bgMaze.src = '/assets/backgrounds/bg_maze.png';

const playerImg = new Image();
playerImg.src = '/assets/characters/assault.png';
const enemyImg = new Image();
enemyImg.src = '/assets/characters/scout.png';

// Color scheme
const COLORS = {
  bg: '#060a14',
  bgGradient1: '#0a1020',
  bgGradient2: '#0d1a2d',
  platform: '#1a2a42',
  platformTop: '#00e5ff',
  platformGlow: 'rgba(0, 229, 255, 0.1)',
  player: '#00e5ff',
  playerBody: '#1a3a5c',
  jetpackFlame: '#ff6b00',
  jetpackFlame2: '#ffaa00',
  bullet: '#00e5ff',
  bulletGlow: 'rgba(0, 229, 255, 0.5)',
  enemy: '#ff2d55',
  enemyBody: '#5c1a2a',
  healthBar: '#00ff88',
  healthBarBg: 'rgba(255,255,255,0.1)',
  fuelBar: '#00e5ff',
  fuelBarBg: 'rgba(255,255,255,0.1)',
  particle: '#ff6b00',
  star: 'rgba(255,255,255,0.3)',
  text: '#e8ecf4',
  textDim: '#4a5568',
  gold: '#ffd700',
  damage: '#ff2d55',
};

class Particle {
  constructor(x, y, vx, vy, color, life, size) {
    this.x = x; this.y = y;
    this.vx = vx; this.vy = vy;
    this.color = color;
    this.life = life;
    this.maxLife = life;
    this.size = size;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1;
    this.life--;
    return this.life > 0;
  }
  draw(ctx) {
    const alpha = this.life / this.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
    ctx.globalAlpha = 1;
  }
}

class Bullet {
  constructor(x, y, dir, isEnemy = false, type = 'normal') {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.type = type;
    this.isEnemy = isEnemy;
    this.life = 60;
    this.width = 12;
    this.height = 3;
    
    // Weapon stats based on type
    if (type === 'shotgun') {
      this.vx = dir * (8 + Math.random() * 2);
      this.vy = (Math.random() - 0.5) * 4;
      this.life = 25;
      this.width = 6;
      this.height = 2;
    } else if (type === 'rocket') {
      this.vx = dir * 6;
      this.vy = 0;
      this.life = 80;
      this.width = 16;
      this.height = 6;
    } else if (type === 'sniper') {
      this.vx = dir * 20;
      this.vy = 0;
      this.life = 40;
      this.width = 24;
      this.height = 2;
    } else { // normal / smg
      this.vx = dir * BULLET_SPEED;
      this.vy = (type === 'smg') ? (Math.random() - 0.5) * 1.5 : 0;
    }
  }
  createPlayer(id, x, y, classId) {
    return {
      id, x, y, width: 24, height: 32, vx: 0, vy: 0, dir: id === 1 ? 1 : -1,
      hp: classId === 'heavy' ? 8 : (classId === 'scout' ? 3 : 5),
      maxHp: classId === 'heavy' ? 8 : (classId === 'scout' ? 3 : 5),
      fuel: FUEL_MAX, kills: 0, onGround: false, jetpacking: false,
      shootCooldown: 0, hitFlash: 0, invincible: 0, classId,
      baseCooldown: classId === 'scout' ? 30 : (classId === 'heavy' ? 25 : (classId === 'medic' ? 8 : 12)),
      grenades: 3, overdrive: 0, dashCooldown: 0, isDashing: 0, wallSliding: false
    };
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) { this.x = 0; this.patrolDir = 1; }
    let mWidth = platforms[0] ? platforms[0].width : 3000;
    if (this.x + this.width > mWidth) { this.x = mWidth - this.width; this.patrolDir = -1; }

    this.life--;
    return this.life > 0;
  }
  draw(ctx) {
    const color = this.isEnemy ? COLORS.enemy : COLORS.bullet;
    const glow = this.isEnemy ? 'rgba(255,45,85,0.5)' : COLORS.bulletGlow;
    ctx.shadowColor = glow;
    ctx.shadowBlur = 8;
    ctx.fillStyle = color;
    
    if (this.type === 'rocket') {
      ctx.fillStyle = '#ff6b00';
      ctx.fillRect(this.x, this.y - 3, this.width, this.height);
      // Rocket exhaust
      if (Math.random() > 0.5) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.dir === 1 ? this.x - 4 : this.x + this.width, this.y, 4, 4);
      }
    } else {
      ctx.fillRect(this.x, this.y - 1, this.width, this.height);
    }
    ctx.shadowBlur = 0;
  }
}


class Pickup {
  constructor(x, y, type) {
    this.x = x; this.y = y; this.type = type;
    this.width = 24; this.height = 24;
    this.vy = -2; this.life = 900;
  }
  update(platforms) {
    this.life--;
    this.vy += 0.4;
    if (this.vy > 8) this.vy = 8;
    this.y += this.vy;
    for (const p of platforms) {
      if (this.x + this.width > p.x && this.x < p.x + p.width &&
          this.y + this.height > p.y && this.y + this.height < p.y + p.height + 10 && this.vy >= 0) {
        this.y = p.y - this.height; this.vy = 0;
      }
    }
    return this.life > 0;
  }
  draw(ctx) {
    const alpha = this.life < 120 && this.life % 10 < 5 ? 0.3 : 1;
    ctx.globalAlpha = alpha;
    ctx.font = '20px sans-serif';
    if (this.type === 'health') ctx.fillText('🟢', this.x, this.y + 20);
    if (this.type === 'fuel') ctx.fillText('🔵', this.x, this.y + 20);
    if (this.type === 'overdrive') ctx.fillText('⚡', this.x, this.y + 20);
    ctx.globalAlpha = 1;
  }
}

class Grenade {
  constructor(x, y, dir) {
    this.x = x; this.y = y;
    this.vx = dir * 6; this.vy = -4;
    this.width = 8; this.height = 8;
    this.timer = 120;
    this.exploded = false;
  }
  update(platforms, particles) {
    this.timer--;
    if (this.timer <= 0) {
      this.exploded = true;
      for (let i = 0; i < 30; i++) {
        particles.push(new Particle(this.x, this.y, (Math.random()-0.5)*10, (Math.random()-0.5)*10, Math.random()>0.5?COLORS.jetpackFlame:COLORS.damage, 30+Math.random()*20, 5));
      }
      return false;
    }
    this.vy += 0.4;
    this.x += this.vx; this.y += this.vy;
    for (const p of platforms) {
      if (this.x + this.width > p.x && this.x < p.x + p.width &&
          this.y + this.height > p.y && this.y + this.height < p.y + p.height + 10 && this.vy >= 0) {
        this.y = p.y - this.height; this.vy *= -0.5; this.vx *= 0.8;
      }
    }
    return true;
  }
  draw(ctx) {
    ctx.fillStyle = (this.timer % 10 < 5) ? '#fff' : '#ff2d55';
    ctx.beginPath();
    ctx.arc(this.x + 4, this.y + 4, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Enemy {
  constructor(x, y, platforms) {
    this.x = x;
    this.y = y;
    this.width = 24;
    this.height = 32;
    this.vy = 0;
    this.vx = 0;
    this.hp = 3;
    this.maxHp = 3;
    this.dir = -1;
    this.shootTimer = 0;
    this.shootInterval = 90 + Math.random() * 60;
    this.patrolTimer = 0;
    this.patrolDir = 1;
    this.onGround = false;
    this.platforms = platforms;
    this.jetpacking = false;
    this.fuel = FUEL_MAX;
    this.hitFlash = 0;
    this.alive = true;
  }

  update(playerX, playerY, bullets, particles) {
    if (!this.alive) return false;

    // AI: face player
    this.dir = playerX > this.x ? 1 : -1;

    // Patrol movement
    this.patrolTimer++;
    if (this.patrolTimer > 120) {
      this.patrolDir *= -1;
      this.patrolTimer = 0;
    }
    this.vx = this.patrolDir * 1.5;

    // Jetpack to reach player occasionally
    const dy = playerY - this.y;
    if (dy < -60 && this.fuel > 30 && Math.random() < 0.03) {
      this.jetpacking = true;
    }
    if (this.jetpacking) {
      this.vy += JETPACK_FORCE * 0.7;
      this.fuel -= FUEL_COST;
      if (this.fuel <= 0 || this.y < playerY - 20) {
        this.jetpacking = false;
      }
      // Jet particles
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(
          this.x + this.width/2 + (Math.random()-0.5)*6,
          this.y + this.height,
          (Math.random()-0.5)*2, Math.random()*3 + 1,
          Math.random() > 0.5 ? COLORS.jetpackFlame : COLORS.jetpackFlame2,
          15 + Math.random()*10, 3
        ));
      }
    } else {
      this.fuel = Math.min(FUEL_MAX, this.fuel + FUEL_REGEN);
    }

    // Gravity
    this.vy += GRAVITY;
    if (this.vy > MAX_FALL_SPEED) this.vy = MAX_FALL_SPEED;

    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) { this.x = 0; this.patrolDir = 1; }
    let mWidth = this.platforms && this.platforms[0] ? this.platforms[0].width : 3000;
    if (this.x + this.width > mWidth) { this.x = mWidth - this.width; this.patrolDir = -1; }


    // Platform collision
    this.onGround = false;
    for (const p of this.platforms) {
      if (this.x + this.width > p.x && this.x < p.x + p.width &&
          this.y + this.height > p.y && this.y + this.height < p.y + p.height + 10 &&
          this.vy >= 0) {
        this.y = p.y - this.height;
        this.vy = 0;
        this.onGround = true;
        this.jetpacking = false;
      }
    }

    // Shoot at player
    this.shootTimer++;
    if (this.shootTimer >= this.shootInterval) {
      this.shootTimer = 0;
      const bx = this.dir === 1 ? this.x + this.width : this.x;
      bullets.push(new Bullet(bx, this.y + this.height/2, this.dir, true));
    }

    // Hit flash
    if (this.hitFlash > 0) this.hitFlash--;

    return this.alive;
  }

  takeDamage(particles) {
    this.hp--;
    this.hitFlash = 8;
    // Damage particles
    for (let i = 0; i < 8; i++) {
      particles.push(new Particle(
        this.x + this.width/2, this.y + this.height/2,
        (Math.random()-0.5)*6, (Math.random()-0.5)*6,
        COLORS.damage, 20, 3
      ));
    }
    if (this.hp <= 0) {
      this.alive = false;
      // Death explosion
      for (let i = 0; i < 20; i++) {
        particles.push(new Particle(
          this.x + this.width/2, this.y + this.height/2,
          (Math.random()-0.5)*8, (Math.random()-0.5)*8,
          Math.random() > 0.5 ? COLORS.enemy : COLORS.jetpackFlame,
          30 + Math.random()*20, 4
        ));
      }
    }
  }

  draw(ctx) {
    if (!this.alive) return;
    if (enemyImg.complete && enemyImg.naturalHeight !== 0) {
      const imgW = this.width * 2.2;
      const imgH = this.height * 1.8;
      ctx.save();
      if (this.hitFlash > 0) ctx.filter = 'brightness(200%)';
      
      if (this.dir === -1) {
        ctx.scale(-1, 1);
        ctx.drawImage(enemyImg, -(this.x + this.width + (imgW - this.width)/2), this.y - (imgH - this.height), imgW, imgH);
      } else {
        ctx.drawImage(enemyImg, this.x - (imgW - this.width)/2, this.y - (imgH - this.height), imgW, imgH);
      }
      ctx.restore();
    } else {
      // Body
      ctx.fillStyle = this.hitFlash > 0 ? '#fff' : COLORS.enemyBody;
      ctx.fillRect(this.x + 2, this.y + 8, this.width - 4, this.height - 8);
      // Head (helmet)
      ctx.fillStyle = this.hitFlash > 0 ? '#fff' : COLORS.enemy;
      ctx.beginPath();
      ctx.arc(this.x + this.width/2, this.y + 8, 10, 0, Math.PI * 2);
      ctx.fill();
      // Visor
      ctx.fillStyle = '#1a0a15';
      ctx.fillRect(this.x + 6, this.y + 4, 12, 6);
      ctx.fillStyle = COLORS.enemy;
      ctx.fillRect(this.x + 7, this.y + 5, 10, 4);
      // Jetpack
      ctx.fillStyle = '#4a1a2a';
      ctx.fillRect(this.x + this.width - 4, this.y + 10, 6, 14);
      // Gun
      ctx.fillStyle = '#666';
      const gunX = this.dir === 1 ? this.x + this.width : this.x - 10;
      ctx.fillRect(gunX, this.y + 14, 10, 4);
    }
    // HP bar
    const hpWidth = 30;
    const hpX = this.x + this.width/2 - hpWidth/2;
    ctx.fillStyle = COLORS.healthBarBg;
    ctx.fillRect(hpX, this.y - 8, hpWidth, 3);
    ctx.fillStyle = COLORS.damage;
    ctx.fillRect(hpX, this.y - 8, hpWidth * (this.hp / this.maxHp), 3);
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 960;
    this.height = 540;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Player
    const activeClassId = window.AeroStrikeActiveLoadout || 'assault';
    this.currentMapIndex = 0;
    const mapDef = MAPS[this.currentMapIndex];
    this.mapWidth = mapDef.width;
    this.mapHeight = mapDef.height;
    this.platforms = mapDef.platforms;
    this.camera = { x: 0, y: 0 };
    this.players = [
      this.createPlayer(1, 100, 200, activeClassId),
      this.createPlayer(2, 800, 200, 'heavy') // Player 2 defaults to heavy
    ];

    this.bullets = [];
    this.grenadesList = [];
    this.pickups = [];
    this.particles = [];
    this.enemies = [];
    this.stars = [];
    this.keys = {};
    this.gameOver = false;
    this.score = 0;
    this.wave = 1;
    this.enemiesSpawned = 0;
    this.maxEnemiesPerWave = 3;
    this.spawnTimer = 0;
    this.damageNumbers = [];
    this.screenShake = 0;
    this.gameTime = 0;

    // Background stars
    for (let i = 0; i < 50; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height * 0.8,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
      });
    }

    // Input
    this.setupInput();
    this.spawnWave();
  }

  setupInput() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      if (['w','a','s','d',' ','arrowup','arrowdown','arrowleft','arrowright'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
  }

  spawnWave() {
    this.enemiesSpawned = 0;
    this.maxEnemiesPerWave = 2 + this.wave;
    this.spawnTimer = 0;
  }

  spawnDebugEnemy(x, y) {
    this.enemies.push(new Enemy(x, y, this.platforms));
  }
  spawnDebugPickup(x, y, type) {
    this.pickups.push(new Pickup(x, y, type));
  }

  spawnEnemy() {
    const spawnPoints = [
      { x: 80, y: 80 },    // Top left
      { x: 850, y: 80 },   // Top right
      { x: 480, y: 100 },  // Top center
      { x: 80, y: 250 },   // Mid left
      { x: 850, y: 250 },  // Mid right
      { x: 480, y: 400 },  // Ground center
    ];
    // Pick a spawn point far from player
    let best = spawnPoints[0];
    let bestDist = 0;
    for (const sp of spawnPoints) {
      const p1 = this.players[0];
      const dx = sp.x - p1.x;
      const dy = sp.y - p1.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist > bestDist) {
        bestDist = dist;
        best = sp;
      }
    }
    this.enemies.push(new Enemy(best.x, best.y, this.platforms));
    this.enemiesSpawned++;
  }

  createPlayer(id, x, y, classId) {
    return {
      id, x, y, width: 24, height: 32, vx: 0, vy: 0, dir: id === 1 ? 1 : -1,
      hp: classId === 'heavy' ? 8 : (classId === 'scout' ? 3 : 5),
      maxHp: classId === 'heavy' ? 8 : (classId === 'scout' ? 3 : 5),
      fuel: FUEL_MAX, kills: 0, onGround: false, jetpacking: false,
      shootCooldown: 0, hitFlash: 0, invincible: 0, classId,
      baseCooldown: classId === 'scout' ? 30 : (classId === 'heavy' ? 25 : (classId === 'medic' ? 8 : 12)),
      grenades: 3, overdrive: 0, dashCooldown: 0, isDashing: 0, wallSliding: false
    };
  }

  update() {
    if (this.gameOver) return;
    this.gameTime++;

    for (const p of this.players) {
      if (p.hp <= 0) continue;
      
      const isP1 = p.id === 1;
      const kLeft = isP1 ? this.keys['a'] : this.keys['arrowleft'];
      const kRight = isP1 ? this.keys['d'] : this.keys['arrowright'];
      const kUp = isP1 ? (this.keys['w'] || this.keys[' ']) : this.keys['arrowup'];
      const kDash = isP1 ? this.keys['shift'] : this.keys['/'];
      const kGrenade = isP1 ? this.keys['g'] : this.keys['.'];
      const kShoot = isP1 ? (this.keys['f'] || this.keys['enter']) : (this.keys['enter'] || this.keys["'"]);

      // Movement & Dash
      p.vx = 0;
      if (p.dashCooldown > 0) p.dashCooldown--;
      if (p.isDashing > 0) {
        p.isDashing--;
        p.vx = p.dir * (MOVE_SPEED * 3);
        p.vy = 0;
        this.particles.push(new Particle(p.x + p.width/2, p.y + p.height/2, 0, 0, COLORS.bullet, 10, 8));
      } else {
        if (kLeft) { p.vx = -MOVE_SPEED; p.dir = -1; }
        if (kRight) { p.vx = MOVE_SPEED; p.dir = 1; }
        if (kDash && p.dashCooldown <= 0 && p.fuel >= 10) {
          p.isDashing = 8; p.dashCooldown = 40; p.fuel -= 10; this.screenShake = 3;
        }
      }

      // Jetpack
      p.jetpacking = kUp && p.fuel > 0;
      if (p.jetpacking) {
        p.vy += JETPACK_FORCE; p.fuel -= FUEL_COST; if (p.fuel < 0) p.fuel = 0;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          this.particles.push(new Particle(p.x + p.width/2 + (Math.random()-0.5)*8, p.y + p.height, (Math.random()-0.5)*3, Math.random()*4 + 2, Math.random() > 0.4 ? COLORS.jetpackFlame : COLORS.jetpackFlame2, 20 + Math.random()*15, 3 + Math.random()*2));
        }
      } else {
        p.fuel = Math.min(FUEL_MAX, p.fuel + FUEL_REGEN);
      }

      // Gravity & Bounds
      p.vy += GRAVITY; if (p.vy > MAX_FALL_SPEED) p.vy = MAX_FALL_SPEED;
      p.x += p.vx; p.y += p.vy;

      p.onGround = false;
      for (const plat of this.platforms) {
        if (p.x + p.width > plat.x && p.x < plat.x + plat.width && p.y + p.height > plat.y && p.y + p.height < plat.y + plat.height + 10 && p.vy >= 0) {
          p.y = plat.y - p.height; p.vy = 0; p.onGround = true;
        }
      }

      // Wall collision & Wall Slide
      p.wallSliding = false; let touchingWall = false;
      if (p.x <= 0) { p.x = 0; touchingWall = true; }
      if (p.x + p.width >= this.mapWidth) { p.x = this.mapWidth - p.width; touchingWall = true; }
      
      for (const plat of this.platforms) {
        if (p.y + p.height > plat.y + 5 && p.y < plat.y + plat.height) {
          if (p.x + p.width > plat.x && p.x < plat.x && p.vx > 0) { p.x = plat.x - p.width; touchingWall = true; }
          if (p.x < plat.x + plat.width && p.x + p.width > plat.x + plat.width && p.vx < 0) { p.x = plat.x + plat.width; touchingWall = true; }
        }
      }
      if (touchingWall && !p.onGround && p.vy > 0 && (kLeft || kRight)) {
        p.wallSliding = true; p.vy = 1.5;
        if (Math.random() > 0.5) this.particles.push(new Particle(p.dir === 1 ? p.x + p.width : p.x, p.y + p.height/2, (Math.random()-0.5)*2, -2, '#ccc', 15, 2));
      }
      if (p.y < 0) { p.y = 0; p.vy = 0; }
      if (p.y + p.height >= this.mapHeight) { p.y = this.mapHeight - p.height; p.vy = 0; p.onGround = true; }

      // Grenade
      if (kGrenade && p.grenades > 0 && p.shootCooldown <= 0) {
        this.grenadesList.push(new Grenade(p.dir === 1 ? p.x + p.width : p.x, p.y + p.height/2, p.dir));
        p.grenades--; p.shootCooldown = 30;
      }

      if (p.overdrive > 0) p.overdrive--;

      // Shooting
      if (p.shootCooldown > 0) p.shootCooldown--;
      if (kShoot && p.shootCooldown <= 0) {
        const bx = p.dir === 1 ? p.x + p.width : p.x - 12;
        let wType = 'normal';
        if (p.classId === 'engineer') wType = 'shotgun';
        if (p.classId === 'heavy') wType = 'rocket';
        if (p.classId === 'scout') wType = 'sniper';
        if (p.classId === 'medic') wType = 'smg';

        if (wType === 'shotgun') {
          for(let i=0; i<4; i++) this.bullets.push(new Bullet(bx, p.y + p.height/2 - 2, p.dir, false, wType));
          this.screenShake = 4;
        } else if (wType === 'rocket') {
          this.bullets.push(new Bullet(bx, p.y + p.height/2 - 4, p.dir, false, wType));
          this.screenShake = 6;
        } else {
          this.bullets.push(new Bullet(bx, p.y + p.height/2 - 2, p.dir, false, wType));
          if (wType === 'sniper') this.screenShake = 3;
        }
        p.shootCooldown = p.overdrive > 0 ? Math.floor(p.baseCooldown/2) : p.baseCooldown;
        for (let i = 0; i < 4; i++) {
          this.particles.push(new Particle(bx + (p.dir === 1 ? 6 : -6), p.y + p.height/2, p.dir * (Math.random()*4 + 2), (Math.random()-0.5)*3, COLORS.bullet, 10, 2));
        }
      }
    }
    
    // Invincibility loop
    for (const p of this.players) {

          if (p.invincible > 0) p.invincible--;
      if (p.hitFlash > 0) p.hitFlash--;
    }

    // Update bullets
    this.bullets = this.bullets.filter(b => {
      if (!b.update()) return false;
      if (b.x < 0 || b.x > this.mapWidth || b.y < 0 || b.y > this.mapHeight) return false;

      // Bullet-enemy collision
      if (!b.isEnemy) {
        let hit = false;
        for (const enemy of this.enemies) {
          if (!enemy.alive) continue;
          if (b.x + b.width > enemy.x && b.x < enemy.x + enemy.width &&
              b.y + b.height > enemy.y && b.y - b.height < enemy.y + enemy.height) {
            
            if (b.type === 'rocket') {
              // Rocket AoE Explosion
              this.screenShake = 12;
              for (const e of this.enemies) {
                if (!e.alive) continue;
                const dx = (e.x + e.width/2) - b.x;
                const dy = (e.y + e.height/2) - b.y;
                if (Math.sqrt(dx*dx + dy*dy) < 80) {
                  e.takeDamage(this.particles); e.takeDamage(this.particles); // double damage
                  if (!e.alive) { p.kills++; this.score += 150; }
                }
              }
              // Explosion particles
              for (let i = 0; i < 20; i++) {
                this.particles.push(new Particle(b.x, b.y, (Math.random()-0.5)*10, (Math.random()-0.5)*10, COLORS.jetpackFlame, 30+Math.random()*20, 5));
              }
            } else {
              enemy.takeDamage(this.particles);
              if (b.type === 'sniper') enemy.takeDamage(this.particles); // Sniper does double damage
              
              if (!enemy.alive) {
                p.kills++;
                this.score += 100;
                // Drop pickup
                if (Math.random() < 0.35) {
                  const types = ['health', 'fuel', 'overdrive'];
                  this.pickups.push(new Pickup(enemy.x, enemy.y, types[Math.floor(Math.random() * types.length)]));
                }
                this.damageNumbers.push({ x: enemy.x + enemy.width/2, y: enemy.y, text: '+100', color: COLORS.gold, life: 40 });
              } else {
                this.damageNumbers.push({ x: enemy.x + enemy.width/2, y: enemy.y, text: b.type==='sniper'?'-2':'-1', color: COLORS.damage, life: 25 });
              }
            }
            hit = true;
            break;
          }
        }
        if (hit && b.type !== 'sniper') return false; // sniper pierces
      }

      // Bullet-player collision
      if (b.isEnemy) {
        let hit = false;
        for (const p of this.players) {
          if (p.hp <= 0 || p.invincible > 0) continue;
          if (b.x + b.width > p.x && b.x < p.x + p.width &&
              b.y + 2 > p.y && b.y - 2 < p.y + p.height) {
            p.hp--;
            p.hitFlash = 10;
            p.invincible = 30;
            this.screenShake = 8;
            for (let i = 0; i < 10; i++) {
              this.particles.push(new Particle(p.x + p.width/2, p.y + p.height/2, (Math.random()-0.5)*6, (Math.random()-0.5)*6, COLORS.damage, 20, 3));
            }
            hit = true;
            break;
          }
        }
        
        // Game over if ALL players dead
        if (this.players.every(p => p.hp <= 0)) this.gameOver = true;
        
        if (hit) return false;
      }

      return true;
    });

    // Update grenades
    this.grenadesList = this.grenadesList.filter(g => {
      const alive = g.update(this.platforms, this.particles);
      if (!alive && g.exploded) {
        this.screenShake = 15;
        for (const enemy of this.enemies) {
          if (!enemy.alive) continue;
          const dx = (enemy.x + enemy.width/2) - g.x;
          const dy = (enemy.y + enemy.height/2) - g.y;
          if (Math.sqrt(dx*dx + dy*dy) < 100) {
            enemy.takeDamage(this.particles); enemy.takeDamage(this.particles);
            if (!enemy.alive) { p.kills++; this.score += 100; }
          }
        }
      }
      return alive;
    });

    // Update pickups
    this.pickups = this.pickups.filter(pk => {
      const alive = pk.update(this.platforms);
      if (!alive) return false;
      for (const p of this.players) {
        if (p.hp <= 0) continue;
        if (p.x < pk.x + pk.width && p.x + p.width > pk.x && p.y < pk.y + pk.height && p.y + p.height > pk.y) {
          if (pk.type === 'health') p.hp = Math.min(p.maxHp, p.hp + 2);
          if (pk.type === 'fuel') p.fuel = FUEL_MAX;
          if (pk.type === 'overdrive') p.overdrive = 600;
          return false;
        }
      }
      return true;
    });

    // Update enemies
    this.enemies = this.enemies.filter(e => {
      // Find closest player
      let target = this.players[0];
      let minDist = 999999;
      for (const p of this.players) {
        if (p.hp <= 0) continue;
        let d = Math.abs(e.x - p.x) + Math.abs(e.y - p.y);
        if (d < minDist) { minDist = d; target = p; }
      }
      return e.update(target.x, target.y, this.bullets, this.particles);
    });

    // Spawn enemies
    this.spawnTimer++;
    if (this.enemiesSpawned < this.maxEnemiesPerWave && this.spawnTimer > 120) {
      this.spawnEnemy();
      this.spawnTimer = 0;
    }

    // Check wave complete
    if (this.enemies.length === 0 && this.enemiesSpawned >= this.maxEnemiesPerWave) {
      this.wave++;
      this.spawnWave();
      this.score += 50 * this.wave;
      this.damageNumbers.push({
        x: this.width/2, y: this.height/2 - 30,
        text: `WAVE ${this.wave}`,
        color: COLORS.gold,
        life: 60,
      });
    }

    // Update particles
    this.particles = this.particles.filter(p => p.update());

    // Update damage numbers
    this.damageNumbers = this.damageNumbers.filter(d => {
      d.y -= 1;
      d.life--;
      return d.life > 0;
    });

    // Screen shake decay
    if (this.screenShake > 0) this.screenShake *= 0.8;
  }

  draw() {
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
    ctx.translate(-this.camera.x, -this.camera.y);

    // Platforms
    for (const plat of this.platforms) {
      // Platform glow
      ctx.fillStyle = COLORS.platformGlow;
      ctx.fillRect(plat.x - 2, plat.y - 2, plat.width + 4, plat.height + 4);
      // Platform body
      ctx.fillStyle = COLORS.platform;
      ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
      // Platform top edge (glow line)
      ctx.fillStyle = COLORS.platformTop;
      ctx.fillRect(plat.x, plat.y, plat.width, 2);
      // Edge glow
      ctx.shadowColor = COLORS.platformTop;
      ctx.shadowBlur = 6;
      ctx.fillRect(plat.x, plat.y, plat.width, 1);
      ctx.shadowBlur = 0;
    }

    // Pickups and Grenades
    for (const pk of this.pickups) pk.draw(ctx);
    for (const g of this.grenadesList) g.draw(ctx);

    // Particles (behind entities)
    for (const p of this.particles) {
      p.draw(ctx);
    }

    // Bullets
    for (const b of this.bullets) {
      b.draw(ctx);
    }

    // Enemies
    for (const e of this.enemies) {
      e.draw(ctx);
    }

    // Player
    for (const p of this.players) { this.drawPlayer(ctx, p); }

    // Damage numbers
    for (const d of this.damageNumbers) {
      const alpha = d.life / 40;
      ctx.globalAlpha = alpha;
      ctx.font = d.text.startsWith('WAVE') ? 'bold 24px Rajdhani' : 'bold 14px Orbitron';
      ctx.fillStyle = d.color;
      ctx.textAlign = 'center';
      ctx.fillText(d.text, d.x, d.y);
      ctx.globalAlpha = 1;
    }

    // HUD
    ctx.restore();
    this.drawHUD(ctx);

    // Game Over
    if (this.gameOver) {
      this.drawGameOver(ctx);
    }
  }

  drawBackground(ctx) {
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
  }

  drawPlayer(ctx, p) {
    if (p.hp <= 0 || (p.invincible > 0 && Math.floor(this.gameTime / 3) % 2 === 0)) return;

    const px = p.x;
    const py = p.y;

    if (playerImg.complete && playerImg.naturalHeight !== 0) {
      const imgW = p.width * 2.2;
      const imgH = p.height * 1.8;
      ctx.save();
      if (p.hitFlash > 0) ctx.filter = 'brightness(200%)';
      
      if (p.dir === -1) {
        ctx.scale(-1, 1);
        ctx.drawImage(playerImg, -(px + p.width + (imgW - p.width)/2), py - (imgH - p.height), imgW, imgH);
      } else {
        ctx.drawImage(playerImg, px - (imgW - p.width)/2, py - (imgH - p.height), imgW, imgH);
      }
      ctx.restore();
    } else {
      // Body
      ctx.fillStyle = p.hitFlash > 0 ? '#fff' : COLORS.playerBody;
      ctx.fillRect(px + 2, py + 8, p.width - 4, p.height - 8);
  
      // Head (helmet)
      ctx.fillStyle = p.hitFlash > 0 ? '#fff' : COLORS.player;
      ctx.beginPath();
      ctx.arc(px + p.width/2, py + 8, 10, 0, Math.PI * 2);
      ctx.fill();
  
      // Visor
      ctx.fillStyle = '#0a1520';
      ctx.fillRect(px + 6, py + 4, 12, 6);
      ctx.fillStyle = COLORS.player;
      ctx.fillRect(px + 7, py + 5, 10, 4);
      // Visor glow
      ctx.shadowColor = COLORS.player;
      ctx.shadowBlur = 4;
      ctx.fillRect(px + 7, py + 5, 10, 4);
      ctx.shadowBlur = 0;
  
      // Jetpack on back
      const jpX = p.dir === 1 ? px - 2 : px + p.width - 4;
      ctx.fillStyle = '#2a3a5c';
      ctx.fillRect(jpX, py + 10, 6, 14);
      ctx.fillStyle = COLORS.player;
      ctx.fillRect(jpX, py + 10, 6, 2);
  
      // Gun
      ctx.fillStyle = '#8a8a8a';
      const gunX = p.dir === 1 ? px + p.width : px - 14;
      ctx.fillRect(gunX, py + 14, 14, 4);
      ctx.fillStyle = COLORS.player;
      ctx.fillRect(gunX + (p.dir === 1 ? 10 : 0), py + 14, 4, 4);
    }
  }

  drawHUD(ctx) {
    const p = this.players[0]; const p2 = this.players[1];
    const padding = 16;

    // Health bar
    const hpBarWidth = 150;
    const hpBarHeight = 10;
    const hpX = padding;
    const hpY = padding;

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(hpX - 2, hpY - 2, hpBarWidth + 4, hpBarHeight + 4);
    ctx.fillStyle = COLORS.healthBarBg;
    ctx.fillRect(hpX, hpY, hpBarWidth, hpBarHeight);
    const hpGrad = ctx.createLinearGradient(hpX, 0, hpX + hpBarWidth, 0);
    hpGrad.addColorStop(0, '#ff2d55');
    hpGrad.addColorStop(1, '#00ff88');
    ctx.fillStyle = hpGrad;
    ctx.fillRect(hpX, hpY, hpBarWidth * (p.hp / p.maxHp), hpBarHeight);
    // HP label
    ctx.font = '10px Orbitron';
    ctx.fillStyle = COLORS.textDim;
    ctx.textAlign = 'left';
    ctx.fillText('HP', hpX, hpY - 4);
    ctx.fillStyle = COLORS.text;
    ctx.fillText(`${p.hp}/${p.maxHp}`, hpX + hpBarWidth + 6, hpY + 9);

    // Fuel bar
    const fuelY = hpY + hpBarHeight + 10;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(hpX - 2, fuelY - 2, hpBarWidth + 4, hpBarHeight + 4);
    ctx.fillStyle = COLORS.fuelBarBg;
    ctx.fillRect(hpX, fuelY, hpBarWidth, hpBarHeight);
    const fuelGrad = ctx.createLinearGradient(hpX, 0, hpX + hpBarWidth, 0);
    fuelGrad.addColorStop(0, '#ff6b00');
    fuelGrad.addColorStop(1, '#00e5ff');
    ctx.fillStyle = fuelGrad;
    ctx.fillRect(hpX, fuelY, hpBarWidth * (p.fuel / FUEL_MAX), hpBarHeight);
    ctx.font = '10px Orbitron';
    ctx.fillStyle = COLORS.textDim;
    ctx.fillText('FUEL', hpX, fuelY - 4);
    ctx.fillStyle = COLORS.text;
    ctx.fillText(`${Math.floor(p.fuel)}%`, hpX + hpBarWidth + 6, fuelY + 9);

    // Utilities (Grenades & Overdrive)
    ctx.textAlign = 'center';
    ctx.font = '12px Orbitron';
    ctx.fillStyle = p.overdrive > 0 ? COLORS.gold : COLORS.textDim;
    ctx.fillText(p.overdrive > 0 ? `⚡ OVERDRIVE (${Math.ceil(p.overdrive/60)}s)` : '', this.width/2, padding + 12);
    ctx.fillStyle = COLORS.text;
    ctx.fillText(`💣 GRENADES: ${p.grenades}`, this.width/2, this.height - padding);

    // Score / Kills / Wave (top right)
    ctx.textAlign = 'right';
    ctx.font = '12px Orbitron';
    ctx.fillStyle = COLORS.gold;
    ctx.fillText(`SCORE: ${this.score}`, this.width - padding, padding + 12);
    ctx.fillStyle = COLORS.player;
    ctx.fillText(`KILLS: ${p.kills}`, this.width - padding, padding + 28);
    ctx.fillStyle = COLORS.text;
    ctx.fillText(`WAVE: ${this.wave}`, this.width - padding, padding + 44);

    // Enemies remaining
    ctx.font = '10px Orbitron';
    ctx.fillStyle = COLORS.textDim;
    const remaining = this.maxEnemiesPerWave - this.enemiesSpawned + this.enemies.length;
    ctx.fillText(`ENEMIES: ${this.enemies.length}`, this.width - padding, padding + 60);

    ctx.textAlign = 'left';
  }

  drawGameOver(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.textAlign = 'center';
    ctx.font = 'bold 48px Rajdhani';
    ctx.fillStyle = COLORS.damage;
    ctx.fillText('GAME OVER', this.width/2, this.height/2 - 40);

    ctx.font = '20px Orbitron';
    ctx.fillStyle = COLORS.gold;
    ctx.fillText(`SCORE: ${this.score}`, this.width/2, this.height/2 + 10);

    ctx.fillStyle = COLORS.text;
    const totalKills = this.players.reduce((sum, p) => sum + p.kills, 0);
    ctx.fillText(`KILLS: ${totalKills}  |  WAVE: ${this.wave}`, this.width/2, this.height/2 + 40);

    ctx.font = '16px Rajdhani';
    ctx.fillStyle = COLORS.textDim;
    ctx.fillText('Press R to restart', this.width/2, this.height/2 + 80);

    ctx.textAlign = 'left';

    // Listen for restart
    if (this.keys['r']) {
      this.restart();
    }
  }

  cycleMap() {
    this.currentMapIndex = (this.currentMapIndex + 1) % MAPS.length;
    this.restart();
  }

  restart() {
    const activeClassId = window.AeroStrikeActiveLoadout || 'assault';
    const classData = CLASS_DATA[activeClassId] || CLASS_DATA.assault;
    playerImg.src = classData.image;

    const mapDef = MAPS[this.currentMapIndex];
    this.mapWidth = mapDef.width;
    this.mapHeight = mapDef.height;
    this.platforms = mapDef.platforms;
    this.camera = { x: 0, y: 0 };
    this.players = [
      this.createPlayer(1, 100, 200, activeClassId),
      this.createPlayer(2, 800, 200, 'heavy')
    ];

    this.score = 0;
    this.wave = 1;
    this.enemies = [];
    this.bullets = [];
    this.grenadesList = [];
    this.pickups = [];
    this.particles = [];
    this.damageNumbers = [];
    this.gameOver = false;
    this.gameTime = 0;
    this.spawnWave();
  }

  loop() {
    this.update();
    this.draw();
    this.animFrame = requestAnimationFrame(() => this.loop());
  }

  start() {
    this.loop();
  }

  stop() {
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame);
    }
  }
}

// ---- Screen Export ----
export function renderDemo() {
  return `
    <div class="demo-layout screen-enter">
      <div class="flex flex-between items-center">
        <div>
          <h2 class="text-glow-cyan">2D COMBAT DEMO</h2>
          <p class="text-secondary" style="margin-top:4px; font-size:0.85rem;">
            Jetpack combat prototype — test core movement & shooting mechanics
          </p>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn-ghost btn-sm" id="demoCycleMapBtn">🗺️ CYCLE MAP</button>
          <button class="btn btn-ghost btn-sm" id="demoRestartBtn">↻ RESTART</button>
          <button class="btn btn-primary btn-sm" id="demoFullscreenBtn">⛶ FULLSCREEN</button>
        </div>
      </div>

      <!-- Controls Info -->
      
      <!-- Debug Tools Panel -->
      <div id="debugPanel" style="position:absolute; top:80px; right:20px; background:rgba(0,0,0,0.8); border:1px solid #00e5ff; border-radius:8px; padding:10px; z-index:110; display:flex; flex-direction:column; gap:8px;">
        <div class="text-cyan font-mono" style="font-size:10px; text-align:center;">DEBUG TOOLS</div>
        <button class="btn btn-ghost btn-sm" id="btnSpawnBot" style="font-size:10px;">🤖 Spawn Bot</button>
        <button class="btn btn-ghost btn-sm" id="btnSpawnHp" style="font-size:10px;">💉 Spawn HP</button>
        <button class="btn btn-ghost btn-sm" id="btnSpawnFuel" style="font-size:10px;">⛽ Spawn Fuel</button>
        <button class="btn btn-ghost btn-sm" id="btnSpawnOverdrive" style="font-size:10px;">⚡ Spawn Overdrive</button>
      </div>

      <div class="demo-controls-info">
        <div class="demo-control-key"><kbd>W</kbd> / <kbd>↑</kbd> / <kbd>SPACE</kbd> <span class="text-dim">Jetpack</span></div>
        <div class="demo-control-key"><kbd>A</kbd> <kbd>D</kbd> / <kbd>←</kbd> <kbd>→</kbd> <span class="text-dim">Move</span></div>
        <div class="demo-control-key"><kbd>F</kbd> / <kbd>J</kbd> / <kbd>ENTER</kbd> <span class="text-dim">Shoot</span></div>
        <div class="demo-control-key"><kbd>G</kbd> / <kbd>SHIFT</kbd> <span class="text-dim">Grenade</span></div>
        <div class="demo-control-key"><kbd>R</kbd> <span class="text-dim">Restart</span></div>
      </div>

      <!-- Game Canvas -->
      <div class="game-canvas-container" id="demoCanvasContainer">
        <canvas id="demoCanvas"></canvas>
      <!-- Mobile Touch Controls Overlay (Hidden on desktop) -->
      <div id="mobileControls" style="display:none; position:absolute; inset:0; pointer-events:none; z-index:100;">
        <!-- Left side: D-Pad -->
        <div style="position:absolute; bottom:20px; left:20px; pointer-events:auto; display:flex; flex-direction:column; gap:10px; opacity:0.6;">
            <div style="display:flex; justify-content:center;">
               <button id="btnUp" style="width:60px; height:60px; border-radius:30px; background:#fff; border:none; font-size:24px;">⬆️</button>
            </div>
            <div style="display:flex; gap:60px;">
               <button id="btnLeft" style="width:60px; height:60px; border-radius:30px; background:#fff; border:none; font-size:24px;">⬅️</button>
               <button id="btnRight" style="width:60px; height:60px; border-radius:30px; background:#fff; border:none; font-size:24px;">➡️</button>
            </div>
            <div style="display:flex; justify-content:center;">
               <button id="btnDown" style="width:60px; height:60px; border-radius:30px; background:#fff; border:none; font-size:24px;">⬇️</button>
            </div>
        </div>
        <!-- Right side: Actions -->
        <div style="position:absolute; bottom:20px; right:20px; pointer-events:auto; display:flex; gap:15px; opacity:0.6; align-items:flex-end;">
            <button id="btnDash" style="width:60px; height:60px; border-radius:30px; background:#fff; border:none; font-size:24px; margin-bottom:40px;">💨</button>
            <button id="btnGrenade" style="width:60px; height:60px; border-radius:30px; background:#fff; border:none; font-size:24px;">💣</button>
            <button id="btnShoot" style="width:80px; height:80px; border-radius:40px; background:#ff2d55; border:none; font-size:32px;">🔫</button>
        </div>
      </div>

      </div>

      <!-- Game Info -->
      <div class="flex gap-lg" style="margin-top:8px;">
        <div class="glass-panel" style="padding:12px 20px; flex:1;">
          <span class="font-mono text-dim" style="font-size:0.7rem;">OBJECTIVE</span>
          <p class="font-heading" style="font-size:0.9rem; margin-top:4px;">
            Survive enemy waves! Use your jetpack to fly, dodge bullets, and eliminate all enemies. 
            Each wave gets harder.
          </p>
        </div>
        <div class="glass-panel" style="padding:12px 20px;">
          <span class="font-mono text-dim" style="font-size:0.7rem;">PHASE 1</span>
          <p class="font-heading text-cyan" style="font-size:0.9rem; margin-top:4px;">Foundation Prototype</p>
          <p class="text-dim" style="font-size:0.75rem;">Core movement & combat</p>
        </div>
      </div>
    </div>
  `;
}

let gameInstance = null;

export function initDemo() {
  const canvas = document.getElementById('demoCanvas');
  if (!canvas) return;

  // Stop any previous game instance
  if (gameInstance) {
    gameInstance.stop();
  }

  gameInstance = new Game(canvas);
  window.gameInstance = gameInstance;
  gameInstance.start();

  // Restart button
  const restartBtn = document.getElementById('demoRestartBtn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      gameInstance.restart();
    });
  }


  // Map Cycle
  const cycleBtn = document.getElementById('demoCycleMapBtn');
  if (cycleBtn) {
    cycleBtn.addEventListener('click', () => { gameInstance.cycleMap(); });
  }

  // Mobile Controls Detection & Wiring
  
  // Debug Tools Wireup
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

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    document.getElementById('mobileControls').style.display = 'block';
    
    const bindTouch = (btnId, key) => {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        btn.addEventListener('touchstart', (e) => { e.preventDefault(); gameInstance.keys[key] = true; });
        btn.addEventListener('touchend', (e) => { e.preventDefault(); gameInstance.keys[key] = false; });
        btn.addEventListener('touchcancel', (e) => { e.preventDefault(); gameInstance.keys[key] = false; });
    };

    bindTouch('btnLeft', 'a');
    bindTouch('btnRight', 'd');
    bindTouch('btnUp', 'w'); // Jetpack
    bindTouch('btnDown', 's'); // Used for dropping/sliding if implemented
    bindTouch('btnShoot', 'f'); // Fire P1
    bindTouch('btnDash', 'shift'); // Dash P1
    bindTouch('btnGrenade', 'g'); // Grenade P1
  }

  // Fullscreen
  const fullscreenBtn = document.getElementById('demoFullscreenBtn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      const container = document.getElementById('demoCanvasContainer');
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    });
  }
}

export function destroyDemo() {
  if (gameInstance) {
    gameInstance.stop();
    gameInstance = null;
  }
}
