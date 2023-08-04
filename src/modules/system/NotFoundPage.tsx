import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import Container from "@/components/layouts/Container";
import { systemConfig } from "./systemConfig";
import Link from "next/link";

export const NotFoundPage: FC = () => {
  const { locale } = useRouter();
  const { t } = useTranslation(systemConfig.i18nNamespaces);

  return (
    <Container title={t("system:notFound.title")}>
      <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 sm:px-6 lg:px-8">
        <div className="my-auto shrink-0 py-16 sm:py-32">
          <p
            data-testid="not-found-code"
            className="text-primary-50 text-base font-semibold"
          >
            404
          </p>
          <h1
            data-testid="not-found-title"
            className="text-neutral-900 mt-2 text-4xl font-bold tracking-tight sm:text-5xl sm:tracking-tight"
          >
            {t("system:notFound.title")}
          </h1>
          <p className="text-neutral-50 mt-2 text-base">
            {t("system:notFound.description")}
          </p>
          <div className="mt-6">
            <NextLink href="/" passHref locale={locale}>
              <Link href="/">{t("system:links.backToHome")}</Link>
            </NextLink>
          </div>
        </div>
      </main>
    </Container>
  );
};
