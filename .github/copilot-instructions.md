# Copilot Instructions for Untitled UI Library

## Project Overview

**What is this?** A TypeScript React component library inspired by Project SEKAI (Hatsune Miku rhythm game), providing 40+ themed UI components with dynamic color system and light/dark mode support. This is a production-ready library distributed via GitHub releases.

**Tech Stack:**
- React 18 + TypeScript (strict mode enabled)
- SCSS + CSS Modules (scoped component styling)
- Rollup (dual ESM/CJS bundling with type declarations)
- Storybook (component documentation and development)
- Jest + React Testing Library
- Python 3.12+ (for code generation scripts)

**Key Characteristics:**
- ~75 TypeScript/TSX files in `src/`
- 22 component categories (button, card, dialog, dropdown, etc.)
- 40+ character/unit color constants from Project SEKAI
- Next.js App Router compatible ('use client' directives auto-injected)
- ~1.6MB dist output (ESM + CJS + types + CSS)

---

## Build & Validation Commands

### Environment Requirements
- **Node.js:** v20.x (verified with v20.19.6)
- **npm:** 10.x (verified with v10.8.2)
- **Python:** 3.12+ (for scripts/generator.py)

### ALWAYS run these commands in this exact order:

#### 1. Install Dependencies (REQUIRED FIRST)
```bash
npm install
```
**Time:** ~20 seconds  
**Notes:** MUST be run before any other command. Re-run if package.json changes.

#### 2. Generate Index Files (REQUIRED before build)
```bash
npm run generate-index
```
**Time:** <1 second  
**What it does:** Python script auto-generates `src/components/index.ts`, `src/hooks/index.ts`, `src/utils/index.ts`  
**CRITICAL:** Run this EVERY time you add/remove/rename files in src/components, src/hooks, or src/utils  
**Never edit:** `src/**/index.ts` files manually - they are auto-generated

#### 3. Lint Code
```bash
npm run lint
```
**Time:** ~3 seconds  
**Auto-fixes:** Import order, unused imports, formatting  
**Must pass:** 0 warnings (--max-warnings=0)  
**ALWAYS:** Run before committing

#### 4. Run Tests
```bash
npm test
```
**Time:** ~3 seconds (3 test suites, 148 tests)  
**Coverage:** Tests located in `test/` directory  
**Mock setup:** `test/setupTests.ts` configures JSDOM, matchMedia, RAF

#### 5. Full Build
```bash
npm run build
```
**Time:** ~60-90 seconds  
**What it does:**
1. `npm run clean` - removes dist/ folder
2. `npm run generate-index` - regenerates index files
3. `npm run build:bundle` - Rollup bundles to dist/cjs, dist/esm
4. `npm run build:typecheck` - TypeScript type checking (no emit)
5. `npm run build:package-json` - generates dist/package.json
6. `npm run build:local` - creates .tgz in local_publish/

**Output structure:**
```
dist/
├── cjs/          # CommonJS modules (~780KB)
├── esm/          # ES modules (~776KB)
├── color/        # sekai-colors.css
├── index.d.ts    # TypeScript declarations (~36KB)
└── package.json  # Distribution package.json
```

**CRITICAL:** Always run `npm run build` before pushing to ensure dist/ is up-to-date

---

## Project Layout & Architecture

### Source Code Structure
```
src/
├── components/       # 22 component folders (button/, card/, dialog/, etc.)
│   ├── {folder}/
│   │   ├── Component.tsx         # Component implementation
│   │   └── Component.module.scss # Scoped CSS Module
│   └── index.ts      # AUTO-GENERATED - do not edit manually
├── hooks/            # Custom React hooks (useCreateSekai, useLocalStorage, etc.)
│   └── index.ts      # AUTO-GENERATED
├── utils/            # Utilities (converter, operation, createSekai, etc.)
│   └── index.ts      # AUTO-GENERATED
├── internal/         # NOT exported publicly (useOptionalSekai, usePortalContainer)
├── styles/           # Global styles, color system
│   ├── global.module.scss  # Utility classes, z-index, typography
│   ├── sekai-colors.ts     # TypeScript color constants
│   └── sekai-colors.css    # CSS custom properties
├── img/              # SVG assets (auto-imported as React components)
└── index.ts          # Main entry point (exports all public APIs)
```

### Key Configuration Files
- **package.json** - Scripts, dependencies, export paths
- **tsconfig.json** - TypeScript config (strict mode, @/ alias to src/)
- **tsconfig.build.json** - Build-specific TS config
- **rollup.config.js** - Bundling config (ESM/CJS, 'use client' injection)
- **eslint.config.mjs** - ESLint rules (complexity ≤8, max 150 lines/function)
- **.prettierrc.json** - Prettier config (single quotes, 96 char width, no semicolons)
- **jest.config.js** - Jest test config
- **plopfile.js** - Component generator config

