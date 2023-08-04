import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import type { ChangeEventHandler } from 'react';

const LanguageSwitch = () => {
  const router = useRouter();
  const { t } = useTranslation(['common']);
  const handleLanguageChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const locale = event.target.value;
    router.push(router.asPath, undefined, { locale });
  };

  return (
    <select
      name="lang"
      aria-label="lang"
      value={router.locale}
      onChange={handleLanguageChange}
      className="border-neutral-20 focus:border-primary-50 focus:ring-primary-50 rounded-md border py-2 pl-3 pr-10 text-base focus:outline-none sm:text-sm"
    >
      <option value="en">{t('common:i18n.english')}</option>
      <option value="vi">{t('common:i18n.vietnamese')}</option>
    </select>
  );
};

export default LanguageSwitch;
