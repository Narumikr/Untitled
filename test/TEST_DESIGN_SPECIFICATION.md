# テスト設計仕様書 / Test Design Specification

> **Last Updated:** 2025-12-18
> **Project:** @naru/untitled-ui-library
> **Version:** 1.2.0

このドキュメントは、Untitled UI Libraryのコンポーネントテストを作成する際の標準的なガイドラインと設計仕様を提供します。

---

## 📋 目次

1. [テスト設計の目的](#テスト設計の目的)
2. [テストフレームワーク構成](#テストフレームワーク構成)
3. [テストファイル構造](#テストファイル構造)
4. [テストカテゴリ](#テストカテゴリ)
5. [テストケース設計原則](#テストケース設計原則)
6. [モックとスタブ](#モックとスタブ)
7. [カバレッジ目標](#カバレッジ目標)
8. [テンプレート](#テンプレート)
9. [ベストプラクティス](#ベストプラクティス)
10. [継続的改善](#継続的改善)

---

## テスト設計の目的

### 主要目標
- **品質保証**: コンポーネントが仕様通りに動作することを保証
- **リグレッション防止**: コード変更による既存機能の破壊を防ぐ
- **ドキュメント**: テストコードが仕様書としても機能
- **リファクタリング支援**: 安全なコード変更を可能にする

### カバレッジ目標
```
Statements   : 90%以上
Branches     : 75%以上
Functions    : 85%以上
Lines        : 90%以上
```

現在の達成状況:
```
Statements   : 91.45% ✓
Branches     : 80.64% ✓
Functions    : 88.88% ✓
Lines        : 94% ✓
```

---

## テストフレームワーク構成

### 使用技術スタック
```json
{
  "testRunner": "Jest 30.2.0",
  "testingLibrary": "@testing-library/react 16.3.0",
  "userInteraction": "@testing-library/user-event 14.6.1",
  "assertions": "@testing-library/jest-dom 6.9.1",
  "environment": "jsdom",
  "typescript": "ts-jest 29.4.6"
}
```

### Jest設定 (`jest.config.js`)
```javascript
{
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/test'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleNameMapper: {
    '\\.(svg)$': '<rootDir>/test/__mocks__/svgMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
```

---

## テストファイル構造

### ディレクトリ構成
```
test/
├── components/
│   ├── accordion/
│   │   └── accordion.test.tsx
│   ├── backdrop/
│   │   └── backdrop.test.tsx
│   ├── breadcrumb/
│   │   └── breadcrumb.test.tsx
│   └── [component-name]/
│       └── [component-name].test.tsx
├── __mocks__/
│   └── svgMock.js
├── setupTests.ts
└── TEST_DESIGN_SPECIFICATION.md (このファイル)
```

### ファイル命名規則
- テストファイル: `[component-name].test.tsx`
- コンポーネント名と同じ (ケバブケース)
- 拡張子: `.test.tsx` (`.spec.tsx` も可能だが `.test.tsx` を推奨)

---

## テストカテゴリ

### 必須テストカテゴリ

すべてのコンポーネントテストは、以下のカテゴリを含める必要があります:

#### 1. **Rendering** (レンダリング)
コンポーネントが正しくレンダリングされることを確認

```typescript
describe('Rendering', () => {
  it('should render without crashing', () => {
    render(<Component {...defaultProps} />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('should render with custom id', () => {
    render(<Component {...defaultProps} id="custom-id" />)
    const element = screen.getByText('Expected Text').closest('div')
    expect(element).toHaveAttribute('id', 'custom-id')
  })

  it('should render with custom className', () => {
    render(<Component {...defaultProps} className="custom-class" />)
    const element = screen.getByText('Expected Text').closest('div')
    expect(element).toHaveClass('custom-class')
  })

  it('should render with custom styles', () => {
    const customStyle = { backgroundColor: 'red' }
    render(<Component {...defaultProps} style={customStyle} />)
    const element = screen.getByText('Expected Text').closest('div')
    expect(element).toHaveStyle('background-color: rgb(255, 0, 0)')
  })
})
```

**テストケース例:**
- ✓ クラッシュせずにレンダリングされる
- ✓ カスタムIDが適用される
- ✓ カスタムclassNameが適用される
- ✓ カスタムスタイルが適用される
- ✓ 子要素が正しくレンダリングされる

#### 2. **Component-Specific Functionality** (コンポーネント固有の機能)
各コンポーネント特有の機能をテスト

```typescript
describe('Toggle Functionality', () => {
  it('should toggle state when clicked', async () => {
    const user = userEvent.setup()
    render(<Accordion {...defaultProps} />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })
})
```

**実装内容:**
- コンポーネントの主要機能（開閉、選択、入力など）
- 状態変化
- ユーザーインタラクション
- 条件付きレンダリング

#### 3. **Props Variants** (Props のバリエーション)
すべてのpropsの組み合わせをテスト

```typescript
describe('Separator Variants', () => {
  it('should render with default slash separator', () => {
    const { container } = render(<Breadcrumb {...defaultProps} />)
    const separators = container.querySelectorAll('[class*="separator"]')
    expect(separators[0].textContent).toBe('/')
  })

  it('should render with arrow separator', () => {
    const { container } = render(<Breadcrumb {...defaultProps} separator="arrow" />)
    const separators = container.querySelectorAll('[class*="separator"]')
    expect(separators[0].textContent).toBe('→')
  })
})
```

**テストすべきProps:**
- すべての列挙型 (enum) の値
- boolean propsの true/false
- オプショナルpropsの有無
- デフォルト値

#### 4. **Theme Integration** (テーマ統合)
Sekai テーマシステムとの統合をテスト

```typescript
describe('Theme Integration', () => {
  it('should apply sekai color CSS variables', () => {
    const { container } = render(<Component {...defaultProps} sekai="Miku" />)
    const element = container.firstChild as HTMLElement
    expect(element).toHaveStyle({
      '--sekai-color': '#33ccba',
    })
  })

  it('should apply light theme mode class', () => {
    const { container } = render(<Component {...defaultProps} themeMode="light" />)
    const element = container.querySelector('[class*="sekai-color-light"]')
    expect(element).toBeTruthy()
  })

  it('should apply dark theme mode class', () => {
    const useOptionalSekai = require('@/internal/useOptionalSekai').useOptionalSekai
    useOptionalSekai.mockReturnValue({
      sekaiColor: '#33ccba',
      modeTheme: 'dark',
      isLight: false,
    })

    const { container } = render(<Component {...defaultProps} themeMode="dark" />)
    const element = container.querySelector('[class*="sekai-color-dark"]')
    expect(element).toBeTruthy()
  })
})
```

**テスト項目:**
- sekai color の適用
- theme mode (light/dark) の適用
- CSS カスタムプロパティの設定
- useOptionalSekai との統合

#### 5. **Custom Styling** (カスタムスタイリング)
カスタムスタイルの適用をテスト

```typescript
describe('Custom Styling', () => {
  it('should merge custom className with default classes', () => {
    const { container } = render(<Component {...defaultProps} className="custom" />)
    const element = container.querySelector('.custom')
    expect(element).toBeTruthy()
    expect(element?.className).toContain('sekai-component')
  })

  it('should merge custom styles with option styles', () => {
    const customStyle = { padding: '20px', margin: '10px' }
    const { container } = render(<Component {...defaultProps} style={customStyle} />)
    const element = container.querySelector('[style*="padding"]')
    expect(element).toHaveStyle({
      padding: '20px',
      margin: '10px',
    })
  })
})
```

**テスト項目:**
- カスタム className の適用
- カスタム style の適用
- デフォルトスタイルとの統合
- CSS変数との共存

#### 6. **Accessibility** (アクセシビリティ)
WCAG基準に準拠したアクセシビリティをテスト

```typescript
describe('Accessibility', () => {
  it('should have proper ARIA attributes', () => {
    render(<Component {...defaultProps} />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded')
    expect(button).toHaveAttribute('aria-controls')
  })

  it('should be keyboard accessible', async () => {
    const user = userEvent.setup()
    render(<Component {...defaultProps} />)

    const button = screen.getByRole('button')
    await user.tab()
    expect(button).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('should support Space key', async () => {
    const user = userEvent.setup()
    render(<Component {...defaultProps} />)

    const button = screen.getByRole('button')
    await user.tab()
    await user.keyboard(' ')
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })
})
```

**必須テスト項目:**
- セマンティックHTML要素の使用
- ARIA属性 (role, aria-label, aria-expanded, etc.)
- キーボードナビゲーション (Tab, Enter, Space, Escape)
- フォーカス管理
- スクリーンリーダー対応

#### 7. **Edge Cases** (エッジケース)
境界値や特殊なケースをテスト

```typescript
describe('Edge Cases', () => {
  it('should handle empty string', () => {
    render(<Component {...defaultProps} details="" />)
    const element = screen.getByRole('region')
    expect(element).toBeInTheDocument()
  })

  it('should handle null children', () => {
    render(<Component {...defaultProps} children={null} />)
    expect(screen.queryByRole('region')).toBeInTheDocument()
  })

  it('should handle undefined props', () => {
    render(<Component {...defaultProps} details={undefined} />)
    const element = screen.getByRole('region')
    expect(element).toBeInTheDocument()
  })

  it('should handle very long content', () => {
    const longText = 'A'.repeat(1000)
    render(<Component {...defaultProps} details={longText} />)
    expect(screen.getByText(longText)).toBeInTheDocument()
  })
})
```

**テストケース例:**
- 空文字列
- null/undefined
- 空配列
- 非常に長いコンテンツ
- 特殊文字
- 無効な型 (型安全性のテスト)

#### 8. **Integration Tests** (統合テスト)
複数の機能を組み合わせたテスト

```typescript
describe('Integration Tests', () => {
  it('should maintain state across re-renders', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<Component {...defaultProps} />)

    const button = screen.getByRole('button')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')

    rerender(<Component {...defaultProps} />)
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('should handle rapid interactions', async () => {
    const user = userEvent.setup()
    render(<Component {...defaultProps} />)

    const button = screen.getByRole('button')
    await user.click(button)
    await user.click(button)
    await user.click(button)
    await user.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
})
```

**テスト項目:**
- 状態管理
- 再レンダリング
- 複数のインタラクションの連続実行
- プロパティの動的変更

#### 9. **Animation/Transition** (アニメーション/トランジション)
アニメーションやトランジションの動作をテスト

```typescript
describe('Animation Behavior', () => {
  it('should apply transition styles', () => {
    render(<Component {...defaultProps} />)
    const element = screen.getByRole('region')
    expect(element).toHaveStyle({
      transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out',
    })
  })

  it('should set opacity to 0 when closed', () => {
    render(<Component {...defaultProps} defaultOpen={false} />)
    const element = screen.getByRole('region')
    expect(element).toHaveStyle({ opacity: '0' })
  })

  it('should set opacity to 1 when open', () => {
    render(<Component {...defaultProps} defaultOpen={true} />)
    const element = screen.getByRole('region')
    expect(element).toHaveStyle({ opacity: '1' })
  })
})
```

**テスト項目:**
- トランジションプロパティ
- 開閉時のスタイル変化
- アニメーションの初期状態と終了状態

#### 10. **CSS Class Application** (CSSクラス適用)
適切なCSSクラスが適用されることをテスト

```typescript
describe('CSS Class Application', () => {
  it('should apply base component class', () => {
    const { container } = render(<Component {...defaultProps} />)
    const element = container.querySelector('[class*="sekai-component"]')
    expect(element).toBeTruthy()
  })

  it('should apply theme-specific classes', () => {
    const { container } = render(<Component {...defaultProps} />)
    const elements = container.querySelectorAll('[class*="sekai-color-"]')
    expect(elements.length).toBeGreaterThan(0)
  })

  it('should conditionally apply modifier classes', () => {
    const { container } = render(<Component {...defaultProps} centered={true} />)
    expect(container.querySelector('[class*="centered"]')).toBeTruthy()
  })
})
```

---

## テストケース設計原則

### AAA パターン (Arrange-Act-Assert)
すべてのテストは以下の構造に従う:

```typescript
it('should do something', async () => {
  // Arrange (準備)
  const user = userEvent.setup()
  const mockHandler = jest.fn()
  render(<Component onClick={mockHandler} />)

  // Act (実行)
  const button = screen.getByRole('button')
  await user.click(button)

  // Assert (検証)
  expect(mockHandler).toHaveBeenCalled()
})
```

### テスト命名規則

#### 推奨形式
```typescript
// Good ✓
it('should render without crashing', () => {})
it('should toggle open state when button is clicked', () => {})
it('should apply sekai color CSS variables', () => {})

// Bad ✗
it('test button', () => {})
it('check rendering', () => {})
it('works correctly', () => {})
```

#### 命名パターン
- `should [動詞] [期待される結果]`
- `should [動詞] [対象] when [条件]`
- `should handle [エッジケース] gracefully`

### テストの独立性
各テストは他のテストに依存せず、独立して実行可能であること

```typescript
// Good ✓
describe('Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('test 1', () => {
    render(<Component />)
    // assertions
  })

  it('test 2', () => {
    render(<Component />)
    // assertions
  })
})

// Bad ✗
let component
it('test 1', () => {
  component = render(<Component />)
})
it('test 2', () => {
  // componentが前のテストに依存
})
```

### 非同期処理のテスト

#### waitFor の使用
```typescript
it('should update asynchronously', async () => {
  render(<Component />)

  await waitFor(() => {
    expect(screen.getByText('Updated')).toBeInTheDocument()
  })
})
```

#### user-event の使用
```typescript
it('should handle user interaction', async () => {
  const user = userEvent.setup()
  render(<Component />)

  await user.click(screen.getByRole('button'))
  await user.keyboard('{Enter}')
  await user.type(screen.getByRole('textbox'), 'Hello')
})
```

---

## モックとスタブ

### 標準的なモック設定

#### useOptionalSekai のモック
```typescript
jest.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: jest.fn(() => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  })),
}))
```

#### usePortalContainer のモック
```typescript
jest.mock('@/internal/usePortalContainer', () => ({
  usePortalContainer: jest.fn(() => document.body),
}))
```

#### createPortal のモック
```typescript
jest.mock('react-dom', () => {
  const actual = jest.requireActual('react-dom')
  return {
    ...actual,
    createPortal: jest.fn((element, container) => element),
  }
})
```

#### SVG のモック
```typescript
jest.mock('@/img/chevron', () => ({
  ChevronSvg: ({ className, vector }: { className?: string; vector?: string }) => (
    <svg data-testid="chevron-icon" className={className} data-vector={vector} />
  ),
}))
```

#### Converter 関数のモック
```typescript
jest.mock('@/utils/converter', () => ({
  convertHexToRgba: jest.fn((color: string, alpha: number) =>
    `rgba(51, 204, 186, ${alpha})`
  ),
  convertHexToRgbaMixWithBlackOrWhite: jest.fn(() =>
    'rgba(51, 204, 186, 0.8)'
  ),
}))
```

### モックのクリーンアップ
```typescript
describe('Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
```

---

## カバレッジ目標

### プロジェクト全体の目標
```javascript
// jest.config.js
coverageThreshold: {
  global: {
    statements: 90,
    branches: 75,
    functions: 85,
    lines: 90,
  },
}
```

### コンポーネント別の推奨カバレッジ
| カテゴリ | Statements | Branches | Functions | Lines |
|---------|-----------|----------|-----------|-------|
| **基本コンポーネント** | 95%+ | 85%+ | 90%+ | 95%+ |
| **複雑なコンポーネント** | 90%+ | 80%+ | 85%+ | 90%+ |
| **ユーティリティ** | 95%+ | 90%+ | 95%+ | 95%+ |

### カバレッジから除外すべき項目
- import文
- 型定義 (interface, type)
- index.ts ファイル
- .stories.tsx ファイル

```javascript
// jest.config.js
collectCoverageFrom: [
  'src/**/*.{ts,tsx}',
  '!src/**/*.d.ts',
  '!src/index.ts',
  '!src/**/index.ts',
  '!src/**/*.stories.tsx',
],
```

---

## テンプレート

### 基本コンポーネントテストテンプレート

```typescript
/* eslint-disable max-lines-per-function */
import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ComponentName } from '@/components/folder/ComponentName'

import type { ComponentNameProps } from '@/components/folder/ComponentName'

// ===== MOCKS =====
jest.mock('@/internal/useOptionalSekai', () => ({
  useOptionalSekai: jest.fn(() => ({
    sekaiColor: '#33ccba',
    modeTheme: 'light',
    isLight: true,
  })),
}))

jest.mock('@/utils/converter', () => ({
  convertHexToRgba: jest.fn((color: string, alpha: number) =>
    `rgba(51, 204, 186, ${alpha})`
  ),
}))

// ===== TEST SUITE =====
describe('ComponentName Component', () => {
  const defaultProps: ComponentNameProps = {
    // Define default props here
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  // ===== 1. RENDERING =====
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<ComponentName {...defaultProps} />)
      expect(screen.getByText('Expected Text')).toBeInTheDocument()
    })

    it('should render with custom id', () => {
      render(<ComponentName {...defaultProps} id="custom-id" />)
      const element = screen.getByText('Expected Text').closest('div')
      expect(element).toHaveAttribute('id', 'custom-id')
    })

    it('should render with custom className', () => {
      render(<ComponentName {...defaultProps} className="custom-class" />)
      const element = screen.getByText('Expected Text').closest('div')
      expect(element).toHaveClass('custom-class')
    })

    it('should render with custom styles', () => {
      const customStyle = { backgroundColor: 'red' }
      render(<ComponentName {...defaultProps} style={customStyle} />)
      const element = screen.getByText('Expected Text').closest('div')
      expect(element).toHaveStyle('background-color: rgb(255, 0, 0)')
    })
  })

  // ===== 2. COMPONENT-SPECIFIC FUNCTIONALITY =====
  describe('Component Functionality', () => {
    // Add component-specific tests here
  })

  // ===== 3. PROPS VARIANTS =====
  describe('Props Variants', () => {
    // Test all prop combinations
  })

  // ===== 4. THEME INTEGRATION =====
  describe('Theme Integration', () => {
    it('should apply sekai color CSS variables', () => {
      const { container } = render(<ComponentName {...defaultProps} sekai="Miku" />)
      const element = container.firstChild as HTMLElement
      expect(element).toHaveStyle({
        '--sekai-color': '#33ccba',
      })
    })

    it('should apply light theme mode class', () => {
      const { container } = render(<ComponentName {...defaultProps} themeMode="light" />)
      const element = container.querySelector('[class*="sekai-color-light"]')
      expect(element).toBeTruthy()
    })
  })

  // ===== 5. CUSTOM STYLING =====
  describe('Custom Styling', () => {
    it('should merge custom className with default classes', () => {
      const { container } = render(
        <ComponentName {...defaultProps} className="custom-class" />,
      )
      const element = container.querySelector('.custom-class')
      expect(element).toBeTruthy()
    })
  })

  // ===== 6. ACCESSIBILITY =====
  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<ComponentName {...defaultProps} />)
      // Add accessibility checks
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<ComponentName {...defaultProps} />)
      // Test keyboard navigation
    })
  })

  // ===== 7. EDGE CASES =====
  describe('Edge Cases', () => {
    it('should handle null children gracefully', () => {
      render(<ComponentName {...defaultProps} children={null} />)
      // Assertions
    })

    it('should handle undefined props gracefully', () => {
      render(<ComponentName {...defaultProps} someProp={undefined} />)
      // Assertions
    })
  })

  // ===== 8. INTEGRATION TESTS =====
  describe('Integration Tests', () => {
    it('should maintain state across re-renders', async () => {
      const { rerender } = render(<ComponentName {...defaultProps} />)
      // Test state persistence
      rerender(<ComponentName {...defaultProps} />)
      // Assertions
    })
  })
})
```

---

## ベストプラクティス

### 1. クエリの優先順位
Testing Library推奨のクエリ優先順位に従う:

```typescript
// 推奨順 (上から順に優先)
screen.getByRole('button')           // 1. Accessible to all
screen.getByLabelText('Username')    // 2. Form elements
screen.getByPlaceholderText('Search')// 3. Placeholders
screen.getByText('Submit')           // 4. Text content
screen.getByDisplayValue('John')     // 5. Form values

// 避けるべき (最終手段)
screen.getByTestId('submit-button')  // データ属性は最終手段
container.querySelector('.class')     // セレクタは避ける
```

### 2. waitFor の適切な使用
```typescript
// Good ✓
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument()
})

// Bad ✗ (不要なwaitFor)
await waitFor(() => {
  render(<Component />)  // renderは同期
})
```

### 3. ユーザーイベントの推奨方法
```typescript
// Good ✓ (user-event を使用)
const user = userEvent.setup()
await user.click(button)
await user.type(input, 'text')

// Bad ✗ (fireEvent は避ける)
fireEvent.click(button)
fireEvent.change(input, { target: { value: 'text' } })
```

### 4. アサーションの明確性
```typescript
// Good ✓
expect(button).toHaveAttribute('aria-expanded', 'true')
expect(element).toHaveStyle({ color: 'red' })

// Bad ✗
expect(button.getAttribute('aria-expanded')).toBe('true')
expect(element.style.color).toBe('red')
```

### 5. テストのグループ化
```typescript
// Good ✓
describe('ComponentName Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {})
    it('should render with props', () => {})
  })

  describe('Functionality', () => {
    it('should toggle on click', () => {})
  })
})

// Bad ✗
it('ComponentName should render without crashing', () => {})
it('ComponentName should render with props', () => {})
it('ComponentName should toggle on click', () => {})
```

### 6. モックの再利用
```typescript
// Good ✓
// test/__mocks__/commonMocks.ts
export const mockUseOptionalSekai = () => {
  jest.mock('@/internal/useOptionalSekai', () => ({
    useOptionalSekai: jest.fn(() => ({
      sekaiColor: '#33ccba',
      modeTheme: 'light',
      isLight: true,
    })),
  }))
}

// componentName.test.tsx
import { mockUseOptionalSekai } from '../__mocks__/commonMocks'
mockUseOptionalSekai()
```

### 7. テストデータの管理
```typescript
// Good ✓
const defaultProps: ComponentProps = {
  title: 'Test Title',
  description: 'Test Description',
}

const createProps = (overrides?: Partial<ComponentProps>) => ({
  ...defaultProps,
  ...overrides,
})

it('should work with custom props', () => {
  render(<Component {...createProps({ title: 'Custom' })} />)
})
```

---

## 継続的改善

### カバレッジモニタリング
定期的にカバレッジレポートを確認し、改善点を特定:

```bash
# カバレッジレポート生成
npm test -- --coverage

# HTMLレポート確認
open coverage/index.html

# 特定コンポーネントのカバレッジ
npm test -- --coverage --collectCoverageFrom="src/components/accordion/**"
```

### レビューチェックリスト
プルリクエスト時に確認すべき項目:

- [ ] すべての必須テストカテゴリがカバーされている
- [ ] カバレッジ閾値を満たしている (90%/75%/85%/90%)
- [ ] テスト命名規則に従っている
- [ ] モックが適切に設定されている
- [ ] アクセシビリティテストが含まれている
- [ ] エッジケースがカバーされている
- [ ] 非同期処理が適切にテストされている
- [ ] すべてのテストが独立して実行可能

### テストの追加が必要なタイミング
1. **新しいコンポーネント追加時**: 完全なテストスイートを作成
2. **バグ修正時**: バグを再現するテストを追加してから修正
3. **機能追加時**: 新しい機能に対するテストを追加
4. **リファクタリング時**: 既存テストが通ることを確認

### テストメンテナンス
- **定期的なレビュー**: 四半期ごとにテストスイートをレビュー
- **フレイキーテストの修正**: 不安定なテストは即座に修正
- **非推奨APIの更新**: Testing Libraryの推奨に従う
- **パフォーマンス最適化**: テスト実行時間を監視

---

## 参考リソース

### 公式ドキュメント
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library User Event](https://testing-library.com/docs/user-event/intro)
- [jest-dom Matchers](https://github.com/testing-library/jest-dom)

### プロジェクト内リファレンス
- [CLAUDE.md](/home/user/Untitled/CLAUDE.md) - プロジェクト全体のガイドライン
- [jest.config.js](/home/user/Untitled/jest.config.js) - Jest設定
- [setupTests.ts](/home/user/Untitled/test/setupTests.ts) - テストセットアップ

### 既存テストの参考実装
- [accordion.test.tsx](/home/user/Untitled/test/components/accordion/accordion.test.tsx) - 712行、最も包括的
- [breadcrumb.test.tsx](/home/user/Untitled/test/components/breadcrumb/breadcrumb.test.tsx) - 618行
- [backdrop.test.tsx](/home/user/Untitled/test/components/backdrop/backdrop.test.tsx) - 457行

---

## まとめ

このテスト設計仕様書は、Untitled UI Libraryのテスト品質を維持し、新しいコンポーネントのテスト追加を効率化するためのガイドラインです。

**重要な原則:**
1. **一貫性**: すべてのテストが同じ構造とパターンに従う
2. **包括性**: すべての機能とエッジケースをカバーする
3. **保守性**: 読みやすく、理解しやすいテストコードを書く
4. **実用性**: 実際のユーザー操作を模倣したテストを作成する

このドキュメントは、プロジェクトの成長とともに更新されるべき生きたドキュメントです。改善提案や追加すべき内容があれば、積極的に更新してください。

---

**Document Version:** 1.0.0
**Last Updated:** 2025-12-18
**Maintained By:** Development Team
