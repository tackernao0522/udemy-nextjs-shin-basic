/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "./layout.module.css";

export const siteTitle = 'Next.js blog'

const name = 'Taka Code'

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" heref="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <img src="/images/profile.png" />
        <h1>{name}</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
