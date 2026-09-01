# The Bet

A cinematic, mobile-first tile-reveal game built for a very specific dating bet. React + TypeScript + Tailwind + Framer Motion. No backend.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Replace the two photos

1. Drop two square-ish images (ideally cropped to a **1:1 square** so the 8×8 grid lines up perfectly) into `public/images/`:
   - `public/images/her.jpg`
   - `public/images/me.jpg`
2. Update `src/config/gameConfig.ts`:
   ```ts
   herPhoto: "/images/her.jpg",
   myPhoto: "/images/me.jpg",
   ```
   (The default config points at the SVG placeholders that ship with the repo — swap those two lines to `.jpg`.)

Each tile at row `r`, column `c` reveals the same `r/c` section of the photo, so square inputs produce a clean mosaic.

## Change the secret key

Two options:

- **Env var (recommended for Vercel):** set `VITE_GAME_KEY` in your Vercel project → Environment Variables. Then redeploy.
- **In code:** edit `src/config/gameConfig.ts` → `secretKey`.

The secret key unlocks a new attempt each time — up to `maxAttempts` total. On the final allowed attempt she'll see the permanent loss screen instead of another unlock prompt.

## Change difficulty

`src/config/gameConfig.ts`:

| Key | Default | Meaning |
| --- | --- | --- |
| `boardSize` | `4` | grid dimension → total tiles = `boardSize²` (4 = 16 tiles) |
| `requiredCorrectTiles` | `4` | how many HER tiles exist on the board — she must reveal all of them to win |
| `totalLives` | `3` | lives per attempt |
| `maxAttempts` | `5` | first attempt + up to 4 secret-key recoveries; last loss becomes final |
| `herTileRatio` | `[0, 0]` | legacy; the board now places exactly `requiredCorrectTiles` HER tiles |

## Reset the game (dev only)

- Add `?resetGame=true` to the URL, or
- Open devtools → Application → Local Storage → delete `the-bet:v4`, or
- Paste `localStorage.clear()` into the console.

## Persisted state

Stored in `localStorage` under `the-bet:v4`:
- `phase`, `attemptNumber`, `livesRemaining`, `correctCount`
- `tiles` (the generated board for this attempt)
- `seed`, `recoveryKeyUsed`, `gameLocked`, `initialAttemptPlayed`

Refreshing the browser will **not** restore lives.

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or click **New Project** on vercel.com, import the repo. The included `vercel.json` handles SPA routing.

Add the env var:
- `VITE_GAME_KEY` = your key

## Structure

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── config/gameConfig.ts        ← photos, difficulty, secret key
├── types/game.ts
├── hooks/
│   ├── useLocalStorage.ts
│   └── useGameState.ts
├── utils/
│   ├── board.ts                ← seeded deterministic board generator
│   └── messages.ts             ← flirty messages
└── components/
    ├── LandingScreen.tsx
    ├── GameScreen.tsx
    ├── GameBoard.tsx
    ├── GameTile.tsx            ← 3D flip + photo-slice reveal
    ├── GameHUD.tsx
    ├── LivesDisplay.tsx
    ├── ProgressDisplay.tsx
    ├── WrongTileMessage.tsx
    ├── WinScreen.tsx
    ├── LockedScreen.tsx
    ├── SecretKeyModal.tsx
    ├── AccessGrantedScreen.tsx
    └── FinalLossScreen.tsx
```
