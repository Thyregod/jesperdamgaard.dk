import { createFileRoute } from '@tanstack/react-router';
import { WishesContainer } from '../components/PageContainers/WishesContainer/WishesContainer';
import { wishesContent } from '../pageContent';

export const Route = createFileRoute('/oensker')({
  head: () => ({
    meta: [{ title: 'Mine ønsker' }],
    links: [{ rel: 'icon', href: '/presentFavicon.ico' }],
  }),
  component: Wishes,
});

function Wishes() {
  return <WishesContainer wishes={wishesContent.wishes} />;
}
