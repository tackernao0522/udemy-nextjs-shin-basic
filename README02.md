## 19 タイポグラフィに関する CSS モジュールを用意

https://github.com/Shin-sibainu/nextjs-blog-udemy-mod/blob/main/styles/utils.module.css <br>

- `touch styles/utils.module.css`を実行<br>

* `styles/utils.module.css`を編集<br>

```css:utils.module.css
.heading2Xl {
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin-top: 1rem;
  margin-bottom: 0;
}

.headingXl {
  font-size: 2rem;
  line-height: 1.3;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
}

.headingLg {
  font-size: 2rem;
  line-height: 1.4;
  margin-top: 0;
  font-weight: 500;
}

.headingMd {
  font-size: 1.2rem;
  line-height: 1.5;
  text-align: center;
}

.borderCircle {
  border-radius: 1000px;
}

.colorInherit {
  color: inherit;
}

.padding1px {
  padding-top: 1px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.listItem {
  margin: 0 0 1.25rem;
}

.lightText {
  color: #999;
}

.boldText {
  color: black;
  font-weight: 550;
}
```

- `components/Layout.js`を編集<br>

```js:Layout.js
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import styles from './layout.module.css'
// 追記
import utilStyles from '../styles/utils.module.css'

export const siteTitle = 'Next.js blog'

const name = 'Taka Code'

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" heref="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        // 編集
        <img src="/images/profile.png" className={utilStyles.borderCircle} />
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
        // ここまで
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
```

## 20 \_app.js にグローバルスタイリングを適用する

https://github.com/Shin-sibainu/nextjs-blog-udemy-mod/blob/main/styles/globals.css <br>

- `styles/globals.css`を編集<br>

```css:globals.css
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  line-height: 1.6;
  font-size: 18px;
  background-color: #fbf5f5;
}

* {
  box-sizing: border-box;
}

a {
  color: #0070f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  display: block;
}
```

- `pages/index.js`を編集<br>

```js:index.js
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      // 追記
      <a href="">Nextjsです</a>
    </Layout>
  )
}
```
