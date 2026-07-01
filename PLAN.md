# Keanita Mobile Web — Implementation Plan

Rebuild the Keanita Expo/React Native app (`../nextjs-sample`) as a mobile-only
Next.js web app that looks identical to the app when opened on a phone.

## Target stack
- **Next.js 16 (App Router) + React 19**
- **Tailwind CSS v4** — brand tokens in `app/globals.css` `@theme` (the `k-*` colors + `radius-4xl`)
- **next/font/google** — Baloo 2 (display) + Nunito (body)
- **framer-motion** — drawer slide, tab press, modals
- **react-icons/md** — reproduces the app's Material icon glyphs
- **@supabase/supabase-js** — auth only (same project)

## Approach
Rebuild each screen against thin RN-shim primitives (`lib/rn.tsx`: View, Text,
ScrollView, Pressable/AnimatedPress, Img, LinearGradient) so ported screen code
stays close to the RN source. Everything lives inside a centered
`max-w-[430px]` phone frame (`.phone-frame` in globals.css) — phone-width on
desktop, full-screen on a phone.

### RN → web mapping
| React Native | Web |
|---|---|
| `View` / `Text` | `div` / `span` (flex-column defaults preserved) |
| `ScrollView` | overflow container |
| `expo-image` | `<img>` with objectFit |
| `Pressable` + expo-router `router.push` | framer-motion button + `useRouter` |
| custom bottom tab bar | `position: fixed` bar pinned to the frame |
| NativeWind classes | Tailwind v4 (≈1:1) |
| reanimated / haptics | framer-motion / dropped |
| `useSafeAreaInsets` | frame owns safe areas (returns 0s) |

## Phases
- **Phase 0 — Foundation** ✅ scaffold, tokens, fonts, primitives, IconSymbol,
  phone frame, bottom tab bar, nav drawer, auth + rewards contexts, mock data,
  image assets.
- **Phase 1 — Login + Home** ✅ `/login` and `/` (HomeHeader, ClubCard,
  QuickActionGrid, EmergencyCallButton, UpcomingCarousel, SectionHeader,
  ProductCard). First previewable build.
- **Phase 2 — Remaining tabs** ⏳ `events`, `characters`, `profile`, `games` (919-line).
- **Phase 3 — Detail + secondary screens** ⏳ `product/[id]`, `event/[id]`,
  `products`, `seminars`, `about`, `rewards`, `gifts`, `notifications`,
  `edit-profile`, `modal`, `kids-club` + 5 modals.
  (These currently render a `ComingSoon` placeholder so nav never 404s.)
- **Phase 4 — Polish** ⏳ transitions, scroll behavior, safe-area padding,
  real-device pass.

## Auth decision (preview)
The login screen is ported and wired to Supabase, but the app is **not
hard-gated** — visitors land straight on Home so the client can preview
instantly. Flip to a guarded layout later (redirect when no session) to enforce
login, matching the app's `Stack.Protected`.

## Run
```
cd keanita-web
npm run dev   # http://localhost:3000 (or next free port)
```
