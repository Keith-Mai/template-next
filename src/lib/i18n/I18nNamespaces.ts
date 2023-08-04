import type common from '@/public/locales/en/common.json';
import type home from '@/public/locales/en/home.json';
import type system from '@/public/locales/en/system.json';

export interface I18nNamespaces {
  common: typeof common;
  system: typeof system;
  home: typeof home;
}
