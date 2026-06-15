import re

with open('src/screens/demo.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Change constructor player creation
code = re.sub(
    r'    const activeClassId = window\.AeroStrikeActiveLoadout \|\| \'assault\';[\s\S]*?wallSliding: false\n    };',
    '''    const activeClassId = window.AeroStrikeActiveLoadout || 'assault';
    this.players = [
      this.createPlayer(1, 100, 200, activeClassId),
      this.createPlayer(2, 800, 200, 'heavy') // Player 2 defaults to heavy
    ];''',
    code
)

# Add createPlayer method before update()
code = re.sub(
    r'  update\(\) \{',
    '''  createPlayer(id, x, y, classId) {
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

  update() {''',
    code
)

# Fix AI tracking player
code = re.sub(
    r'let bestDist = 0;\n    for \(const sp of spawnPoints\) \{\n      const dx = sp\.x - this\.player\.x;\n      const dy = sp\.y - this\.player\.y;',
    '''let bestDist = 0;
    for (const sp of spawnPoints) {
      const p1 = this.players[0];
      const dx = sp.x - p1.x;
      const dy = sp.y - p1.y;''',
    code
)

code = re.sub(
    r'this\.enemies\.filter\(e => e\.update\(p\.x, p\.y, this\.bullets, this\.particles\)\);',
    '''this.enemies.filter(e => {
      // Find closest player
      let target = this.players[0];
      let minDist = 999999;
      for (const p of this.players) {
        if (p.hp <= 0) continue;
        let d = Math.abs(e.x - p.x) + Math.abs(e.y - p.y);
        if (d < minDist) { minDist = d; target = p; }
      }
      return e.update(target.x, target.y, this.bullets, this.particles);
    });''',
    code
)

# Update player collision in Bullets
code = re.sub(
    r'      // Bullet-player collision\n      if \(b\.isEnemy && p\.invincible <= 0\) \{\n        if \(b\.x \+ b\.width > p\.x && b\.x < p\.x \+ p\.width &&\n            b\.y \+ 2 > p\.y && b\.y - 2 < p\.y \+ p\.height\) \{\n          p\.hp--;\n          p\.hitFlash = 10;\n          p\.invincible = 30;\n          this\.screenShake = 8;\n          for \(let i = 0; i < 10; i\+\+\) \{\n            this\.particles\.push\(new Particle\(\n              p\.x \+ p\.width/2, p\.y \+ p\.height/2,\n              \(Math\.random\(\)-0\.5\)\*6, \(Math\.random\(\)-0\.5\)\*6,\n              COLORS\.damage, 20, 3\n            \)\);\n          \}\n          if \(p\.hp <= 0\) \{\n            this\.gameOver = true;\n          \}\n          return false;\n        \}\n      \}',
    '''      // Bullet-player collision
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
      }''',
    code
)

# Update Pickups
code = re.sub(
    r'if \(p\.x < pk\.x \+ pk\.width && p\.x \+ p\.width > pk\.x &&\n          p\.y < pk\.y \+ pk\.height && p\.y \+ p\.height > pk\.y\) \{\n        if \(pk\.type === \'health\'\) p\.hp = Math\.min\(p\.maxHp, p\.hp \+ 2\);\n        if \(pk\.type === \'fuel\'\) p\.fuel = FUEL_MAX;\n        if \(pk\.type === \'overdrive\'\) p\.overdrive = 600;\n        return false;\n      \}',
    '''for (const p of this.players) {
        if (p.hp <= 0) continue;
        if (p.x < pk.x + pk.width && p.x + p.width > pk.x && p.y < pk.y + pk.height && p.y + p.height > pk.y) {
          if (pk.type === 'health') p.hp = Math.min(p.maxHp, p.hp + 2);
          if (pk.type === 'fuel') p.fuel = FUEL_MAX;
          if (pk.type === 'overdrive') p.overdrive = 600;
          return false;
        }
      }''',
    code
)

# Now, the tricky part: update() and draw() player loops
# We need to wrap the entire movement/shooting block in a loop.
# It starts at `const p = this.player;`
movement_start = code.find('    const p = this.player;')
movement_end = code.find('    // Invincibility', movement_start)

movement_block = code[movement_start:movement_end]
# We'll replace it with a loop over this.players
new_movement_block = """    for (const p of this.players) {
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
      if (p.x + p.width >= this.width) { p.x = this.width - p.width; touchingWall = true; }
      
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
      if (p.y + p.height >= this.height) { p.y = this.height - p.height; p.vy = 0; p.onGround = true; }

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
"""

code = code[:movement_start] + new_movement_block + code[movement_end+20:]

# Replace `if (p.invincible > 0) p.invincible--;` with loop
code = code.replace("if (p.invincible > 0) p.invincible--;\n    if (p.hitFlash > 0) p.hitFlash--;", """      if (p.invincible > 0) p.invincible--;
      if (p.hitFlash > 0) p.hitFlash--;
    }""")


# Update drawPlayer
code = code.replace("drawPlayer(ctx) {", "drawPlayer(ctx, p) {")
code = code.replace("const p = this.player;\n    if (p.invincible > 0 && Math.floor(this.gameTime / 3) % 2 === 0) return;", "if (p.hp <= 0 || (p.invincible > 0 && Math.floor(this.gameTime / 3) % 2 === 0)) return;")
code = code.replace("this.drawPlayer(ctx);", "for (const p of this.players) { this.drawPlayer(ctx, p); }")

# Update HUD
code = code.replace("const p = this.player;", "const p = this.players[0]; const p2 = this.players[1];")
# We will just draw HUD for both players manually below if we wanted, but let's just do p1 left, p2 right.
code = code.replace("ctx.fillText('HEALTH', 20, this.height - 50);", "ctx.fillText('P1 HEALTH', 20, this.height - 50);")
code = code.replace("ctx.fillText('FUEL', 200, this.height - 50);", "ctx.fillText('P1 FUEL', 200, this.height - 50);")
code = code.replace("ctx.fillText(`KILLS: ${p.kills}`, this.width - 120, this.height - 50);", "ctx.fillText(`P1 KILLS: ${p.kills}`, 350, this.height - 50);")
code = code.replace("ctx.fillText(`GRENADES: ${p.grenades}`, this.width - 120, this.height - 25);", "ctx.fillText(`P1 GRENADES: ${p.grenades}`, 350, this.height - 25);")

# Add P2 hud
code = code.replace("ctx.restore();\n  }\n\n  drawGameOver", """
    if (p2) {
      ctx.fillStyle = COLORS.textDim;
      ctx.fillText('P2 HEALTH', this.width - 320, this.height - 50);
      ctx.fillText('P2 FUEL', this.width - 180, this.height - 50);
      ctx.fillStyle = COLORS.healthBarBg;
      ctx.fillRect(this.width - 320, this.height - 40, 120, 12);
      ctx.fillRect(this.width - 180, this.height - 40, 120, 12);
      ctx.fillStyle = COLORS.healthBar;
      ctx.fillRect(this.width - 320, this.height - 40, 120 * (p2.hp / p2.maxHp), 12);
      ctx.fillStyle = COLORS.fuelBar;
      ctx.fillRect(this.width - 180, this.height - 40, 120 * (p2.fuel / FUEL_MAX), 12);
      ctx.fillStyle = COLORS.text;
      ctx.fillText(`P2 KILLS: ${p2.kills}`, this.width - 450, this.height - 50);
      ctx.fillText(`P2 GRENADES: ${p2.grenades}`, this.width - 450, this.height - 25);
    }
    ctx.restore();
  }

  drawGameOver""")


with open('src/screens/demo.js', 'w', encoding='utf-8') as f:
    f.write(code)
