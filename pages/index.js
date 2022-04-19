/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout>
      <section className={utilStyles.headingMd}>
        <p>私はプログラミング学習中の者です/好きな言語はPHP・Ruby・JavaScriptです</p>
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
            <small>
              February 23, 2020
            </small>
          </article>
        </div>
      </section>
    </Layout>
  )
}