### Scripts Directory
- **scripts/generator.py** - Auto-generates index.ts files (Python 3.12+)
- **scripts/build_local.sh** - Creates local npm package (.tgz)
- **scripts/build-package-json.py** - Generates dist/package.json

---

## CI/CD & Validation Pipeline

### GitHub Actions Workflow
- **File:** `.github/workflows/eslint.yml`
- **Triggers:** On PR open/sync/reopen
- **Runner:** ubuntu-latest, Node 20
- **Timeout:** 3 minutes
- **Steps:**
  1. Checkout code
  2. Setup Node.js 20
  3. `npm install`
  4. `npm run lint` (must pass with 0 warnings)

**To replicate CI locally:**
```bash
npm install
npm run lint
```

### Pre-commit Checklist
Before pushing any changes:
1. ✅ Run `npm run lint` (must pass)
2. ✅ Run `npm test` (all tests pass)
3. ✅ Run `npm run build` (builds successfully)
4. ✅ Verify dist/ folder updated
5. ✅ Check accessibility with axe DevTools (if UI changes)

---

## Common Tasks & Workflows

### Adding a New Component
```bash
# 1. Generate scaffold
npm run plop
# Prompts: folder name (kebab-case), component name (PascalCase)

# 2. Implement component in src/components/{folder}/{Component}.tsx
# 3. Add styles to src/components/{folder}/{Component}.module.scss
# 4. Update story in stories/{folder}/{Component}.stories.tsx

# 5. REQUIRED: Update exports
npm run generate-index

# 6. Test in Storybook
npm run dev  # Opens http://localhost:6006

# 7. Lint and build
npm run lint
npm run build
```

### Modifying Existing Code
```bash
# 1. Make changes to source files
# 2. If you added/removed/renamed files in src/components, src/hooks, or src/utils:
npm run generate-index

# 3. Lint and fix
npm run lint

# 4. Run tests
npm test

# 5. Build to verify
npm run build
```

### Adding a New Hook or Utility
```bash
# 1. Create file in src/hooks/ or src/utils/
# 2. REQUIRED: Update exports
npm run generate-index

# 3. Lint and build
npm run lint
npm run build
```

---

## Critical Rules & Conventions

### ⚠️ NEVER DO THIS
1. **Never modify dist/ manually** - Always auto-generated by build
2. **Never edit src/**/index.ts manually** - Auto-generated by Python script
3. **Never add 'use client' directive manually** - Rollup plugin injects it
4. **Never skip `npm run generate-index`** - After adding/removing files
5. **Never commit with lint warnings** - CI will fail
6. **Never skip build before PR** - dist/ must be current
7. **Never use `any` type** - Strict TypeScript mode enabled
8. **Never ignore ESLint errors** - max-warnings=0 enforced

### ✅ ALWAYS DO THIS
1. **Always run `npm install` first** - Before any other command
2. **Always run `npm run generate-index`** - After file changes
3. **Always run `npm run lint`** - Before committing
4. **Always run `npm run build`** - Before pushing
5. **Always use Plop** - For new components (`npm run plop`)
6. **Always follow import order** - ESLint enforces: React → external → @/ → relative → styles
7. **Always use CSS Modules** - Component.module.scss pattern
8. **Always use `useOptionalSekai`** - For themed components
9. **Always extend base HTML props** - When creating wrapper components
10. **Always forward `...rest` props** - To underlying elements

### Component Architecture Pattern
Every component MUST follow this structure:
```typescript
import type React from 'react'
import clsx from 'clsx'
import type { ColorsSekaiKey, PaletteMode } from '@/styles/sekai-colors'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba } from '@/utils/converter'
import globalStyles from '@/styles/global.module.scss'
import styles from './ComponentName.module.scss'

export interface ComponentNameProps {
  sekai?: ColorsSekaiKey      // Theme color
  themeMode?: PaletteMode     // 'light' | 'dark'
  id?: string
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  // ... component-specific props
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
    <div
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
    </div>
  )
}
```

### Advanced Component Patterns

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

### Import Order (ESLint enforced)
```typescript
// 1. React imports
import type React from 'react'
import { useState } from 'react'

// 2. External libraries
import clsx from 'clsx'

// 3. @/ path alias imports
import type { ColorsSekaiKey } from '@/styles/sekai-colors'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import globalStyles from '@/styles/global.module.scss'

// 4. Relative imports
import { helper } from './helper'

// 5. Styles (ALWAYS LAST)
import styles from './Component.module.scss'
```

