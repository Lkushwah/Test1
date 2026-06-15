import sys
import os

filepath = 'src/screens/demo.js'
with open(filepath, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Imports
if "import { CLASS_DATA }" not in code:
    code = "import { CLASS_DATA } from './loadout.js';\n" + code

# 2. Add Classes below Bullet
classes_code = """
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
"""

if "class Pickup" not in code:
    code = code.replace("class Enemy {", classes_code + "\nclass Enemy {")

# 3. Game constructor properties
player_init_old = """    this.player = {
      x: 100, y: 200,
      width: 24, height: 32,
      vx: 0, vy: 0,
      dir: 1,
      hp: 5, maxHp: 5,
      fuel: FUEL_MAX,
      kills: 0,
      onGround: false,
      jetpacking: false,
      shooting: false,
      shootCooldown: 0,
      hitFlash: 0,
      invincible: 0,
    };"""

player_init_new = """    const activeClassId = window.AeroStrikeActiveLoadout || 'assault';
    const classData = CLASS_DATA[activeClassId] || CLASS_DATA.assault;
    playerImg.src = classData.image;

    this.player = {
      x: 100, y: 200,
      width: 24, height: 32,
      vx: 0, vy: 0,
      dir: 1,
      hp: activeClassId === 'heavy' ? 8 : (activeClassId === 'scout' ? 3 : 5),
      maxHp: activeClassId === 'heavy' ? 8 : (activeClassId === 'scout' ? 3 : 5),
      fuel: FUEL_MAX,
      kills: 0,
      onGround: false,
      jetpacking: false,
      shooting: false,
      shootCooldown: 0,
      hitFlash: 0,
      invincible: 0,
      classId: activeClassId,
      baseCooldown: activeClassId === 'scout' ? 30 : (activeClassId === 'heavy' ? 25 : (activeClassId === 'medic' ? 8 : 12)),
      grenades: 3,
      overdrive: 0
    };"""

if "const activeClassId" not in code:
    code = code.replace(player_init_old, player_init_new)

if "this.bullets = [];" in code and "this.grenadesList = [];" not in code:
    code = code.replace("this.bullets = [];", "this.bullets = [];\n    this.grenadesList = [];\n    this.pickups = [];")

# 4. Shooting cooldown logic
shoot_old = """    // Shooting
    if (p.shootCooldown > 0) p.shootCooldown--;
    if ((this.keys['j'] || this.keys['enter'] || this.keys['f']) && p.shootCooldown <= 0) {"""

shoot_new = """    // Grenade throw
    if ((this.keys['g'] || this.keys['shift']) && p.grenades > 0 && p.shootCooldown <= 0) {
      this.grenadesList.push(new Grenade(p.dir === 1 ? p.x + p.width : p.x, p.y + p.height/2, p.dir));
      p.grenades--;
      p.shootCooldown = 30;
    }

    if (p.overdrive > 0) p.overdrive--;

    // Shooting
    if (p.shootCooldown > 0) p.shootCooldown--;
    if ((this.keys['j'] || this.keys['enter'] || this.keys['f']) && p.shootCooldown <= 0) {"""

if "Grenade throw" not in code:
    code = code.replace(shoot_old, shoot_new)

# Base cooldown
if "p.shootCooldown = 12;" in code:
    code = code.replace("p.shootCooldown = 12;", "p.shootCooldown = p.overdrive > 0 ? Math.floor(p.baseCooldown/2) : p.baseCooldown;")

# 5. Enemy drop pickup
kill_old = """            if (!enemy.alive) {
              p.kills++;
              this.score += 100;
              this.damageNumbers.push({"""

kill_new = """            if (!enemy.alive) {
              p.kills++;
              this.score += 100;
              // Drop pickup
              if (Math.random() < 0.35) {
                const types = ['health', 'fuel', 'overdrive'];
                this.pickups.push(new Pickup(enemy.x, enemy.y, types[Math.floor(Math.random() * types.length)]));
              }
              this.damageNumbers.push({"""

if "// Drop pickup" not in code:
    code = code.replace(kill_old, kill_new)

# 6. Update grenades and pickups
update_entities_old = """    // Update enemies
    this.enemies = this.enemies.filter(e => e.update(p.x, p.y, this.bullets, this.particles));"""

update_entities_new = """    // Update grenades
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
      if (p.x < pk.x + pk.width && p.x + p.width > pk.x &&
          p.y < pk.y + pk.height && p.y + p.height > pk.y) {
        if (pk.type === 'health') p.hp = Math.min(p.maxHp, p.hp + 2);
        if (pk.type === 'fuel') p.fuel = FUEL_MAX;
        if (pk.type === 'overdrive') p.overdrive = 600;
        return false;
      }
      return true;
    });

    // Update enemies
    this.enemies = this.enemies.filter(e => e.update(p.x, p.y, this.bullets, this.particles));"""

if "// Update grenades" not in code:
    code = code.replace(update_entities_old, update_entities_new)

# 7. Draw grenades and pickups
draw_old = """    // Particles (behind entities)
    for (const p of this.particles) {
      p.draw(ctx);
    }"""

draw_new = """    // Pickups and Grenades
    for (const pk of this.pickups) pk.draw(ctx);
    for (const g of this.grenadesList) g.draw(ctx);

    // Particles (behind entities)
    for (const p of this.particles) {
      p.draw(ctx);
    }"""

if "// Pickups and Grenades" not in code:
    code = code.replace(draw_old, draw_new)

# 8. Draw HUD updates
hud_old = """    // Score / Kills / Wave (top right)"""
hud_new = """    // Utilities (Grenades & Overdrive)
    ctx.textAlign = 'center';
    ctx.font = '12px Orbitron';
    ctx.fillStyle = p.overdrive > 0 ? COLORS.gold : COLORS.textDim;
    ctx.fillText(p.overdrive > 0 ? `⚡ OVERDRIVE (${Math.ceil(p.overdrive/60)}s)` : '', this.width/2, padding + 12);
    ctx.fillStyle = COLORS.text;
    ctx.fillText(`💣 GRENADES: ${p.grenades}`, this.width/2, this.height - padding);

    // Score / Kills / Wave (top right)"""

if "💣 GRENADES" not in code:
    code = code.replace(hud_old, hud_new)

# 9. Controls info
controls_old = """        <div class="demo-control-key"><kbd>F</kbd> / <kbd>J</kbd> / <kbd>ENTER</kbd> <span class="text-dim">Shoot</span></div>"""
controls_new = """        <div class="demo-control-key"><kbd>F</kbd> / <kbd>J</kbd> / <kbd>ENTER</kbd> <span class="text-dim">Shoot</span></div>
        <div class="demo-control-key"><kbd>G</kbd> / <kbd>SHIFT</kbd> <span class="text-dim">Grenade</span></div>"""

if "<kbd>G</kbd>" not in code:
    code = code.replace(controls_old, controls_new)

# 10. Restart state
restart_old = """    this.player.x = 100;
    this.player.y = 200;"""

restart_new = """    const activeClassId = window.AeroStrikeActiveLoadout || 'assault';
    const classData = CLASS_DATA[activeClassId] || CLASS_DATA.assault;
    playerImg.src = classData.image;

    this.player.classId = activeClassId;
    this.player.baseCooldown = activeClassId === 'scout' ? 30 : (activeClassId === 'heavy' ? 25 : (activeClassId === 'medic' ? 8 : 12));
    this.player.maxHp = activeClassId === 'heavy' ? 8 : (activeClassId === 'scout' ? 3 : 5);
    
    this.player.x = 100;
    this.player.y = 200;"""

if "this.player.classId = activeClassId;" not in code:
    code = code.replace(restart_old, restart_new)
    
restart_state_old = """    this.score = 0;
    this.wave = 1;
    this.enemies = [];
    this.bullets = [];
    this.particles = [];
    this.damageNumbers = [];"""

restart_state_new = """    this.player.grenades = 3;
    this.player.overdrive = 0;
    this.score = 0;
    this.wave = 1;
    this.enemies = [];
    this.bullets = [];
    this.grenadesList = [];
    this.pickups = [];
    this.particles = [];
    this.damageNumbers = [];"""

if "this.player.grenades = 3;" not in code:
    code = code.replace(restart_state_old, restart_state_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(code)

print("demo.js updated successfully!")
