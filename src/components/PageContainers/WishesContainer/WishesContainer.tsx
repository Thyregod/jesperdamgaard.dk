import type React from 'react';
import styles from './WishesContainer.module.scss';

export interface IWishesContainerProps {
  wishes: Array<string>;
}
export function WishesContainer(props: IWishesContainerProps): React.JSX.Element {
  return (
    <main className={styles.main}>
      <h1>Ønsker</h1>
      <ol>
        {props.wishes.map((wish, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static ordered list, no per-item state, duplicates allowed
          <li key={index}>{wish}</li>
        ))}
      </ol>
    </main>
  );
}