### ESLint Rules Enforced
- Cyclomatic complexity ≤ 8
- Max 150 lines per function
- No console.log, debugger, alert
- Prefer const over let
- Exhaustive dependency arrays in hooks
- No unused imports/variables
- Type-only imports for types (`import type`)
- jsx-a11y accessibility checks

---

## Styling System

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

### TypeScript Conventions

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

### Code Review Guidelines

**Language & Format:**
1. **Always write reviews in Japanese** - All review comments and feedback must be in Japanese
2. **Provide specific code examples** - Include concrete code improvement suggestions with actual code snippets showing the recommended changes

**Required Code Review Checklist:**

**1. Naming Conventions**
- ✅ No spelling mistakes in variable/function/class names
- ✅ No confusion between singular and plural forms (e.g., `items` vs `item`)
- ✅ Consistent naming (no different names for the same concept)
- ✅ Follows project naming conventions (PascalCase, camelCase, kebab-case, UPPER_SNAKE_CASE)

**2. Code Quality**
- ✅ No magic numbers - use named constants instead
- ✅ Use early returns to avoid unnecessary nesting
  ```typescript
  // ❌ Bad
  if (condition) {
    // long process...
  } else {
    return
  }

  // ✅ Good
  if (!condition) return
  // long process...
  ```
