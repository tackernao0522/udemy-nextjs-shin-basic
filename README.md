## 08 create-next-app

- `$ npx create-next-app udemy-next-basic`を実行<br>

* `node_modules`及び`yarn.lock`を削除<br>

- `package.json`を編集<br>

```json:package.json
{
  "name": "udemy-next-basic",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "12.1.0",
    "react": "17.0.2",
    "react-dom": "17.0.2"
  },
  "devDependencies": {
    "eslint": "8.10.0",
    "eslint-config-next": "12.1.0"
  }
}
```

- `$ yarn install`を実行<br>

* `$ npm run dev`を実行<br>

- localhost:3000 にアクセスしてみる<br>

# Section04 ①Next.js でマイクロブログを構築（ページ遷移、スタイリング編）

## 12 Nex.js におけるほっとりローディングを体感

- `pages/index.js`を編集<br>

```js:index.js
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          // WelcomeをLearnに変えてみる Learn to{' '}
          <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
```

## 13 pages フォルダでルーティング設定をしてみる

- `$ mkdir pages/posts && touch $_/firstPost.js`を実行<br>

`pages/posts/firstPost.js`を編集<br>

- `nf`と打ってみる<br>

```js:firstPost.js
export default function FirstPost() {
  return (
    <div>
      <h1>最初の投稿</h1>
      <h2>ホームへ戻る</h2>
    </div>
  )
}
```

+ localhost:3000/posts/firstPost にアクセス<br>