# CLAUDE.md - AI Assistant Guide

> **Last Updated:** 2025-12-12
> **Project:** @naru/untitled-ui-library
> **Type:** TypeScript React Component Library (Project SEKAI-themed)

This document provides AI assistants with essential context about the codebase structure, conventions, and workflows.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Codebase Structure](#codebase-structure)
3. [Development Workflows](#development-workflows)
4. [Component Architecture](#component-architecture)
5. [Styling System](#styling-system)
6. [Code Conventions](#code-conventions)
7. [Important Patterns](#important-patterns)
8. [Quality Standards](#quality-standards)
9. [Common Tasks](#common-tasks)
10. [Critical Rules](#critical-rules)

---

## Project Overview

**What is this?** A React component library inspired by Project SEKAI (Hatsune Miku rhythm game), providing themed UI components with dynamic color system and light/dark mode support.

**Tech Stack:**
- React 18 + TypeScript (Strict mode)
- SCSS + CSS Modules (scoped styling)
- Rollup (dual ESM/CJS bundling)
- Storybook (component documentation)
- Plop (code generation)

**Key Features:**
- 40+ themed React components
- 40+ character/unit color constants (Project SEKAI)
- Theme provider with localStorage persistence
- Next.js App Router compatible (`'use client'` directives)
- Accessibility-first design

**Distribution:**
```bash
npm install github:Narumikr/Untitled#release/untitled
```

---

## Codebase Structure

```
/home/user/Untitled/
├── src/
│   ├── components/          # 22 component directories
│   │   ├── button/          # BasicButton, HamburgerButton, etc.
│   │   ├── card/            # Card, MusicBannerCard, PrskLinkCard
│   │   ├── dialog/          # Dialog, WindowDialog, XoMikuDialog
│   │   ├── effect/          # SekaiBackground, IntoTheSekai
│   │   ├── text/            # TypewriterText, MarqueeText, OutlineText
│   │   ├── select/          # Checkbox, Chip
│   │   └── [others]/        # accordion, breadcrumb, drawer, dropdown, etc.
│   ├── hooks/               # Custom React hooks
│   │   ├── useCreateSekai.ts       # Theme context consumer
│   │   ├── useLocalStorage.ts      # Persistent storage with sync
│   │   ├── useThemeMode.ts         # Light/dark detection
│   │   └── [others]/               # useWindowSize, useCurrectTime, etc.
│   ├── utils/               # Utility functions
│   │   ├── converter.ts            # Color conversion (hex→rgb/rgba)
│   │   ├── type.ts                 # TypeScript utility types
│   │   ├── createSekai.ts          # Theme factory
│   │   └── operation.ts            # Keyboard handlers, array utils
│   ├── internal/            # NOT exported publicly
│   │   ├── useOptionalSekai.ts     # Core theme resolution hook
│   │   ├── usePortalContainer.ts   # Portal DOM helper
│   │   └── color.constant.ts       # Color constants
│   ├── styles/              # Global styles
│   │   ├── global.module.scss      # Utility classes, z-index, typography
│   │   ├── sekai-colors.ts         # Color constants (40+ colors)
│   │   └── sekai-colors.css        # CSS custom properties
│   ├── img/                 # SVG assets
│   └── index.ts             # Auto-generated entry point
├── stories/                 # Storybook documentation
├── .storybook/              # Storybook config
├── scripts/
│   ├── generator.py         # Auto-generates index.ts files
│   └── build_local.sh       # Creates local npm package
├── plop-templates/          # Code generation templates
├── .github/workflows/       # CI/CD (ESLint check on PR)
└── dist/                    # Build output (CJS, ESM, types)
```

### Component File Pattern

**EVERY component follows this structure:**
```
ComponentName/
├── ComponentName.tsx              # Main component
└── ComponentName.module.scss      # Scoped CSS Module
```

---

## Development Workflows

### Build Pipeline

```bash
npm run build
```

**Sequence:**
1. `rm -rf dist` - Clean old build
2. `npm run generate-index` - Auto-generate index files (Python script)
3. `rollup -c` - Bundle to dist/cjs, dist/esm, dist/index.d.ts
4. `tsc --noEmit` - Type check (no emit)
5. `scripts/build_local.sh` - Create `.tgz` for local testing

**CRITICAL:** Always run build before pushing to ensure `dist/` is up-to-date.

### Creating New Components

**Use Plop generator:**
```bash
npm run plop
```

**Prompts:**
1. Folder name (e.g., `button`) → converts to `kebab-case`
2. Component name (e.g., `BasicButton`) → converts to `PascalCase`

**Generated files:**
- `src/components/{folder}/{Component}.tsx`
- `src/components/{folder}/{Component}.module.scss`
- `stories/{folder}/{Component}.stories.tsx`

**After generation:**
1. Run `npm run generate-index` to update exports
2. Implement component following patterns (see Component Architecture)
3. Build and test in Storybook (`npm run dev`)

### Linting & Formatting

**Before committing:**
```bash
npm run lint        # Auto-fix with ESLint
npm run prettier    # Format code
```

**VS Code:** Auto-formats on save (see `.vscode/settings.json`)

**CI/CD:** ESLint runs on every PR (GitHub Actions) - must pass with 0 warnings.

### Storybook Development

```bash
npm run dev         # Starts on http://localhost:6006
```

- Create stories alongside components
- Use `@` path alias for imports (`@/components/...`)
- Include all component variants and prop combinations

---

## Component Architecture

### Standard Component Template

**Every component should follow this pattern:**

```typescript
import type React from 'react'
import clsx from 'clsx'
import type { ColorsSekaiKey, PaletteMode } from '@/styles/sekai-colors'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba } from '@/utils/converter'
import globalStyles from '@/styles/global.module.scss'
import styles from './ComponentName.module.scss'

export interface ComponentNameProps {
  // Theme props (standard across all components)
  sekai?: ColorsSekaiKey      // Character/unit color
  themeMode?: PaletteMode     // 'light' | 'dark'

  // Standard HTML props
  id?: string
  className?: string
  style?: React.CSSProperties

  // Component-specific props
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  children?: React.ReactNode

  // Event handlers
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const ComponentName = ({
  sekai,
  themeMode,
  id,
  className,
  style,
  children,
  ...rest
}: ComponentNameProps) => {
  // 1. Theme resolution (REQUIRED for all themed components)
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({
    sekai,
    mode: themeMode
  })

  // 2. CSS variables for dynamic theming
  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3),
  }

  // 3. Render with proper class composition
  return (
    <button
      id={id}
      className={clsx(
        styles['component-name'],                    // Component styles
        globalStyles[`sekai-color-${modeTheme}`],    // Global theme
        className,                                    // User className
      )}
      style={{ ...(optionStyle as React.CSSProperties), ...style }}
      {...rest}
    >
      {children}
    </button>
  )
}
```

### Advanced Patterns

**1. Portal-based Components (Dialog, Dropdown, Tooltip):**
```typescript
import { createPortal } from 'react-dom'
import { usePortalContainer } from '@/internal/usePortalContainer'

export const Dialog = ({ open, children }: DialogProps) => {
  const portalContainer = usePortalContainer()

  if (!open || !portalContainer) return null

  return createPortal(
    <div className={styles.dialog}>{children}</div>,
    portalContainer
  )
}
```

**2. forwardRef Support:**
```typescript
import { forwardRef } from 'react'

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ sekai, themeMode, ...rest }, ref) => {
    const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })

    return <input ref={ref} className={styles.input} {...rest} />
  }
)

TextField.displayName = 'TextField'
```

**3. Context-based Components (Dropdown):**
```typescript
const DropdownContext = createContext<DropdownContextType | null>(null)

export const Dropdown = ({ children }: DropdownProps) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      {children}
    </DropdownContext.Provider>
  )
}

export const DropdownTrigger = ({ children }: TriggerProps) => {
  const context = useContext(DropdownContext)
  // Use context...
}
```

---

## Styling System

### CSS Modules + SCSS

**File naming:** `ComponentName.module.scss`

**Import pattern:**
```typescript
import styles from './ComponentName.module.scss'

<div className={styles['component-name']} />
```

### Global Styles (`global.module.scss`)

**Z-Index Hierarchy:**
```scss
$overlay-z-index: 1000      // Backdrop overlays
$dropdown-z-index: 1100     // Dropdown menus
$scrolltop-z-index: 1150    // Scroll-to-top button
$drawer-z-index: 1200       // Side drawers
$tooltip-z-index: 1250      // Tooltips
$modal-z-index: 1300        // Dialogs/modals
```

**Utility Classes:**
```typescript
globalStyles['sekai-flex-center']        // display: flex; align/justify center
globalStyles['sekai-absolute-center']    // position: absolute; center with transform
globalStyles['sekai-invisible-scroll']   // Hide scrollbars
globalStyles['sekai-color-light']        // Light mode text color
globalStyles['sekai-color-dark']         // Dark mode text color
globalStyles['sekai-overlay-light']      // Light mode overlay
globalStyles['sekai-overlay-dark']       // Dark mode overlay
```

**Typography:**
```typescript
globalStyles['text-xs']       // 0.75rem
globalStyles['text-sm']       // 0.875rem
globalStyles['text-base']     // 1rem
globalStyles['text-lg']       // 1.125rem
globalStyles['text-xl']       // 1.25rem
globalStyles['text-2xl']      // 1.5rem
globalStyles['text-base-bold']  // Bold variants available
```

### Color System

**TypeScript colors (`colorsSekai`):**
```typescript
import { colorsSekai, COLORS_SEKAI_KEYS } from '@naru/untitled-ui-library'

// Access colors
colorsSekai.Miku        // '#33ccba'
colorsSekai.Leoneed     // '#3367cc'

// Type-safe keys
COLORS_SEKAI_KEYS.Miku
COLORS_SEKAI_KEYS.Nightcode
```

**CSS custom properties:**
```scss
// Available in any SCSS file after importing sekai-colors.css
.container {
  background-color: var(--sekai-miku);
  border-color: var(--sekai-leoneed);
}
```

**Runtime color injection:**
```typescript
const optionStyle = {
  '--sekai-color': sekaiColor,
  '--sekai-color-hover': convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3),
}

style={{ ...(optionStyle as React.CSSProperties), ...style }}
```

```scss
// In SCSS, access runtime variables
.button {
  background-color: var(--sekai-color);

  &:hover {
    background-color: var(--sekai-color-hover);
  }
}
```

### Color Conversion Utilities

```typescript
import {
  convertHexToRgb,
  convertHexToRgba,
  convertHexToRgbaMixWithBlackOrWhite
} from '@/utils/converter'

// hex → rgb
convertHexToRgb('#33ccba')  // 'rgb(51, 204, 186)'

// hex → rgba with alpha
convertHexToRgba('#33ccba', 0.5)  // 'rgba(51, 204, 186, 0.5)'

// Mix with black/white based on mode
convertHexToRgbaMixWithBlackOrWhite('#33ccba', 0.1, true)  // Light mode
```

---

## Code Conventions

### Naming Conventions

**Files:**
- Components: `PascalCase.tsx` (e.g., `BasicButton.tsx`)
- Hooks: `camelCase.ts` (e.g., `useLocalStorage.ts`)
- Utils: `camelCase.ts` (e.g., `converter.ts`)
- Directories: `kebab-case` (e.g., `text-field/`)

**Components:**
- Function names: `PascalCase` (e.g., `const BasicButton = () => {}`)
- Props interfaces: `{ComponentName}Props` (e.g., `BasicButtonProps`)
- Sub-components: `{Parent}{Child}` (e.g., `DialogTitleHeader`)

**CSS Classes:**
- Component classes: `kebab-case` (e.g., `.basic-button`)
- Global utilities: `sekai-*` prefix (e.g., `.sekai-flex-center`)
- Theme variants: `.sekai-color-light`, `.sekai-color-dark`

**Variables:**
- Constants: `UPPER_SNAKE_CASE` (e.g., `COLORS_SEKAI_KEYS`)
- Functions: `camelCase` (e.g., `convertHexToRgb`)
- React components: `PascalCase`

### TypeScript Conventions

**Strict mode enabled** - No implicit `any`, strict null checks, etc.

**Import Types:**
```typescript
// Prefer type-only imports for types
import type React from 'react'
import type { ColorsSekaiKey } from '@/styles/sekai-colors'

// Regular imports for values
import { colorsSekai } from '@/styles/sekai-colors'
```

**Type Utilities (from `@/utils/type`):**
```typescript
ValueOf<T>              // Union of object values
ArrayElement<T>         // Array element type
DeepPartial<T>          // Recursive partial
DeepRequired<T>         // Recursive required
PartialBy<T, K>         // Partial specific keys
RequiredBy<T, K>        // Required specific keys
```

**Props Definition:**
```typescript
// Always extend base HTML element props when applicable
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  sekai?: ColorsSekaiKey
  themeMode?: PaletteMode
}

// Use destructuring with ...rest
const Button = ({ sekai, themeMode, ...rest }: ButtonProps) => {
  return <button {...rest} />
}
```

### Import Order (ESLint enforced)

```typescript
// 1. React
import type React from 'react'
import { useState, useEffect } from 'react'

// 2. External libraries
import clsx from 'clsx'

// 3. @/ path alias imports
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import globalStyles from '@/styles/global.module.scss'

// 4. Relative imports
import { helper } from './helper'

// 5. Styles (always last)
import styles from './Component.module.scss'
```

---

## Important Patterns

### 1. Theme Provider Pattern

**Setup in app root:**
```typescript
import {
  YourSekaiProvider,
  createSekai,
  COLORS_SEKAI_KEYS,
  LIGHT_MODE
} from '@naru/untitled-ui-library'

const theme = createSekai({
  palette: {
    sekai: COLORS_SEKAI_KEYS.Miku,  // Required
    mode: LIGHT_MODE,                // Optional (default: LIGHT_MODE)
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif'  // Optional
  }
})

const App = ({ children }) => (
  <YourSekaiProvider
    sekaiTheme={theme}
    options={{
      disableStoreSekai: false,  // Save sekai to localStorage
      disableStoreTheme: false,  // Save mode to localStorage
    }}
  >
    {children}
  </YourSekaiProvider>
)
```

**Accessing theme:**
```typescript
import { useCreateSekai } from '@naru/untitled-ui-library'

const Component = () => {
  const { sekaiTheme, switchSekaiColor, switchColorTheme } = useCreateSekai()

  // Change color
  switchSekaiColor(COLORS_SEKAI_KEYS.Ichika)

  // Toggle light/dark mode
  switchColorTheme()
}
```

### 2. Color Resolution Hierarchy

Components resolve colors in this order:

1. **Explicit prop** - `<Button sekai={COLORS_SEKAI_KEYS.Miku} />`
2. **Provider context** - From `YourSekaiProvider`
3. **Default fallback** - Defined in `useOptionalSekai`

**Implementation:**
```typescript
const { sekaiColor, modeTheme, isLight } = useOptionalSekai({
  sekai,        // Explicit prop (highest priority)
  mode: themeMode
})
// If sekai is undefined, falls back to context, then default
```

### 3. Keyboard Event Handlers

**Utilities from `@/utils/operation`:**
```typescript
import { fireOnEnterKey, fireOnEscapeKey, fireOnSpaceKey } from '@/utils/operation'

<button
  onKeyDown={(e) => fireOnEnterKey(e, () => handleSubmit())}
/>

<dialog
  onKeyDown={(e) => fireOnEscapeKey(e, () => handleClose())}
/>
```

### 4. LocalStorage Persistence

**Using `useLocalStorage` hook:**
```typescript
import { useLocalStorage } from '@naru/untitled-ui-library'

const [value, setValue] = useLocalStorage('key', defaultValue)

// Auto-syncs across tabs
// Handles serialization/deserialization
// Type-safe
```

### 5. Responsive Hooks

```typescript
import { useWindowSize, useThemeMode } from '@naru/untitled-ui-library'

const { width, height } = useWindowSize()
const { isDark } = useThemeMode()
```

### 6. "use client" Directive (Next.js App Router)

**Automatic injection** - Rollup plugin adds `'use client'` to:
- All `/components/**/*.tsx`
- All `/hooks/**/*.ts`

**Do NOT manually add** - Build process handles it.

---

## Quality Standards

### ESLint Rules (Key Highlights)

**Enforced:**
- ✅ Cyclomatic complexity ≤ 8
- ✅ Max 150 lines per function
- ✅ No `console.log`, `debugger`, `alert`
- ✅ Prefer `const` over `let`
- ✅ Exhaustive dependency arrays in hooks
- ✅ No unused imports/variables
- ✅ Type-only imports for types
- ✅ Import ordering (react → @/ → relative → styles)
- ✅ Accessibility checks (jsx-a11y)

**Run before committing:**
```bash
npm run lint
```

### Prettier Configuration

- 2-space indentation
- Single quotes (except JSX uses double)
- 96 character line width
- No semicolons
- Trailing commas everywhere

### Accessibility Requirements

**Must follow:**
- ✅ Semantic HTML elements
- ✅ ARIA attributes where needed
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Color contrast (WCAG AA minimum)

**Checklist in PR template:**
- [ ] Accessibility check with axe DevTools

### Testing Standards

- Run `npm test` before committing
- Test in Storybook during development
- Deploy to dev environment for integration testing

---

## Common Tasks

### Adding a New Component

1. **Generate scaffold:**
   ```bash
   npm run plop
   # Enter folder: button
   # Enter component: NewButton
   ```

2. **Implement component:**
   - Follow standard component template
   - Use `useOptionalSekai` for theme
   - Add SCSS with CSS variables
   - Use global utilities where applicable

3. **Create Storybook story:**
   - Already generated at `stories/{folder}/{Component}.stories.tsx`
   - Add all variants and prop combinations
   - Include light/dark mode examples

4. **Update exports:**
   ```bash
   npm run generate-index
   ```

5. **Test:**
   ```bash
   npm run dev        # Test in Storybook
   npm run lint       # Check linting
   npm run build      # Ensure builds successfully
   ```

### Modifying Existing Components

1. **Read the component file first** (CRITICAL)
2. Make targeted changes (avoid over-engineering)
3. Update Storybook story if props changed
4. Run linting and build
5. Test all variants in Storybook

### Adding a New Hook

1. **Create file:** `src/hooks/useMyHook.ts`
2. **Implement with proper types:**
   ```typescript
   export const useMyHook = (param: string): ReturnType => {
     // Implementation
   }
   ```
3. **Update exports:** `npm run generate-index`
4. **Document usage** in component stories or README

### Adding a New Utility

1. **Create file:** `src/utils/myUtil.ts`
2. **Export functions with types:**
   ```typescript
   export const myUtil = (input: string): string => {
     // Implementation
   }
   ```
3. **Update exports:** `npm run generate-index`

### Updating Colors

1. **Edit:** `src/styles/sekai-colors.ts`
2. **Add new color:**
   ```typescript
   export const colorsSekai = {
     ...existing,
     NewCharacter: '#hexcode',
   } as const
   ```
3. **Build to regenerate CSS:**
   ```bash
   npm run build
   ```
4. **CSS custom property auto-generated:** `--sekai-new-character`

### Creating a Pull Request

**Follow PR template checklist:**
- [ ] Branch name describes work (e.g., `20250831_add_readme`)
- [ ] Build executed (`npm run build`)
- [ ] Dist folder updated
- [ ] Deployed and tested in dev environment
- [ ] Accessibility check with axe DevTools
- [ ] Impact assessment completed
- [ ] AI review conducted (Claude/ChatGPT)
- [ ] AI feedback addressed

**Commit message style:**
- Review `git log` for recent commit patterns
- Use concise, descriptive messages
- Focus on "why" not "what"

**Push to branch:**
```bash
git push -u origin your-branch-name
```

---

## Critical Rules

### ⚠️ NEVER

1. **Never modify `/dist` manually** - Always generated by build
2. **Never commit without linting** - `npm run lint` must pass
3. **Never skip build before PR** - Dist must be up-to-date
4. **Never add `'use client'` manually** - Rollup plugin handles it
5. **Never use `any` type** - Strict mode enabled
6. **Never ignore accessibility** - Required for all components
7. **Never skip Storybook testing** - Visual regression prevention
8. **Never commit with ESLint warnings** - Max warnings: 0
9. **Never modify auto-generated index files** - Python script regenerates
10. **Never break semantic versioning** - Follow version in package.json

### ✅ ALWAYS

1. **Always use `useOptionalSekai`** for themed components
2. **Always forward `...rest` props** to base elements
3. **Always use CSS Modules** for component styles
4. **Always use `clsx`** for conditional classes
5. **Always use type-only imports** for types
6. **Always follow import order** (ESLint enforced)
7. **Always use Plop** for new components
8. **Always run `generate-index`** after adding files
9. **Always test in Storybook** before committing
10. **Always check accessibility** with axe DevTools

### 🎯 Best Practices

1. **Prefer editing over creating** - Modify existing patterns
2. **Keep complexity low** - Cyclomatic complexity ≤ 8
3. **Functions under 150 lines** - Break into smaller functions
4. **Single responsibility** - One component, one purpose
5. **Composition over inheritance** - Use composition patterns
6. **Explicit over implicit** - Clear prop types, no magic
7. **Consistent naming** - Follow established conventions
8. **Document complex logic** - Add comments for "why"
9. **Type safety** - Leverage TypeScript fully
10. **Performance aware** - Memoize expensive operations

---

## Quick Reference

### File Paths

```
Components:    src/components/{folder}/{Component}.tsx
Hooks:         src/hooks/useHook.ts
Utils:         src/utils/util.ts
Styles:        src/styles/
Internal:      src/internal/ (not exported)
Stories:       stories/{folder}/{Component}.stories.tsx
Config:        .storybook/, rollup.config.js, tsconfig.json
Scripts:       scripts/generator.py, scripts/build_local.sh
```

### Commands

```bash
npm run dev              # Start Storybook (localhost:6006)
npm run build            # Full build (clean → index → rollup → tsc)
npm run lint             # ESLint with auto-fix
npm run prettier         # Format code
npm run plop             # Generate new component
npm run generate-index   # Regenerate index files
npm test                 # Run tests
npm run build-storybook  # Build Storybook static site
```

### Import Paths

```typescript
// Components
import { BasicButton } from '@naru/untitled-ui-library'

// Hooks
import { useLocalStorage, useCreateSekai } from '@naru/untitled-ui-library'

// Colors
import { colorsSekai, COLORS_SEKAI_KEYS } from '@naru/untitled-ui-library'

// Utils
import { convertHexToRgba } from '@naru/untitled-ui-library'

// Provider
import { YourSekaiProvider, createSekai } from '@naru/untitled-ui-library'

// CSS
import '@naru/untitled-ui-library/color/sekai-colors.css'
```

### Internal Imports (within src/)

```typescript
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import globalStyles from '@/styles/global.module.scss'
import styles from './Component.module.scss'
```

---

## Notes for AI Assistants

### Context Awareness

- **Project theme:** Project SEKAI (Hatsune Miku) fan project
- **Language:** Code/docs in English, PR template/README in Japanese
- **Target users:** React developers, Next.js apps
- **Maturity:** Production-ready, established patterns

### When Making Changes

1. **Read files first** - Never propose changes to unread code
2. **Follow patterns** - Match existing component structure
3. **Run tools** - Use Plop, generate-index, lint, build
4. **Test thoroughly** - Storybook, accessibility, build
5. **Update exports** - Always run `npm run generate-index`

### Common Mistakes to Avoid

- ❌ Creating new patterns instead of following existing ones
- ❌ Over-engineering simple components
- ❌ Skipping the build process
- ❌ Manually editing index files
- ❌ Adding files without updating exports
- ❌ Forgetting accessibility attributes
- ❌ Ignoring ESLint warnings

### When Uncertain

1. **Check Storybook** - See how existing components work
2. **Read similar components** - Follow established patterns
3. **Check global styles** - Utility classes might already exist
4. **Review recent commits** - Understand project conventions
5. **Ask user** - Clarify requirements before implementing

---

**Remember:** This is a well-structured, production-ready library with strong conventions. Follow established patterns, use provided tools, and maintain the quality standards. When in doubt, consistency with existing code is more valuable than innovation.

**End of CLAUDE.md**