- ✅ No unnecessary API calls or inefficient processing in loops
- ✅ No code duplication - follow DRY (Don't Repeat Yourself) principle

**3. Comments**
- ✅ Comments are appropriate and up-to-date (no outdated or misleading comments)
- ✅ Complex logic has comments explaining "why" (not just "what")
- ✅ No unnecessary commented-out code left in the codebase

**4. Storybook Stories**
- ✅ All props are defined in `argTypes`
- ✅ Each prop has an appropriate `description`
- ✅ Each prop has a `type` specification
- ✅ Required props have `table: { type: { required: true } }` declaration
  ```typescript
  argTypes: {
    sekai: {
      description: 'What SEKAI color to use',
      control: 'select',
      options: Object.keys(COLORS_SEKAI_KEYS),
      table: {
        type: { summary: 'ColorsSekaiKey' },
      },
    },
    children: {
      description: 'Children contents',
      table: {
        type: { summary: 'React.ReactNode', required: true },
      },
    },
  }
  ```

**5. TypeScript Type Definitions**
- ✅ No use of `any` type (strict mode enforced)
- ✅ Proper type annotations present
- ✅ No excessive use of type assertions
- ✅ Props interfaces properly extend base HTML element properties when applicable

**6. Performance**
- ✅ No unnecessary re-renders
- ✅ Appropriate use of `useMemo`/`useCallback` for expensive computations
- ✅ Dependency arrays are correctly specified (no ignored ESLint warnings)

**7. Accessibility**
- ✅ Uses semantic HTML elements
- ✅ Necessary ARIA attributes are set
- ✅ Keyboard navigation is supported
- ✅ Focus management is properly handled

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

## Troubleshooting & Common Issues

### Build Fails with "Cannot find module"
**Solution:** Run `npm run generate-index` then rebuild

### ESLint Errors on Import Order
**Solution:** Run `npm run lint` to auto-fix

### TypeScript Errors After Adding Files
**Solution:** Run `npm run generate-index` to update exports

### Tests Fail with Module Resolution Errors
**Check:** jest.config.js has correct moduleNameMapper for @/ alias

### Rollup Build Takes >2 Minutes
**Normal:** Full build takes 60-90 seconds on first run

### Python Script Fails
**Check:** Python 3.12+ installed (`python --version`)

### dist/ Folder Missing After Clean
**Expected:** Run `npm run build` to regenerate

---

## Best Practices

1. **Prefer editing over creating** - Modify existing patterns instead of creating new ones
2. **Keep complexity low** - Cyclomatic complexity ≤ 8 (ESLint enforced)
3. **Functions under 150 lines** - Break into smaller functions if needed
4. **Single responsibility** - One component, one purpose
5. **Composition over inheritance** - Use composition patterns
6. **Explicit over implicit** - Clear prop types, no magic values
7. **Consistent naming** - Follow established conventions (see CLAUDE.md)
8. **Document complex logic** - Add comments explaining "why", not "what"
9. **Type safety** - Leverage TypeScript fully, avoid `any`
10. **Performance aware** - Memoize expensive operations when needed

### Naming Conventions Summary

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

---

## Notes for AI Assistants

### Context Awareness

- **Project theme:** Project SEKAI (Hatsune Miku) fan project
- **Language:** Code/docs in English, PR template/README in Japanese
- **Target users:** React developers, Next.js apps
- **Maturity:** Production-ready library with established patterns

### When Making Changes

1. **Read files first** - NEVER propose changes to unread code
2. **Follow patterns** - Match existing component structure exactly
3. **Run tools** - Use Plop for new components, generate-index after file changes
4. **Test thoroughly** - Storybook, accessibility (axe DevTools), build
5. **Update exports** - ALWAYS run `npm run generate-index` after adding/removing files

### Common Mistakes to Avoid

- ❌ Creating new patterns instead of following existing ones
- ❌ Over-engineering simple components
- ❌ Skipping the build process before committing
- ❌ Manually editing index files (auto-generated by Python script)
- ❌ Adding files without running `npm run generate-index`
- ❌ Forgetting accessibility attributes (required for all components)
- ❌ Ignoring ESLint warnings (max-warnings=0 enforced)
- ❌ Adding `'use client'` directive manually (Rollup handles it)

### When Uncertain

1. **Check Storybook** - See how existing components work (http://localhost:6006)
2. **Read similar components** - Follow established patterns in codebase
3. **Check global styles** - Utility classes might already exist
4. **Review recent commits** - Understand project conventions (`git log`)
5. **Refer to CLAUDE.md** - Comprehensive guide with detailed examples

### Critical Reminders

- This is a **production-ready library** with strong conventions
- **Consistency** with existing code is more valuable than innovation
- Follow established patterns, use provided tools, maintain quality standards
- When in doubt, **read existing code** and **match its style**

---

## Additional Context

### Path Aliases
- `@/` maps to `src/` (configured in tsconfig.json, jest.config.js, rollup.config.js, .storybook/main.ts)

### Auto-Generated Files
These files are managed by scripts - DO NOT EDIT:
- `src/components/index.ts`
- `src/hooks/index.ts`
- `src/utils/index.ts`
- `dist/**/*`

### Code Generation
- **Plop templates:** `plop-templates/*.hbs`
- **Component generator:** `npm run plop` → Creates .tsx, .module.scss, .stories.tsx

### Testing
- Jest with jsdom environment
- React Testing Library
- Setup in `test/setupTests.ts` (mocks RAF, matchMedia, scroll properties)

### Storybook
- Development: `npm run dev` (port 6006)
- Build static: `npm run build-storybook`
- Stories in `stories/` directory

### Prettier
- Auto-formats on save (VS Code: .vscode/settings.json)
- Manual: `npm run prettier`
- Config: 2-space indent, single quotes (except JSX), 96 char width, no semicolons

---

## Quick Reference

### Essential Commands
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

### Common Import Paths

**External usage (consumers of the library):**
```typescript
// Components
import { BasicButton, Card, Dialog } from '@naru/untitled-ui-library'

// Hooks
import { useLocalStorage, useCreateSekai } from '@naru/untitled-ui-library'

// Colors
import { colorsSekai, COLORS_SEKAI_KEYS } from '@naru/untitled-ui-library'

// Utils
import { convertHexToRgba } from '@naru/untitled-ui-library'

// Provider & Theme
import { YourSekaiProvider, createSekai, LIGHT_MODE, DARK_MODE } from '@naru/untitled-ui-library'

// CSS
import '@naru/untitled-ui-library/color/sekai-colors.css'
```

**Internal usage (within src/):**
```typescript
import type { ColorsSekaiKey, PaletteMode } from '@/styles/sekai-colors'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { usePortalContainer } from '@/internal/usePortalContainer'
import { convertHexToRgba } from '@/utils/converter'
import { fireOnEnterKey } from '@/utils/operation'
import globalStyles from '@/styles/global.module.scss'
import styles from './Component.module.scss'
```

### File Path Patterns
```
Components:    src/components/{folder}/{Component}.tsx
Hooks:         src/hooks/useHook.ts
Utils:         src/utils/util.ts
Styles:        src/styles/
Internal:      src/internal/ (not exported publicly)
Stories:       stories/{folder}/{Component}.stories.tsx
Config:        .storybook/, rollup.config.js, tsconfig.json
Scripts:       scripts/generator.py, scripts/build_local.sh
```

---

## Trust These Instructions

These instructions have been validated by:
1. Running full install from scratch
2. Testing all build commands with timing measurements
3. Verifying CI workflow steps
4. Testing clean builds after removing dist/
5. Validating all script paths and configurations

**If you encounter information not covered here or find errors, search the codebase to verify. Otherwise, trust and follow these instructions exactly.**

**For comprehensive details, see [CLAUDE.md](../CLAUDE.md)**
