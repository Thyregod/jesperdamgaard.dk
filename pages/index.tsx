import type { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { TypeWriter } from '../components/TypeWriter/TypeWriter';
import styles from '../styles/Home.module.scss';

interface IHomeProps {
  typewriterTexts: Array<string>;
  linkedInHref: string;
}
const Home: NextPage<IHomeProps> = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jesper Damgaard</title>
        <meta name="description" content="Jesper Damgaards personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <TypeWriter texts={props.typewriterTexts} />
      </main>

      <footer className={styles.footer}>
        <a href={props.linkedInHref}>LinkedIn</a>
      </footer>
    </div>
  );
};

export default Home;

export async function getStaticProps(): Promise<GetStaticPropsResult<IHomeProps>> {
  const configData = await import(`../content/pages/home.json`);

  return {
    props: configData.default,
  };
}
