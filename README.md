# 🚀 Aero Strike — 2D Jetpack Combat

Aero Strike is a fast-paced 2D combat action game prototype built as a high-performance Single Page Application (SPA) with supporting native integration for Android. The project showcases modern web animation techniques, responsive HSL-tailored dark modes, fluid micro-interactions, custom routing, and a custom 2D canvas-based physics engine.

---

## 📖 Table of Contents
1. [Game Features & Mechanics](#-game-features--mechanics)
2. [Project Architecture & Design](#-project-architecture--design)
3. [Repository File Structure](#-repository-file-structure)
4. [Getting Started (Web Development)](#-getting-started-web-development)
5. [Native Android Integration (Android Studio)](#-native-android-integration-android-studio)
6. [Design & Technical Documentations](#-design--technical-documentations)
7. [Git Branch Strategy](#-git-branch-strategy)

---

## 🎮 Game Features & Mechanics

- **Jetpack Movement**: Realistic gravity, horizontal momentum, wall-sliding friction, custom thrust force, and a depleting/regenerating fuel mechanics.
- **Weapon Classes**: 
  - **Assault**: Standard automatic rifle loadout.
  - **Scout**: High-velocity sniper rifle with piercing rounds and double damage.
  - **Heavy**: Rocket launcher firing explosive projectiles with Area of Effect (AoE) damage and screen shake.
  - **Medic**: Fast fire-rate SMG with rapid reload cycles.
  - **Engineer**: Spread-shot plasma shotgun.
- **Dynamic 2D Physics Engine**: Bouncing grenade mechanics, collision detection for platforms and map boundaries, particle triggers for jetpack exhausts, and customizable camera tracking.
- **Interactive UI Panel**: Fully featured glassmorphic lobby with a live countdown, news lists, and interactive tab panels.
- **HUD Preview & Battle Royale Modes**: Simulated BR mode screens with real-time leaderboard sorting, gas warnings, zone closure countdowns, and dynamic minimap coordinate tracking.

---

## 🛠️ Project Architecture & Design

Aero Strike is designed as a **Vanilla JS Single Page Application (SPA)** utilizing **Vite** for optimized assets hot-reloading and modular builds.

### Key Abstractions:
1. **Routing (`src/router.js`)**: A custom hash-based routing system (`#lobby`, `#loadout`, `#demo`, etc.) supporting animated fade/slide transitions and programmatic view teardowns (`_hudCleanup`, `destroyDemo`).
2. **Game Core Loop (`src/screens/demo.js`)**: Runs a high-performance `requestAnimationFrame` loop that coordinates physics updates (`Game.update()`) and canvas renders (`Game.draw()`) at 60 FPS.
3. **Teardown Registry**: Screens register cleanup callbacks (`clearInterval`, `cancelAnimationFrame`) upon initialization, guaranteeing 0% memory/handle leaks when navigating between routes.
4. **Toast Alerts**: CSS-animated, auto-fading status boxes in the bottom right corner providing instant feedback for loadout swaps and action completions.

---

## 📂 Repository File Structure

```
Test1/
├── .gitignore               # Main Git exclusion rules (dist, node_modules ignored)
├── capacitor.config.json    # Capacitor Android configurations
├── index.html               # Main entry HTML file
├── package.json             # NPM dependencies & execution scripts
├── vitest.config.js         # Vitest configuration for DOM testing environment
│
├── src/                     # Source Code
│   ├── main.js              # Entry JavaScript file; binds routing & initialization
│   ├── router.js            # Custom hash SPA Router
│   ├── index.css            # Global CSS variables, design tokens & generic components
│   ├── style.css            # App layout shell styles
│   ├── screens.css          # Screen-specific styles (lobby, loadout, battlepass, etc.)
│   │
│   ├── screens/             # UI Views & Controllers
│   │   ├── lobby.js         # Main Lobby (Featured Store, news, Interactive tabs)
│   │   ├── loadout.js       # Loadout customization & class metadata
│   │   ├── battlepass.js    # Battle Pass progression track
│   │   ├── ranked.js        # Ranked season metrics & queue
│   │   ├── demo.js          # Core 2D Jetpack Combat Engine & Game Loop
│   │   ├── hud.js           # In-match HUD mock & timers
│   │   └── gamescreen.js    # Battle Royale simulation screen
│   │
│   └── assets/              # Game graphics (backgrounds & character sprites)
│
├── test/                    # Comprehensive Automated Test Suites (Vitest)
│   ├── router.test.js       # SPA transition tests
│   ├── lobby.test.js        # Tabs interaction, coin collection, and countdown tests
│   ├── loadout.test.js      # Class changing & state tests
│   ├── demo.test.js         # Physics engine boundary & update loop tests
│   ├── hud.test.js          # HUD intervals & timers cleanup tests
│   └── gamescreen.test.js   # BR simulation timers & leaderboard sorting tests
│
└── android/                 # Native Android Project (Gradle build structure)
    ├── .gitignore           # Git ignore specific to Android (web assets public/ committed on android-app branch)
    └── app/src/main/
        ├── assets/public/   # Synced Vite production web build assets
        └── java/            # Native Android Activity code wrappers
```

---

## 💻 Getting Started (Web Development)

Follow these steps to run the game in your local browser environment:

### Prerequisites
Make sure you have **Node.js** (v18+) installed.

### Setup and Running
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Dev Server**:
   ```bash
   npm run dev
   ```
   Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.
3. **Execute Automated Tests**:
   Runs the full Vitest test suite (209 unit tests):
   ```bash
   npm run test
   ```
4. **Compile Production Build**:
   Generates optimized CSS and JS assets in the `/dist` directory:
   ```bash
   npm run build
   ```

---

## 🤖 Native Android Integration (Android Studio)

Aero Strike leverages **Capacitor** to wrap web assets inside a native Android project wrapper. 

### Syncing Updates to Android:
Whenever you modify frontend files in `src/`, compile and sync them to Android by running:
```bash
npm run build
npx cap sync
```

### Running on a Device or Emulator:
1. Open **Android Studio**.
2. Select **Open an Existing Project** and choose the `/android` folder in the root repository.
3. Wait for the Gradle build files to synchronize.
4. Run/Debug (`Shift + F10`) to launch the game directly on your Android device or emulator!

---

## 🎯 Design & Technical Documentations

### SPA Tab State Management:
Tabs on the lobby view (`LobbyTabs`) render dynamically inside the `#lobbyTabContent` panel. They utilize local state triggers to perform real-time DOM edits:
- **Inventory Panel**: Teaches players how to use consumable boosters, equip character gear, and open loot crates (which adds **+500 Gold Coins** directly to the main header currency counts).
- **Weapons Panel**: Allows players to cycle loadouts, updating the active weapon metadata instantly.
- **Events Panel**: Provides **Claim** rewards that add **+100 Gems** directly to currency displays.
- **Friends Panel**: Simulates friend request lookups and appends players dynamically to the view list.

### Memory Leak Prevention:
To prevent active timers from stacking up when players switch between screens, intervals are collected inside arrays and cleared during page teardowns using the custom `_hudCleanup` and `destroyDemo` methods:
```javascript
container._hudCleanup = () => {
  clearInterval(barsInterval);
  clearInterval(timerInterval);
  clearInterval(killInterval);
  clearInterval(dotsInterval);
  abilityIntervals.forEach(clearInterval);
};
```

---

## 🌿 Git Branch Strategy

- **`main`**: The clean source branch. Compiled web assets (`/dist` and `/android/app/src/main/assets/public`) are ignored to keep the repository codebase clean.
- **`android-app`**: The release branch. Web exclusions are removed from `android/.gitignore`, checking the fully synced Vite production web build assets directly into remote source control for easy execution inside Android Studio.
