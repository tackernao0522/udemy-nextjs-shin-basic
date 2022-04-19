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

## 21 トップページのレイアウトを更新する

- `public/images`ディレクトリに`thumbnail01.jpg`と`thumbnail02.jpg`と`thumbnail03.jpeg`と`thumbnail04.jpg`を配置<br>

* `pages/index.js`を編集<br>

```js:index.js
/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout>
      <section className={utilStyles.headingMd}>
        <p>
          私はプログラミング学習中の者です/好きな言語はPHP・Ruby・JavaScriptです
        </p>
      </section>

      <section>
        <h2>📝エンジニアのブログ</h2>
        <div>
          <article>
            <Link href="/">
              <img src="/images/thumbnail01.jpg" alt="" />
            </Link>
            <Link href="/">
              <a>SSGとSSRの使い分けの場面はいつなのか？</a>
            </Link>
            <br />
            <small>February 23, 2020</small>
          </article>
        </div>
      </section>
    </Layout>
  )
}
```

## 22 トップページのスタイリングを調整する

https://github.com/Shin-sibainu/nextjs-blog-udemy-mod/blob/main/styles/Home.module.css <br>

- `styles/Home.module.css`を編集<br>

```css:Home.module.css
.container {
  padding: 0 2rem;
}

.main {
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.thumbnailImage {
  width: 950px;
  height: 400px;
  margin-bottom: 20px;
  box-shadow: 4px 5px 12px black;
  transition: all 0.3s;
  cursor: pointer;
}

.thumbnailImage:hover {
  transform: translate(4px, 5px);
  box-shadow: none;
}

.grid {
  display: grid;
  flex-wrap: wrap;
  max-width: 1200px;
  gap: 40px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}
```

- `pages/index.js`を編集<br>

```js:index.js
/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout>
      <section className={utilStyles.headingMd}>
        <p>
          私はプログラミング学習中の者です/好きな言語はPHP・Ruby・JavaScriptです
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          <article>
            <Link href="/">
              <img
                src="/images/thumbnail01.jpg"
                className={styles.thumbnailImage}
                alt=""
              />
            </Link>
            <Link href="/">
              <a className={utilStyles.boldText}>
                SSGとSSRの使い分けの場面はいつなのか？
              </a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>February 23, 2020</small>
          </article>
          <article>
            <Link href="/">
              <img
                src="/images/thumbnail01.jpg"
                className={styles.thumbnailImage}
                alt=""
              />
            </Link>
            <Link href="/">
              <a className={utilStyles.boldText}>
                SSGとSSRの使い分けの場面はいつなのか？
              </a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>February 23, 2020</small>
          </article>
          <article>
            <Link href="/">
              <img
                src="/images/thumbnail01.jpg"
                className={styles.thumbnailImage}
                alt=""
              />
            </Link>
            <Link href="/">
              <a className={utilStyles.boldText}>
                SSGとSSRの使い分けの場面はいつなのか？
              </a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>February 23, 2020</small>
          </article>
          <article>
            <Link href="/">
              <img
                src="/images/thumbnail01.jpg"
                className={styles.thumbnailImage}
                alt=""
              />
            </Link>
            <Link href="/">
              <a className={utilStyles.boldText}>
                SSGとSSRの使い分けの場面はいつなのか？
              </a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>February 23, 2020</small>
          </article>
        </div>
      </section>
    </Layout>
  )
}
```
