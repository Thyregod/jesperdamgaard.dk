import React from 'react';
import styles from './WishesContainer.module.scss';

export interface IWishesContainerProps {
  wishes: Array<string>;
}
export function WishesContainer(props: IWishesContainerProps): JSX.Element {
  return (
    <main className={styles.main}>
      <h1>Ønsker</h1>
      <ol>
        {props.wishes.map((wish, index) => (
          <li key={index}>{wish}</li>
        ))}
      </ol>
    </main>
  );
}
