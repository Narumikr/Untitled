# Styling System

## Global Styles (`global.module.scss`)

### Z-Index Hierarchy
```scss
$overlay-z-index: 1000      // Backdrop overlays
$dropdown-z-index: 1100     // Dropdown menus
$scrolltop-z-index: 1150    // Scroll-to-top button
$drawer-z-index: 1200       // Side drawers
$tooltip-z-index: 1250      // Tooltips
$modal-z-index: 1300        // Dialogs/modals
```

### Utility Classes
```typescript
globalStyles['sekai-flex-center']        // display: flex; align/justify center
globalStyles['sekai-absolute-center']    // position: absolute; center with transform
globalStyles['sekai-invisible-scroll']   // Hide scrollbars
globalStyles['sekai-color-light']        // Light mode text color
globalStyles['sekai-color-dark']         // Dark mode text color
globalStyles['sekai-overlay-light']      // Light mode overlay
globalStyles['sekai-overlay-dark']       // Dark mode overlay
```

### Typography
```typescript
globalStyles['text-xs']       // 0.75rem
globalStyles['text-sm']       // 0.875rem
globalStyles['text-base']     // 1rem
globalStyles['text-lg']       // 1.125rem
globalStyles['text-xl']       // 1.25rem
globalStyles['text-2xl']      // 1.5rem
globalStyles['text-base-bold']  // Bold variants available
```

---

## Color System

### TypeScript colors (`colorsSekai`)
```typescript
import { colorsSekai, COLORS_SEKAI_KEYS } from '@naru/untitled-ui-library'

// Access colors
colorsSekai.Miku        // '#33ccba'
colorsSekai.Leoneed     // '#3367cc'

// Type-safe keys
COLORS_SEKAI_KEYS.Miku
COLORS_SEKAI_KEYS.Nightcode
```

### CSS custom properties
```scss
// Available in any SCSS file after importing sekai-colors.css
.container {
  background-color: var(--sekai-miku);
  border-color: var(--sekai-leoneed);
}
```

### Runtime color injection
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

---

## Color Conversion Utilities

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

## Common Import Paths

### External usage (consumers of the library)
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

### Internal usage (within src/)
```typescript
import type { ColorsSekaiKey, PaletteMode } from '@/styles/sekai-colors'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { usePortalContainer } from '@/internal/usePortalContainer'
import { convertHexToRgba } from '@/utils/converter'
import { fireOnEnterKey } from '@/utils/operation'
import globalStyles from '@/styles/global.module.scss'
import styles from './Component.module.scss'
```

---

# スタイリングシステム（日本語版）

## グローバルスタイル（`global.module.scss`）

### Z-Index 階層
```scss
$overlay-z-index: 1000      // 背景オーバーレイ
$dropdown-z-index: 1100     // ドロップダウンメニュー
$scrolltop-z-index: 1150    // トップへ戻るボタン
$drawer-z-index: 1200       // サイドドロワー
$tooltip-z-index: 1250      // ツールチップ
$modal-z-index: 1300        // ダイアログ/モーダル
```

### ユーティリティクラス
```typescript
globalStyles['sekai-flex-center']        // display: flex; 中央揃え
globalStyles['sekai-absolute-center']    // position: absolute; transformで中央配置
globalStyles['sekai-invisible-scroll']   // スクロールバーを非表示
globalStyles['sekai-color-light']        // ライトモードのテキストカラー
globalStyles['sekai-color-dark']         // ダークモードのテキストカラー
globalStyles['sekai-overlay-light']      // ライトモードのオーバーレイ
globalStyles['sekai-overlay-dark']       // ダークモードのオーバーレイ
```

### タイポグラフィ
```typescript
globalStyles['text-xs']       // 0.75rem
globalStyles['text-sm']       // 0.875rem
globalStyles['text-base']     // 1rem
globalStyles['text-lg']       // 1.125rem
globalStyles['text-xl']       // 1.25rem
globalStyles['text-2xl']      // 1.5rem
globalStyles['text-base-bold']  // ボールド版も利用可能
```

---

## カラーシステム

### TypeScriptカラー（`colorsSekai`）
```typescript
import { colorsSekai, COLORS_SEKAI_KEYS } from '@naru/untitled-ui-library'

// カラーにアクセス
colorsSekai.Miku        // '#33ccba'
colorsSekai.Leoneed     // '#3367cc'

// 型安全なキー
COLORS_SEKAI_KEYS.Miku
COLORS_SEKAI_KEYS.Nightcode
```

### CSSカスタムプロパティ
```scss
// sekai-colors.cssをインポート後、任意のSCSSファイルで利用可能
.container {
  background-color: var(--sekai-miku);
  border-color: var(--sekai-leoneed);
}
```

### ランタイムカラー注入
```typescript
const optionStyle = {
  '--sekai-color': sekaiColor,
  '--sekai-color-hover': convertHexToRgba(sekaiColor, isLight ? 0.1 : 0.3),
}

style={{ ...(optionStyle as React.CSSProperties), ...style }}
```

```scss
// SCSSでランタイム変数にアクセス
.button {
  background-color: var(--sekai-color);

  &:hover {
    background-color: var(--sekai-color-hover);
  }
}
```

---

## カラー変換ユーティリティ

```typescript
import {
  convertHexToRgb,
  convertHexToRgba,
  convertHexToRgbaMixWithBlackOrWhite
} from '@/utils/converter'

// hex → rgb
convertHexToRgb('#33ccba')  // 'rgb(51, 204, 186)'

// hex → rgba（アルファ値付き）
convertHexToRgba('#33ccba', 0.5)  // 'rgba(51, 204, 186, 0.5)'

// モードに基づいて黒/白と混合
convertHexToRgbaMixWithBlackOrWhite('#33ccba', 0.1, true)  // ライトモード
```

---

## よく使うインポートパス

### 外部使用（ライブラリの利用者向け）
```typescript
// コンポーネント
import { BasicButton, Card, Dialog } from '@naru/untitled-ui-library'

// フック
import { useLocalStorage, useCreateSekai } from '@naru/untitled-ui-library'

// カラー
import { colorsSekai, COLORS_SEKAI_KEYS } from '@naru/untitled-ui-library'

// ユーティリティ
import { convertHexToRgba } from '@naru/untitled-ui-library'

// プロバイダー & テーマ
import { YourSekaiProvider, createSekai, LIGHT_MODE, DARK_MODE } from '@naru/untitled-ui-library'

// CSS
import '@naru/untitled-ui-library/color/sekai-colors.css'
```

### 内部使用（src/内）
```typescript
import type { ColorsSekaiKey, PaletteMode } from '@/styles/sekai-colors'
import { useOptionalSekai } from '@/internal/useOptionalSekai'
import { usePortalContainer } from '@/internal/usePortalContainer'
import { convertHexToRgba } from '@/utils/converter'
import { fireOnEnterKey } from '@/utils/operation'
import globalStyles from '@/styles/global.module.scss'
import styles from './Component.module.scss'
```
