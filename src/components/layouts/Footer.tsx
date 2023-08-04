import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import LanguageSwitch from "@/components/LanguageSwitch";

export default function Footer() {
  const { t } = useTranslation(["common"]);

  return (
    <footer className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-neutral-20 border-t py-12 text-center md:flex md:justify-between">
        <div className="text-neutral-60 text-left text-base">
          {/* <p>
            &copy; {dayjs().year()} {process.env.NEXT_PUBLIC_APP_NAME}.{' '}
            {t('common:footer.allRightsReserved')}
          </p>
          <p className="text-neutral-40 text-xs">
            {t('common:app_version')}: <code>{process.env.APP_VERSION}</code>
          </p> */}
        </div>
        <div className="mt-6 flex justify-center space-x-8 md:mt-0">
          <LanguageSwitch />
        </div>
      </div>
    </footer>
  );
}
