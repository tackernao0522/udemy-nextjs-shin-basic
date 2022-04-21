## 34 外部から一度だけデータを取得する SSG を実装する

- `pages/posts/[id].js`を編集<br>

```js:[id].js
import Layout from '../../components/Layout'
import { getAllPostIds } from '../../lib/post'

export const getStaticPaths = () => {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false,
  }
}

// 追加
export const getStaticProps = ({ params }) => {}

export default function Post() {
  return <Layout>動的ルーティング設定</Layout>
}
```

## 35 ブログ ID に応じた記事内容を返す関数を用意する

- `$ npm i remark@14.0.2 remark-html@15.0.1`を実行<br>

* `lib/post.js`を編集<br>

```js:post.js
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

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

// getStaticPathでreturnで使うpathを取得する
export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }))
  /*
  [
    {
      params: {
        id: "ssg-ssr"
      }
    },
    {
      params: {
        id: "next-react"
      }
    }
    {
      ...
    }
  ]
  */
}

// 追加
// idに基づいてブログ投稿データを返す
export const getPostData = async (id) => {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContent = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContent)

  const blogContent = await remark().use(html).process(matterResult.content)

  const blogContentHTML = blogContent.toString()

  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  }
}
```

## 36 実際に getStaticPaths と getStaticProps を実感する

- `pages/posts/[id].js`を編集<br>

```js:[id].js
import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/post'

export const getStaticPaths = () => {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false,
  }
}

// asyncとawaitをつける
export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData,
    },
  }
}

// 編集
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.date}
      <br />
      {postData.blogContentHTML}
    </Layout>
  )
}
```

## 37 ブログ記事のレイアウトを訂正する

- `pages/posts/[id].js`を編集<br>

```js:[id].js
import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/post'
// 追加
import utilStyles from '../../styles/utils.module.css'

export const getStaticPaths = () => {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData,
    },
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      // 編集
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        {/* 本来はサニタイズした方が良い */}
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
      </article>
    </Layout>
  )
}
```

## 38 フォールバックについて補足

fallback は false にすると無い URL にアクセスすると 404 エラーが出る<br>

## 39 404 Not Found ページをカスタマイズする

- `$ touch pages/404.js`を実行<br>

* `pages/404.js`を編集<br>

```js:404.js
export default function Custom404() {
  return <h1>ページが見つかりませんでした。</h1>
}
```

## 40 ブログの細かい訂正をする(その 1)

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

// SSRの場合(今回は使っていない)
// export const getServerSideProps = async (context) => {
//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     }
//   }
// }

export default function Home({ allPostsData }) {
  return (
    // 修正 homeをつける
    <Layout home>
      // 修正 classNameを修正
      <section className={utilStyles.headingMd}>
        <p>
          私はプログラミング学習中の者です/好きな言語はPHP・Ruby・JavaScriptです
        </p>
      </section>
      <section className={utilStyles.headingMd}>
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

- `components/Layout.js`を編集<br>

```js:Layout.js
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

export const siteTitle = 'Next.js blog'

const name = 'Taka Code'

function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" heref="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        // 編集
        {home ? (
          <>
            <img
              src="/images/profile.png"
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <img
              src="/images/profile.png"
              className={`${utilStyles.borderCircle}`}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
        // ここまで
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
```

## 41 ブログの細かい訂正をする(その 2)

- `components/Layout.js`を編集<br>

```js:Layout.js
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export const siteTitle = 'Next.js blog'

const name = 'Taka Code'

function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" heref="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.png"
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <img
              src="/images/profile.png"
              className={`${utilStyles.borderCircle}`}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>
      <main>{children}</main>
      // 追加
      {!home && (
        <div>
          <Link href="/">← ホームへ戻る</Link>
        </div>
      )}
      // ここまで
    </div>
  )
}

export default Layout
```

- `pages/index.js`を編集<br>

```js:index.js
/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import { getPostsData } from '../lib/post'
import Head from 'next/head'

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

// SSRの場合(今回は使っていない)
// export const getServerSideProps = async (context) => {
//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     }
//   }
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      // 追加
      <Head>
        <title>{siteTitle}</title>
      </Head>
      ここまで/
      <section className={utilStyles.headingMd}>
        <p>
          私はプログラミング学習中の者です/好きな言語はPHP・Ruby・JavaScriptです
        </p>
      </section>
      <section className={utilStyles.headingMd}>
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

- `pages/posts/[id].js`を編集<br>

```js:[id].js
// 追加
import Head from 'next/head'
import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/post'
import utilStyles from '../../styles/utils.module.css'

export const getStaticPaths = () => {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData,
    },
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      // 追加
      <Head>
        <title>{postData.title}</title>
      </Head>
      // ここまで
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        {/* 本来はサニタイズした方が良い */}
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
      </article>
    </Layout>
  )
}
```
