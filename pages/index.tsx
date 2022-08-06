import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Label Digital SEO Tool</title>
        <meta name="description" content="Label Digital SEO Tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <div className={styles.navbar}><Image src="/images/labeldigital_logo_300px.jpeg" alt="logo" width="150" height="31" /></div> */}
        <h1 className={styles.title}>
          SEO tool
        </h1>

        <p className={styles.description}>
         Dit is een SEO tool. Vul hier je zoekwoorden in bla bla bla bla.
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://labeldigital.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
          <Image src="/images/labeldigital_logo_300px.jpeg" alt="logo" width="105" height="22" />
          </span>
        </a>
      </footer>

      
    </div>
  )
}

export default Home
