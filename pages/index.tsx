import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jesper Damgaard</title>
        <meta name="description" content="Jesper Damgaards personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
       jesperdamgaard.dk
      </main>

      <footer className={styles.footer}>
        <a href="https://www.linkedin.com/in/jesper-damgaard/">LinkedIn</a>
      </footer>
    </div>
  )
}

export default Home
