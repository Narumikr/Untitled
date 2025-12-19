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
import globalStyles from '@/styles/global.module.scss'
import styles from './ComponentName.module.scss'

export interface ComponentNameProps {
  sekai?: ColorsSekaiKey      // Theme color
  themeMode?: PaletteMode     // 'light' | 'dark'
  className?: string
  // ... component-specific props
}

export const ComponentName = ({ sekai, themeMode, className, ...rest }: ComponentNameProps) => {
  const { sekaiColor, modeTheme } = useOptionalSekai({ sekai, mode: themeMode })
  
  return (
    <div className={clsx(styles['component-name'], globalStyles[`sekai-color-${modeTheme}`], className)} {...rest}>
      {/* content */}
    </div>
  )
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

## Trust These Instructions

These instructions have been validated by:
1. Running full install from scratch
2. Testing all build commands with timing measurements
3. Verifying CI workflow steps
4. Testing clean builds after removing dist/
5. Validating all script paths and configurations

**If you encounter information not covered here or find errors, search the codebase to verify. Otherwise, trust and follow these instructions exactly.**
