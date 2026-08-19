import { createFileRoute } from '@tanstack/react-router';
import { TypeWriter } from '../components/TypeWriter/TypeWriter';
import { homeContent } from '../pageContent';
import styles from '../styles/Home.module.scss';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Jesper Damgaard' },
      { name: 'description', content: 'Jesper Damgaards personal website' },
    ],
    links: [{ rel: 'icon', href: '/favicon.ico' }],
  }),
  component: Home,
});

function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <TypeWriter texts={homeContent.typewriterTexts} />
      </main>

      <footer className={styles.footer}>
        <a href={homeContent.linkedInHref}>LinkedIn</a>
      </footer>
    </div>
  );
}
