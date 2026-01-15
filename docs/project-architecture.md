# Project Layout & Architecture

## Source Code Structure
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

## Key Configuration Files
- **package.json** - Scripts, dependencies, export paths
- **tsconfig.json** - TypeScript config (strict mode, @/ alias to src/)
- **tsconfig.build.json** - Build-specific TS config
- **rollup.config.js** - Bundling config (ESM/CJS, 'use client' injection)
- **eslint.config.mjs** - ESLint rules (complexity ≤8, max 150 lines/function)
- **.prettierrc.json** - Prettier config (single quotes, 96 char width, no semicolons)
- **jest.config.js** - Jest test config
- **plopfile.js** - Component generator config

## Scripts Directory
- **scripts/generator.py** - Auto-generates index.ts files (Python 3.12+)
- **scripts/build_local.sh** - Creates local npm package (.tgz)
- **scripts/build-package-json.py** - Generates dist/package.json

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

## File Path Patterns
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

# プロジェクトレイアウト & アーキテクチャ（日本語版）

## ソースコード構造
```
src/
├── components/       # 22個のコンポーネントフォルダ（button/, card/, dialog/など）
│   ├── {folder}/
│   │   ├── Component.tsx         # コンポーネント実装
│   │   └── Component.module.scss # スコープ付きCSSモジュール
│   └── index.ts      # 自動生成 - 手動編集禁止
├── hooks/            # カスタムReactフック（useCreateSekai, useLocalStorageなど）
│   └── index.ts      # 自動生成
├── utils/            # ユーティリティ（converter, operation, createSekaiなど）
│   └── index.ts      # 自動生成
├── internal/         # 公開エクスポート対象外（useOptionalSekai, usePortalContainer）
├── styles/           # グローバルスタイル、カラーシステム
│   ├── global.module.scss  # ユーティリティクラス、z-index、タイポグラフィ
│   ├── sekai-colors.ts     # TypeScriptカラー定数
│   └── sekai-colors.css    # CSSカスタムプロパティ
├── img/              # SVGアセット（Reactコンポーネントとして自動インポート）
└── index.ts          # メインエントリーポイント（すべての公開APIをエクスポート）
```

## 主要な設定ファイル
- **package.json** - スクリプト、依存関係、エクスポートパス
- **tsconfig.json** - TypeScript設定（strictモード、@/エイリアスはsrc/へ）
- **tsconfig.build.json** - ビルド専用TS設定
- **rollup.config.js** - バンドル設定（ESM/CJS、'use client'注入）
- **eslint.config.mjs** - ESLintルール（複雑度≤8、関数あたり最大150行）
- **.prettierrc.json** - Prettier設定（シングルクォート、96文字幅、セミコロンなし）
- **jest.config.js** - Jestテスト設定
- **plopfile.js** - コンポーネントジェネレーター設定

## scriptsディレクトリ
- **scripts/generator.py** - index.tsファイルを自動生成（Python 3.12+）
- **scripts/build_local.sh** - ローカルnpmパッケージを作成（.tgz）
- **scripts/build-package-json.py** - dist/package.jsonを生成

---

## 追加コンテキスト

### パスエイリアス
- `@/`は`src/`にマップ（tsconfig.json、jest.config.js、rollup.config.js、.storybook/main.tsで設定）

### 自動生成ファイル
以下のファイルはスクリプトで管理されます - 編集禁止:
- `src/components/index.ts`
- `src/hooks/index.ts`
- `src/utils/index.ts`
- `dist/**/*`

### コード生成
- **Plopテンプレート:** `plop-templates/*.hbs`
- **コンポーネントジェネレーター:** `npm run plop` → .tsx、.module.scss、.stories.tsxを作成

### テスト
- jsdom環境でJest
- React Testing Library
- `test/setupTests.ts`でセットアップ（RAF、matchMedia、scrollプロパティをモック）

### Storybook
- 開発: `npm run dev`（ポート6006）
- 静的ビルド: `npm run build-storybook`
- ストーリーは`stories/`ディレクトリに配置

### Prettier
- 保存時に自動フォーマット（VS Code: .vscode/settings.json）
- 手動: `npm run prettier`
- 設定: 2スペースインデント、シングルクォート（JSX以外）、96文字幅、セミコロンなし

---

## ファイルパスパターン
```
コンポーネント:    src/components/{folder}/{Component}.tsx
フック:           src/hooks/useHook.ts
ユーティリティ:    src/utils/util.ts
スタイル:         src/styles/
内部用:           src/internal/（公開エクスポート対象外）
ストーリー:       stories/{folder}/{Component}.stories.tsx
設定:            .storybook/, rollup.config.js, tsconfig.json
スクリプト:       scripts/generator.py, scripts/build_local.sh
```
