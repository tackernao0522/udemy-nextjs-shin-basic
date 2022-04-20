/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'
import utilStyles from '../styles/utils.module.css';
import { getPostsData } from '../lib/post'

// SSGの場合
export const getStaticProps = async () => {
  const allPostsData = getPostsData() // id, title, date, thumbnail
  // console.log(allPostsData)

  return {
    props: {
      allPostsData
    }
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
    <Layout>
      <section className={utilStyles.headingMd}>
        <p>私はプログラミング学習中の者です/好きな言語はPHP・Ruby・JavaScriptです</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} alt="" />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyles.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                {date}
              </small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
