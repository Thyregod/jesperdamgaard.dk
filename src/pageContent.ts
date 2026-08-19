import { homeContent as rawHome, wishesContent as rawWishes } from 'virtual:page-content';

export interface HomeContent {
  typewriterTexts: Array<string>;
  linkedInHref: string;
}

export interface WishesContent {
  wishes: Array<string>;
}

export const homeContent = rawHome as HomeContent;
export const wishesContent = rawWishes as WishesContent;
