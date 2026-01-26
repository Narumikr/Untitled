# Component Architecture & Patterns

## Standard Component Template

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

---

## Advanced Component Patterns

### 1. Portal-based Components (Dialog, Dropdown, Tooltip)
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

### 2. forwardRef Support
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

### 3. Context-based Components (Dropdown)
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

# コンポーネントアーキテクチャ & パターン（日本語版）

## 標準コンポーネントテンプレート

すべてのコンポーネントはこの構造に従う必要があります：
```typescript
import type React from 'react'
import clsx from 'clsx'
import type { ColorsSekaiKey, PaletteMode } from '@/styles/sekai-colors'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { convertHexToRgba } from '@/utils/converter'
import globalStyles from '@/styles/global.module.scss'
import styles from './ComponentName.module.scss'

export interface ComponentNameProps {
  sekai?: ColorsSekaiKey      // テーマカラー
  themeMode?: PaletteMode     // 'light' | 'dark'
  id?: string
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  // ... コンポーネント固有のプロパティ
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
  // 1. テーマ解決（すべてのテーマ対応コンポーネントで必須）
  const { sekaiColor, modeTheme, isLight } = useOptionalSekai({
    sekai,
    mode: themeMode
  })

  // 2. 動的テーマ用のCSS変数
  const optionStyle = {
    '--sekai-color': sekaiColor,
    '--sekai-color-hover': convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3),
  }

  // 3. 適切なクラス合成でレンダリング
  return (
    <div
      id={id}
      className={clsx(
        styles['component-name'],                    // コンポーネントスタイル
        globalStyles[`sekai-color-${modeTheme}`],    // グローバルテーマ
        className,                                    // ユーザーのclassName
      )}
      style={{ ...(optionStyle as React.CSSProperties), ...style }}
      {...rest}
    >
      {children}
    </div>
  )
}
```

---

## 高度なコンポーネントパターン

### 1. Portal ベースのコンポーネント（Dialog、Dropdown、Tooltip）
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

### 2. forwardRef サポート
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

### 3. Context ベースのコンポーネント（Dropdown）
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
  // contextを使用...
}
```

---

## 重要なパターン

### 1. テーマプロバイダーパターン

**アプリのルートでセットアップ:**
```typescript
import {
  YourSekaiProvider,
  createSekai,
  COLORS_SEKAI_KEYS,
  LIGHT_MODE
} from '@naru/untitled-ui-library'

const theme = createSekai({
  palette: {
    sekai: COLORS_SEKAI_KEYS.Miku,  // 必須
    mode: LIGHT_MODE,                // オプション（デフォルト: LIGHT_MODE）
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif'  // オプション
  }
})

const App = ({ children }) => (
  <YourSekaiProvider
    sekaiTheme={theme}
    options={{
      disableStoreSekai: false,  // sekaiをlocalStorageに保存
      disableStoreTheme: false,  // modeをlocalStorageに保存
    }}
  >
    {children}
  </YourSekaiProvider>
)
```

**テーマへのアクセス:**
```typescript
import { useCreateSekai } from '@naru/untitled-ui-library'

const Component = () => {
  const { sekaiTheme, switchSekaiColor, switchColorTheme } = useCreateSekai()

  // カラーを変更
  switchSekaiColor(COLORS_SEKAI_KEYS.Ichika)

  // ライト/ダークモードを切り替え
  switchColorTheme()
}
```

### 2. カラー解決の優先順位

コンポーネントは以下の順序でカラーを解決します：

1. **明示的なプロパティ** - `<Button sekai={COLORS_SEKAI_KEYS.Miku} />`
2. **プロバイダーコンテキスト** - `YourSekaiProvider`から
3. **デフォルトフォールバック** - `useOptionalSekai`で定義

**実装:**
```typescript
const { sekaiColor, modeTheme, isLight } = useOptionalSekai({
  sekai,        // 明示的なプロパティ（最優先）
  mode: themeMode
})
// sekaiがundefinedの場合、コンテキスト、次にデフォルトにフォールバック
```

### 3. キーボードイベントハンドラー

**`@/utils/operation`からのユーティリティ:**
```typescript
import { fireOnEnterKey, fireOnEscapeKey, fireOnSpaceKey } from '@/utils/operation'

<button
  onKeyDown={(e) => fireOnEnterKey(e, () => handleSubmit())}
/>

<dialog
  onKeyDown={(e) => fireOnEscapeKey(e, () => handleClose())}
/>
```

### 4. LocalStorage永続化

**`useLocalStorage`フックの使用:**
```typescript
import { useLocalStorage } from '@naru/untitled-ui-library'

const [value, setValue] = useLocalStorage('key', defaultValue)

// タブ間で自動同期
// シリアライズ/デシリアライズを処理
// 型安全
```

### 5. レスポンシブフック

```typescript
import { useWindowSize, useThemeMode } from '@naru/untitled-ui-library'

const { width, height } = useWindowSize()
const { isDark } = useThemeMode()
```

### 6. "use client" ディレクティブ（Next.js App Router）

**自動注入** - Rollupプラグインが`'use client'`を追加:
- すべての`/components/**/*.tsx`
- すべての`/hooks/**/*.ts`

**手動で追加しないでください** - ビルドプロセスが処理します。
