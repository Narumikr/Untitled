# Code Review Guidelines

## Language & Format
1. **Always write reviews in Japanese** - All review comments and feedback must be in Japanese
2. **Provide specific code examples** - Include concrete code improvement suggestions with actual code snippets showing the recommended changes

---

## Required Code Review Checklist

### 1. Naming Conventions
- ✅ No spelling mistakes in variable/function/class names
- ✅ No confusion between singular and plural forms (e.g., `items` vs `item`)
- ✅ Consistent naming (no different names for the same concept)
- ✅ Follows project naming conventions (PascalCase, camelCase, kebab-case, UPPER_SNAKE_CASE)

### 2. Code Quality
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

### 3. Comments
- ✅ Comments are appropriate and up-to-date (no outdated or misleading comments)
- ✅ Complex logic has comments explaining "why" (not just "what")
- ✅ No unnecessary commented-out code left in the codebase

### 4. Storybook Stories
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

### 5. TypeScript Type Definitions
- ✅ No use of `any` type (strict mode enforced)
- ✅ Proper type annotations present
- ✅ No excessive use of type assertions
- ✅ Props interfaces properly extend base HTML element properties when applicable

### 6. Performance
- ✅ No unnecessary re-renders
- ✅ Appropriate use of `useMemo`/`useCallback` for expensive computations
- ✅ Dependency arrays are correctly specified (no ignored ESLint warnings)

### 7. Accessibility
- ✅ Uses semantic HTML elements
- ✅ Necessary ARIA attributes are set
- ✅ Keyboard navigation is supported
- ✅ Focus management is properly handled

---

# コードレビューガイドライン（日本語版）

## 言語 & フォーマット
1. **レビューは常に日本語で書く** - すべてのレビューコメントとフィードバックは日本語で
2. **具体的なコード例を提示する** - 推奨される変更を示す実際のコードスニペットを含めた具体的な改善提案

---

## 必須コードレビューチェックリスト

### 1. 命名規則
- ✅ 変数/関数/クラス名にスペルミスがないこと
- ✅ 単数形と複数形の混同がないこと（例: `items` vs `item`）
- ✅ 一貫した命名（同じ概念に対して異なる名前を使わない）
- ✅ プロジェクトの命名規則に従っていること（PascalCase、camelCase、kebab-case、UPPER_SNAKE_CASE）

### 2. コード品質
- ✅ マジックナンバーを使わない - 代わりに名前付き定数を使用
- ✅ 早期リターンで不要なネストを避ける
  ```typescript
  // ❌ 悪い例
  if (condition) {
    // 長い処理...
  } else {
    return
  }

  // ✅ 良い例
  if (!condition) return
  // 長い処理...
  ```
- ✅ 不要なAPI呼び出しやループ内の非効率な処理がないこと
- ✅ コードの重複がないこと - DRY（Don't Repeat Yourself）原則に従う

### 3. コメント
- ✅ コメントが適切で最新であること（古い、または誤解を招くコメントがない）
- ✅ 複雑なロジックには「なぜ」を説明するコメントがあること（「何を」だけでなく）
- ✅ 不要なコメントアウトされたコードが残っていないこと

### 4. Storybookストーリー
- ✅ すべてのpropsが`argTypes`に定義されていること
- ✅ 各propsに適切な`description`があること
- ✅ 各propsに`type`指定があること
- ✅ 必須propsには`table: { type: { required: true } }`宣言があること
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

### 5. TypeScript型定義
- ✅ `any`型を使用していないこと（strictモード強制）
- ✅ 適切な型アノテーションがあること
- ✅ 型アサーションを過度に使用していないこと
- ✅ Propsインターフェースが該当する場合にベースHTML要素プロパティを適切に拡張していること

### 6. パフォーマンス
- ✅ 不要な再レンダリングがないこと
- ✅ 高コストな計算に`useMemo`/`useCallback`を適切に使用していること
- ✅ 依存配列が正しく指定されていること（ESLint警告を無視していない）

### 7. アクセシビリティ
- ✅ セマンティックHTML要素を使用していること
- ✅ 必要なARIA属性が設定されていること
- ✅ キーボードナビゲーションがサポートされていること
- ✅ フォーカス管理が適切に処理されていること
