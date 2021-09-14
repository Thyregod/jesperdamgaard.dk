import type { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { IWishesContainerProps, WishesContainer } from '../components/PageContainers/WishesContainer/WishesContainer';

const Wishes: NextPage<IWishesContainerProps> = (props) => {
  return (
    <>
      <Head>
        <title>Mine ønsker</title>
        <link rel="icon" href="/presentFavicon.ico" />
      </Head>
      <WishesContainer {...props} />
    </>
  );
};

export default Wishes;

export async function getStaticProps(): Promise<GetStaticPropsResult<IWishesContainerProps>> {
  const configData = await import(`../content/pages/oensker.json`);

  return {
    props: configData.default,
  };
}
