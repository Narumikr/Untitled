# Troubleshooting & Common Issues

## Build Fails with "Cannot find module"
**Solution:** Run `npm run generate-index` then rebuild

## ESLint Errors on Import Order
**Solution:** Run `npm run lint` to auto-fix

## TypeScript Errors After Adding Files
**Solution:** Run `npm run generate-index` to update exports

## Tests Fail with Module Resolution Errors
**Check:** jest.config.js has correct moduleNameMapper for @/ alias

## Rollup Build Takes >2 Minutes
**Normal:** Full build takes 60-90 seconds on first run

## Python Script Fails
**Check:** Python 3.12+ installed (`python --version`)

## dist/ Folder Missing After Clean
**Expected:** Run `npm run build` to regenerate

---

# トラブルシューティング & よくある問題（日本語版）

## ビルドが"Cannot find module"で失敗する
**解決策:** `npm run generate-index`を実行してから再ビルド

## インポート順序のESLintエラー
**解決策:** `npm run lint`を実行して自動修正

## ファイル追加後にTypeScriptエラー
**解決策:** `npm run generate-index`を実行してエクスポートを更新

## モジュール解決エラーでテストが失敗する
**確認:** jest.config.jsに@/エイリアス用の正しいmoduleNameMapperがあるか

## Rollupビルドが2分以上かかる
**正常:** 初回実行時のフルビルドは60-90秒かかります

## Pythonスクリプトが失敗する
**確認:** Python 3.12+がインストールされているか（`python --version`）

## クリーン後にdist/フォルダがない
**想定内:** `npm run build`を実行して再生成してください
