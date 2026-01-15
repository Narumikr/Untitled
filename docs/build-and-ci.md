# Build & Validation Commands

## Environment Requirements
- **Node.js:** v20.x (verified with v20.19.6)
- **npm:** 10.x (verified with v10.8.2)
- **Python:** 3.12+ (for scripts/generator.py)

## ALWAYS run these commands in this exact order:

### 1. Install Dependencies (REQUIRED FIRST)
```bash
npm install
```
**Time:** ~20 seconds
**Notes:** MUST be run before any other command. Re-run if package.json changes.

### 2. Generate Index Files (REQUIRED before build)
```bash
npm run generate-index
```
**Time:** <1 second
**What it does:** Python script auto-generates `src/components/index.ts`, `src/hooks/index.ts`, `src/utils/index.ts`
**CRITICAL:** Run this EVERY time you add/remove/rename files in src/components, src/hooks, or src/utils
**Never edit:** `src/**/index.ts` files manually - they are auto-generated

### 3. Lint Code
```bash
npm run lint
```
**Time:** ~3 seconds
**Auto-fixes:** Import order, unused imports, formatting
**Must pass:** 0 warnings (--max-warnings=0)
**ALWAYS:** Run before committing

### 4. Run Tests
```bash
npm test
```
**Time:** ~3 seconds (3 test suites, 148 tests)
**Coverage:** Tests located in `test/` directory
**Mock setup:** `test/setupTests.ts` configures JSDOM, matchMedia, RAF

### 5. Full Build
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

# ビルド & 検証コマンド（日本語版）

## 環境要件
- **Node.js:** v20.x（v20.19.6で動作確認済み）
- **npm:** 10.x（v10.8.2で動作確認済み）
- **Python:** 3.12+（scripts/generator.py用）

## 必ずこの順番でコマンドを実行してください：

### 1. 依存関係のインストール（最初に必須）
```bash
npm install
```
**所要時間:** 約20秒
**注意:** 他のコマンドを実行する前に必ず実行してください。package.jsonが変更された場合は再実行が必要です。

### 2. Indexファイルの生成（ビルド前に必須）
```bash
npm run generate-index
```
**所要時間:** 1秒未満
**処理内容:** Pythonスクリプトが`src/components/index.ts`、`src/hooks/index.ts`、`src/utils/index.ts`を自動生成
**重要:** src/components、src/hooks、src/utilsでファイルの追加・削除・名前変更を行うたびに実行してください
**編集禁止:** `src/**/index.ts`ファイルは手動で編集しないでください - 自動生成されます

### 3. コードのLint
```bash
npm run lint
```
**所要時間:** 約3秒
**自動修正:** インポート順序、未使用インポート、フォーマット
**必須条件:** 0件の警告（--max-warnings=0）
**常に実行:** コミット前に必ず実行

### 4. テストの実行
```bash
npm test
```
**所要時間:** 約3秒（3つのテストスイート、148件のテスト）
**カバレッジ:** テストは`test/`ディレクトリに配置
**モック設定:** `test/setupTests.ts`でJSDOM、matchMedia、RAFを設定

### 5. フルビルド
```bash
npm run build
```
**所要時間:** 約60-90秒
**処理内容:**
1. `npm run clean` - dist/フォルダを削除
2. `npm run generate-index` - indexファイルを再生成
3. `npm run build:bundle` - Rollupでdist/cjs、dist/esmにバンドル
4. `npm run build:typecheck` - TypeScript型チェック（出力なし）
5. `npm run build:package-json` - dist/package.jsonを生成
6. `npm run build:local` - local_publish/に.tgzを作成

**出力構造:**
```
dist/
├── cjs/          # CommonJSモジュール（約780KB）
├── esm/          # ESモジュール（約776KB）
├── color/        # sekai-colors.css
├── index.d.ts    # TypeScript型定義（約36KB）
└── package.json  # 配布用package.json
```

**重要:** プッシュ前に必ず`npm run build`を実行し、dist/が最新であることを確認してください

---

## CI/CD & 検証パイプライン

### GitHub Actionsワークフロー
- **ファイル:** `.github/workflows/eslint.yml`
- **トリガー:** PRのオープン/同期/再オープン時
- **ランナー:** ubuntu-latest、Node 20
- **タイムアウト:** 3分
- **ステップ:**
  1. コードのチェックアウト
  2. Node.js 20のセットアップ
  3. `npm install`
  4. `npm run lint`（0件の警告で通過必須）

**CIをローカルで再現:**
```bash
npm install
npm run lint
```

### コミット前チェックリスト
変更をプッシュする前に：
1. ✅ `npm run lint`を実行（通過必須）
2. ✅ `npm test`を実行（全テスト通過）
3. ✅ `npm run build`を実行（正常にビルド）
4. ✅ dist/フォルダが更新されていることを確認
5. ✅ axe DevToolsでアクセシビリティをチェック（UI変更の場合）

---

## よくあるタスク & ワークフロー

### 新しいコンポーネントの追加
```bash
# 1. スキャフォールドを生成
npm run plop
# プロンプト: フォルダ名（kebab-case）、コンポーネント名（PascalCase）

# 2. src/components/{folder}/{Component}.tsxでコンポーネントを実装
# 3. src/components/{folder}/{Component}.module.scssにスタイルを追加
# 4. stories/{folder}/{Component}.stories.tsxのストーリーを更新

# 5. 必須: エクスポートを更新
npm run generate-index

# 6. Storybookでテスト
npm run dev  # http://localhost:6006 を開く

# 7. Lintとビルド
npm run lint
npm run build
```

### 既存コードの修正
```bash
# 1. ソースファイルを変更
# 2. src/components、src/hooks、src/utilsでファイルを追加/削除/名前変更した場合:
npm run generate-index

# 3. Lintと修正
npm run lint

# 4. テストを実行
npm test

# 5. ビルドして確認
npm run build
```

### 新しいフックまたはユーティリティの追加
```bash
# 1. src/hooks/またはsrc/utils/にファイルを作成
# 2. 必須: エクスポートを更新
npm run generate-index

# 3. Lintとビルド
npm run lint
npm run build
```
