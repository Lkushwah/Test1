import re

with open('src/screens/demo.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Extract platforms and put them in MAPS array
maps_def = """
const MAPS = [
  // Map 0: "The Foundry" (Multi-tiered)
  [
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
  ],
  // Map 1: "Symmetrical Arena" (Original)
  [
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
];
"""

# Insert MAPS at the top after imports
code = code.replace("const PARTICLE_COUNT = 3;", "const PARTICLE_COUNT = 3;\n" + maps_def)

# Replace the this.platforms assignment in constructor
code = re.sub(
    r'    // Symmetrical Arena Map - "The Foundry"\n    this\.platforms = \[\s*//[\s\S]*?    \];',
    '    this.currentMapIndex = 0;\n    this.platforms = MAPS[this.currentMapIndex];',
    code
)

# Replace restart logic to pick the current map
code = code.replace(
    'this.players = [',
    'this.platforms = MAPS[this.currentMapIndex];\n    this.players = ['
)

# Add cycleMap method
code = code.replace(
    '  restart() {',
    '''  cycleMap() {
    this.currentMapIndex = (this.currentMapIndex + 1) % MAPS.length;
    this.restart();
  }

  restart() {'''
)

# RenderDemo updates: Add UI buttons and Mobile touch overlay
code = code.replace(
    '<button class="btn btn-ghost btn-sm" id="demoRestartBtn">↻ RESTART</button>',
    '<button class="btn btn-ghost btn-sm" id="demoCycleMapBtn">🗺️ CYCLE MAP</button>\n          <button class="btn btn-ghost btn-sm" id="demoRestartBtn">↻ RESTART</button>'
)

mobile_overlay = """
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
"""
code = code.replace('<canvas id="demoCanvas"></canvas>', '<canvas id="demoCanvas"></canvas>' + mobile_overlay)

# InitDemo updates: Wire touch events
init_logic = """
  // Map Cycle
  const cycleBtn = document.getElementById('demoCycleMapBtn');
  if (cycleBtn) {
    cycleBtn.addEventListener('click', () => { gameInstance.cycleMap(); });
  }

  // Mobile Controls Detection & Wiring
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
"""

code = code.replace(
    '''  // Fullscreen
  const fullscreenBtn = document.getElementById('demoFullscreenBtn');''',
    init_logic + "\n" + '''  // Fullscreen
  const fullscreenBtn = document.getElementById('demoFullscreenBtn');'''
)

with open('src/screens/demo.js', 'w', encoding='utf-8') as f:
    f.write(code)
