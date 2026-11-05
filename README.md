# Turfie Web Client

Standalone React dashboard for the Turfie Discord bot.

## Stack

- React 19 + Vite
- TypeScript
- Tailwind CSS v4
- React Router
- TanStack Query
- Framer Motion
- Lucide icons + React Icons
- styled-components theme system
- Vercel Analytics + Speed Insights

## Setup

```bash
yarn install
cp .env.example .env
yarn dev
```

`.env`:

```env
VITE_API_URL="http://localhost:4000"
```

The frontend talks to a separate REST API. Discord OAuth, sessions, and all
database work live in the backend project.

## Scripts

```bash
yarn dev      # start the Vite dev server
yarn build    # type-check and build to dist/
yarn preview  # preview the production build
yarn lint     # oxlint
```

## Structure

```
src/
  api/          REST API client
  assets/       local fonts and static assets
  components/   shared UI components (Button, Card, fields, etc.)
  constants/    games, navigation, and motion variants
  context/      Discord session + theme providers
  hooks/        React Query, theme, localStorage, scroll hooks
  layouts/      navigation, footer, public, dashboard, guild layouts
  pages/        landing, login, servers, overview, game panel
  themes/       light/dark theme tokens and component themes
  types/        shared TypeScript types
  utils/        query client and class helpers
```

## Theme architecture

The client follows the same pattern as the portfolio project:

- `ThemeProvider` wraps the app and feeds `styled-components`
- `useThemeMode` persists `light` / `dark` in localStorage
- `useTheme` reads the active component theme
- `themes/default/components/{light,dark}/*` define class tokens per section
- `Button`, `Card`, `Navbar`, and `FooterSection` consume the theme

The current Turfie design defaults to the dark theme. The `ButtonTheme` toggle
component is included and can be dropped into the navbar when light-mode polish
is ready.

## Path aliases

`@src`, `@components`, `@constants`, `@context`, `@hooks`, `@layouts`, `@pages`,
`@themes`, `@utils`, `@assets`

## API dependency

The client expects the backend REST API to expose:

- `GET /api/auth/status`
- `GET /api/auth/me`
- `GET /api/auth/discord`
- `POST /api/auth/logout`
- `GET /api/guilds`
- `GET /api/guilds/:guildId`
- `GET /api/guilds/:guildId/resources`
- `PATCH /api/guilds/:guildId/config`
- `GET/POST/PATCH/DELETE /api/guilds/:guildId/games`

## Deployment

- Build command: `yarn build`
- Output: `dist/`
- Environment: `VITE_API_URL=https://api.yourdomain.com`
- `vercel.json` includes the SPA fallback rewrite.
