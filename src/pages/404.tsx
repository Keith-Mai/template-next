import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { getServerSideTranslations } from '@/lib/i18n';
import { NotFoundPage } from '@/modules/system/NotFoundPage';
import { systemConfig } from '@/modules/system/systemConfig';

export default function Custom404(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <NotFoundPage />;
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { locale = 'vi' } = context;

  const inlinedTranslation = await getServerSideTranslations(
    locale,
    systemConfig.i18nNamespaces
  );

  return {
    props: {
      locale: locale,
      ...inlinedTranslation,
    },
  };
};
