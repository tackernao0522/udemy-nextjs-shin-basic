## 26 マークダウン解析のためのライブラリを作成する

- `$ mkdir lib && tuoch $_/post.js`を実行<br>

* `lib/post.js`を編集<br>

```js:post.js
import path from 'path'
import fs from 'fs'

const postsDirectory = path.join(process.cwd(), 'posts')

// mdファイルのデータを取り出す
export const getPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '') // ファイル名(id)

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.joun(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  })
}
```

- `$ npm i gray-matter@4.0.3`を実行<br>

* `lib/post.js`を編集<br>

```js:post.js
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

// mdファイルのデータを取り出す
export const getPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '') // ファイル名(id)

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    // idとデータを返す
    return {
      id,
      ...matterResult.data,
    }
  })
  return allPostsData
}
```

## 27 getStaticProps で SSG を実装する

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
// 追加
import { getPostsData } from '../lib/post'

// 追加
// SSGの場合
export const getStaticProps = async () => {
  const allPostsData = getPostsData() // id, title, date, thumbnail
  console.log(allPostsData)

  return {
    props: {
      allPostsData,
    },
  }
}
// ここまで

// 編集 変数にallPostsDataを入れる
export default function Home({ allPostsData }) {
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

- localhost:3000 にアクセスしてみて terminal を確認すると下記のように表示される<br>

```:terminal
[
  {
    id: 'pre-rendering-about',
    title: 'プリレンダリングについて',
    date: '2020-02-21',
    thumbnail: '/images/thumbnail04.jpg'
  },
  {
    id: 'pre-rendering',
    title: 'プリレンダリングの2つの形態',
    date: '2022-02-22',
    thumbnail: '/images/thumbnail02.jpg'
  },
  {
    id: 'react-next',
    title: 'ReactとNext.jsはどちらを使うべき？',
    date: '2020-02-24',
    thumbnail: '/images/thumbnail03.jpeg'
  },
  {
    id: 'ssg-ssr',
    title: 'SSGとSSRの使い分けの場面はいつなのか？',
    date: '2020-02-23',
    thumbnail: '/images/thumbnail01.jpg'
  }
]
```

## 28 props で受け取った静的データを map 関数で出力表示する

- `pages/index.js`を編集<br>

```js:index.js
/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import { getPostsData } from '../lib/post'

// SSGの場合
export const getStaticProps = async () => {
  const allPostsData = getPostsData() // id, title, date, thumbnail
  // console.log(allPostsData)

  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }) {
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
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  src={`${thumbnail}`}
                  className={styles.thumbnailImage}
                  alt=""
                />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyles.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
```
