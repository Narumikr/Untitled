// test-pr-labeling.cjs
const fs = require('fs')
const path = require('path')

// モックのgithubとcontextオブジェクトを作成
const mockGithub = {
  rest: {
    issues: {
      getLabel: async ({ owner, repo, name }) => {
        console.log(`[Mock] Checking if label exists: ${name}`)
        // 404エラーを投げて新規作成をシミュレート
        const error = new Error('Not Found')
        error.status = 404
        throw error
      },
      createLabel: async ({ owner, repo, name, description, color }) => {
        console.log(`[Mock] Creating label: ${name}`)
        console.log(`  Color: #${color}`)
        console.log(`  Description: ${description}`)
        return { data: { name, color, description } }
      },
      addLabels: async ({ owner, repo, issue_number, labels }) => {
        console.log(`[Mock] Adding labels to PR #${issue_number}:`, labels)
        return { data: labels }
      },
      createComment: async ({ owner, repo, issue_number, body }) => {
        console.log(`\n[Mock] Posting comment to PR #${issue_number}:`)
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log(body)
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
        return { data: { id: 1, body } }
      },
    },
  },
}

const mockContext = {
  repo: {
    owner: 'test-owner',
    repo: 'test-repo',
  },
  issue: {
    number: 123,
  },
  payload: {
    pull_request: {
      user: {
        login: 'test-user',
      },
    },
  },
}

// テスト実行
async function runTest() {
  console.log('🎵 === Starting Local Test === 🎵\n')

  try {
    // 定数ファイルを読み込み
    const constantsCode = fs.readFileSync(
      path.join(__dirname, '../.github/script/prsk-yell-label.constants.js'),
      'utf8',
    )

    // ロジックファイルを読み込み
    const logicCode = fs.readFileSync(
      path.join(__dirname, '../.github/script/prsk-labeling-logic.js'),
      'utf8',
    )

    // 両方のファイルを結合してexport/import文を削除
    let combinedCode = constantsCode + '\n\n' + logicCode

    // import文を削除
    combinedCode = combinedCode.replace(/import\s+{[^}]+}\s+from\s+['"][^'"]+['"];?\n?/g, '')

    // export文を削除してglobalThisに代入
    combinedCode = combinedCode.replace(/export\s+const\s+(\w+)\s*=/g, 'globalThis.$1 =')
    combinedCode = combinedCode.replace(
      /export\s+function\s+(\w+)/g,
      'globalThis.$1 = function $1',
    )
    combinedCode = combinedCode.replace(
      /export\s+async\s+function\s+(\w+)/g,
      'globalThis.$1 = async function $1',
    )

    console.log('Loading and evaluating code...\n')

    // 結合したコードを評価
    eval(combinedCode)

    // handlePrLabelingが定義されているか確認
    if (typeof globalThis.handlePrLabeling !== 'function') {
      throw new Error('❌ handlePrLabeling is not defined!')
    }

    console.log('✓ handlePrLabeling loaded successfully\n')

    // メイン処理を実行
    await globalThis.handlePrLabeling(mockGithub, mockContext)

    console.log('\n🎉 === Test Completed Successfully === 🎉')
  } catch (error) {
    console.error('\n❌ === Test Failed ===')
    console.error('Error:', error.message)
    console.error('\nStack trace:')
    console.error(error.stack)
    process.exit(1)
  }
}

runTest()
