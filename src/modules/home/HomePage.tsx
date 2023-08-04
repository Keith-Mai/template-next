import { useTranslation } from "next-i18next";
import type { FC } from "react";
import Container from "@/components/layouts/Container";
import { useAuth } from "../auth/AuthProvider";
import { useMyProfile } from "../auth/useMyProfile";
import { homeConfig } from "./homeConfig";
import { Button, Skeleton } from "@mui/material";

type Props = {
  // Declare HomePage props
};

export const HomePage: FC<Props> = () => {
  const { t } = useTranslation(homeConfig.i18nNamespaces);

  const { signIn } = useAuth();
  const { user, isLoading } = useMyProfile();

  return (
    <Container>
      <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 sm:px-6 lg:px-8">
        <div className="my-auto shrink-0 py-16 sm:py-32">
          <h1
            data-testid="home-page-title"
            className="text-neutral-900 text-4xl font-bold tracking-tight sm:text-5xl sm:tracking-tight"
          >
            {t("home:page.title")}
          </h1>
          <div className="mt-2">
            {user ? (
              <p className="text-neutral-50 text-base">
                {t("home:page.hi")}, {user?.name}
              </p>
            ) : isLoading ? (
              <Skeleton height={24} width={128} />
            ) : (
              <Button size="small" onClick={() => signIn(`${window.location}`)}>
                {t("home:page.signIn")}
              </Button>
            )}
          </div>
        </div>
      </main>
    </Container>
  );
};
