<img src="https://capsule-render.vercel.app/api?type=waving&height=250&color=0:33aaee,100:ffc800&text=Hello%20SEKAI&section=header&fontAlign=39&fontAlignY=45&fontSize=50&textBg=false&reversal=false&animation=fadeIn&desc=React%20prsk%20theme%20UI%20Library&descAlign=50&descSize=-1&descAlignY=55&fontColor=f5f5f7" />

# **_Untitled_**

![welcome comment](https://readme-typing-svg.herokuapp.com?color=%2333ccba&lines=いつしか想いは形になる;君と今を紡ぐ未来照らして...;)

<img src="https://img.shields.io/badge/License-Fan_made-lightgreen" alt="License: Fan-made" />

#### **_Tech Stack_**

<a href="https://react.dev/" target="_blank"><img src="https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white" alt="React" /></a>
<a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
<a href="https://sass-lang.com/" target="_blank"><img src="https://img.shields.io/badge/-SCSS-CC6699?logo=sass&logoColor=white" alt="SCSS" /></a>
<a href="https://github.com/lukeed/clsx" target="_blank"><img src="https://img.shields.io/badge/-clsx-000000?logo=npm&logoColor=white" alt="clsx" /></a>
<a href="https://babeljs.io/" target="_blank"><img src="https://img.shields.io/badge/-Babel-F9DC3E?logo=babel&logoColor=black" alt="Babel" /></a>

### 💫 **_What we provide_** 💫![Leo/need-divider](https://capsule-render.vercel.app/api?type=rect&height=2&color=0:3367cc,100:f5f5f7)

- プロセカキャラやユニットのカラーコードTsファイル(_.js,_.tsファイル内用)
- プロセカキャラやユニットのカラーコードCSSファイル(全体共通CSSカスタムプロパティ用)
- Web コンポーネント(Buttonなど)
- SEKAIテーマプロバイダー

### 🍀 **_Installation_** 🍀![MOREMORE-JUMP-divider](https://capsule-render.vercel.app/api?type=rect&height=2&color=0:88dd44,100:f5f5f7)

```bash
npm install github:Narumikr/Untitled#release/untitled
```

yarnを使う場合：

```bash
yarn add github:Narumikr/Untitled#release/untitled
```

#### **_Notice_**

React18で作成されているため、最新のReact環境にインストールすると失敗するかと思います。

その場合、下記オプションをつけてのインストールをお試しください

```bash
npm install github:Narumikr/Untitled#release/untitled --legacy-peer-deps

or

yarn add github:Narumikr/Untitled#release/untitled --legacy-peer-deps
```

### 💻 **_How to use_** 💻![Nightcord-at25-divider](https://capsule-render.vercel.app/api?type=rect&height=2&color=0:884499,100:f5f5f7)

### colorsSekai

colorsSekaiをimportしてもらうことで、TsJsファイル内でカラーコードを利用することができる

カラーコードはhex形式(e.g. #FFFFFF)で提供される

RGBAなどで使用したい場合は`convertHexToRgb`,`convertHexToRgba`のコンバーター関数も用意があるので変換して使ってください

#### \*.tsx

```ts
import { colorsSekai } from '@naru/untitled-ui-library'

export const TopPage = () => {
  ...

  return (
    <div className={styles.container}>
      <p style={{ color: colorsSekai.Miku }}>Miku</p>
    </div>
  )
}
```

### sekai-style.css

ルートコンポーネントにimportしてください

untitled-ui-libraryはこのsekai-style.cssのimportがない場合、スタイルが適切に反映されません

### sekai-colors.css

ルートコンポーネントにimportすることでグローバルなカスタムプロパティとして利用することができます

#### \_app.tsx

```ts
import type { AppProps } from 'next/app'
import '@/styles/globals.scss'
import '@naru/untitled-ui-library/sekai-style.css'
import '@naru/untitled-ui-library/color/sekai-colors.css'
...
```

#### \*.module.scss

```css
.container {
  background-color: var(--sekai-miku);
}
```

### Webコンポーネント

SEKAIカラーでデザインされたButtonなどを始めWebコンポーネントも提供

提供コンポーネントは下記のStorybookを参照してください

[Jump to Storybook ➣](https://untitled-release.vercel.app/)

#### \*.tsx

```ts
import { BasicButton, COLORS_SEKAI_KEYS } from '@naru/untitled-ui-library'

export const TopPage = () => {
  ...

  return (
    <BasicButton sekai={COLORS_SEKAI_KEYS.Nightcode}>
      25時、ナイトコードで。
    </BasicButton>
  )
}
```

### YourSekaiProvider

アプリをラップするProviderの提供

カスタムテーマとして、セカイの持ち主を指定してあげることでアプリ全体でそのカラーが反映される

上述したWebコンポーネントはPropsとして、sekaiの指定がない場合はProviderの値を参照するようになっている

※Providerでのラップは必須ではないので、Webコンポーネント単体でも使えます

\_app.tsx

```ts
import {
  COLORS_SEKAI_KEYS,
  LIGHT_MODE,
  YourSekaiProvider,
  createSekai
} from '@naru/untitled-ui-library'

const App = ({ Component, pageProps }: AppProps) => {

  const theme = createSekai({
    palette: {
      sekai: COLORS_SEKAI_KEYS.Miku,
      mode: LIGHT_MODE
    }
  })

  return (
    <YourSekaiProvider
      sekaiTheme={theme}
      options={{
        disableStoreSekai: false /** default false */,
        disableStoreTheme: false /** default false */
      }}>
      <Component {...pageProps} />
    </YourSekaiProvider>
  )
}
```

Providerに渡すthemeは`createSekai`関数を用いて生成したオブジェクトを渡してください

createSekaiの引数に渡すオブジェクトの型は下記となっており、paletteのsekaiは必須ですが、それ以外は任意で大丈夫です

デフォルト値はmodeが`light(ライトモード)`で、fontFamilyは`Montserrat, sans-serif`です

また、この設定値はデフォルトでローカルストレージに保存しており、リロードをしたり、再度ページ訪問した際に復元して反映されます

設定値の保存が不要な場合はProviderにオプションとして`disableStoreSekai`と`disableStoreTheme`を渡すことができます

- disableStoreSekai : `true`でセカイの値を保存しなくなります
- disableStoreTheme : `true`でテーマモードの値を保存しなくなります

デフォルトではどちらも`false`になっているので、保存しても問題ない場合は特にOptionの設定は不要です

```ts
export type SekaiThemeProps = {
  palette: {
    sekai: ColorsSekaiKey
    mode?: PaletteMode
  }
  typography?: {
    fontFamily?: string
  }
}
```

### switchSekaiColor

セカイのカラーを動的に変えたい場合、`YourSekaiProvider`はセカイの持ち主を変える関数を用意しています

このswitchSekaiColorはカスタムフックの`useCreateSekai`を通してアクセスできます

#### \*.tsx

```ts
const { switchSekaiColor } = useCreateSekai()

const handleChangeSekaiColor = () => {
  switchSekaiColor(COLORS_SEKAI_KEYS.Ichika)
}

return (
  <button onClick={handleChangeSekaiColor}>SEKAI Change</button>
)
```

useCreateSekaiは他にも現在のSekaiThemeのオブジェクト`sekaiTheme`やライト/ダークモードのカラーテーマを変更する`switchColorTheme`も提供しています

**※ファンメイド作品です**

私の大好きなプロセカという作品、でもｲﾗｽﾄは描けない、書き物や工作なども難しい。
でも何かしら創作をしたいという想いから作り始めました💫

**※本リポジトリはプロセカ公式とは一切関係ありません**
