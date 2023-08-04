import type { I18nActiveNamespaces } from '@/lib/i18n';

export type HomeConfig = {
  i18nNamespaces: I18nActiveNamespaces<'common' | 'home'>;
};

export const homeConfig: HomeConfig = {
  i18nNamespaces: ['common', 'home'],
};
