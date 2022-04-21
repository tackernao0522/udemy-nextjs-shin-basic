# Section07: ④Next.js でマイクロブログ構築(デプロイ編)

## 42 build コマンドを実行して本番前にプレビューする

- `$ npm run build`を実行<br>

* `$ npm run start`を実行<br>

- localhost:3000 をリロード(SSG 生成されているので高速遷移である)<br>

## 45 DPS ワークフローを体験する(その 1)

- vercel にデプロイしておく<br>

* `別のディレクトリを作成し github からこのアプリを clone する<br>

- clone アプリにて`$ npm install`を実行<br>

* `$ npm run dev`を実行して開けるか確認<br>

## 46 DPS ワークフローを体験する(その 2)

- clone したアプリの方で `$ git switch -c feature/46-dev`を実行<br>

* clone `pages/index.js`を編集<br>

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
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        // 編集
        <p>私はNextjsエンジニアです/好きなフレームワークはNext.jsです。</p>
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

- clone `$ git push -u origin HEAD`を実行<br>

* github にプルリクを送り vercel bot の「preview」の URL をクリックするとデプロイした状態を確認できる。これで OK であればマージすればいい<br>

## 47 Next.js が本当にページを高速にレンダリングしているか確認してみる

https://pagespeed.web.dev/ <br>
