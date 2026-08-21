import { homeContent as rawHome } from 'virtual:page-content';

export interface HomeContent {
  typewriterTexts: Array<string>;
  linkedInHref: string;
}

export const homeContent = rawHome as HomeContent;
