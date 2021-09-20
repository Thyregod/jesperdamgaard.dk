import type { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { IWishesContainerProps, WishesContainer } from '../components/PageContainers/WishesContainer/WishesContainer';
import { attributes } from '../content/pages/oensker.md';

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
  return {
    props: attributes,
  };
}
